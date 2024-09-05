import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'server-only': path.resolve(__dirname, '__mocks__/server-only.ts'),
      '@codemirror/state': path.resolve(__dirname, 'node_modules/@codemirror/state/dist/index.cjs'),
      '@codemirror/lang-json': path.resolve(__dirname, 'node_modules/@codemirror/lang-json/dist/index.cjs'),
      '@codemirror/lint': path.resolve(__dirname, 'node_modules/@codemirror/lint/dist/index.cjs') 
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    passWithNoTests: true,
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*.{ts,tsx}'],
    },
    setupFiles: './vitest.setup.ts',
  },
});
