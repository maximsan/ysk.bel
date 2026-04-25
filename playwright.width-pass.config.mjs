import { defineConfig, devices } from '@playwright/test';

/**
 * One Chromium project only: full-viewport “design review” shots at the widths
 * listed in Group G (replaces a manual pass; commit baselines in tests/visual/width-snapshots/).
 */
export default defineConfig({
  testDir: 'tests/visual',
  testMatch: 'home-width-pass.spec.js',
  snapshotPathTemplate:
    '{testDir}/width-snapshots/{arg}-{projectName}-{platform}{ext}',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02,
      threshold: 0.25,
    },
  },
  use: {
    /* Avoid clashing with the main visual config (port 4173) or a leftover static server. */
    baseURL: 'http://127.0.0.1:4174',
    reducedMotion: 'reduce',
    trace: 'off',
    screenshot: 'off',
    video: 'off',
  },
  webServer: {
    command:
      'yarn build && python3 -m http.server 4174 --bind 127.0.0.1 --directory dist',
    url: 'http://127.0.0.1:4174',
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 900 },
      },
    },
  ],
});
