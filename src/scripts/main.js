import { GOOGLE_MAP_INIT_DELAY_MS } from './constants/map';
import { SITE_SELECTORS } from './constants/dom/siteSelectors.cjs';
import { initGoogleFormHandlers } from './form-submission/initGoogleForm';
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
  initHeroScrollCue,
} from './helpers';

/** Keep in sync with slide-out nav in `_menu.scss` / `_header.scss` (`max-width: 767.98px`). */
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

initHeroScrollCue();

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
