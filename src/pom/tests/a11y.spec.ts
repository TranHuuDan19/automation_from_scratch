import { expect, test } from '../../fixtures/pageFixture';
import AxeBuilder from '@axe-core/playwright';
import env from '../../utils/config/env';

test.describe('Accessibility Testing (a11y)', () => {
  test('should not have any automatically detectable accessibility issues on Dashboard', { tag: '@regression @a11y' }, async ({ page }) => {
    // Navigate to dashboard (storageState handles login)
    await page.goto(env.baseURL);
    await page.waitForURL((url) => url.toString().includes('/dashboard'));
    await page.waitForLoadState('networkidle');

    // Run axe-core to scan for a11y violations
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    // In a real enterprise app, we might have some known violations we haven't fixed yet.
    // For portfolio purposes, we assert there are 0 violations, or you can log them:
    // console.log(accessibilityScanResults.violations);
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
