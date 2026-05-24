import { test as setup, chromium } from '@playwright/test';
import env from './env';
import { LoginPage } from '../../pom/pages/loginPage';

setup('Setup Login For Authentication', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const loginPage = new LoginPage(page);

  await page.goto(env.baseURL);
  await page.waitForLoadState('load');
  await loginPage.loginWithCredentials(env.username, env.password);
  await page.context().storageState({ path: `storage/auth-${process.env.NODE_ENV}.json` });

  await page.close();
  await context.close();
  await browser.close();
});
