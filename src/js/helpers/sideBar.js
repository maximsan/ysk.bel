import $ from 'jquery';

const sideBar = $('.sidebar');
const navBarToggleBtn = $('.navbar-toggler');
const togglerIcon = $('.navbar-toggler-icon');

function openSideBar() {
    sideBar.toggleClass('open');
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
}

function closeSideBar() {
    sideBar.removeClass('open');
    document.body.style.overflow = null;
    document.body.style.height = null;
}

export function toggleSideBar() {
    navBarToggleBtn.click((e) => {
        e.preventDefault();

        if(!togglerIcon.hasClass('hidden')) {
            openSideBar();
        } else {
            closeSideBar();
        }

        togglerIcon.toggleClass('hidden');
        $('.close-icon').toggleClass('hidden');
    });
}

export function closeSideBarOnTimeout() {
    /* close sidebar after clicking on menu point */
    $(`a[href$='services'],
    a[href$='prices'],
    a[href$='contacts'],
    a[href$='map'],
    a[href$='packages']
    `).click(() => {
        setTimeout(() => closeSideBar(), 100);
    });
}
