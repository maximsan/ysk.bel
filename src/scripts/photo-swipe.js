import PhotoSwipeLightbox from 'photoswipe/lightbox';
import {
  GALLERY_SELECTORS,
  PHOTOSWIPE_CLASS,
  PHOTOSWIPE_OPTIONS,
  PHOTOSWIPE_STOCKING_CHILDREN,
  PHOTOSWIPE_UI,
} from '@constants/dom/galleryPhotoswipe.js';

const lightbox = new PhotoSwipeLightbox({
  gallery: GALLERY_SELECTORS.mainRoot,
  children: GALLERY_SELECTORS.mainChild,
  bgOpacity: PHOTOSWIPE_OPTIONS.mainBgOpacity,
  pswpModule: () => import('photoswipe'),
});

lightbox.on('uiRegister', function () {
  lightbox.pswp.ui.registerElement({
    name: PHOTOSWIPE_UI.customCaptionName,
    order: PHOTOSWIPE_OPTIONS.customCaptionOrder,
    isButton: false,
    appendTo: PHOTOSWIPE_UI.appendToRoot,
    html: '',
    onInit: (el, pswp) => {
      lightbox.pswp.on('change', () => {
        const currSlideElement = lightbox.pswp.currSlide.data.element;
        let captionHTML = '';

        const caption = document.createElement('div');
        caption.className = PHOTOSWIPE_CLASS.captionWrapper;

        const oldCaption = el.childNodes?.[0];
        if (currSlideElement) {
          const hiddenCaption = currSlideElement.querySelector(
            GALLERY_SELECTORS.captionText,
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
    name: PHOTOSWIPE_UI.bulletsIndicatorName,
    className: PHOTOSWIPE_CLASS.bulletsIndicator,
    appendTo: PHOTOSWIPE_UI.appendToWrapper,
    onInit: (el, pswp) => {
      const bullets = [];
      let bullet;
      let prevIndex = -1;

      for (let i = 0; i < pswp.getNumItems(); i += 1) {
        bullet = document.createElement('div');
        bullet.className = PHOTOSWIPE_CLASS.bullet;
        bullet.onclick = (e) => {
          pswp.goTo(bullets.indexOf(e.target));
        };
        el.appendChild(bullet);
        bullets.push(bullet);
      }

      pswp.on('change', () => {
        if (prevIndex >= 0) {
          bullets[prevIndex].classList.remove(
            PHOTOSWIPE_CLASS.bulletActiveModifier,
          );
        }
        bullets[pswp.currIndex].classList.add(
          PHOTOSWIPE_CLASS.bulletActiveModifier,
        );
        prevIndex = pswp.currIndex;
      });
    },
  });
});

lightbox.init();

document
  .querySelectorAll(GALLERY_SELECTORS.stockingHook)
  .forEach((galleryEl) => {
    const stockingPhotoSwipe = new PhotoSwipeLightbox({
      gallery: galleryEl,
      children: PHOTOSWIPE_STOCKING_CHILDREN,
      bgOpacity: PHOTOSWIPE_OPTIONS.stockingBgOpacity,
      pswpModule: () => import('photoswipe'),
    });
    stockingPhotoSwipe.init();
  });
