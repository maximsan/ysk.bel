/**
 * Run `pre-commit install` after every `yarn install`.
 * Package.json `postinstall` only runs when the dependency tree changes on Yarn Berry.
 * @see https://yarnpkg.com/advanced/lifecycle-scripts#postinstall
 */
module.exports = {
  name: 'yarn-plugin-pre-commit-install',
  factory: () => ({
    default: {
      hooks: {
        afterAllInstalled(project) {
          const { spawnSync } = require('node:child_process');
          const path = require('node:path');
          const script = path.join(project.cwd, 'scripts/postinstall-pre-commit.mjs');
          const result = spawnSync(process.execPath, [script], {
            cwd: project.cwd,
            stdio: 'inherit',
            env: { ...process.env },
          });
          if (result.error) {
            throw result.error;
          }
        },
      },
    },
  }),
};
