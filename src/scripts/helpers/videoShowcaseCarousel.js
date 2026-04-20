import { mountLazyVideoHost } from './addVideo';

function pauseVideosExcept(slides, exceptIndex) {
  slides.forEach((slide, i) => {
    if (i === exceptIndex) return;
    const v = slide.querySelector('video');
    if (v) {
      v.pause();
    }
  });
}

function initOneVideosCarousel(root) {
  const slides = [...root.querySelectorAll('[data-videos-slide]')];
  const dots = [...root.querySelectorAll('[data-videos-dot]')];
  const prevBtn = root.querySelector('[data-videos-prev]');
  const nextBtn = root.querySelector('[data-videos-next]');
  const counterCurrent = root.querySelector('[data-videos-current]');
  const counterTotal = root.querySelector('[data-videos-total]');
  const live = root.querySelector('[data-videos-live]');

  if (!slides.length) return;

  let index = 0;

  function announce() {
    if (!live) return;
    live.textContent = `Видео ${index + 1} из ${slides.length}`;
  }

  function update() {
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
    });

    dots.forEach((dot, i) => {
      const active = i === index;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    if (counterCurrent) counterCurrent.textContent = String(index + 1);
    if (counterTotal) counterTotal.textContent = String(slides.length);

    pauseVideosExcept(slides, index);
    const activeSlide = slides[index];
    const host = activeSlide?.querySelector('[data-video-lazy]');
    if (host) {
      mountLazyVideoHost(host);
    }

    announce();
  }

  function go(delta) {
    index = (index + delta + slides.length) % slides.length;
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
  const viewport = root.querySelector('.videos-showcase__viewport');
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
      if (dx > 56) go(-1);
      if (dx < -56) go(1);
      touchStartX = null;
    },
    { passive: true },
  );

  update();
}

export function initVideosShowcaseCarousel() {
  document.querySelectorAll('[data-videos-showcase]').forEach((root) => {
    initOneVideosCarousel(root);
  });
}
