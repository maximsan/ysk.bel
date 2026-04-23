import PhotoSwipeLightbox from 'photoswipe/lightbox';

const lightbox = new PhotoSwipeLightbox({
  gallery: '.gallery',
  children: '.gallery__url',
  bgOpacity: 1,
  pswpModule: () => import('photoswipe'),
});

lightbox.on('uiRegister', function () {
  lightbox.pswp.ui.registerElement({
    name: 'custom-caption',
    order: 9,
    isButton: false,
    appendTo: 'root',
    html: '',
    onInit: (el, pswp) => {
      lightbox.pswp.on('change', () => {
        const currSlideElement = lightbox.pswp.currSlide.data.element;
        let captionHTML = '';

        const caption = document.createElement('div');
        caption.className = 'custom-caption__wrapper';

        const oldCaption = el.childNodes?.[0];
        if (currSlideElement) {
          const hiddenCaption = currSlideElement.querySelector(
            '.gallery-caption__text',
          );
          if (hiddenCaption) {
            captionHTML = hiddenCaption.innerHTML;
          } else {
            captionHTML = currSlideElement
              .querySelector('img')
              ?.getAttribute('alt');
          }
          caption.innerHTML = captionHTML || '';
          if (oldCaption) {
            el.replaceChild(caption, oldCaption);
          } else {
            el.appendChild(caption);
          }
        }
      });
    },
  });

  lightbox.pswp.ui.registerElement({
    name: 'bulletsIndicator',
    className: 'pswp__bullets-indicator',
    appendTo: 'wrapper',
    onInit: (el, pswp) => {
      const bullets = [];
      let bullet;
      let prevIndex = -1;

      for (let i = 0; i < pswp.getNumItems(); i++) {
        bullet = document.createElement('div');
        bullet.className = 'pswp__bullet';
        bullet.onclick = (e) => {
          pswp.goTo(bullets.indexOf(e.target));
        };
        el.appendChild(bullet);
        bullets.push(bullet);
      }

      pswp.on('change', (a) => {
        if (prevIndex >= 0) {
          bullets[prevIndex].classList.remove('pswp__bullet--active');
        }
        bullets[pswp.currIndex].classList.add('pswp__bullet--active');
        prevIndex = pswp.currIndex;
      });
    },
  });
});

lightbox.init();

document.querySelectorAll('.js-stocking-photoswipe').forEach((galleryEl) => {
  const stockingPhotoSwipe = new PhotoSwipeLightbox({
    gallery: galleryEl,
    children: 'a',
    bgOpacity: 0.92,
    pswpModule: () => import('photoswipe'),
  });
  stockingPhotoSwipe.init();
});
