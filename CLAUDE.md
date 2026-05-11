# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static marketing site for **Усадьба Серебряный Карась** (domain: уск.бел). Eleventy 3.x SSG with Liquid templates, SCSS, and esbuild for client JS. Deployed to Vercel (`outputDirectory: dist`).

## Commands

```bash
yarn dev                  # clean + Eleventy serve (local development)
yarn build                # production build → dist/
yarn format               # Prettier on src/
yarn lint                 # ESLint (directive comments hygiene only)
yarn lint:styles          # Stylelint on src/styles/**/*.scss
yarn lint:styles:fix      # Stylelint with auto-fix
yarn test                 # unit + a11y + e2e (CI default, requires dist/)
yarn test:unit            # Vitest unit tests
yarn test:unit:watch      # Vitest watch mode
yarn test:e2e             # Playwright E2E smoke (builds site first)
yarn test:a11y            # Playwright + Axe accessibility
yarn test:visual          # Visual regression: 3 viewports + width-pass
yarn test:visual:update   # Refresh local -darwin PNG baselines
```

## Architecture

### Build pipeline

- **Eleventy** compiles Liquid templates, runs SCSS via a custom extension handler (MD5-hashed output filenames), and bundles `src/scripts/index.js` with **esbuild** (no Babel).
- The `hashed` Liquid filter maps `src`-relative paths to content-hashed built URLs — use it in templates instead of hardcoding paths.
- `dist/` is the only output directory; `vercel.json` points there.

### Source layout

| Path | Role |
|------|------|
| `src/pages/` | Page content (`home/index.md`) |
| `src/layouts/` | Liquid layout templates |
| `src/includes/` | Liquid partials |
| `src/data/` | Site data modules — many imported in `eleventy.config.js` as Liquid globals |
| `src/styles/` | SCSS; files prefixed `_` are partials (never compiled independently) |
| `src/scripts/` | JS; **`index.js` is the sole esbuild entry point** |
| `src/assets/` | Images, icons, videos, `public/` passthrough |

### Data → template wiring

Data modules in `src/data/*.js` become Liquid globals only when explicitly registered in `eleventy.config.js`. Adding or renaming keys there requires a corresponding update in that config.

### Client JS

All client-side code must be wired through `src/scripts/index.js` or modules it imports. Import path aliases (`@constants`, `@scripts`, `@data`) are defined in `jsconfig.json` and resolved by the esbuild plugin in `eleventy.config.js`.

### Passthrough assets

Static files reach `dist/` only if configured in `addPassthroughCopy` inside `eleventy.config.js`. Check there before assuming a file's `dist/` path.

## Testing

### Playwright setup

Single `playwright.config.js` with four project types:
- `chromium-{mobile|tablet|desktop}` — visual regression snapshots
- `width-pass` — width sweep (`tests/visual/home-width-pass.spec.js`, baselines in `tests/visual/width-snapshots/`)
- `a11y` — Axe accessibility (`tests/a11y/`)
- `e2e` — build smoke (`tests/e2e/`)

All projects share one static server on port **4173** (`yarn build && serve dist`, or prebuilt `PLAYWRIGHT_PREBUILT_DIST=1`).

Visual baselines: `tests/visual/home-snapshots/*-{darwin,linux}.png`. Platform suffix comes from `snapshotPathTemplate`. DOM selectors live in `src/scripts/constants/dom/homePageDom.js`, imported by tests via `tests/visual/constants.js`. Shared wait helpers: `tests/visual/support/home-snapshot-helpers.js`.

### CI flow

1. **build** job: `yarn build` → unit → a11y → e2e → upload `dist/` artifact
2. **visual** job: download artifact → `PLAYWRIGHT_PREBUILT_DIST=1 yarn test:visual`
3. **update-visual-snapshots** job: run with `--update-snapshots`, commit `*-linux.png` baselines

## Conventions

### Comments

Follow `.cursor/rules/comment-style.mdc`. Key rules:
- Comments are always **English** regardless of site copy language.
- Write comments for contracts, cross-file sync points (phone numbers, anchor IDs, carousel order), and browser/a11y constraints — not for self-evident code.
- Format: `/** … */` or aligned `*`/`#` lines; one idea per line; no long run-on lines.
- Reference `docs/glossary.md` for domain/UX terms (e.g. *scrim*, *colophon*) — cite the heading: `docs/glossary.md («Scrim»)`.

### SCSS

SCSS partials **must** have a leading underscore. Non-partial files get content-hashed output URLs via Eleventy's custom extension handler.

### Toolchain notes

- **Package manager:** Yarn Berry 4 (`nodeLinker: node-modules`). Use `yarn` not `npm`.
- **Node:** 20.x (Volta pin in `package.json`).
- **ESM project** (`"type": "module"`).
- **Pre-commit hooks** (GitGuardian, ESLint, Stylelint on staged SCSS) install automatically after `yarn install` when `pre-commit` CLI is on `PATH`.
