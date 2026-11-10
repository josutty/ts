import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('/telemetry/:tripId', () => {
  test('renders with no serious a11y violations, overflow, or console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });

    await page.goto('/telemetry/demo-trip');
    await expect(page.getByRole('heading', { level: 1, name: 'Live Telemetry' })).toBeVisible();
    await expect(page.getByText('SIMULATED TELEMETRY')).toBeVisible();

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

  test('dark mode remains accessible', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/telemetry/demo-trip');
    await expect(page.getByRole('heading', { level: 1, name: 'Live Telemetry' })).toBeVisible();

    const { violations } = await new AxeBuilder({ page }).withTags(['wcag2aa']).analyze();
    expect(violations.filter((violation) => violation.impact === 'serious' || violation.impact === 'critical')).toEqual(
      [],
    );
  });

  test('fits the mobile viewport without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/telemetry/demo-trip');

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
  });
});
