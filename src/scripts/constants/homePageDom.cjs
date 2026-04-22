'use strict';

/**
 * Canonical DOM anchors for the home page and video carousel.
 * Imported by bundled scripts (ESM → this CJS) and by Playwright (require).
 */

const SECTION_IDS = {
  services: 'desc',
  stocking: 'stocking',
  videos: 'videos',
  contacts: 'contacts',
};

/** Reusable UI state / BEM modifier class fragments (no leading dot). */
const STATE_CLASS = {
  active: 'is-active',
  loaded: 'is-loaded',
  mediaReady: 'is-media-ready',
};

/** Map region element ids (see `contacts.liquid`, `googleMapInit.js`). */
const MAP_ELEMENT = {
  shellId: 'map',
  canvasId: 'map-canvas',
  shellLoadingClass: 'map-shell--loading',
  shellReadyClass: 'map-shell--ready',
};

/**
 * `data-*` names for the videos showcase carousel (`videos.liquid`,
 * `videoShowcaseCarousel.js`).
 */
const VIDEO_SHOWCASE_DATA_ATTR = {
  showcase: 'data-videos-showcase',
  slide: 'data-videos-slide',
  dot: 'data-videos-dot',
  prev: 'data-videos-prev',
  next: 'data-videos-next',
  counterCurrent: 'data-videos-current',
  counterTotal: 'data-videos-total',
  live: 'data-videos-live',
  videoLazy: 'data-video-lazy',
  videoSkeleton: 'data-video-skeleton',
};

/** Class name fragments for videos showcase (no leading dot). */
const VIDEO_SHOWCASE_CLASS = {
  slide: 'videos-showcase__slide',
  lazyHost: 'videos-showcase__lazy-host',
  viewport: 'videos-showcase__viewport',
};

/**
 * Lazy video host (`data-video-lazy` wrapper) — attributes read in `addVideo.js`.
 */
const LAZY_VIDEO_HOST_DATA_ATTR = {
  videoUrl: 'data-video-url',
  videoPoster: 'data-video-poster',
  posterWebp: 'data-poster-webp',
  videoExtensions: 'data-video-extensions',
  videoPreload: 'data-video-preload',
};

/** `dataset` key set by `mountLazyVideoHost` (maps to `data-video-mounted`). */
const LAZY_VIDEO_HOST_DATASET = {
  videoMounted: 'videoMounted',
};

/** Stocking carousel class fragments (`stocking-with-fish-carousel.liquid`). */
const STOCKING_CAROUSEL_CLASS = {
  slide: 'stocking-carousel__slide',
  zoom: 'stocking-carousel__zoom',
};

/** Global layout / landmark class fragments. */
const LAYOUT_CLASS = {
  headerTag: 'header',
  headerBlock: 'header',
  cooperationBanner: 'cooperation-banner',
  infoBannerSection: 'section-container',
  infoBannerBlock: 'info-banner',
  heroTag: 'section',
  hero: 'hero',
  heroIntro: 'intro',
  footerTag: 'footer',
  footerSocial: 'footer-social',
};

function bracketAttribute(attrName) {
  return `[${attrName}]`;
}

const VIDEO_SHOWCASE_QUERY = {
  showcaseRoot: bracketAttribute(VIDEO_SHOWCASE_DATA_ATTR.showcase),
  slide: bracketAttribute(VIDEO_SHOWCASE_DATA_ATTR.slide),
  dot: bracketAttribute(VIDEO_SHOWCASE_DATA_ATTR.dot),
  prev: bracketAttribute(VIDEO_SHOWCASE_DATA_ATTR.prev),
  next: bracketAttribute(VIDEO_SHOWCASE_DATA_ATTR.next),
  counterCurrent: bracketAttribute(VIDEO_SHOWCASE_DATA_ATTR.counterCurrent),
  counterTotal: bracketAttribute(VIDEO_SHOWCASE_DATA_ATTR.counterTotal),
  live: bracketAttribute(VIDEO_SHOWCASE_DATA_ATTR.live),
  lazyHost: bracketAttribute(VIDEO_SHOWCASE_DATA_ATTR.videoLazy),
};

const LAZY_VIDEO_HOST_QUERY = {
  skeleton: bracketAttribute(VIDEO_SHOWCASE_DATA_ATTR.videoSkeleton),
};

const VIDEO_SHOWCASE_CLASS_QUERY = {
  viewport: `.${VIDEO_SHOWCASE_CLASS.viewport}`,
};

function idSelector(id) {
  return `#${id}`;
}

function buildStockingActiveZoomSelector() {
  return `${idSelector(SECTION_IDS.stocking)} .${STOCKING_CAROUSEL_CLASS.slide}.${STATE_CLASS.active} .${STOCKING_CAROUSEL_CLASS.zoom}`;
}

function buildHomeActiveVideoHostSelector() {
  return `${idSelector(SECTION_IDS.videos)} .${VIDEO_SHOWCASE_CLASS.slide}.${STATE_CLASS.active} .${VIDEO_SHOWCASE_CLASS.lazyHost}`;
}

/** Locator strings for Playwright `page.locator(...)`. */
const PLAYWRIGHT_HOME_LOCATORS = {
  header: `${LAYOUT_CLASS.headerTag}.${LAYOUT_CLASS.headerBlock}`,
  cooperationBanner: `.${LAYOUT_CLASS.cooperationBanner}`,
  infoBanner: `.${LAYOUT_CLASS.infoBannerSection}.${LAYOUT_CLASS.infoBannerBlock}`,
  hero: `${LAYOUT_CLASS.heroTag}.${LAYOUT_CLASS.hero}.${LAYOUT_CLASS.heroIntro}`,
  services: idSelector(SECTION_IDS.services),
  stocking: idSelector(SECTION_IDS.stocking),
  videos: idSelector(SECTION_IDS.videos),
  contacts: idSelector(SECTION_IDS.contacts),
  footer: `${LAYOUT_CLASS.footerTag}.${LAYOUT_CLASS.footerSocial}`,
  stockingActiveZoom: buildStockingActiveZoomSelector(),
};

module.exports = {
  SECTION_IDS,
  STATE_CLASS,
  MAP_ELEMENT,
  VIDEO_SHOWCASE_DATA_ATTR,
  VIDEO_SHOWCASE_CLASS,
  VIDEO_SHOWCASE_QUERY,
  VIDEO_SHOWCASE_CLASS_QUERY,
  LAZY_VIDEO_HOST_DATA_ATTR,
  LAZY_VIDEO_HOST_DATASET,
  LAZY_VIDEO_HOST_QUERY,
  STOCKING_CAROUSEL_CLASS,
  LAYOUT_CLASS,
  bracketAttribute,
  idSelector,
  buildStockingActiveZoomSelector,
  buildHomeActiveVideoHostSelector,
  PLAYWRIGHT_HOME_LOCATORS,
};
