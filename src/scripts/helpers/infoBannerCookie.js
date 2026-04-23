/** @param {string} cookieHeader Value of `document.cookie`. */
export function hasInfoBannerDismissCookie(cookieHeader) {
  return cookieHeader.split(';').some((part) => part.includes('info-banner='));
}

/** @param {boolean} isSecurePage Pass `window.location.protocol === 'https:'`. */
export function buildInfoBannerDismissCookie(isSecurePage) {
  const parts = [
    'info-banner=false',
    'max-age=86400',
    'Path=/',
    'SameSite=Lax',
  ];
  if (isSecurePage) {
    parts.push('Secure');
  }
  return parts.join('; ');
}
