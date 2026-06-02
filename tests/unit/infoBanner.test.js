import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const DISMISS_COOKIE = 'info-banner=; max-age=0; Path=/';

function renderInfoBanner(variant) {
  document.body.innerHTML = `
    <button id="page-action" type="button">Page action</button>
    ${
      variant === 'modal'
        ? '<div class="overlay info-banner__overlay" data-info-banner-overlay hidden></div>'
        : ''
    }
    <section
      class="section-container info-banner info-banner--${variant}"
      data-info-banner
      data-info-banner-variant="${variant}"
      hidden
    >
      <a class="info-banner__link" href="#stocking">Stocking news</a>
      <button class="info-banner__close cross-icon" type="button">Close</button>
    </section>
  `;
}

async function setupInfoBanner(variant, { focusPageAction = false } = {}) {
  renderInfoBanner(variant);
  if (focusPageAction) {
    document.querySelector('#page-action').focus();
  }

  vi.resetModules();
  const { addInfoBanner } = await import('@scripts/helpers/infoBanner.js');
  addInfoBanner();

  return {
    banner: document.querySelector('[data-info-banner]'),
    closeButton: document.querySelector('.info-banner__close'),
    link: document.querySelector('.info-banner__link'),
    overlay: document.querySelector('[data-info-banner-overlay]'),
    pageAction: document.querySelector('#page-action'),
  };
}

function dispatchKeyboardEvent(key, { shiftKey = false } = {}) {
  const event = new KeyboardEvent('keydown', {
    bubbles: true,
    cancelable: true,
    key,
    shiftKey,
  });
  document.dispatchEvent(event);
  return event;
}

describe('infoBanner', () => {
  beforeEach(() => {
    document.cookie = DISMISS_COOKIE;
    document.body.innerHTML = '';
  });

  afterEach(() => {
    dispatchKeyboardEvent('Escape');
    document.cookie = DISMISS_COOKIE;
    document.body.innerHTML = '';
  });

  it('leaves strip keyboard navigation native and keeps Escape non-destructive', async () => {
    const { banner, closeButton, link } = await setupInfoBanner('strip');
    link.focus();

    expect(dispatchKeyboardEvent('Tab').defaultPrevented).toBe(false);
    expect(dispatchKeyboardEvent('Tab', { shiftKey: true }).defaultPrevented).toBe(
      false,
    );
    expect(dispatchKeyboardEvent('Escape').defaultPrevented).toBe(false);
    expect(banner.hidden).toBe(false);

    closeButton.click();

    expect(banner.hidden).toBe(true);
    expect(document.cookie).toContain('info-banner=false');
  });

  it('traps modal focus in both directions and dismisses on Escape', async () => {
    const { banner, closeButton, link, overlay, pageAction } =
      await setupInfoBanner('modal', { focusPageAction: true });

    expect(overlay.hidden).toBe(false);
    expect(document.activeElement).toBe(link);

    expect(dispatchKeyboardEvent('Tab', { shiftKey: true }).defaultPrevented).toBe(
      true,
    );
    expect(document.activeElement).toBe(closeButton);

    expect(dispatchKeyboardEvent('Tab').defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(link);

    expect(dispatchKeyboardEvent('Escape').defaultPrevented).toBe(true);
    expect(banner.hidden).toBe(true);
    expect(overlay.hidden).toBe(true);
    expect(document.activeElement).toBe(pageAction);
    expect(document.cookie).toContain('info-banner=false');
  });

  it('dismisses the modal when its overlay is clicked', async () => {
    const { banner, overlay } = await setupInfoBanner('modal');

    overlay.click();

    expect(banner.hidden).toBe(true);
    expect(overlay.hidden).toBe(true);
    expect(document.cookie).toContain('info-banner=false');
  });
});
