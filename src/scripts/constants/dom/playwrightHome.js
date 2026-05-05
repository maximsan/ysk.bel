import { idSelector } from './selectorsShared.js';
import { SECTION_IDS } from './sections.js';
import { STATE_CLASS } from './state.js';
import { LAYOUT_CLASS } from './layout.js';
import { MENU_CLASS } from './menu.js';
import { STOCKING_CAROUSEL_CLASS } from './stockingCarousel.js';
import { VIDEO_SHOWCASE_CLASS } from './videoShowcase.js';

export function buildStockingActiveZoomSelector() {
  return `${idSelector(SECTION_IDS.stocking)} .${STOCKING_CAROUSEL_CLASS.slide}.${STATE_CLASS.active} .${STOCKING_CAROUSEL_CLASS.zoom}`;
}

export function buildHomeActiveVideoHostSelector() {
  return `${idSelector(SECTION_IDS.videos)} .${VIDEO_SHOWCASE_CLASS.slide}.${STATE_CLASS.active} .${VIDEO_SHOWCASE_CLASS.lazyHost}`;
}

export const PLAYWRIGHT_HOME_LOCATORS = {
  header: `${LAYOUT_CLASS.headerTag}.${LAYOUT_CLASS.headerBlock}`,
  menu: `.${MENU_CLASS.root}`,
  navbarToggler: `.${MENU_CLASS.toggler}`,
  cooperationBanner: `.${LAYOUT_CLASS.cooperationBanner}`,
  infoBanner: `.${LAYOUT_CLASS.infoBannerSection}.${LAYOUT_CLASS.infoBannerBlock}`,
  hero: `${LAYOUT_CLASS.heroTag}.${LAYOUT_CLASS.hero}.${LAYOUT_CLASS.heroIntro}`,
  /**
   * Playwright selectors run in strict mode: duplicate visible `#id`s break `page.locator`.
   * `section#services` scopes the band so it cannot clash with nested headings that reused the services id.
   */
  services: `section${idSelector(SECTION_IDS.services)}`,
  stocking: idSelector(SECTION_IDS.stocking),
  videos: idSelector(SECTION_IDS.videos),
  contacts: idSelector(SECTION_IDS.contacts),
  footer: `${LAYOUT_CLASS.footerTag}.${LAYOUT_CLASS.footerSocial}`,
  stockingActiveZoom: buildStockingActiveZoomSelector(),
};
