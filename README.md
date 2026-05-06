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

### Git hooks ([pre-commit](https://pre-commit.com/))

After **`yarn install`**, a Yarn plugin runs **`pre-commit install`** when the **`pre-commit`** CLI is on your `PATH` and Git is using **`.git/hooks`** (not a custom `core.hooksPath`). See [`.yarn/plugins/yarn-plugin-pre-commit-install.cjs`](.yarn/plugins/yarn-plugin-pre-commit-install.cjs), [`scripts/postinstall-pre-commit.js`](scripts/postinstall-pre-commit.js), and [`.pre-commit-config.yaml`](.pre-commit-config.yaml). When configured, hooks include **GitGuardian**, **ESLint** (directive comments), and **Stylelint** on staged SCSS.

### Tests (CI default)

```bash
yarn test               # unit + a11y + e2e (after `yarn build` in CI)
```

### E2E smoke (Playwright)

```bash
yarn build && yarn test:e2e
yarn test:e2e:ui
```

### Visual regression + a11y (Playwright)

```bash
yarn test:visual          # home (3 viewports) + width pass
yarn test:visual:home     # home screenshots only
yarn test:a11y            # accessibility (needs dist/ or let Playwright build)
yarn test:playwright      # all of the above
yarn test:visual:update   # refresh local -darwin PNGs; use PR label for -linux
```

### Unit tests (Vitest)

```bash
yarn test:unit
yarn test:unit:watch
```

CI runs `yarn test:unit` in the **build** job on every push/PR.

### Deploy to the hosting server

Scripts: `deploy`, `deploy:rb` (`./deploy.sh` only), `deploy:all` — see [`package.json`](package.json).

**GitHub Actions (`main`):** the **deploy** job runs after **build** (including Playwright). It downloads the **`dist/`** artifact from that run, then runs **`deploy.sh`**. Repo secrets (`LOCAL_PATH`, SSH, remote paths) must match the artifact layout (typically `dist` or `./dist`).

```bash
yarn run deploy:all
```

## Main technologies used in project

- **Package manager:** yarn berry
- **SSG:** [Eleventy](https://www.11ty.dev/) 3.x (ESM config: `eleventy.config.js`)
- **Bundler:** [esbuild](https://esbuild.github.io/) (via Eleventy for client JS)
- **Sass:** For stylesheets
- **Testing:**
  - [Playwright](https://playwright.dev/) — visual regression, a11y, E2E;
  - [Vitest](https://vitest.dev/) for unit tests

## Optimizations

#### Useful tools

##### Convert videos with ffmpeg:

```bash
ffmpeg -i src/assets/videos/main-video-compressed.mp4 -c:v libvpx -crf 10 -b:v 1M -c:a libvorbis src/assets/videos/main-video-compressed.webm
```

##### Convert images with cwebp:

```bash
cwebp -q 90 image.png -o image.webp
```
