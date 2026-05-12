import { PHONE_DISPLAY, TEL_HREF, WA_HREF, VIBER_WEB_HREF } from './channels.js';

const lat = 54.291652;
const lng = 27.480454;

export default {
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
        icon: 'mail',
      },
      {
        text: PHONE_DISPLAY,
        href: TEL_HREF,
        ariaLabel: `Позвонить по номеру ${PHONE_DISPLAY}`,
        operator: 'a1',
        icon: 'phone',
      },
      {
        text: 'WhatsApp',
        href: WA_HREF,
        ariaLabel: 'Написать в WhatsApp',
        operator: 'whatsapp',
        svgIcon: 'whatsapp.svg',
      },
      {
        text: 'Viber',
        href: VIBER_WEB_HREF,
        ariaLabel: 'Написать в Viber',
        operator: 'viber',
        svgIcon: 'viber.svg',
      },
    ],
  },
};
