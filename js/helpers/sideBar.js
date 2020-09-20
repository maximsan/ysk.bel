import $ from 'jquery';

const sideBar = $('.sidebar');
const navBarToggleBtn = $('.navbar-toggler');

function openSideBar() {
    sideBar.toggleClass('open');
}

function closeSideBar() {
    sideBar.removeClass('open');
}

export function toggleSideBar() {
    navBarToggleBtn.click((e) => {
        e.preventDefault();
        openSideBar();
        $('.navbar-toggler-icon').toggleClass('hidden');
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
