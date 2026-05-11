# SEO, Marketing & Advertising — Action Plan

Based on [seo-marketing-audit.md](seo-marketing-audit.md). Items are grouped by what can be done in code right now vs what requires external work or a decision first.

---

## Tier 1 — Do now, high impact, pure code

These are template or data changes with no external dependencies. Each one removes a real indexing or conversion gap.

### ~~1. Canonical tag~~ ✅

**Why:** `уск.бел` and `xn--j1anf.xn--90ais` are the same page. Without a canonical, crawlers may count them as duplicates and split ranking signals.

**What:** Add one line to `src/includes/head.liquid`:
```liquid
<link rel='canonical' href='{{ meta.url }}'>
```
`meta.url = 'https://уск.бел'` is already defined in `src/data/meta.js`.

---

### ~~2. Complete Open Graph tags~~ ✅

**Why:** Social shares (VK, Telegram previews, WhatsApp link previews) currently show no image, no locale, no URL. All required data values exist in `meta.js` and are just not output.

**What:** Add to `src/includes/head.liquid`:
```liquid
<meta property='og:type'        content='website'>
<meta property='og:url'         content='{{ meta.url }}'>
<meta property='og:locale'      content='{{ meta.locale }}'>
<meta property='og:site_name'   content='{{ meta.ogTitle }}'>
```

Also change `meta.locale` in `src/data/meta.js` from `'ru_RU'` to `'ru_BY'` (Belarusian audience).

`og:image` is a separate item — see Tier 2 item 3.

---

### ~~3. sitemap.xml~~ ✅

**Why:** No sitemap means Yandex and Google rely solely on crawl discovery. For a single-page site this is a small gap, but a sitemap also carries the canonical URL and `lastmod`, which helps with IDN indexing.

**Option A (recommended):** Create `src/assets/public/sitemap.xml` as a static file (single URL, single page):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://уск.бел/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

**Option B:** Use a Liquid template at `src/assets/public/sitemap.xml.liquid` if `lastmod` should be dynamic.

Then add to `src/assets/public/robots.txt`:
```
Sitemap: https://уск.бел/sitemap.xml
```

---

### ~~4. LocalBusiness JSON-LD structured data~~ ✅

**Why:** The single biggest SEO gap. JSON-LD enables rich results in Google and Yandex (business info panel, map card, phone in SERP). All required data already exists in `contacts.js` and `packages.js`.

**What:** Create `src/includes/structured-data.liquid` and render it from `base.liquid` inside `<head>`:
```liquid
<script type='application/ld+json'>
{
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "{{ contacts.companyName }}",
  "url": "{{ meta.url }}",
  "telephone": "+375291495989",
  "email": "oleg-magnat@tut.by",
  "description": "{{ meta.description }}",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{{ contacts.address }}",
    "addressLocality": "д. Вепраты",
    "addressRegion": "Минская область",
    "addressCountry": "BY"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 54.291652,
    "longitude": 27.480454
  },
  "priceRange": "20–150 BYN",
  "image": "{{ meta.url }}/assets/images/hero-fish-1600.avif"
}
</script>
```
Adjust `image` once an OG share image exists (Tier 2).

---

### ~~5. Fix GA4 snippet~~ ✅

**Why:** `base.liquid` calls `gtag('config', 'G-0MVEPHZ43W')` without a `gtag.js` script tag. If GTM container already includes a GA4 tag with the same ID, every pageview is counted twice, inflating all metrics.

**What:** Check GTM container (GTM-5W4KDDW) for a GA4 tag. One of two fixes:
- **If GTM has GA4:** remove the entire inline `<script>` block (the three `gtag` lines) from `base.liquid`. GTM handles it.
- **If GTM does not have GA4:** replace the inline snippet with the standard loader:
  ```html
  <script async src='https://www.googletagmanager.com/gtag/js?id=G-0MVEPHZ43W'></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-0MVEPHZ43W');
  </script>
  ```

---

### ~~6. Fix contacts section heading hierarchy~~ ✅

**Why:** The `#contacts` section jumps directly to `h4` from `h2`. Screen readers and crawlers see a broken outline. The fix is adding a proper section label.

**What:** In `src/includes/contacts.liquid`, wrap the section with an `h2` before the content columns:
```liquid
<section class='section-container contacts section-chapter' id='contacts'>
  <div class='container'>
    <div class='content-header section-chapter__header'>
      <h2 class='section-chapter__title'>Контакты</h2>
    </div>
    ...
```
Then change the two `<h4 class='address-header'>` tags to `<h3>` (they become subsections of the new `h2`).

---

### ~~7. Fix duplicate h3 headings~~ ✅

**Why:** "Рыбалка" and "Усадьба" each appear twice as `h3` — once in the price cards (`packages.liquid`) and once as services section headings (`services.liquid`). This confuses both the outline and keyword signals.

**What:** In `src/includes/packages.liquid`, change the price box headings from `h3` to `h4` (they're subordinate feature cards, not section headings):
```html
<!-- before -->
<h3 class='fishing'>Рыбалка…</h3>
<h3 class='house'>Усадьба…</h3>

<!-- after -->
<h4 class='fishing'>Рыбалка…</h4>
<h4 class='house'>Усадьба…</h4>
```

---

### ~~8. Fix English alt text in services.js~~ ✅

**Why:** Five gallery images have English alt text (`'Man with fish in hands 1–4'`, `'Pike as child'`) on a Russian-language site. Yandex image search uses alt text for Russian queries.

**What:** In `src/data/services.js`, update the five `alt` values:

| Current | Replace with |
|---------|-------------|
| `'Man with fish in hands 1'` | `'Рыбак держит рыбу — улов на пруду'` |
| `'Man with fish in hands 2'` | `'Рыбак с уловом у пруда усадьбы'` |
| `'Man with fish in hands 3'` | `'Зимняя рыбалка на пруду'` |
| `'Man with fish in hands 4'` | `'Летняя рыбалка — удачный улов'` |
| `'Pike as child'` | `'Ребёнок на рыбалке — щука у берега'` |

---

### ~~9. Add named conversion goals (Metrika + GA4)~~ ✅

**Why:** `trackLinks: true` passively tracks outbound clicks but doesn't create named goal segments in Metrika reports. You can't see "phone calls" as a separate funnel or set CPA targets without named goals.

**What:** In `src/scripts/main.js`, after `initCarouselsWhenDomReady()` is called, attach click handlers to all conversion links. The selectors are already partially defined in `src/scripts/constants/dom/siteSelectors.js`.

```js
// Conversion tracking — tel, WhatsApp, Viber
document.querySelectorAll('a[href^="tel:"]').forEach((el) => {
  el.addEventListener('click', () => {
    if (typeof ym === 'function') ym(67016224, 'reachGoal', 'phone_click');
    if (typeof gtag === 'function') gtag('event', 'phone_click', { event_category: 'conversion' });
  });
});
document.querySelectorAll('a[href*="wa.me"]').forEach((el) => {
  el.addEventListener('click', () => {
    if (typeof ym === 'function') ym(67016224, 'reachGoal', 'whatsapp_click');
    if (typeof gtag === 'function') gtag('event', 'whatsapp_click', { event_category: 'conversion' });
  });
});
document.querySelectorAll('a.cooperation-banner__link--viber').forEach((el) => {
  el.addEventListener('click', () => {
    if (typeof ym === 'function') ym(67016224, 'reachGoal', 'viber_click');
    if (typeof gtag === 'function') gtag('event', 'viber_click', { event_category: 'conversion' });
  });
});
```

Then create goals `phone_click`, `whatsapp_click`, `viber_click` in the Metrika web interface.

---

### ~~10. Fix analytics load delay~~ ✅

**Why:** GTM loads 4s and Metrika 4.5s after the `load` event. A visitor who taps the phone number within the first few seconds is not tracked.

**What:** In `src/includes/head.liquid`, change both init strategies from `load + setTimeout` to fire immediately on `load`:

```js
// GTM — remove the setTimeout wrapper
window.addEventListener('load', function () {
  loadGoogleTagManager(window, document, 'script', 'dataLayer', 'GTM-5W4KDDW');
});

// Metrika — same
window.addEventListener('load', function () {
  loadYandexMetrika(...);
  ym(67016224, 'init', { ... });
});
```

If page speed is a concern, a 1000ms delay is a reasonable compromise; 4000–4500ms is too long for mobile users on slower connections.

---

### ~~11. Add WhatsApp and Viber to contacts section~~ ✅

**Why:** Both messengers currently only appear in the cooperation-banner (a partnership section visually separated from the main conversion flow). Visitors looking at the contacts section see only a phone number and email.

**What:**
- Add WhatsApp and Viber entries to the `phones` array in `src/data/contacts.js`.
- The `contacts.liquid` template already iterates `contacts.contactUs.phones` and renders links — no template change needed.

```js
// contacts.js — add after the existing A1 phone entry:
{
  text: 'WhatsApp',
  href: 'https://wa.me/375291495989',
  ariaLabel: 'Написать в WhatsApp',
  operator: 'whatsapp',
  iconUrl: 'assets/images/icons/whatsapp.svg',
},
{
  text: 'Viber',
  href: 'https://www.viber.com/download/',
  'data-viber-app-href': 'viber://chat?number=375291495989',
  ariaLabel: 'Написать в Viber',
  operator: 'viber',
  iconUrl: 'assets/images/icons/viber.svg',
},
```

Note: WhatsApp and Viber SVG icons need to be added to `src/assets/images/icons/`. The Viber UA-swap logic from `viberCooperationLink.js` needs to be extended to cover these new links (or the selector generalised).

---

### ~~12. Fix sidebar placeholder text~~ ✅

**What:** In `src/data/sidebar.js`, change:
```js
co: '© Untitled | Website created with 🍺',
```
to:
```js
co: '© Усадьба Серебряный Карась',
```

---

### ~~13. Remove TODO comment from base.liquid~~ ✅

**What:** Delete `<!-- TODO: feedback section -->` from `src/layouts/base.liquid`. If a feedback section is planned, track it in the project backlog instead.

---

### ~~14. Add width/height to services gallery item images~~ ✅

**Why:** Services gallery `items` thumbnails have no `width`/`height` attributes → layout shift (CLS) as they load.

**What:** In `src/includes/services.liquid`, add `width` and `height` to the gallery item `<img>` tag:
```liquid
<img
  src='{{ imgItem.srcSet[0] }}'
  srcSet='{{ imgItem.srcSet | join: ', ' }}'
  alt='{{ imgItem.alt }}'
  width='75'
  height='100'
  loading='lazy'
  decoding='async'
  class='gallery__img card-img-top'
>
```
The thumbnail dimensions are consistently 75×100 across all `thumbnail-75x100.webp` filenames. Update `services.js` data entries to include explicit `width`/`height` fields if they vary.

---

## Tier 2 — Needs an asset or a decision first

### 1. OG share image

**What's needed:** Design one 1200×630px image (JPG or WebP) representing the estate — a landscape or fishing shot works well. Name it `og-share.jpg`, put it in `src/assets/images/`, and add to `head.liquid`:
```liquid
<meta property='og:image' content='{{ meta.url }}/assets/images/og-share.jpg'>
<meta property='og:image:width'  content='1200'>
<meta property='og:image:height' content='630'>
<meta property='og:image:alt'    content='{{ meta.ogTitle }}'>
```
Also add `twitter:card` and `twitter:image` using the same image.

Once the image exists, update the `image` field in the JSON-LD (Tier 1, item 4) to point to it instead of the hero AVIF.

---

### 2. Telegram link

**What's needed:** A Telegram username or channel. Once available, add it to `src/data/cooperation.js` alongside WhatsApp and Viber, and to `contacts.js`.

---

### 3. Migrate Flickr images to local hosting

**Why:** Several gallery images in `services.js` are served from `live.staticflickr.com`. Flickr can rate-limit, remove, or break these at any time. Hosting them locally also allows `srcset` responsive variants and proper Russian alt text.

**What's needed:** Download the Flickr images, convert to WebP, add responsive variants, update `services.js` paths and alts.

---

### 4. VideoObject structured data

**Why:** Three self-hosted videos with captions and descriptions are in `videosShowcase.js`. `VideoObject` JSON-LD could make them eligible for video rich results in Yandex/Google.

**What's needed:** A `thumbnailUrl` for each video (already have poster `.webp` files) and a publicly accessible `contentUrl`. Add to `structured-data.liquid`.

---

### 5. OpeningHours and priceRange in JSON-LD

**What's needed:** Confirm actual opening hours. Once confirmed, add to the `LodgingBusiness` block in `structured-data.liquid`:
```json
"openingHoursSpecification": [
  {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  }
],
"priceRange": "20–150 BYN"
```

---

### 6. WA prefilled message

**Why:** A prefilled message removes one tap from the WhatsApp conversion funnel.

**What:** Change `cooperation.js` href:
```
https://wa.me/375291495989?text=Здравствуйте!%20Хочу%20уточнить%20информацию%20об%20усадьбе.
```

---

## Tier 3 — Infrastructure / policy decisions

These require changes outside the codebase.

| Item | Where | Notes |
|------|-------|-------|
| HTTPS redirect | Plesk config or `.htaccess` | Add `RewriteEngine On` / `RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]` |
| www → non-www (or reverse) | Plesk / `.htaccess` | Pick one canonical form, redirect the other |
| Cookie consent | Code + policy | Required if targeting EU visitors or following BY PDPA |
| Register Yandex Metrika goals | Metrika web UI | After Tier 1 item 9 is deployed, create goals `phone_click`, `whatsapp_click`, `viber_click` |
| Submit sitemap to Yandex Webmaster | Yandex Webmaster UI | After Tier 1 item 3 is deployed |
| Submit sitemap to Google Search Console | GSC UI | After Tier 1 item 3 is deployed |
| Verify уск.бел in GSC | Google Search Console | IDN domains require punycode verification token |
| Clean up orphaned new-photos/ assets | Local + git | 11 unused JPGs in `src/assets/images/new-photos/` |

---

## Priority order summary

| # | Item | Tier | Impact |
|---|------|------|--------|
| ~~1~~ | ~~LocalBusiness JSON-LD~~ ✅ | 1 | ★★★★★ local SEO |
| ~~2~~ | ~~Canonical tag~~ ✅ | 1 | ★★★★★ deduplication |
| ~~3~~ | ~~Fix GA4 double-fire~~ ✅ | 1 | ★★★★★ data integrity |
| ~~4~~ | ~~Named conversion goals~~ ✅ | 1 | ★★★★☆ measurement |
| ~~5~~ | ~~sitemap.xml + robots.txt~~ ✅ | 1 | ★★★★☆ crawlability |
| ~~6~~ | ~~Complete OG tags~~ ✅ | 1 | ★★★★☆ social sharing |
| ~~7~~ | ~~Analytics load delay~~ ✅ | 1 | ★★★★☆ tracking accuracy |
| ~~8~~ | ~~WhatsApp/Viber in contacts~~ ✅ | 1 | ★★★★☆ conversion |
| ~~9~~ | ~~Fix contacts h2 + h4→h3~~ ✅ | 1 | ★★★☆☆ SEO/a11y |
| ~~10~~ | ~~Fix duplicate h3 headings~~ ✅ | 1 | ★★★☆☆ SEO/a11y |
| ~~11~~ | ~~English → Russian alt text~~ ✅ | 1 | ★★★☆☆ image SEO |
| ~~12~~ | ~~Gallery width/height (CLS)~~ ✅ | 1 | ★★★☆☆ Core Web Vitals |
| ~~13~~ | ~~Sidebar placeholder text~~ ✅ | 1 | ★★☆☆☆ brand |
| ~~14~~ | ~~Remove TODO comment~~ ✅ | 1 | ★☆☆☆☆ hygiene |
| 15 | OG share image | 2 | ★★★★☆ social sharing |
| 16 | Telegram link | 2 | ★★★☆☆ conversion |
| 17 | WA prefilled message | 2 | ★★★☆☆ conversion UX |
| 18 | Migrate Flickr images | 2 | ★★★☆☆ reliability |
| 19 | VideoObject JSON-LD | 2 | ★★★☆☆ rich results |
| 20 | HTTPS + www redirect | 3 | ★★★★★ fundamentals |
| 21 | GSC + Yandex Webmaster | 3 | ★★★★☆ monitoring |
| 22 | Cookie consent | 3 | ★★☆☆☆ compliance |
