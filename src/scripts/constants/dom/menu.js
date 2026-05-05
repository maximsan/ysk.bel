export const MENU_CLASS = {
  root: 'menu',
  open: 'open',
  toggler: 'navbar-toggler',
  openMenuIcon: 'open-menu',
  closeMenuIcon: 'close-menu',
};

/**
 * Selectors for in-drawer links that should auto-close the mobile menu after navigation.
 *
 * The href suffixes must stay in sync with real routes in `menu.liquid` and the link list in `sidebar.js`
 * (same targets the user can tap from the drawer).
 */
export const SITE_NAV_MENU_LINK_SELECTORS = [
  `a[href$='services']`,
  `a[href$='prices']`,
  `a[href$='contacts']`,
  `a[href$='map']`,
  `a[href$='packages']`,
  `a[href^='#stocking']`,
  `a[href='#videos']`,
];
