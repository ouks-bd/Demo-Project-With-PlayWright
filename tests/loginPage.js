const { expect } = require('@playwright/test');

exports.LogInPage = class LogInPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // this.getStartedLink = page.locator('a', { hasText: 'Get started' });
    // this.gettingStartedHeader = page.locator('h1', { hasText: 'Installation' });
    // this.pomLink = page.locator('li', { hasText: 'Guides' }).locator('a', { hasText: 'Page Object Model' });
    // this.tocList = page.locator('article div.markdown ul > li > a');
  }

  async goto() {
    await this.page.goto("https://eticket.railway.gov.bd/");
  }

  async AgreeButton() {
    await page.locator("text=I Agree").click();
   
  }

  async ClickOnLogIn() {
    await page.click("text=Login")
  }
}