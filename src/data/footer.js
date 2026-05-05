/**
 * Footer band: brand line + a few in-page anchor links.
 *
 * Do not duplicate phone/messenger CTAs here — those live in the partnership strip and contact surfaces:
 * `cooperation.js`, `contacts.js`, `sidebar.js`.
 * Phone edits belong in those files, not here.
 */
export default {
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
