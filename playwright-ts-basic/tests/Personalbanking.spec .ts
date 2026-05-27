// ============================================================
// SPEC – PNC Personal Banking Homepage
// Uses: PersonalBankingPage POM
// Run: npx playwright test tests/personalBanking.spec.ts
// ============================================================

import { test, expect, Page } from '@playwright/test';
import { PersonalBankingPage } from '../pages/PersonalBankingPage';

test.describe('PNC Personal Banking – Homepage Tests', () => {

  let homePage: PersonalBankingPage;

  test.beforeEach(async ({ page }: { page: Page }) => {
    homePage = new PersonalBankingPage(page);
    await homePage.goto();
    await homePage.dismissCookieBanner();
  });

  // ──────────────────────────────────────────────────────────
  // TC-HP | Page Load & URL
  // ──────────────────────────────────────────────────────────

  test('TC-HP-001 | Page loads with correct title', async () => {
    const title: string = await homePage.getTitle();
    expect(title).toMatch(/PNC Personal Banking/i);
  });

  test('TC-HP-002 | Page URL contains expected path', async () => {
    expect(homePage.getUrl()).toContain('/en/personal-banking.html');
  });

  // ──────────────────────────────────────────────────────────
  // TC-HP | Branding & Logo
  // ──────────────────────────────────────────────────────────

  test('TC-HP-003 | PNC Home logo is visible', async () => {
    await expect(homePage.pncHomeLogo).toBeVisible();
  });

  test('TC-HP-004 | PNC Home logo href points to personal-banking', async () => {
    await expect(homePage.pncHomeLogo).toHaveAttribute('href', /personal-banking\.html/);
  });

  // ──────────────────────────────────────────────────────────
  // TC-HP | Main Navigation
  // ──────────────────────────────────────────────────────────

  test('TC-HP-005 | Main navigation section is present', async () => {
    await expect(homePage.mainNav).toBeVisible();
  });

  test('TC-HP-006 | "Personal" nav link is visible', async () => {
    await expect(homePage.personalNavLink).toBeVisible();
  });

  test('TC-HP-007 | "Personal" nav link href points to personal-banking', async () => {
    await expect(homePage.personalNavLink).toHaveAttribute('href', /personal-banking\.html/);
  });

  test('TC-HP-008 | "Small Business" nav link is visible', async () => {
    await expect(homePage.smallBizNavLink).toBeVisible();
  });

  test('TC-HP-009 | "Corporate & Institutional" nav link is visible', async () => {
    await expect(homePage.corporateNavLink).toBeVisible();
  });

  test('TC-HP-010 | "About" nav link is visible', async () => {
    await expect(homePage.aboutNavLink).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────
  // TC-HP | Utility Navigation
  // ──────────────────────────────────────────────────────────

  test('TC-HP-011 | Locations link is visible in utility nav', async () => {
    await expect(homePage.locationsLink).toBeVisible();
  });

  test('TC-HP-012 | Locations link href points to locator subdomain', async () => {
    await expect(homePage.locationsLink).toHaveAttribute('href', /locator\.pnc\.com/);
  });

  test('TC-HP-013 | Customer Service link is visible', async () => {
    await expect(homePage.customerServiceLink).toBeVisible();
  });

  test('TC-HP-014 | Security link is visible', async () => {
    await expect(homePage.securityLink).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────
  // TC-HP | Accessibility
  // ──────────────────────────────────────────────────────────

  test('TC-HP-015 | "Skip to main content" link is present in DOM', async () => {
    await expect(homePage.skipToMainLink).toBeAttached();
  });

  // ──────────────────────────────────────────────────────────
  // TC-HP | Cross-page Navigation
  // ──────────────────────────────────────────────────────────

  test('TC-HP-016 | Clicking Locations navigates to locator subdomain', async ({ page }) => {
    await homePage.clickLocations();
    await page.waitForURL(/locator\.pnc\.com\/en\/search/);
    expect(page.url()).toMatch(/locator\.pnc\.com\/en\/search/);
  });

});