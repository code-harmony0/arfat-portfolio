// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Arfat Portfolio E2E', () => {
  test('loads home page and displays brand and sections', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/Arfat Rozewale/);

    // Verify brand link exists
    const brand = page.locator('a.brand');
    await expect(brand).toBeVisible();

    // Verify desktop section nav links
    await expect(page.locator('.nav-links a[href="#shipped"]')).toBeVisible();
    await expect(page.locator('.nav-links a[href="#web"]')).toBeVisible();
    await expect(page.locator('.nav-links a[href="#cases"]')).toBeVisible();
    await expect(page.locator('.nav-links a[href="#teardown"]')).toBeVisible();
  });

  test('navigates to Zonesso case study', async ({ page }) => {
    await page.goto('/');

    // Click on Zonesso case study link
    const zonessoLink = page.locator('a[href="/work/zonesso"]').first();
    await expect(zonessoLink).toBeVisible();
    await zonessoLink.click();

    // Verify URL and case study title
    await expect(page).toHaveURL(/.*\/work\/zonesso/);
    await expect(page.locator('h1')).toContainText(/Zonesso/i);
  });
});
