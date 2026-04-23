'use strict';

/** Main gallery (`photo-swipe.js`, gallery includes). */
const GALLERY_CLASS = {
  root: 'gallery',
  url: 'gallery__url',
  captionText: 'gallery-caption__text',
};

const PHOTOSWIPE_CLASS = {
  stockingHook: 'js-stocking-photoswipe',
  captionWrapper: 'custom-caption__wrapper',
  bulletsIndicator: 'pswp__bullets-indicator',
  bullet: 'pswp__bullet',
  bulletActiveModifier: 'pswp__bullet--active',
};

const PHOTOSWIPE_OPTIONS = {
  mainBgOpacity: 1,
  stockingBgOpacity: 0.92,
  customCaptionOrder: 9,
};

const PHOTOSWIPE_UI = {
  customCaptionName: 'custom-caption',
  bulletsIndicatorName: 'bulletsIndicator',
  appendToRoot: 'root',
  appendToWrapper: 'wrapper',
};

const PHOTOSWIPE_STOCKING_CHILDREN = 'a';

const GALLERY_SELECTORS = {
  mainRoot: `.${GALLERY_CLASS.root}`,
  mainChild: `.${GALLERY_CLASS.url}`,
  captionText: `.${GALLERY_CLASS.captionText}`,
  stockingHook: `.${PHOTOSWIPE_CLASS.stockingHook}`,
};

module.exports = {
  GALLERY_CLASS,
  PHOTOSWIPE_CLASS,
  PHOTOSWIPE_OPTIONS,
  PHOTOSWIPE_UI,
  PHOTOSWIPE_STOCKING_CHILDREN,
  GALLERY_SELECTORS,
};
