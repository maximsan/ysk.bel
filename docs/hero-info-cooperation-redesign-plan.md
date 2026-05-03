# Plan — hero / info-banner / cooperation-banner redesign

Most of the redesign has shipped. This document tracks **what remains**: verification passes, Lighthouse targets, optional polish.

**Target areas:** hero (`hero-section.liquid`, `_hero.scss`), info banner (`info-banner.liquid`, `_info-banner.scss`, `infoBanner.js`), cooperation block (`cooperation-banner.liquid`, `_cooperation-banner.scss`), `base.liquid`. Tokens and CTA system live in `src/styles/modules/_tokens.scss`, `_cta.scss`, ornaments under `src/includes/ornaments/`.

---

## Remaining verification & QA

- [ ] Hero: confirm text contrast ≥ 4.5:1 over the photo at every breakpoint (visual + axe).
- [ ] Info banner: keyboard-only flow (Tab, Shift+Tab, Esc) for strip + modal variants.
- [ ] Cooperation block: text + CTA contrast ≥ 4.5:1 on peat surface (visual / axe).
- [ ] Lighthouse on home (desktop + mobile): LCP ≤ 2.5s, CLS ≤ 0.05, INP ≤ 200ms — **Re-run after `build` + `serve`:** `yarn lighthouse:home:json` and `yarn lighthouse:mobile:json` (`scripts/lighthouse-with-playwright.cjs`; output gitignored). Last noted gap was LCP (CLS/TBT were healthy).
- [ ] Manual QA: iOS Safari (`background-attachment: fixed` removed), Android Chrome, Firefox desktop.

---

## Optional upgrades (post-MVP)

- [ ] Seasonal hero variant (winter photo + `--hero-scrim-winter`) driven by `meta.season`.
- [ ] Animated copper hairline underline on headings via `@property --p` + `background-clip: text`.
- [ ] Custom cursor over hero CTA (copper 24px dot → 40px on hover) on `pointer: fine` only.

---

## Things to keep / not break

- Peat & linen palette and semantic token names in `_tokens.scss` — build on them, don't replace.
- Existing Liquid data contracts (`banner.intro`, `banner.messages[]`, `meta.brandStory`) — new fields stay additive.
- SCSS partial conventions (leading `_`), `--section-*` spacing rhythm, `--motion-*` tokens.
- Cookie dismissal contract in `src/scripts/helpers/infoBannerCookie.js` and its unit test — unless intentionally changed.
- Accessibility floor: focus ring tokens, reduced-motion gates — reuse, don't reinvent.
