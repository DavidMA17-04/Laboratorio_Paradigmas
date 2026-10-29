# Tasks

## 1. Auth0 tenant and environment

- [x] 1.1 Configure UNA-chat SPA callback, logout, and web origins for local port; verify login redirect works in browser manually
- [x] 1.2 Create Auth0 API (if required) and record audience; add `.env.example` with `AUTH0_DOMAIN`, `AUTH0_CLIENT_ID`, `AUTH0_AUDIENCE` placeholders (no secrets) and verify `.env` is gitignored

## 2. Server JWT and identity

- [x] 2.1 Add JWT validation on Socket.IO handshake in `server.js`; verify invalid/missing token disconnects via manual socket client test
- [x] 2.2 Overwrite message `nombre` from verified claims before `validateMessage`; verify spoofed nombre in payload does not appear in broadcast
- [x] 2.3 Optional `GET /auth-config` from env; verify response JSON contains domain and clientId only

## 3. Client login and socket

- [x] 3.1 Integrate Auth0 SPA SDK in `index.html` (login/logout UI, hide chat until authenticated); verify logout blocks send
- [x] 3.2 Connect socket with access token in `auth`; verify chat works after login and media/XSS cases still behave on manual smoke test

## 4. Integration tests

- [x] 4.1 Add test helper for valid token (or test-only bypass per design); update `tests/integration/chat.test.js` and verify `npm run test:integration` passes
- [x] 4.2 Add anonymous socket rejection test; verify new case passes in integration suite

## 5. E2E and BDD

- [x] 5.1 Update `tests/e2e/chat.spec.js` login flow; verify `npm run test:e2e` passes for image, video, and script scenarios
- [x] 5.2 Add BDD-style tests for auth/spoofing per `pruebas-bdd` delta; verify `npm test` passes

## Workflow follow-up

- Run `/opsx-apply` when ready to implement.
- Archive with `/opsx-archive` or `openspec archive integracion-auth0` after review and green tests.
