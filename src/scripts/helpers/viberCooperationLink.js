/**
 * Partnership strip (`cooperation-banner`): Viber’s app link is `viber://` (see `cooperation.js`).
 *
 * SSR uses an HTTPS `href` only so Chromium never requests `viber://` until we know we are on a
 * phone-class client (`userAgentData.mobile` or mobile UA substring). Desktop keeps the CDN URL;
 * mobile swaps `href` and `aria-label` from `data-*` attributes set in Liquid.
 */

function isLikelyMobileOrTabletClient() {
  if (typeof navigator.userAgentData?.mobile === 'boolean') {
    return navigator.userAgentData.mobile;
  }

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}

export function initCooperationViberDesktopFallback() {
  if (!isLikelyMobileOrTabletClient()) {
    return;
  }

  const links = document.querySelectorAll(
    'a.cooperation-banner__link--viber[data-viber-app-href]',
  );

  for (const anchor of links) {
    const appHref = anchor.dataset.viberAppHref;
    const appAria = anchor.dataset.viberAppAriaLabel;

    if (!appHref?.startsWith('viber:')) {
      continue;
    }

    anchor.href = appHref;

    if (appAria) {
      anchor.setAttribute('aria-label', appAria);
    }
  }
}
