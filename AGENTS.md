# Kit agent guide

Shared MIT libraries for every Preprocess, Inc. product. Read README.md first.

- Each package exposes a small, documented API through `exports` and never
  imports from a product.
- No package owns a product's tables or assumes an identity shared across
  products.
- A change to a published package needs a changeset (`pnpm changeset`).
- `packages/ui` vendors Fluid Functionalism; `registry-inventory.json` lists the
  vendored files and the deliberate local patches. Compose or wrap them rather
  than editing them, and update with the upstream `upgrade.mjs`.
- Region is configuration: nothing hard-codes a region. Products read it through
  `@preprocess/runmode`.
- We are not accepting outside contributions yet (CONTRIBUTING.md).

## Tests

Vitest runs inside the Workers runtime through `@cloudflare/vitest-plugin`, so
tests exercise real bindings, Durable Objects, R2 and queues. Tests are required
for any change touching tenant isolation, auth, billing, license or
entitlements, and optional elsewhere. Put a package's tests under `test/` with a
`vitest.config.ts` beside `package.json`; `packages/runmode` is the example.

## Verification

Run `pnpm validate`, `pnpm test` and `pnpm build` before handoff.
