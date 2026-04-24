import * as homePageDom from '../../../src/scripts/constants/homePageDom.js';
import {
  HOME_SELECTORS,
  homeActiveVideoHostSelector,
  BLOCKED_THIRD_PARTY_URL_GLOBS,
} from '../constants.js';

const { locators, classMap, timeouts } = HOME_SELECTORS;

export async function blockThirdPartyNoise(page) {
  for (const urlPattern of BLOCKED_THIRD_PARTY_URL_GLOBS) {
    await page.route(urlPattern, (interceptedRoute) =>
      interceptedRoute.abort(),
    );
  }
}

export async function waitForLayout(page) {
  await page.evaluate(() => document.fonts.ready);
}

/** Wait until `document.querySelector(selector)` has `className` in classList. */
export async function waitForSelectorHasClass(page, selector, className, timeoutMs) {
  await page.waitForFunction(
    ([sel, cls]) => {
      const element = document.querySelector(sel);
      return Boolean(element?.classList.contains(cls));
    },
    [selector, className],
    { timeout: timeoutMs },
  );
}

/** Wait until `#elementId` has `className` in classList. */
export async function waitForElementIdHasClass(page, elementId, className, timeoutMs) {
  await page.waitForFunction(
    ([id, cls]) => {
      const element = document.getElementById(id);
      return Boolean(element?.classList.contains(cls));
    },
    [elementId, className],
    { timeout: timeoutMs },
  );
}

/** Wait for images inside a root selector so layout stops shifting (services gallery, etc.). */
export async function waitForImagesLoaded(page, rootSelector) {
  await page.evaluate(
    async ({ rootSelector: selector, perImageTimeoutMs }) => {
      const rootElement = document.querySelector(selector);
      if (!rootElement) {
        return;
      }

      const imageElements = [...rootElement.querySelectorAll('img')];
      const waitForImageLoadEventOrTimeout = (imageElement) =>
        Promise.race([
          new Promise((resolve) => {
            if (imageElement.complete) {
              resolve();
              return;
            }
            imageElement.addEventListener('load', resolve, { once: true });
            imageElement.addEventListener('error', resolve, { once: true });
          }),
          new Promise((resolve) => {
            setTimeout(resolve, perImageTimeoutMs);
          }),
        ]);
      await Promise.all(
        imageElements.map(waitForImageLoadEventOrTimeout),
      );
    },
    {
      rootSelector,
      perImageTimeoutMs: timeouts.imageLoadPerImageMs,
    },
  );
}

/** Stocking carousel: first slide eager, others lazy; skeleton hides after load (`is-loaded`). */
export async function waitForStockingCarouselStable(page) {
  await waitForImagesLoaded(page, locators.stocking);
  await waitForSelectorHasClass(
    page,
    locators.stockingActiveZoom,
    classMap.stockingLoadedClass,
    timeouts.stockingCarouselReadyMs,
  );
}

/** Active slide: `<video>` mounted, first frame / poster ready (skeleton removed → `is-media-ready`). */
export async function waitForVideoShowcaseReady(page) {
  const activeLazyVideoHostSelector = homeActiveVideoHostSelector();
  await page.waitForFunction(
    ([lazyHostSelector, mediaReadyClassName]) => {
      const lazyVideoHostElement = document.querySelector(lazyHostSelector);
      if (!lazyVideoHostElement) {
        return false;
      }
      if (lazyVideoHostElement.classList.contains(mediaReadyClassName)) {
        return true;
      }
      const videoElement = lazyVideoHostElement.querySelector('video');
      /* HAVE_METADATA (1) is enough once `is-media-ready` is driven from `loadedmetadata` in `addVideo.js`. */
      return Boolean(videoElement && videoElement.readyState >= 1);
    },
    [activeLazyVideoHostSelector, classMap.videosMediaReadyClass],
    { timeout: timeouts.videoShowcaseReadyMs },
  );

  await page.evaluate((lazyHostSelector) => {
    const lazyVideoHostElement = document.querySelector(lazyHostSelector);
    const videoElement = lazyVideoHostElement?.querySelector('video');
    if (!videoElement) {
      return;
    }
    videoElement.pause();
    try {
      videoElement.currentTime = 0;
    } catch {
      /* ignore seek errors before metadata */
    }
  }, activeLazyVideoHostSelector);
}

/** Google Maps: `idle` removes loading state → `map-shell--ready` on `#map`. */
export async function waitForMapReady(page) {
  await waitForElementIdHasClass(
    page,
    classMap.mapShellId,
    classMap.mapShellReadyClass,
    timeouts.mapReadyMs,
  );
  if (timeouts.mapTileSettleMs > 0) {
    await page.waitForTimeout(timeouts.mapTileSettleMs);
  }
}

/**
 * Info banner + full-screen `.overlay` block clicks (see `infoBanner.js`). Other
 * section tests only screenshot; this helper is for flows that must click UI
 * under the overlay. Also hides the modal so a full-viewport `header` shot
 * (menu open) does not include the centered banner.
 */
export async function dismissInfoBannerForInteraction(page) {
  const { SITE_SELECTORS, INFO_BANNER_STATE_CLASS } = homePageDom;
  await page.evaluate(
    ([overlaySelector, bannerSelector, showClass, hideClass]) => {
      document.cookie = [
        'info-banner=false',
        'max-age=86400',
        'Path=/',
        'SameSite=Lax',
      ].join('; ');
      const overlay = document.querySelector(overlaySelector);
      if (overlay) {
        overlay.style.display = 'none';
      }
      const banner = document.querySelector(bannerSelector);
      if (banner) {
        banner.classList.remove(showClass);
        banner.classList.add(hideClass);
        banner.style.display = 'none';
        banner.style.animation = 'none';
      }
    },
    [
      SITE_SELECTORS.overlay,
      SITE_SELECTORS.infoBanner,
      INFO_BANNER_STATE_CLASS.show,
      INFO_BANNER_STATE_CLASS.hide,
    ],
  );
}

export async function setupHomeVisualPage(page) {
  await blockThirdPartyNoise(page);
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await waitForLayout(page);
}

export { locators, classMap, timeouts };
