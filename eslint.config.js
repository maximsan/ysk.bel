import eslintComments from "@eslint-community/eslint-plugin-eslint-comments/configs";

const ecmaLatest = { ecmaVersion: "latest" };

/** ESLint directive hygiene only; see AGENTS.md (`yarn lint`). */
export default [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      ".yarn/**",
      "coverage/**",
      "playwright-report/**",
      "test-results/**",
    ],
  },
  {
    ...eslintComments.recommended,
    files: [
      "src/scripts/**/*.js",
      "src/data/**/*.js",
      "scripts/**/*.js",
      "tests/**/*.js",
      "*.config.js",
    ],
    languageOptions: {
      ...ecmaLatest,
      sourceType: "module",
    },
    rules: {
      ...eslintComments.recommended.rules,
      "@eslint-community/eslint-comments/no-unused-disable": "error",
    },
  },
];
