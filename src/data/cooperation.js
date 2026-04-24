/**
 * Cooperation block — B2B-полоса «усадьба ищет партнёров и инвесторов».
 *
 * Отображается у подвала (см. Group D/E плана redesign). Единый словарь CTA
 * (`src/styles/partials/_cta.scss`): один primary «Написать в WhatsApp»,
 * остальные — ghost.
 *
 * Телефон — живой `tel:` + `viber://` + `https://wa.me/…` якорь.
 * При изменении номера — обновить также `src/data/contacts.js` и `footer.js`.
 */
const PHONE_DIGITS = '375291495989';
const PHONE_DISPLAY = '+375 (29) 149 59 89';
const PHONE_HREF_WITH_PLUS = `%2B${PHONE_DIGITS}`;

module.exports = {
  eyebrow: 'Партнёрство',
  title: 'Усадьба ищет партнёров и инвесторов',
  lede:
    'Развиваем тёплое загородное место у воды. Открыты к совместным проектам,\n' +
    'инвестициям и дружеским сделкам — напишите, обсудим спокойно.',
  cta: [
    {
      variant: 'primary',
      label: 'Написать в WhatsApp',
      href: `https://api.whatsapp.com/send?phone=${PHONE_DIGITS}`,
      channel: 'whatsapp',
      ariaLabel: 'Открыть WhatsApp-чат с усадьбой',
    },
    {
      variant: 'ghost',
      label: 'Написать в Viber',
      href: `viber://chat/?number=${PHONE_HREF_WITH_PLUS}`,
      channel: 'viber',
      ariaLabel: 'Открыть Viber-чат с усадьбой',
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
