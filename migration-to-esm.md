# Migration to ESM Modules (ECMAScript Modules)

This checklist will guide the migration of the project from CommonJS to ESM, covering Eleventy, Babel, and all relevant code and configuration files. Each step is based on the official documentation for [Eleventy](https://www.11ty.dev/docs/config/) and [Babel](https://babeljs.io/docs/config-files).

## Migration Steps

- [x] 1. Update `package.json` to enable ESM:
  - Add or set `"type": "module"` in the root `package.json`.
- [x] 2. Migrate all JavaScript files from CommonJS to ESM:
  - Replace all `require()` with `import` statements.
  - Replace all `module.exports` with `export default` or named exports.
  - Update all import paths to use file extensions if required (e.g., `.js`).
- [x] 3. Update Eleventy configuration:
  - Rename `eleventy.config.js` to `eleventy.config.mjs` (recommended for ESM, see docs).
  - Refactor config file to use ESM syntax (`import`/`export default`).
  - Update all imports in the config file to ESM.
- [x] 4. Update Babel configuration:
  - If you still need Babel, rename `.babelrc` to `.babelrc.json`, `.babelrc.mjs`, or use `babel.config.json`/`babel.config.mjs` for project-wide config.
  - If using `.babelrc.mjs` or `babel.config.mjs`, use ESM syntax for config export.
  - Review and update presets/plugins for ESM compatibility.
- [x] 5. Update build scripts and tools:
  - Ensure all scripts in `package.json` are compatible with ESM (e.g., Eleventy, Babel, Node.js invocations).
  - Update any custom scripts (e.g., in `/scripts`) to ESM.
- [x] 6. Update all data files in `src/data/`:
  - Convert all `module.exports` to `export default`.
  - Update all imports in files that use these data modules.
- [x] 7. Update all scripts in `src/scripts/`:
  - Ensure all files use ESM (`import`/`export`).
  - Update any dynamic imports to ESM syntax if needed.
- [x] 8. Test the migration:
  - Run the build and development scripts.
  - Fix any issues related to module resolution or syntax.
  - Test Eleventy site locally.
- [ ] 9. Update documentation:
  - Document the migration and any changes to the development workflow.
  - Note any breaking changes or new requirements for contributors.

---

**References:**

- [Eleventy ESM Config Docs](https://www.11ty.dev/docs/config/)
- [Babel Config Files Docs](https://babeljs.io/docs/config-files)

---

> Update the checkboxes as you complete each step. If you encounter issues, consult the documentation links above or update this checklist with additional steps as needed.
