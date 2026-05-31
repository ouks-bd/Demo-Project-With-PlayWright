// ============================================================
// PAGE OBJECT MODEL – PNC Personal Banking Homepage
// URL: https://www.pnc.com/en/personal-banking.html
// ============================================================

import { Page, Locator } from '@playwright/test';

export class PersonalBankingPage {
  readonly page: Page;
  readonly url: string = 'https://www.pnc.com/en/personal-banking.html';

  // ── Banner / Cookie Dialog ──
  readonly cookieBannerCloseBtn: Locator;

  // ── Header ──
  readonly pncHomeLogo: Locator;
  readonly mainNav: Locator;

  // ── Top-level nav links ──
  readonly personalNavLink: Locator;
  readonly smallBizNavLink: Locator;
  readonly corporateNavLink: Locator;
  readonly aboutNavLink: Locator;

  // ── Utility nav links ──
  readonly locationsLink: Locator;
  readonly customerServiceLink: Locator;
  readonly securityLink: Locator;

  // ── Accessibility ──
  readonly skipToMainLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // ── Banner / Cookie Dialog ──
    this.cookieBannerCloseBtn = page.getByRole('button', { name: 'Close' });

    // ── Header ──
    this.pncHomeLogo = page.getByRole('link', { name: 'PNC Home' }).first();
    this.mainNav     = page.getByRole('navigation', { name: 'Main' });

    // ── Top-level nav links ──
    this.personalNavLink  = page.getByRole('link', { name: 'Personal' });
    this.smallBizNavLink  = page.getByRole('link', { name: 'Small Business' });
    this.corporateNavLink = page.getByRole('link', { name: 'Corporate & Institutional' });
    this.aboutNavLink     = page.getByRole('link', { name: 'About' });

    // ── Utility nav links ──
    this.locationsLink       = page.getByRole('link', { name: 'Locations' });
    this.customerServiceLink = page.getByRole('link', { name: 'Customer Service' });
    this.securityLink        = page.getByRole('link', { name: 'Security' });

    // ── Accessibility ──
    this.skipToMainLink = page.getByRole('link', { name: /Skip to main content/i });
  }

  // ── Actions ──────────────────────────────────────────────

  /** Navigate to the Personal Banking homepage */
  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }

  /** Dismiss the cookie/privacy banner if it appears */
  async dismissCookieBanner(): Promise<void> {
    try {
      await this.cookieBannerCloseBtn.waitFor({ state: 'visible', timeout: 5000 });
      await this.cookieBannerCloseBtn.click();
    } catch {
      // Banner not present — no action needed
    }
  }

  /** Click the Locations link in the utility nav */
  async clickLocations(): Promise<void> {
    await this.locationsLink.click();
  }

  // ── Getters ──────────────────────────────────────────────

  /** Return current page title */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /** Return current page URL */
  getUrl(): string {
    return this.page.url();
  }
}