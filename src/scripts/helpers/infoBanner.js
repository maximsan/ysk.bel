import { INFO_BANNER_STATE_CLASS } from '@constants/dom/infoBanner.js';
import { SITE_SELECTORS } from '@constants/dom/siteSelectors.js';
import {
  buildInfoBannerDismissCookie,
  hasInfoBannerDismissCookie,
} from './infoBannerCookie';

const banner = document.querySelector(SITE_SELECTORS.infoBanner);
const overlay = document.querySelector(SITE_SELECTORS.overlay);
const crossIcon = document.querySelector(SITE_SELECTORS.crossIcon);

function showInfoBanner() {
  if (!overlay || !banner) {
    return;
  }
  overlay.style.display = 'block';
  banner.classList.remove(INFO_BANNER_STATE_CLASS.hide);
  banner.classList.add(INFO_BANNER_STATE_CLASS.show);
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
  banner.classList.remove(INFO_BANNER_STATE_CLASS.show);
  banner.classList.add(INFO_BANNER_STATE_CLASS.hide);
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

const intro = document.querySelector(SITE_SELECTORS.intro);
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
