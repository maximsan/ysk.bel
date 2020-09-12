//show go-up button on scroll
import $ from 'jquery';

const window = $(window);
const button = $('.scroll-up');
const body = $('html, body');

export function showScrollUpButton() {
    window.scroll(function() {
        if (
            document.body.scrollTop > 80 ||
            document.documentElement.scrollTop > 80
        ) {
            button.show();
        } else {
            button.hide();
        }
    });
}

// When the user clicks on the button, scroll to the top of the document
export function scrollUp(milliseconds) {
    button.click(function() {
        body.animate(
            {
                scrollTop: 0
            },
            milliseconds
        );
    });
}
