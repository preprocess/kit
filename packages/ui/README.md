# `@preprocess/ui`

Source-first visual-system package for the product app, published so other
Preprocess, Inc. products can reuse it. It ships TypeScript and CSS source, so
consumers compile it with their own bundler (Vite, with Tailwind CSS 4).

## Consumption

Import the root stylesheet once from the application stylesheet:

```css
@import "@preprocess/ui/styles.css";
```

The shared stylesheet owns the Tailwind CSS import, global semantic tokens, and
the source scan for shared components. Applications add their own `@source`
directives for app-local code; they do not add a second Tailwind import.

Import components and utilities through their public package subpaths:

```tsx
import { Button } from "@preprocess/ui/components/button";
import { cn } from "@preprocess/ui/lib/utils";
```

Wrap the application root once in `FluidProvider`. It sets reduced motion to
follow the operating system, the shape (the product app uses `pill`), the size
step, and the icon set:

```tsx
import { FluidProvider } from "@preprocess/ui/lib/fluid-provider";

<FluidProvider shape="pill">{children}</FluidProvider>;
```

The package intentionally publishes source TypeScript and CSS for the consuming
TanStack Start/Vite build. Every shared component receives an explicit export
when it is added; `#components`, `#hooks`, `#lib`, and `#utils` are
package-local aliases used by the shadcn CLI and are not public imports.

The package build typechecks the source and compiles a validation-only
stylesheet to `dist/styles.css`. Consumers continue to import the source
stylesheet so their Tailwind build can include app-local classes.

The upstream source catalog currently requires consumers that compile these
source exports to set `exactOptionalPropertyTypes` and
`noUncheckedIndexedAccess` to `false`. The package makes the same settings in
its own `tsconfig.json`; consuming applications must mirror them until the
upstream sources are hardened for those stricter checks. These are whole-program
compiler settings, so PRE-32 and PRE-33 must knowingly apply the temporary
type-safety reduction across their application programs.

## Tokens

`src/styles/globals.css` is the Fluid site stylesheet at the synced commit:
surface and shadow ladders (in Preprocess's warm paper palette rather than
Fluid's neutral greys), interaction tokens, the six-role type scale (13px body),
Inter with its optical-size axis, the prose `.typeset` sheet, scroll fades, and
page reveals. The app serves the Inter files from `public/fonts`. A small local
block gives the remaining shadcn components values for the roles Fluid leaves
undefined (`primary`, `secondary`, `popover`).

## Brand assets

First-party Preprocess marks live in `src/assets/` and export as package
subpaths:

```tsx
import markUrl from "@preprocess/ui/assets/preprocess-icon-b.svg";
import wordmarkUrl from "@preprocess/ui/assets/preprocess-wordmark-b.svg";
```

Prefer the SVG variants for UI. PNG counterparts are included for favicons and
other contexts that need raster assets. Color suffixes:

| Suffix    | Meaning                            |
| --------- | ---------------------------------- |
| `b` / `w` | Black or white glyph               |
| `bb-wf`   | Black background, white foreground |
| `wb-bf`   | White background, black foreground |

## Icons

Built-in component icons are [Lucide](https://lucide.dev) (ISC), from
`lucide-react`. Components import named icons from `src/lib/icons.ts` rather
than from `lucide-react`, so every glyph shares one size (18px) and stroke
(1.25), and the set can be swapped in one place. `IconProvider` remains the
public override boundary for components that expose semantic icon slots.

Add an icon by exporting a new name from `src/lib/icons.ts`. Newly generated
shadcn components must import through `#lib/icons`; `pnpm lint` fails on a
direct `lucide-react` import anywhere else.

## Fluid Functionalism

The components, hooks, and libs come from the Fluid Functionalism registry (Base
UI flavor). [`registry-inventory.json`](./registry-inventory.json) records the
upstream commit, every vendored file, the import rewrites, and the local patches
(the icon module default, a router-agnostic card link). Lint relaxes style rules
for those files so they stay byte-for-byte comparable with upstream.

Components outside Fluid that the app still uses are listed under
`otherComponents` in the inventory. Replace each with its Fluid equivalent where
one exists, then delete it. License texts and attribution are preserved in
[`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md).

## Using it in a Vite app

The package ships TypeScript source. Let Vite compile it with your own code
rather than prebundling it, and prebundle the one CommonJS module Base UI
reaches, in every environment that renders it (client and SSR):

```ts
const uiCommonJs = [
  "@preprocess/ui > @base-ui/react > use-sync-external-store/shim",
  "@preprocess/ui > @base-ui/react > @base-ui/utils > use-sync-external-store/shim",
  "@preprocess/ui > @base-ui/react > @base-ui/utils > use-sync-external-store/shim/with-selector",
];

export default defineConfig({
  optimizeDeps: { include: uiCommonJs, exclude: ["@preprocess/ui"] },
  // and the same under environments.ssr.optimizeDeps
});
```

Import the stylesheet once with `import "@preprocess/ui/styles.css"`; it needs
Tailwind CSS 4 in the app.
