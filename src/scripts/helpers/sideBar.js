const header = document.querySelector('.header');
const sidebar = document.querySelector('.menu');
const navButton = document.querySelector('.navbar-toggler');
const sidebarOpenIcon = document.querySelector('.open-menu');
const sidebarCloseIcon = document.querySelector('.close-menu');
const menuSelectors = [
  `a[href$='services']`,
  `a[href$='prices']`,
  `a[href$='contacts']`,
  `a[href$='map']`,
  `a[href$='packages']`,
];
const menuItemSelectors = menuSelectors.map((selector) =>
  document.querySelector(selector),
);

function openSideBar() {
  sidebar.classList.add('open');
  document.body.style.overflow = 'hidden';
  // this prevents scrolling om mobile devices
  document.body.style.position = 'fixed';

  header.style.position = 'fixed';
  header.style.inset = '0';

  sidebarOpenIcon.classList.add('hidden');
  sidebarCloseIcon.classList.remove('hidden');
}

function closeSideBar() {
  sidebar.classList.remove('open');
  document.body.style.overflow = 'auto';
  document.body.style.position = '';

  header.style.position = 'sticky';

  sidebarCloseIcon.classList.add('hidden');
  sidebarOpenIcon.classList.remove('hidden');
}

export function closeSideBarOnTimeout() {
  /* close sidebar after clicking on menu point */
  menuItemSelectors.forEach((selector) => {
    if (!selector) {
      return;
    }
    selector.addEventListener('click', function () {
      closeSideBar();
    });
  });
}

export function toggleSideBar() {
  navButton.addEventListener('click', function (event) {
    event.preventDefault();

    if (!sidebarOpenIcon.classList.contains('hidden')) {
      openSideBar();
    } else {
      closeSideBar();
    }
  });
}
