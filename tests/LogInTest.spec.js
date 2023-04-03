const { test, expect } = require('@playwright/test');
const { LogInPage } = require('../MainProject/Test/loginPage');



test('Log In Page', async ({ page }) => {
  const login = new LogInPage(page);

  await login.goto();
  await login.AgreeButton();
  await login.ClickOnLogIn();

});