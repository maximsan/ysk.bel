'use strict';

/** `.gform` (`initGoogleForm.js`, `modal.liquid`). */
const FORM_CLASS = {
  gform: 'gform',
  emailInvalid: 'email-invalid',
  formElements: 'form-elements',
  thankYouMessage: 'thankyou_message',
};

const FORM_FIELD_NAME = {
  honeypot: 'honeypot',
};

const FORM_DEFAULTS = {
  googleSheetName: 'responses',
  googleSendEmail: '',
};

const FORM_QUERY = {
  gform: `form.${FORM_CLASS.gform}`,
  emailInvalid: `.${FORM_CLASS.emailInvalid}`,
  formElements: `.${FORM_CLASS.formElements}`,
  thankYouMessage: `.${FORM_CLASS.thankYouMessage}`,
};

module.exports = {
  FORM_CLASS,
  FORM_FIELD_NAME,
  FORM_DEFAULTS,
  FORM_QUERY,
};
