const { test, expect } = require('@playwright/test');
const { setupHomeVisualPage } = require('./support/home-snapshot-helpers.cjs');

/** Group G manual checklist widths — viewport chrome, first screen. */
const WIDTHS = [320, 375, 414, 768, 1024, 1280, 1440, 1920];
const HEIGHT = 900;

test.describe('home — width pass (viewport)', () => {
  for (const width of WIDTHS) {
    test(`width ${width}px — first screen`, async ({ page }) => {
      await page.setViewportSize({ width, height: HEIGHT });
      await setupHomeVisualPage(page, {
        showHeader: true,
        showInfoBanner: false,
      });
      await expect(page).toHaveScreenshot(`home-width-${width}.png`, {
        fullPage: false,
        animations: 'disabled',
        maxDiffPixelRatio: 0.02,
      });
    });
  }
});
