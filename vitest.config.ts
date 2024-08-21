import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
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
