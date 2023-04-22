import $ from 'jquery';

const sidebar = $('.sidebar');
const menuIconButton = $('.navbar-toggler');
const sidebarOpenIcon = $('.navbar-toggler-icon');
const sidebarCloseIcon = $('.close-icon');
const menuItemSelectors = $(`
a[href$='services'],
a[href$='prices'],
a[href$='contacts'],
a[href$='map'],
a[href$='packages']
`)

function openSideBar() {
    sidebar.addClass('open');
    document.body.style.overflow = 'hidden';

    sidebarOpenIcon.addClass('hidden');
    sidebarCloseIcon.removeClass('hidden');
}

function closeSideBar() {
    sidebar.removeClass('open');
    document.body.style.overflow = null;

    sidebarCloseIcon.addClass('hidden');
    sidebarOpenIcon.removeClass('hidden');
}

export function toggleSideBar() {
    menuIconButton.click((e) => {
        e.preventDefault();

        if(!sidebarOpenIcon.hasClass('hidden')) {
            openSideBar();
        } else {
            closeSideBar();
        }
    });
}

export function closeSideBarOnTimeout() {
    /* close sidebar after clicking on menu point */
    menuItemSelectors.click(() => {
        setTimeout(() => {
            closeSideBar()
        }, 100);
    });
}
