/**
 * Site footer — colophon and in-page navigation only.
 * Messenger and call CTAs live in `cooperation.js` (partnership strip) and
 * `contacts.js` / `sidebar.js`; do not duplicate them here.
 *
 * When the phone number changes, update: `cooperation.js`, `contacts.js`,
 * `sidebar.js` (not this file).
 */
module.exports = {
  brandName: 'Усадьба Серебряный Карась',
  tagline: 'Рыбалка, баня и отдых на природе',
  links: [
    {
      text: 'Контакты',
      href: '#contacts',
      ariaLabel: 'Перейти к разделу контакты',
    },
    {
      text: 'Как добраться',
      href: '#map',
      ariaLabel: 'Перейти к карте — как добраться до усадьбы',
    },
  ],
};
