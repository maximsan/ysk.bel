import * as homePageDom from '@constants/homePageDom.js';

/**
 * Shared layout breakpoints for visual tests.
 * Match `_menu.scss` (expanded nav vs hamburger at 768px), `_footer.scss` (`footer-social` visibility).
 */
export const LAYOUT = {
  footerMinVisibleWidthPx: 768,
};

/** Viewport sizes for Playwright projects (also used from `playwright.config.js`). */
export const VIEWPORTS = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 },
};

export const HOME_SELECTORS = {
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
    /** Drawer slide timing — `_menu.scss` (`left`, ~0.28s ease-out; allow small buffer). */
    menuDrawerTransitionMs: 300,
    /** Element screenshots: fonts / flex / carousel can shrinkwrap after first paint — wait until box stops moving. */
    screenshotLayoutStableTimeoutMs: 20_000,
    screenshotLayoutStablePollMs: 120,
    screenshotLayoutStableRounds: 4,
  },
};

export function homeActiveVideoHostSelector() {
  return homePageDom.buildHomeActiveVideoHostSelector();
}
