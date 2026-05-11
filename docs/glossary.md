# Project glossary

Definitions for **terms, patterns, and jargon** used in this repository—UI, accessibility, content, publishing words, tooling, or anything else worth explaining in one place.

Many entries below started with **Phase 1** (footer/colophon) and **Phase 2** (accessibility, drawer behavior) from [`header-footer-ui-plan.md`](header-footer-ui-plan.md). Add new headings as needed; the **What / Why / Where** shape is optional but works well for implementation-linked concepts.

---

## How to read this doc

- **Glossary** — grouped concepts (what it is, why we use it, where it lives).
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

**Word:** *Colophon* comes from publishing: the short note at the **end** of a book about who produced it and how. On websites people use it informally for a **small closing strip**—identity, credits, light navigation—not the main calls to action.

**What (this site):** A short **closing** strip at the bottom: who/what the site is, optional neutral links, credits—not a second row of “call us on WhatsApp” buttons.

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

### Scrim

**Word:** In UI, a *scrim* is a **semi-transparent layer** over the page (usually a dark tint) that **dims** whatever sits behind a modal, drawer, or dialog so the top layer reads as “in front.” The English word comes from theater/film (a light‑softening cloth); design systems such as **Material Design** reused it for these overlays.

**What (menu on this site):** A **full-viewport** scrim lives **behind** the slide-out navigation and **above** the page. It is not the drawer itself—only the dimmed sheet you tap to dismiss.

**Why:**

- Makes the page underneath feel **inactive** while the menu is open.
- **Tap on the dimmed area** closes the menu (standard mobile pattern).

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

**What:** On supporting browsers, the header can hide then animate in as a compact “pill” based on a **view progress** timeline: `animation-timeline: view()` with `animation-range-start/end` tied to scroll past the first viewport (see `_header.scss`).

**Why a fallback:** In browsers **without** that API, the same keyframes would not run predictably. We keep an explicit **`@supports not (animation-timeline: view())`** rule so those users still get a **normal full-width sticky bar** (`width: auto`, `border-radius: 0`).

**Where:** [`src/styles/partials/_header.scss`](../src/styles/partials/_header.scss) (`.header`).

---

---

### GA4 (Google Analytics 4)

**What:** Google's current web analytics platform. Tracks page views, user behaviour, and custom events, storing them in Google's data warehouse. Replaced Universal Analytics (UA) in 2023.

**Why:** Used on this site to measure traffic sources, sessions, and conversion events (phone clicks, messenger opens). Measurement ID: `G-0MVEPHZ43W`.

**How it loads here:** Through Google Tag Manager (GTM-5W4KDDW) — GA4 is not loaded directly. GTM injects the `gtag.js` library and fires the GA4 config tag. The inline `gtag()` snippet that was previously in `base.liquid` was removed to prevent double-counting.

**Where:** GTM container configuration (external, not in repo). Conversion events emitted from [`src/scripts/main.js`](../src/scripts/main.js) (`initConversionTracking`).

---

### `gtag` / `gtag()`

**What:** A global JavaScript function provided by the Google Tag (`gtag.js`) library. It is the low-level API for sending events and config to Google products (GA4, Google Ads). Syntax: `gtag('event', 'event_name', { parameters })`.

**Why:** Used to fire named conversion events (`phone_click`, `whatsapp_click`, `viber_click`) directly from JS, which appear as events in GA4 reports and can be used as Google Ads conversion actions.

**Important detail:** `gtag` is only available after GTM has loaded and the GA4 tag inside it has executed. The code guards against this: `if (typeof gtag === 'function') gtag(...)`.

**Where:** [`src/scripts/main.js`](../src/scripts/main.js) (`initConversionTracking`).

---

### GTM (Google Tag Manager)

**What:** A tag management system — a single `<script>` container loaded on the page that can deploy and configure third-party analytics, marketing, and tracking scripts without code changes. Container ID: `GTM-5W4KDDW`.

**Why:** Lets GA4, Google Ads, and other tags be added or changed without a site rebuild. Also fires the `gtag.js` library that `gtag()` calls depend on.

**How it loads here:** Fires immediately on the `load` event (previously had a 4-second delay). Includes a `<noscript>` iframe fallback in `base.liquid`.

**Where:** [`src/includes/head.liquid`](../src/includes/head.liquid) (script loader), [`src/layouts/base.liquid`](../src/layouts/base.liquid) (noscript iframe).

---

### `ym` / Yandex Metrika

**What:** `ym(counterId, method, ...)` is the global JS API for Yandex Metrika — Yandex's web analytics platform, widely used in Russia and Belarus. Counter ID: `67016224`.

**Why:** Yandex Metrika is the primary analytics tool for the Belarusian audience. It provides session replay (Webvisor), click maps, scroll maps, and named conversion goal funnels. It also feeds Yandex.Direct advertising attribution.

**Named goals:** `phone_click`, `whatsapp_click`, `viber_click` are fired as conversion events in `main.js`. These must also be **created manually in the Metrika web UI** (Метрика → Цели) to appear in funnel reports and ad attribution.

**How it loads here:** Fires immediately on the `load` event (previously had a 4.5-second delay). Includes a `<noscript>` pixel fallback.

**Where:** [`src/includes/head.liquid`](../src/includes/head.liquid) (init); [`src/scripts/main.js`](../src/scripts/main.js) (`initConversionTracking`, goal events).

---

## Related files (by topic)

| Topic                                                      | Files                                                                                  |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Drawer open/close, scrim, scroll lock, Escape              | `src/scripts/helpers/sideBar.js`                                                       |
| Nav width / tablet layout, header scroll-timeline fallback | `src/styles/partials/_menu.scss`, `src/styles/partials/_header.scss`                   |
| Scroll spy / `aria-current`                                | `src/scripts/helpers/navScrollSpy.js`, `src/scripts/main.js`                           |
| Scrim + safe-area + toggler size                           | `src/styles/partials/_header.scss`                                                     |
| Drawer slide, safe-area bottom, link hit area              | `src/styles/partials/_menu.scss`                                                       |
| Footer content model                                       | `src/data/footer.js`, `src/includes/footer.liquid`, `src/styles/partials/_footer.scss` |
| `#top` / logo                                              | `src/layouts/base.liquid`, `src/includes/header.liquid`                                |
| Anchor offset for `#prices`                                | `src/styles/partials/_services.scss`                                                   |
