import { expect, test } from '../../fixtures/pageFixture';
import env from '../../utils/config/env';
import { PAGE_TITLES, URL_PATHS } from '../../utils/constant';
import { EmployeeFactory } from '../../utils/data/employee.factory';
import { Employee } from '../../types/employee';

test.describe('add user', () => {
  let employeeInfo: Employee;

  test.beforeEach(async ({ page, commonPage }) => {
    test.info().setTimeout(360000);
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
    employeeInfo = await EmployeeFactory.createEmployee();
  });

  test.afterEach(async ({ commonPage, pimPage }) => {
    // Cleanup: Delete the created employee
    await commonPage.selectLeftSidebarMenuItem('PIM');
    await commonPage.selectMainMenuItem('Employee List');
    await pimPage.deleteEmployee(employeeInfo.employeeId);
  });

  test('add user', { tag: '@smoke @regression' }, async ({ commonPage, pimPage }) => {
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
