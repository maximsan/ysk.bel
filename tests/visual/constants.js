'use strict';

const homePageDom = require('../../src/scripts/constants/homePageDom.cjs');

/**
 * Shared layout breakpoints for visual tests.
 * Keep in sync with critical CSS (e.g. expanded nav vs hamburger in `_menu.scss`).
 */
const LAYOUT = {
  /** Viewports ≥ this width: expanded inline nav; below: hamburger + slide-out (`home-header.spec.js`). */
  footerMinVisibleWidthPx: 768,
};

/** Viewport sizes for Playwright projects (also used from `playwright.config.mjs`). */
const VIEWPORTS = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 },
};

/**
 * Third-party URLs blocked during screenshots (noise / non-determinism).
 * Not part of site DOM — lives here next to other test runtime config.
 */
const BLOCKED_THIRD_PARTY_URL_GLOBS = [
  '**/*googletagmanager.com/**',
  '**/*google-analytics.com/**',
  '**/*analytics.google.com/**',
  '**/*mc.yandex.ru/**',
];

const HOME_SELECTORS = {
  sectionIds: homePageDom.SECTION_IDS,
  locators: { ...homePageDom.PLAYWRIGHT_HOME_LOCATORS },
  classMap: {
    stockingLoadedClass: homePageDom.STATE_CLASS.loaded,
    videosMediaReadyClass: homePageDom.STATE_CLASS.mediaReady,
    mapShellId: homePageDom.MAP_ELEMENT.shellId,
    mapShellReadyClass: homePageDom.MAP_ELEMENT.shellReadyClass,
    menuOpenClass: homePageDom.MENU_CLASS.open,
  },
  timeouts: {
    /** Google Maps: `googleMapInit` is delayed ~3s; tiles need time after `idle`. */
    mapReadyMs: 45_000,
    mapTileSettleMs: 750,
    /** First carousel video: mount + `loadeddata` / poster paint. */
    videoShowcaseReadyMs: 30_000,
    stockingCarouselReadyMs: 20_000,
    imageLoadPerImageMs: 8_000,
    menuDrawerOpenMs: 10_000,
    /** `.menu` uses `transition: left 0.2s` when opening (`_mixins.scss`). */
    menuDrawerTransitionMs: 300,
  },
};

function homeActiveVideoHostSelector() {
  return homePageDom.buildHomeActiveVideoHostSelector();
}

module.exports = {
  LAYOUT,
  VIEWPORTS,
  BLOCKED_THIRD_PARTY_URL_GLOBS,
  HOME_SELECTORS,
  homeActiveVideoHostSelector,
};
