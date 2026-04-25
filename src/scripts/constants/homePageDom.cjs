'use strict';

/**
 * Barrel: re-exports all DOM / selector constants for the site.
 *
 * Definitions live in `./dom/*.cjs` by area (layout, menu, forms, gallery, …).
 * Import this file for the full API (Playwright, Vitest, bundled ESM), or
 * require a specific `./dom/<module>.cjs` to depend on one domain only.
 */

Object.assign(
  module.exports,
  require('./dom/selectorsShared.cjs'),
  require('./dom/sections.cjs'),
  require('./dom/state.cjs'),
  require('./dom/map.cjs'),
  require('./dom/layout.cjs'),
  require('./dom/menu.cjs'),
  require('./dom/infoBanner.cjs'),
  require('./dom/form.cjs'),
  require('./dom/galleryPhotoswipe.cjs'),
  require('./dom/videoShowcase.cjs'),
  require('./dom/lazyVideoHost.cjs'),
  require('./dom/stockingCarousel.cjs'),
  require('./dom/playwrightHome.cjs'),
  require('./dom/siteSelectors.cjs'),
);
