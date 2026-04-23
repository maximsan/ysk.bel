import { CAROUSEL_SWIPE_THRESHOLD_PX } from '../constants/carousel';
import {
  STOCKING_CAROUSEL_CLASS,
  STOCKING_QUERY,
} from '../constants/dom/stockingCarousel.cjs';
import { STATE_CLASS } from '../constants/dom/state.cjs';
import { stepCarouselIndex } from './carouselIndex';

function initOneStockingCarousel(root) {
  const slides = [...root.querySelectorAll(STOCKING_QUERY.slide)];
  const dots = [...root.querySelectorAll(STOCKING_QUERY.dot)];
  const prevBtn = root.querySelector(STOCKING_QUERY.prev);
  const nextBtn = root.querySelector(STOCKING_QUERY.next);
  const counterCurrent = root.querySelector(STOCKING_QUERY.counterCurrent);
  const counterTotal = root.querySelector(STOCKING_QUERY.counterTotal);
  const live = root.querySelector(STOCKING_QUERY.live);

  if (!slides.length) return;

  let index = 0;

  function announce() {
    if (!live) return;
    live.textContent = `Фото ${index + 1} из ${slides.length}`;
  }

  function update() {
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle(STATE_CLASS.active, active);
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
    });

    dots.forEach((dot, i) => {
      const active = i === index;
      dot.classList.toggle(STATE_CLASS.active, active);
      dot.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    if (counterCurrent) counterCurrent.textContent = String(index + 1);
    if (counterTotal) counterTotal.textContent = String(slides.length);

    announce();
  }

  function go(delta) {
    index = stepCarouselIndex(index, delta, slides.length);
    update();
  }

  function goTo(i) {
    index = i;
    update();
  }

  prevBtn?.addEventListener('click', () => go(-1));
  nextBtn?.addEventListener('click', () => go(1));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i));
  });

  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    }
  });

  let touchStartX = null;
  const viewport = root.querySelector(STOCKING_QUERY.viewport);
  viewport?.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true },
  );
  viewport?.addEventListener(
    'touchend',
    (e) => {
      if (touchStartX == null) return;
      const dx = e.changedTouches[0].screenX - touchStartX;
      if (dx > CAROUSEL_SWIPE_THRESHOLD_PX) go(-1);
      if (dx < -CAROUSEL_SWIPE_THRESHOLD_PX) go(1);
      touchStartX = null;
    },
    { passive: true },
  );

  update();
}

export function initStockingCarousel() {
  document.querySelectorAll(STOCKING_QUERY.carouselRoot).forEach((root) => {
    initOneStockingCarousel(root);
  });
}

/**
 * Hides image skeleton layers after decode/load to avoid layout shift.
 */
export function initStockingImageSkeletons() {
  document.querySelectorAll(STOCKING_QUERY.img).forEach((img) => {
    const zoom = img.closest(`.${STOCKING_CAROUSEL_CLASS.zoom}`);
    const skeleton = zoom?.querySelector(STOCKING_QUERY.skeleton);
    if (!zoom || !skeleton) return;

    const markLoaded = () => {
      zoom.classList.add(STATE_CLASS.loaded);
    };

    if (img.complete && img.naturalWidth > 0) {
      markLoaded();
      return;
    }

    img.addEventListener('load', markLoaded, { once: true });
    img.addEventListener('error', markLoaded, { once: true });
  });
}
