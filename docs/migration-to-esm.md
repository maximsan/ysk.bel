# ESM migration — verification plan

This document tracks **verification and follow-up** after switching the repo to native ECMAScript modules (`"type": "module"`), Eleventy 3, and `eleventy.config.mjs`. Treat every item as a gate you can tick off during iteration.

**References:** [Eleventy config (ESM)](https://www.11ty.dev/docs/config/) · [Babel config files](https://babeljs.io/docs/config-files) · [Node.js ESM](https://nodejs.org/api/esm.html)

---

## Phase 1 — ESM completeness

- [ ] Confirm root `package.json` has `"type": "module"` (required for bare `import`/`export` in `.js` under Node).
- [ ] Repo-wide scan: no remaining `require(`, `module.exports`, or `exports.` in project `.js` / `.mjs` / `.cjs` sources (excluding `node_modules`, lockfiles, and vendor snapshots).
- [ ] Repo-wide scan: no accidental `.cjs` entrypoints that should be ESM, or document any intentional CommonJS islands.
- [ ] All local `import` paths that Node resolves follow ESM rules (including explicit `.js` extensions where your toolchain requires them).
- [ ] No stray `__dirname` / `__filename` without an ESM-safe replacement (`import.meta.url` + `fileURLToPath` where needed).
- [ ] Eleventy config is loaded as ESM (`eleventy.config.mjs` or equivalent) and `export default` is used.
- [ ] `src/data/*.js` modules use `export default` and match `setLiquidOptions({ globals })` in `eleventy.config.mjs`.
- [ ] Client bundle entry `src/scripts/index.js` and everything it imports use ESM syntax end-to-end.
- [ ] Run `yarn build` on a clean tree and confirm output under `dist/` with no module-resolution errors.
- [ ] Run `yarn dev` (or `yarn watch:eleventy`) and spot-check pages, hashed CSS URLs, and bundled JS in the browser.

---

## Phase 2 — Dependencies and supply chain

- [ ] Decide whether **Babel** is still required: today the site bundles JS with **esbuild** from Eleventy; `@babel/core`, `@babel/preset-env`, `babel-loader`, and `babel-plugin-syntax-dynamic-import` do not appear in the active build scripts—either **remove** unused packages or **document** a concrete use (e.g. a future webpack pipeline).
- [ ] If Babel stays: align `@babel/preset-env` with `@babel/core` (avoid very old preset pins next to modern core) and drop `babel-plugin-syntax-dynamic-import` if the parser already supports `import()` (or replace with a maintained plugin only if truly needed).
- [ ] Review **esbuild** (`esbuild`, optional `@esbuild/*`): ensure versions match; for CI or teammates on other OS/arch, confirm installs are not broken by darwin-only optional deps (adjust lockfile / optionalDependencies strategy if needed).
- [ ] Run `yarn outdated` (or your preferred audit) and note safe upgrades for `@11ty/eleventy`, `sass`, `prettier`, runtime deps (`jquery`, `photoswipe`, etc.)—apply in small batches with rebuild checks.
- [ ] Run `yarn npm audit` (or `npm audit`) and triage actionable issues without breaking the static site constraints.

---

## Phase 3 — Configuration and maintenance

- [ ] Confirm `.babelrc.json` (or `babel.config.*`) still reflects reality after any Babel removal or upgrade; delete config if Babel is removed entirely.
- [ ] Review `eleventy.config.mjs` for **debug noise** (e.g. stray `console.log` in the JS extension) and remove or guard behind `DEBUG` / env flags.
- [ ] Confirm `addWatchTarget` paths cover everything that should hot-reload after the ESM move (`src/data`, `src/styles`, layouts, includes, assets, pages).
- [ ] Confirm `vercel.json` / `deploy.sh` / Surge flows still point at `dist/` and do not assume a different output or Node version than documented (Node 20+).
- [ ] Update **README** / **AGENTS.md** if workflow, config filenames, or “no Babel in build” facts change so future edits stay consistent.

---

## Phase 4 — Tests, automation, and regression safety

- [ ] Decide minimum **quality gate**: e.g. “`yarn build` must pass on CI” vs. adding a test runner.
- [ ] If using CI: add a workflow step that runs `yarn install --immutable` (or equivalent) and `yarn build` on the supported Node version(s).
- [ ] Optional: add a tiny **Node test** (e.g. Vitest or `node:test`) that `import()`s each `src/data/*.js` file and asserts `default` export shape (catches ESM / export mistakes without a browser).
- [ ] Optional: add **Playwright** or **linkinator**-style checks for critical pages and asset URLs after build (catches broken `hashed` paths or missing bundles).
- [ ] Optional: pin or document **Volta** / **engines** so local and CI Node versions stay aligned with ESM and Eleventy 3 expectations.

---

## Original migration checklist (historical)

These steps were completed during the initial migration; keep them for context only:

- [x] Update `package.json` with `"type": "module"`.
- [x] Migrate project JS from CommonJS to ESM (`import` / `export`).
- [x] Eleventy: ESM config (`eleventy.config.mjs`) and Eleventy 3.x.
- [x] Babel config filename compatible with tooling (`.babelrc.json`).
- [x] Data and client scripts converted to ESM.
- [x] Manual build/dev smoke tests after migration.
- [x] Documentation started (README / structure notes).

> Tick Phase 1–4 boxes as you verify each item. Add new bullets if your hosting or tooling surfaces extra constraints.
