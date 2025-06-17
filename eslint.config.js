import { join } from "node:path";
import tseslint from "typescript-eslint";
import { FlatCompat } from "@eslint/eslintrc";
import storybook from "eslint-plugin-storybook";
import { includeIgnoreFile } from "@eslint/compat";

export default tseslint.config(
  includeIgnoreFile(join(import.meta.dirname, ".gitignore")),

  ...new FlatCompat().config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"]
  }),

  {
    files: ["**/*.ts", "**/*.tsx"],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname
      }
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin
    },
    rules: {
      // typescript rules
      "@typescript-eslint/prefer-optional-chain": "warn",
      "@typescript-eslint/prefer-ts-expect-error": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }
      ]
    }
  },

  storybook.configs["flat/recommended"]
);
