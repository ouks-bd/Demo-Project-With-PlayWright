import { test, expect, devices } from '@playwright/test';

test.use({
  ...devices['iPhone 12 Pro'],
});

test('test', async ({ page }) => {
  await page.goto('https://eticket.railway.gov.bd/');
  await page.locator('.disclaimer-bottom-sheet-text-wrapper').click();
  await page.getByRole('button', { name: 'I Agree' }).click();
  await page.getByRole('banner').getByRole('link').nth(1).click();
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Enter your mobile number').click();
  await page.getByPlaceholder('Enter your password').click();
  await page.locator('#loginForm div').filter({ hasText: 'LOGIN' }).click();
});