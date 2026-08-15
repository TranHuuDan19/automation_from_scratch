import { APIRequestContext } from '@playwright/test';
import { BaseClient } from './base.client';

export class EmployeeClient extends BaseClient {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async searchEmployee(employeeId: string) {
    // Note: This endpoint is an example for OrangeHRM. 
    // In a real project, this would be determined via Network tab.
    return this.get(`/web/index.php/api/v2/pim/employees?employeeId=${employeeId}`);
  }

  async createEmployee(employeeData: any) {
    return this.post('/web/index.php/api/v2/pim/employees', {
      data: employeeData,
    });
  }
}
