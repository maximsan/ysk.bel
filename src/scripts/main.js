import { closeSideBarOnTimeout, toggleSideBar, addVideo, addInfoBanner, hideInfoBannerOnScroll } from './helpers';
import { googleMapInit } from './helpers/googleMapInit';
// import { addFixedHeader, removeFixedHeader, removeFixedHeaderOnScroll } from './helpers/header';
import { documentHeight } from './helpers/calculateDocumentHeight';
import { addScrollUpButton } from './helpers/scrollUp';

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

    if (hasInfoBannerElement) {
        addInfoBanner();
        hideInfoBannerOnScroll();
    }
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
documentHeight();

setTimeout(() => googleMapInit(), 3000);

toggleSideBar();

addVideo({
    src: 'assets/videos/main-video-compressed.mp4',
    className: 'main-video-section',
    poster: 'assets/images/video-poster.webp',
});
addVideo({
    src: 'assets/videos/fish-1.mp4',
    className: 'video-section',
    itemClassName: 'video-1',
    poster: 'assets/images/video-poster-fish-1.webp',
});
addVideo({
    src: 'assets/videos/fish-2.mp4',
    className: 'video-section',
    itemClassName: 'video-2',
    poster: 'assets/images/video-poster-fish-2.webp',
});
