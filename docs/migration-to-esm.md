# ESM migration — status

The site uses **native ESM** (`"type": "module"` in `package.json`), **Eleventy 3** with **`eleventy.config.mjs`**, and **esbuild** inside Eleventy for the client bundle (`src/scripts/index.js`). Unused **Babel** tooling was removed; regression coverage is **Playwright** against the production build.

**References:** [Eleventy config (ESM)](https://www.11ty.dev/docs/config/) · [Node.js ESM](https://nodejs.org/api/esm.html)

---

## Phase 1 — ESM completeness

- [x] Root `package.json` has `"type": "module"`.
- [x] No `require(` / `module.exports` / `exports.` in project `.js` / `.mjs` sources (excluding `node_modules`).
- [x] No stray `.cjs` entrypoints; no `__dirname` / `__filename` without ESM-safe patterns.
- [x] Eleventy loads `eleventy.config.mjs` with `export default`.
- [x] `src/data/*.js` use `export default` and match `setLiquidOptions({ globals })`.
- [x] Client entry `src/scripts/index.js` and imports use ESM.
- [x] `yarn build` produces `dist/` without module-resolution errors.

---

## Phase 2 — Dependencies

- [x] Removed unused Babel packages and `babel-loader` / `babel-plugin-syntax-dynamic-import`; client JS is transpiled/bundled by **esbuild** only.
- [x] Removed platform-pinned `@esbuild/darwin-arm64`; rely on **esbuild** optional platform packages from the main package.
- [x] Dropped unused `cross-env`.
- [ ] Periodically run `yarn outdated` / `yarn npm audit` and upgrade in small batches with `yarn build` + `yarn test`.

---

## Phase 3 — Configuration

- [x] Removed `.babelrc.json` (no Babel in pipeline).
- [x] Removed debug `console.log` from the JS template extension in `eleventy.config.mjs`.
- [x] `addWatchTarget` covers `src/assets`, `data`, `includes`, `layouts`, `pages`, `styles`.
- [x] `vercel.json` still targets `dist/`; deploy scripts unchanged in intent (`dist/` as build output).

---

## Phase 4 — Tests and CI

- [x] **Playwright** (`@playwright/test`) with `playwright.config.mjs`: `webServer` runs `yarn build` then **`serve`** on port 4173; tests in `e2e/`.
- [x] `package.json` scripts: `yarn test` / `yarn test:e2e` / `yarn test:e2e:ui`.
- [x] GitHub Actions: Node **20**, Corepack Yarn, `yarn install --immutable`, `yarn playwright install chromium --with-deps`, `yarn test`.
- [x] `engines.node` `>=20` in `package.json`; Volta pins aligned with Yarn 4.x.

First-time local setup for browsers: `yarn playwright install chromium`.
