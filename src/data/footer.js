const PHONE_WITHOUT_PLUS = '375291495989';
const PHONE_WITH_PLUS = `%2B${PHONE_WITHOUT_PLUS}`;

module.exports = {
  links: [
    {
      class: 'viber',
      href: `viber://chat/?number=${PHONE_WITH_PLUS}`,
      text: 'Viber',
      ariaLabel: 'Открыть Viber-чат с усадьбой',
    },
    {
      class: 'whatsapp',
      href: `https://wa.me/${PHONE_WITHOUT_PLUS}`,
      text: 'WhatsApp',
      ariaLabel: 'Открыть WhatsApp-чат с усадьбой',
    },
  ],
};
