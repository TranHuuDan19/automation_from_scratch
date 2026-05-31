import { Page } from '@playwright/test';
import { DashboardLocator } from '../locators/dashboardLocator';

export class DashboardPage {
  locators: Record<string, string>;
  page: Page;

  constructor(page: Page) {
    this.page = page;
    this.locators = DashboardLocator;
  }
}
