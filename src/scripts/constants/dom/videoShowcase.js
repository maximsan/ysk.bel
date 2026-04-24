import { bracketAttribute } from './selectorsShared.js';

/**
 * Videos showcase carousel (`videos.liquid`, `videoShowcaseCarousel.js`).
 */
export const VIDEO_SHOWCASE_DATA_ATTR = {
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

export const VIDEO_SHOWCASE_CLASS = {
  slide: 'videos-showcase__slide',
  lazyHost: 'videos-showcase__lazy-host',
  viewport: 'videos-showcase__viewport',
};

export const VIDEO_SHOWCASE_QUERY = {
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

export const VIDEO_SHOWCASE_CLASS_QUERY = {
  viewport: `.${VIDEO_SHOWCASE_CLASS.viewport}`,
};

export const LAZY_VIDEO_HOST_QUERY = {
  skeleton: bracketAttribute(VIDEO_SHOWCASE_DATA_ATTR.videoSkeleton),
};
