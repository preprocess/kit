---
"@preprocess/ui": minor
---

Avatar: the marble fallback uses the brand-green palette (#14473b, #3a9670,
#cbdfd0, #34413b, #91c2aa) and is seeded by the user id only. `avatarMarbleSeed`
now takes `{ id }` and no longer falls back to name or email, and
`AvatarFallback` no longer draws children (initials) over the marble. The marble's shapes use normal
blending instead of the library's overlay, so the avatar shows only blends of
the palette colours.
