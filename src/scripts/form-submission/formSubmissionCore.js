/**
 * Pure helpers for `.gform` / Google Sheet–style posts.
 * Imported by `initGoogleForm.js` (bundle) and Vitest.
 */

export function validEmail(email) {
  const re =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(String(email || ''));
}

/** True if the honeypot field was filled (likely bot). */
export function isSpamHoneypot(honeypotValue) {
  return Boolean(honeypotValue);
}
