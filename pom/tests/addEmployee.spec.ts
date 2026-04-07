import { test } from '@playwright/test';
import { getEnvironmentValue } from '../../env';
import { CommonPage } from '../pages/commonPage';
import { generateEmployee } from '../../utils/faker';

test.describe('add user', () => {
  const role = 'user';
  const userLoginInfo = getEnvironmentValue(role);
  let commonPage : CommonPage;
  let employee: any;

  test.beforeEach(async ({ page }) => {
    commonPage = new CommonPage(page);
    console.log(`--- Starting test: ${test.info().title}`);
    await page.goto(userLoginInfo.baseURL, { waitUntil: 'networkidle' });
    await commonPage.selectLeftSidebarMenuItem('PIM');
    await commonPage.selectMainMenuItem('Add Employee');

    // setup data
    employee = generateEmployee();
    console.log(employee);
  });
  test('add user', async () => {
    // await commonPage.inputValueToFieldWithHints('Employee Name','Test','Test Automation');
    // await commonPage.selectDropdownValue('Sub Unit','Engineering');
    // await commonPage.inputValueToFieldWithPlaceholder('First Name', employee.firstName);
    // await commonPage.inputValueToFieldWithPlaceholder('Middle Name', employee.middleName);
    // await commonPage.inputValueToFieldWithPlaceholder('Last Name', employee.lastName);
    await commonPage.checkBoxWithLabel('Create Login Details');
    // await commonPage.inputValueToField('Username',employee.username)
    // await commonPage.inputValueToField('Password',employee.password)
    // await commonPage.inputValueToField('Confirm Password',employee.confirmPassword)
    // await commonPage.clickOnActionbutton('Save');
    await commonPage.radioCheckWithLabel('Status',employee.status);
  });
});
