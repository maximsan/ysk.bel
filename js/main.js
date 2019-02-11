// Custom functions

$(function() {
  if ($(window).width() > 768) {
    addFixedHeaderOnScroll();
    smoothScroll(1500);
    scrollFunction();
    goToTopFunction(1000);
    enableToolTips();
  } else {
    addFixedHeader();
    toggleSideBar();
    redrawSidebar();
    closeSideBar(".sidebar");
    hideOnClickOutside(260);
    redrawContentCells();
    enableToolTips();
    redrawPackages();
  }
});

function enableToolTips() {
  $(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
  });
}

function redrawPackages() {
  var packageItems = $(".package > .package-list > .package-list-item");
  packageItems[3].innerHTML = `<span class="package-list-item-disc">✔️</span> тишина
  и незабываемые виды`
  packageItems[5].innerHTML = `<span class="package-list-item-disc">✔️</span>
  скважина с питьевой водой`;
  packageItems[7].innerHTML = `<span class="package-list-item-disc">✔️</span> аренда
  деревянной усадьбы 
  <div class="second-row">(8 спален, камин, пруд)</div>`;
  packageItems[8].innerHTML = `<span class="package-list-item-disc">✔️</span>
  экологически чистое место`;
  packageItems[10].innerHTML = `<span class="package-list-item-disc">✔️</span> рыбалка
  включена`;
  packageItems[11].innerHTML = `<span class="package-list-item-disc">✔️</span>
  прогулки по местности, <div class="second-row">фотографирование</div>`;
  packageItems[12].innerHTML = `<span class="package-list-item-disc">✔️</span> мангалы
  для шашлыков, <div class="second-row">беседки</div>`;
  packageItems[14].innerHTML = `<span class="package-list-item-disc">✔️</span>
  скважина с питьевой водой`;
}

//show top-btn button on scroll
function scrollFunction() {
  $(window).scroll(function() {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      $(".top-btn").show();
    } else {
      $(".top-btn").hide();
    }
  });
}

// When the user clicks on the button, scroll to the top of the document
function goToTopFunction(milliseconds) {
  $(".top-btn").click(function() {
    $("html, body").animate(
      {
        scrollTop: 0
      },
      milliseconds
    );
  });
}

function redrawContentCells() {
  //<div data-aos="fade-up"></div>
  var cells = $(".section-container.services .content-cell .row");
  var cellsWithImg = $(
    ".section-container.services .content-cell .content-cell-element.img"
  );
  var cellsWithText = $(
    ".section-container.services .content-cell .content-cell-element.text"
  );

  for (let i = 0; i < cells.length; i++) {
    cells[i].append(cellsWithImg[i]);
    cells[i].append(cellsWithText[i]);
  }

  //firstCell[0].dataset.aos = "fade-up";
  //console.log(firstCell[0].dataset.aos);
}

function redrawSidebar() {
  var navbarChildren = $(".navbar-nav li");
  var firstElem = navbarChildren.first();
  firstElem.children()[0].innerHTML = `<span class="house-order">Заказать 🏠 </span>`;
  firstElem.children()[2].innerHTML = `<a class="phone text-white dec-none"
                                        href="tel:+375295695989">
                                        <span>+375 (29) 569 59 89</span></a>
                                      <a class="phone text-white dec-none"
                                        href="tel:+375291495989">
                                        <span>+375 (29) 149 59 89</span></a>`;
  $(".navbar-nav li")
    .first()
    .remove();
  $(".navbar-nav").append(firstElem);

  //TODO: как к нам добраться? пункт в меню под телефонами
  $(".navbar-nav").append(`<li class="nav-item">
  <a class="nav-link" href="#map">
    Как к нам добраться?
  </a></li>`);
}

function toggleSideBar() {
  $(".navbar-toggler").click(function(e) {
    e.preventDefault(),
      $("#main-collapse").toggleClass("open"),
      $(".sidebar").toggleClass("open");
  });
}

function closeSideBar(selector) {
  //TODO: close side bar after click on menu point and reach this point
  $(
    "a[href$='services'], a[href$='prices'], a[href$='contacts'], a[href$='map'], a[href$='packages']"
  ).click(function(e) {
    $(selector).removeClass("open");
  });
}

function hideOnClickOutside(menuWidth) {
  $(document).click(function(e) {
    var mouseClickWidth = e.clientX;
    if (mouseClickWidth >= menuWidth) {
      $(".sidebar").removeClass("open");
    }
  });
}

function addFixedHeader() {
  $(".header").addClass("just-fixed");
}

//function navActivePage() {
//  $('nav li a[href=".' + location.pathname + '"]').addClass("active");
//  if (location.pathname == "/")
//    $('nav li a[href="./index.html"]').addClass("active");
//}

function addFixedHeaderOnScroll() {
  var $fixedElement = $(".header");
  $clone = $fixedElement.before($fixedElement.clone().addClass("fixed"));
  $(window).scroll(function() {
    var fromTop = $(window).scrollTop();
    $("body").toggleClass("down", fromTop > 480);
  });
}

function smoothScroll(milliseconds) {
  var selector = 'a[href^="#"]';
  $(document).on("click", selector, function(event) {
    event.preventDefault();

    if (event.currentTarget.hash === "#prices") {
      $("html, body").animate(
        {
          scrollTop: $($.attr(this, "href")).offset().top - 200
        },
        milliseconds
      );

      return;
    }

    if (event.currentTarget.hash === "#packages" || "#services") {
      $("html, body").animate(
        {
          scrollTop: $($.attr(this, "href")).offset().top - 120
        },
        milliseconds
      );

      return;
    }

    $("html, body").animate(
      {
        scrollTop: $($.attr(this, "href")).offset().top
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
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: lat,
    mapTypeId: "satellite",
    styles: [
      {
        elementType: "geometry",
        stylers: [
          {
            color: "#f5f5f5"
          }
        ]
      },
      {
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#616161"
          }
        ]
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#f5f5f5"
          }
        ]
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#bdbdbd"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
          {
            color: "#eeeeee"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#757575"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
          {
            color: "#e5e5e5"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#9e9e9e"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            color: "#ffffff"
          }
        ]
      },
      {
        featureType: "road.arterial",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#757575"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          {
            color: "#dadada"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#616161"
          }
        ]
      },
      {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#9e9e9e"
          }
        ]
      },
      {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [
          {
            color: "#e5e5e5"
          }
        ]
      },
      {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [
          {
            color: "#eeeeee"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#c9c9c9"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#9e9e9e"
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
