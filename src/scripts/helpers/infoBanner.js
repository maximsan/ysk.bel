import { INFO_BANNER_STATE_CLASS } from '../constants/dom/infoBanner.cjs';
import { SITE_SELECTORS } from '../constants/dom/siteSelectors.cjs';
import {
  buildInfoBannerDismissCookie,
  hasInfoBannerDismissCookie,
} from './infoBannerCookie';

const banner = document.querySelector(SITE_SELECTORS.infoBanner);
const overlay = document.querySelector(SITE_SELECTORS.overlay);
const crossIcon = document.querySelector(SITE_SELECTORS.crossIcon);
const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function isModalBanner() {
  return banner?.dataset.infoBannerVariant === 'modal';
}

let previouslyFocusedElement = null;

function showInfoBanner() {
  if (!banner) {
    return;
  }
  banner.hidden = false;
  banner.setAttribute('aria-hidden', 'false');

  if (isModalBanner() && overlay) {
    overlay.hidden = false;
    overlay.style.display = 'block';
    previouslyFocusedElement = document.activeElement;
  }

  banner.classList.remove(INFO_BANNER_STATE_CLASS.hide);
  banner.classList.add(INFO_BANNER_STATE_CLASS.show);

  if (isModalBanner()) {
    const firstFocusable = banner.querySelector(focusableSelector);
    firstFocusable?.focus();
  }
}

function showCookieInfoBanner() {
  if (hasInfoBannerDismissCookie(document.cookie)) {
    return;
  }
  showInfoBanner();
}

function hideInfoBanner() {
  if (!banner) {
    return;
  }

  if (overlay) {
    overlay.style.display = 'none';
    overlay.hidden = true;
  }

  banner.classList.remove(INFO_BANNER_STATE_CLASS.show);
  banner.classList.add(INFO_BANNER_STATE_CLASS.hide);
  banner.setAttribute('aria-hidden', 'true');
  banner.hidden = true;

  if (
    previouslyFocusedElement &&
    typeof previouslyFocusedElement.focus === 'function'
  ) {
    previouslyFocusedElement.focus();
  }
  previouslyFocusedElement = null;
}

let bannerClosed = false;

function dismissBannerPermanently() {
  hideInfoBanner();
  bannerClosed = true;
  document.cookie = buildInfoBannerDismissCookie(
    window.location.protocol === 'https:',
  );
}

function handleModalKeyboard(event) {
  if (!isModalBanner() || !banner?.classList.contains(INFO_BANNER_STATE_CLASS.show)) {
    return;
  }

  if (event.key === 'Escape') {
    event.preventDefault();
    dismissBannerPermanently();
    return;
  }

  if (event.key !== 'Tab') {
    return;
  }

  const focusableElements = Array.from(
    banner.querySelectorAll(focusableSelector),
  );

  if (focusableElements.length === 0) {
    return;
  }

  const first = focusableElements[0];
  const last = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
    return;
  }

  if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
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

  overlay?.addEventListener('click', () => {
    if (isModalBanner()) {
      dismissBannerPermanently();
    }
  });

  document.addEventListener('keydown', handleModalKeyboard);
}

/**
 * Previous behaviour reopened the banner when a user scrolled back up. The
 * redesigned banner is intentionally one-shot: show if no dismissal cookie,
 * stay dismissed after close / link click. Kept as a no-op export for any
 * older import sites while Group C removes the call from `main.js`.
 */
export function hideInfoBannerOnScroll() {
  return undefined;
}
