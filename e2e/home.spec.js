import { test, expect } from '@playwright/test';

test.describe('Home (built site)', () => {
  test('document title matches marketing copy', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/серебряный карась/i);
  });

  test('hashed index stylesheet is linked', async ({ page }) => {
    await page.goto('/');
    const href = page.locator('link[rel="stylesheet"][href*="styles/index."]');
    await expect(href).toHaveCount(1);
    const url = await href.getAttribute('href');
    expect(url).toMatch(/\/?styles\/index\.[a-f0-9]{8}\.css$/);
  });

  test('bundled entry script is present and loads', async ({ page }) => {
    const res = await page.goto('/');
    expect(res?.ok()).toBeTruthy();
    const script = page.locator('script[src*="scripts/index.js"]');
    await expect(script).toHaveCount(1);
    const src = await script.getAttribute('src');
    const scriptRes = await page.request.get(new URL(src, page.url()).toString());
    expect(scriptRes.ok()).toBeTruthy();
  });
});
