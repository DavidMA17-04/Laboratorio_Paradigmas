# Design

## Context

See proposal.md for why. The chat is one Node process. `package.json` pins Mocha, Jest, Playwright and leaves `express` and `socket.io` as `*`; the lock currently resolves Express 4.18.2 and Socket.IO 4.7.2. The Snyk Security extension is already installed in Cursor. There is no `snyk` script or `.snyk` policy yet. Existing suites: `npm test` (Mocha), `npm run test:integration` (Jest), `npm run test:e2e` (Playwright).

## Goals / Non-Goals

**Goals:**

- Run `snyk test` against the npm tree and keep the reported list.
- Let the apply agent upgrade or override packages until Critical and High are gone.
- Re-run the three existing suites after the lockfile change.

**Non-Goals:**

- Snyk Code (SAST) of `unalib.js` / `index.html` (already covered by unit/E2E XSS cases).
- Fixing Medium/Low unless a High/Critical upgrade pulls them in.
- Replacing Mocha, Jest, or Playwright.
- Changing chat routes or Socket.IO events unless a breaking package bump forces a minimal compatibility fix.

## Decisions

**CLI `snyk test` is the source of truth.** The extension can show the same results, but apply records `snyk test` (or `npx snyk test`) output. Auth with `snyk auth` or `SNYK_TOKEN` if the first run asks for login.

Alternative considered: only the extension UI. Rejected; the lab names `snyk test`.

**Remediate by version, not by ignore.** Prefer `snyk fix` / npm upgrades / `overrides` in `package.json`. Pin `express` and `socket.io` to patched ranges instead of `*`. Do not add `.snyk` ignores for Critical or High.

Alternative considered: `snyk ignore` for everything. Rejected; the spec requires those severities gone.

**Agent applies the remediations.** Apply reads the first scan, upgrades the named packages, re-runs `snyk test`, and repeats until Critical/High are empty or a package has no upgrade path (then stop and report that blocker).

**Regression gate is the three current scripts.** After the lockfile settles: `npm test`, `npm run test:integration`, `npm run test:e2e`. Do not add a fourth product suite.

**Evidence 5** is a screenshot of `snyk test` (lista inicial y/o corrida posterior sin Critical/High), saved at `evidencia/evidencia-5.png`.

## Risks / Trade-offs

- [Snyk asks for auth and the agent cannot complete login] → Pause apply and ask the user to run `snyk auth` or set `SNYK_TOKEN`.
- [No upgrade path for a High/Critical] → Report the package and CVE; do not silently ignore it.
- [A major Express/Socket.IO bump breaks listen or events] → Keep the bump; apply only the smallest API fix; re-run the three suites.
- [Playwright browsers missing on the user machine] → `test:e2e` already runs `playwright install chromium`.

## Migration Plan

1. Authenticate Snyk if needed. Run `snyk test` and keep the list.
2. Upgrade or override every Critical/High package. Update the lockfile.
3. Re-run `snyk test` until those severities are gone.
4. Re-run Mocha, Jest, Playwright. Fix regressions.
5. Save `evidencia/evidencia-5.png`.

Rollback: restore `package.json` and `package-lock.json` from git.

## Open Questions

None.
