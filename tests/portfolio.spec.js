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

  test('30-second mobile proof: featured projects have store links and metrics', async ({ page }) => {
    await page.goto('/');

    // Zonesso has App Store, Google Play, and public motors.zonesso.com
    const zonessoPanel = page.locator('#panel-zonesso');
    await expect(zonessoPanel.locator('.sp-stores a[href*="apple.com"]')).toBeVisible();
    await expect(zonessoPanel.locator('.sp-stores a[href*="play.google.com"]')).toBeVisible();
    await expect(zonessoPanel.locator('.sp-web a[href="https://motors.zonesso.com"]')).toBeVisible();
    await expect(zonessoPanel.locator('.sp-metric')).toContainText('39% less code');

    // Keys On Rent has store links and 1,000+ installs metric
    const korPanel = page.locator('#panel-kor');
    await expect(korPanel.locator('.sp-metric')).toContainText('1,000+ installs');
    await expect(korPanel.locator('.sp-stores a[href*="apple.com"]')).toHaveCount(1);
    await expect(korPanel.locator('.sp-stores a[href*="play.google.com"]')).toHaveCount(1);

    // Eco Crew has store links and 50,000+ downloads metric
    const ecoPanel = page.locator('#panel-eco');
    await expect(ecoPanel.locator('.sp-metric')).toContainText('50,000+ downloads');
    await expect(ecoPanel.locator('.sp-stores a[href*="apple.com"]')).toHaveCount(1);
    await expect(ecoPanel.locator('.sp-stores a[href*="play.google.com"]')).toHaveCount(1);

    // Contact has direct GitHub, LinkedIn, and email
    const contact = page.locator('#contact');
    await expect(contact.locator('a[href="https://github.com/code-harmony0"]')).toBeVisible();
    await expect(contact.locator('a[href="https://www.linkedin.com/in/arfat-rozewale/"]')).toBeVisible();
    await expect(contact.locator('a[href="mailto:arfathrozewale8@gmail.com"]')).toBeVisible();
  });
});
