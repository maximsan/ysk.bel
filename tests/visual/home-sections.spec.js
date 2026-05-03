import { test, expect } from '@playwright/test';
import {
  locators,
  classMap,
  setupHomeVisualPage,
  waitForImagesLoaded,
  waitForLayout,
  waitForLocatorSizeStable,
  waitForStockingCarouselStable,
  waitForVideoShowcaseReady,
  waitForMapReady,
} from './support/home-snapshot-helpers.js';

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
    await waitForLocatorSizeStable(mainLocator);

    await expect(mainLocator).toHaveScreenshot('main-content.png', {
      animations: 'disabled',
      mask: [page.locator(`#${classMap.mapShellId}`)],
    });
  });

  test('cooperation banner', async ({ page }) => {
    const screenshotRegion = page.locator(locators.cooperationBanner);
    await screenshotRegion.scrollIntoViewIfNeeded();
    await waitForLayout(page);
    await waitForImagesLoaded(page, locators.cooperationBanner);
    await waitForLocatorSizeStable(screenshotRegion);
    await expect(screenshotRegion).toHaveScreenshot('cooperation-banner.png', {
      animations: 'disabled',
    });
  });

  test('footer', async ({ page }) => {
    const screenshotRegion = page.locator(locators.footer);
    await screenshotRegion.scrollIntoViewIfNeeded();
    await waitForImagesLoaded(page, locators.footer);
    await waitForLocatorSizeStable(screenshotRegion);
    await expect(screenshotRegion).toHaveScreenshot('footer.png', {
      animations: 'disabled',
    });
  });
});
