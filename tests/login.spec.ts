import { test, expect } from '@playwright/test';

test('User can login successfully', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

await page.fill('#user-name', process.env.SAUCE_USERNAME!);
await page.fill('#password', process.env.SAUCE_PASSWORD!);
  await page.click('#login-button');

  await expect(page).toHaveURL(/inventory.html/);
  await expect(page.locator('.title')).toHaveText('Products');
});

// import { test, expect } from '@playwright/test';

// test('User can login successfully', async ({ page }) => {
//   await page.goto('https://www.saucedemo.com/');

//   await page.fill('#user-name', 'standard_user');
//   await page.fill('#password', 'secret_sauce');
//   await page.click('#login-button');

//   await expect(page).toHaveURL(/inventory.html/);
//   await expect(page.locator('.title')).toHaveText('Products');
// });