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

### Run E2E tests (build + Playwright)

```bash
    yarn test
```

### Deploy to the hosting server

```bash
    yarn run deploy:all
```

## Main technologies used in project

- **Package manager:** yarn berry
- **SSG:** [Eleventy](https://www.11ty.dev/) 3.x (ESM config: `eleventy.config.mjs`)
- **Bundler:** [esbuild](https://esbuild.github.io/) (via Eleventy for client JS)
- **Sass:** For stylesheets
- **E2E:** [Playwright](https://playwright.dev/) — `yarn test` (see `docs/migration-to-esm.md`)

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
