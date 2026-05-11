# SEO, Marketing & Advertising Readiness Audit — уск.бел

Audited: 2026-05-07. Updated: 2026-05-08 (Tier-1 items implemented). Single landing page, Eleventy 3.x + Liquid, hosted on Plesk (Apache) and Vercel.

---

## 1. Eleventy & Deploy Config

**eleventy.config.js**
- Output: `dist/`. Liquid globals: `banner`, `cooperation`, `history`, `footer`, `meta`, `packages`, `contacts`, `sidebar`, `services`, `stockingStories`, `videosShowcase`.
- Custom SCSS extension: `sass` compile → MD5-hashed output filename; partials (`_` prefix) excluded; `eleventyExcludeFromCollections: true` set.
- JS: esbuild bundles `src/scripts/index.js` only; injects `__GOOGLE_MAPS_API_KEY__` from `process.env`; silently falls back to empty string — map fails at runtime if env var absent.
- `hashed` Liquid filter maps src-relative paths to content-hashed built URLs.
- PassthroughCopy: `src/assets/public/` → `/` (carries `.htaccess`, `robots.txt`, `site.webmanifest`).
- ~~No sitemap plugin or template.~~ ✅ Static `sitemap.xml` added to `src/assets/public/`.

**.htaccess** (`src/assets/public/.htaccess`)
- Caching headers only: hashed styles immutable; images/icons/videos 30 days; vendor CSS 7 days; JS bundle 1 day.
- MIME fix for `.js`/`.json`.
- **No HTTPS enforcement. No www↔non-www redirect. No `X-Robots-Tag`. No security headers.**

**vercel.json** — mirrors `.htaccess` cache rules. Same gaps.

---

## 2. Crawlability & Indexing

**robots.txt:**
```
User-agent: *
Disallow:
Sitemap: https://уск.бел/sitemap.xml
```
~~No `Sitemap:` reference.~~ ✅ Added.

**Sitemap:** ~~None.~~ ✅ `src/assets/public/sitemap.xml` created with the canonical Cyrillic URL.

**noindex/nofollow:** None anywhere (correct — site should be indexed).

**Canonical tag:** ~~None. `meta.url = 'https://уск.бел'` defined in `meta.js` but never output.~~ ✅ `<link rel='canonical' href='{{ meta.url }}'>` added to `head.liquid`.

---

## 3. Page Head & Metadata

All tags from `src/includes/head.liquid`; values from `src/data/meta.js` (Liquid global `meta`). One page: `src/pages/home/index.md` (front matter overrides `title` and theme colors).

| Tag | Source | Value |
|-----|--------|-------|
| `<title>` | `head.liquid` → `meta.title` / front-matter | `Усадьба серебряный карась. Рыбалка. Баня. Минская Область` |
| `<meta name="description">` | `head.liquid` → `meta.description` | brandStory + feature list + phone (~230 chars) |
| `<meta name="keywords">` | `head.liquid` → `meta.keywords` | `рыбалка, рыбная ловля, рыбалка под минском, баня, баня под минском, усадьба` |
| `<html lang>` | `base.liquid` → `meta.lang` | `ru` ✓ |
| `charset` | `head.liquid` | `utf-8` ✓ |
| `viewport` | `head.liquid` | `width=device-width, initial-scale=1, shrink-to-fit=no` ✓ |
| `<meta name="author">` | `head.liquid` → `meta.author` | `maximsan.com` |
| `<meta name="theme-color">` | `head.liquid` → front matter or `meta.themeColor` | `#5f6f6d` / dark `#1c2724` |
| `<link rel="canonical">` | `head.liquid` → `meta.url` | `https://уск.бел` ✅ |

**Still missing from `<head>`:** `og:image` (no share image asset exists — Tier 2).

---

## 4. Anchor Sections

Page render order (from `base.liquid`): hero → info-banner → services → stocking → videos → contacts → cooperation-banner → footer.

| `id` | Element | Heading tag | Heading text | Nav links |
|------|---------|-------------|--------------|-----------|
| `top` | `<body>` | — | — | Header logo `#top` |
| `services` | `<section>` `services.liquid` | `h2` | `Живописный уголок природы в 40км от Минска` | sidebar `#services`; hero secondary CTA `#services` |
| `prices` | `<div>` `packages.liquid` (inside services) | `h4` × 2 ✅ | `Рыбалка` / `Усадьба` | sidebar `#prices` |
| `fishing` | `<h3 id>` services section loop | `h3` | `Рыбалка` | no nav link |
| `stocking` | `<section>` `stocking-with-fish-carousel.liquid` | `h2` | `Зарыбление водоёма` | sidebar `#stocking` |
| `stocking-2026-04-14` | `<article>` stocking carousel | `h3` | `Весеннее зарыбление 2026` | banner message link |
| `videos` | `<section>` `videos.liquid` | `h2` | `Видео с усадьбы` | sidebar `#videos` |
| `contacts` | `<section>` `contacts.liquid` | `h2` ✅ | `Контакты` | sidebar `#contacts`; footer `#contacts` |
| `map` | `<div class="map-shell">` `contacts.liquid` | — | — | sidebar `#map` (mobile); footer `#map` |

**Heading hierarchy — resolved issues:**
- ~~`contacts` section opens at `h4` — skips `h2`/`h3`.~~ ✅ `h2` "Контакты" added; subsection headings changed to `h3`.
- ~~`h3` "Рыбалка" appears twice~~ (price box + services section heading). ✅ Price box changed to `h4`.
- ~~`h3` "Усадьба" appears twice.~~ ✅ Price box changed to `h4`.

**Remaining issues:**
- `h1` text contains no primary keywords (рыбалка, баня, Минск) — marketing copy.
- Info-banner `h2` rendered with `hidden` attribute — invisible but in accessibility tree.

---

## 5. Structured Data

~~**None found.**~~ ✅ `LodgingBusiness` JSON-LD added via `src/includes/structured-data.liquid`, rendered from `base.liquid` `<head>`.

Fields populated: `name`, `url`, `telephone`, `email`, `description`, `address` (PostalAddress), `geo` (GeoCoordinates), `priceRange`, `image`.

**Still absent:** `VideoObject` (3 self-hosted videos — Tier 2), `openingHoursSpecification` (hours not confirmed — Tier 2), `Review`/`AggregateRating` (no review data).

---

## 6. Social & Sharing Metadata

**Present (`head.liquid`):**

| Tag | Value |
|-----|-------|
| `og:title` | `Усадьба серебряный карась. Рыбалка. Баня. Минская Область` |
| `og:description` | brandStory + feature list + phone |
| `og:type` | `website` ✅ |
| `og:url` | `https://уск.бел` ✅ |
| `og:locale` | `ru_BY` ✅ (was `ru_RU`, corrected in `meta.js`) |
| `og:site_name` | `Усадьба Серебряный Карась` ✅ |

**Still absent:**

| Tag | Note |
|-----|------|
| `og:image` | No share image asset exists (need 1200×630px — Tier 2) |
| `twitter:card` | Absent |
| `vk:image` | Absent |

---

## 7. Tracking & Analytics

**Yandex Metrika**
- Counter ID: `67016224`. Source: `src/includes/head.liquid`.
- Options: `clickmap`, `trackLinks`, `accurateTrackBounce`, `webvisor` all `true`.
- ~~Load: `window.addEventListener('load', setTimeout(fn, 4500))` — ~4.5s after page load.~~ ✅ Now fires immediately on `load` (no setTimeout).
- ~~Named goals: none.~~ ✅ `phone_click`, `whatsapp_click`, `viber_click` goals fired via `ym(67016224, 'reachGoal', ...)` in `main.js`. **Register these in Metrika web UI (Tier 3).**
- noscript pixel: present ✓.

**Google Tag Manager**
- Container ID: `GTM-5W4KDDW`. Source: `head.liquid` (script) + `base.liquid` (noscript iframe).
- ~~Load: `window.addEventListener('load', setTimeout(fn, 4000))` — ~4s after page load.~~ ✅ Now fires immediately on `load`.
- Container contents: requires runtime check.

**Google Analytics 4**
- ~~Inline `gtag('config', 'G-0MVEPHZ43W')` in `base.liquid` without a `gtag.js` library script — double-fires if GTM also loads GA4.~~ ✅ Redundant inline snippet removed from `base.liquid`. GA4 is now loaded exclusively through GTM (GTM-5W4KDDW).

**JS conversion tracking:** ✅ `initConversionTracking()` added to `src/scripts/main.js`. Tracks `tel:`, `wa.me`, `viber.com`, and `data-viber-app-href` link clicks with both `ym` and `gtag` events.

**Cookie consent:** None. Metrika + GTM/GA4 activate without user consent — relevant under GDPR/BY PDPA (Tier 3).

---

## 8. Conversion Elements

| Channel | Link | Placements | Notes |
|---------|------|------------|-------|
| Phone | `tel:+375291495989` | Hero CTA, sidebar (desktop+mobile), contacts, cooperation banner | Correct E.164 format |
| WhatsApp | `https://wa.me/375291495989` | ~~Cooperation banner only~~ ✅ Contacts section + cooperation banner | No prefilled message (Tier 2) |
| Viber | Web: viber.com/download / App: `viber://chat?number=375291495989` | ~~Cooperation banner only~~ ✅ Contacts section + cooperation banner | JS UA swap via `viberCooperationLink.js` (cooperation banner only) |
| Telegram | — | — | None (Tier 2 — needs a handle) |
| Floating CTA | None | — | `scrollUp.js` is scroll-to-top, not conversion |
| Booking widget | None | — | — |
| Contact form | Bootstrap modal → `smartforms.dev` | **Commented out** in `header.liquid` + `menu.liquid` | Component exists, unreachable |
| Map | Google Maps JS API → `#map-canvas` | Contacts section | Client-side only; not in static HTML |

---

## 9. Images & Media

**Formats:** AVIF (hero, 4 sizes), WebP (primary), JPG (`new-photos/`, `view-from-house-` originals, stocking 3×.JPG), PNG (PhotoSwipe skin, favicons), GIF (`preloader.gif`).

**Eleventy Image plugin:** Not used. Responsive srcsets managed manually in data files.

**Lazy loading:** `loading='lazy'` on gallery images ✓. First stocking slide: `loading='eager'` + `fetchpriority='high'` ✓. Hero: CSS background + `<link rel="preload">` AVIF ✓.

**`width`/`height` attributes:**
- Stocking carousel, icon/UI images: set ✓
- ~~Services gallery `items` thumbnails: missing — CLS risk.~~ ✅ `width='75' height='100'` added to both layout branches in `services.liquid`.
- Services gallery `main` images: still missing — CLS risk.

**Alt text:** ~~5 images in `services.js` have English alts (`'Man with fish in hands 1–4'`, `'Pike as child'`).~~ ✅ All 20 English alt texts across fishing, nature, bath, and lake sections replaced with Russian equivalents.

**Orphaned assets:** `src/assets/images/new-photos/` — 11 JPGs (beds-1/2/3/4.jpg, entrance.jpg, kitchen.jpg, sauna-1/2.jpg, shower.jpg, sink.jpg, toilet.jpg) not referenced anywhere.

**External images:** `services.js` references `https://live.staticflickr.com/` for several gallery images — outside site control (Tier 2: migrate to local hosting).

**Videos:** 3 self-hosted HTML5 videos (webm + mp4). `<video>` elements injected dynamically by `addVideo.js` — absent from static HTML. Captions/descriptions in static HTML ✓.

---

## 10. JS, Service Worker & Other Code

**Service worker:** None.

**Client-side injection of SEO-relevant content:**
- `<video>` elements: injected by JS — not in static HTML.
- Google Maps `#map-canvas`: client-side only.
- Headings, title, nav links, phone/messenger links: all static ✓.

**JS files** (`src/scripts/`): index.js (entry), main.js (orchestration + conversion tracking ✅), photo-swipe.js (lightbox), helpers/addVideo.js (lazy video injection), helpers/googleMapInit.js (Maps API), helpers/navScrollSpy.js (IntersectionObserver scroll-spy), helpers/viberCooperationLink.js (Viber href swap), helpers/infoBanner.js (banner/modal), helpers/sideBar.js (mobile drawer), helpers/videoShowcaseCarousel.js + helpers/stockingCarousel.js (carousels), helpers/scrollUp.js (scroll-to-top), form-submission/initGoogleForm.js (XHR POST to smartforms.dev), plus constants and utilities.

**Custom Liquid filters:** `hashed` (content-hash URL), `url` (built-in Eleventy).

---

## 11. Marketing-Relevant Red Flags

| # | Issue | Status |
|---|-------|--------|
| 1 | GA4 without `gtag.js` — inline `gtag('config')` likely double-fires with GTM | ✅ Removed inline snippet |
| 2 | Analytics load delay — GTM +4s, Metrika +4.5s after `load` | ✅ Both now fire immediately on `load` |
| 3 | No named conversion goals | ✅ `phone_click`, `whatsapp_click`, `viber_click` in `main.js` |
| 4 | No canonical tag — IDN/punycode duplicate indexing risk | ✅ `<link rel="canonical">` added |
| 5 | Incomplete OG tags — `og:url`, `og:locale`, `og:type`, `og:site_name` absent | ✅ All four added; locale corrected to `ru_BY` |
| 6 | No `og:image` — no share image exists | Open — need 1200×630px asset (Tier 2) |
| 7 | No sitemap.xml and no `Sitemap:` in robots.txt | ✅ Both added |
| 8 | No structured data — no JSON-LD for LocalBusiness, VideoObject, etc. | ✅ `LodgingBusiness` JSON-LD added; VideoObject pending (Tier 2) |
| 9 | Contact form commented out | Open — `modal.liquid` exists but unreachable |
| 10 | English alt text — 20 gallery images in `services.js` | ✅ All replaced with Russian |
| 11 | Orphaned `new-photos/` assets — 11 unreferenced JPGs | Open |
| 12 | Flickr CDN for gallery images — outside site control | Open (Tier 2) |
| 13 | `h1` without primary keywords | Open |
| 14 | Contacts section skipped heading levels (`h4` after `h2`) | ✅ `h2` added; subsections now `h3` |
| 15 | Duplicate `h3` headings ("Рыбалка", "Усадьба") | ✅ Price box headings changed to `h4` |
| 16 | No Telegram link | Open (Tier 2 — needs handle) |
| 17 | No HTTPS/www redirect in `.htaccess` | Open (Tier 3 — server config) |
| 18 | No cookie consent | Open (Tier 3 — policy decision) |
| 19 | Sidebar placeholder text — `'© Untitled | Website created with 🍺'` | ✅ Changed to `'© Усадьба Серебряный Карась'` |
| 20 | `TODO` comment in production template — `base.liquid` | ✅ Removed |
| 21 | WhatsApp and Viber only in cooperation-banner | ✅ Both added to contacts section |
| 22 | `meta.locale = 'ru_RU'` instead of `ru_BY` | ✅ Corrected in `meta.js` |
| 23 | Services gallery item `<img>` missing `width`/`height` — CLS risk | ✅ `width='75' height='100'` added |
