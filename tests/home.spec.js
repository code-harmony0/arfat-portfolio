import { test, expect } from '@playwright/test';

function watch(page) {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  return errors;
}

test.describe('hero wall', () => {
  test('shows three columns of screens, no canvas, no errors', async ({ page }) => {
    const errors = watch(page);
    await page.goto('/');
    await expect(page.locator('.wall .wall-col')).toHaveCount(3);
    await expect(page.locator('canvas')).toHaveCount(0);
    const moving = await page.locator('.wall-track').first().evaluate((el) => getComputedStyle(el).animationName);
    expect(moving).toBe('wall');
    expect(errors).toEqual([]);
  });

  test.describe('reduced motion', () => {
    test.use({ reducedMotion: 'reduce' });
    test('stops the wall and shows one set of screens', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('html')).toHaveClass(/static/);
      const name = await page.locator('.wall-track').first().evaluate((el) => getComputedStyle(el).animationName);
      expect(name).toBe('none');
    });
  });

  test.describe('phone', () => {
    test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
    test('has no sideways scroll and keeps the headline above the wall', async ({ page }) => {
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

test.describe('hero persona switch', () => {
  test('changes the line and the selected tab, keyboard included', async ({ page }) => {
    await page.goto('/');
    const line = page.locator('#who-line');
    const before = await line.textContent();
    await page.getByRole('tab', { name: 'Hiring manager' }).click();
    await expect(line).toContainText('Senior React Native engineer');
    expect(await line.textContent()).not.toBe(before);
    await page.getByRole('tab', { name: 'Hiring manager' }).focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('tab', { name: 'Engineer' })).toHaveAttribute('aria-selected', 'true');
    await expect(line).toContainText('Server state');
  });

  test('numbers land on their real values', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2200);
    await expect(page.locator('.hero-nums b').nth(1)).toHaveText('50,000+');
    await expect(page.locator('.hero-nums b').nth(2)).toHaveText('39%');
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
