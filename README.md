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

### Deploy to the hosting server

```bash
    yarn run deploy:all
```

## Main technologies used in project

- **Package manager:** yarn berry
- **SSG:** [Eleventy](https://www.11ty.dev/) (now using ESM modules, see below)
- **Bundler:** [esbuild](https://esbuild.github.io/)
- **Babel:** For modern JS compatibility
- **Sass:** For stylesheets

### Directory structure

- Source: `src/`
- Data: `src/data/` (ESM modules)
- Includes: `src/includes/`
- Layouts: `src/layouts/`
- Scripts: `src/scripts/` (ESM modules)
- Styles: `src/styles/`

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
