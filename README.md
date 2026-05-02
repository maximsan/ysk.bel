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

Unit, accessibility, E2E, and visual regressions share Node tooling (`run-with-import-aliases.mjs` for `@constants/` in tests).

```bash
yarn test               # unit + a11y + e2e (after `yarn build` in CI)
```

### E2E smoke (Playwright)

Uses [`playwright.e2e.config.mjs`](playwright.e2e.config.mjs) and the built site in `dist/`.

```bash
yarn build && yarn test:e2e
yarn test:e2e:ui
```

### Visual regression + a11y (Playwright)

One config: [`playwright.config.mjs`](playwright.config.mjs) — home visuals: **`<main>`** (hero→contacts; map masked) + cooperation + footer in [`tests/visual/home-snapshots/`](tests/visual/home-snapshots/), optional width pass (`yarn test:visual` includes it; or `yarn exec playwright test --project=width-pass` alone), and axe (`yarn test:a11y`). Timeouts / viewports in [`tests/visual/constants.js`](tests/visual/constants.js).

```bash
yarn test:visual          # home (3 viewports) + width pass
yarn test:visual:home     # home screenshots only
yarn test:a11y            # accessibility (needs dist/ or let Playwright build)
yarn test:playwright      # all of the above
yarn test:visual:update   # refresh local -darwin PNGs; use PR label for -linux
```

Playwright-only config (timeouts, blocked URLs, viewports): [`tests/visual/constants.js`](tests/visual/constants.js). Shared waits: [`tests/visual/support/home-snapshot-helpers.js`](tests/visual/support/home-snapshot-helpers.js). DOM hooks: [`src/scripts/constants/dom/`](src/scripts/constants/dom/) → [`homePageDom.js`](src/scripts/constants/homePageDom.js). CI uses [`.github/actions/setup-yarn-playwright`](.github/actions/setup-yarn-playwright). See [docs/README.md](docs/README.md), [`playwright.config.mjs`](playwright.config.mjs), [`.github/workflows/ci.yaml`](.github/workflows/ci.yaml), and [`update-visual-snapshots`](.github/workflows/update-visual-snapshots.yaml) (visual job on **PRs**: path filters + optional **`run-visual`** label).

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
- **JS path aliases:** `@constants/*` → `src/scripts/constants/*`, `@scripts/*` → `src/scripts/*`, `@data/*` → `src/data/*` (see `jsconfig.json`, `eleventy.config.mjs`, `vitest.config.mjs`; Node loads `import-aliases-register.mjs` via `run-with-import-aliases.mjs` in `package.json` scripts)
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
