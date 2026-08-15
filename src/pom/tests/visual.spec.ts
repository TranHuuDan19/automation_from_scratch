import { test, expect } from '@playwright/test';
import env from '../../utils/config/env';

// Do not use authentication state for this visual test
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Visual Regression Testing', () => {
  test('Login page visual snapshot', { tag: '@visual' }, async ({ page }) => {
    await page.goto(env.baseURL);
    await page.waitForLoadState('networkidle');
    
    // Hide dynamic elements if necessary (e.g., a rotating banner or time element)
    // await page.locator('.dynamic-content').evaluate(node => node.style.visibility = 'hidden');

    // Take a screenshot and compare it with the baseline
    // The first time you run this, it will fail and create the baseline images.
    // Subsequent runs will compare against those baselines.
    await expect(page).toHaveScreenshot('login-page.png', {
      maxDiffPixels: 100, // Allow small anti-aliasing differences
    });
  });
});
