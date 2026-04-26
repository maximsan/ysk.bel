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

/** Where the page was scrolled when the drawer opened (visual restore on close). */
function readScrollY() {
  return window.scrollY ?? document.documentElement.scrollTop ?? 0;
}

/**
 * After removing `body { position: fixed }`, jump back to the saved Y in one shot.
 * `index.scss` sets `html { scroll-behavior: smooth !important }`, so a plain `scrollTo(x,y)`
 * animates from ~0 — feels like the page “scrolls from the top” when you only close the drawer.
 * Temporary `scroll-behavior: auto !important` on `<html>` wins for these calls only.
 *
 * The second `scrollTo` in rAF is for layout quirks after unlock — it must NOT run when we are
 * about to scroll to a `#hash` target, or it would run after that navigation and cancel it.
 */
function restoreScrollPosition() {
  const y = scrollLockY;
  const html = document.documentElement;
  html.style.setProperty('scroll-behavior', 'auto', 'important');
  window.scrollTo(0, y);
  requestAnimationFrame(() => {
    window.scrollTo(0, y);
    html.style.removeProperty('scroll-behavior');
  });
}

/** One-shot restore (no follow-up rAF) — use before programmatic in-page scroll. */
function restoreScrollPositionSyncOnly() {
  const y = scrollLockY;
  const html = document.documentElement;
  html.style.setProperty('scroll-behavior', 'auto', 'important');
  window.scrollTo(0, y);
  html.style.removeProperty('scroll-behavior');
}

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

function detachMenuListeners() {
  if (escapeBound) {
    escapeBound = false;
    document.removeEventListener('keydown', onDocumentKeydown);
  }
}

/** Close drawer UI + unlock scroll styles (shared by all close paths). */
function teardownMenuDom() {
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

  header.style.position = '';
  header.style.top = '';
  header.style.left = '';
  header.style.right = '';
  header.style.width = '';

  sidebarCloseIcon.classList.add(CSS_UTILITY_CLASS.hidden);
  sidebarOpenIcon.classList.remove(CSS_UTILITY_CLASS.hidden);
  setMenuButtonExpanded(false);
  detachMenuListeners();
}

function scrollToHashFromDrawer(href) {
  if (href === '#' || href === '#top') {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    try {
      history.replaceState(null, '', href);
    } catch {
      /* ignore */
    }
    return;
  }

  const raw = href.slice(1);
  let id;
  try {
    id = decodeURIComponent(raw);
  } catch {
    id = raw;
  }

  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ block: 'start', behavior: 'auto' });
    try {
      history.replaceState(null, '', href);
    } catch {
      /* ignore */
    }
  } else {
    window.location.hash = href;
  }
}

function openSideBar() {
  if (!sidebar || !header || !sidebarOpenIcon || !sidebarCloseIcon) {
    return;
  }
  // Scroll lock: remember position, fix body so background doesn’t scroll.
  scrollLockY = readScrollY();
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

  /* Pin the bar to the top only — `inset: 0` stretched `<header>` to full viewport and felt like a scroll jump. */
  header.style.position = 'fixed';
  header.style.top = '0';
  header.style.left = '0';
  header.style.right = '0';
  header.style.width = '100%';

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
  teardownMenuDom();
  restoreScrollPosition();
}

/** Close drawer then scroll to in-page target (avoid rAF `scrollTo(lockY)` undoing hash scroll). */
function closeSideBarForHashLink(href) {
  if (!sidebar || !header || !sidebarOpenIcon || !sidebarCloseIcon) {
    return;
  }
  teardownMenuDom();
  restoreScrollPositionSyncOnly();
  requestAnimationFrame(() => {
    scrollToHashFromDrawer(href);
  });
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
  if (href.startsWith('#')) {
    event.preventDefault();
    closeSideBarForHashLink(href);
    return;
  }
  if (href.startsWith('tel:')) {
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
