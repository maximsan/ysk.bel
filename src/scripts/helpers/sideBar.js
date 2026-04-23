import { CSS_UTILITY_CLASS } from '../constants/dom/layout.cjs';
import { MENU_CLASS, SITE_NAV_MENU_LINK_SELECTORS } from '../constants/dom/menu.cjs';
import { SITE_SELECTORS } from '../constants/dom/siteSelectors.cjs';

const header = document.querySelector(SITE_SELECTORS.header);
const sidebar = document.querySelector(SITE_SELECTORS.menu);
const navButton = document.querySelector(SITE_SELECTORS.navbarToggler);
const sidebarOpenIcon = document.querySelector(SITE_SELECTORS.openMenu);
const sidebarCloseIcon = document.querySelector(SITE_SELECTORS.closeMenu);

const menuLinkElements = SITE_NAV_MENU_LINK_SELECTORS.map((sel) =>
  document.querySelector(sel),
);

function openSideBar() {
  if (!sidebar || !header || !sidebarOpenIcon || !sidebarCloseIcon) {
    return;
  }
  sidebar.classList.add(MENU_CLASS.open);
  document.body.style.overflow = 'hidden';
  /* Prevents background scroll on mobile when the drawer is open */
  document.body.style.position = 'fixed';

  header.style.position = 'fixed';
  header.style.inset = '0';

  sidebarOpenIcon.classList.add(CSS_UTILITY_CLASS.hidden);
  sidebarCloseIcon.classList.remove(CSS_UTILITY_CLASS.hidden);
}

function closeSideBar() {
  if (!sidebar || !header || !sidebarOpenIcon || !sidebarCloseIcon) {
    return;
  }
  sidebar.classList.remove(MENU_CLASS.open);
  document.body.style.overflow = 'auto';
  document.body.style.position = '';

  header.style.position = 'sticky';

  sidebarCloseIcon.classList.add(CSS_UTILITY_CLASS.hidden);
  sidebarOpenIcon.classList.remove(CSS_UTILITY_CLASS.hidden);
}

export function closeSideBarOnTimeout() {
  menuLinkElements.forEach((linkEl) => {
    if (!linkEl) {
      return;
    }
    linkEl.addEventListener('click', () => {
      closeSideBar();
    });
  });
}

export function toggleSideBar() {
  if (!navButton || !sidebarOpenIcon || !sidebarCloseIcon) {
    return;
  }

  navButton.addEventListener('click', (event) => {
    event.preventDefault();

    if (!sidebarOpenIcon.classList.contains(CSS_UTILITY_CLASS.hidden)) {
      openSideBar();
    } else {
      closeSideBar();
    }
  });
}
