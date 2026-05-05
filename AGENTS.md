# Agent notes — ysk.bel

Static marketing site for **Усадьба Серебряный Карась** (domain: уск.бел), built with Eleventy and server-rendered Liquid templates.

## Stack

- **SSG:** [Eleventy](https://www.11ty.dev/) 3.x (`eleventy.config.mjs`)
- **Templates:** Liquid
- **Styles:** Sass/SCSS
- **Client JS:** esbuild bundles **`src/scripts/index.js` only**; that file imports Bootstrap, `main`, PhotoSwipe. No Babel in the build pipeline.
- **Import aliases:** Check out `jsconfig.json`.
- **Libraries:** Bootstrap 4, jQuery, Popper 1.x, PhotoSwipe 5
- **E2E:** [Playwright](https://playwright.dev/) (`playwright.config.mjs`) — builds the site and serves `dist/` via `serve` during tests.
- **Runtime:** Node **20.x** (`package.json` `engines`).
- **Yarn Berry 4** (`.yarn/releases/`, `nodeLinker: node-modules`).

## Full script list and local setup

- [`README.md`](README.md),
- [`package.json`](package.json).

## Layout of `src/`

| Path            | Role                                                                                                                               |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `src/pages/`    | Page content (e.g. `home/index.md`)                                                                                                |
| `src/layouts/`  | Layouts (e.g. `base.liquid`)                                                                                                       |
| `src/includes/` | Liquid partials                                                                                                                    |
| `src/data/`     | Site data modules; many are imported in `eleventy.config.mjs` and exposed as **Liquid globals** (`banner`, `meta`, `footer`, etc.) |
| `src/styles/`   | SCSS; files starting with `_` are partials only                                                                                    |
| `src/scripts/`  | JS; bundle entry is `index.js`                                                                                                     |
| `src/assets/`   | Images, icons, videos, `public/` passthrough                                                                                       |

Build output: **`dist/`** (`vercel.json` → `outputDirectory` for Vercel).

## Common commands

| Command       | Use                                                 |
| ------------- | --------------------------------------------------- |
| `yarn dev`    | Default local work (`clean` + Eleventy serve)       |
| `yarn build`  | Production build to `dist/`                         |
| `yarn format` | Prettier on `src/`                                  |
| `yarn test`   | Unit + a11y + E2E (see README / Playwright configs) |

Everything else: **`package.json`** / **[README.md](README.md)**.

## Conventions agents should follow

1. **Liquid globals:** Adding or renaming keys in `src/data/*.js` may require updating `eleventy.config.mjs`.
2. **New client-side code:** Prefer wiring through `src/scripts/index.js` (or modules it imports).
3. **SCSS:** Partial files must use a leading underscore; non-partials get content-hashed output URLs.
4. **Asset URLs:** The `hashed` filter maps `src`-relative paths to built URLs; keep `outputMap` transforms in mind when referencing generated CSS/JS paths in Liquid.
5. **Passthrough assets:** Static files and some CSS paths are configured in `addPassthroughCopy` — check there before assuming a path lands in `dist/`.
6. **Comments:** When adding or rewriting comments in **any** file, follow **[`.cursor/rules/comment-style.mdc`](.cursor/rules/comment-style.mdc)** (`globs: **/*`, `alwaysApply: false`; **`@`** that rule when it is not already in context). For domain jargon in UI/accessibility/copy, use **`docs/glossary.md`** — link or align wording instead of opaque shorthand.

## Scope discipline

Match existing patterns (Liquid includes, data modules, Sass structure). Client bundling is only what Eleventy wires for `src/scripts/index.js` plus esbuild in `eleventy.config.mjs`.
