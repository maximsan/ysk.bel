import { photoswipeParseHash } from './parseHash';
import { openPhotoSwipe } from './openPhotoSwipe';

export const initPhotoSwipeFromDOM = function(gallerySelector) {
    // select all gallery elements
    const galleryElements = document.querySelectorAll(gallerySelector);
    let prevHeight = 0;
    // indent between side thumbnails
    const indent = 6;

    for (let i = 0, l = galleryElements.length; i < l; i++) {
        const gallery = galleryElements[i];
        gallery.setAttribute('data-pswp-uid', i + 1);
        gallery.onclick = onGalleryThumbNailsClick;
        // Array.from(gallery.children).forEach((galleryItem, index) => {
        //     if (index === 0) {
        //         return;
        //     }
        //
        //     const image = galleryItem.children[0];
        //     const size = image.getAttribute('data-size').split('x');
        //     const itemWidth = size[0];
        //     const itemHeight = size[1];
        //
        //     // add indent to height of item
        //     const heightIdent = Number(itemHeight) + indent;
        //     const styles = image.style;
        //     styles.width = `${itemWidth}px`;
        //     styles.height = `${itemHeight}px`;
        //
        //     const itemStyles = galleryItem.style;
        //     itemStyles.position = 'absolute';
        //     itemStyles.left = '-6.5rem';
        //     if (index > 1) {
        //         prevHeight += heightIdent;
        //         itemStyles.top = `${prevHeight}px`;
        //     }
        // });
    }

    // Parse URL and open gallery if it contains hash - #&pid=3&gid=1
    const hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
        openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
    }
};

// find nearest parent element
const closest = function closest(el, fn) {
    let element;

    if (fn(el)) {
        element = el;
    } else {
        element = closest(el.parentNode, fn);
    }

    return el && element;
};

// attach on click event to whole gallery div component
const onGalleryThumbNailsClick = function(e) {
    e.preventDefault ? e.preventDefault() : e.returnValue = false;

    // check if img item exist
    let eTarget = e.target || e.srcElement;

    // check if the closest item is <a></a> tag
    let clickedListItem = closest(eTarget, el => {
        return el.tagName === 'A';
    });

    // got out if it is not exixt
    if (!clickedListItem) {
        return;
    }

    let clickedGallery = clickedListItem.parentNode;

    let childNodes = clickedListItem.parentNode.childNodes,
        numChildNodes = childNodes.length,
        nodeIndex = 0,
        index;

    for (let i = 0; i < numChildNodes; i++) {
        // nodeType 1 - Element Node
        if (childNodes[i].nodeType !== 1) {
            continue;
        }

        if (childNodes[i] === clickedListItem) {
            index = nodeIndex;
            break;
        }

        nodeIndex++;
    }

    if (index >= 0) {
        openPhotoSwipe(index, clickedGallery);
    }

    return false;
};




