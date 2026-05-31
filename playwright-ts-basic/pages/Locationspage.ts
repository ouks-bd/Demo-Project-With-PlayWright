// ============================================================
// PAGE OBJECT MODEL – PNC Locations / Branch Locator
// URL: https://locator.pnc.com/en/search
// ============================================================

import { Page, Locator } from '@playwright/test';

export class LocationsPage {
  readonly page: Page;
  readonly url: string = 'https://locator.pnc.com/en/search';

  // ── Search Form ──
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly filtersNav: Locator;

  // ── Results ──
  readonly resultsBanner: Locator;
  readonly firstResultCard: Locator;
  readonly expandButtons: Locator;
  readonly collapseButtons: Locator;

  // ── Header ──
  readonly pncHomeLink: Locator;

  // ── Heading ──
  readonly findLocationHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    // ── Search Form ──
    this.searchInput  = page.getByRole('textbox', { name: /ZIP code or City, State/i });
    this.searchButton = page.getByRole('button',  { name: /Search|Find locations/i });
    this.filtersNav   = page.getByRole('navigation', { name: 'filters' });

    // ── Results ──
    this.resultsBanner   = page.getByRole('navigation', { name: 'bannerInfo' }).last();
    this.firstResultCard = page.locator('[role="navigation"][cursor="pointer"]').first();
    this.expandButtons   = page.getByRole('button', { name: /Click to expand/i });
    this.collapseButtons = page.getByRole('button', { name: /Click to collapse/i });

    // ── Header ──
    this.pncHomeLink = page.getByRole('link', { name: 'PNC Home' }).first();

    // ── Heading ──
    this.findLocationHeading = page
      .getByRole('complementary')
      .filter({ hasText: /Find a PNC Location/i });
  }

  // ── Actions ──────────────────────────────────────────────

  /** Navigate directly to the locator page */
  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }

  /**
   * Fill the search box and submit by pressing Enter
   * @param query – e.g. 'Pittsburgh, PA' or '15222'
   */
  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
    await this.page.waitForURL(/locator\.pnc\.com\/en\/search\?place=/);
  }

  /**
   * Fill the search box and submit by clicking the Search button
   * @param query – e.g. 'Pittsburgh, PA'
   */
  async searchViaButton(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchButton.click();
    await this.page.waitForURL(/locator\.pnc\.com\/en\/search\?place=/);
  }

  /**
   * Click "Click to expand" on the nth result card (0-indexed)
   * @param index – card index, defaults to 0
   */
  async expandCard(index: number = 0): Promise<void> {
    const btns = await this.expandButtons.all();
    await btns[index].click();
  }

  /** Clear the search input */
  async clearSearch(): Promise<void> {
    await this.searchInput.fill('');
  }

  // ── Getters ──────────────────────────────────────────────

  /** Return the text content of the results banner */
  async getResultsBannerText(): Promise<string> {
    return this.resultsBanner.innerText();
  }

  /** Return the current page URL */
  getUrl(): string {
    return this.page.url();
  }

  /** Return current page title */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /** Return inner text of the body (for content assertions) */
  async getBodyText(): Promise<string> {
    return this.page.locator('body').innerText();
  }

  /** Return number of visible result cards */
  async getResultCardCount(): Promise<number> {
    const cards = await this.page
      .locator('[role="navigation"][cursor="pointer"]')
      .all();
    return cards.length;
  }

  /** Return value currently in the search input */
  async getSearchInputValue(): Promise<string> {
    return this.searchInput.inputValue();
  }
}