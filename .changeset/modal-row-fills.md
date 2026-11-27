---
"@preprocess/ui": patch
---

Inside dialogs, sheets and the mobile drawer (`.surface-modal`), selected and
hovered rows (`--active`, `--hover`) take the same quiet 8% / 6.5% step as the
secondary button tint in both themes. `DialogContent` accepts `initialFocus` and
forwards it to Base UI's popup.
