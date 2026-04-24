# Plan — hero / info-banner / cooperation-banner redesign

Trackable plan for redesigning the three top-of-page sections on the home page. Built on the existing **Peat & linen** token system (`src/styles/modules/_tokens.scss`) and the Eleventy/Liquid architecture described in `AGENTS.md`. Checkboxes are grouped so each group can ship as an independent PR.

**Aesthetic direction:** rural-editorial / artisanal estate — Source Serif 4 display with oldstyle figures, copper hairline rules, a small library of line-art ornaments (carp, rod, reed, handshake), a subtle paper grain, and a single CTA vocabulary (primary copper pill · ghost · link).

**Target files (recurring):**
- `src/includes/hero-section.liquid`, `src/styles/partials/_hero.scss`
- `src/includes/components/info-banner.liquid`, `src/styles/partials/_info-banner.scss`, `src/scripts/helpers/infoBanner.js`
- `src/includes/cooperation-banner.liquid`, `src/styles/partials/_cooperation-banner.scss`
- `src/layouts/base.liquid`, `src/data/*.js`, `eleventy.config.mjs`
- `tests/visual/home-snapshots/**`

---

## Group A — Foundations (unblock the rest)

- [x] Extend `src/data/meta.js` with `heroCta` (primary `{ label, href }`, secondary `{ label, href }`), `heroEyebrow`, and `heroTrustStrip: string[]`
- [x] Extend `src/data/banner.js` with `variant: 'strip' | 'modal'` (default `'strip'`) and per-message `date: string`
- [x] Create `src/data/cooperation.js` with `title`, `lede`, `cta[]` (whatsapp / viber / tel); wire as Liquid global in `eleventy.config.js`
- [x] Add new tokens to `src/styles/modules/_tokens.scss`: `--cta-primary-*`, `--cta-ghost-*`, `--cta-radius`, `--cta-min-hit`, `--cta-gap`, `--hairline-copper(-strong)`, `--paper-grain-opacity`, `--hero-scrim-radial`, `--motion-hero-stagger`
- [x] Create `src/styles/partials/_cta.scss` with `.cta`, `.cta--primary`, `.cta--ghost`, `.cta--link`, `.cta-row`, `.ornament` (≥44×44 hit area, focus ring via `@mixin outline`, `.on-inverse` dark-surface variant)
- [x] Add `@mixin editorial-rule` and `@mixin paper-grain` to `src/styles/modules/_mixins.scss`
- [x] Add line-art ornament partials under `src/includes/ornaments/` (`carp`, `rod`, `reed`, `handshake`) — inline SVG, `currentColor`-driven, invoked via `{% render 'ornaments/<name>' %}`

---

## Group B — Hero rebuild

`src/includes/hero-section.liquid`, `src/styles/partials/_hero.scss`,
`src/scripts/helpers/heroScrollCue.js`, `src/includes/head.liquid`

- [x] Replace CSS `background-image` with a `<picture>` element (responsive WebP `srcset`, `fetchpriority="high"`, `decoding="async"`, `loading="eager"`). AVIF sources are a follow-up once asset pipeline generates them — see Group H.
- [x] Remove `background-attachment: fixed` and the `margin-left: 24rem` layout hack
- [x] Switch hero layout to a CSS Grid single-cell stage (`.hero > * { grid-area: stage }`) — left-anchored well ≥992px, centered on mobile
- [x] Promote the first heading to `<h1>`; add eyebrow `<p>` ("Минская область · Логойский р-н") with copper hairline rules flanking it
- [x] Apply Source Serif 4 with `font-optical-sizing: auto` + `font-variant-numeric: oldstyle-nums`; fluid scale via `clamp()`; `text-wrap: balance` on title, `pretty` on lede
- [x] Add primary CTA (`tel:+375291495989`) and secondary CTA (`#services`) via `.cta` system
- [x] Add trust strip row ("30 мин от Минска · Рыбалка круглый год · Баня до 8 чел.") with middle-dot `::after` separators
- [x] Add scroll cue (hairline + animated dot) below content; hides on first scroll via `heroScrollCue.js` (one-shot `passive` listener)
- [x] Strengthen scrim: radial bottom scrim layered on top of existing linear gradient
- [x] Stagger-reveal on load: eyebrow → title line 1 → title line 2 → lede → CTAs → trust → cue using `--motion-hero-stagger`
- [x] Ken Burns zoom on `.hero__image` (24s, 1.07 → 1.00)
- [x] Gate all motion behind `@media (prefers-reduced-motion: no-preference)`
- [x] Add hero LCP preload hint (`<link rel="preload" as="image" imagesrcset imagesizes fetchpriority="high">`) in `src/includes/head.liquid`
- [ ] Verify text contrast ≥ 4.5:1 over the photo at every breakpoint (pending visual + axe pass in Group G)

---

## Group C — Info banner redesign

`src/includes/components/info-banner.liquid`, `src/styles/partials/_info-banner.scss`, `src/scripts/helpers/infoBanner.js`

- [x] Read `banner.variant` in the Liquid partial and branch markup (`strip` default, `modal` fallback)
- [x] Build **strip variant**: slim bar under header, slide-down on first paint, one row on ≥tablet / wrap on mobile, copper hairline top+bottom, carp glyph before `banner.intro`
- [x] Render each `messages[]` entry as a dated chip (`{{ message.date }} · {{ message.text }}`)
- [x] Replace raw `&times;` with a real `<button>` (44×44, copper hover, `aria-label="Закрыть объявление"`, visible focus ring) in both variants
- [x] Remove the "re-show on scroll-up" behaviour in `infoBanner.js`; keep one-shot cookie dismissal
- [x] **Modal variant:** add `role="dialog"`, `aria-modal="true"`, `aria-labelledby`; implement focus trap, ESC-close, restore-focus-on-close
- [x] Modal motion: backdrop-blur on overlay, scale-in (0.96 → 1, 240ms, `--motion-ease-out`) instead of plain opacity
- [x] No unit test change needed: cookie contract stayed exactly the same (`tests/unit/infoBannerCookie.test.js` still passes)
- [ ] Verify keyboard-only flow (Tab, Shift+Tab, Esc) for both variants in browser / a11y pass

---

## Group D — Cooperation block redesign

`src/includes/cooperation-banner.liquid`, `src/styles/partials/_cooperation-banner.scss`, `src/layouts/base.liquid`

- [x] **Relocate** the render call in `src/layouts/base.liquid` from above-header to just above footer
- [x] Rewrite markup: serif `<h2>`, one-sentence lede, CTA row (Viber pill, WhatsApp pill, `tel:` pill) using `.cta` system
- [x] Restyle on `--color-bg-inverse` (peat) surface with copper hairline top/bottom and `--section-pad-block` vertical rhythm
- [x] Add handshake ornament SVG (48px, copper line-art) above the heading
- [x] Convert phone to real `tel:+375291495989` anchor with `aria-label`; add `viber://chat?number=…` and `https://api.whatsapp.com/send?phone=…` anchors
- [x] Add WhatsApp + `tel` token entries alongside existing `--color-social-viber-*` tokens
- [ ] Verify text + CTA contrast ≥ 4.5:1 on peat surface (pending visual / axe pass in Group G)

---

## Group E — Flow, IA, CTA unification

- [ ] Update `src/layouts/base.liquid` render order: header → hero → info-strip → content sections → cooperation-block → footer
- [ ] Audit every phone / messenger link across the site to use the same anchor scheme (`tel:`, `viber://…`, `https://wa.me/…`) and `aria-label`s
- [ ] Ensure only `.cta` variants are used as calls-to-action across the three sections (no bespoke buttons)
- [ ] Single page `<h1>` = hero headline; demote prior `<h2>`s that were acting as page titles

---

## Group F — Responsive & adaptive polish

- [ ] Add `container-type: inline-size` on `.section-container`; convert hero / info-strip / cooperation-block layout rules to `@container` queries where it improves results
- [ ] Replace per-breakpoint font-size rules in the three partials with `clamp()` scales; add `font-optical-sizing: auto`
- [ ] Add a paper-grain SVG overlay (2–4% opacity), gated by `@media (prefers-reduced-transparency: no-preference)`
- [ ] Add `@media (prefers-color-scheme: dark)` token overrides in `_tokens.scss` (no UI toggle yet)
- [ ] Confirm 44×44 minimum touch targets on every new interactive element
- [ ] Hero image: provide AVIF + WebP at 600 / 800 / 1200 / 1600 widths; add a low-quality dominant-colour fallback background

---

## Group G — Verification

- [ ] Regenerate Playwright visual baselines in `tests/visual/home-snapshots/` for hero, info-banner, cooperation-banner across chromium / firefox / webkit × mobile / tablet / desktop
- [ ] `yarn test:unit` passes (including any info-banner cookie test updates)
- [ ] `yarn test:visual` passes after baseline refresh
- [ ] `yarn test:a11y` passes — contrast, focus order, ARIA roles, tab traps, reduced-motion
- [ ] Lighthouse home page (desktop + mobile): LCP ≤ 2.5s, CLS ≤ 0.05, INP ≤ 200ms
- [ ] Manual QA on iOS Safari (verify removal of `background-attachment: fixed`), Android Chrome, Firefox desktop
- [ ] Manual screenshot pass at widths: 320, 375, 414, 768, 1024, 1280, 1440, 1920

---

## Group H — Optional upgrades (post-MVP)

- [ ] Seasonal hero variant (winter photo + `--hero-scrim-winter`) driven by `meta.season`
- [ ] Animated copper hairline underline on headings via `@property --p` + `background-clip: text`
- [ ] Custom cursor variant over hero CTA (copper 24px dot → 40px on hover) on `pointer: fine` only
- [ ] `<meta name="theme-color">` matched to hero average colour per route
- [ ] Extract the `.cta` system into a documented entry in `docs/design-system-new-section-recipe.md`

---

## Things to keep / not break

- Peat & linen palette and semantic token names in `_tokens.scss` — build on them, don't replace.
- Existing Liquid data contracts (`banner.intro`, `banner.messages[]`, `meta.brandStory`) — all new fields are additive.
- SCSS partial conventions (leading `_`), `--section-*` spacing rhythm, `--motion-*` tokens.
- Cookie dismissal contract in `src/scripts/helpers/infoBannerCookie.js` and its unit test — unless intentionally changed in Group C.
- Accessibility floor: focus ring tokens, reduced-motion gates — reuse, don't reinvent.
