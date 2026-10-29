'use strict';

var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var auth = require('../../libs/auth');
var authConfig = require('../../libs/auth-config');

var keyPair = null;
var initPromise = null;

function initTestAuthKeys() {
  if (initPromise) {
    return initPromise;
  }
  initPromise = Promise.resolve().then(function () {
    keyPair = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
    });
    auth.setTestJwtVerify(function (token, callback) {
      var cfg = authConfig.loadAuthConfig();
      jwt.verify(
        token,
        keyPair.publicKey,
        {
          audience: cfg.audience,
          issuer: cfg.issuerBaseURL.replace(/\/+$/, ''),
          algorithms: ['RS256']
        },
        function (err, payload) {
          callback(err, payload);
        }
      );
    });
  });
  return initPromise;
}

function getPublicJwks() {
  return { keys: [] };
}

function signTestToken(claims) {
  if (!keyPair) {
    throw new Error('Call initTestAuthKeys() first');
  }
  var cfg = authConfig.loadAuthConfig();
  var issuer = cfg.issuerBaseURL.replace(/\/+$/, '');
  var payload = Object.assign({ sub: 'test-user|123' }, claims || {});
  return jwt.sign(payload, keyPair.privateKey, {
    algorithm: 'RS256',
    issuer: issuer,
    audience: cfg.audience,
    expiresIn: '2h'
  });
}

module.exports = {
  initTestAuthKeys: initTestAuthKeys,
  signTestToken: signTestToken,
  getPublicJwks: getPublicJwks
};
