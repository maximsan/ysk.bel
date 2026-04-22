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

Runs against a production build served locally. Baselines live in `tests/visual/home.spec.js-snapshots/`.

```bash
yarn test:visual
yarn test:visual:update   # after intentional layout/CSS changes; commit updated PNGs
```

Playwright-only config (timeouts, blocked URLs, viewports) lives in [`tests/visual/constants.js`](tests/visual/constants.js). Shared **DOM ids, `data-*` attributes, and class hooks** for the home page and video carousel are in [`src/scripts/constants/homePageDom.cjs`](src/scripts/constants/homePageDom.cjs) and are imported by the site bundle and by the tests. See [docs/visual-regression-testing-plan.md](docs/visual-regression-testing-plan.md) for the browser × viewport matrix, CI behavior (visual job on **PRs only**: path filters + optional **`run-visual`** label), and review workflow.

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
