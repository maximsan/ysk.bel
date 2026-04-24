# Documentation index

- **Runbook:** root [`README.md`](../README.md) — dev, build, deploy, `yarn test:visual` / `yarn test:unit`
- **Visual regression:** `playwright.config.mjs`, `tests/visual/**`, PR workflow + snapshot refresh in [`.github/workflows/`](../.github/workflows/) (`ci.yaml`, `update-visual-snapshots.yaml`); a11y: `yarn test:a11y`; optional lab report: `yarn lighthouse:home` (writes gitignored `lighthouse-home.html`).
- **Design system (in repo):** tokens in [`src/styles/modules/_tokens.scss`](../src/styles/modules/_tokens.scss); **new home section:** [`design-system-new-section-recipe.md`](design-system-new-section-recipe.md)
- **Copy — voice and backlog:** [`content-voice.md`](content-voice.md), [`content-rewrite-backlog.md`](content-rewrite-backlog.md)
