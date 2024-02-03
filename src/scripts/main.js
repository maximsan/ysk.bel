import { closeSideBarOnTimeout, toggleSideBar, addVideo, addInfoBanner, hideInfoBannerOnScroll } from './helpers';
import { googleMapInit } from './helpers/googleMapInit';
// import { hideInfoBannerOnScroll, scrollUp } from './helpers/scrollUp';
// import { addFixedHeader, removeFixedHeader, removeFixedHeaderOnScroll } from './helpers/header';
import { initPhotoSwipeFromDOM } from './photo/photoSwipeSetup';
import { documentHeight } from './helpers/calculateDocumentHeight';


const MOBILE_BREAKPOINT = '(max-width: 768px)';

const mobile = window.matchMedia(MOBILE_BREAKPOINT);

const mobileMethods = () => {
    // removeFixedHeaderOnScroll();
    closeSideBarOnTimeout();
    // addFixedHeader();
};

// TODO: review all code
const desktopMethods = () => {
    // removeFixedHeader();
    // addFixedHeaderOnScroll();
    // showScrollUpButton();
    // scrollUp(1000);
    addInfoBanner();
    hideInfoBannerOnScroll();
};

mobile.addEventListener('change', (event) => {
    if (event.matches) {
        mobileMethods();
    } else {
        desktopMethods();
    }
});

const gallery = '.gallery';

const windowWidth = window.innerWidth;

console.log('window width', windowWidth);


console.log('mobile', mobile);

// TODO: Do we need it ?
documentHeight();

setTimeout(() => googleMapInit(), 3000);

toggleSideBar();


if (windowWidth >= 768) {
    // addFixedHeaderOnScroll();
    // showScrollUpButton();
    // scrollUp(1000);
}
if (windowWidth < 768) {
    closeSideBarOnTimeout();
}

addVideo();

addInfoBanner();
hideInfoBannerOnScroll();

initPhotoSwipeFromDOM(gallery);


