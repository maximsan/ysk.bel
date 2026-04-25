'use strict';

const { LAYOUT_CLASS } = require('./layout.cjs');
const { MENU_CLASS } = require('./menu.cjs');
const { PLAYWRIGHT_HOME_LOCATORS } = require('./playwrightHome.cjs');

/** Document query selectors shared by layout scripts (`sideBar`, …). */
const SITE_SELECTORS = {
  header: PLAYWRIGHT_HOME_LOCATORS.header,
  menu: PLAYWRIGHT_HOME_LOCATORS.menu,
  navbarToggler: PLAYWRIGHT_HOME_LOCATORS.navbarToggler,
  openMenu: `.${MENU_CLASS.openMenuIcon}`,
  closeMenu: `.${MENU_CLASS.closeMenuIcon}`,
  overlay: `.${LAYOUT_CLASS.overlay}`,
  infoBanner: PLAYWRIGHT_HOME_LOCATORS.infoBanner,
  crossIcon: `.${LAYOUT_CLASS.crossIcon}`,
  intro: `.${LAYOUT_CLASS.heroIntro}`,
  heroScrollCue: `.${LAYOUT_CLASS.heroScrollCue}`,
};

module.exports = { SITE_SELECTORS };
