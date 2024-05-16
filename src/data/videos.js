module.exports = [
    {
        header: '',
        gallery: {
            items: [
                {
                    link: {
                        src: 'assets/images/man-with-fish-2/man-with-fish-1600x1200.webp',
                        width: 1600,
                        height: 1200,
                        isCropped: true,
                        target: '',
                    },
                    img: {
                        src: 'assets/images/man-with-fish-2/thumbnail-75x100.webp',
                        srcSet: ['assets/images/man-with-fish-2/thumbnail-75x100.webp'],
                        alt: 'Man with fish in hands 1',
                        caption: 'Весенний улов',
                    },
                },
                {
                    link: {
                        src: 'assets/images/man-with-fish-1/man-with-fish-1013x1800.webp',
                        width: 1013,
                        height: 1800,
                        isCropped: true,
                        target: '',
                    },
                    img: {
                        src: 'assets/images/man-with-fish-1/thumbnail-75x100.webp',
                        srcSet: ['assets/images/man-with-fish-1/thumbnail-75x100.webp'],
                        alt: 'Man with fish in hands 2',
                        caption: 'Весенний улов',
                    },
                },
            ],
            main: {
                link: {
                    src: 'assets/images/child/pike-1200x1600.webp',
                    width: 1200,
                    height: 1600,
                    isCropped: false,
                    target: '',
                },
                img: {
                    src: 'assets/images/child/pike-480x640.webp',
                    srcSet: [
                        'assets/images/child/pike-240x320.webp 240w',
                        'assets/images/child/pike-480x640.webp 480w',
                        'assets/images/child/pike-600x800.webp 600w',
                    ],
                    sizes: [
                        '(max-width: 480px) 300px',
                        '(max-width: 768px) 360px',
                        '(max-width: 992px) 360px',
                        '(max-width: 1200px) 500px',
                        '580px',
                    ],
                    alt: 'Pike as child',
                    caption: 'Крупный улов',
                },
            },
        },
    },
];
