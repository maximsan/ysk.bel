import $ from 'jquery';
import AOS from 'aos';
import { closeSideBarOnTimeout, toggleSideBar } from './sideBar';
import { googleMapInit } from './googleMapInit';
import { scrollUp, showScrollUpButton } from './scrollUp';
import { smoothScroll } from './smoothScroll';
import { addFixedHeader, addFixedHeaderOnScroll } from './header';

const w = $(window);
const wWidth = w.width();
const carousel = $('.carousel');

$(function() {
    googleMapInit();
    addFixedHeader();
    toggleSideBar();

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

carousel.carousel({
    interval: 4000
});

AOS.init({
    disable: 'mobile'
});
AOS.refresh();
