import { GOOGLE_MAP_INIT_DELAY_MS } from '@constants/map.js';
import { SITE_SELECTORS } from '@constants/dom/siteSelectors.js';
import { initGoogleFormHandlers } from '@scripts/form-submission/initGoogleForm.js';
import {
  closeSideBarOnTimeout,
  toggleSideBar,
  addInfoBanner,
  googleMapInit,
  documentHeight,
  initNavScrollSpy,
  initStockingCarousel,
  initStockingImageSkeletons,
  initVideosShowcaseCarousel,
} from '@scripts/helpers/index.js';

/**
 * Must match CSS that switches the markup to slide-out navigation (`max-width: 767.98px`).
 * `_menu.scss` / `_header.scss` own the breakpoints; JavaScript gates drawer-only enhancements on the same value.
 */
const MOBILE_BREAKPOINT = '(max-width: 767.98px)';
const mobileMediaQuery = window.matchMedia(MOBILE_BREAKPOINT);

const hasInfoBannerElement = Boolean(
  document.querySelector(SITE_SELECTORS.infoBanner),
);

function runMobileOnlyEnhancements() {
  closeSideBarOnTimeout();
}

mobileMediaQuery.addEventListener('change', (event) => {
  if (event.matches) {
    runMobileOnlyEnhancements();
  }
});

if (mobileMediaQuery.matches) {
  runMobileOnlyEnhancements();
}

if (hasInfoBannerElement) {
  addInfoBanner();
}

documentHeight();
window.addEventListener('resize', documentHeight);

window.setTimeout(() => {
  googleMapInit();
}, GOOGLE_MAP_INIT_DELAY_MS);

toggleSideBar();

function initCarouselsWhenDomReady() {
  initNavScrollSpy();
  initVideosShowcaseCarousel();
  initStockingCarousel();
  initStockingImageSkeletons();
}

if (document.readyState !== 'loading') {
  initCarouselsWhenDomReady();
} else {
  document.addEventListener('DOMContentLoaded', initCarouselsWhenDomReady);
}

initGoogleFormHandlers();
