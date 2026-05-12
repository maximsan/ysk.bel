/** E.164 digits only — no leading '+'; used to build messaging and tel: URLs. */
export const PHONE_DIGITS = '375291495989';
export const PHONE_DISPLAY = '+375 (29) 149 59 89';
/** HTTPS fallback for Viber; `viber://` triggers Chromium errors without a handler. */
export const VIBER_WEB_HREF = 'https://www.viber.com/download/';

export const TEL_HREF = `tel:+${PHONE_DIGITS}`;
export const WA_HREF = `https://wa.me/${PHONE_DIGITS}`;
export const VIBER_APP_HREF = `viber://chat?number=${PHONE_DIGITS}`;
