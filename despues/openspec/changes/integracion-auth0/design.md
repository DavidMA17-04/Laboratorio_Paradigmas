# Design

## Context

See `proposal.md`. Stack remains Express + static `index.html` (jQuery) + Socket.IO. Auth0 application **UNA-chat** exists as SPA. Today `server.js` broadcasts on `Evento-Mensaje-Server` with no handshake auth; `index.html` sends free-text `nombre`.

## Goals / Non-Goals

**Goals:**

- Auth0 SPA login/logout (PKCE) in the browser.
- JWT validation on Socket.IO connect; reject anonymous sockets.
- Server-set display name from token claims; preserve `validateMessage` pipeline.
- Env-based config; document Auth0 dashboard settings.
- Adapt integration, e2e, and BDD tests without dropping Lab 5 media/XSS coverage.

**Non-Goals:**

- Replace Express, jQuery, or Socket.IO.
- Auth0 harness / software-factory (lab punto 3).
- Store secrets in Git; use `.env` locally only.
- Change Auth0 tenant beyond SPA + optional API for audience.

## Decisions

1. **Client SDK:** `@auth0/auth0-spa-js` served from `/vendor/auth0/` — redirect login; **`getTokenSilently` must request the API `audience`** so the access token validates on Socket.IO (ID/opaque tokens without that audience are rejected server-side).
2. **Token on socket:** Pass access token in `io({ auth: { token } })` handshake; server validates before `connection` handlers attach chat listeners.
3. **Server validation:** Reuse `express-oauth2-jwt-bearer` via a **request-shaped object** built from `socket.request` (Host, protocol, `is()`). A bare `{ headers: { authorization } }` stub fails with `Invalid Host header` and rejects every real socket.
4. **Identity mapping:** Prefer `name` or `nickname` claim for `obj.nombre` after parse, overwriting client value in `server.js` before `validateMessage`.
5. **Public config:** Optional `GET /auth-config` returning `{ domain, clientId, audience }` from env so HTML is not hard-coded; no client secret.
6. **Tests:** `AUTH_DISABLED=true` or signed test JWT fixture only when `NODE_ENV=test` — document in tasks; e2e uses Auth0 test user or mock login page hook agreed in lab.

**Alternatives considered:** Session cookies only (rejected — socket needs explicit token); trusting client nickname with optional auth (rejected — fails lab anti-spoofing).

## Risks / Trade-offs

- [E2E flakiness with real Auth0 login] → dedicated test user, storage state, or lab-approved bypass in test env only.
- [Token expiry mid-session] → refresh via SPA SDK before reconnecting socket.
- [Integration complexity] → shared helper to obtain test token in Jest setup.

## Migration Plan

1. Configure Auth0 URLs and API audience manually.
2. Add env vars locally; deploy server with same vars.
3. Ship client login gate; enable server middleware.
4. Update tests; run `npm test`, `npm run test:integration`, `npm run test:e2e`.
5. Rollback: disable middleware flag env if needed (document only for dev).

## Open Questions

- Resolved: display name uses verified claim **`name`**, then **`nickname`**, then `sub`.
- Resolved: automated tests use **RS256 tokens signed with a test key pair** (`tests/helpers/test-auth.js`); JWT validation always runs (no global auth bypass). E2E uses `/?testAuth=1` and `/test/session-token` only when `NODE_ENV=test`.

## Auth0 dashboard (manual)

| Setting | Value (example) |
|---------|-----------------|
| Application type | Single Page Application (UNA-chat) |
| Allowed Callback URLs | `http://localhost:3000`, `http://localhost:3000/` |
| Allowed Logout URLs | `http://localhost:3000` |
| Allowed Web Origins | `http://localhost:3000` |
| API (optional) | Create API; note **Identifier** as audience |

## Environment variables (not committed)

| Variable | Purpose |
|----------|---------|
| `AUTH0_DOMAIN` | Tenant domain, e.g. `dev-xxx.us.auth0.com` |
| `AUTH0_CLIENT_ID` | SPA client id |
| `AUTH0_AUDIENCE` | API identifier (if validating API scopes) |
| `PORT` | Existing server port (default 3000) |
| `AUTH_DISABLED` | Optional; only for automated tests if approved |
