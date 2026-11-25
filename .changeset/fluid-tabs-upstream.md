---
"@preprocess/ui": minor
---

Take Fluid's current Tabs, the pill indicator design: `Tabs`, `TabsItem` and
`TabsPanel` from `@preprocess/ui/components/tabs`, driven by `selectedIndex` and
`onSelect`. Upstream removed the segmented Tabs (`TabItem`, `TabsList`,
`TabPanel`) and renamed TabsSubtle to Tabs, so both old components are gone and
`@preprocess/ui/components/tabs-subtle` no longer exists.

`useFluidHover` follows upstream: only the item under the pointer lights, empty
space puts the highlight out (`nearest: true` restores the nearest-item rule),
and it returns an `activeStore` for `useFluidHoverSelect`. `holdInGaps` stays as
a local option.
