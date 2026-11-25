---
"@preprocess/ui": patch
---

Inter loads as WOFF2 with `font-display: optional`, so text never swaps from the
fallback font mid-view. Host `/fonts/InterVariable.woff2` (and the italic) and
preload it; apps that host only the TTFs still get them as the fallback source.
