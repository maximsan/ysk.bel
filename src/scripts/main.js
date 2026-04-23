import { GOOGLE_MAP_INIT_DELAY_MS } from './constants/map';
import {
  closeSideBarOnTimeout,
  toggleSideBar,
  addInfoBanner,
  hideInfoBannerOnScroll,
  googleMapInit,
  documentHeight,
  addScrollUpButton,
  initStockingCarousel,
  initStockingImageSkeletons,
  initVideosShowcaseCarousel,
} from './helpers';

const MOBILE_BREAKPOINT = '(max-width: 768px)';
const mobileMediaQuery = window.matchMedia(MOBILE_BREAKPOINT);

const hasInfoBannerElement = Boolean(document.querySelector('.info-banner'));

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
  initVideosShowcaseCarousel();
  initStockingCarousel();
  initStockingImageSkeletons();
}

if (document.readyState !== 'loading') {
  initCarouselsWhenDomReady();
} else {
  document.addEventListener('DOMContentLoaded', initCarouselsWhenDomReady);
}
