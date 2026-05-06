import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@constants': path.join(root, 'src/scripts/constants'),
      '@scripts': path.join(root, 'src/scripts'),
      '@data': path.join(root, 'src/data'),
    },
  },
  test: {
    environment: 'happy-dom',
    include: ['tests/unit/**/*.test.js'],
  },
});
