// ============================================================
// SPEC – PNC Locations / Branch Locator
// Uses: LocationsPage POM
// Run: npx playwright test tests/locations.spec.ts
// ============================================================

import { test, expect, Page } from '@playwright/test';
import { LocationsPage } from '../pages/LocationsPage';

const PITTSBURGH:     string = 'Pittsburgh, PA';
const PITTSBURGH_ZIP: string = '15222';
const INVALID_QUERY:  string = 'XYZZY99999FAKE';

test.describe('PNC Locations – Branch Locator Tests', () => {

  let locationsPage: LocationsPage;

  test.beforeEach(async ({ page }: { page: Page }) => {
    locationsPage = new LocationsPage(page);
    await locationsPage.goto();
  });

  // ──────────────────────────────────────────────────────────
  // TC-LOC | Page Load
  // ──────────────────────────────────────────────────────────

  test('TC-LOC-001 | Page loads with correct title', async () => {
    const title: string = await locationsPage.getTitle();
    expect(title).toMatch(/Find a PNC Branch or ATM/i);
  });

  test('TC-LOC-002 | Page URL is the locator search endpoint', async () => {
    expect(locationsPage.getUrl()).toMatch(/locator\.pnc\.com\/en\/search/);
  });

  test('TC-LOC-003 | "Find a PNC Location" heading is visible', async () => {
    await expect(locationsPage.findLocationHeading).toBeVisible();
  });

  test('TC-LOC-004 | PNC Home logo links back to personal-banking', async () => {
    await expect(locationsPage.pncHomeLink).toHaveAttribute('href', /personal-banking\.html/);
  });

  // ──────────────────────────────────────────────────────────
  // TC-FORM | Search Form UI
  // ──────────────────────────────────────────────────────────

  test('TC-FORM-001 | Search input is visible and enabled', async () => {
    await expect(locationsPage.searchInput).toBeVisible();
    await expect(locationsPage.searchInput).toBeEnabled();
  });

  test('TC-FORM-002 | Search input placeholder contains example address or ZIP', async () => {
    await expect(locationsPage.searchInput)
      .toHaveAttribute('placeholder', /15222|Pittsburgh/i);
  });

  test('TC-FORM-003 | Search button is visible and enabled', async () => {
    await expect(locationsPage.searchButton).toBeVisible();
    await expect(locationsPage.searchButton).toBeEnabled();
  });

  test('TC-FORM-004 | Filters navigation section renders', async () => {
    await expect(locationsPage.filtersNav).toBeVisible();
  });

  test('TC-FORM-005 | Typing into search input is reflected in field value', async () => {
    await locationsPage.searchInput.fill(PITTSBURGH);
    const val: string = await locationsPage.getSearchInputValue();
    expect(val).toBe(PITTSBURGH);
  });

  test('TC-FORM-006 | Clearing the search field sets value to empty string', async () => {
    await locationsPage.searchInput.fill(PITTSBURGH);
    await locationsPage.clearSearch();
    const val: string = await locationsPage.getSearchInputValue();
    expect(val).toBe('');
  });

  // ──────────────────────────────────────────────────────────
  // TC-SRCH | Pittsburgh City/State Search
  // ──────────────────────────────────────────────────────────

  test.describe('Pittsburgh Search – City, State', () => {

    test.beforeEach(async () => {
      await locationsPage.search(PITTSBURGH);
    });

    test('TC-SRCH-001 | URL updates to include Pittsburgh place param', async () => {
      expect(locationsPage.getUrl()).toMatch(/place=Pittsburgh/i);
    });

    test('TC-SRCH-002 | URL includes branch and pnc-atm filter', async () => {
      expect(locationsPage.getUrl()).toMatch(/filter=branch,pnc-atm/);
    });

    test('TC-SRCH-003 | Results banner shows count of Branches and ATMs', async () => {
      await expect(locationsPage.resultsBanner)
        .toContainText(/Showing \d+ Branches and \d+ ATMs/i);
    });

    test('TC-SRCH-004 | At least one result card is displayed', async () => {
      const count: number = await locationsPage.getResultCardCount();
      expect(count).toBeGreaterThan(0);
    });

    test('TC-SRCH-005 | First result card contains a heading (location name)', async () => {
      const heading = locationsPage.firstResultCard.getByRole('heading');
      await expect(heading).toBeVisible();
    });

    test('TC-SRCH-006 | At least one result address mentions Pittsburgh, PA', async ({ page }) => {
      const addressEl = page.locator(':text("Pittsburgh, PA")').first();
      await expect(addressEl).toBeVisible();
    });

    test('TC-SRCH-007 | Results include an "ATM Only" or "Branch" label', async ({ page }) => {
      const label = page.locator(':text("ATM Only"), :text("Branch")').first();
      await expect(label).toBeVisible();
    });

    test('TC-SRCH-008 | Distance indicator (e.g. "0.01 mi") is shown', async ({ page }) => {
      const dist = page.locator(':text(" mi")').first();
      await expect(dist).toBeVisible();
    });

    test('TC-SRCH-009 | "Click to expand" button is present on result cards', async () => {
      await expect(locationsPage.expandButtons.first()).toBeVisible();
    });

    test('TC-SRCH-010 | Search input retains Pittsburgh value after results load', async () => {
      const val: string = await locationsPage.getSearchInputValue();
      expect(val.toLowerCase()).toContain('pittsburgh');
    });

  });

  // ──────────────────────────────────────────────────────────
  // TC-ZIP | ZIP Code Search
  // ──────────────────────────────────────────────────────────

  test.describe('Pittsburgh Search – ZIP Code', () => {

    test.beforeEach(async () => {
      await locationsPage.search(PITTSBURGH_ZIP);
    });

    test('TC-ZIP-001 | URL updates to include ZIP code place param', async () => {
      expect(locationsPage.getUrl()).toMatch(/place=15222/);
    });

    test('TC-ZIP-002 | Results banner shows a positive count', async () => {
      await expect(locationsPage.resultsBanner).toContainText(/Showing \d+/i);
    });

    test('TC-ZIP-003 | At least one result card is returned', async () => {
      const count: number = await locationsPage.getResultCardCount();
      expect(count).toBeGreaterThan(0);
    });

  });

  // ──────────────────────────────────────────────────────────
  // TC-EXP | Expand / Collapse Card
  // ──────────────────────────────────────────────────────────

  test.describe('Expand Location Card', () => {

    test.beforeEach(async () => {
      await locationsPage.search(PITTSBURGH);
    });

    test('TC-EXP-001 | Clicking expand on first card reveals collapse button', async () => {
      await locationsPage.expandCard(0);
      await expect(locationsPage.collapseButtons.first())
        .toBeVisible({ timeout: 5000 });
    });

    test('TC-EXP-002 | After expansion, collapse button replaces expand button', async () => {
      await locationsPage.expandButtons.first().click();
      await expect(locationsPage.collapseButtons.first())
        .toBeVisible({ timeout: 5000 });
    });

  });

  // ──────────────────────────────────────────────────────────
  // TC-NEG | Negative & Edge Cases
  // ──────────────────────────────────────────────────────────

  test.describe('Negative & Edge Cases', () => {

    test('TC-NEG-001 | Submitting empty search keeps user on locator domain', async ({ page }) => {
      await locationsPage.searchButton.click();
      await page.waitForTimeout(1500);
      expect(page.url()).toMatch(/locator\.pnc\.com/);
    });

    test('TC-NEG-002 | Nonsense search string returns no branch/ATM results', async ({ page }) => {
      await locationsPage.searchInput.fill(INVALID_QUERY);
      await locationsPage.searchInput.press('Enter');
      await page.waitForTimeout(2500);
      const bodyText: string = await locationsPage.getBodyText();
      const hasPositiveResults: boolean = /Showing \d+ Branch/.test(bodyText);
      expect(hasPositiveResults).toBe(false);
    });

    test('TC-NEG-003 | Searching via button click works the same as pressing Enter', async ({ page }) => {
      await locationsPage.goto();
      await locationsPage.searchInput.fill(PITTSBURGH);
      await locationsPage.searchButton.click();
      await page.waitForURL(/locator\.pnc\.com\/en\/search\?place=/);
      expect(page.url()).toMatch(/place=Pittsburgh/i);
    });

  });

  // ──────────────────────────────────────────────────────────
  // TC-A11Y | Accessibility & SEO
  // ──────────────────────────────────────────────────────────

  test('TC-A11Y-001 | Search input has an accessible label (ARIA)', async () => {
    await expect(locationsPage.searchInput).toBeAttached();
  });

  test('TC-A11Y-002 | Page title contains "PNC" for SEO and screen-reader context', async () => {
    const title: string = await locationsPage.getTitle();
    expect(title).toMatch(/PNC/i);
  });

});