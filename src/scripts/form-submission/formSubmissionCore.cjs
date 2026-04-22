'use strict';

/**
 * Pure helpers for the legacy `form-submission.js` handler (browser IIFE).
 * Kept in CommonJS so Eleventy / tooling can require it; covered by Vitest.
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
