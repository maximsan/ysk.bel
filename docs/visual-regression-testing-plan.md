# Visual regression testing — plan (Playwright + optional Vitest)

Goal: **catch unintended layout and styling changes** across desktop, tablet, and mobile, in **all major browser engines**, and make **visual updates an explicit, reviewable step** before changes land on the main branch.

---

## Implementation status


| Item              | Location / notes                                                                                                                                                                                                                                                                        |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright config | `playwright.config.mjs` — projects for **Chromium**, **Firefox**, **WebKit** × **mobile / tablet / desktop**; `webServer` runs `yarn build` then serves `dist` on port **4173**; `snapshotPathTemplate` omits `{platform}` so one set of PNGs is shared between macOS dev and Linux CI. |
| Visual specs      | `tests/visual/home.spec.js` — locator screenshots; Playwright timeouts / blocked URLs in `tests/visual/constants.js`. **DOM ids, `data-*` hooks, and shared class fragments** are defined once in `src/scripts/constants/homePageDom.cjs` (imported by carousel / video / map JS and re-used from tests via `require`). |
| Baselines         | `tests/visual/home.spec.js-snapshots/*.png` (committed). **78** PNGs — footer test is **skipped** on mobile projects (viewport width under **768px**) because `.footer-social` is `display: none` in CSS.                                                                               |
| Yarn scripts      | `yarn test:visual`, `yarn test:visual:update`, `yarn test:visual:ui`, `yarn test:visual:report`                                                                                                                                                                                         |
| CI                | `.github/workflows/ci.yaml` — after `yarn build`, installs browsers, runs `yarn test:visual`, uploads **playwright-report** artifact on failure.                                                                                                                                        |


**Linux CI vs local:** If GitHub Actions reports screenshot mismatches against baselines generated on macOS, run `yarn test:visual:update` on a Linux environment that matches CI (or bump `maxDiffPixels` / `threshold` in config after review).

---

## Why two tools?


| Concern                                              | Recommended tool      | Notes                                                                                                                                                                                                                         |
| ---------------------------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Full-page and section screenshots, cross-browser     | **Playwright**        | `expect(locator).toHaveScreenshot()` with projects for **Chromium**, **Firefox**, and **WebKit** (maps closely to Chrome/Edge, Firefox, and Safari).                                                                          |
| Unit tests for pure JavaScript (helpers, form logic) | **Vitest** (optional) | Fast, ESM-friendly tests for `src/scripts/helpers/`**, `form-submission/**`, etc. **Vitest does not replace Playwright for full-site visual regression** — use it only if you want automated unit coverage alongside visuals. |


**Summary:** visual regression is implemented with **Playwright**. Add **Vitest** when you want isolated tests for non-DOM JavaScript; keep visual baselines in Playwright’s snapshot folders, not in Vitest.

---

## Scope — “important parts” of the app

Target the **public home page** (`/` → built as `index.html`) and treat these as first-class visual surfaces (locator screenshots per breakpoint):

- **Header + primary navigation** (open mobile menu not covered yet)
- **Cooperation banner** (top strip)
- **Info banner** (important notice block)
- **Hero section**
- **Services** block
- **Stocking with fish** carousel (waits for active slide image `is-loaded`)
- **Videos** showcase (waits for active slide media ready, then pauses video at the start for a stable frame)
- **Contacts** section (waits for `map-shell--ready` after Google Maps `idle`, then a short tile settle)
- **Footer** (tablet + desktop only; hidden on narrow mobile — see below)

Optional follow-ups:

- **404** and **500** error pages (`404.html`, `500.html`)
- **Thank-you / modal** states if they become user-visible flows worth locking
- **Header** with mobile menu open (`.navbar-collapse` expanded)

---

## Viewports (projects)

Defined in `playwright.config.mjs` and reused across tests:

- **Mobile** — `390×844`
- **Tablet** — `768×1024`
- **Desktop** — `1440×900`

Each screenshot runs under **mobile / tablet / desktop** × **chromium / firefox / webkit** (9 projects). The footer test runs on **6** of them (tablet + desktop only).

---

## Browser coverage (“all major browsers”)

Playwright projects:

- **Chromium** — aligns with Chrome and Chromium-based Edge behavior for layout/CSS
- **Firefox** — Gecko engine
- **WebKit** — aligns with Safari’s engine for macOS/iOS Safari-class issues

**Note:** Microsoft Edge (Chromium) is not a separate install in Playwright; **Chromium** is the practical stand-in.

---

## Stability (avoid flaky snapshots)

- **Fonts:** `document.fonts.ready` in `beforeEach`; remote webfonts **blocked** so snapshots use system stacks (stable, slightly different from production typography).
- **Animations:** `page.emulateMedia({ reducedMotion: 'reduce' })` in `beforeEach`.
- **Google Maps:** `waitForMapReady` — `#map` gets `map-shell--ready` after `idle`, plus `mapTileSettleMs` (see `tests/visual/constants.js`).
- **Video:** `waitForVideoShowcaseReady` — `is-media-ready` / `readyState`, then `pause()` and `currentTime = 0`.
- **Carousels:** services images waited with per-image timeout; stocking waits for active zoom `is-loaded`.
- **Time / locale:** pin timezone/locale in CI if formatted dates become visible in snapshotted regions

Third-party **blocked** in tests (layout noise / analytics): GTM, Google Analytics, Yandex, Google Fonts, Font Awesome CDN (icons may differ from production).

---

## Developer workflow — detect change, then get approval

1. **Local / CI runs** `yarn test:visual` (visual assertions on committed baselines).
2. If a change is **intentional**, run `**yarn test:visual:update`** and commit updated PNGs under `tests/visual/home.spec.js-snapshots/`.
3. **Human review:** PR reviewers inspect image diffs or download the **Playwright HTML report** artifact from a failed CI run.
4. **Merge policy:** team rule — no merge of snapshot-only changes without reviewer approval of the visual diff.

Optional automation:

- Upload **Playwright HTML report** on failure (`.github/workflows/ci.yaml`)
- PR template checklist: “Visual snapshots updated — intentional? Reviewer: ___”

---

## CI integration

- **CI job** in `.github/workflows/ci.yaml`: `yarn install --immutable`, `yarn build`, `yarn exec playwright install chromium firefox webkit --with-deps`, `yarn test:visual`
- **Build output:** Eleventy writes to `**dist/`** (see `eleventy.config.js`). Playwright `**webServer**` builds and serves that folder for tests.
- **Shared baselines:** `snapshotPathTemplate` without `{platform}`; if Linux still drifts from macOS, regenerate on Linux or relax thresholds after review.

---

## Implementation checklist (phased)

### Phase 0 — Decisions

- **Output directory:** `dist/`, `baseURL` `http://127.0.0.1:4173`
- **Snapshot OS policy:** single PNG set without OS suffix; may require occasional Linux regen if CI differs
- **Blocked third parties:** see `blockThirdPartyNoise` in `tests/visual/home.spec.js`; maps/videos use explicit readiness waits (`tests/visual/constants.js`)

### Phase 1 — Playwright foundation

- `@playwright/test`, `serve`; `playwright install --with-deps` in CI
- `playwright.config.mjs` — projects + `webServer`
- Visual tests target built home page (section screenshots)

### Phase 2 — Visual snapshots

- `tests/visual/home.spec.js` with `toHaveScreenshot` per section
- `maxDiffPixels` / `threshold` in config (tune if flaky)
- Baselines under `tests/visual/home.spec.js-snapshots/`

### Phase 3 — Repository hygiene

- `package.json` scripts: `test:visual`, `test:visual:update`, `test:visual:ui`, `test:visual:report`
- `.gitignore`: `playwright-report/`, `blob-report/`, `test-results/` — snapshots **not** ignored
- README section for visual tests (see root `README.md`)

### Phase 4 — CI gate + approval culture

- CI fails on snapshot mismatch on PRs
- Team / PR policy: reviewer sign-off on intentional snapshot updates (process, not code)
- HTML report artifact on failure

### Phase 5 — Optional Vitest (unit tests only)

- Add `vitest` + `jsdom` or `happy-dom` if testing DOM-less modules
- Cover `src/scripts/helpers/`** and critical form logic
- No screenshot assertions in Vitest unless you adopt a separate strategy

---

## Quick reference — yarn scripts


| Script                    | Purpose                                                                  |
| ------------------------- | ------------------------------------------------------------------------ |
| `yarn test:visual`        | Run Playwright visual tests against a fresh `yarn build` + static server |
| `yarn test:visual:update` | Regenerate screenshot baselines after intentional UI changes             |
| `yarn test:visual:ui`     | Playwright UI mode                                                       |
| `yarn test:visual:report` | Open last HTML report                                                    |
| `yarn test:unit`          | (Optional, not added) Vitest unit tests                                  |


---

## Open questions

- **Animations:** handled via `prefers-reduced-motion` in tests (no Eleventy `?test=1` flag required for now).
- Minimum **reviewers** for snapshot-only PRs (team decision)
- Run visual tests on **every PR** or only when `src/styles/`** / `src/includes/**` changes (path filters)?

---

*Last updated: 2026-04-20 — Playwright visual regression implemented; Vitest optional.*