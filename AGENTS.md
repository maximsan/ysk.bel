# Agent notes — ysk.bel

Static marketing site for **Усадьба Серебряный Карась** (domain: уск.бел), built with Eleventy and server-rendered Liquid templates.

## Stack

- **SSG:** [Eleventy](https://www.11ty.dev/) 3.x (`eleventy.config.mjs`, ESM)
- **Templates:** Liquid (primary), Markdown and Nunjucks also allowed
- **Styles:** Sass/SCSS; entry SCSS files emit hashed filenames (see `eleventy.config.mjs`)
- **Client JS:** esbuild (in Eleventy) bundles **`src/scripts/index.js` only**; that file imports Bootstrap, `main`, PhotoSwipe. No Babel in the build pipeline.
- **Import aliases:** `@constants/*` → `src/scripts/constants/*`, `@scripts/*` → `src/scripts/*`, `@data/*` → `src/data/*`. Resolved by esbuild (`eleventy.config.mjs`), Vitest (`vitest.config.mjs`), IDE (`jsconfig.json`), and Node’s `--import ./import-aliases-register.mjs`. **npm scripts** run Node CLIs through `node run-with-import-aliases.mjs …` so that flag is set in one place (`package.json`).
- **Libraries:** Bootstrap 4, jQuery, Popper 1.x, PhotoSwipe 5
- **E2E:** [Playwright](https://playwright.dev/) (`e2e/`, `playwright.config.mjs`) — builds the site and serves `dist/` via `serve` during tests.

## npm scripts (`package.json`)

| Script | Use |
|--------|-----|
| `yarn dev` | `clean` then `eleventy --serve` — default local work |
| `yarn build` | `clean` then one-off production build to `dist/` |
| `yarn clean` | Remove `dist/` only |
| `yarn watch:eleventy` | Serve without running `clean` first (faster restarts if you manage `dist/` yourself) |
| `yarn build:eleventy` | Run Eleventy once without `clean` |
| `yarn debug` | `DEBUG=* eleventy --serve` — noisy Eleventy logging when diagnosing build/serve |
| `yarn format` | Prettier write on `src/` (Liquid via `@shopify/prettier-plugin-liquid`) |
| `yarn deploy:sh` | `npx surge dist ysk.surge.sh` (expects built `dist/`) |
| `yarn deploy` | `clean` → build → Surge deploy |
| `yarn deploy:rb` | `./deploy.sh` only (no build) |
| `yarn deploy:all` | `clean` → build → `deploy:rb` |
| `yarn test` / `yarn test:e2e` | Playwright against a fresh build (see `playwright.config.mjs`) |
| `yarn test:e2e:ui` | Playwright UI mode |

Node **20+** (`engines` in `package.json`); Volta pins Node 20.15.0 and Yarn 4.5.x. **Yarn Berry 4** (`.yarn/releases/`, `nodeLinker: node-modules`). After cloning, run `yarn playwright install chromium` once if you run E2E locally outside CI.

## Layout of `src/`

| Path | Role |
|------|------|
| `src/pages/` | Page content (e.g. `home/index.md`) |
| `src/layouts/` | Layouts (e.g. `base.liquid`) |
| `src/includes/` | Liquid partials |
| `src/data/` | Site data modules; many are imported in `eleventy.config.mjs` and exposed as **Liquid globals** (`banner`, `meta`, `footer`, etc.) |
| `src/styles/` | SCSS; files starting with `_` are partials only |
| `src/scripts/` | JS; bundle entry is `index.js` |
| `src/assets/` | Images, icons, videos, `public/` passthrough |

Build output: **`dist/`** (Vercel uses this via `vercel.json` `outputDirectory`).

## Conventions agents should follow

1. **Liquid globals:** Adding or renaming keys in `src/data/*.js` may require updating `eleventy.config.mjs` (`setLiquidOptions({ globals: … })`) so templates can use them.
2. **New client-side code:** Prefer wiring through `src/scripts/index.js` (or modules it imports). The Eleventy `js` extension only compiles that entry path.
3. **SCSS:** Partial files must use a leading underscore; non-partials get content-hashed output URLs.
4. **Asset URLs:** The `hashed` filter maps `src`-relative paths to built URLs; keep `outputMap` transforms in mind when referencing generated CSS/JS paths in Liquid.
5. **Passthrough assets:** Static files and some CSS paths are configured in `addPassthroughCopy` — check there before assuming a path lands in `dist/`.

## Deployment

Scripts are listed in the table above (`deploy`, `deploy:sh`, `deploy:rb`, `deploy:all`). Do not commit secrets; deployment is environment-specific.

On **GitHub Actions** (`main`), the **deploy** job runs only after the **build** job passes (including Playwright). It downloads the **`dist/`** artifact from that run, then runs `deploy.sh` — ensure `LOCAL_PATH` in secrets matches the artifact layout (typically `dist` or `./dist`).

## Scope discipline

Match existing patterns (Liquid includes, data modules, Sass structure). Client bundling is only what Eleventy wires for `src/scripts/index.js` plus esbuild in `eleventy.config.mjs`.
