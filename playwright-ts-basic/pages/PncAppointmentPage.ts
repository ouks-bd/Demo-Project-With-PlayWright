import { Page, expect } from '@playwright/test';

export class PncAppointmentPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectNoOnlineBankingUserId() {
    await this.page.getByRole('radio', { name: /No/i }).click();
    await this.page.getByRole('button', { name: /Continue/i }).click();
    await this.page.waitForTimeout(2000);
  }

  async choosePersonalBankingOpenNewAccount() {
    await this.page.getByRole('button', { name: /Personal Banking/i }).click();
    await this.page.getByRole('button', { name: /Open a new account/i }).click();
    await this.page.waitForTimeout(2000);
  }
async chooseByPhone() {
  const byPhone = this.page.locator('p.cardHeader:has-text("By Phone")');
  await byPhone.waitFor({ state: 'visible' });
  await byPhone.click();
  await this.page.waitForTimeout(2000);
}
  async waitAndCloseAfterLoad() {
    // wait for some loading / next step to appear
    await this.page.waitForTimeout(2000);
    // just an assertion placeholder if needed
await expect(this.page).toHaveURL(/schedule-an-appointment/);
  }
}
