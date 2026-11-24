# Contributing

Thank you for your interest. We are not accepting outside contributions yet: a
workflow closes pull requests from people outside the Preprocess organization,
with a note pointing here. We will say so in this file when that changes.

Issues are open. Bug reports are welcome, ideally with a minimal reproduction
and the package versions you used.

## Versioning

Every published package follows [semantic versioning](https://semver.org).
Breaking changes to a package's public API (its `exports`) need a major version.
We track versions with [changesets](.changeset/README.md): each pull request
that changes a published package adds one with `pnpm changeset`.

## Tests

Tests run with Vitest inside the Workers runtime (`@cloudflare/vitest-plugin`):

```sh
pnpm test
```

They are required for anything touching tenant isolation, auth, billing, license
and entitlements, and optional elsewhere.
