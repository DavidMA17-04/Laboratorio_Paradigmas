'use strict';

var authLib = require('express-oauth2-jwt-bearer');
var authConfig = require('./auth-config');

var jwtCheckInstance = null;
var testJwtVerify = null;

function getJwtCheck() {
  if (jwtCheckInstance) {
    return jwtCheckInstance;
  }
  var cfg = authConfig.loadAuthConfig();
  jwtCheckInstance = authLib.auth({
    audience: cfg.audience,
    issuerBaseURL: cfg.issuerBaseURL,
    tokenSigningAlg: 'RS256'
  });
  return jwtCheckInstance;
}

function setTestJwtVerify(fn) {
  testJwtVerify = fn;
}

/**
 * express-oauth2-jwt-bearer expects a request-shaped object (Host, protocol, is()).
 * A bare { headers } object fails with InvalidRequestError: Invalid Host header.
 */
function buildVerifierRequest(token, incomingRequest) {
  var headers = { authorization: 'Bearer ' + token };
  var host = 'localhost:' + (process.env.PORT || 3000);
  var protocol = 'http';
  var originalUrl = '/';
  var method = 'GET';

  if (incomingRequest && incomingRequest.headers) {
    headers = Object.assign({}, incomingRequest.headers, headers);
    host = incomingRequest.headers.host || host;
    originalUrl = incomingRequest.url || originalUrl;
    method = incomingRequest.method || method;
    if (incomingRequest.connection && incomingRequest.connection.encrypted) {
      protocol = 'https';
    }
  }

  var hostHeader = host;
  return {
    headers: headers,
    protocol: protocol,
    originalUrl: originalUrl,
    url: originalUrl,
    method: method,
    get: function (name) {
      if (String(name).toLowerCase() === 'host') {
        return hostHeader;
      }
      return headers[String(name).toLowerCase()];
    },
    is: function () {
      return false;
    }
  };
}

function verifyAccessToken(token, callback, incomingRequest) {
  if (!token || typeof token !== 'string') {
    return callback(new Error('Unauthorized'));
  }
  var cfg = authConfig.loadAuthConfig();
  if (cfg.isTest && testJwtVerify) {
    return testJwtVerify(token, callback);
  }
  var req = buildVerifierRequest(token, incomingRequest);
  var res = {};
  getJwtCheck()(req, res, function (err) {
    if (err) {
      return callback(err);
    }
    var payload =
      req.auth && req.auth.payload ? req.auth.payload : req.auth;
    callback(null, payload);
  });
}

function attachSocketAuth(socket, next) {
  var token = socket.handshake.auth && socket.handshake.auth.token;
  verifyAccessToken(token, function (err, payload) {
    if (err) {
      return next(new Error('Unauthorized'));
    }
    socket.data.authPayload = payload;
    socket.data.displayName = authConfig.displayNameFromClaims(payload);
    next();
  }, socket.request);
}

function applyVerifiedNombre(msgString, displayName) {
  var obj;
  try {
    obj = JSON.parse(msgString);
  } catch (e) {
    return msgString;
  }
  obj.nombre = displayName;
  return JSON.stringify(obj);
}

module.exports = {
  getJwtCheck: getJwtCheck,
  setTestJwtVerify: setTestJwtVerify,
  buildVerifierRequest: buildVerifierRequest,
  verifyAccessToken: verifyAccessToken,
  attachSocketAuth: attachSocketAuth,
  applyVerifiedNombre: applyVerifiedNombre,
  displayNameFromClaims: authConfig.displayNameFromClaims
};
