const banner = document.querySelector('.info-banner');
const overlay = document.querySelector('.overlay');
const crossIcon = document.querySelector('.cross-icon');
const BANNER_CLASS = {
  hide: 'hide-banner',
  show: 'show-banner',
};

const INFO_BANNER_COOKIE = 'info-banner=false';
const COOKIE_MAX_AGE = 86400;

function buildDismissCookie() {
  const parts = [
    `${INFO_BANNER_COOKIE}`,
    `max-age=${COOKIE_MAX_AGE}`,
    'Path=/',
    'SameSite=Lax',
  ];
  if (window.location.protocol === 'https:') {
    parts.push('Secure');
  }

  return parts.join('; ');
}

function showInfoBanner() {
  overlay.style.display = 'block';
  banner.classList.remove(BANNER_CLASS.hide);
  banner.classList.add(BANNER_CLASS.show);
}

function showCookieInfoBanner() {
  const hasInfoBannerCookie =
    document.cookie.split(';').filter((c) => c.includes('info-banner='))
      .length > 0;
  if (!hasInfoBannerCookie) {
    showInfoBanner();
  }
}

function hideInfoBanner() {
  overlay.style.display = 'none';
  banner.classList.remove(BANNER_CLASS.show);
  banner.classList.add(BANNER_CLASS.hide);
}

let bannerClosed = false;

function dismissBannerPermanently() {
  hideInfoBanner();
  bannerClosed = true;
  document.cookie = buildDismissCookie();
}

export function addInfoBanner() {
  showCookieInfoBanner();

  crossIcon?.addEventListener('click', () => {
    dismissBannerPermanently();
  });

  banner?.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link || !banner.contains(link)) return;
    dismissBannerPermanently();
  });
}

const intro = document.querySelector('.intro');
const carouselSize = intro ? intro.offsetHeight / 2 : 0;
const bannerBottom = carouselSize + (banner?.offsetHeight ?? 0);

export function hideInfoBannerOnScroll() {
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
