const banner = document.querySelector('.info-banner');
const overlay = document.querySelector('.overlay');
const crossIcon = document.querySelector('.cross-icon');
const BANNER_CLASS = {
    hide: 'hide-banner',
    show: 'show-banner'
}

function showInfoBanner() {
    overlay.style.display = 'block';
    banner.classList.remove(BANNER_CLASS.hide);
    banner.classList.add(BANNER_CLASS.show);
}

function hideInfoBanner() {
    overlay.style.display = 'none';
    banner.classList.remove(BANNER_CLASS.show);
    banner.classList.add(BANNER_CLASS.hide);
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
const bannerBottom = carouselSize + banner?.offsetHeight;

export function hideInfoBannerOnScroll() {
    window.addEventListener('scroll', function () {
        const currentScrollPos = window.scrollY;
        if (!bannerClosed) {
            if (currentScrollPos < prevScrollPos || currentScrollPos < bannerBottom) {
                showInfoBanner();
            } else {
                hideInfoBanner();
            }
        }
    });
}
