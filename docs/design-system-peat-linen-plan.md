# Design system — **Peat & linen** (option B)

North star: a **warm, tactile “dacha premium”** country estate by water — calm, trustworthy, slightly rustic; not generic startup orange, not kitsch.

**Palette gist:** warm gray surfaces, espresso text, a **single copper / brick accent** (not neon orange).

**On this branch:** [Playwright](https://playwright.dev) **visual regression** is wired for the home page (per-section screenshots, multiple browsers). Any **global color, typography, or layout** work in this plan will likely **invalidate baseline PNGs** — plan time to run `yarn test:visual:update` (or refresh snapshots in CI) and review the diff. See `docs/visual-regression-testing-plan.md`.

---

## Production palette skeleton (starting point)

Tune hex values against real photography after Phase 1.

| Role | Example hex | Notes |
|------|-------------|--------|
| Page background | `#F6F3EE` | `--color-bg-page` |
| Elevated / card | `#FFFCF8` | `--color-bg-elevated` |
| Text primary | `#2C241C` | espresso |
| Text muted | `#5C534A` | |
| Accent (replaces pure `#f66f30`) | `#C45C28` or `#B85A2F` | copper / brick |
| Accent hover | ~6–8% darker than accent | |
| Border | `rgba(44, 36, 28, 0.12)` | |
| Inverse strip (footer / banner optional) | bg `#1E1814`, text `#F2EBE3` | |

---

## Phase 0 — Audit & constraints

- [ ] Inventory color usage: `grep` / search for `$` SCSS variables vs `var(--` in `src/styles` (and inline styles in Liquid if any).
- [ ] List backgrounds that are not tokenized (inline gradients in partials such as stocking, videos, hero).
- [ ] Decide **one sans + one serif** stack; cap at **3 font weights** on the wire.
- [ ] Document current split: `:root` in `src/styles/modules/_constants.scss` vs `$brown`, `$orange`, `$light-blue`, Bootstrap-adjacent colors, social brand colors.

---

## Phase 1 — Design tokens (foundation)

- [ ] Add a single source of semantic tokens (expand `:root` in `_constants.scss` and/or add `src/styles/modules/_tokens.scss` imported from `index.scss`).
- [ ] Define **semantic names only**, for example:
  - [ ] `--color-bg-page`, `--color-bg-elevated`, `--color-bg-inverse`
  - [ ] `--color-text-primary`, `--color-text-muted`, `--color-text-inverse`
  - [ ] `--color-accent`, `--color-accent-hover`, `--color-accent-subtle`
  - [ ] `--color-border`, `--color-border-strong`
  - [ ] `--shadow-sm`, `--radius-md`, `--space-section`
- [ ] Map legacy tokens → semantic (release 1: **alias** old names in comments or as one-line re-exports, then remove).
- [ ] Set `theme-color` meta (e.g. in `head.liquid`) to match `--color-bg-page` or accent for browser UI consistency.

### Migration table (legacy → semantic, Peat & linen)

| Legacy / current | Target semantic (example) |
|------------------|---------------------------|
| `--dirty-orange`, `--orange`, `--light-orange`, `--orange-shadow` | `--color-accent` family |
| `--light-brown`, `--lighter-brown` | `--color-text-primary` / `--color-accent-subtle` / borders (pick roles per usage) |
| `$brown` (`#2b1910`) | `--color-text-primary` or inverse bg, depending on context |
| `$orange` | `--color-accent` |
| `$light-blue`, `$blue-white` | Re-map to muted neutrals or retire in video chrome (Phase 4) |
| Ad-hoc hex in partials | Replace with `var(--color-…)` |

---

## Phase 2 — Typography system

- [ ] Single `@import` (or `<link>` strategy) in one place — e.g. `index.scss` + `head.liquid` — for **Rubik** + **Source Serif 4** (or chosen pair), subset **Cyrillic + Latin** (verify current `head.liquid` / font commits on this branch before adding a second load path).
- [ ] Define roles: `--font-heading`, `--font-body`; scale `--text-h1` … `--text-caption` (can build on existing `--font-size-*` in `_constants.scss`).
- [ ] Remove duplicate font requests (serif currently loaded from partial SCSS — consolidate).
- [ ] Fix hero typo / bug: `--font-size-2xl` on `_hero.scss` (~line 58) as part of cleanup.

---

## Phase 3 — Section “chapters” (visual rhythm)

- [ ] Unify **vertical spacing** with `--space-section` (or equivalent) across services, stocking, videos, contacts.
- [ ] Unify **title block**: optional eyebrow + `h2` + subtitle `max-width`.
- [ ] Unify **surface rule**: either cards on page bg **or** two alternating subtle bands — avoid five different gradients.
- [ ] **Accent discipline:** copper accent only for primary actions and key numbers — not every heading.

---

## Phase 4 — Component pass (order of impact)

- [ ] **Header / nav** — background, link hover, active section.
- [ ] **Hero** — optional scrim for contrast; headline colors from tokens.
- [ ] **Services / packages** — borders and price color from tokens.
- [ ] **Stocking + videos** — align chrome (radius, border, CTA-adjacent accents) so they read as **siblings**, not two themes.
- [ ] **Contacts + map** — card surface `--color-bg-elevated`; map shell border `--color-border`.
- [ ] **Footer + info banner** — tie to `--color-bg-inverse` or elevated surface so banner does not clash.

---

## Phase 5 — Motion & polish

- [ ] One light page-load or section-enter pattern (CSS only); stagger **50–80ms** max.
- [ ] Respect `prefers-reduced-motion`.
- [ ] One **focus ring** style using `--color-accent`.

---

## Phase 6 — QA

- [ ] Contrast check (WCAG AA) on all text/background pairs.
- [ ] **Playwright visual tests:** run `yarn test:visual` after CSS/token changes; if changes are intentional, update baselines with `yarn test:visual:update` and commit `tests/visual/home-snapshots/*.png`. See `docs/visual-regression-testing-plan.md` (CI, Linux vs local, and `maxDiffPixelRatio` / `threshold` notes).
- [ ] **Breakpoints covered by baselines** (not the only widths to check manually, but the locked set): **390×844** (mobile), **768×1024** (tablet), **1440×900** (desktop) × Chromium, Firefox, WebKit — defined in `tests/visual/constants.js` / `playwright.config.mjs`.
- [ ] Lighthouse: CLS + font loading after consolidating font links.

---

## Explicitly out of scope (for now)

- [ ] Full rebrand illustration or new photography (optional later phase).
- [ ] Rewriting all copy (can follow once mood is stable).

---

## Success criteria

- [ ] One-sentence story fits the whole site: e.g. **“warm linen estate by the water.”**
- [ ] Every section uses **one accent + two neutrals + clear text hierarchy** (Peat & linen).
- [ ] No important color exists only as a raw hex in a partial — **tokens everywhere** that matters.
- [ ] New sections (e.g. another carousel) style in **minutes**, not ad-hoc orange picking.
- [ ] **`yarn test:visual` passes** after a token/CSS pass (or snapshots are **updated on purpose** and the PNG diff is reviewed).

---

## References in this repo

- Core variables: `src/styles/modules/_constants.scss`
- Global styles / imports: `src/styles/index.scss`
- Fonts: `src/includes/head.liquid` and any `@import` of fonts in partial SCSS
- Sections called out in audit: `_hero.scss`, `_services.scss`, `_stocking-carousel.scss`, `_videos-showcase.scss`, `_contacts.scss`, `_info-banner.scss`
- **Visual regression (this branch):** `docs/visual-regression-testing-plan.md`, `playwright.config.mjs`, `tests/visual/home-*.spec.js`, `tests/visual/support/home-snapshot-helpers.cjs`, `tests/visual/constants.js`, baselines under `tests/visual/home-snapshots/`
- **Shared DOM hooks for tests & scripts:** `src/scripts/constants/homePageDom.cjs`, `src/scripts/constants/dom/*.cjs` (keep selectors stable when restyling so Playwright locators do not break)
- **Agent rule (Cursor):** `.cursor/rules/playwright-visual.mdc`
