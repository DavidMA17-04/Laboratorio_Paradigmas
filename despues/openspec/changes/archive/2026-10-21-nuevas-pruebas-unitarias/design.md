# Design

## Context

See proposal.md for why. `test/test.js` already calls `validateMessage` with Given / When / Then. Image coverage is jpg and gif. Video coverage is watch. Script coverage is `<script>` and `onfocus` in color. `is_valid_url_image` already accepts png, jpeg and bmp. `youtubeVideoPattern` already matches youtu.be, embed and shorts. `containsScript` already flags `javascript:` and `on*`.

## Goals / Non-Goals

**Goals:**

- Add the missing cases as Mocha tests next to the existing describes.
- Keep the same helper `mensajeChat` and the same asserts: `<img>` / embed URL for media, no raw `<script>` or `onerror` for injection.

**Non-Goals:**

- New validators, new packages, or a new test file.
- Changing how the client paints messages.

## Decisions

**Only add tests unless a case fails a rule already in `mensajes-multimedia`.** png, jpeg, bmp, youtu.be, embed and shorts should already pass. If one fails, fix the regex in `unalib.js` so the existing media contract holds. Do not invent new product behavior.

Alternative considered: rewrite `validateMessage` first. Rejected; the lab item is additional unit tests.

**Reuse the existing describes.** Put png/jpeg/bmp under `mensaje de imagen`, youtu.be/embed/shorts under `mensaje de video`, and `javascript:` / `onerror` under `mensaje de texto y scripts`.

Alternative considered: a new `describe` per lab bullet. Rejected; it would split the same `validateMessage` contract across more groups without helping `npm test`.

**For injection, assert the raw JSON string.** A successful escape must not contain `<script`, `javascript:` as an executable protocol, `onerror=`, `<img` or `<iframe`. Escaped text such as `&lt;` is acceptable.

## Risks / Trade-offs

- [A shorts or embed URL fails `validateMessage` even though the detector accepts it] → Fix the classifier path, not the test expectation.
- [Duplicating jpg/watch/`<script>` cases] → Do not copy those tests; only add the listed extras.

## Migration Plan

1. Add the tests.
2. Run `npm test`.
3. If a listed media URL fails, adjust the regex in `unalib.js` and rerun.

## Open Questions

None.
