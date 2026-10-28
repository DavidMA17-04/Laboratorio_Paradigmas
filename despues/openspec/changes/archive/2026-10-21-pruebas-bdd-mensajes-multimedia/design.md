# Design

## Context

See proposal.md for why. The project already runs Mocha through `npm test`. `test/test.js` uses `describe`/`it` and Node `assert`, and checks detectors plus one script case. It does not call `validateMessage` for a clean image, a YouTube URL, or ordinary text. The chat contract for those cases lives in `mostrar-imagenes-y-videos`.

## Goals / Non-Goals

**Goals:**

- One Mocha file that a reader can follow as Given / When / Then.
- Unit tests exercise the same rewrite the server applies before broadcast, not only the URL detectors.
- Existing phone, image-detector, YouTube-detector, and script cases remain, rewritten into that shape.

**Non-Goals:**

- A second test runner or Gherkin files.
- Browser or Socket.IO integration tests.
- Changing chat rendering rules. Those stay in `mostrar-imagenes-y-videos`.

## Decisions

**Mocha BDD, not Cucumber.** The suite already is Mocha. Adding Cucumber would duplicate the same cases in `.feature` files and a new runner. Style comes from nested `describe` blocks and explicit Given / When / Then comments (or equivalent local names) inside each `it`.

Alternative considered: Cucumber with `.feature` files. Rejected in proposal.md as out of scope.

**Test the rewritten message, not the detector alone.** Image, video, text, and script cases build the same JSON the client sends and assert on `validateMessage`. Detector tests stay as a thin Given / When / Then layer so the old cases do not disappear.

Alternative considered: only expand `is_valid_url_image` and `is_valid_yt_video`. Rejected because those functions do not prove the chat shows an image or a player.

**Apply after or with `mostrar-imagenes-y-videos`.** The new `validateMessage` cases will fail until that change lands. Keep both changes open. Apply the chat behavior first, or both in one session, so `npm test` can go green.

Alternative considered: weaken the new tests to match today's output (image URLs stay text). Rejected because the spec requires expecting an image and a player.

**Keep Node `assert`.** No Chai. One assertion library is enough for this lab.

## Risks / Trade-offs

- [New tests fail while `mostrar-imagenes-y-videos` is still unapplied] → Apply that change first, or apply both before treating the suite as green.
- [Two changes edit `test/test.js`] → This change owns the BDD layout. The other change only adds the cases it already named; fold them into the same Given / When / Then groups.
- [A test name says Given / When / Then but asserts the old detector only] → Each multimedia scenario must assert the rewritten `mensaje`.

## Migration Plan

1. Rewrite `test/test.js` in BDD form and add the missing `validateMessage` cases.
2. Apply `mostrar-imagenes-y-videos` if it is not applied yet, then run `npm test`.
3. Rollback is reverting the test file. No data or API migration.

## Open Questions

None. Cucumber stays out. Extra YouTube URL shapes stay covered only if `mostrar-imagenes-y-videos` already accepts them.
