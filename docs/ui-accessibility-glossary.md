# UI glossary — header, footer, mobile menu

Short reference for terms and patterns used in **Phase 1** (footer/colophon) and **Phase 2** (accessibility, drawer behavior) of [`header-footer-ui-plan.md`](header-footer-ui-plan.md). Use this when reading comments in `sideBar.js`, `_header.scss`, `_menu.scss`, and related templates.

---

## How to read this doc

- **Glossary** — alphabetically grouped concepts (what it is, why we use it, where it lives).
- **Related files** — quick map from idea → path in the repo.

---

## Glossary

### `aria-current`

**What:** An ARIA attribute on a link (often `aria-current="true"`) meaning “this item represents the current location or choice.”

**Why:** Screen readers and some styles can show **which section** of a one-page site matches what you’re viewing. We set it on navbar hash links (`#services`, `#contacts`, …) when that section is near the middle of the viewport.

**Where:** [`src/scripts/helpers/navScrollSpy.js`](../src/scripts/helpers/navScrollSpy.js) (IntersectionObserver); styles in [`src/styles/partials/_header.scss`](../src/styles/partials/_header.scss) (`[aria-current='true']`).

---

### `aria-expanded`

**What:** On a **button** that opens/closes something, tells assistive tech whether that thing is open (`true`) or closed (`false`).

**Why:** Paired with `aria-controls` pointing at the panel id, so users know the menu state without seeing the icon swap.

**Where:** [`src/includes/header.liquid`](../src/includes/header.liquid) (initial `false`); updated in [`src/scripts/helpers/sideBar.js`](../src/scripts/helpers/sideBar.js) when opening/closing.

---

### `aria-hidden`

**What:** Hides an element from the **accessibility tree** (screen readers skip it).

**Why:** Decorative images (menu/close icons) shouldn’t be read aloud if the **button** already has a text label (`aria-label`). We hide the `<img>` so only the button’s purpose is announced.

**Where:** [`src/includes/header.liquid`](../src/includes/header.liquid) on menu/close icons; scrim toggles `aria-hidden` when open/closed in `sideBar.js`.

---

### `aria-label` (navigation landmark)

**What:** Accessible name for a region when there’s no visible heading.

**Why:** `<nav>` blocks get announced as “navigation”; a label like “Основная навигация” distinguishes **main nav** from **footer nav**.

**Where:** [`src/includes/header.liquid`](../src/includes/header.liquid), [`src/includes/footer.liquid`](../src/includes/footer.liquid).

---

### Colophon footer

**What:** A short **closing** strip at the bottom: who/what the site is, optional neutral links, credits—not a second row of “call us on WhatsApp” buttons.

**Why:** The **partnership strip** (`cooperation-banner`) already holds primary messengers/call actions. The footer avoids repeating those channels.

**Where:** [`src/data/footer.js`](../src/data/footer.js), [`src/includes/footer.liquid`](../src/includes/footer.liquid), [`src/styles/partials/_footer.scss`](../src/styles/partials/_footer.scss).

---

### Event delegation (menu link close)

**What:** One `click` listener on the **drawer container** checks whether the click target was a link inside it (`closest('a')`), instead of attaching listeners to every link.

**Why:** Fewer moving parts; any `#…` or `tel:` link in the drawer closes the menu consistently.

**Where:** [`src/scripts/helpers/sideBar.js`](../src/scripts/helpers/sideBar.js) (`onMenuLinkClick`).

---

### IntersectionObserver (scroll spy)

**What:** Browser API that runs a callback when observed elements enter/leave the viewport (with thresholds and margins).

**Why:** Cheap way to know **which section** is “active” without scrolling listeners on every pixel.

**Where:** [`src/scripts/helpers/navScrollSpy.js`](../src/scripts/helpers/navScrollSpy.js).

---

### Menu scrim

**What:** A **full-screen semi-transparent layer** behind the sliding menu, usually darkened (“dimmed”).

**Why:**

- Signals that the page underneath is **inactive**.
- **Tap outside** the panel (on the dim area) closes the menu—common mobile pattern.

**Where:** Markup [`src/includes/header.liquid`](../src/includes/header.liquid) (`data-menu-scrim`); styles [`src/styles/partials/_header.scss`](../src/styles/partials/_header.scss) (`.menu-scrim`); show/hide in [`src/scripts/helpers/sideBar.js`](../src/scripts/helpers/sideBar.js).

---

### `prefers-reduced-motion`

**What:** User/OS setting: “reduce non-essential motion.”

**Why:** Some users get dizzy or distracted from sliding/fading UI. We **disable** scrim/drawer **transitions** when this is on.

**Where:** [`src/styles/partials/_header.scss`](../src/styles/partials/_header.scss), [`src/styles/partials/_menu.scss`](../src/styles/partials/_menu.scss).

---

### Safe area (`env(safe-area-inset-*)`)

**What:** CSS environment variables for **notch**, **rounded display corners**, and **home indicator** insets on phones.

**Why:** Keeps tappable UI (hamburger, logo row, drawer bottom, footer) **out of the hardware chrome** and easier to hit.

**Where:** [`src/styles/partials/_header.scss`](../src/styles/partials/_header.scss) (header horizontal padding, navbar top/side padding), [`src/styles/partials/_menu.scss`](../src/styles/partials/_menu.scss) (drawer / nav-footer bottom), [`src/styles/partials/_footer.scss`](../src/styles/partials/_footer.scss) (footer padding).

---

### Scroll lock

**What:** While the menu is open, the **page body** shouldn’t scroll under the drawer—often `position: fixed` on `body` (sometimes with width/left/right so layout doesn’t jump).

**Why:** Prevents a confusing stack: menu “modal” while the page still moves behind it; reduces scroll fighting on touch devices.

**Where:** [`src/scripts/helpers/sideBar.js`](../src/scripts/helpers/sideBar.js) (`openSideBar` / `closeSideBar`).

---

### Scroll position restore (`scrollY` + `top: -scrollY`)

**What:** When locking scroll, save `window.scrollY`, set `body` to `position: fixed` and `top: -savedY` so the visual position stays the same. On close, clear styles and `window.scrollTo(0, savedY)`.

**Why:** Some browsers **jump** to the top when removing `position: fixed` from `body`. Restoring **y** avoids that.

**Where:** [`src/scripts/helpers/sideBar.js`](../src/scripts/helpers/sideBar.js).

---

### `scroll-margin-top` / sticky header

**What:** Extra space above an anchor target so when you follow `#section-id`, the **sticky header** doesn’t cover the section title.

**Why:** Without it, “jump to #prices” can hide the heading under the bar.

**Where:** Token `--section-scroll-margin` in [`src/styles/modules/_tokens.scss`](../src/styles/modules/_tokens.scss); sections use [`src/styles/modules/_section-chapter.scss`](../src/styles/modules/_section-chapter.scss); **`#prices`** on [`.packages` in `_services.scss`](../src/styles/partials/_services.scss).

---

### Touch targets (~44px / 2.75rem)

**What:** Minimum comfortable **tap size** for fingers (Apple HIG often cites ~44×44 CSS px).

**Why:** Small hit areas cause mis-taps and frustration on phones.

**Where:** [`src/styles/partials/_header.scss`](../src/styles/partials/_header.scss) (toggler min size), [`src/styles/partials/_menu.scss`](../src/styles/partials/_menu.scss) (mobile `.nav-link` min-height).

---

### Z-index stacking (drawer vs scrim vs bar)

**What:** Layer order: **scrim** (dim) **below** the **drawer panel**, and **logo + hamburger** **above** both so they stay tappable.

**Why:** If order is wrong, taps go to the wrong layer or the bar disappears behind the drawer.

**Where:** [`src/styles/partials/_header.scss`](../src/styles/partials/_header.scss) (`.menu-scrim`, `.navbar`), [`src/styles/partials/_menu.scss`](../src/styles/partials/_menu.scss) (`.menu` on small screens).

---

### Motion / easing (`--motion-ease-out`)

**What:** **Easing curve** for transitions (e.g. drawer sliding in) so movement eases out instead of linear robotic motion.

**Why:** Slightly more natural feel; still respects **reduced motion** (see above).

**Where:** Token in [`src/styles/modules/_tokens.scss`](../src/styles/modules/_tokens.scss); used in [`src/styles/partials/_menu.scss`](../src/styles/partials/_menu.scss) (drawer `transition`).

---

### Scroll-driven header animation (`animation-timeline`) — fallback

**What:** On supporting browsers, the header can animate (e.g. “pill” width / position) based on **scroll progress** via `animation-timeline: view()`.

**Why a fallback:** In browsers **without** that API, the same keyframes would not run predictably. We keep an explicit **`@supports not (animation-timeline: view())`** rule so those users still get a **normal full-width sticky bar** (`width: auto`, `border-radius: 0`).

**Where:** [`src/styles/partials/_header.scss`](../src/styles/partials/_header.scss) (`.header`).

---

## Related files (by topic)

| Topic | Files |
|--------|--------|
| Drawer open/close, scrim, scroll lock, Escape | `src/scripts/helpers/sideBar.js` |
| Nav width / tablet layout, header scroll-timeline fallback | `src/styles/partials/_menu.scss`, `src/styles/partials/_header.scss` |
| Scroll spy / `aria-current` | `src/scripts/helpers/navScrollSpy.js`, `src/scripts/main.js` |
| Scrim + safe-area + toggler size | `src/styles/partials/_header.scss` |
| Drawer slide, safe-area bottom, link hit area | `src/styles/partials/_menu.scss` |
| Footer content model | `src/data/footer.js`, `src/includes/footer.liquid`, `src/styles/partials/_footer.scss` |
| `#top` / logo | `src/layouts/base.liquid`, `src/includes/header.liquid` |
| Anchor offset for `#prices` | `src/styles/partials/_services.scss` |

---

## Plan checklist

Implementation status and next phases: [`header-footer-ui-plan.md`](header-footer-ui-plan.md).
