import {
    closeSideBarOnTimeout,
    toggleSideBar,
    addVideo,
    addInfoBanner,
    hideInfoBannerOnScroll,
} from './helpers';
import { googleMapInit } from './helpers/googleMapInit';
// import { addFixedHeader, removeFixedHeader, removeFixedHeaderOnScroll } from './helpers/header';
// import { initPhotoSwipeFromDOM } from './photo/photoSwipeSetup';
import { documentHeight } from './helpers/calculateDocumentHeight';
import { scrollUp, showScrollUpButton } from './helpers/scrollUp';

const MOBILE_BREAKPOINT = '(max-width: 768px)';
const IPAD_BREAKPOINT = window.matchMedia('(min-width: 768px)');
const mobile = window.matchMedia(MOBILE_BREAKPOINT);

const videoSection = document.querySelector('.video-section');
const banner = document.querySelector('.info-banner');

const windowWidth = window.innerWidth;

console.log('window width', windowWidth);

console.log('mobile', mobile);

const mobileMethods = () => {
    // removeFixedHeaderOnScroll();
    // addFixedHeader();

    closeSideBarOnTimeout();
    videoSection.style.display = 'none';
};

// TODO: review all code
const desktopMethods = () => {
    // removeFixedHeader();
    // addFixedHeaderOnScroll();

    showScrollUpButton();
    scrollUp();

    videoSection.style.display = 'flex';

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
    scrollUp();
}

// TODO: Do we need it ?
documentHeight();

setTimeout(() => googleMapInit(), 3000);

toggleSideBar();

addVideo({
    src: 'assets/videos/main-video-compressed.mp4',
    className: '.main-video-section',
    poster: 'assets/images/video-poster.webp',
});
addVideo({
    src: 'assets/videos/fish-1.mp4',
    className: '.video-section',
    poster: 'assets/images/video-poster-fish-1.webp',
});
addVideo({
    src: 'assets/videos/fish-2.mp4',
    className: '.video-section',
    poster: 'assets/images/video-poster-fish-2.webp',
});

if (banner) {
    addInfoBanner();
    hideInfoBannerOnScroll();
}

// initPhotoSwipeFromDOM(gallerySelector);
