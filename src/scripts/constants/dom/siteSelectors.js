import { LAYOUT_CLASS } from './layout.js';
import { MENU_CLASS } from './menu.js';
import { PLAYWRIGHT_HOME_LOCATORS } from './playwrightHome.js';

export const SITE_SELECTORS = {
  header: PLAYWRIGHT_HOME_LOCATORS.header,
  menu: PLAYWRIGHT_HOME_LOCATORS.menu,
  navbarToggler: PLAYWRIGHT_HOME_LOCATORS.navbarToggler,
  openMenu: `.${MENU_CLASS.openMenuIcon}`,
  closeMenu: `.${MENU_CLASS.closeMenuIcon}`,
  scrollUp: `.${LAYOUT_CLASS.scrollUp}`,
  overlay: `.${LAYOUT_CLASS.overlay}`,
  infoBanner: PLAYWRIGHT_HOME_LOCATORS.infoBanner,
  crossIcon: `.${LAYOUT_CLASS.crossIcon}`,
  intro: `.${LAYOUT_CLASS.heroIntro}`,
};
