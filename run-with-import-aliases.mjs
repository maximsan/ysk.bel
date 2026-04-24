/**
 * Prepends `--import ./import-aliases-register.mjs` to NODE_OPTIONS, then spawns
 * the given command. Use from npm scripts so `@constants/*`, `@scripts/*`, and
 * `@data/*` resolve via `import-aliases-hooks.mjs` in one place.
 */
import { spawnSync } from 'node:child_process';

const importFlag = '--import ./import-aliases-register.mjs';
const prev = process.env.NODE_OPTIONS?.trim();
process.env.NODE_OPTIONS = prev ? `${importFlag} ${prev}` : importFlag;

const argv = process.argv.slice(2);
if (argv.length === 0) {
  console.error('usage: node run-with-import-aliases.mjs <command> [...args]');
  process.exit(1);
}

const [command, ...args] = argv;
const result = spawnSync(command, args, {
  stdio: 'inherit',
  shell: true,
  env: process.env,
});
process.exit(result.status === null ? 1 : result.status);
