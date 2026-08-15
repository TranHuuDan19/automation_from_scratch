import { Page } from '@playwright/test';
import { LoginLocator } from '../locators/loginLocator';
import { waitAndClick, waitAndInput } from '../../utils/helper';

export class LoginPage {
  locators: Record<string, string>;
  page: Page;

  constructor(page: Page) {
    this.page = page;
    this.locators = LoginLocator;
  }

  async login(username?: string, password?: string) {
    await this.page.waitForLoadState('load');
    if (username) {
        await waitAndInput(this.page, this.locators.userName, username);
    }
    if (password) {
        await waitAndInput(this.page, this.locators.password, password);
    }
    await waitAndClick(this.page, this.locators.loginButton);
  }

  async loginWithCredentials(username: string, password: string) {
    await this.login(username, password);
    await this.page.waitForURL((url) => url.toString().includes('/dashboard'), { timeout: 30000 });
    await this.page.waitForLoadState('load');
  }
}
