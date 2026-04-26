# Header & footer — UI/UX and responsive plan

**Goal:** Navigation and contact paths stay clear and calm—no redundant repeats of the same actions, solid mobile behavior, and good accessibility.

**How to use:** Check off `- [ ]` → `- [x]` as you complete items.

**Key files:** `src/includes/header.liquid`, `src/includes/menu.liquid`, `src/includes/footer.liquid`, `src/includes/cooperation-banner.liquid`, `src/data/footer.js`, `src/data/cooperation.js`, `src/styles/partials/_footer.scss`, `_header.scss`, `_menu.scss`, `src/scripts/helpers/sideBar.js`, `tests/visual/`.

**Glossary (terms & patterns):** [`docs/ui-accessibility-glossary.md`](ui-accessibility-glossary.md).

---

## Current site behavior (baseline)

- **Partnership strip** (`cooperation-banner` + `cooperation.js`): Primary B2B contact block—**WhatsApp** (primary), **Viber**, and **Call** with the estate phone. Rendered **directly above the footer** in `base.liquid`.
- **Footer** (`footer.liquid` + `footer.js`): Dark closing band with **estate name + tagline**, neutral links **Contacts** / **How to get here** (`#contacts`, `#map`), and **colophon** (`sidebar.author`). **No** messenger row—avoids duplicating the strip above.
- **Mobile:** Footer is **visible** on all widths (safe-area padding on notched devices).
- **Header:** Logo links to `#top` (`body id="top"`). Sticky header and mobile menu—see later phases.

---

## Principle: avoid annoying repetition

**Rule:** Offer “write / call” clearly **once** in the partnership zone (**cooperation-banner**). The footer should **not** mirror the same messenger row as a second tier.

**Chosen approach (Phase 1):**

- [x] **Colophon footer:** Estate name + short tagline, neutral **Contacts** / **How to get here** links, and author lines from `sidebar`—**no** messenger list under the partnership strip.

---

## P1 — Footer & contacts (priority)

- [x] **Stop duplicating the cooperation banner:** Rework `footer.liquid` / `footer.js` so the footer is not a second Viber/WhatsApp row under the banner CTAs.
- [x] **Footer on mobile:** Footer visible on all breakpoints (removed `display: none` below 768px).
- [x] **Single source of truth for the phone number:** Footer has no phone/messenger links; comments in `cooperation.js` and `footer.js` list `cooperation.js`, `contacts.js`, `sidebar.js` for number updates.
- [x] **Logo as home link:** `href="#top"` on the logo, `id="top"` on `body` in `base.liquid`.
- [x] **Anchors & sticky header:** `#prices` (`.packages`) uses `--section-scroll-margin`; section chapters and `#map` already had scroll margins.

---

## P2 — Accessibility, keyboard, safe area

- [x] **Menu button:** Decorative menu/close icons use `alt=""` and `aria-hidden="true"`; toggler has Russian `aria-label` and **`aria-expanded` updated in JS** (`sideBar.js`); `nav` has `aria-label`.
- [x] **Current section in nav:** `initNavScrollSpy()` sets `aria-current` on in-page `.nav-link`s; styles in `_header.scss`.
- [x] **Safe area:** `env(safe-area-inset-*)` on `.header` (horizontal), `.navbar` (top + mobile horizontal padding), mobile drawer / `.nav-footer` bottom, and footer (already from Phase 1).
- [x] **Menu:** **Escape** closes drawer; **`data-menu-scrim`** tap closes; scroll lock uses **`position: fixed` + `top: -scrollY`** and **`scrollTo` on close** to reduce iOS jump.

---

## P3 — Header: layout & breakpoints

- [x] **Flexible nav width:** `_menu.scss` uses `max-width: min(…rem, 100%)`, `width: 100%`, `flex-wrap`, and `gap` instead of fixed `500px` / `650px` / `700px` widths.
- [x] **Mobile (under 768px):** **Hamburger + drawer** (`_header.scss` / `_menu.scss`, max-width **767.98px**). **Scrolled header:** `animation-timeline: view()` + range after ~1 viewport; bar tucks up then eases in as compact pill (`stickyNavigation` in `_header.scss`).
- [x] **Fallback** for header when view timelines are unavailable — `@supports not (animation-timeline: view())` in `_header.scss`.
- [ ] **Header CTA (optional):** One clear booking / call action on desktop (deferred).

---

## P4 — Mobile menu

- [x] **Scrim** (`.menu-scrim`) and tap-outside to close — wired in `header.liquid` + `_header.scss` + `sideBar.js`.
- [x] **Motion:** Drawer slide uses `--motion-ease-out`; **`prefers-reduced-motion: reduce`** disables scrim/drawer transitions.
- [x] **Scroll lock:** See P2 (body `top` offset + restore scroll position).
- [x] **Touch targets:** Toggler `min-width` / `min-height` **2.75rem**; mobile `.nav-link` **min-height 2.75rem** with padding.

---

## P5 — Visual polish

- [x] **Logo vs nav:** Serif wordmark (`--font-heading`), weight 600, letter-spacing; Rubik stays on nav links (`_logo.scss`).
- [x] **Footer links:** Muted inverse + subtle copper mix; `font-size-sm`, weight 500; underline only on hover; focus ring + `border-radius` (`_footer.scss`).
- [x] **Depth / texture:** Layered `--header-shadow` + inset rim on `.navbar`; footer `--footer-band-shadow` + `paper-grain` (`_tokens.scss`, `_header.scss`, `_footer.scss`).

---

## P6 — QA

- [ ] Playwright: run `yarn test:visual:update` locally after this footer change (new mobile `footer.png` baselines + desktop/tablet diffs); commit `*-darwin.png` and use CI label for `*-linux.png` if applicable.
- [ ] Tab order: header → menu → main → partnership strip → footer.
- [ ] Run `yarn test:a11y` after substantive changes.

---

## Suggested order

1. **P1:** Define the footer’s new role (no duplicate CTAs), then mobile visibility.
2. **P2 → P4** as needed after footer UX is settled.
3. **P5** for further visual polish (P3 complete).
4. **P6** before merge.
