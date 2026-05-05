import { defineConfig, devices } from '@playwright/test';
import { VIEWPORTS as viewports } from './tests/visual/constants.js';

const chromeDevice = devices['Desktop Chrome'];
const baseURLMain = 'http://127.0.0.1:4173';
const reuseServer = !process.env.CI;

/** Home snapshots: taller DOM + masked map + fonts → allow benign CI/layout drift without hiding real breaks. */
const homeVisualScreenshotExpect = {
  timeout: 20_000,
  toHaveScreenshot: {
    // Root default is 0.005; section shots need more slack (subpixel/fonts, carousel line wraps, viewport rounding).
    maxDiffPixelRatio: 0.07,
    threshold: 0.3,
  },
};

function homeScreenshotProjects() {
  return Object.entries(viewports).map(
    ([viewportProfileName, viewportSize]) => ({
      name: `chromium-${viewportProfileName}`,
      testDir: 'tests/visual',
      testIgnore: '**/home-width-pass.spec.js',
      snapshotPathTemplate:
        '{testDir}/home-snapshots/{arg}-{projectName}-{platform}{ext}',
      expect: homeVisualScreenshotExpect,
      use: {
        ...chromeDevice,
        viewport: viewportSize,
        baseURL: baseURLMain,
      },
    }),
  );
}

export default defineConfig({
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? 'github' : 'list',
  expect: {
    timeout: 20_000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.005,
      threshold: 0.25,
    },
  },
  use: {
    baseURL: baseURLMain,
    reducedMotion: 'reduce',
    trace: 'retain-on-failure',
    screenshot: 'off',
    video: 'off',
  },
  /**
   * PLAYWRIGHT_PREBUILT_DIST=1: CI visual job serves existing `dist/` only (artifact from build job).
   * Omit locally for `yarn build && serve`; or build first and set PLAYWRIGHT_PREBUILT_DIST=1 when reusing dist.
   */
  webServer: {
    command:
      process.env.PLAYWRIGHT_PREBUILT_DIST === '1'
        ? 'yarn exec serve dist -l 4173 --no-port-switching'
        : 'yarn build && yarn exec serve dist -l 4173 --no-port-switching',
    url: baseURLMain,
    reuseExistingServer: reuseServer,
    timeout: 180_000,
  },
  projects: [
    ...homeScreenshotProjects(),
    {
      name: 'width-pass',
      testDir: 'tests/visual',
      testMatch: '**/home-width-pass.spec.js',
      snapshotPathTemplate:
        '{testDir}/width-snapshots/{arg}-chromium-{platform}{ext}',
      retries: process.env.CI ? 1 : 0,
      expect: {
        timeout: 20_000,
        toHaveScreenshot: {
          maxDiffPixelRatio: 0.02,
          threshold: 0.25,
        },
      },
      use: {
        ...chromeDevice,
        baseURL: baseURLMain,
        trace: 'off',
      },
    },
    {
      name: 'a11y',
      testDir: 'tests/a11y',
      testMatch: '**/*.@(spec|test).?(c|m)[jt]s?(x)',
      retries: process.env.CI ? 1 : 0,
      use: {
        ...chromeDevice,
        baseURL: baseURLMain,
        trace: 'retain-on-failure',
      },
    },
    {
      name: 'e2e',
      testDir: 'tests/e2e',
      testMatch: '**/*.@(spec|test).?(c|m)[jt]s?(x)',
      use: {
        ...chromeDevice,
        baseURL: baseURLMain,
        trace: 'on-first-retry',
      },
    },
  ],
});
