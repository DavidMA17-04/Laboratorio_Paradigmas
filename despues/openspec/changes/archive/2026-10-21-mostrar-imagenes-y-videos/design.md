# Design

## Context

See proposal.md for why. The browser already sends the text field as `mensaje` inside a JSON. The server rewrites that JSON and every client paints `mensaje` as HTML. `libs/unalib.js` already tries to turn an image URL into an `<img>` and a YouTube URL into an `<iframe>`, and it escapes text that contains a script. Two detectors disagree: the image pattern is not anchored to the whole message, and the YouTube check does not use the same pattern as the id extractor. If extraction throws, the message loses its name and color.

## Goals / Non-Goals

**Goals:**

- One decision on the server, before the message is broadcast, so every client sees the same image, player, or text.
- A message that is only an image URL becomes an image tag. A message that is only a YouTube URL becomes an embedded player for that video id.
- Anything else, including a script, stays escaped text.

**Non-Goals:**

- Finding a URL inside a longer sentence.
- Playing `.mp4` or other hosts with an HTML5 `<video>` element.
- Changing how the username or the color is chosen.

## Decisions

**Detect and render on the server.** The client keeps sending the raw text. `validateMessage` classifies it and replaces `mensaje` with the HTML that clients display. Doing it in the browser would let one client show a player while another shows the raw URL, and the script check already lives on the server.

Alternative considered: classify in `index.html` before emit. Rejected because the broadcast would still carry the raw URL and each client would repeat the rules.

**The whole message is the URL.** Image and YouTube checks must match the entire string, not a substring. That matches the spec ("únicamente una URL") and stops a sentence that happens to contain `.jpg` from becoming an image.

Alternative considered: extract the first URL from the text and leave the rest as a caption. Rejected because the spec shows the image or the player instead of the URL text.

**YouTube uses an iframe player, not `<video>`.** The player source is `https://www.youtube.com/embed/` plus the 11-character id. Accepted forms are the ones the current YouTube check already names: `watch?v=`, `youtu.be/`, `embed/` and `v/`. The id used in the player must be the same id the check accepted. If the id cannot be read, the message stays escaped text and keeps `nombre` and `color`.

Alternative considered: an HTML5 player for direct video files. Out of scope; see proposal.md.

**Scripts lose the embed path.** If the message contains a script tag, `javascript:` or an inline event handler, it is HTML-escaped and sent as text. A clean image or YouTube URL still becomes a tag. The tag is built only from that accepted URL or id, not from the raw user string concatenated around it.

Alternative considered: delete the message. Rejected because the spec says to show the content as text.

## Risks / Trade-offs

- [Image and YouTube patterns still match a substring or drop the id] → Anchor both checks to the whole message and build the player only from the captured id. On failure, escape the original text.
- [The client renders `mensaje` with HTML, so a bad tag becomes active content] → The server is the only writer of `<img>` and `<iframe>`. User text is escaped.
- [A YouTube link with extra parameters, such as `&t=`, does not match the current check] → Treat it as text until the check is widened. Do not guess an id from a string the check rejected.
- [Node keeps the old module until the process restarts] → Restart `npm start` after the change. No data migration; the chat has no history.

## Migration Plan

1. Adjust detection and HTML generation in `libs/unalib.js`, then the tests in `test/test.js`.
2. Restart the server. Rollback is reverting that commit; clients need no schema change.

## Open Questions

None. Extra YouTube query parameters stay text unless a later change updates the spec.
