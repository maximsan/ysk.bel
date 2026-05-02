const { test, expect } = require('@playwright/test');
const {
  locators,
  classMap,
  setupHomeVisualPage,
  waitForImagesLoaded,
  waitForStockingCarouselStable,
  waitForVideoShowcaseReady,
  waitForMapReady,
} = require('./support/home-snapshot-helpers.cjs');

test.beforeEach(async ({ page }) => {
  await setupHomeVisualPage(page, { showInfoBanner: false });
});

test.describe('home — consolidated sections', () => {
  test('main column (hero through contacts)', async ({ page }) => {
    test.setTimeout(90_000);
    const mainLocator = page.locator('main');

    await page.locator(locators.services).scrollIntoViewIfNeeded();
    await waitForImagesLoaded(page, locators.services);
    await page.locator(locators.stocking).scrollIntoViewIfNeeded();
    await waitForStockingCarouselStable(page);
    await page.locator(locators.videos).scrollIntoViewIfNeeded();
    await waitForVideoShowcaseReady(page);
    await page.locator(locators.contacts).scrollIntoViewIfNeeded();
    await waitForMapReady(page);

    await expect(mainLocator).toHaveScreenshot('main-content.png', {
      animations: 'disabled',
      maxDiffPixelRatio: 0.02,
      mask: [page.locator(`#${classMap.mapShellId}`)],
    });
  });

  test('cooperation banner', async ({ page }) => {
    const screenshotRegion = page.locator(locators.cooperationBanner);
    await screenshotRegion.scrollIntoViewIfNeeded();
    await expect(screenshotRegion).toHaveScreenshot('cooperation-banner.png', {
      animations: 'disabled',
    });
  });

  test('footer', async ({ page }) => {
    const screenshotRegion = page.locator(locators.footer);
    await screenshotRegion.scrollIntoViewIfNeeded();
    await expect(screenshotRegion).toHaveScreenshot('footer.png', {
      animations: 'disabled',
    });
  });
});
