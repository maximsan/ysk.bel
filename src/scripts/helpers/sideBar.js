import { CSS_UTILITY_CLASS } from '@constants/dom/layout.js';
import { MENU_CLASS } from '@constants/dom/menu.js';
import { SITE_SELECTORS } from '@constants/dom/siteSelectors.js';

/**
 * Mobile drawer (`menu.liquid`): opens from the navbar toggle, locks body scroll while open.
 *
 * Scroll restore is subtle because `html` uses global smooth scrolling — see `restoreScrollPosition`.
 */
const header = document.querySelector(SITE_SELECTORS.header);
const sidebar = document.querySelector(SITE_SELECTORS.menu);
const navButton = document.querySelector(SITE_SELECTORS.navbarToggler);
const sidebarOpenIcon = document.querySelector(SITE_SELECTORS.openMenu);
const sidebarCloseIcon = document.querySelector(SITE_SELECTORS.closeMenu);
const menuScrim = document.querySelector('[data-menu-scrim]');

let scrollLockY = 0;
let closeDelegationBound = false;
let escapeBound = false;

function readScrollY() {
  return window.scrollY ?? document.documentElement.scrollTop ?? 0;
}

/**
 * Closing the drawer restores the pre-open scroll position while `html { scroll-behavior: smooth }` is active.
 *
 *   • `scroll-behavior: auto` is forced briefly so `scrollTo` snaps immediately instead of animating from y=0.
 *   • The extra `requestAnimationFrame` `scrollTo` fixes leftover layout shift after `position:fixed` is removed.
 *   • Do not use this path immediately before a `#hash` jump — use `restoreScrollPositionSyncOnly` instead so the
 *     second `scrollTo` does not fight in-page navigation (see `closeSideBarForHashLink`).
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

/**
 * Variant of `restoreScrollPosition` that omits the follow-up `requestAnimationFrame` `scrollTo`.
 * Call this when unlocking the drawer and then scrolling to `href="#…"` inside the SPA shell.
 */
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
  header.style.maxWidth = '';
  header.style.borderRadius = '';
  header.style.animation = '';
  header.style.animationTimeline = '';
  header.style.animationRange = '';

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

  /*
   * Pin the bar to the top only — `inset: 0` stretched `<header>` to the full viewport
   * and felt like a scroll jump.
   */
  header.style.position = 'fixed';
  header.style.top = '0';
  header.style.left = '0';
  header.style.right = '0';
  header.style.width = '100%';
  header.style.maxWidth = '100%';
  header.style.borderRadius = '0';
  header.style.animation = 'none';
  header.style.animationTimeline = 'auto';
  header.style.animationRange = 'normal';

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
