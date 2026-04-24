import { createRequire } from 'node:module';
import { defineConfig, devices } from '@playwright/test';

const require = createRequire(import.meta.url);
const { VIEWPORTS: viewports } = require('./tests/visual/constants.js');

function buildProjects() {
  const browserDefinitions = [
    { engineName: 'chromium', device: devices['Desktop Chrome'] },
    { engineName: 'firefox', device: devices['Desktop Firefox'] },
    { engineName: 'webkit', device: devices['Desktop Safari'] },
  ];

  const projects = [];
  for (const { engineName, device } of browserDefinitions) {
    for (const [viewportProfileName, viewportSize] of Object.entries(
      viewports,
    )) {
      projects.push({
        name: `${engineName}-${viewportProfileName}`,
        use: {
          ...device,
          viewport: viewportSize,
        },
      });
    }
  }
  return projects;
}

export default defineConfig({
  testDir: 'tests/visual',
  // Shared folder so home specs can be split across files without duplicating PNGs.
  // Platform suffix: macOS and Linux rasterize fonts differently; per-platform
  // baselines let the suite pass locally (`-darwin`) and in CI (`-linux`).
  snapshotPathTemplate:
    '{testDir}/home-snapshots/{arg}-{projectName}-{platform}{ext}',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [['html', { open: 'never' }], ['github']] : 'list',
  expect: {
    timeout: 20_000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.005,
      threshold: 0.25,
    },
  },
  use: {
    baseURL: 'http://127.0.0.1:4173',
    reducedMotion: 'reduce',
    trace: 'on-first-retry',
    screenshot: 'off',
    video: 'off',
  },
  webServer: {
    command: 'yarn build && yarn exec serve dist -l 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
  projects: buildProjects(),
});
