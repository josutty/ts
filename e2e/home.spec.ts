import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('/ (home)', () => {
  test('renders the vehicle discovery route, is accessible, and does not overflow', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });

    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1, name: 'Find Your Vehicle' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'View Driver Scores →' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Explore Eicher Vehicles' })).toBeVisible();

    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(violations.filter((violation) => violation.impact === 'serious' || violation.impact === 'critical')).toEqual(
      [],
    );

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
    expect(consoleErrors).toEqual([]);
  });

  test('keeps the route accessible in dark mode', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1, name: 'Find Your Vehicle' })).toBeVisible();

    const { violations } = await new AxeBuilder({ page }).withTags(['wcag2aa']).analyze();
    expect(violations.filter((violation) => violation.impact === 'serious' || violation.impact === 'critical')).toEqual(
      [],
    );
  });

  test('stacks the discovery content without horizontal overflow on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1, name: 'Find Your Vehicle' })).toBeVisible();

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
  });
});
