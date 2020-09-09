export function addFixedHeader() {
    $('.header').addClass('just-fixed');
}

export function addFixedHeaderOnScroll() {
    const fixedElement = $('.header');
    fixedElement.before(fixedElement.clone().addClass('fixed'));

    $(window).scroll(function() {
        const fromTop = $(window).scrollTop();
        $('body').toggleClass('down', fromTop > 480);
    });
}
