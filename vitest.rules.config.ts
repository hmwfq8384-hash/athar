import { defineConfig } from 'vitest/config';

// اختبارات قواعد Firebase: تُشغَّل داخل المحاكي عبر `npm run test:rules`
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['rules-tests/**/*.test.ts'],
    testTimeout: 20000,
    fileParallelism: false,
  },
});
