---
"@preprocess/ui": patch
---

The unchecked box of Checkbox and CheckboxGroup draws its border with the new
`--control-border` token (and `--control-border-hover` on a hovered or focused
CheckboxGroup row), which reaches 3:1 non-text contrast on surface-1 to
surface-4 and the card in light and dark. `--input` and `--border` are
unchanged.
