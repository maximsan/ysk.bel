const PHONE_WITHOUT_PLUS = '375291495989';
const PHONE_WITH_PLUS = `%2B${PHONE_WITHOUT_PLUS}`;
const USER_NAME = 'oleg_miskevich';

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
    {
      class: 'skype',
      href: `skype:${USER_NAME}?chat`,
      text: 'Skype',
      ariaLabel: 'Открыть Skype-чат с усадьбой',
    },
  ],
};
