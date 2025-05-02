import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.mts", "**/*.cts"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },
  {
    files: ["app.js", "database.js", ], // Target your specific app.js file
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "no-undef": "off", // Turn off the no-undef rule specifically for this file (or all .js)

    },
    
  },
  tseslint.config({
    rules: {
      "@typescript-eslint/no-require-imports": "off"
    }
  })
]);