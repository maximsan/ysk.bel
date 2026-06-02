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

- If the section is in the in-page nav, add the **`id`** to **`src/scripts/constants/dom/sections.js`** (`SECTION_IDS`) and any Playwright / scroll helpers.
- Reuse **DOM hooks** in `src/scripts/constants/dom/*.js` and **`homePageDom.js`** so tests do not depend on restyle-fragile selectors.

## 4. Quality gates (run before commit)

1. `yarn build`
2. `yarn test:unit` (if JS changed)
3. `yarn test:a11y` (accessibility; requires built `dist/`)
4. `yarn test:visual` — extend **`tests/visual/home-sections.spec.js`** (consolidated `main-content` screenshot, or cooperation / footer strips) or add a focused spec + update baselines: `yarn test:visual:update` (commit `*-darwin.png` / refresh `*-linux.png` via **`update-visual-snapshots`** — `.github/workflows/update-visual-snapshots.yaml`).
5. Responsive first-screen coverage runs inside **`yarn test:visual`**: viewport snapshots at `320 … 1920` plus compact-phone bounds assertions (`playwright.config.js` project **`width-pass`**). Refresh with **`yarn test:visual:update`** after intentional UI changes.

## 5. Optional lab performance

- With **`yarn build && yarn exec serve dist -l 4173`** running: **`JSON` metrics:** **`yarn lighthouse:home:json`** / **`yarn lighthouse:mobile:json`** (use Playwright’s Chromium via `scripts/lighthouse-with-playwright.js`; output is gitignored).
- For the home-page lab pass, target **LCP ≤ 2.5s**, **CLS ≤ 0.05**, and **TBT ≤ 200ms**. INP is a production field metric, so do not report it as a local Lighthouse pass.
- **WCAG gating** stays on **`yarn test:a11y`**, not Lighthouse.

## 6. Manual UI QA

- Sample hero text-over-photo contrast in light and dark schemes at `320`, `375`, `414`, `768`, `1024`, `1280`, `1440`, and `1920px`. Axe cannot validate contrast against raster-photo pixels reliably.
- Check keyboard focus, hover states, and reduced-motion behaviour for changed interactive surfaces.
- Spot-check Firefox desktop, Android Chrome, and iOS Safari after layout changes. Fixed photo backgrounds must degrade to normal scrolling on phone widths.

**Related:** semantic tokens and section patterns in `src/styles/modules/_tokens.scss`, `_section-chapter.scss`, and the quality gates above.

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
