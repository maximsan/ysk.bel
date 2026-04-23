const header = document.querySelector('.header');
const sidebar = document.querySelector('.menu');
const navButton = document.querySelector('.navbar-toggler');
const sidebarOpenIcon = document.querySelector('.open-menu');
const sidebarCloseIcon = document.querySelector('.close-menu');

const MENU_LINK_SELECTORS = [
  `a[href$='services']`,
  `a[href$='prices']`,
  `a[href$='contacts']`,
  `a[href$='map']`,
  `a[href$='packages']`,
  `a[href^='#stocking']`,
  `a[href='#videos']`,
];

const menuLinkElements = MENU_LINK_SELECTORS.map((sel) =>
  document.querySelector(sel),
);

function openSideBar() {
  if (!sidebar || !header || !sidebarOpenIcon || !sidebarCloseIcon) {
    return;
  }
  sidebar.classList.add('open');
  document.body.style.overflow = 'hidden';
  /* Prevents background scroll on mobile when the drawer is open */
  document.body.style.position = 'fixed';

  header.style.position = 'fixed';
  header.style.inset = '0';

  sidebarOpenIcon.classList.add('hidden');
  sidebarCloseIcon.classList.remove('hidden');
}

function closeSideBar() {
  if (!sidebar || !header || !sidebarOpenIcon || !sidebarCloseIcon) {
    return;
  }
  sidebar.classList.remove('open');
  document.body.style.overflow = 'auto';
  document.body.style.position = '';

  header.style.position = 'sticky';

  sidebarCloseIcon.classList.add('hidden');
  sidebarOpenIcon.classList.remove('hidden');
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

    if (!sidebarOpenIcon.classList.contains('hidden')) {
      openSideBar();
    } else {
      closeSideBar();
    }
  });
}
