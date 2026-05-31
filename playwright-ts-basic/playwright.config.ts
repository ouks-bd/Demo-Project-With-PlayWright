import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  reporter: 'html',
});