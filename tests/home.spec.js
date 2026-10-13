import { test, expect } from '@playwright/test';

function watch(page) {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  return errors;
}

test.describe('adaptive hero', () => {
  test('starts on the hiring-manager scene with no canvas and no errors', async ({ page }) => {
    const errors = watch(page);
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-who', 'hiring');
    await expect(page.locator('.sc-hiring')).toHaveClass(/on/);
    await expect(page.locator('canvas')).toHaveCount(0);
    expect(errors).toEqual([]);
  });

  test('each reader gets a different scene, headline, proof and accent', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('tab', { name: 'Founder' }).click();
    await expect(page.locator('#h1-line')).toContainText('both stores');
    await expect(page.locator('.sc-founder')).toHaveClass(/on/);
    await expect(page.locator('.sc-hiring')).not.toHaveClass(/on/);
    await expect(page.locator('html')).toHaveAttribute('data-who', 'founder');
    const founderAccent = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--tone').trim());

    await page.getByRole('tab', { name: 'Engineer' }).click();
    await expect(page.locator('#h1-line')).toContainText('One checkout');
    await expect(page.locator('.sc-eng')).toHaveClass(/on/);
    await expect(page.locator('#cta-label')).toHaveText('See the teardown');
    await page.waitForTimeout(1600);
    await expect(page.locator('.hero-nums b').first()).toHaveText('39%');
    await page.waitForTimeout(900);
    const engAccent = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--tone').trim());
    expect(engAccent).not.toBe(founderAccent);
  });

  test('keyboard arrows switch the reader', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('tab', { name: 'Hiring manager' }).focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('tab', { name: 'Engineer' })).toHaveAttribute('aria-selected', 'true');
  });

  test.describe('reduced motion', () => {
    test.use({ reducedMotion: 'reduce' });
    test('turns off the auto-cycle and entrance motion', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('html')).toHaveClass(/static/);
      await page.waitForTimeout(9000);
      await expect(page.locator('html')).toHaveAttribute('data-who', 'hiring');
    });
  });

  test.describe('phone', () => {
    test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
    test('has no sideways scroll and shows the headline', async ({ page }) => {
      await page.goto('/');
      expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    });
  });
});

test.describe('icon shelf', () => {
  test('has seven tabs and swaps the big screen on click', async ({ page }) => {
    await page.goto('/');
    const tabs = page.locator('.shelf [role="tab"]');
    await expect(tabs).toHaveCount(7);
    await tabs.nth(2).click();
    await expect(page.locator('#panel-eco')).toBeVisible();
    await expect(page.locator('#panel-zonesso')).toBeHidden();
    await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'true');
  });

  test('moves with the arrow keys and stops auto-advance after a touch', async ({ page }) => {
    await page.goto('/');
    const first = page.locator('#tab-zonesso');
    await first.focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#tab-kor')).toHaveAttribute('aria-selected', 'true');
    await page.waitForTimeout(7000);
    await expect(page.locator('#tab-kor')).toHaveAttribute('aria-selected', 'true');
  });

  test('every case-study link in the shelf resolves', async ({ page, request }) => {
    await page.goto('/');
    const hrefs = await page.locator('.shelf .sp-link').evaluateAll((els) => els.map((e) => e.getAttribute('href')));
    expect(hrefs.length).toBe(6);
    for (const h of hrefs) {
      const res = await request.get(h + '/');
      expect(res.status(), h).toBe(200);
    }
  });
});

test.describe('page structure', () => {
  test('keeps the home page focused and marks the section in view', async ({ page }) => {
    await page.goto('/');
    const ids = await page.locator('main > section').evaluateAll((els) => els.map((e) => e.id).filter(Boolean));
    expect(ids).toEqual(['top', 'shipped', 'web', 'cases', 'teardown', 'mobile', 'contact']);
    await page.locator('#web').scrollIntoViewIfNeeded();
    await page.evaluate(() => document.querySelector('#web').scrollIntoView());
    await expect(page.locator('.nav-links a[aria-current="true"]')).toHaveText('Web');
  });
});
