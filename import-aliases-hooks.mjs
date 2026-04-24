/**
 * Node customizations hook: resolve `@constants/*`, `@scripts/*`, and `@data/*`
 * the same way as esbuild (Eleventy bundle) and Vitest. Loaded via `import-aliases-register.mjs`.
 */
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export async function resolve(specifier, context, nextResolve) {
  const cwd = process.cwd();
  if (specifier.startsWith('@constants/')) {
    const filePath = path.join(
      cwd,
      'src/scripts/constants',
      specifier.slice('@constants/'.length),
    );
    return { url: pathToFileURL(filePath).href, shortCircuit: true };
  }
  if (specifier.startsWith('@scripts/')) {
    const filePath = path.join(
      cwd,
      'src/scripts',
      specifier.slice('@scripts/'.length),
    );
    return { url: pathToFileURL(filePath).href, shortCircuit: true };
  }
  if (specifier.startsWith('@data/')) {
    const filePath = path.join(
      cwd,
      'src/data',
      specifier.slice('@data/'.length),
    );
    return { url: pathToFileURL(filePath).href, shortCircuit: true };
  }
  return nextResolve(specifier, context);
}
