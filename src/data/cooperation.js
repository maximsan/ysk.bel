/**
 * Partnership banner directly above the footer (`cooperation-banner.liquid`).
 *
 * Holds secondary CTAs (WhatsApp, Viber, phone).
 *
 * When the phone number changes, also update:
 * `src/data/contacts.js` and `src/data/sidebar.js` so every surface stays aligned.
 */
const PHONE_DIGITS = '375291495989';
const PHONE_DISPLAY = '+375 (29) 149 59 89';
/** HTTPS only — `viber://` in the initial `href` triggers Chromium errors without a handler. */
const VIBER_WEB_HREF = 'https://www.viber.com/download/';

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
      href: `https://wa.me/${PHONE_DIGITS}`,
      channel: 'whatsapp',
      ariaLabel: 'Открыть WhatsApp-чат с усадьбой',
    },
    {
      variant: 'ghost',
      label: 'Написать в Viber',
      href: VIBER_WEB_HREF,
      /** E.164 digits only; applied to `href` on phone-class clients via `viberCooperationLink.js`. */
      viberAppHref: `viber://chat?number=${PHONE_DIGITS}`,
      channel: 'viber',
      ariaLabel: 'Открыть Viber-чат с усадьбой',
      ariaLabelWeb:
        'Перейти на страницу загрузки Viber. Чат с усадьбой доступен в приложении на телефоне.',
    },
    {
      variant: 'ghost',
      label: `Позвонить · ${PHONE_DISPLAY}`,
      href: `tel:+${PHONE_DIGITS}`,
      channel: 'tel',
      ariaLabel: `Позвонить по номеру ${PHONE_DISPLAY}`,
    },
  ],
};
