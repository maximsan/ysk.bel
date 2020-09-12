import $ from 'jquery';

export function hideElementOnClickOutside(element = '.sidebar', menuWidth = 260) {
    $(document).click((e) => {
        const mouseClickWidth = e.clientX;
        if (mouseClickWidth >= menuWidth) {
            $(element).removeClass('open');
        }
    });
}
