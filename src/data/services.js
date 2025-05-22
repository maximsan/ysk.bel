const services = {
  header: 'Живописный уголок природы в 40км от Минска',
  description: `Усадьба "Серебряный Карась" - это кемпинг под Минском в Логойском районе в деревне Вепраты
    (трасса Р58).
    Водоем находится в 200м от деревни. На территории усадьбы есть гостевой дом с баней, летние
    беседки и места для мангалов.
    Для гостей круглый год доступна платная рыбалка на пруду.
    Разнообразие рыбы удовлетворит интерес как начинающего, так и опытного рыбака.
    Вдали от городской суеты у вас будет возможность насладиться природой, расслабиться и приятно
    провести время с семьей и друзьями.`,
  sections: [
    {
      header: 'Рыбалка',
      side: 'left',
      id: 'services',
      isFirst: true,
      class: 'fishing',
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
          {
            link: {
              src: 'assets/images/man-with-fish-3/man-with-fish-1200x1600.webp',
              width: 1200,
              height: 1600,
              isCropped: false,
              target: '',
            },
            img: {
              src: 'assets/images/man-with-fish-3/thumbnail-75x100.webp',
              srcSet: ['assets/images/man-with-fish-3/thumbnail-75x100.webp'],
              alt: 'Man with fish in hands 3',
              caption: 'Зимняя рыбалка',
            },
          },
          {
            link: {
              src: 'https://live.staticflickr.com/65535/50365463911_4bbcc8fd21_o.jpg',
              width: 960,
              height: 1280,
              isCropped: true,
              target: '',
            },
            img: {
              src: 'https://live.staticflickr.com/65535/50365463911_178aa89654_t.jpg',
              srcSet: [
                'https://live.staticflickr.com/65535/50365463911_178aa89654_t.jpg',
              ],
              alt: 'Man with fish in hands 4',
              caption: 'Летняя рыбалка',
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
      offer: {
        items: [
          `карп&nbsp;0.5&nbsp;-&nbsp;1.0&nbsp;кг`,
          `амур&nbsp;1.0&nbsp;-&nbsp;1.2&nbsp;кг`,
          `щука&nbsp;0.2&nbsp;-&nbsp;12.5&nbsp;кг`,
          `окунь&nbsp;0.05&nbsp;-&nbsp;2.0&nbsp;кг`,
          `платва&nbsp;0.1&nbsp;-&nbsp;1.2&nbsp;кг`,
          `карась&nbsp;0.05&nbsp;-&nbsp;0.6&nbsp;кг`,
        ],
        description: `                                    Услуга платной рыбалки доступна в течение
                <span class="font-weight-bold">всего</span> года.`,
      },
    },
    {
      header: '',
      side: 'right',
      class: 'nature',
      gallery: {
        main: {
          isMain: true,
          link: {
            src: 'https://live.staticflickr.com/65535/50361180451_03092fbc9e_o.jpg',
            width: 1200,
            height: 800,
            isCropped: false,
            target: '',
          },
          img: {
            src: 'https://live.staticflickr.com/65535/50361180451_cbe9a08b71_z.jpg',
            srcSet: [
              'https://live.staticflickr.com/65535/50361180451_cbe9a08b71_n.jpg 320w',
              'https://live.staticflickr.com/65535/50361180451_cbe9a08b71_z.jpg 640w',
              'https://live.staticflickr.com/65535/50361180451_cbe9a08b71_c.jpg 800w',
            ],
            sizes: [
              '(max-width: 480px) 300px',
              '(max-width: 768px) 360px',
              '(max-width: 992px) 360px',
              '(max-width: 1200px) 500px',
              '580px',
            ],
            alt: 'view 1',
            caption: 'Вид на озеро',
          },
        },
        items: [
          {
            link: {
              src: 'https://live.staticflickr.com/65535/50360482948_ec85c0c6f7_o.jpg',
              width: 1200,
              height: 800,
              isCropped: true,
              target: '',
            },
            img: {
              src: 'https://live.staticflickr.com/65535/50360482948_ed74ebaf91_t.jpg',
              srcSet: [
                'https://live.staticflickr.com/65535/50360482948_ed74ebaf91_t.jpg',
              ],
              alt: 'view 2',
              caption: 'Вид на дамбу',
            },
          },
          {
            link: {
              src: 'https://live.staticflickr.com/65535/50361345967_aa9884bc6c_o.jpg',
              width: 1200,
              height: 800,
              isCropped: true,
              target: '',
            },
            img: {
              src: 'https://live.staticflickr.com/65535/50361345967_a8e801962a_t.jpg',
              srcSet: [
                'https://live.staticflickr.com/65535/50361345967_a8e801962a_t.jpg',
              ],
              alt: 'view',
              caption: 'Вид на дамбу',
            },
          },
          {
            link: {
              src: 'https://live.staticflickr.com/65535/50361345327_1f78975a75_o.jpg',
              width: 1200,
              height: 800,
              isCropped: false,
              target: '',
            },
            img: {
              src: 'https://live.staticflickr.com/65535/50361345327_728a825d79_t.jpg',
              srcSet: [
                'https://live.staticflickr.com/65535/50361345327_728a825d79_t.jpg',
              ],
              alt: 'forest with mushrooms',
              caption: 'Лес вокруг озера с грибами',
            },
          },
          {
            link: {
              src: 'https://live.staticflickr.com/65535/50360481958_c67586a8b6_o.jpg',
              width: 1200,
              height: 800,
              isCropped: false,
              target: '',
            },
            img: {
              src: 'https://live.staticflickr.com/65535/50360481958_c522434877_t.jpg',
              srcSet: [
                'https://live.staticflickr.com/65535/50360481958_c522434877_t.jpg',
              ],
              alt: 'sign',
              caption: 'Знак д.Вяпраты',
            },
          },
        ],
      },
      offer: {
        description: `Прекрасные виды, завораживающа тишина.
                Места для костров и мангалов.
                Чистота и порядок`,
      },
    },
    {
      header: 'Усадьба',
      side: 'left',
      class: 'bath',
      gallery: {
        items: [
          {
            link: {
              src: 'https://live.staticflickr.com/65535/50361345907_b53f9518d7_o.jpg',
              width: 1200,
              height: 800,
              isCropped: false,
              target: '',
            },
            img: {
              src: 'https://live.staticflickr.com/65535/50361345907_db88327615_t.jpg',
              srcSet: [
                'https://live.staticflickr.com/65535/50361345907_db88327615_t.jpg',
              ],
              alt: 'living room',
              caption: 'Гостинная, 1-ый этаж',
            },
          },
          {
            link: {
              src: 'https://live.staticflickr.com/65535/50361345682_c1af17c759_o.jpg',
              width: 1200,
              height: 800,
              isCropped: false,
              target: '',
            },
            img: {
              src: 'https://live.staticflickr.com/65535/50361345682_bab8504d89_t.jpg',
              srcSet: [
                'https://live.staticflickr.com/65535/50361345682_bab8504d89_t.jpg',
              ],
              alt: 'house window',
              caption: 'Спальная комната на 2-м этаже',
            },
          },
          {
            link: {
              src: 'https://live.staticflickr.com/65535/50361180181_b20ececfb3_o.jpg',
              width: 1200,
              height: 800,
              isCropped: false,
              target: '',
            },
            img: {
              src: 'https://live.staticflickr.com/65535/50361180181_e64b528883_t.jpg',
              srcSet: [
                'https://live.staticflickr.com/65535/50361180181_e64b528883_t.jpg',
              ],
              alt: 'steam room',
              caption: 'Парилка',
            },
          },
          {
            link: {
              src: 'https://live.staticflickr.com/65535/50360482768_de04358d8e_o.jpg',
              width: 1200,
              height: 800,
              isCropped: false,
              target: '',
            },
            img: {
              srcSet: [
                'https://live.staticflickr.com/65535/50360482768_f597727093_t.jpg',
              ],
              alt: 'bucket scoop',
              caption: 'Парилка',
            },
          },
        ],
        main: {
          isMain: true,
          link: {
            src: 'https://live.staticflickr.com/65535/50361180511_7b692dbf69_o.jpg',
            width: 1200,
            height: 800,
            isCropped: false,
            target: '',
          },
          img: {
            srcSet: [
              'https://live.staticflickr.com/65535/50361180511_fb25cc5c69_n.jpg 320w',
              'https://live.staticflickr.com/65535/50361180511_fb25cc5c69_z.jpg 640w',
              'https://live.staticflickr.com/65535/50361180511_fb25cc5c69_c.jpg 800w',
            ],
            sizes: [
              '(max-width: 480px) 300px',
              '(max-width: 768px) 360px',
              '(max-width: 992px) 360px',
              '(max-width: 1200px) 500px',
              '580px',
            ],
            alt: 'bath house',
            caption: 'Баня',
            caption: 'Вид на домик с баней и беседку с мангалом',
          },
        },
      },
      offer: {
        description: `Русская баня с парилкой и всеми удобствами.
                Гостиная, 2 спальни, возможность разместить до 8 человек`,
      },
    },
    {
      header: '',
      side: 'right',
      class: 'lake',
      gallery: {
        main: {
          isMain: true,
          link: {
            src: 'https://live.staticflickr.com/65535/50361180676_101392a4f4_o.jpg',
            width: 1200,
            height: 800,
            isCropped: false,
            target: '',
          },
          img: {
            srcSet: [
              'https://live.staticflickr.com/65535/50361180676_f09a8e9137_n.jpg 320w',
              'https://live.staticflickr.com/65535/50361180676_f09a8e9137_z.jpg 640w',
              'https://live.staticflickr.com/65535/50361180676_f09a8e9137_c.jpg 800w',
            ],
            sizes: [
              '(max-width: 480px) 300px',
              '(max-width: 768px) 360px',
              '(max-width: 992px) 360px',
              '(max-width: 1200px) 500px',
              '580px',
            ],
            alt: 'lake',
            caption: 'Вид на озеро',
          },
        },
        items: [
          // {
          //     link: {
          //         src: 'assets/images/outside/view-from-house-1-1200x1600.webp',
          //         width: 1200,
          //         height: 600,
          //         isCropped: false,
          //         target: '',
          //     },
          //     img: {
          //         src: 'assets/images/outside/view-from-house-1-75x100.webp',
          //         srcSet: [
          //             'assets/images/outside/view-from-house-1-75x100.webp',
          //         ],
          //         alt: 'parking',
          //         caption: 'Парковочная территория',
          //     },
          // },
          // {
          //     link: {
          //         src: 'assets/images/outside/view-from-house-2-1200x1600.webp',
          //         width: 1200,
          //         height: 600,
          //         isCropped: false,
          //         target: '',
          //     },
          //     img: {
          //         src: 'assets/images/outside/view-from-house-2-75x100.webp',
          //         srcSet: [
          //             'assets/images/outside/view-from-house-2-75x100.webp',
          //         ],
          //         alt: 'parking',
          //         caption: 'Парковочная территория',
          //     },
          // },
          {
            link: {
              src: 'https://live.staticflickr.com/65535/50361347217_5abd7e6406_o.jpg',
              width: 1200,
              height: 600,
              isCropped: false,
              target: '',
            },
            img: {
              srcSet: [
                'https://live.staticflickr.com/65535/50361347217_5582a695cb_t.jpg',
              ],
              alt: 'parking',
              caption: 'Парковочная территория',
            },
          },
          {
            link: {
              src: 'https://live.staticflickr.com/65535/50361180946_3073723418_o.jpg',
              width: 1200,
              height: 800,
              isCropped: false,
              target: '',
            },
            img: {
              srcSet: [
                'https://live.staticflickr.com/65535/50361180946_cf3549919c_t.jpg',
              ],
              alt: 'house',
              caption: 'Домик рыбака',
            },
          },
          {
            link: {
              src: 'https://live.staticflickr.com/65535/50361346522_4d5950908b_o.jpg',
              width: 1200,
              height: 800,
              isCropped: false,
              target: '',
            },
            img: {
              srcSet: [
                'https://live.staticflickr.com/65535/50361346522_8fc1134ed2_t.jpg',
              ],
              alt: 'protected area',
              caption: 'Огороженная, охраняемая территория',
            },
          },
          {
            link: {
              src: 'https://live.staticflickr.com/65535/50361181391_c5b2939eb8_o.jpg',
              width: 1200,
              height: 800,
              isCropped: false,
              target: '',
            },
            img: {
              srcSet: [
                'https://live.staticflickr.com/65535/50361181391_a96455272d_t.jpg',
              ],
              alt: 'own well',
              caption: 'Скважина с артезианской водой',
            },
          },
        ],
      },
      offer: {
        description: `Огороженная, охраняемая территория с парковкой.
                Своя скважина с артезианской водой`,
      },
    },
  ],
};

export default services;
