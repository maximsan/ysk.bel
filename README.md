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

### Visual regression (Playwright)

Runs against a production build served locally. Baselines live in `tests/visual/home-snapshots/` (shared by `home-header.spec.js` and `home-sections.spec.js`).

```bash
yarn test:visual
yarn test:visual:update   # after intentional layout/CSS changes; commit updated PNGs
```

Playwright-only config (timeouts, blocked URLs, viewports) lives in [`tests/visual/constants.js`](tests/visual/constants.js). Shared waits are in [`tests/visual/support/home-snapshot-helpers.cjs`](tests/visual/support/home-snapshot-helpers.cjs). Shared **DOM ids, `data-*` attributes, and class hooks** are organized in [`src/scripts/constants/dom/`](src/scripts/constants/dom/) (one module per area); the site bundle imports those files directly. [`src/scripts/constants/homePageDom.cjs`](src/scripts/constants/homePageDom.cjs) re-exports the full flat API for tests and any code that wants a single import. See [docs/README.md](docs/README.md), [`playwright.config.mjs`](playwright.config.mjs), and [`.github/workflows/ci.yaml`](.github/workflows/ci.yaml) for the visual matrix, CI (visual job on **PRs only**: path filters + optional **`run-visual`** label), and snapshot updates via **`update-visual-snapshots`** (`.github/workflows/update-visual-snapshots.yaml`).

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

### package manager - yarn berry

### SSG - [Eleventy](https://www.11ty.dev/)

### [esbuild](https://esbuild.github.io/) for bundling

### babel-plugin-syntax-dynamic-import

```
Allow parsing of import()
```

## Optimizations:

#### convert videos with ffmpeg:

```bash
ffmpeg -i src/assets/videos/main-video-compressed.mp4 -c:v libvpx -crf 10 -b:v 1M -c:a libvorbis src/assets/videos/main-video-compressed.webm
```

#### convert images with cwebp:

```bash
cwebp -q 90 image.png -o image.webp
```
