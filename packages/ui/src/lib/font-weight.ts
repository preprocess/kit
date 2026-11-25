// Inter (variable) weight tokens for `fontVariationSettings`. Text uses two
// weights: 400 for text, and 500 (medium) for headings, titles, display and
// selected items. `semibold` and `bold` are kept as names so call sites stay
// put; both draw medium, so text never goes above 500.
//
// Each weight is paired with an optical-size (`opsz`) value so that animating
// between weights keeps the text's advance width nearly constant: a heavier
// `wght` widens the text, and a tighter (higher) `opsz` pulls it back.
//
// The compensation is per-glyph, so any residual multiplies with label
// length — calibrate against a CORPUS of realistic strings (4–40 chars,
// mixed/caps/lowercase-heavy at 13px), minimizing the worst-case |delta|
// centered on zero, never against a single baseline string. Measured against
// the 400/opsz-14 baseline (2026-11-25, 24 strings): medium at opsz 16.75
// holds every string within ±0.53px; opsz 16 grows long labels by up to
// 0.9px, and opsz 17 shrinks them by up to 0.7px.
//
// Setting `opsz` explicitly here overrides `font-optical-sizing: auto`, which
// is intended — we want weight, not font-size, to drive optical size.
export const fontWeights = {
  normal: "'wght' 400, 'opsz' 14",
  medium: "'wght' 500, 'opsz' 16.75",
  semibold: "'wght' 500, 'opsz' 16.75",
  bold: "'wght' 500, 'opsz' 16.75",
} as const;
