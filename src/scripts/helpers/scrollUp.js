import { SCROLL_UP_THRESHOLDS } from '../constants/dom/scroll.cjs';
import { SITE_SELECTORS } from '../constants/dom/siteSelectors.cjs';

const button = document.querySelector(SITE_SELECTORS.scrollUp);

function showScrollButton() {
  if (button) {
    button.style.display = 'block';
  }
}

function hideScrollButton() {
  if (button) {
    button.style.display = 'none';
  }
}

let lastKnownScrollTopPosition = 0;
let lastKnownElementScrollTopPosition = 0;
let lastKnownScrollHeightPosition = 0;
let ticking = false;

function showScrollUpButton() {
  window.addEventListener('scroll', () => {
    lastKnownScrollTopPosition = document.body.scrollTop;
    lastKnownElementScrollTopPosition = document.documentElement.scrollTop;
    lastKnownScrollHeightPosition = document.documentElement.scrollHeight;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (
          (lastKnownScrollTopPosition > SCROLL_UP_THRESHOLDS.topPx ||
            lastKnownElementScrollTopPosition > SCROLL_UP_THRESHOLDS.topPx) &&
          lastKnownScrollHeightPosition - lastKnownElementScrollTopPosition >
            SCROLL_UP_THRESHOLDS.bottomPx
        ) {
          showScrollButton();
        } else {
          hideScrollButton();
        }
        ticking = false;
      });

      ticking = true;
    }
  });
}

function addScrollUpOnClick() {
  button?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

export function addScrollUpButton() {
  if (!button) {
    return;
  }
  showScrollUpButton();
  addScrollUpOnClick();
}
