import homePageDom from '../constants/homePageDom.cjs';
import { CAROUSEL_SWIPE_THRESHOLD_PX } from '../constants/carousel';
import { mountLazyVideoHost } from './addVideo';
import { stepCarouselIndex } from './carouselIndex';

const {
  VIDEO_SHOWCASE_QUERY,
  VIDEO_SHOWCASE_CLASS_QUERY,
  STATE_CLASS,
} = homePageDom;

function pauseVideosExcept(slides, activeSlideIndex) {
  slides.forEach((slide, slideIndex) => {
    if (slideIndex === activeSlideIndex) return;
    const videoElement = slide.querySelector('video');
    if (videoElement) {
      videoElement.pause();
    }
  });
}

function initOneVideosCarousel(carouselRoot) {
  const slides = [...carouselRoot.querySelectorAll(VIDEO_SHOWCASE_QUERY.slide)];
  const dots = [...carouselRoot.querySelectorAll(VIDEO_SHOWCASE_QUERY.dot)];
  const prevBtn = carouselRoot.querySelector(VIDEO_SHOWCASE_QUERY.prev);
  const nextBtn = carouselRoot.querySelector(VIDEO_SHOWCASE_QUERY.next);
  const counterCurrent = carouselRoot.querySelector(
    VIDEO_SHOWCASE_QUERY.counterCurrent,
  );
  const counterTotal = carouselRoot.querySelector(
    VIDEO_SHOWCASE_QUERY.counterTotal,
  );
  const live = carouselRoot.querySelector(VIDEO_SHOWCASE_QUERY.live);

  if (!slides.length) return;

  let activeSlideIndex = 0;

  function announce() {
    if (!live) return;
    live.textContent = `Видео ${activeSlideIndex + 1} из ${slides.length}`;
  }

  function update() {
    slides.forEach((slide, slideIndex) => {
      const isActiveSlide = slideIndex === activeSlideIndex;
      slide.classList.toggle(STATE_CLASS.active, isActiveSlide);
      slide.setAttribute('aria-hidden', isActiveSlide ? 'false' : 'true');
    });

    dots.forEach((dot, dotIndex) => {
      const isActiveDot = dotIndex === activeSlideIndex;
      dot.classList.toggle(STATE_CLASS.active, isActiveDot);
      dot.setAttribute('aria-pressed', isActiveDot ? 'true' : 'false');
    });

    if (counterCurrent) {
      counterCurrent.textContent = String(activeSlideIndex + 1);
    }
    if (counterTotal) counterTotal.textContent = String(slides.length);

    pauseVideosExcept(slides, activeSlideIndex);
    const activeSlide = slides[activeSlideIndex];
    const lazyVideoHost = activeSlide?.querySelector(
      VIDEO_SHOWCASE_QUERY.lazyHost,
    );
    if (lazyVideoHost) {
      mountLazyVideoHost(lazyVideoHost);
    }

    announce();
  }

  function go(delta) {
    activeSlideIndex = stepCarouselIndex(
      activeSlideIndex,
      delta,
      slides.length,
    );
    update();
  }

  function goTo(targetIndex) {
    activeSlideIndex = targetIndex;
    update();
  }

  prevBtn?.addEventListener('click', () => {
    go(-1);
  });
  nextBtn?.addEventListener('click', () => {
    go(1);
  });

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener('click', () => goTo(dotIndex));
  });

  carouselRoot.addEventListener('keydown', (keyboardEvent) => {
    if (keyboardEvent.key === 'ArrowLeft') {
      keyboardEvent.preventDefault();
      go(-1);
    }
    if (keyboardEvent.key === 'ArrowRight') {
      keyboardEvent.preventDefault();
      go(1);
    }
  });

  let touchStartX = null;
  const carouselViewport = carouselRoot.querySelector(
    VIDEO_SHOWCASE_CLASS_QUERY.viewport,
  );
  carouselViewport?.addEventListener(
    'touchstart',
    (touchEvent) => {
      touchStartX = touchEvent.changedTouches[0].screenX;
    },
    { passive: true },
  );
  carouselViewport?.addEventListener(
    'touchend',
    (touchEvent) => {
      if (touchStartX == null) return;
      const horizontalDragPx =
        touchEvent.changedTouches[0].screenX - touchStartX;
      if (horizontalDragPx > CAROUSEL_SWIPE_THRESHOLD_PX) go(-1);
      if (horizontalDragPx < -CAROUSEL_SWIPE_THRESHOLD_PX) go(1);
      touchStartX = null;
    },
    { passive: true },
  );

  update();
}

export function initVideosShowcaseCarousel() {
  document
    .querySelectorAll(VIDEO_SHOWCASE_QUERY.showcaseRoot)
    .forEach((carouselRoot) => {
      initOneVideosCarousel(carouselRoot);
    });
}
