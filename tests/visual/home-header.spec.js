import { test, expect } from '@playwright/test';
import { LAYOUT } from './constants.js';
import {
  locators,
  classMap,
  timeouts,
  setupHomeVisualPage,
  dismissInfoBannerForInteraction,
  waitForSelectorHasClass,
} from './support/home-snapshot-helpers.js';

test.beforeEach(async ({ page }) => {
  await setupHomeVisualPage(page, { showHeader: true });
});

test.describe('home — header', () => {
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
    await expect(screenshotRegion).toHaveScreenshot(
      'header-mobile-menu-open.png',
      {
        animations: 'disabled',
      },
    );
  });
});
