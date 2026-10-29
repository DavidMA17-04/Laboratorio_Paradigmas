var request = require('supertest');
var Client = require('socket.io-client');
var testAuth = require('../helpers/test-auth');

function mensajeChat(mensaje, nombreSpoof) {
  return JSON.stringify({
    nombre: nombreSpoof || 'Evil',
    mensaje: mensaje,
    color: '#112233'
  });
}

describe('chat integration', function () {
  var serverMod;
  var app;
  var http;
  var io;
  var listener;
  var port;
  var sockets = [];

  beforeAll(function (done) {
    process.env.NODE_ENV = 'test';
    process.env.AUTH0_ISSUER_BASE_URL = 'https://test.una-chat.local/';
    process.env.AUTH0_AUDIENCE = 'https://una-chat-api';
    delete require.cache[require.resolve('../../server')];
    testAuth.initTestAuthKeys().then(function () {
      serverMod = require('../../server');
      app = serverMod.app;
      http = serverMod.http;
      io = serverMod.io;
      listener = http.listen(0, function () {
        port = listener.address().port;
        done();
      });
    });
  });

  afterAll(function (done) {
    sockets.forEach(function (socket) {
      if (socket) {
        socket.close();
      }
    });
    io.close(function () {
      done();
    });
  });

  function emitAndWait(payload, tokenClaims) {
    var token = testAuth.signTestToken(Object.assign({ name: 'Ana' }, tokenClaims || {}));
    return Promise.resolve(token).then(function (token) {
      return new Promise(function (resolve, reject) {
        var socket = Client('http://127.0.0.1:' + port, {
          forceNew: true,
          transports: ['websocket'],
          auth: { token: token }
        });
        sockets.push(socket);
        var timer = setTimeout(function () {
          socket.close();
          reject(new Error('timeout waiting for Evento-Mensaje-Server'));
        }, 5000);

        socket.on('connect', function () {
          socket.emit('Evento-Mensaje-Server', payload);
        });
        socket.on('Evento-Mensaje-Server', function (msg) {
          clearTimeout(timer);
          resolve(msg);
        });
        socket.on('connect_error', function (err) {
          clearTimeout(timer);
          reject(err);
        });
      });
    });
  }

  test('GET / returns the chat page', function () {
    return request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect(/Chat Socket.IO UNA/);
  });

  test('GET Auth0 SPA SDK is served locally', function () {
    return request(app)
      .get('/vendor/auth0/auth0-spa-js.production.js')
      .expect(200)
      .expect('Content-Type', /javascript/)
      .expect(/createAuth0Client/);
  });

  test('anonymous socket is rejected', function (done) {
    var socket = Client('http://127.0.0.1:' + port, {
      forceNew: true,
      transports: ['websocket']
    });
    sockets.push(socket);
    socket.on('connect', function () {
      done.fail(new Error('expected connect_error'));
    });
    socket.on('connect_error', function () {
      done();
    });
  });

  test('verified name overrides spoofed nombre in payload', function () {
    return emitAndWait(mensajeChat('hola', 'Evil')).then(function (raw) {
      var salida = JSON.parse(raw);
      expect(salida.nombre).toBe('Ana');
      expect(salida.nombre).not.toBe('Evil');
    });
  });

  test('valid image URL is accepted through the chat event', function () {
    var url = 'http://image.com/image.jpg';
    return emitAndWait(mensajeChat(url)).then(function (raw) {
      var salida = JSON.parse(raw);
      expect(/<img\b/i.test(salida.mensaje)).toBe(true);
      expect(salida.mensaje.indexOf(url) !== -1).toBe(true);
      expect(salida.mensaje === url).toBe(false);
    });
  });

  test('valid YouTube URL is accepted through the chat event', function () {
    var url = 'https://www.youtube.com/watch?v=qYwlqx-JLok';
    return emitAndWait(mensajeChat(url)).then(function (raw) {
      var salida = JSON.parse(raw);
      expect(/<iframe\b/i.test(salida.mensaje)).toBe(true);
      expect(salida.mensaje.indexOf('https://www.youtube.com/embed/qYwlqx-JLok') !== -1).toBe(true);
    });
  });

  test('non-media URL stays text', function () {
    var url = 'https://example.com';
    return emitAndWait(mensajeChat(url)).then(function (raw) {
      var salida = JSON.parse(raw);
      expect(salida.mensaje).toBe(url);
      expect(/<img\b/i.test(salida.mensaje)).toBe(false);
      expect(/<iframe\b/i.test(salida.mensaje)).toBe(false);
    });
  });

  test('script input is sanitized', function () {
    return emitAndWait(mensajeChat('hola <script>alert("xss")</script>')).then(function (raw) {
      expect(/<script/i.test(raw)).toBe(false);
      expect(/<img\b/i.test(raw)).toBe(false);
      expect(/<iframe\b/i.test(raw)).toBe(false);
    });
  });
});
