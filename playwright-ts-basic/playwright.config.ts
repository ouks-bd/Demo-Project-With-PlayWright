// playwright.config.ts
// Run all tests : npx playwright test
// One spec only : npx playwright test tests/personalBanking.spec.ts
// HTML report   : npx playwright show-report

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout:  30_000,
  retries:  1,
  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    headless:   true,
    viewport:   { width: 1280, height: 800 },
    screenshot: 'only-on-failure',
    video:      'retain-on-failure',
    trace:      'on-first-retry',
  },

  projects: [
    {
      name: 'Chromium',
      use:  { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      use:  { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit',
      use:  { ...devices['Desktop Safari'] },
    },
  ],
});