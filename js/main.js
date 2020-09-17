import $ from 'jquery';
import AOS from 'aos';
import { closeSideBarOnTimeout, toggleSideBar } from './sideBar';
import { googleMapInit } from './googleMapInit';
import { scrollUp, showScrollUpButton } from './scrollUp';
import { smoothScroll } from './smoothScroll';
import { addFixedHeader, addFixedHeaderOnScroll, removeFixedHeader, removeFixedHeaderOnScroll } from './header';

const carousel = $('.carousel');
const w = $(window);
const wWidth = w.width();

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
};

$(function() {
    googleMapInit();
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
    });
});

carousel.carousel({
    interval: 4000
});

AOS.init({
    disable: 'mobile'
});

AOS.refresh();
