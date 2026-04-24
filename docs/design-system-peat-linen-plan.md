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

- [x] Single `<link>` in `head.liquid` for **Rubik** (400/500/700 + 500 italic) + **Source Serif 4** (600, opsz 8–60); `preconnect` to `fonts.googleapis.com` / `fonts.gstatic.com`.
- [x] Define roles: `--font-heading` in `_tokens.scss`, `--font-body` and `--text-h1` … `--text-hero-wide` in `_constants.scss` (maps to existing `--font-size-*`).
- [x] Remove duplicate font requests — removed `@import url` from `index.scss` and Source Serif `@import` from `_stocking-carousel.scss`.
- [x] Fix hero invalid value: `font-size: --font-size-2xl` → `var(--text-hero-medium)`; other breakpoints use `--text-hero-*` tokens.

---

## Phase 3 — Section “chapters” (visual rhythm)

- [x] **Vertical spacing:** `.section-chapter` + `--section-pad-block` / `--section-scroll-margin` on services, stocking, videos, contacts; removed legacy `py-10rem` and duplicate service paddings.
- [x] **Title block:** `section-chapter__header` / `__title` / `__subtitle` / `__lede` (Liquid) with tokens `--section-title-color`, `--section-subtitle-color`, `--section-subtitle-max-width`, `--section-header-margin-bottom`.
- [x] **Surfaces:** two-band Peat & linen via `--surface-page`, `--surface-warm-veil`, `--section-edge-border`, `--section-inset-highlight`; stocking + video sections + carousel chrome use shared `--chrome-*` tokens (not five unrelated gradients).
- [x] **Accent discipline** — *policy, not a one-off task:* reserve **copper** (`--color-accent*`) for prices (`.text-danger` → `--color-price`), CTA-style badges, carousel controls, and key tooltips; **body/section titles** use `--section-title-color` / nav uses `--nav-link-active-color`. Phases 3–4 applied this; new UI should follow the same tokens.

---

## Phase 4 — Component pass (order of impact)

- [x] **Header / nav** — `--header-shadow`, `--color-bg-inverse` bar, phone hover `--color-accent-light`, `initNavScrollSpy` + `[aria-current='true']` → `--nav-link-active-color`.
- [x] **Hero** — `--hero-scrim` overlay, headlines `--color-text-primary`.
- [x] **Services / packages** — card border tokenized; `.packages .text-danger` → `--color-price`; `.advertisement` / `.accommodation` → `--color-accent`; section id `services` (matches `#services`).
- [x] **Stocking + videos** — sibling chrome via shared `--chrome-*` / surfaces (Phases 3–4).
- [x] **Contacts + map** — contacts card `--color-bg-elevated`; `.map-shell` uses `--map-shell-*` tokens.
- [x] **Footer + banners** — footer `--color-bg-inverse`; cooperation `--color-bg-elevated` + `--color-text-primary`; info modal `--info-banner-*` + `--color-focus-ring`.

---

## Phase 5 — Motion & polish

- [x] **Section enter:** `section.section-chapter` uses `section-chapter-in` (opacity + short translate) with sibling stagger `70ms` (max ≈ 210ms for four blocks); `prefers-reduced-motion: reduce` disables it (`_motion-polish.scss`).
- [x] **`prefers-reduced-motion`:** section animations off; `scroll-behavior: smooth` only when not reduced; nav underline + carousel transitions toned down in mixins / stocking / videos; stocking image zoom off when reduced.
- [x] **Focus ring:** `--color-focus-ring` (same intent as accent) + `--focus-ring-width` / `--focus-ring-offset` on carousels, info links, and `@mixin outline` (focus-visible + `:focus:not(:focus-visible)`).

---

## Phase 6 — QA

- [x] Contrast check (WCAG AA): automated **axe** on home (`yarn test:a11y`); token fixes for accent-on-cream and Viber-on-footer as needed. Manual spot-check still useful for photography/gradients.
- [x] **Playwright visual tests:** run `yarn test:visual` after CSS/token changes; if changes are intentional, update baselines with `yarn test:visual:update` and commit `tests/visual/home-snapshots/*.png`. See `docs/visual-regression-testing-plan.md` (CI, Linux vs local, and `maxDiffPixelRatio` / `threshold` notes).
- [x] **Breakpoints covered by baselines** (not the only widths to check manually, but the locked set): **390×844** (mobile), **768×1024** (tablet), **1440×900** (desktop) × Chromium, Firefox, WebKit — defined in `tests/visual/constants.js` / `playwright.config.mjs`.
- [ ] Lighthouse: CLS + font loading — run locally after `yarn build && yarn exec serve dist -l 4173` (not automated in CI).

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
- [x] **`yarn test:visual` passes** after a token/CSS pass (or snapshots are **updated on purpose** and the PNG diff is reviewed).
- [x] **`yarn test:a11y` passes** (axe, serious/critical rules on home; map and GTM iframe excluded where third-party).

---

## References in this repo

- Core variables: `src/styles/modules/_constants.scss`
- Global styles / imports: `src/styles/index.scss`
- Fonts: `src/includes/head.liquid` and any `@import` of fonts in partial SCSS
- Sections called out in audit: `_hero.scss`, `_services.scss`, `_stocking-carousel.scss`, `_videos-showcase.scss`, `_contacts.scss`, `_info-banner.scss`
- **Visual regression (this branch):** `docs/visual-regression-testing-plan.md`, `playwright.config.mjs`, `tests/visual/home-*.spec.js`, `tests/visual/support/home-snapshot-helpers.cjs`, `tests/visual/constants.js`, baselines under `tests/visual/home-snapshots/`
- **Accessibility (Phase 6):** `playwright.a11y.config.mjs`, `tests/a11y/home-axe.spec.js`, `yarn test:a11y` (serves `dist/`; locally run `yarn build` first — the CI **build** job runs `yarn build` before a11y).
- **Shared DOM hooks for tests & scripts:** `src/scripts/constants/homePageDom.cjs`, `src/scripts/constants/dom/*.cjs` (keep selectors stable when restyling so Playwright locators do not break)
- **Agent rule (Cursor):** `.cursor/rules/playwright-visual.mdc`
