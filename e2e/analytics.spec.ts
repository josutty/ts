import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const seriousViolations = (violations: { impact?: string | null }[]) =>
  violations.filter((violation) => violation.impact === 'serious' || violation.impact === 'critical');

test.describe('/analytics/:tripId', () => {
  test('renders the analytics result without overflow, console errors, or serious a11y violations', async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });

    await page.goto('/analytics/demo-trip');
    await expect(page.getByRole('heading', { level: 1, name: 'Driver Analytics' })).toBeVisible();
    await expect(page.getByRole('button', { name: '↓ Download Certificate' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Exit to Home' })).toBeVisible();

    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(seriousViolations(violations)).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
    expect(consoleErrors).toEqual([]);
  });

  test('keeps the analytics result accessible in dark mode', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/analytics/demo-trip');
    await expect(page.getByRole('heading', { level: 1, name: 'Driver Analytics' })).toBeVisible();
    const { violations } = await new AxeBuilder({ page }).withTags(['wcag2aa']).analyze();
    expect(seriousViolations(violations)).toEqual([]);
  });

  test('fits a mobile viewport without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/analytics/demo-trip');
    await expect(page.getByRole('heading', { level: 1, name: 'Driver Analytics' })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
  });
});
