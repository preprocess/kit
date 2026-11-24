# Changesets

Every pull request that changes a published package adds a changeset:

```sh
pnpm changeset
```

Pick the packages and the semver bump, and describe the change for the
changelog. On merge to `main`, the release workflow opens a "Version packages"
pull request; merging that one publishes to npm.
