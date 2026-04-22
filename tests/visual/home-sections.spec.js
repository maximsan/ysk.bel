const { test, expect } = require('@playwright/test');
const { LAYOUT } = require('./constants');
const {
  locators,
  setupHomeVisualPage,
  waitForImagesLoaded,
  waitForStockingCarouselStable,
  waitForVideoShowcaseReady,
  waitForMapReady,
} = require('./support/home-snapshot-helpers.cjs');

test.beforeEach(async ({ page }) => {
  await setupHomeVisualPage(page);
});

test.describe('home — sections', () => {
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
