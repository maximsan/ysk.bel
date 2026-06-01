import { test, expect } from '@playwright/test';
import { setupHomeVisualPage } from './support/home-snapshot-helpers.js';

/** Group G manual checklist widths — viewport chrome, first screen. */
const WIDTHS = [320, 375, 414, 768, 1024, 1280, 1440, 1920];
const HEIGHT = 900;
const COMPACT_PHONE = { width: 375, height: 667 };

test.describe('home — width pass (viewport)', () => {
  for (const width of WIDTHS) {
    test(`width ${width}px — first screen`, async ({ page }) => {
      await page.setViewportSize({ width, height: HEIGHT });
      await setupHomeVisualPage(page, {
        showHeader: true,
        showInfoBanner: false,
      });
      const documentWidth = await page.evaluate(
        () => document.documentElement.scrollWidth,
      );
      expect(documentWidth).toBeLessThanOrEqual(width);
      await expect(page).toHaveScreenshot(`home-width-${width}.png`, {
        fullPage: false,
        animations: 'disabled',
        maxDiffPixelRatio: 0.02,
      });
    });
  }

  test('compact phone 375x667 — hero actions and benefits stay above the fold', async ({
    page,
  }) => {
    await page.setViewportSize(COMPACT_PHONE);
    await setupHomeVisualPage(page, {
      showHeader: true,
      showInfoBanner: false,
    });

    const importantHeroElements = page.locator(
      '.hero__cta .cta, .hero__trust-item',
    );
    await expect(importantHeroElements).toHaveCount(5);

    const viewport = await page.evaluate(() => ({
      height: window.innerHeight,
      width: window.innerWidth,
    }));
    for (const element of await importantHeroElements.all()) {
      await expect(element).toBeVisible();
      const box = await element.boundingBox();

      expect(box).not.toBeNull();
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.y).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(viewport.width);
      expect(box.y + box.height).toBeLessThanOrEqual(viewport.height);
    }

    await expect(page).toHaveScreenshot('home-compact-phone-375x667.png', {
      fullPage: false,
      animations: 'disabled',
      maxDiffPixelRatio: 0.02,
    });
  });
});
