import { test, expect } from '@playwright/test';
import {
  setupHomeVisualPage,
  waitForLocatorSizeStable,
} from './support/home-snapshot-helpers.js';

test.describe('home — info banner', () => {
  test('strip announcement', async ({ page }) => {
    await setupHomeVisualPage(page, {
      showHeader: true,
      showInfoBanner: true,
    });

    const screenshotRegion = page.locator('[data-info-banner]');
    await expect(screenshotRegion).toBeVisible();
    await waitForLocatorSizeStable(screenshotRegion);
    await expect(screenshotRegion).toHaveScreenshot('info-banner-strip.png', {
      animations: 'disabled',
    });
  });
});
