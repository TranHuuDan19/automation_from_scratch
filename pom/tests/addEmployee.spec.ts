import { test } from '@playwright/test';
import env from '../../utils/config/env';
import { CommonPage } from '../pages/commonPage';
import { generateEmployee } from '../../utils/faker';

test.describe('add user', () => {
  let commonPage : CommonPage;
  let employee: any;

  test.beforeEach(async ({ page }) => {
    commonPage = new CommonPage(page);
    await page.goto(env.baseURL, { waitUntil: 'load' });
    await commonPage.selectLeftSidebarMenuItem('PIM');
    await commonPage.selectMainMenuItem('Add Employee');

    // setup data
    employee = generateEmployee();
  });
  test('add user',{tag: '@smoke' }, async () => {
    await commonPage.inputValueToFieldWithPlaceholder('First Name', employee.firstName);
    await commonPage.inputValueToFieldWithPlaceholder('Middle Name', employee.middleName);
    await commonPage.inputValueToFieldWithPlaceholder('Last Name', employee.lastName);
    await commonPage.inputValueToField('Employee Id',employee.employeeId)
    await commonPage.checkBoxWithLabel('Create Login Details');
    await commonPage.inputValueToField('Username',employee.username)
    await commonPage.inputValueToField('Password',employee.password)
    await commonPage.inputValueToField('Confirm Password',employee.confirmPassword)
    await commonPage.radioCheckWithLabel('Status',employee.status);
    await commonPage.clickOnActionbutton('Save');
    await commonPage.page.waitForURL(url => !url.toString().includes('addEmployee'));

    await commonPage.selectMainMenuItem('Employee List');
    await commonPage.inputValueToField('Employee Id',employee.employeeId);
    await commonPage.clickOnActionbutton('Search');

  });
});
