const lat = 54.291652;
const lng = 27.480454;

module.exports = {
  header: 'Наш адрес:',
  region: 'Минская обл., Логойский р-н',
  address: 'д. Вепраты, ул. Тихая 3а,',
  companyName: 'ЗАО "Усадьба Серебряный Карась"',
  coordinates: {
    header: 'GPS координаты:',
    lat: `lat: ${lat}`,
    lng: `lng: ${lng}`,
  },
  contactUs: {
    header: 'Контакты:',
    phones: [
      {
        text: 'oleg-magnat@tut.by',
        href: 'mailto:oleg-magnat@tut.by',
        ariaLabel: 'Написать на email oleg-magnat@tut.by',
        operator: 'mail',
        iconUrl: 'assets/images/icons/mail.svg',
      },
      {
        text: '+375 (29) 149 59 89',
        href: 'tel:+375291495989',
        ariaLabel: 'Позвонить по номеру +375 (29) 149 59 89',
        operator: 'a1',
        iconUrl: 'assets/images/icons/a1.svg',
      },
    ],
  },
};
