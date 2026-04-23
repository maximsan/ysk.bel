'use strict';

const { idSelector } = require('./selectorsShared.cjs');
const { SECTION_IDS } = require('./sections.cjs');
const { STATE_CLASS } = require('./state.cjs');
const { LAYOUT_CLASS } = require('./layout.cjs');
const { MENU_CLASS } = require('./menu.cjs');
const { STOCKING_CAROUSEL_CLASS } = require('./stockingCarousel.cjs');
const { VIDEO_SHOWCASE_CLASS } = require('./videoShowcase.cjs');

function buildStockingActiveZoomSelector() {
  return `${idSelector(SECTION_IDS.stocking)} .${STOCKING_CAROUSEL_CLASS.slide}.${STATE_CLASS.active} .${STOCKING_CAROUSEL_CLASS.zoom}`;
}

function buildHomeActiveVideoHostSelector() {
  return `${idSelector(SECTION_IDS.videos)} .${VIDEO_SHOWCASE_CLASS.slide}.${STATE_CLASS.active} .${VIDEO_SHOWCASE_CLASS.lazyHost}`;
}

/** Locator strings for Playwright `page.locator(...)`. */
const PLAYWRIGHT_HOME_LOCATORS = {
  header: `${LAYOUT_CLASS.headerTag}.${LAYOUT_CLASS.headerBlock}`,
  menu: `.${MENU_CLASS.root}`,
  navbarToggler: `.${MENU_CLASS.toggler}`,
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
  buildStockingActiveZoomSelector,
  buildHomeActiveVideoHostSelector,
  PLAYWRIGHT_HOME_LOCATORS,
};
