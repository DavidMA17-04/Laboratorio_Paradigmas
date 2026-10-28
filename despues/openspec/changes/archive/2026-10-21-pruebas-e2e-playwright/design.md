# Design

## Context

See proposal.md for why. UNA Chat is one Node process: `npm start` serves `index.html` and Socket.IO on `http://localhost:3000`. There is no second frontend package. The form uses placeholders `Username` and `Escriba un mensaje`, and a `Send` button. Messages come back as `<img>` or a YouTube `<iframe>` or escaped text.

## Goals / Non-Goals

**Goals:**

- Drive that page in Chromium like a user.
- Use a real image URL and a known YouTube watch URL so load checks are meaningful.
- Fail the script case if a `dialog` fires.

**Non-Goals:**

- Splitting frontend and backend into two apps.
- Replacing Mocha or Jest.
- Testing every YouTube URL shape already covered in unit tests.

## Decisions

**One server is both components.** Start with `npm start`. Playwright `baseURL` is `http://localhost:3000`. `webServer.command` can be `npm start` with `reuseExistingServer: !process.env.CI` so a headed run can reuse an already running chat.

Alternative considered: two terminals and two package.json files. Rejected; they do not exist.

**Init Playwright non-interactively.** `npm init playwright@latest` is interactive. Apply should pass `--quiet --lang=js` (or equivalent) so the folder is `tests/e2e` and browsers install, then set `testDir` and `use.baseURL` in `playwright.config.js`.

**Stable media, not `image.com`.** That host does not serve a file, so `img` never reaches `complete`. Use a public https jpg/png that already matches `is_valid_url_image` (for example a Wikimedia or W3C sample). Video: `https://www.youtube.com/watch?v=qYwlqx-JLok`. After Send, wait for `#messages img` and `img.complete && naturalWidth > 0`; for video, wait for `#messages iframe[src*="youtube.com/embed"]`.

**Locators.** `page.goto('/')`, `getByPlaceholder('Username')`, `getByPlaceholder('Escriba un mensaje')`, `getByRole('button', { name: 'Send' })`. Register `page.on('dialog')` before the script fill; if it fires, `test.fail` / throw. Then assert no `<script` in the list item and no img/iframe.

**Evidence 4** is a screenshot of the headed Chromium run in green, saved at `evidencia/evidencia-4.png`. `npx playwright show-report` is for local review, not a required artifact.

## Risks / Trade-offs

- [YouTube iframe is blank because of cookies or network] → Assert the embed `src` and that the iframe is visible; do not require playback.
- [Port 3000 already taken by a stale server] → `reuseExistingServer` or stop the old process before apply.
- [Interactive init hangs the agent] → Use quiet flags; do not wait on prompts.

## Migration Plan

1. Start `npm start` and confirm the chat page talks to Socket.IO.
2. Init Playwright, fix `testDir` and `baseURL`.
3. Write `tests/e2e/chat.spec.js`.
4. Run `npx playwright test --project=chromium --headed`. Fix failures. Save evidencia 4.

## Open Questions

None.
