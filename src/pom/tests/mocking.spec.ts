import { expect, test } from '../../fixtures/pageFixture';
import env from '../../utils/config/env';
import { URL_PATHS } from '../../utils/constant';

test.describe('Network Mocking / Stubbing', () => {
  test.beforeEach(async ({ page, commonPage }) => {
    await page.goto(env.baseURL);
    await commonPage.selectLeftSidebarMenuItem('PIM');
    await expect(page.url()).toContain(URL_PATHS.pim.employeeList);
  });

  test('should mock employee list to show "No Records Found"', { tag: '@mocking' }, async ({ page, pimPage }) => {
    // Intercept the API call that fetches employees
    await page.route('**/api/v2/pim/employees**', async (route) => {
      // Fulfill the request with a mocked response (empty data)
      const json = {
        data: [],
        meta: { total: 0 }
      };
      await route.fulfill({ json });
    });

    // Trigger the search action on the UI
    await pimPage.clickOnActionButton('Search');

    // Assert that the UI responds correctly to the mocked data
    const noRecordsFound = page.locator(pimPage.pimLocators.noRecordsFound);
    await expect(noRecordsFound).toBeVisible({ timeout: 10000 });
  });
});
