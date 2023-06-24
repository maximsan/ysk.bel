import $ from 'jquery';
import { closeSideBarOnTimeout, toggleSideBar } from './helpers/sideBar';
import { googleMapInit } from './helpers/googleMapInit';
import { addInfoBanner, hideInfoBannerOnScroll, scrollUp, showScrollUpButton } from './helpers/scrollUp';
import { smoothScroll } from './helpers/smoothScroll';
import { addFixedHeader, addFixedHeaderOnScroll, removeFixedHeader, removeFixedHeaderOnScroll } from './helpers/header';
import { initPhotoSwipeFromDOM } from './photo/photoSwipeSetup';
import { documentHeight } from './helpers/calculateDocumentHeight';

documentHeight();

const w = $(window);
const wWidth = w.width();
const gallery = '.gallery';

const mobile = window.matchMedia('(max-width: 768px');

const methods = (e) => {
    if (e.matches) {
        mobileMethods();
    } else {
        desktopMethods();
    }
};

const mobileMethods = () => {
    removeFixedHeaderOnScroll();
    closeSideBarOnTimeout();
    addFixedHeader();
};

const desktopMethods = () => {
    removeFixedHeader();
    addFixedHeaderOnScroll();
    smoothScroll(1500);
    showScrollUpButton();
    scrollUp(1000);
    addInfoBanner();
    hideInfoBannerOnScroll();
};

$(function () {
    setTimeout(() => googleMapInit(), 3000);
    toggleSideBar();
    mobile.addEventListener('change', methods);
    window.addEventListener('load', () => {
        if (wWidth >= 768) {
            addFixedHeaderOnScroll();
            smoothScroll(1500);
            showScrollUpButton();
            scrollUp(1000);
        }
        if (wWidth < 768) {
            closeSideBarOnTimeout();
        }
        addInfoBanner();
        hideInfoBannerOnScroll();
    });
});

initPhotoSwipeFromDOM(gallery);
