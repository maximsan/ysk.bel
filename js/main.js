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

    if (windowWidth >= 768) {
        addFixedHeaderOnScroll();
        smoothScroll(1500);
        showScrollUpButton();
        scrollUp(1000);
    } else if (windowWidth > 320 && windowWidth < 768) {
        commonMethods();
        // redrawPackagesForTablets();
        // redrawContentCells();
    } else {
        commonMethods();
        // removePackagesDisk();
        // redrawPackageHeader();
        // redrawPackagesForSmallSmartphones();
    }
});

function redrawContentCells() {
    const cells = $('.section-container.services .content-cell .row');
    const cellsWithImg = $(
        '.section-container.services .content-cell .content-cell-element.img'
    );
    const cellsWithText = $(
        '.section-container.services .content-cell .content-cell-element.text'
    );

    for (let i = 0; i < cells.length; i++) {
        cells[i].append(cellsWithImg[i]);
        cells[i].append(cellsWithText[i]);
    }
}

carousel.carousel({
    interval: 4000
});

AOS.init({
    disable: 'mobile'
});
AOS.refresh();
