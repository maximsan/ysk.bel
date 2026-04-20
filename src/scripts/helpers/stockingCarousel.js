function initOneStockingCarousel(root) {
  const slides = [...root.querySelectorAll('[data-stocking-slide]')];
  const dots = [...root.querySelectorAll('[data-stocking-dot]')];
  const prevBtn = root.querySelector('[data-stocking-prev]');
  const nextBtn = root.querySelector('[data-stocking-next]');
  const counterCurrent = root.querySelector('[data-stocking-current]');
  const counterTotal = root.querySelector('[data-stocking-total]');
  const live = root.querySelector('[data-stocking-live]');

  if (!slides.length) return;

  let index = 0;

  function announce() {
    if (!live) return;
    live.textContent = `Фото ${index + 1} из ${slides.length}`;
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
  const viewport = root.querySelector('.stocking-carousel__viewport');
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

export function initStockingCarousel() {
  document.querySelectorAll('[data-stocking-carousel]').forEach((root) => {
    initOneStockingCarousel(root);
  });
}

/**
 * Hides image skeleton layers after decode/load to avoid layout shift.
 */
export function initStockingImageSkeletons() {
  document.querySelectorAll('.stocking-carousel__img').forEach((img) => {
    const zoom = img.closest('.stocking-carousel__zoom');
    const skeleton = zoom?.querySelector('[data-stock-skeleton]');
    if (!zoom || !skeleton) return;

    const markLoaded = () => {
      zoom.classList.add('is-loaded');
    };

    if (img.complete && img.naturalWidth > 0) {
      markLoaded();
      return;
    }

    img.addEventListener('load', markLoaded, { once: true });
    img.addEventListener('error', markLoaded, { once: true });
  });
}
