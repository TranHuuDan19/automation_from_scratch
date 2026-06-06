import { test as base } from '@playwright/test';
import { AdminPage } from '../pom/pages/adminPage';
import { CommonPage } from '../pom/pages/commonPage';
import { DashboardPage } from '../pom/pages/dashboardPage';
import { LoginPage } from '../pom/pages/loginPage';
import { PimPage } from '../pom/pages/pimPage';

type pageFixtures = {
    adminPage: AdminPage;
    commonPage: CommonPage;
    dashboardPage: DashboardPage;
    loginPage: LoginPage;
    pimPage: PimPage;
};

const test = base.extend<pageFixtures>({
  adminPage: async ({ page }, use) => {
    const adminPage = new AdminPage(page);
    await use(adminPage);
  },
  commonPage: async ({ page }, use) => {
    const commonPage = new CommonPage(page);
    await use(commonPage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
  pimPage: async ({ page }, use) => {
    const pimPage = new PimPage(page);
    await use(pimPage);
  },
});

export { test };
export { expect } from '@playwright/test';