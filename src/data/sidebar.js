import { PHONE_DISPLAY, TEL_HREF } from './channels.js';

export default {
  menus: [
    {
      text: PHONE_DISPLAY,
      href: TEL_HREF,
      ariaLabel: `Позвонить по номеру ${PHONE_DISPLAY}`,
      type: 'phone',
      showOnlyOn: 'desktop',
    },
    {
      text: 'Цены',
      href: '#prices',
      type: 'link',
    },
    {
      text: 'Услуги',
      href: '#services',
      type: 'link',
    },
    {
      text: 'Зарыбление',
      href: '#stocking',
      type: 'link',
    },
    {
      text: 'Видео',
      href: '#videos',
      type: 'link',
    },
    {
      text: 'Контакты',
      href: '#contacts',
      type: 'link',
    },

    {
      text: PHONE_DISPLAY,
      href: TEL_HREF,
      ariaLabel: `Позвонить по номеру ${PHONE_DISPLAY}`,
      type: 'phone',
      showOnlyOn: 'mobile',
    },
    {
      text: 'Как к нам добраться?',
      href: '#map',
      type: 'link',
      showOnlyOn: 'mobile',
    },
  ],
  cta: {
    text: 'Заказать баню',
  },
  author: {
    co: '© Усадьба Серебряный Карась',
    by: 'by @maximsan',
  },
};
