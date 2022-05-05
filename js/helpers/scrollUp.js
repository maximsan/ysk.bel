//show go-up button on scroll
import $ from 'jquery';

const w = $(window);
const button = $('.scroll-up');
const body = $('html, body');

export function showScrollUpButton() {
    w.scroll(function() {
        if ((document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) && document.documentElement.scrollHeight - document.documentElement.scrollTop > 880) {
            button.show();
        } else {
            button.hide();
        }
    });
}

// When the user clicks on the button, scroll to the top of the document
export function scrollUp(milliseconds) {
    button.click(function() {
        body.animate({
            scrollTop: 0
        }, milliseconds);
    });
}

const banner = document.querySelector('.info-banner');
const overlay = document.querySelector('.overlay');
const crossIcon = document.querySelector('.cross-icon');

function hideInfoBanner() {
    // setTimeout(() => {
    overlay.style.display = 'none';
    banner.classList.remove('show-banner');
    banner.classList.add('hide-banner');
    // }, 200);
}

function showInfoBanner() {
    // setTimeout(() => {
    overlay.style.display = 'block';
    banner.classList.remove('hide-banner');
    banner.classList.add('show-banner');
    // }, 200);
}

let bannerClosed = false;

export function addInfoBanner() {
    showInfoBanner();
    crossIcon.addEventListener('click', () => {
        hideInfoBanner();
        bannerClosed = true;
    });
}

const prevScrollPos = window.scrollY;
const carouselSize = document.querySelector('.intro').offsetHeight / 2;
const bannerBottom = carouselSize + banner.offsetHeight;

export function hideInfoBannerOnScroll() {
    w.scroll(function() {
        const currentScrollPos = window.scrollY;
        if (!bannerClosed) {
            if ((currentScrollPos < prevScrollPos || currentScrollPos < bannerBottom)) {
                showInfoBanner();
            } else {
                hideInfoBanner();
            }
        }
    });
}

