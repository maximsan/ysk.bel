import PhotoSwipeLightbox from 'photoswipe/lightbox';

const lightbox = new PhotoSwipeLightbox({
    gallery: '.gallery',
    children: '.gallery__url',
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
                console.log('oldCaption', oldCaption);
                if (currSlideElement) {
                    const hiddenCaption = currSlideElement.querySelector('.gallery-caption__text');
                    console.log('hiddenCaption', hiddenCaption);
                    if (hiddenCaption) {
                        // get caption from element with class gallery-caption__text
                        captionHTML = hiddenCaption.innerHTML;
                    } else {
                        // get caption from alt attribute
                        captionHTML = currSlideElement.querySelector('img').getAttribute('alt');
                    }
                    caption.innerHTML = captionHTML || '';
                    console.log('caption', caption);
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
