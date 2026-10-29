
require('dotenv').config();

var path = require('path');
var validation = require('./libs/unalib');
var auth = require('./libs/auth');
var authConfig = require('./libs/auth-config');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var cfg = authConfig.loadAuthConfig();

app.use(
  '/vendor/auth0',
  express.static(path.join(__dirname, 'node_modules/@auth0/auth0-spa-js/dist'))
);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/auth-config', function (req, res) {
  res.json({
    domain: cfg.domain,
    clientId: cfg.clientId,
    audience: cfg.audience
  });
});

if (cfg.isTest) {
  var testAuth = require('./tests/helpers/test-auth');
  app.get('/.well-known/jwks.json', function (req, res) {
    res.json(testAuth.getPublicJwks());
  });
  app.get('/test/session-token', function (req, res) {
    testAuth.initTestAuthKeys().then(function () {
      var name = req.query.name || 'David';
      return testAuth.signTestToken({ name: name, nickname: name });
    }).then(function (token) {
      res.json({ token: token, name: req.query.name || 'David' });
    }).catch(function (err) {
      res.status(500).json({ error: err.message });
    });
  });
}

io.use(auth.attachSocketAuth);

io.on('connection', function (socket) {
  socket.on('Evento-Mensaje-Server', function (msg) {
    msg = auth.applyVerifiedNombre(msg, socket.data.displayName);
    msg = validation.validateMessage(msg);
    io.emit('Evento-Mensaje-Server', msg);
  });
});

if (require.main === module) {
  if (cfg.isTest) {
    require('./tests/helpers/test-auth').initTestAuthKeys().then(function () {
      http.listen(port, function () {
        console.log('listening on *:' + port);
      });
    });
  } else {
    http.listen(port, function () {
      console.log('listening on *:' + port);
    });
  }
}

module.exports = {
  app: app,
  http: http,
  io: io
};
