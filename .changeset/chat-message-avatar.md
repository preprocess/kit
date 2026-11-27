---
"@preprocess/ui": minor
---

ChatMessage: an optional `avatar` slot shows the sender's avatar beside the
message, on the right for `user` and the left for `assistant`, level with the
top of the message. It hides when the nearest `@container` is narrower than
320px. `continued` marks a message that continues a run from the same sender:
the avatar keeps its space but isn't drawn, and the message sits closer to the
one above, so each run shows its avatar once. The user bubble now has a 1px
`--border` ring, so it stays visible on the lighter surface ramp.
