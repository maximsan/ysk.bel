/**
 * Partnership banner directly above the footer (`cooperation-banner.liquid`).
 *
 * Holds secondary CTAs (WhatsApp, Viber, phone).
 */
import {
  PHONE_DISPLAY,
  VIBER_WEB_HREF,
  WA_HREF,
  VIBER_APP_HREF,
  TEL_HREF,
} from './channels.js';

export default {
  eyebrow: 'Партнёрство',
  title: 'Усадьба ищет партнёров и инвесторов',
  lede:
    'Развиваем тёплое загородное место у воды.\n' +
    'Открыты к совместным проектам и инвестициям.',
  cta: [
    {
      variant: 'primary',
      label: 'Написать в WhatsApp',
      href: WA_HREF,
      channel: 'whatsapp',
      ariaLabel: 'Открыть WhatsApp-чат с усадьбой',
    },
    {
      variant: 'ghost',
      label: 'Написать в Viber',
      href: VIBER_WEB_HREF,
      viberAppHref: VIBER_APP_HREF,
      channel: 'viber',
      ariaLabel: 'Открыть Viber-чат с усадьбой',
      ariaLabelWeb:
        'Перейти на страницу загрузки Viber. Чат с усадьбой доступен в приложении на телефоне.',
    },
    {
      variant: 'ghost',
      label: `Позвонить · ${PHONE_DISPLAY}`,
      href: TEL_HREF,
      channel: 'tel',
      ariaLabel: `Позвонить по номеру ${PHONE_DISPLAY}`,
    },
  ],
};
