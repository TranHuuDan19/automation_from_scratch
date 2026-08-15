import { expect, test } from '../../fixtures/pageFixture';
import env from '../../utils/config/env';

// This test runs without storage state as we are testing the login page
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(env.baseURL);
  });

  test('should show error for invalid credentials', { tag: '@regression' }, async ({ loginPage, page }) => {
    await loginPage.login('invalidUser', 'invalidPass');
    
    // Assert that the error message is visible
    const errorMessage = page.locator(loginPage.locators.errorMessage);
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Invalid credentials');
  });

  test('should show required validation for missing username', { tag: '@regression' }, async ({ loginPage, page }) => {
    await loginPage.login('', 'admin123');
    
    // The required message should appear for the username field
    // It's usually the first required message
    const requiredMessages = page.locator(loginPage.locators.requiredMessage);
    await expect(requiredMessages.first()).toBeVisible();
    await expect(requiredMessages.first()).toContainText('Required');
  });

  test('should show required validation for missing password', { tag: '@regression' }, async ({ loginPage, page }) => {
    await loginPage.login('Admin', '');
    
    // Since username is filled, the password field's required message should show
    const requiredMessages = page.locator(loginPage.locators.requiredMessage);
    await expect(requiredMessages.first()).toBeVisible();
    await expect(requiredMessages.first()).toContainText('Required');
  });
});
