import $ from 'jquery';
import AOS from 'aos';
import { closeSideBar, drawSidebar, toggleSideBar } from './sideBar';
import { googleMapInit } from './googleMapInit';

const items = $('.package > .package-list > .package-list-item'); // packages
const commonSpan = `<span class="package-list-item-disc"></span>✔️</span>`;

function commonMethods() {
    addFixedHeader();
    toggleSideBar();
    drawSidebar();
    hideElementOnClickOutside();
    closeSideBar();
}

$(function() {
    googleMapInit();

    if ($(window).width() >= 768) {
        addFixedHeaderOnScroll();
        smoothScroll(1500);
        scrollFunction();
        goToTopFunction(1000);
    } else if ($(window).width() > 320 && $(window).width() < 768) {
        commonMethods();
        redrawPackagesForTablets();
        redrawContentCells();
    } else {
        commonMethods();
        removePackagesDisk();
        redrawPackageHeader();
        redrawPackagesForSmallSmartphones();
    }
});

function hideElementOnClickOutside(element = '.sidebar', menuWidth = 260) {
    $(document).click((e) => {
        var mouseClickWidth = e.clientX;
        if (mouseClickWidth >= menuWidth) {
            $(element).removeClass('open');
        }
    });
}

function redrawPackagesForTablets() {
    items[3].innerHTML = `${commonSpan} тишина
  и незабываемые виды`;
    items[5].innerHTML = `${commonSpan} скважина с питьевой водой`;
    items[7].innerHTML = `${commonSpan} аренда деревянной усадьбы
  <div class="second-row">(8 спален, камин, пруд)</div>`;
    items[8].innerHTML = `${commonSpan} экологически чистое место`;
    items[10].innerHTML = `${commonSpan} рыбалка включена`;
    items[11].innerHTML = `${commonSpan} прогулки по местности, <div class="second-row">фотографирование</div>`;
    items[12].innerHTML = `${commonSpan} мангалы для шашлыков, <div class="second-row">беседки</div>`;
    items[14].innerHTML = `${commonSpan} скважина с питьевой водой`;
}

function removePackagesDisk() {
    for (let item of items) {
        const text = item.innerText;
        const contentWihoutSpan = text.substr('✔️'.length);
        item.innerHTML = contentWihoutSpan;
    }
}

function redrawPackagesForSmallSmartphones() {
    items[0].innerHTML = `рыбалка в клевом месте`;
    items[3].innerHTML = `тишина и незабываемые виды`;
    items[5].innerHTML = `скважина с питьевой водой`;
    items[7].innerHTML = `8 спальных мест, камин`;
    items[8].innerHTML = `экологически чистое место`;
    items[10].innerHTML = `рыбалка включена`;
    items[11].innerHTML = `прогулки по местности`;
    items[12].innerHTML = `мангалы и беседки`;
    items[14].innerHTML = `скважина с питьевой водой`;
}

function redrawPackageHeader() {
    const items = $('.package .package-header h3, .package .package-header h3');
    for (let item of items) {
        const text = item.innerText;
        const textItems = text.split('-');
        item.innerHTML = `<h3 style="text-align: center; margin-bottom: 0.5rem;">${textItems[0]}</h3>
        <h3 style="text-align: center" class="text-danger">${textItems[1]}</h3>`;
    }
}

//show go-up button on scroll
function scrollFunction() {
    $(window).scroll(function() {
        if (
            document.body.scrollTop > 80 ||
            document.documentElement.scrollTop > 80
        ) {
            $('.scroll-up').show();
        } else {
            $('.scroll-up').hide();
        }
    });
}

// When the user clicks on the button, scroll to the top of the document
function goToTopFunction(milliseconds) {
    $('.scroll-up').click(function() {
        $('html, body').animate(
            {
                scrollTop: 0
            },
            milliseconds
        );
    });
}

function redrawContentCells() {
    var cells = $('.section-container.services .content-cell .row');
    var cellsWithImg = $(
        '.section-container.services .content-cell .content-cell-element.img'
    );
    var cellsWithText = $(
        '.section-container.services .content-cell .content-cell-element.text'
    );

    for (let i = 0; i < cells.length; i++) {
        cells[i].append(cellsWithImg[i]);
        cells[i].append(cellsWithText[i]);
    }
}

function addFixedHeader() {
    $('.header').addClass('just-fixed');
}

function addFixedHeaderOnScroll() {
    const fixedElement = $('.header');
    fixedElement.before(fixedElement.clone().addClass('fixed'));

    $(window).scroll(function() {
        var fromTop = $(window).scrollTop();
        $('body').toggleClass('down', fromTop > 480);
    });
}

function smoothScroll(milliseconds) {
    var selector = 'a[href^="#"]';
    $(document).on('click', selector, function(event) {
        event.preventDefault();

        if (event.currentTarget.hash === '#prices') {
            $('html, body').animate(
                {
                    scrollTop: $($.attr(this, 'href')).offset().top - 200
                },
                milliseconds
            );

            return;
        }

        if (event.currentTarget.hash === '#packages' || '#services') {
            $('html, body').animate(
                {
                    scrollTop: $($.attr(this, 'href')).offset().top - 120
                },
                milliseconds
            );

            return;
        }

        $('html, body').animate(
            {
                scrollTop: $($.attr(this, 'href')).offset().top
            },
            milliseconds
        );
    });
    return false;
}

const modal = document.querySelector('#exampleModalCenter');
const contactForm = document.querySelector('.contact-form');
const name = contactForm.querySelector('#name');
const email = contactForm.querySelector('#email');
const phone = contactForm.querySelector('#phone');
const message = contactForm.querySelector('#message');

// contactForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    const body = new FormData();
    body.append('Имя', name.value);
    body.append('почта', email.value);
    body.append('телефон', phone.value);
    body.append('сообщение', message.value);

    Promise.resolve(fetch('https://smartforms.dev/submit/5f575b80b81854118fd3d51d', {
        method: 'post',
        body
    })).then((result) => {
        console.log(result);
        $(modal).modal('hide');
    }).catch((error) => {
        console.error(error.message);
    }).finally(() => {
        $(modal).modal('hide');
    });
}

$('.carousel').carousel({
    interval: 4000
});

AOS.init({
    disable: 'mobile'
});
AOS.refresh();
