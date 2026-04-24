import { defineConfig, devices } from '@playwright/test';

/**
 * Accessibility tests run against a pre-built `dist/` (no second Eleventy build).
 * Local: `yarn build && yarn test:a11y`
 * CI: build job runs `yarn build` then `yarn test:a11y`
 */
export default defineConfig({
  testDir: 'tests/a11y',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['github']] : 'list',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'yarn exec serve dist -l 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [
    {
      name: 'a11y-chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
