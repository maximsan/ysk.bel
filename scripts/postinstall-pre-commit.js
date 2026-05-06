import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const TAG = 'yarn install [pre-commit]';

/**
 * Never fail `yarn install`. Run `pre-commit install` when Git uses `.git/hooks`.
 */
const isCi =
  process.env.VERCEL === '1' ||
  process.env.CI === 'true' ||
  process.env.CI === '1';
if (isCi) {
  process.stdout.write(`${TAG}: skipped — CI / Vercel\n`);
  process.exit(0);
}

process.stdout.write(`${TAG}: running…\n`);

if (!existsSync('.git')) {
  process.stdout.write(`${TAG}: skipped — no .git\n`);
  process.exit(0);
}

const hooksPathR = spawnSync('git', ['config', '--get', 'core.hooksPath'], {
  encoding: 'utf8',
});
const hooksPath = hooksPathR.stdout?.trim() ?? '';

if (hooksPath !== '' && hooksPath !== 'hooks') {
  process.stdout.write(
    `${TAG}: skipped — core.hooksPath=${hooksPath} (not .git/hooks); run \`pre-commit install\` yourself or use \`git config core.hooksPath hooks\` in this repo.\n`,
  );
  process.exit(0);
}

const result = spawnSync('pre-commit', ['install'], {
  stdio: 'inherit',
  shell: true,
});

if (result.error) {
  if (result.error.code === 'ENOENT') {
    process.stdout.write(
      `${TAG}: skipped — \`pre-commit\` not on PATH\n`,
    );
    process.exit(0);
  }
  throw result.error;
}

// With shell: true, a missing `pre-commit` yields exit 127 (or 126) and no `error`.
if (result.status === 127 || result.status === 126) {
  process.stdout.write(
    `${TAG}: skipped — \`pre-commit\` not on PATH\n`,
  );
  process.exit(0);
}

if (result.status !== 0) {
  process.stderr.write(
    `${TAG}: \`pre-commit install\` failed — fix the issue above, then run \`pre-commit install\`.\n`,
  );
  process.exit(0);
}

process.stdout.write(`${TAG}: ok\n`);
process.exit(0);
