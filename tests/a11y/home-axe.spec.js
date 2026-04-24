import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '@playwright/test';

function formatViolations(violations) {
  return violations
    .map((v) => {
      const nodes = v.nodes
        .slice(0, 3)
        .map((n) => `  - ${n.html.slice(0, 120)}`)
        .join('\n');
      const more = v.nodes.length > 3 ? `\n  … +${v.nodes.length - 3} more` : '';
      return `${v.id} (${v.impact}): ${v.help}\n${nodes}${more}`;
    })
    .join('\n\n');
}

test.describe('home — automated accessibility', () => {
  test('no serious/critical WCAG 2.0/2.1 A & AA issues (axe)', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle', { timeout: 30_000 }).catch(() => {});
    await page.evaluate(() => document.fonts.ready);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      // Google Maps embed is third-party; we do not assert on tile contrast.
      .exclude('#map')
      .exclude('iframe[src*="googletagmanager.com"]')
      .analyze();

    const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(serious, formatViolations(serious)).toEqual([]);
  });
});
