/**
 * Mobile navigation drawer — open/close, scrim, scroll lock, keyboard.
 *
 * Concepts (see docs/ui-accessibility-glossary.md):
 * - Scrim: dimmed full-screen layer; tap closes menu.
 * - Scroll lock: body `position: fixed` so the page doesn’t scroll under the drawer.
 * - Scroll restore: save `scrollY`, set `body.top = -scrollY`, then `scrollTo` on close to avoid jump.
 * - aria-expanded / aria-label on the toggler for screen readers.
 */
import { CSS_UTILITY_CLASS } from '../constants/dom/layout.cjs';
import { MENU_CLASS } from '../constants/dom/menu.cjs';
import { SITE_SELECTORS } from '../constants/dom/siteSelectors.cjs';

const header = document.querySelector(SITE_SELECTORS.header);
const sidebar = document.querySelector(SITE_SELECTORS.menu);
const navButton = document.querySelector(SITE_SELECTORS.navbarToggler);
const sidebarOpenIcon = document.querySelector(SITE_SELECTORS.openMenu);
const sidebarCloseIcon = document.querySelector(SITE_SELECTORS.closeMenu);
const menuScrim = document.querySelector('[data-menu-scrim]');

let scrollLockY = 0;
let closeDelegationBound = false;
let escapeBound = false;

function setMenuButtonExpanded(isOpen) {
  if (!navButton) {
    return;
  }
  navButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  navButton.setAttribute(
    'aria-label',
    isOpen ? 'Закрыть меню' : 'Открыть меню',
  );
}

function openSideBar() {
  if (!sidebar || !header || !sidebarOpenIcon || !sidebarCloseIcon) {
    return;
  }
  // Scroll lock: remember position, fix body so background doesn’t scroll.
  scrollLockY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollLockY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';

  sidebar.classList.add(MENU_CLASS.open);
  if (menuScrim) {
    menuScrim.classList.add('menu-scrim--open');
    menuScrim.setAttribute('aria-hidden', 'false');
  }

  header.style.position = 'fixed';
  header.style.inset = '0';

  sidebarOpenIcon.classList.add(CSS_UTILITY_CLASS.hidden);
  sidebarCloseIcon.classList.remove(CSS_UTILITY_CLASS.hidden);
  setMenuButtonExpanded(true);

  if (!escapeBound) {
    escapeBound = true;
    document.addEventListener('keydown', onDocumentKeydown);
  }
}

function closeSideBar() {
  if (!sidebar || !header || !sidebarOpenIcon || !sidebarCloseIcon) {
    return;
  }
  sidebar.classList.remove(MENU_CLASS.open);
  if (menuScrim) {
    menuScrim.classList.remove('menu-scrim--open');
    menuScrim.setAttribute('aria-hidden', 'true');
  }

  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  window.scrollTo(0, scrollLockY);

  header.style.position = 'sticky';

  sidebarCloseIcon.classList.add(CSS_UTILITY_CLASS.hidden);
  sidebarOpenIcon.classList.remove(CSS_UTILITY_CLASS.hidden);
  setMenuButtonExpanded(false);

  if (escapeBound) {
    escapeBound = false;
    document.removeEventListener('keydown', onDocumentKeydown);
  }
}

function onDocumentKeydown(event) {
  if (event.key === 'Escape' && sidebar?.classList.contains(MENU_CLASS.open)) {
    event.preventDefault();
    closeSideBar();
  }
}

/** Close drawer when user follows an in-page or tel: link inside the panel. */
function onMenuLinkClick(event) {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }
  const link = target.closest('a');
  if (!link || !sidebar?.contains(link)) {
    return;
  }
  const href = link.getAttribute('href');
  if (!href) {
    return;
  }
  if (href.startsWith('#') || href.startsWith('tel:')) {
    closeSideBar();
  }
}

export function closeSideBarOnTimeout() {
  if (!sidebar || closeDelegationBound) {
    return;
  }
  closeDelegationBound = true;
  sidebar.addEventListener('click', onMenuLinkClick);
}

export function toggleSideBar() {
  if (!navButton || !sidebarOpenIcon || !sidebarCloseIcon) {
    return;
  }

  if (menuScrim) {
    menuScrim.addEventListener('click', () => {
      if (sidebar?.classList.contains(MENU_CLASS.open)) {
        closeSideBar();
      }
    });
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
