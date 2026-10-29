'use strict';

function normalizeIssuer(domainOrIssuer) {
  var base = String(domainOrIssuer || '').trim();
  if (!base) {
    return '';
  }
  if (base.indexOf('https://') === 0) {
    return base.charAt(base.length - 1) === '/' ? base : base + '/';
  }
  return 'https://' + base.replace(/\/+$/, '') + '/';
}

function loadAuthConfig() {
  var isTest = process.env.NODE_ENV === 'test';
  var audience = process.env.AUTH0_AUDIENCE || 'https://una-chat-api';
  var domain = process.env.AUTH0_DOMAIN || 'dev-k16ofr6lteyh6ext.us.auth0.com';
  var issuerBaseURL = normalizeIssuer(
    process.env.AUTH0_ISSUER_BASE_URL || (isTest ? 'https://test.una-chat.local/' : domain)
  );
  var clientId = process.env.AUTH0_CLIENT_ID || '';

  return {
    audience: audience,
    domain: domain.replace(/^https:\/\//, '').replace(/\/+$/, ''),
    issuerBaseURL: issuerBaseURL,
    clientId: clientId,
    isTest: isTest
  };
}

module.exports = {
  loadAuthConfig: loadAuthConfig,
  normalizeIssuer: normalizeIssuer,
  displayNameFromClaims: function (payload) {
    if (!payload || typeof payload !== 'object') {
      return 'Usuario';
    }
    if (typeof payload.name === 'string' && payload.name.trim()) {
      return payload.name.trim();
    }
    if (typeof payload.nickname === 'string' && payload.nickname.trim()) {
      return payload.nickname.trim();
    }
    if (payload.sub != null) {
      return String(payload.sub);
    }
    return 'Usuario';
  }
};
