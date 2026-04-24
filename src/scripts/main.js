import { GOOGLE_MAP_INIT_DELAY_MS } from './constants/map';
import { SITE_SELECTORS } from './constants/dom/siteSelectors.cjs';
import { initGoogleFormHandlers } from './form-submission/initGoogleForm';
import {
  closeSideBarOnTimeout,
  toggleSideBar,
  addInfoBanner,
  hideInfoBannerOnScroll,
  googleMapInit,
  documentHeight,
  addScrollUpButton,
  initNavScrollSpy,
  initStockingCarousel,
  initStockingImageSkeletons,
  initVideosShowcaseCarousel,
} from './helpers';

const MOBILE_BREAKPOINT = '(max-width: 768px)';
const mobileMediaQuery = window.matchMedia(MOBILE_BREAKPOINT);

const hasInfoBannerElement = Boolean(
  document.querySelector(SITE_SELECTORS.infoBanner),
);

function runMobileOnlyEnhancements() {
  closeSideBarOnTimeout();
}

function runDesktopOnlyEnhancements() {
  addScrollUpButton();
}

mobileMediaQuery.addEventListener('change', (event) => {
  if (event.matches) {
    runMobileOnlyEnhancements();
  } else {
    runDesktopOnlyEnhancements();
  }
});

if (mobileMediaQuery.matches) {
  runMobileOnlyEnhancements();
} else {
  runDesktopOnlyEnhancements();
}

if (hasInfoBannerElement) {
  addInfoBanner();
  hideInfoBannerOnScroll();
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
