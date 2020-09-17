import $ from 'jquery';

const header = $('.header');
const w = $(window);
const b = $('body');

export function addFixedHeader() {
    if (!header.hasClass('just-fixed')) {
        header.addClass('just-fixed');
    }
}

export function removeFixedHeader() {
    if (header.hasClass('just-fixed')) {
        header.removeClass('just-fixed');
    }
}

export function removeFixedHeaderOnScroll() {
    const fixed = $('.fixed');
    if (fixed) {
        fixed.remove();
    }
}

export function addFixedHeaderOnScroll() {
    const clone = header.clone().addClass('fixed');
    header.before(clone);

    w.scroll(function() {
        const fromTop = w.scrollTop();
        b.toggleClass('down', fromTop > 480);
    });
}
