import {
  closeSideBarOnTimeout,
  toggleSideBar,
  addInfoBanner,
  hideInfoBannerOnScroll,
  googleMapInit,
  documentHeight,
  addScrollUpButton,
  initVideoSection,
} from './helpers';
// import { addFixedHeader, removeFixedHeader, removeFixedHeaderOnScroll } from './helpers/header';

const MOBILE_BREAKPOINT = '(max-width: 768px)';
const mobile = window.matchMedia(MOBILE_BREAKPOINT);

const hasInfoBannerElement = document.querySelector('.info-banner');

const windowWidth = window.innerWidth;

console.log('window width', windowWidth);

console.log('mobile', mobile);

const mobileOnlyMethods = () => {
  // removeFixedHeaderOnScroll();
  // addFixedHeader();

  closeSideBarOnTimeout();
};

// TODO: review all code
const desktopOnlyMethods = () => {
  // removeFixedHeader();
  // addFixedHeaderOnScroll();

  addScrollUpButton();
};

mobile.addEventListener('change', (event) => {
  if (event.matches) {
    mobileOnlyMethods();
  } else {
    desktopOnlyMethods();
  }
});

if (mobile.matches) {
  mobileOnlyMethods();
} else {
  // addFixedHeaderOnScroll();
  desktopOnlyMethods();
}

if (hasInfoBannerElement) {
  addInfoBanner();
  hideInfoBannerOnScroll();
}

// TODO: Do we need it ?
// documentHeight();

setTimeout(() => googleMapInit(), 3000);

toggleSideBar();

function initVideoSections() {
  initVideoSection({
    sectionName: 'primary',
    className: 'video-section',
    removeWrappers: true,
  });
  initVideoSection({
    sectionName: 'secondary',
    className: 'video-section',
    removeWrappers: true,
  });
}

if (document.readyState !== 'loading') {
  initVideoSections();
} else {
  document.addEventListener('DOMContentLoaded', initVideoSections);
}
