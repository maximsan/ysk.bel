import * as homePageDom from '@constants/homePageDom.js';
import {
  applyDisabledMotionStyle,
  blockThirdPartyRequests,
  disablePageMotion,
} from '../../support/e2e-page-setup.js';
import {
  HOME_SELECTORS,
  homeActiveVideoHostSelector,
} from '../constants.js';

const { locators, classMap, timeouts } = HOME_SELECTORS;

export async function blockThirdPartyNoise(page) {
  await blockThirdPartyRequests(page);
}

export async function waitForLayout(page) {
  await page.evaluate(() => document.fonts.ready);
}

async function dismissInfoBannerBeforePageScripts(page) {
  await page.addInitScript(() => {
    document.cookie = [
      'info-banner=false',
      'max-age=86400',
      'Path=/',
      'SameSite=Lax',
    ].join('; ');
  });
}

export async function setHomeChromeVisibility(
  page,
  { showHeader = false, showInfoBanner = false } = {},
) {
  const { SITE_SELECTORS, INFO_BANNER_STATE_CLASS } = homePageDom;
  await page.evaluate(
    ([
      headerSelector,
      overlaySelector,
      bannerSelector,
      showClass,
      hideClass,
      shouldShowHeader,
      shouldShowInfoBanner,
    ]) => {
      const headerElement = document.querySelector(headerSelector);
      if (headerElement && !shouldShowHeader) {
        headerElement.style.visibility = 'hidden';
        headerElement.style.pointerEvents = 'none';
      }

      const overlayElement = document.querySelector(overlaySelector);
      if (overlayElement && !shouldShowInfoBanner) {
        overlayElement.hidden = true;
        overlayElement.style.display = 'none';
      }

      const bannerElement = document.querySelector(bannerSelector);
      if (bannerElement && !shouldShowInfoBanner) {
        bannerElement.hidden = true;
        bannerElement.setAttribute('aria-hidden', 'true');
        bannerElement.classList.remove(showClass);
        bannerElement.classList.add(hideClass);
        bannerElement.style.display = 'none';
        bannerElement.style.animation = 'none';
      }
    },
    [
      SITE_SELECTORS.header,
      SITE_SELECTORS.overlay,
      SITE_SELECTORS.infoBanner,
      INFO_BANNER_STATE_CLASS.show,
      INFO_BANNER_STATE_CLASS.hide,
      showHeader,
      showInfoBanner,
    ],
  );
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
      await Promise.all(imageElements.map(waitForImageLoadEventOrTimeout));
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
    // Firefox mobile can expose native controls nondeterministically during
    // element screenshots. The visual baseline covers the video poster/chrome,
    // not browser-owned media controls, so hide them for stability.
    videoElement.removeAttribute('controls');
    videoElement.pause();
    try {
      videoElement.currentTime = 0;
    } catch {
      /* ignore seek errors before metadata */
    }
    // Browsers can paint different decoded frames even at currentTime=0.
    // Remove sources after readiness so the poster is the deterministic visual.
    videoElement.querySelectorAll('source').forEach((sourceElement) => {
      sourceElement.remove();
    });
    videoElement.load();
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

/** After scroll/hydration, wait until `<locator>` width×height stays fixed (rounded), then one extra paint. */
export async function waitForLocatorSizeStable(
  locator,
  {
    timeoutMs = timeouts.screenshotLayoutStableTimeoutMs,
    sampleIntervalMs = timeouts.screenshotLayoutStablePollMs,
    stableRoundsNeeded = timeouts.screenshotLayoutStableRounds,
  } = {},
) {
  const pageRef = locator.page();
  const deadline = Date.now() + timeoutMs;
  let lastKey = '';
  let stableStreak = 0;

  while (Date.now() < deadline) {
    await pageRef.evaluate(() =>
      new Promise((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(resolve));
      }),
    );

    const box = await locator.boundingBox();
    const key =
      box && box.height > 0 && box.width > 0
        ? `${Math.round(box.width)}×${Math.round(box.height)}`
        : '';

    if (key && key === lastKey) {
      stableStreak += 1;
      if (stableStreak >= stableRoundsNeeded) {
        await pageRef.evaluate(() =>
          new Promise((resolve) => {
            requestAnimationFrame(() => requestAnimationFrame(resolve));
          }),
        );
        return;
      }
    } else {
      lastKey = key;
      stableStreak = key ? 1 : 0;
    }

    await pageRef.waitForTimeout(sampleIntervalMs);
  }

  throw new Error(
    `Screenshot region size did not stabilize within ${timeoutMs}ms (last box key: "${lastKey || 'none'}")`,
  );
}

export async function setupHomeVisualPage(page, options = {}) {
  await blockThirdPartyNoise(page);
  await disablePageMotion(page);
  if (!options.showInfoBanner) {
    await dismissInfoBannerBeforePageScripts(page);
  }
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await applyDisabledMotionStyle(page);
  await setHomeChromeVisibility(page, options);
  await waitForLayout(page);
}

export { locators, classMap, timeouts };
