import { expect, test } from '../../fixtures/pageFixture';
import env from '../../utils/config/env';
import { PAGE_TITLES, URL_PATHS } from '../../utils/constant';

test.describe('Add Employee Validation', () => {
  test.beforeEach(async ({ page, commonPage }) => {
    test.info().setTimeout(360000);
    await page.goto(env.baseURL);
    await page.waitForLoadState('load');
    await expect(page).toHaveTitle(PAGE_TITLES.orangeHrm);

    await commonPage.selectLeftSidebarMenuItem('PIM');
    await expect(page.url()).toContain(URL_PATHS.pim.employeeList);
    await commonPage.selectMainMenuItem('Add Employee');
    await expect(page.url()).toContain(URL_PATHS.pim.addEmployee);
  });

  test('should show required validation for missing first and last name', { tag: '@regression' }, async ({ commonPage, page }) => {
    // Click Save without entering any data
    await commonPage.clickOnActionButton('Save');

    // Assert that the required error messages appear for First and Last Name
    const errorMessages = page.locator(commonPage.locators.errorMessage);
    // There should be at least two error messages (First Name, Last Name)
    await expect(errorMessages.first()).toBeVisible();
    await expect(errorMessages.nth(0)).toContainText('Required');
    await expect(errorMessages.nth(1)).toContainText('Required');
  });

  test('should show validation error for password mismatch', { tag: '@regression' }, async ({ commonPage, pimPage, page }) => {
    // Fill in basic employee data
    await pimPage.inputValueToFieldWithPlaceholder('First Name', 'Test');
    await pimPage.inputValueToFieldWithPlaceholder('Last Name', 'User');
    
    // Enable create login details
    await pimPage.checkBoxWithLabel('Create Login Details');
    await pimPage.inputValueToField('Username', `testuser${Date.now()}`);
    
    // Enter mismatched passwords
    await pimPage.inputValueToField('Password', 'Password123!');
    await pimPage.inputValueToField('Confirm Password', 'Password1234!');
    
    // Click Save
    await commonPage.clickOnActionButton('Save');

    // Assert password mismatch error
    const errorMessage = page.locator(commonPage.locators.errorMessage).filter({ hasText: 'Passwords do not match' });
    await expect(errorMessage).toBeVisible();
  });
});
