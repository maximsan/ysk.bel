# Header & footer — UI/UX and responsive plan

**Goal:** Navigation and contact paths stay clear and calm—no redundant repeats of the same actions, solid mobile behavior, and good accessibility.

**How to use:** Check off `- [ ]` → `- [x]` as you complete items.

**Key files:** `src/includes/header.liquid`, `src/includes/menu.liquid`, `src/includes/footer.liquid`, `src/includes/cooperation-banner.liquid`, `src/data/footer.js`, `src/data/cooperation.js`, `src/styles/partials/_footer.scss`, `_header.scss`, `_menu.scss`, `src/scripts/helpers/sideBar.js`, `tests/visual/`.

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

- [ ] **Menu button:** `aria-hidden` on decorative icons; `aria-label` / `aria-expanded` on the toggler.
- [ ] **Current section in nav:** `aria-current` (hash / `IntersectionObserver`); styles in `_header.scss`.
- [ ] **Safe area:** `env(safe-area-inset-*)` where chrome is flush to the screen edge.
- [ ] **Menu:** Escape to close / scrim behavior aligned with `sideBar.js`.

---

## P3 — Header: layout & breakpoints

- [ ] **Flexible nav width:** Fewer hard `width` values in `_menu.scss`, more `max-width` and `gap`.
- [ ] **Tablet:** Balance logo, in-nav phone, and links.
- [ ] **Fallback** for header behavior when `animation-timeline` is unavailable (if scroll-linked animation is used).
- [ ] **Header CTA (optional):** One clear booking / call action on desktop.

---

## P4 — Mobile menu

- [ ] **Scrim** and tap-outside to close.
- [ ] **Motion:** Easing, respect `prefers-reduced-motion`.
- [ ] **Scroll lock** without jank on iOS.
- [ ] **Touch targets** ~44px minimum for items and toggler.

---

## P5 — Visual polish

- [ ] Logo typography vs nav (`_logo.scss`).
- [ ] If the footer keeps links, style with design tokens (focus, contrast)—avoid looking like a second row of banner buttons.
- [ ] Light depth / texture only where it fits (header, dark bands).

---

## P6 — QA

- [ ] Playwright: run `yarn test:visual:update` locally after this footer change (new mobile `footer.png` baselines + desktop/tablet diffs); commit `*-darwin.png` and use CI label for `*-linux.png` if applicable.
- [ ] Tab order: header → menu → main → partnership strip → footer.
- [ ] Run `yarn test:a11y` after substantive changes.

---

## Suggested order

1. **P1:** Define the footer’s new role (no duplicate CTAs), then mobile visibility.
2. **P2 → P4** as needed after footer UX is settled.
3. **P3, P5** for header and visual polish.
4. **P6** before merge.
