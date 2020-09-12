import $ from 'jquery';
import AOS from 'aos';
import { closeSideBarOnTimeout, drawSidebar, toggleSideBar } from './sideBar';
import { googleMapInit } from './googleMapInit';
import { scrollUp, showScrollUpButton } from './scrollUp';
import { smoothScroll } from './smoothScroll';
import { addFixedHeader, addFixedHeaderOnScroll } from './header';

function commonMethods() {
    addFixedHeader();
    toggleSideBar();
    drawSidebar();
    closeSideBarOnTimeout();
}

const window = $(window);
const windowWidth = $(window).width();
const carousel = $('.carousel');

$(function() {
    googleMapInit();
    commonMethods();

    if (windowWidth >= 768) {
        addFixedHeaderOnScroll();
        smoothScroll(1500);
        showScrollUpButton();
        scrollUp(1000);
    }

});

carousel.carousel({
    interval: 4000
});

AOS.init({
    disable: 'mobile'
});
AOS.refresh();
