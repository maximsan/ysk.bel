'use strict';

const { bracketAttribute } = require('./selectorsShared.cjs');

const STOCKING_CAROUSEL_CLASS = {
  slide: 'stocking-carousel__slide',
  zoom: 'stocking-carousel__zoom',
  viewport: 'stocking-carousel__viewport',
  img: 'stocking-carousel__img',
};

const STOCKING_DATA_ATTR = {
  carousel: 'data-stocking-carousel',
  slide: 'data-stocking-slide',
  dot: 'data-stocking-dot',
  prev: 'data-stocking-prev',
  next: 'data-stocking-next',
  current: 'data-stocking-current',
  total: 'data-stocking-total',
  live: 'data-stocking-live',
  skeleton: 'data-stock-skeleton',
};

const STOCKING_QUERY = {
  carouselRoot: bracketAttribute(STOCKING_DATA_ATTR.carousel),
  slide: bracketAttribute(STOCKING_DATA_ATTR.slide),
  dot: bracketAttribute(STOCKING_DATA_ATTR.dot),
  prev: bracketAttribute(STOCKING_DATA_ATTR.prev),
  next: bracketAttribute(STOCKING_DATA_ATTR.next),
  counterCurrent: bracketAttribute(STOCKING_DATA_ATTR.current),
  counterTotal: bracketAttribute(STOCKING_DATA_ATTR.total),
  live: bracketAttribute(STOCKING_DATA_ATTR.live),
  skeleton: bracketAttribute(STOCKING_DATA_ATTR.skeleton),
  viewport: `.${STOCKING_CAROUSEL_CLASS.viewport}`,
  img: `.${STOCKING_CAROUSEL_CLASS.img}`,
};

module.exports = {
  STOCKING_CAROUSEL_CLASS,
  STOCKING_DATA_ATTR,
  STOCKING_QUERY,
};
