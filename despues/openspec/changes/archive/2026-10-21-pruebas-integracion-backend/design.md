# Design

## Context

See proposal.md for why. `server.js` has one HTTP route (`GET /` → `index.html`) and one Socket.IO event (`Evento-Mensaje-Server`) that always calls `validation.validateMessage` then `io.emit`. `http.listen` runs as soon as the file is required, so a test cannot start and stop a private server today. Unit tests stay in Mocha under `test/test.js`.

## Goals / Non-Goals

**Goals:**

- Let Jest start the real Express + Socket.IO stack, hit `GET /` with Supertest, and emit the real chat event with `socket.io-client`.
- Close HTTP and sockets in `afterAll`.
- Keep `npm test` as Mocha.

**Non-Goals:**

- Replacing Mocha or rewriting `validateMessage`.
- Adding a REST POST for messages. The lab says: if the send path is Socket.IO, test that event; use Supertest for HTTP.

## Decisions

**Export the server and listen only when `server.js` is the main module.** Tests `require` the file, call `http.listen(0)`, then `close()`. `npm start` still listens on `PORT || 3000`.

Alternative considered: spawn `npm start` and kill the process. Rejected; port 3000 may already be in use and cleanup is less reliable.

**One file, `tests/integration/chat.test.js`.** Supertest covers `GET /` (status 200, HTML contains the chat title). Socket.IO covers the three lab cases. A `jest` script runs `npx jest tests/integration --runInBand --env=node` so Mocha files are not collected.

Alternative considered: only Supertest. Rejected; there is no HTTP method that receives chat messages.

**Install `jest`, `supertest` and `socket.io-client` as devDependencies.** Jest is not installed today, so install all three. Do not move Mocha.

**Evidence 3** is a screenshot of that Jest run in green, saved at `evidencia/evidencia-3.png`.

## Risks / Trade-offs

- [An existing `npm start` on :3000 collides if the test also binds 3000] → Use port 0.
- [Jest picks up Mocha files] → Point Jest only at `tests/integration`.
- [Socket.IO client hangs] → Set a timeout, `forceNew: true`, and disconnect in `afterAll`.

## Migration Plan

1. Split listen/export in `server.js`.
2. Install the three devDependencies.
3. Write `tests/integration/chat.test.js`.
4. Run the Jest command. Fix failures. Capture evidencia 3.
5. Confirm `npm test` (Mocha) still passes.

## Open Questions

None.
