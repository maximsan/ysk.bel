const button = document.querySelector('.scroll-up');

function showScrollButton() {
    button.style.display = 'block';
}

function hideScrollButton() {
    button.style.display = 'none';
}

let lastKnownScrollTopPosition = 0;
let lastKnownElementScrollTopPosition = 0;
let lastKnownScrollHeightPosition = 0;
let ticking = false;

const TOP_OFFSET = 320;
const BOTTOM_OFFSET = 880;

export function showScrollUpButton() {
    window.addEventListener('scroll', function () {
        console.log('inside');
        lastKnownScrollTopPosition = document.body.scrollTop;
        lastKnownElementScrollTopPosition = document.documentElement.scrollTop;
        lastKnownScrollHeightPosition = document.documentElement.scrollHeight;

        if (!ticking) {
            window.requestAnimationFrame(function () {
                if (
                    (lastKnownScrollTopPosition > TOP_OFFSET ||
                        lastKnownElementScrollTopPosition > TOP_OFFSET) &&
                    lastKnownScrollHeightPosition -
                        lastKnownElementScrollTopPosition >
                        BOTTOM_OFFSET
                ) {
                    showScrollButton();
                } else {
                    hideScrollButton();
                }
                ticking = false;
            });

            ticking = true;
        }
    });
}

// When the user clicks on the button, scroll to the top of the document
export function scrollUp() {
    button.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
