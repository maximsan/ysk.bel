# уск.бел website

## Main scripts

### Start application in dev mode

```bash
    yarn run dev
```

### Build application

```bash
    yarn run build
```

### Tests (CI default)

Unit, accessibility, and E2E smoke tests (requires a prior `yarn build` for a11y/e2e — the `test` script runs them in one go after `build` in CI).

```bash
yarn test
```

### E2E smoke (Playwright)

Uses `playwright.e2e.config.mjs` and the built site in `dist/`.

```bash
yarn build && yarn test:e2e
yarn test:e2e:ui
```

### Visual regression (Playwright)

Runs against a production build served locally. Baselines live in `tests/visual/home-snapshots/` (shared by `home-header.spec.js` and `home-sections.spec.js`).

```bash
yarn test:visual
yarn test:visual:update   # after intentional layout/CSS changes; commit updated PNGs
```

Playwright-only config (timeouts, blocked URLs, viewports) lives in [`tests/visual/constants.js`](tests/visual/constants.js). Shared waits are in [`tests/visual/support/home-snapshot-helpers.js`](tests/visual/support/home-snapshot-helpers.js). Shared **DOM ids, `data-*` attributes, and class hooks** are organized in [`src/scripts/constants/dom/`](src/scripts/constants/dom/) (one module per area); the site bundle imports those files directly. [`src/scripts/constants/homePageDom.js`](src/scripts/constants/homePageDom.js) re-exports the full flat API for tests and any code that wants a single import. See [docs/README.md](docs/README.md), [`playwright.config.mjs`](playwright.config.mjs), and [`.github/workflows/ci.yaml`](.github/workflows/ci.yaml) for the visual matrix, CI (visual job on **PRs only**: path filters + optional **`run-visual`** label), and snapshot updates via **`update-visual-snapshots`** (`.github/workflows/update-visual-snapshots.yaml`).

### Unit tests (Vitest)

```bash
yarn test:unit
yarn test:unit:watch
```

Tests live under [`tests/unit/`](tests/unit/); config: [`vitest.config.mjs`](vitest.config.mjs). CI runs `yarn test:unit` in the **build** job on every push/PR.

### Deploy to the hosting server

```bash
    yarn run deploy:all
```

## Main technologies used in project

- **Package manager:** yarn berry
- **SSG:** [Eleventy](https://www.11ty.dev/) 3.x (ESM config: `eleventy.config.mjs`)
- **Bundler:** [esbuild](https://esbuild.github.io/) (via Eleventy for client JS)
- **Sass:** For stylesheets
- **Testing:** [Playwright](https://playwright.dev/) — visual regression, a11y, E2E; [Vitest](https://vitest.dev/) for unit tests (see `docs/migration-to-esm.md`)

### Directory structure

- Source: `src/`
- Styles: `src/styles/`
- Data: `src/data/`
- Includes: `src/includes/`
- Layouts: `src/layouts/`
- Scripts: `src/scripts/`

### Requirements

- Node.js 20+ required.

## Optimizations:

#### convert videos with ffmpeg:

```bash
ffmpeg -i src/assets/videos/main-video-compressed.mp4 -c:v libvpx -crf 10 -b:v 1M -c:a libvorbis src/assets/videos/main-video-compressed.webm
```

#### convert images with cwebp:

```bash
cwebp -q 90 image.png -o image.webp
```
