/**
 * Node module hook: resolve `@constants/*`, `@scripts/*`, and `@data/*` like
 * esbuild (Eleventy bundle) and Vitest. Preload with:
 * `node --import ./scripts/import-aliases-hooks.js …` (from repo root);
 * see `scripts/run-with-import-aliases.js`.
 */
import { register } from 'node:module';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

register(import.meta.url, import.meta.url);

const cwd = process.cwd();

export async function resolve(specifier, context, nextResolve) {
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
