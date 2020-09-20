import $ from 'jquery';

const body = $('html, body');

export function smoothScroll(milliseconds) {
    const selector = 'a[href^="#"]';
    $(document).on('click', selector, function(event) {
        event.preventDefault();

        if (event.currentTarget.hash === '#prices') {
            body.animate(
                {
                    scrollTop: $($.attr(this, 'href')).offset().top - 200
                },
                milliseconds
            );

            return;
        }

        if (event.currentTarget.hash === '#packages' || '#services') {
            body.animate(
                {
                    scrollTop: $($.attr(this, 'href')).offset().top - 120
                },
                milliseconds
            );

            return;
        }

        body.animate(
            {
                scrollTop: $($.attr(this, 'href')).offset().top
            },
            milliseconds
        );
    });
    return false;
}
