import { Page } from '@playwright/test';

export class PncHomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.pnc.com/en/personal-banking.html', {
      waitUntil: 'domcontentloaded',
    });
    await this.page.waitForTimeout(2000);
  }
    
  async goToScheduleAppointment() {
    await this.page.goto(
      'https://www.pnc.com/en/apps/appointment-setting/schedule-appointment.html?questionId__propid=DOT_HOME',
      { waitUntil: 'domcontentloaded' }
    );
    await this.page.waitForTimeout(2000);
  }
}
