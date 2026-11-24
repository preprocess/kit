# @preprocess/config

Shared TypeScript, ESLint and Prettier presets for Preprocess, Inc. projects.

```jsonc
// tsconfig.json
{ "extends": "@preprocess/config/tsconfig.json" }
```

```js
// eslint.config.mjs
import { config } from "@preprocess/config/eslint";
export default config({ tsconfigRootDir: import.meta.dirname });
```

```jsonc
// package.json
{ "prettier": "@preprocess/config/prettier" }
```
