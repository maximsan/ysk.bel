'use strict';

/**
 * Lazy video host attributes (`addVideo.js`, videos showcase liquid).
 */
const LAZY_VIDEO_HOST_DATA_ATTR = {
  videoUrl: 'data-video-url',
  videoPoster: 'data-video-poster',
  posterWebp: 'data-poster-webp',
  videoExtensions: 'data-video-extensions',
  videoPreload: 'data-video-preload',
};

/** `dataset` key from `mountLazyVideoHost` → `data-video-mounted`. */
const LAZY_VIDEO_HOST_DATASET = {
  videoMounted: 'videoMounted',
};

module.exports = {
  LAZY_VIDEO_HOST_DATA_ATTR,
  LAZY_VIDEO_HOST_DATASET,
};
