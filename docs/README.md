# Documentation index

- **Runbook:** root [`README.md`](../README.md) — dev, build, deploy, `yarn test:visual` / `yarn test:unit`
- **Visual + a11y (Chromium, single [`playwright.config.mjs`](../playwright.config.mjs)):** `yarn test:visual`, `yarn test:a11y`, `yarn test:playwright` (everything). Shared **`.github/actions/setup-yarn-playwright`** caches Yarn + Playwright browsers. `.github/workflows/` — `ci.yaml`, `update-visual-snapshots.yaml`.
- **Design system (in repo):** tokens in [`src/styles/modules/_tokens.scss`](../src/styles/modules/_tokens.scss); **new home section:** [`design-system-new-section-recipe.md`](design-system-new-section-recipe.md)
- **Copy — voice and backlog:** [`content-voice.md`](content-voice.md), [`content-rewrite-backlog.md`](content-rewrite-backlog.md)
