# Design

## Context

See proposal.md for why. `validateMessage` in `libs/unalib.js` already classifies a whole-message image URL, a YouTube URL, or escaped text. `extractImageUrl` can pull a jpg out of a Bing `mediaurl`, but `validateMessage` does not call it. The client still builds `<b style='color:' + color + '>'` and inserts it with `.html()`. HTML-entity quotes in `color` can close that attribute.

## Goals / Non-Goals

**Goals:**

- One method, `validateMessage`, decides what is safe to broadcast.
- Embed only after a regex says the value is an image URL or a YouTube id.
- Strip or neutralize script tags, `javascript:` and `on*` handlers in nombre, mensaje and color.
- Keep using regex in this library. Do not add a new validation package.

**Non-Goals:**

- Blocking ordinary chat sentences.
- Playing `.mp4` or hosts other than YouTube.
- Server-side fetch of the image to check the Content-Type.

## Decisions

**Keep the exported name `validateMessage`.** The lab statement says `validarMensaje`; the file already exports `validateMessage`. Adding an alias would duplicate the same function. Document the mapping in comments only.

Alternative considered: rename the export. Rejected because `server.js` and all tests already call `validateMessage`.

**Classify, then clean.** Order: trim the message, refuse to embed if it looks like a script, else `extractImageUrl` then YouTube, else treat as text. Always write nombre and mensaje through `escapeHtml`. Color must match `/^#?[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/`; otherwise send an empty color.

Alternative considered: delete the whole message when a script is found. Rejected because the existing spec still shows the content as text.

**Use `extractImageUrl` for images.** A Bing or Google page is not itself an image. The nested `http(s)` URL that ends in jpg/jpeg/png/gif/bmp is. `getImageTag` receives only that extracted URL, already checked by `is_valid_url_image`.

Alternative considered: embed the Bing page in an iframe. Rejected; it is not an image URL.

**Fix the client attribute.** `index.html` must not concatenate `color` into a quoted `style`. Use a hex-only value from the server, or set `element.style.color` on a DOM node and `text()` for the name. Otherwise `validateMessage` cannot keep a handler out of the page.

Alternative considered: only escape on the server. Rejected; `&#39;` still ends a single-quoted HTML attribute.

## Risks / Trade-offs

- [A regex image check trusts the extension, not the bytes] → Accept for this lab. Do not follow `javascript:` or data URLs; `is_valid_url_image` already requires `http` or `https`.
- [Blacklist misses an exotic payload] → After classification, user text is escaped. Only `<img>` and the YouTube `<iframe>` are built from validated pieces.
- [Node keeps the old module until restart] → Restart `npm start` after apply.

## Migration Plan

1. Wire `extractImageUrl` and the color regex into `validateMessage`.
2. Change the client paint path so color cannot break the `style` attribute.
3. Add the BDD cases. Restart the server.

## Open Questions

None. Text that is not a media URL stays visible as cleaned text.
