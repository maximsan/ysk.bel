import $ from 'jquery';

export function addFixedHeader() {
    $('.header').addClass('just-fixed');
}

export function addFixedHeaderOnScroll() {
    const fixedElement = $('.header');
    fixedElement.before(fixedElement.clone().addClass('fixed'));

    $(window).scroll(function() {
        var fromTop = $(window).scrollTop();
        $('body').toggleClass('down', fromTop > 480);
    });
}
