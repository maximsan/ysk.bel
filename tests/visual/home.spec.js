const { test, expect } = require('@playwright/test');
const {
  LAYOUT,
  HOME_SELECTORS,
  homeActiveVideoHostSelector,
  BLOCKED_THIRD_PARTY_URL_GLOBS,
} = require('./constants');

const { locators, classMap, timeouts } = HOME_SELECTORS;

async function blockThirdPartyNoise(page) {
  for (const urlPattern of BLOCKED_THIRD_PARTY_URL_GLOBS) {
    await page.route(urlPattern, (interceptedRoute) =>
      interceptedRoute.abort(),
    );
  }
}

async function waitForLayout(page) {
  await page.evaluate(() => document.fonts.ready);
}

/** Wait until `document.querySelector(selector)` has `className` in classList. */
async function waitForSelectorHasClass(page, selector, className, timeoutMs) {
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
async function waitForElementIdHasClass(page, elementId, className, timeoutMs) {
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
async function waitForImagesLoaded(page, rootSelector) {
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
async function waitForStockingCarouselStable(page) {
  await waitForImagesLoaded(page, locators.stocking);
  await waitForSelectorHasClass(
    page,
    locators.stockingActiveZoom,
    classMap.stockingLoadedClass,
    timeouts.stockingCarouselReadyMs,
  );
}

/** Active slide: `<video>` mounted, first frame / poster ready (skeleton removed → `is-media-ready`). */
async function waitForVideoShowcaseReady(page) {
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
      return Boolean(
        videoElement && videoElement.readyState >= 2,
      );
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
async function waitForMapReady(page) {
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
async function dismissInfoBannerForInteraction(page) {
  await page.evaluate(() => {
    document.cookie = ['info-banner=false', 'max-age=86400', 'Path=/', 'SameSite=Lax'].join(
      '; ',
    );
    const overlay = document.querySelector('.overlay');
    if (overlay) {
      overlay.style.display = 'none';
    }
    const banner = document.querySelector('.info-banner');
    if (banner) {
      banner.classList.remove('show-banner');
      banner.classList.add('hide-banner');
      banner.style.display = 'none';
      banner.style.animation = 'none';
    }
  });
}

test.beforeEach(async ({ page }) => {
  await blockThirdPartyNoise(page);
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await waitForLayout(page);
});

test.describe('home — section screenshots', () => {
  test('header', async ({ page }) => {
    const screenshotRegion = page.locator(locators.header);
    await screenshotRegion.scrollIntoViewIfNeeded();
    await expect(screenshotRegion).toHaveScreenshot('header.png', {
      animations: 'disabled',
    });
  });

  test('header — mobile menu open', async ({ page }) => {
    const viewportWidthPx = page.viewportSize()?.width ?? 1440;
    test.skip(
      viewportWidthPx >= LAYOUT.footerMinVisibleWidthPx,
      'Hamburger / slide-out `.menu` is for widths under 768px (`_header.scss`, `_menu.scss`)',
    );

    await dismissInfoBannerForInteraction(page);

    await page.locator(locators.navbarToggler).click();
    await waitForSelectorHasClass(
      page,
      locators.menu,
      classMap.menuOpenClass,
      timeouts.menuDrawerOpenMs,
    );
    await page.waitForTimeout(timeouts.menuDrawerTransitionMs);

    const screenshotRegion = page.locator(locators.header);
    await expect(screenshotRegion).toHaveScreenshot('header-mobile-menu-open.png', {
      animations: 'disabled',
    });
  });

  test('cooperation banner', async ({ page }) => {
    const screenshotRegion = page.locator(locators.cooperationBanner);
    await screenshotRegion.scrollIntoViewIfNeeded();
    await expect(screenshotRegion).toHaveScreenshot('cooperation-banner.png', {
      animations: 'disabled',
    });
  });

  test('info banner', async ({ page }) => {
    const screenshotRegion = page.locator(locators.infoBanner);
    await screenshotRegion.scrollIntoViewIfNeeded();
    await expect(screenshotRegion).toHaveScreenshot('info-banner.png', {
      animations: 'disabled',
    });
  });

  test('hero', async ({ page }) => {
    const screenshotRegion = page.locator(locators.hero);
    await screenshotRegion.scrollIntoViewIfNeeded();
    await expect(screenshotRegion).toHaveScreenshot('hero.png', {
      animations: 'disabled',
    });
  });

  test('services', async ({ page }) => {
    const screenshotRegion = page.locator(locators.services);
    await screenshotRegion.scrollIntoViewIfNeeded();
    await waitForImagesLoaded(page, locators.services);
    await expect(screenshotRegion).toHaveScreenshot('services.png', {
      animations: 'disabled',
    });
  });

  test('stocking', async ({ page }) => {
    const screenshotRegion = page.locator(locators.stocking);
    await screenshotRegion.scrollIntoViewIfNeeded();
    await waitForStockingCarouselStable(page);
    await expect(screenshotRegion).toHaveScreenshot('stocking.png', {
      animations: 'disabled',
    });
  });

  test('videos', async ({ page }) => {
    const screenshotRegion = page.locator(locators.videos);
    await screenshotRegion.scrollIntoViewIfNeeded();
    await waitForVideoShowcaseReady(page);
    await expect(screenshotRegion).toHaveScreenshot('videos.png', {
      animations: 'disabled',
    });
  });

  test('contacts', async ({ page }) => {
    const screenshotRegion = page.locator(locators.contacts);
    await screenshotRegion.scrollIntoViewIfNeeded();
    await waitForMapReady(page);
    await expect(screenshotRegion).toHaveScreenshot('contacts.png', {
      animations: 'disabled',
    });
  });

  test('footer', async ({ page }) => {
    const viewportWidthPx = page.viewportSize()?.width ?? 1440;
    test.skip(
      viewportWidthPx < LAYOUT.footerMinVisibleWidthPx,
      '.footer-social is hidden below 768px (see _footer.scss)',
    );

    const screenshotRegion = page.locator(locators.footer);
    await screenshotRegion.scrollIntoViewIfNeeded();
    await expect(screenshotRegion).toHaveScreenshot('footer.png', {
      animations: 'disabled',
    });
  });
});
