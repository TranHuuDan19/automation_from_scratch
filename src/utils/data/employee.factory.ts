import { generateEmployeeInfo } from '../faker';
import { Employee } from '../../types/employee';

export class EmployeeFactory {
  static async createEmployee(): Promise<Employee> {
    const rawData = await generateEmployeeInfo();
    return rawData as Employee;
  }
}
