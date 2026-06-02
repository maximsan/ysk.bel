import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '@playwright/test';
import {
  applyDisabledMotionStyle,
  blockThirdPartyRequests,
  disablePageMotion,
} from '../support/e2e-page-setup.js';
import * as homePageDom from '@constants/homePageDom.js';
const { SITE_SELECTORS, INFO_BANNER_STATE_CLASS } = homePageDom;

function formatViolations(violations) {
  return violations
    .map((v) => {
      const nodes = v.nodes
        .slice(0, 3)
        .map((n) => `  - ${n.html.slice(0, 120)}`)
        .join('\n');
      const more =
        v.nodes.length > 3 ? `\n  … +${v.nodes.length - 3} more` : '';
      return `${v.id} (${v.impact}): ${v.help}\n${nodes}${more}`;
    })
    .join('\n\n');
}

function seriousOrCriticalViolations(results) {
  return results.violations.filter(
    (violation) =>
      violation.impact === 'serious' || violation.impact === 'critical',
  );
}

async function hideGlobalChrome(page) {
  await page.addInitScript(() => {
    document.cookie = [
      'info-banner=false',
      'max-age=86400',
      'Path=/',
      'SameSite=Lax',
    ].join('; ');
  });

  await page.evaluate(
    ([
      headerSelector,
      overlaySelector,
      bannerSelector,
      showClass,
      hideClass,
    ]) => {
      const headerElement = document.querySelector(headerSelector);
      if (headerElement) {
        headerElement.hidden = true;
        headerElement.setAttribute('aria-hidden', 'true');
      }

      const overlayElement = document.querySelector(overlaySelector);
      if (overlayElement) {
        overlayElement.hidden = true;
        overlayElement.style.display = 'none';
      }

      const bannerElement = document.querySelector(bannerSelector);
      if (bannerElement) {
        bannerElement.hidden = true;
        bannerElement.setAttribute('aria-hidden', 'true');
        bannerElement.classList.remove(showClass);
        bannerElement.classList.add(hideClass);
      }
    },
    [
      SITE_SELECTORS.header,
      SITE_SELECTORS.overlay,
      SITE_SELECTORS.infoBanner,
      INFO_BANNER_STATE_CLASS.show,
      INFO_BANNER_STATE_CLASS.hide,
    ],
  );
}

test.describe('home — automated accessibility', () => {
  test('no serious/critical WCAG 2.0/2.1 A & AA issues (axe)', async ({
    page,
  }) => {
    await blockThirdPartyRequests(page);
    await disablePageMotion(page);
    await hideGlobalChrome(page);
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await applyDisabledMotionStyle(page);
    await hideGlobalChrome(page);
    await page
      .waitForLoadState('networkidle', { timeout: 30_000 })
      .catch(() => {});
    await page.evaluate(() => document.fonts.ready);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      // Google Maps canvas is third-party; the local fallback remains in scope.
      .exclude('#map-canvas')
      .exclude('iframe[src*="googletagmanager.com"]')
      .analyze();

    const serious = seriousOrCriticalViolations(results);
    expect(serious, formatViolations(serious)).toEqual([]);
  });

  test('visible info strip has no serious/critical WCAG 2.0/2.1 A & AA issues (axe)', async ({
    context,
    page,
  }) => {
    await context.clearCookies();
    await blockThirdPartyRequests(page);
    await disablePageMotion(page);
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await applyDisabledMotionStyle(page);
    await expect(page.locator(SITE_SELECTORS.infoBanner)).toBeVisible();
    await page.evaluate(() => document.fonts.ready);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .include(SITE_SELECTORS.infoBanner)
      .analyze();

    const serious = seriousOrCriticalViolations(results);
    expect(serious, formatViolations(serious)).toEqual([]);
  });
});
