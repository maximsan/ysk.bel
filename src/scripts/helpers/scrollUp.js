const button = document.querySelector('.scroll-up');

const TOP_OFFSET = 320;
const BOTTOM_OFFSET = 880;

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
          (lastKnownScrollTopPosition > TOP_OFFSET ||
            lastKnownElementScrollTopPosition > TOP_OFFSET) &&
          lastKnownScrollHeightPosition - lastKnownElementScrollTopPosition >
            BOTTOM_OFFSET
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
