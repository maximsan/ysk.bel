import $ from 'jquery';

const sideBar = $('.sidebar');
const navBarToggleBtn = $('.navbar-toggler');
const navbar = $('.navbar-nav');

const orderBathhouse = `<span class="house-order">Заказать баню</span>`;

const phones = `<p><a class="phone text-white decoration-none"
        href="tel:+375295695989">
    +375 (29) 569 59 89</a></p>
    <p><a class="phone text-white decoration-none"
        href="tel:+375291495989">
    +375 (29) 149 59 89</a></p>`;

const weOnMap = `<li class="nav-item">
    <a class="nav-link" href="#map">
        Как к нам добраться?
     </a></li>`;

const contactBtn = `<button class="contact" style="display: block"
    data-toggle="modal" data-target="#exampleModalCenter">
        Связаться со мной
    </button>`;

export function drawSidebar() {
    const navbarChildren = navbar.children();

    console.log(navbarChildren);
    console.log(navbar);

    const firstElement = navbarChildren.first();
    const firstElemChildren = firstElement.children();
    firstElemChildren[0].innerHTML = orderBathhouse;
    firstElemChildren[1].innerHTML = phones;

    navbarChildren
        .first()
        .remove();

    navbar.append(firstElement);
    navbar.append(weOnMap);
    navbar.append(contactBtn);
}

function openSideBar () {
    sideBar.toggleClass('open');
}

function closeSideBar () {
    sideBar.removeClass('open')
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
        setTimeout(() => closeSideBar(), 0);
    });
}
