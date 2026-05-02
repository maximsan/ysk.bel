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

### Visual regression + a11y (Playwright, Chromium)

One config: [`playwright.config.mjs`](playwright.config.mjs) — home visuals: **`<main>`** (hero→contacts; map masked) + cooperation + footer in [`tests/visual/home-snapshots/`](tests/visual/home-snapshots/), optional width pass (`yarn test:visual` includes it; or `yarn exec playwright test --project=width-pass` alone), and axe (`yarn test:a11y`). Timeouts / viewports in [`tests/visual/constants.js`](tests/visual/constants.js).

```bash
yarn test:visual          # home (3 viewports) + width pass
yarn test:visual:home     # home screenshots only
yarn test:a11y            # accessibility (needs dist/ or let Playwright build)
yarn test:playwright      # all of the above
yarn test:visual:update   # refresh local -darwin PNGs; use PR label for -linux
```

Shared waits: [`tests/visual/support/home-snapshot-helpers.cjs`](tests/visual/support/home-snapshot-helpers.cjs). DOM hooks: [`src/scripts/constants/dom/`](src/scripts/constants/dom/) → [`homePageDom.cjs`](src/scripts/constants/homePageDom.cjs). CI uses [`.github/actions/setup-yarn-playwright`](.github/actions/setup-yarn-playwright). See [docs/README.md](docs/README.md), [`.github/workflows/ci.yaml`](.github/workflows/ci.yaml), [`update-visual-snapshots`](.github/workflows/update-visual-snapshots.yaml).

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
