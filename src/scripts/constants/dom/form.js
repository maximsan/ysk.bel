/** `.gform` (`initGoogleForm.js`, `modal.liquid`). */
export const FORM_CLASS = {
  gform: 'gform',
  emailInvalid: 'email-invalid',
  formElements: 'form-elements',
  thankYouMessage: 'thankyou_message',
};

export const FORM_FIELD_NAME = {
  honeypot: 'honeypot',
};

export const FORM_DEFAULTS = {
  googleSheetName: 'responses',
  googleSendEmail: '',
};

export const FORM_QUERY = {
  gform: `form.${FORM_CLASS.gform}`,
  emailInvalid: `.${FORM_CLASS.emailInvalid}`,
  formElements: `.${FORM_CLASS.formElements}`,
  thankYouMessage: `.${FORM_CLASS.thankYouMessage}`,
};
