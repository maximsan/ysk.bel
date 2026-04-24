'use strict';

/**
 * Pure helpers for `.gform` / Google Sheet–style posts.
 * Imported by `initGoogleForm.js` (bundle) and by Vitest via `require`.
 */

function validEmail(email) {
  const re =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(String(email || ''));
}

/** True if the honeypot field was filled (likely bot). */
function isSpamHoneypot(honeypotValue) {
  return Boolean(honeypotValue);
}

module.exports = {
  validEmail,
  isSpamHoneypot,
};
