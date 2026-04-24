import {
  FORM_DEFAULTS,
  FORM_FIELD_NAME,
  FORM_QUERY,
} from '../constants/dom/form.js';
import { isSpamHoneypot, validEmail } from './formSubmissionCore.js';

/**
 * Google Apps Script–style `.gform` handler (see `modal.liquid`).
 * Submits `application/x-www-form-urlencoded` to `form.action`.
 */

function getFormData(form) {
  const { elements } = form;

  const fields = Object.keys(elements)
    .filter((key) => elements[key].name !== FORM_FIELD_NAME.honeypot)
    .map((key) => {
      const element = elements[key];
      if (element.name !== undefined) {
        return element.name;
      }
      if (element.length > 0) {
        return element.item(0).name;
      }
      return undefined;
    })
    .filter((item, index, self) => Boolean(item) && self.indexOf(item) === index);

  const formData = {};
  fields.forEach((name) => {
    const element = elements[name];
    formData[name] = element.value;

    if (element.length) {
      const data = [];
      for (let i = 0; i < element.length; i += 1) {
        const item = element.item(i);
        if (item.checked || item.selected) {
          data.push(item.value);
        }
      }
      formData[name] = data.join(', ');
    }
  });

  formData.formDataNameOrder = JSON.stringify(fields);
  formData.formGoogleSheetName =
    form.dataset.sheet || FORM_DEFAULTS.googleSheetName;
  formData.formGoogleSendEmail =
    form.dataset.email || FORM_DEFAULTS.googleSendEmail;

  return formData;
}

function disableAllButtons(form) {
  form.querySelectorAll('button').forEach((button) => {
    button.disabled = true;
  });
}

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const data = getFormData(form);

  if (isSpamHoneypot(data.honeypot)) {
    return false;
  }

  if (data.email && !validEmail(data.email)) {
    const invalidEmail = form.querySelector(FORM_QUERY.emailInvalid);
    if (invalidEmail) {
      invalidEmail.style.display = 'block';
      return false;
    }
  }

  disableAllButtons(form);
  const url = form.action;
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = () => {
    if (xhr.readyState !== XMLHttpRequest.DONE) {
      return;
    }
    const formElements = form.querySelector(FORM_QUERY.formElements);
    if (formElements) {
      formElements.style.display = 'none';
    }
    const thankYouMessage = form.querySelector(FORM_QUERY.thankYouMessage);
    if (thankYouMessage) {
      thankYouMessage.style.display = 'block';
    }
  };

  const encoded = Object.keys(data)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`,
    )
    .join('&');
  xhr.send(encoded);

  return undefined;
}

function bindGforms() {
  document.querySelectorAll(FORM_QUERY.gform).forEach((form) => {
    form.addEventListener('submit', handleFormSubmit, false);
  });
}

export function initGoogleFormHandlers() {
  if (document.readyState !== 'loading') {
    bindGforms();
  } else {
    document.addEventListener('DOMContentLoaded', bindGforms, false);
  }
}
