// contactForm.addEventListener('submit', handleSubmit);

import $ from 'jquery';

const modal = document.querySelector('#exampleModalCenter');
const contactForm = document.querySelector('.contact-form');
const name = contactForm.querySelector('#name');
const email = contactForm.querySelector('#email');
const phone = contactForm.querySelector('#phone');
const message = contactForm.querySelector('#message');

export function handleSubmit(event) {
  const body = new FormData();
  body.append('Имя', name.value);
  body.append('почта', email.value);
  body.append('телефон', phone.value);
  body.append('сообщение', message.value);

  Promise.resolve(
    fetch('https://smartforms.dev/submit/5f575b80b81854118fd3d51d', {
      method: 'post',
      body,
    }),
  )
    .then((result) => {
      console.log(result);
      $(modal).modal('hide');
    })
    .catch((error) => {
      console.error(error.message);
    })
    .finally(() => {
      $(modal).modal('hide');
    });
}
