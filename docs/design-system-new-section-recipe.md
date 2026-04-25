# New section on the home page — short recipe (Peat & linen)

Use this when adding a **new block** to `base.liquid` (or a new page that should match the system).

## 1. Markup (Liquid)

- Wrap in **`section`** (or `article` if appropriate) with a **stable `id`** if the nav or deep links need it.
- Add **`section-chapter section-container`** (and any existing modifier) so vertical rhythm and `section-chapter__header` / `__title` / `__subtitle` / `__lede` match other bands.
- Prefer **no inline** `style="..."` for color — use BEM + SCSS + tokens.

## 2. Styles (SCSS)

- Create or extend a partial under `src/styles/partials/_your-section.scss` (or co-locate with sibling feature).
- Import it from **`src/styles/index.scss`** in a sensible order (after tokens/constants).
- Use only:
  - **`var(--color-…)`** from `src/styles/modules/_tokens.scss` (and `var(--white)` / legacy aliases in `_constants.scss` if needed);
  - **`--section-*`**, **`--chrome-*`**, **surface** tokens for backgrounds and dividers;
  - **`--text-*` / `--font-`** for type scale.
- **Accent discipline:** reserve **`--color-accent*`** (and `--color-price` where relevant) for prices, CTAs, and carousel/chrome accents — not for long body titles (those use `--section-title-color` / `--color-text-primary`).

## 3. Data & scripts (if needed)

- If the section is in the in-page nav, add the **`id`** to **`src/scripts/constants/dom/sections.cjs`** (`SECTION_IDS`) and any Playwright / scroll helpers.
- Reuse **DOM hooks** in `src/scripts/constants/dom/*.cjs` and **`homePageDom.cjs`** so tests do not depend on restyle-fragile selectors.

## 4. Quality gates (run before commit)

1. `yarn build`
2. `yarn test:unit` (if JS changed)
3. `yarn test:a11y` (accessibility; requires built `dist/`)
4. `yarn test:visual` — add or extend a **locator screenshot** in `tests/visual/home-sections.spec.js` (or a dedicated spec) and update baselines: `yarn test:visual:update` (then commit `*-darwin.png` / refresh `*-linux.png` via the **`update-visual-snapshots`** PR label — see `.github/workflows/update-visual-snapshots.yaml`).
5. Optional: **`yarn test:visual:widths`** — first-screen viewport at `320, 375, 414, 768, 1024, 1280, 1440, 1920` (Chromium; see `playwright.width-pass.config.mjs`). After UI changes, **`yarn test:visual:widths:update`**.

## 5. Optional lab performance

- With **`yarn build && yarn exec serve dist -l 4173`** running: **`JSON` metrics:** **`yarn lighthouse:home:json`** / **`yarn lighthouse:mobile:json`** (use Playwright’s Chromium via `scripts/lighthouse-with-playwright.cjs`; output is gitignored). **WCAG gating** stays on **`yarn test:a11y`**, not Lighthouse.

**Related:** semantic tokens and section patterns in `src/styles/modules/_tokens.scss`, `_section-chapter.scss`, and the checklist in this file.

## CTA system (`.cta` / `cta-row`)

**Source of truth for styles:** `src/styles/partials/_cta.scss` (imported from `src/styles/index.scss`).

| Markup | Role |
|--------|------|
| `.cta` | Base: min touch target, radius, focus ring, transition. Add to the interactive element. |
| `.cta--primary` | One dominant action (call, main booking). Solid copper. |
| `.cta--ghost` | Secondary; on dark bands use with `.on-inverse` so tokens stay legible. |
| `.cta--link` | Text link that still shares focus/hit-area behaviour with the system. |
| `.cta-row` | Horizontal row with gap; for brand-coloured messengers, scope overrides in the section partial (see cooperation banner). |

- **Ornaments** (line-art) live in `src/includes/ornaments/*.liquid`; they use `currentColor` and are meant for editorial accents, not CTAs.
- **Data:** use additive fields on `src/data/*.js` (e.g. `meta.heroCta`, `cooperation.cta`) for label, `href`, and optional `ariaLabel`.
- **Accessibility:** if the visible label is short (phone, icon-only), set `aria-label` on the anchor that carries `.cta`.
