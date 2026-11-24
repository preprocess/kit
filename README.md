# Preprocess kit

Shared libraries for every Preprocess, Inc. product, MIT licensed.

| Package                                   | What it is                                               | Status                 |
| ----------------------------------------- | -------------------------------------------------------- | ---------------------- |
| [`@preprocess/ui`](packages/ui)           | Fluid Functionalism components, tokens, motion and icons | Published              |
| [`@preprocess/config`](packages/config)   | TypeScript, ESLint and Prettier presets                  | Published              |
| [`@preprocess/runmode`](packages/runmode) | The one reader of the deployment variable                | Published              |
| [`@preprocess/auth`](packages/auth)       | Better Auth setup and our extensions                     | Skeleton, build step 1 |
| [`@preprocess/logging`](packages/logging) | evlog setup, drains, redaction defaults                  | Skeleton               |

Billing (an Autumn client) and license (Ed25519 verify and the signing CLI)
arrive with build step 9.

Rules every package keeps: a small, documented public API through `exports`; no
product-specific identity or routing; and no tables of its own, because each
product supplies its own database and schema.

## Working on kit

Needs Node 24 and pnpm 10.

```sh
pnpm install
pnpm validate   # format, lint, typecheck
pnpm test       # Vitest in the Workers runtime
pnpm build
```

We are not accepting outside contributions yet; see
[CONTRIBUTING.md](CONTRIBUTING.md). Issues are open.

## Releases

Versions are managed with [changesets](.changeset/README.md). Add one with
`pnpm changeset` in any pull request that changes a published package. Merging
to `main` opens a "Version packages" pull request, and merging that publishes to
npm (the `NPM_TOKEN` secret).

Every pull request and push to `main` also gets an installable preview build
through [pkg.pr.new](https://pkg.pr.new), so a product can try a kit change in
its own pull request before it is released. This needs the pkg.pr.new GitHub App
installed on the repository.

To work on kit and a product together, check both out side by side and run
`pnpm kit:link` in the product (see its README).
