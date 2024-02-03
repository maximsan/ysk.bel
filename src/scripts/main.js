import { closeSideBarOnTimeout, toggleSideBar, addVideo, addInfoBanner, hideInfoBannerOnScroll } from './helpers';
import { googleMapInit } from './helpers/googleMapInit';
// import { hideInfoBannerOnScroll, scrollUp } from './helpers/scrollUp';
// import { addFixedHeader, removeFixedHeader, removeFixedHeaderOnScroll } from './helpers/header';
import { initPhotoSwipeFromDOM } from './photo/photoSwipeSetup';
import { documentHeight } from './helpers/calculateDocumentHeight';
import { scrollUp, showScrollUpButton } from './helpers/scrollUp';
// import { showScrollUpButton } from './helpers/scrollUp';

const MOBILE_BREAKPOINT = '(max-width: 768px)';
const mobile = window.matchMedia(MOBILE_BREAKPOINT);

const gallerySelector = '.gallery';
const banner = document.querySelector('.info-banner');
const windowWidth = window.innerWidth;

console.log('window width', windowWidth);


console.log('mobile', mobile);

const mobileMethods = () => {
    // removeFixedHeaderOnScroll();
    closeSideBarOnTimeout();
    // addFixedHeader();
};

// TODO: review all code
const desktopMethods = () => {
    // removeFixedHeader();
    // addFixedHeaderOnScroll();
    showScrollUpButton();
    scrollUp(1000);
    if (banner) {
        addInfoBanner();
        hideInfoBannerOnScroll();
    }
};

mobile.addEventListener('change', (event) => {
    if (event.matches) {
        mobileMethods();
    } else {
        desktopMethods();
    }
});


if (mobile.matches) {
    closeSideBarOnTimeout();
} else {
    // addFixedHeaderOnScroll();
    showScrollUpButton();
    scrollUp(1000);
}

// TODO: Do we need it ?
documentHeight();

setTimeout(() => googleMapInit(), 3000);

toggleSideBar();

addVideo();

if (banner) {
    addInfoBanner();
    hideInfoBannerOnScroll();
}


initPhotoSwipeFromDOM(gallerySelector);


