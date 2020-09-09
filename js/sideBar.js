import $ from 'jquery';

export function drawSidebar() {
    const house = `<span class="house-order">Заказать баню</span>`;

    const phones = `<p><a class="phone text-white decoration-none"
        href="tel:+375295695989">
    +375 (29) 569 59 89</a></p>
    <p><a class="phone text-white decoration-none"
        href="tel:+375291495989">
    +375 (29) 149 59 89</a></p>`;

    const path = `<li class="nav-item">
    <a class="nav-link" href="#map">
        Как к нам добраться?
     </a></li>`;

    const contactBtn = `<button class="contact" style="display: block"
    data-toggle="modal" data-target="#exampleModalCenter">
        Связаться со мной
    </button>`;

    const navbar = $('.navbar-nav');
    const navbarChildren = navbar.children();
    console.log(navbarChildren);
    console.log(navbar);
    const firstElem = navbarChildren.first();
    const firstElemChildren = firstElem.children();
    firstElemChildren[0].innerHTML = house;
    firstElemChildren[2].innerHTML = phones;

    navbarChildren
        .first()
        .remove();

    navbar.append(firstElem);
    navbar.append(path);
    navbar.append(contactBtn);
}

export function toggleSideBar() {
    $('.navbar-toggler').click((e) => {
        e.preventDefault();
        $('.sidebar').toggleClass('open');
        $('.navbar-toggler-icon').toggleClass('hidden');
        $('.close-icon').toggleClass('hidden');
    });
}

export function closeSideBar() {
    /* close sidebar after clicking on menu point */
    $(`a[href$='services'],
    a[href$='prices'],
    a[href$='contacts'],
    a[href$='map'],
    a[href$='packages']
    `).click(() => {
        setTimeout(() => $('.sidebar').removeClass('open'), 0);
    });
}
