import { test as setup, chromium } from '@playwright/test';
import { getEnvironmentValue } from '../../env';
import { LoginPage } from '../../pom/pages/loginPage';
import { CommonPage } from '../../pom/pages/commonPage';

setup('Setup user authentication', async () => {
    const env = process.env.NODE_ENV || 'test';
    const role = 'admin';
    const browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const loginInfo = getEnvironmentValue(role);

    if (!loginInfo.loginUsername || !loginInfo.loginPassword) {
        throw new Error('Environment login credentials are required');
    }

    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);

    await page.goto(loginInfo.baseURL, { waitUntil: 'networkidle' });
    await loginPage.loginWithCredentials(loginInfo.loginUsername, loginInfo.loginPassword);
    await page.context().storageState({ path: `${role}.${env}.json` });

    await page.close();
    await context.close();
    await browser.close();
});