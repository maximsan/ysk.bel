const items = $('.package > .package-list > .package-list-item'); // packages
const commonSpan = `<span class="package-list-item-disc"></span>✔️</span>`;

function commonMethods() {
    addFixedHeader();
    toggleSideBar();
    redrawSidebar();
    hideElementOnClickOutside();
    closeSideBar();
}

$(function() {
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

function toggleSideBar() {
    $('.navbar-toggler').click((e) => {
        e.preventDefault();
        $('.sidebar').toggleClass('open');
    });
}

function redrawSidebar() {
    const house = `<span class="house-order">Заказать 🏠 </span>`;
    const phones = `<a class="phone text-white decoration-none"
    href="tel:+375295695989">
    <span>+375 (29) 569 59 89</span></a>
    <a class="phone text-white decoration-none"
    href="tel:+375291495989">
    <span>+375 (29) 149 59 89</span></a>`;

    var navbarChildren = $('.navbar-nav li');
    var firstElem = navbarChildren.first();
    firstElem.children()[0].innerHTML = house;
    firstElem.children()[2].innerHTML = phones;

    $('.navbar-nav li')
        .first()
        .remove();

    $('.navbar-nav').append(firstElem);

    $('.navbar-nav').append(`<li class="nav-item">
  <a class="nav-link" href="#map">
    Как к нам добраться?
  </a></li>`);
}

function closeSideBar() {
    /* close sidebar after clicking on menu point */
    $(
        `
        a[href$='services'],
        a[href$='prices'],
        a[href$='contacts'],
        a[href$='map'],
        a[href$='packages']
        `
    ).click((e) => {
        setTimeout(() => $('.sidebar').removeClass('open'), 0);
    });
}

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
        item.innerHTML = `<h3 style="text-align: center">${textItems[0]}</h3>
        <h3 style="text-align: center" class="text-danger">${textItems[1]}</h3>`;
    }
}

//show top-btn button on scroll
function scrollFunction() {
    $(window).scroll(function() {
        if (
            document.body.scrollTop > 80 ||
            document.documentElement.scrollTop > 80
        ) {
            $('.top-btn').show();
        } else {
            $('.top-btn').hide();
        }
    });
}

// When the user clicks on the button, scroll to the top of the document
function goToTopFunction(milliseconds) {
    $('.top-btn').click(function() {
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
    var $fixedElement = $('.header');
    $clone = $fixedElement.before($fixedElement.clone().addClass('fixed'));
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

// Change lat and lng
function googleMapInit() {
    var lat = {
        lat: 54.291195,
        lng: 27.477718
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: lat,
        mapTypeId: 'satellite',
        styles: [
            {
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#f5f5f5'
                    }
                ]
            },
            {
                elementType: 'labels.icon',
                stylers: [
                    {
                        visibility: 'off'
                    }
                ]
            },
            {
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#616161'
                    }
                ]
            },
            {
                elementType: 'labels.text.stroke',
                stylers: [
                    {
                        color: '#f5f5f5'
                    }
                ]
            },
            {
                featureType: 'administrative.land_parcel',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#bdbdbd'
                    }
                ]
            },
            {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#eeeeee'
                    }
                ]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#757575'
                    }
                ]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#e5e5e5'
                    }
                ]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#9e9e9e'
                    }
                ]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#ffffff'
                    }
                ]
            },
            {
                featureType: 'road.arterial',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#757575'
                    }
                ]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#dadada'
                    }
                ]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#616161'
                    }
                ]
            },
            {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#9e9e9e'
                    }
                ]
            },
            {
                featureType: 'transit.line',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#e5e5e5'
                    }
                ]
            },
            {
                featureType: 'transit.station',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#eeeeee'
                    }
                ]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#c9c9c9'
                    }
                ]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#9e9e9e'
                    }
                ]
            }
        ],
        scrollwheel: false
    });
    var marker = new google.maps.Marker({
        position: lat,
        map: map
    });
}
