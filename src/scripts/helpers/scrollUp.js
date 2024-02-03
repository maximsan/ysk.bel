const button = document.querySelector('.scroll-up');

function showScrollButton() {
    button.style.display = 'block';
    // overlay.style.display = 'block';
    // button.classList.remove(BANNER_CLASS.hide);
    // button.classList.add(BANNER_CLASS.show);
}

function hideScrollButton() {
    button.style.display = 'none';
    // overlay.style.display = 'none';
    // button.classList.remove(BANNER_CLASS.show);
    // button.classList.add(BANNER_CLASS.hide);
}

let lastKnownScrollTopPosition = 0;
let lastKnownElementScrollTopPosition = 0;
let lastKnownScrollHeightPosition = 0;
let ticking = false;

export function showScrollUpButton() {
    document.body.addEventListener('scroll', function() {
        console.log('inside');
        lastKnownScrollTopPosition = document.body.scrollTop;
        lastKnownElementScrollTopPosition = document.documentElement.scrollTop;
        lastKnownScrollHeightPosition = document.documentElement.scrollHeight;

        // if(!ticking) {
        //     window.requestAnimationFrame(function() {
        //         if (
        //             (lastKnownScrollTopPosition > 80 || lastKnownElementScrollTopPosition > 80) &&
        //             lastKnownScrollHeightPosition - lastKnownElementScrollTopPosition > 880
        //         ) {
        //             showScrollButton();
        //         } else {
        //             hideScrollButton();
        //         }
        //         ticking = false
        //     })
        //
        //     ticking = true;
        // }


        if (
            (lastKnownScrollTopPosition > 80 || lastKnownElementScrollTopPosition > 80) &&
            lastKnownScrollHeightPosition - lastKnownElementScrollTopPosition > 880
        ) {
            showScrollButton();
        } else {
            hideScrollButton();
        }
    });
}

// When the user clicks on the button, scroll to the top of the document
export function scrollUp() {
    button.addEventListener('click', function() {
        document.body.scrollTo({ top: 0, behavior: 'smooth' })
    });
}











