import { test } from '@playwright/test';
import { PncHomePage } from '../pages/PncHomePage';
import { PncAppointmentPage } from '../pages/PncAppointmentPage';

test('PNC appointment flow - personal banking by phone, then close', async ({ page }) => {
  const home = new PncHomePage(page);
  const appointment = new PncAppointmentPage(page);

  // Go to personal banking home
  await home.goto();
  // Directly open schedule appointment page
  await home.goToScheduleAppointment();

  // Do you have a PNC Online Banking User ID? -> No -> Continue
  await appointment.selectNoOnlineBankingUserId();

  // Personal banking -> Open a new account
  await appointment.choosePersonalBankingOpenNewAccount();

  // By phone
  await appointment.chooseByPhone();

  // Wait ~2 seconds, then test ends (browser closes after test)
  await appointment.waitAndCloseAfterLoad();
});
