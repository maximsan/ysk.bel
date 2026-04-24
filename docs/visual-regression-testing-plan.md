# Visual regression testing — plan (Playwright + optional Vitest)

Goal: **catch unintended layout and styling changes** across desktop, tablet, and mobile, in **all major browser engines**, and make **visual updates an explicit, reviewable step** before changes land on the main branch.

---

## Implementation status


| Item              | Location / notes                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright config | `playwright.config.mjs` — projects for **Chromium**, **Firefox**, **WebKit** × **mobile / tablet / desktop**; `webServer` runs `yarn build` then serves `dist` on port **4173**; `snapshotPathTemplate` omits `{platform}` so one set of PNGs is shared between macOS dev and Linux CI.                                                                                                                                                |
| Visual specs      | `tests/visual/home-header.spec.js`, `tests/visual/home-sections.spec.js` — locator screenshots; shared waits in `tests/visual/support/home-snapshot-helpers.cjs`; Playwright timeouts / blocked URLs in `tests/visual/constants.js`. **DOM ids, `data-*` hooks, and shared class fragments** live in `src/scripts/constants/dom/*.cjs` (by area); bundled scripts import those modules directly. **`homePageDom.cjs`** re-exports the same surface for tests and anything that prefers one `require`. |
| Baselines         | `tests/visual/home-snapshots/*.png` (committed). `snapshotPathTemplate` in `playwright.config.mjs` keeps one folder for all home specs. Footer test is **skipped** on mobile; **header — mobile menu open** is **skipped** on tablet/desktop (drawer only under **768px**).                                                                                                                                                            |
| Yarn scripts      | `yarn test:visual`, `yarn test:visual:update`, `yarn test:visual:ui`, `yarn test:visual:report`; **`yarn test:a11y`** (axe on home via `playwright.a11y.config.mjs`, serves prebuilt `dist`)                                                                                                                                                                                                                                                                                                           |
| CI                | `.github/workflows/ci.yaml` — `**build`** runs `yarn build`, `yarn test:unit`, Playwright Chromium + **`yarn test:a11y`**; `**visual**` runs **on pull requests only** when changed paths match (see below) or the PR has label `**run-visual`** (not on `push` to `main`). Playwright uploads **playwright-report** on failure.                                                                                                                                                                  |


**Linux CI vs local:** If GitHub Actions reports screenshot mismatches against baselines generated on macOS, run `yarn test:visual:update` on a Linux environment that matches CI (or bump `maxDiffPixels` / `threshold` in config after review).

---

## Why two tools?


| Concern                                              | Recommended tool           | Notes                                                                                                                                                |
| ---------------------------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Full-page and section screenshots, cross-browser     | **Playwright**             | `expect(locator).toHaveScreenshot()` with projects for **Chromium**, **Firefox**, and **WebKit** (maps closely to Chrome/Edge, Firefox, and Safari). |
| Unit tests for pure JavaScript (helpers, form logic) | **Vitest** + **happy-dom** | `yarn test:unit` — `tests/unit/`**; CI runs in the `**build**` job. **Vitest does not replace Playwright** for full-site visual regression.          |


**Summary:** visual regression is implemented with **Playwright**; **Vitest** covers small pure-JS modules (`yarn test:unit`). Keep visual baselines in `tests/visual/home-snapshots/`, not in Vitest.

---

## Scope — “important parts” of the app

Target the **public home page** (`/` → built as `index.html`) and treat these as first-class visual surfaces (locator screenshots per breakpoint):

- **Header + primary navigation** (closed on all breakpoints; **open mobile drawer** on mobile projects only — `header — mobile menu open`)
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
2. If a change is **intentional**, run `**yarn test:visual:update`** and commit updated PNGs under `tests/visual/home-snapshots/`.
3. **Human review:** PR reviewers inspect image diffs or download the **Playwright HTML report** artifact from a failed CI run.
4. **Merge policy:** team rule — no merge of snapshot-only changes without reviewer approval of the visual diff.

Optional automation:

- Upload **Playwright HTML report** on failure (`.github/workflows/ci.yaml`)
- PR template checklist: “Visual snapshots updated — intentional? Reviewer: ___”

---

## CI integration

- **Jobs:** `build` (always) — `yarn install --immutable`, `yarn build`. `visual` (conditional, **PRs only**) — same install, then Playwright browsers and `yarn test:visual`. Pushes to `main` run `**build`** (and `**deploy**`) only; run `yarn test:visual` locally or open a PR if you need CI visuals after merge.
- **When `visual` runs:** `dorny/paths-filter` matches changes under `src/styles/`, `src/pages/`, `src/data/`, `src/scripts/`, `src/assets/`, `eleventy.config.js`, root `404.html` / `500.html`, `tests/visual/`, `playwright.config.mjs`. **Or** any PR labeled `**run-visual`** (use for dependency-only / other changes that might still affect pixels). Create that label in the repo once.
- **PR events:** `opened`, `synchronize`, `reopened`, `labeled`, `unlabeled` so adding or removing `run-visual` triggers a new run.
- **Build output:** Eleventy writes to `**dist/`** (see `eleventy.config.js`). Playwright `**webServer`** builds and serves that folder for tests.
- **Shared baselines:** `snapshotPathTemplate` without `{platform}`; if Linux still drifts from macOS, regenerate on Linux or relax thresholds after review.

---

## Implementation checklist (phased)

### Phase 0 — Decisions

- **Output directory:** `dist/`, `baseURL` `http://127.0.0.1:4173`
- **Snapshot OS policy:** single PNG set without OS suffix; may require occasional Linux regen if CI differs
- **Blocked third parties:** see `blockThirdPartyNoise` in `tests/visual/support/home-snapshot-helpers.cjs`; maps/videos use explicit readiness waits (`tests/visual/constants.js`)

### Phase 1 — Playwright foundation

- `@playwright/test`, `serve`; `playwright install --with-deps` in CI
- `playwright.config.mjs` — projects + `webServer` + shared `home-snapshots/` path
- Visual tests target built home page (section screenshots)

### Phase 2 — Visual snapshots

- `tests/visual/home-*.spec.js` with `toHaveScreenshot` per section
- `maxDiffPixels` / `threshold` in config (tune if flaky)
- Baselines under `tests/visual/home-snapshots/`

### Phase 3 — Repository hygiene

- `package.json` scripts: `test:visual`, `test:visual:update`, `test:visual:ui`, `test:visual:report`, `test:unit`, `test:unit:watch`
- `.gitignore`: `playwright-report/`, `blob-report/`, `test-results/` — snapshots **not** ignored
- README section for visual tests (see root `README.md`)

### Phase 4 — CI gate + approval culture

- CI fails on snapshot mismatch on PRs
- Team / PR policy: reviewer sign-off on intentional snapshot updates (process, not code)
- HTML report artifact on failure

### Phase 5 — Vitest (unit tests only) ✓

- `vitest` + `happy-dom`; config: `vitest.config.mjs`; tests: `tests/unit/**/*.test.js`
- Covers DOM constants (barrel `homePageDom.cjs` / underlying `constants/dom/*.cjs`), `formSubmissionCore.cjs` (email / honeypot; used by `initGoogleForm.js` in the bundle), `normalizeVideoPreload` / `parseVideoExtensionTokens` in `addVideo.js`, `documentHeight`, `stepCarouselIndex`, `infoBannerCookie` helpers
- No screenshot assertions in Vitest

---

## Quick reference — yarn scripts


| Script                    | Purpose                                                                  |
| ------------------------- | ------------------------------------------------------------------------ |
| `yarn test:visual`        | Run Playwright visual tests against a fresh `yarn build` + static server |
| `yarn test:visual:update` | Regenerate screenshot baselines after intentional UI changes             |
| `yarn test:visual:ui`     | Playwright UI mode                                                       |
| `yarn test:visual:report` | Open last HTML report                                                    |
| `yarn test:unit`          | Vitest (`tests/unit/`**); `yarn test:unit:watch` for watch mode          |


---

## Open questions

- **Animations:** handled via `prefers-reduced-motion` in tests (no Eleventy `?test=1` flag required for now).
- Minimum **reviewers** for snapshot-only PRs (team decision)
- ~~Run visual tests on every PR vs path filters~~ — **Resolved:** path filters + PR label `**run-visual`** (see CI integration).

---

*Last updated: 2026-04-20 — Playwright home specs split; shared `home-snapshots/`; Vitest in CI.*