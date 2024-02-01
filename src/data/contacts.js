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
        lng: `lng: ${lng}`
    },
    contacts: {
        header: 'Контакты:',
        email: 'oleg-magnat@tut.by',
        phones: {
            header: 'Телефоны для связи:',
            href1: 'tel:+375291495989',
            phone1: '+375 29 569 59 89',
            href2: 'tel:+375291495989',
            phone2: '+375 29 149 59 89'
        }
    }
};
