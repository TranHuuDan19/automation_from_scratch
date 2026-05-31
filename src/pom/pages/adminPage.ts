import { Page } from '@playwright/test';
import { AdminLocators } from '../locators/adminLocator';

export class AdminPage {
  locators: Record<string, string>;
  page: Page;

  constructor(page: Page) {
    this.page = page;
    this.locators = AdminLocators;
  }
}
