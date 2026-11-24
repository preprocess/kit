import { readFileSync } from "node:fs";
import tseslint from "typescript-eslint";

import { config } from "@preprocess/config/eslint";

const inventory = JSON.parse(
  readFileSync(new URL("./registry-inventory.json", import.meta.url), "utf8"),
);

// Upstream Fluid source is linted for real errors only; style rules that
// would force edits to vendored files are off (see registry-inventory.json).
const importedFiles = inventory.fluid.files;

// Upstream thinking-steps carries a Next.js eslint-disable comment. A no-op
// rule of that name keeps the directive valid without editing the file.
const nextCompat = {
  rules: { "no-img-element": { create: () => ({}) } },
};

export default [
  { ignores: ["eslint.config.mjs"] },
  ...config({ tsconfigRootDir: import.meta.dirname }),
  {
    files: ["scripts/**/*.mjs"],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: importedFiles,
    plugins: { "@next/next": nextCompat },
    linterOptions: { reportUnusedDisableDirectives: "off" },
    rules: {
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-base-to-string": "off",
      "@typescript-eslint/consistent-type-imports": "off",
      "@typescript-eslint/no-import-type-side-effects": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/unbound-method": "off",
    },
  },
];
