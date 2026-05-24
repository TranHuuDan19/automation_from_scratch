import { expect, Page } from '@playwright/test';
import { SearchEmployeeResultLocators } from '../locators/pimLocator';
import { CommonPage } from './commonPage';

export class PimPage extends CommonPage {
  pimLocators: Record<string, string>;
  page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.pimLocators = {
      ...SearchEmployeeResultLocators,
    };
  }

  async addEmployee(employee: any) {
    await this.inputValueToFieldWithPlaceholder('First Name', employee.firstName);
    await this.inputValueToFieldWithPlaceholder('Middle Name', employee.middleName);
    await this.inputValueToFieldWithPlaceholder('Last Name', employee.lastName);
    await this.inputValueToField('Employee Id', employee.employeeId);
    await this.checkBoxWithLabel('Create Login Details');
    await this.inputValueToField('Username', employee.username);
    await this.inputValueToField('Password', employee.password);
    await this.inputValueToField('Confirm Password', employee.confirmPassword);
    await this.radioCheckWithLabel('Status', employee.status);
    await this.clickOnActionButton('Save');
    await this.page.waitForURL((url) => !url.toString().includes('addEmployee'));
    await expect(this.page).toHaveURL(/\/pim\/viewPersonalDetails\/empNumber\/\d+/, {
      timeout: 30000,
    });
  }

  async verifyEmployeeExists(employeeId: string) {
    await this.inputValueToField('Employee Id', employeeId);
    await this.clickOnActionButton('Search');

    const tableLoader = this.page.locator(this.pimLocators.tableLoader);
    const employeeRow = this.page
      .locator(this.pimLocators.employeeTableRow)
      .filter({ hasText: employeeId })
      .first();
    const noRecordsFound = this.page.locator(this.pimLocators.noRecordsFound);

    await expect(tableLoader).toBeHidden({ timeout: 30000 });
    await expect(noRecordsFound).toBeHidden({ timeout: 30000 });
    await expect(employeeRow).toBeVisible({ timeout: 30000 });
    await expect(employeeRow).toContainText(employeeId);
  }
}
