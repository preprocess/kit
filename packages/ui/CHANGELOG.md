# @preprocess/ui

## 0.2.0

### Minor Changes

- 1f005b0: Avatar: the marble fallback uses the brand-green palette (#14473b,
  #3a9670, #cbdfd0, #34413b, #91c2aa) and is seeded by the user id only.
  `avatarMarbleSeed` now takes `{ id }` and no longer falls back to name or
  email, and `AvatarFallback` no longer draws children (initials) over the
  marble. The marble's shapes use normal blending instead of the library's
  overlay, so the avatar shows only blends of the palette colours.
- d305c48: Text weight caps at medium (500). `fontWeights.semibold` and
  `fontWeights.bold` now draw 500 (opsz 16.75, recalibrated so a weight change
  keeps label width within ±0.53px), and so do the typeset headings, `strong`
  and table headers. Adds `fontWeights.medium`.
- 837176f: ChatMessage: an optional `avatar` slot shows the sender's avatar
  beside the message, on the right for `user` and the left for `assistant`,
  level with the top of the message. It hides when the nearest `@container` is
  narrower than 320px. `continued` marks a message that continues a run from the
  same sender: the avatar keeps its space but isn't drawn, and the message sits
  closer to the one above, so each run shows its avatar once. The user bubble
  now has a 1px `--border` ring, so it stays visible on the lighter surface
  ramp.
- 50dc2bd: Take Fluid's current Input (hairline border, hover fill, neutral
  focus border) and add Field (FieldLabel, FieldDescription, FieldError and the
  group parts), so forms match fluidfunctionalism.com. Adds the file, minus and
  circle-alert icon slots they use.
- d60aa9e: Take Fluid's current Tabs, the pill indicator design: `Tabs`,
  `TabsItem` and `TabsPanel` from `@preprocess/ui/components/tabs`, driven by
  `selectedIndex` and `onSelect`. Upstream removed the segmented Tabs
  (`TabItem`, `TabsList`, `TabPanel`) and renamed TabsSubtle to Tabs, so both
  old components are gone and `@preprocess/ui/components/tabs-subtle` no longer
  exists.

  `useFluidHover` follows upstream: only the item under the pointer lights,
  empty space puts the highlight out (`nearest: true` restores the nearest-item
  rule), and it returns an `activeStore` for `useFluidHoverSelect`. `holdInGaps`
  stays as a local option.

- dc447e8: Add Fluid's Textarea: the Input's hairline on a multi-line field that
  grows with its content from three lines to ten.
- 7df7051: First release from preprocess/kit.
- c56514a: Add PasswordInput: Fluid's Input with a show/hide password toggle
  inset at the right, sized like Input's number stepper buttons.
- 86d13c9: Select's default trigger takes Fluid's current look, the Input's
  hairline border with the hover fill, instead of the local surface-tint fill,
  so it matches Input in forms.
- 528bced: Lighter surface ramp: surface-1 is unchanged, surface-2 is a slightly
  lighter sunken step, and in light mode surface-3 to surface-8 are as light as
  or lighter than the page, separated by shadows and border hairlines. Dark
  keeps raised-is-lighter in smaller steps. The Switch on-state is the brand
  green (#3a9670, hover #1f6b55) through the new `--switch-on` and
  `--switch-on-hover` tokens.

### Patch Changes

- d89f2a4: Add the Cog, Coins, Scale, ShoppingCart and TrendingUp icons to
  `#lib/icons`.
- 31bca99: The unchecked box of Checkbox and CheckboxGroup draws its border with
  the new `--control-border` token (and `--control-border-hover` on a hovered or
  focused CheckboxGroup row), which reaches 3:1 non-text contrast on surface-1
  to surface-4 and the card in light and dark. `--input` and `--border` are
  unchanged.
- 1ea01db: Add the Box, Cpu and Send icons to `#lib/icons`.
- 4cfcc7e: Dialogs, sheets and the mobile drawer sit on the solid surface-1
  panel with its paired shadow, and their backdrop blurs the page behind it on
  top of the same dim. Sheets take the dialog's dim. Inside these panels,
  secondary buttons use the same see-through tint in dark as in light, one step
  above the panel.
- 06643b6: Add the icons the docs polish uses: `ArrowUpRight`, `Braces`,
  `FileText`, `Hash`, `OctagonAlert`, `Terminal` and `TextAlignStart`.
- 2eb05c8: Add the `CircleHelp` icon, and an optional `trailingIcon` on
  `MenuItem` for rows that open another site.
- 31ce421: Icons draw a 1.15px stroke (`--icon-stroke`), up from 0.9375px.
- 13c77af: The icon stroke is one token, `--icon-stroke` (0.9375px), which the
  icon rule reads, so a product can set it in one place.
- 332a840: Inter loads as WOFF2 with `font-display: optional`, so text never
  swaps from the fallback font mid-view. Host `/fonts/InterVariable.woff2` (and
  the italic) and preload it; apps that host only the TTFs still get them as the
  fallback source.
- d676ff9: Inside dialogs, sheets and the mobile drawer (`.surface-modal`),
  selected and hovered rows (`--active`, `--hover`) take the same quiet 8% /
  6.5% step as the secondary button tint in both themes. `DialogContent` accepts
  `initialFocus` and forwards it to Base UI's popup.
- 9c84ac8: Export the Activity icon (Lucide pulse line), for links to the status
  page.
- 3b32aef: Icons draw one stroke weight on screen at every size: 0.9375px, Fluid
  Functionalism's own icon weight, held with
  `vector-effect: non-scaling-stroke`. Icons sized up with CSS no longer
  thicken, and the inline Select and Combobox carets and InputCopy check and
  cross take the same weight.
