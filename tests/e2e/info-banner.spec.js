import { test, expect } from '@playwright/test';
import {
  applyDisabledMotionStyle,
  blockThirdPartyRequests,
  disablePageMotion,
} from '../support/e2e-page-setup.js';

test.describe('Info banner (built site)', () => {
  test.beforeEach(async ({ context, page }) => {
    await context.clearCookies();
    await blockThirdPartyRequests(page);
    await disablePageMotion(page);
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await applyDisabledMotionStyle(page);
  });

  test('strip follows native keyboard order and closes from the keyboard', async ({
    page,
  }) => {
    const banner = page.locator('[data-info-banner]');
    const link = banner.locator('.info-banner__link');
    const closeButton = banner.locator('[data-info-banner-close]');

    await expect(banner).toBeVisible();
    await link.focus();
    await page.keyboard.press('Tab');
    await expect(closeButton).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(link).toBeFocused();

    await closeButton.focus();
    await page.keyboard.press('Enter');

    await expect(banner).toBeHidden();
    await expect
      .poll(() => page.evaluate(() => document.cookie))
      .toContain('info-banner=false');
  });

  test('Escape does not dismiss the non-blocking strip', async ({ page }) => {
    const banner = page.locator('[data-info-banner]');

    await expect(banner).toBeVisible();
    await page.keyboard.press('Escape');

    await expect(banner).toBeVisible();
  });
});
