import { expect, test } from '@playwright/test';
import env from '../../utils/config/env';
import { CommonPage } from '../pages/commonPage';
import { generateEmployeeInfo } from '../../utils/faker';
import { PAGE_TITLES, URL_PATHS } from '../../utils/constant';
import { PimPage } from '../pages/pimPage';

test.describe('add user', () => {
  let commonPage: CommonPage;
  let pimPage: PimPage;
  let employeeInfo: any;

  test.beforeEach(async ({ page }) => {
    test.info().setTimeout(360000);
    commonPage = new CommonPage(page);
    pimPage = new PimPage(page);
    await page.goto(env.baseURL);
    await page.waitForLoadState('load');
    await expect(page).toHaveTitle(PAGE_TITLES.orangeHrm);

    await commonPage.selectLeftSidebarMenuItem('PIM');
    await expect(page.url()).toContain(URL_PATHS.pim.employeeList);
    await expect(page).toHaveTitle(PAGE_TITLES.orangeHrm);
    await commonPage.selectMainMenuItem('Add Employee');
    await expect(page.url()).toContain(URL_PATHS.pim.addEmployee);
    await expect(page).toHaveTitle(PAGE_TITLES.orangeHrm);

    // setup data
    employeeInfo = await generateEmployeeInfo();
  });
  test('add user', { tag: '@smoke @regression' }, async () => {
    await commonPage.selectDropdownMainMenuItem('Configuration', 'Optional Fields');
    await expect(commonPage.page.url()).toContain(URL_PATHS.pim.configuration.optionalFields);
    await commonPage.selectDropdownMainMenuItem('Configuration', 'Data Import');
    await expect(commonPage.page.url()).toContain(URL_PATHS.pim.configuration.dataImport);
    await commonPage.selectMainMenuItem('Add Employee');
    await pimPage.addEmployee(employeeInfo);
    await expect(commonPage.page).toHaveTitle(PAGE_TITLES.orangeHrm);
    await commonPage.selectMainMenuItem('Employee List');
    await expect(commonPage.page.url()).toContain(URL_PATHS.pim.employeeList);
    await expect(commonPage.page).toHaveTitle(PAGE_TITLES.orangeHrm);
    await pimPage.verifyEmployeeExists(employeeInfo.employeeId);
  });
});
