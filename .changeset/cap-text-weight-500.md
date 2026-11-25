---
"@preprocess/ui": minor
---

Text weight caps at medium (500). `fontWeights.semibold` and `fontWeights.bold`
now draw 500 (opsz 16.75, recalibrated so a weight change keeps label width
within ±0.53px), and so do the typeset headings, `strong` and table headers.
Adds `fontWeights.medium`.
