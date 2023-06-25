import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

export const openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
    let pswpElement = document.querySelectorAll('.pswp')[0],
        gallery,
        options,
        items;

    items = parseThumbnailElements(galleryElement);

    // define options (if needed)
    options = {
        galleryUID: galleryElement.getAttribute('data-pswp-uid'),

        getThumbBoundsFn: function (index) {
            // See Options->getThumbBoundsFn section of docs for more info
            let thumbnail = items[index].el.children[0],
                pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                rect = thumbnail.getBoundingClientRect();

            return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        },

        addCaptionHTMLFn: function (item, captionEl, isFake) {
            if (!item.title) {
                captionEl.children[0].innerText = '';
                return false;
            }
            // captionEl.children[0].innerHTML = item.title + '<br/><small>Photo: ' + item.author + '</small>';
            return true;
        },
    };

    if (fromURL) {
        if (options.galleryPIDs) {
            // parse real index when custom PIDs are used
            // https://photoswipe.com/documentation/faq.html#custom-pid-in-url
            for (let j = 0; j < items.length; j++) {
                if (items[j].pid == index) {
                    options.index = j;
                    break;
                }
            }
        } else {
            options.index = parseInt(index, 10) - 1;
        }
    } else {
        options.index = parseInt(index, 10);
    }

    // exit if index not found
    if (isNaN(options.index)) {
        return;
    }

    if (disableAnimation) {
        options.showAnimationDuration = 0;
    }

    // Pass data to PhotoSwipe and initialize it
    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);

    // see: http://photoswipe.com/documentation/responsive-images.html
    let realViewportWidth,
        useLargeImages = false,
        firstResize = true,
        imageSrcWillChange;

    gallery.listen('beforeResize', function () {
        let dpiRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
        dpiRatio = Math.min(dpiRatio, 2.5);
        realViewportWidth = gallery.viewportSize.x * dpiRatio;

        if (
            realViewportWidth >= 1200 ||
            (!gallery.likelyTouchDevice && realViewportWidth > 800) ||
            screen.width > 1200
        ) {
            if (!useLargeImages) {
                useLargeImages = true;
                imageSrcWillChange = true;
            }
        } else {
            if (useLargeImages) {
                useLargeImages = false;
                imageSrcWillChange = true;
            }
        }

        if (imageSrcWillChange && !firstResize) {
            gallery.invalidateCurrItems();
        }

        if (firstResize) {
            firstResize = false;
        }

        imageSrcWillChange = false;
    });

    gallery.listen('gettingData', function (index, item) {
        if (useLargeImages) {
            item.src = item.o.src;
            item.w = item.o.w;
            item.h = item.o.h;
        } else {
            item.src = item.m.src;
            item.w = item.m.w;
            item.h = item.m.h;
        }
    });

    gallery.init();
};

const parseThumbnailElements = function (element) {
    let thumbElements = element.childNodes,
        numNodes = thumbElements.length,
        items = [],
        el,
        childElements,
        size,
        item;

    for (let i = 0; i < numNodes; i++) {
        el = thumbElements[i];

        // include only element nodes
        if (el.nodeType !== 1) {
            continue;
        }

        childElements = el.children;

        size = el.getAttribute('data-size').split('x');

        // create slide object
        item = {
            src: el.getAttribute('href'),
            w: parseInt(size[0], 10),
            h: parseInt(size[1], 10),
            author: el.getAttribute('data-author'),
        };

        item.el = el; // save link to element for getThumbBoundsFn

        if (childElements.length > 0) {
            item.msrc = childElements[0].getAttribute('src'); // thumbnail url
            if (childElements.length > 1) {
                item.title = childElements[1].innerHTML; // caption (contents of figure)
            }
        }

        const mediumSrc = el.getAttribute('data-med');
        if (mediumSrc) {
            size = el.getAttribute('data-med-size').split('x');
            // "medium-sized" image
            item.m = {
                src: mediumSrc,
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10),
            };
        }
        // original image
        item.o = {
            src: item.src,
            w: item.w,
            h: item.h,
        };

        items.push(item);
    }

    return items;
};
