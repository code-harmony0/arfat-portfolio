import { test, expect } from '@playwright/test';

const THREE = '/assets/vendor/three/';

function watch(page) {
  const errors = [];
  const three = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('request', (r) => { if (r.url().includes(THREE)) three.push(r.url()); });
  return { errors, three };
}

test.describe('hero 3D phones: desktop with a mouse', () => {
  test('loads WebGL phones, hides the CSS phones, no errors', async ({ page }) => {
    const seen = watch(page);
    await page.goto('/');
    const stage = page.locator('.hero-stage');
    await expect(stage).toHaveClass(/gl-on/, { timeout: 20000 });
    await expect(stage.locator('canvas')).toHaveCount(1);
    expect(seen.three.length).toBeGreaterThan(0);
    expect(seen.errors).toEqual([]);
  });
});

test.describe('hero 3D phones: fallbacks', () => {
  test.describe('phone-sized touch device', () => {
    test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
    test('keeps the CSS phones and never loads three.js', async ({ page }) => {
      const seen = watch(page);
      await page.goto('/');
      await page.waitForTimeout(3000);
      await expect(page.locator('.hero-stage canvas')).toHaveCount(0);
      await expect(page.locator('.hero-stage')).not.toHaveClass(/gl-on/);
      expect(seen.three).toEqual([]);
      expect(seen.errors).toEqual([]);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
      expect(overflow).toBe(false);
    });
  });

  test.describe('reduced motion', () => {
    test.use({ reducedMotion: 'reduce' });
    test('switches to the static page with no canvas and no three.js', async ({ page }) => {
      const seen = watch(page);
      await page.goto('/');
      await page.waitForTimeout(3000);
      await expect(page.locator('html')).toHaveClass(/static/);
      await expect(page.locator('.hero-stage canvas')).toHaveCount(0);
      expect(seen.three).toEqual([]);
      expect(seen.errors).toEqual([]);
    });
  });
});
