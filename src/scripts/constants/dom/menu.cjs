'use strict';

/** Mobile nav drawer (`sideBar.js`, `menu.liquid`). */
const MENU_CLASS = {
  root: 'menu',
  open: 'open',
  toggler: 'navbar-toggler',
  openMenuIcon: 'open-menu',
  closeMenuIcon: 'close-menu',
};

/**
 * Drawer: auto-close when these links are used.
 * Keep in sync with `menu.liquid` / `sidebar` data.
 */
const SITE_NAV_MENU_LINK_SELECTORS = [
  `a[href$='services']`,
  `a[href$='prices']`,
  `a[href$='contacts']`,
  `a[href$='map']`,
  `a[href$='packages']`,
  `a[href^='#stocking']`,
  `a[href='#videos']`,
];

module.exports = { MENU_CLASS, SITE_NAV_MENU_LINK_SELECTORS };
