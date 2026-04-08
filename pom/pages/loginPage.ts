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

    async loginWithCredentials(username: string, password: string) {
        console.log("--- Logging in with credentials: ", { username, password });
        await waitAndInput(this.page, this.locators.userName, username);
        await waitAndInput(this.page, this.locators.password, password);
        await waitAndClick(this.page, this.locators.loginButton);
        await this.page.waitForURL(url => url.toString().includes('/dashboard'), { timeout: 15000 });
        await this.page.waitForLoadState('load');
    }

}