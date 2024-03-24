const sidebar = document.querySelector('.sidebar');
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
const menuItemSelectors = menuSelectors.map((selector) => document.querySelector(selector));

function openSideBar() {
    sidebar.classList.add('open');
    document.body.style.overflow = 'hidden';

    sidebarOpenIcon.classList.add('hidden');
    sidebarCloseIcon.classList.remove('hidden');
}

function closeSideBar() {
    sidebar.classList.remove('open');
    document.body.style.overflow = null;

    sidebarCloseIcon.classList.add('hidden');
    sidebarOpenIcon.classList.remove('hidden');
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
