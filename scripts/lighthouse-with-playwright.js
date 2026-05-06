/**
 * Runs Lighthouse using Playwright’s bundled Chromium (sets CHROME_PATH), so
 * `yarn build && npx serve dist` does not require a system Chrome install.
 *
 * Usage: node scripts/lighthouse-with-playwright.js [desktop|mobile]
 * Outputs: ./lighthouse-home.json (desktop) or ./lighthouse-home-mobile.json (mobile)
 * Add to .gitignore in this repo; compare metrics manually or in CI.
 */
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const mode = (process.argv[2] || 'desktop').toLowerCase();
if (!['desktop', 'mobile'].includes(mode)) {
  process.stderr.write(
    `Usage: node scripts/lighthouse-with-playwright.js [desktop|mobile]\n`,
  );
  process.exit(1);
}

const lighthouseCli = path.join(
  __dirname,
  '..',
  'node_modules',
  'lighthouse',
  'cli',
  'index.js',
);

const outputPath =
  mode === 'mobile' ? './lighthouse-home-mobile.json' : './lighthouse-home.json';

const args = [
  lighthouseCli,
  'http://127.0.0.1:4173/',
  '--output=json',
  `--output-path=${outputPath}`,
  '--chrome-flags=--headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage',
  '--quiet',
];

if (mode === 'desktop') {
  args.push('--preset=desktop');
}

const result = spawnSync(process.execPath, args, {
  stdio: 'inherit',
  env: {
    ...process.env,
    CHROME_PATH: chromium.executablePath(),
  },
});

process.exit(result.status === null ? 1 : result.status);
