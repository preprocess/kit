// The shared ESLint preset: recommended and type-checked TypeScript rules,
// type-only imports, underscore-prefixed unused names, and icons only through
// @preprocess/ui/lib/icons. Call it from a project's eslint.config.mjs:
//
//   import { config } from "@preprocess/config/eslint";
//   export default config({ tsconfigRootDir: import.meta.dirname });

import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @param {{ tsconfigRootDir: string }} options */
export const config = ({ tsconfigRootDir }) =>
  defineConfig(
    {
      ignores: [
        "**/coverage/**",
        "**/dist/**",
        "**/node_modules/**",
        "**/.turbo/**",
        "**/.wrangler/**",
      ],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
      languageOptions: {
        globals: globals.node,
        parserOptions: { projectService: true, tsconfigRootDir },
      },
      rules: {
        "@typescript-eslint/consistent-type-imports": [
          "error",
          { prefer: "type-imports" },
        ],
        "@typescript-eslint/no-import-type-side-effects": "error",
        // A leading underscore marks a deliberately unused name.
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
            ignoreRestSiblings: true,
          },
        ],
        // One icon module sets the shared size and stroke for every glyph.
        "no-restricted-imports": [
          "error",
          {
            paths: [
              {
                name: "lucide-react",
                message: "Import icons from @preprocess/ui/lib/icons.",
              },
            ],
          },
        ],
      },
    },
    {
      files: ["**/lib/icons.ts"],
      rules: { "no-restricted-imports": "off" },
    },
    {
      files: ["**/*.js", "**/*.mjs"],
      ...tseslint.configs.disableTypeChecked,
    },
  );
