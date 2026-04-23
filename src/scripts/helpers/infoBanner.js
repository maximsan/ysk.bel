import {
  buildInfoBannerDismissCookie,
  hasInfoBannerDismissCookie,
} from './infoBannerCookie';

const banner = document.querySelector('.info-banner');
const overlay = document.querySelector('.overlay');
const crossIcon = document.querySelector('.cross-icon');

const BANNER_CLASS = {
  hide: 'hide-banner',
  show: 'show-banner',
};

function showInfoBanner() {
  if (!overlay || !banner) {
    return;
  }
  overlay.style.display = 'block';
  banner.classList.remove(BANNER_CLASS.hide);
  banner.classList.add(BANNER_CLASS.show);
}

function showCookieInfoBanner() {
  if (hasInfoBannerDismissCookie(document.cookie)) {
    return;
  }
  showInfoBanner();
}

function hideInfoBanner() {
  if (!overlay || !banner) {
    return;
  }
  overlay.style.display = 'none';
  banner.classList.remove(BANNER_CLASS.show);
  banner.classList.add(BANNER_CLASS.hide);
}

let bannerClosed = false;

function dismissBannerPermanently() {
  hideInfoBanner();
  bannerClosed = true;
  document.cookie = buildInfoBannerDismissCookie(
    window.location.protocol === 'https:',
  );
}

export function addInfoBanner() {
  if (!banner) {
    return;
  }

  showCookieInfoBanner();

  crossIcon?.addEventListener('click', () => {
    dismissBannerPermanently();
  });

  banner.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link || !banner.contains(link)) {
      return;
    }
    dismissBannerPermanently();
  });
}

const intro = document.querySelector('.intro');
const carouselSize = intro ? intro.offsetHeight / 2 : 0;
const bannerBottom = carouselSize + (banner?.offsetHeight ?? 0);

export function hideInfoBannerOnScroll() {
  if (!banner) {
    return;
  }

  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollPos = window.scrollY;
    const scrollingUp = currentScrollPos < lastScrollY;
    lastScrollY = currentScrollPos;

    if (!bannerClosed) {
      if (scrollingUp || currentScrollPos < bannerBottom) {
        showCookieInfoBanner();
      } else {
        hideInfoBanner();
      }
    }
  });
}
