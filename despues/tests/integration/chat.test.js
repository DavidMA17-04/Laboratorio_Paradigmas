var request = require('supertest');
var Client = require('socket.io-client');
var serverMod = require('../../server');
var app = serverMod.app;
var http = serverMod.http;
var io = serverMod.io;

function mensajeChat(mensaje) {
  return JSON.stringify({
    nombre: 'Ana',
    mensaje: mensaje,
    color: '#112233'
  });
}

describe('chat integration', function () {
  var listener;
  var port;
  var sockets = [];

  beforeAll(function (done) {
    listener = http.listen(0, function () {
      port = listener.address().port;
      done();
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

  function emitAndWait(payload) {
    return new Promise(function (resolve, reject) {
      var socket = Client('http://127.0.0.1:' + port, {
        forceNew: true,
        transports: ['websocket']
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
  }

  test('GET / returns the chat page', function () {
    return request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect(/Chat Socket.IO UNA/);
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
