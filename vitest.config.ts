/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: './src/tests/setup.ts',
    environment: 'happy-dom',
    exclude: ['**/node_modules/**'],
  },
});
