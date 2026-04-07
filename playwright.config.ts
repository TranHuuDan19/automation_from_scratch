import { defineConfig, devices } from '@playwright/test';

const env = process.env.ENV || 'test';
const adminState = `admin.${env}.json`;

export default defineConfig({
  workers: 2,
  use: {
        headless: false,
        viewport: null,
        launchOptions: {
          slowMo: 100,
          args: ['--start-maximized']
        }
      },
  projects: [
    // {
    //   name: 'setup',
    //   testMatch: '**/utils/config/auth.setup.ts',
    // },
    {
      name: 'admin',
      testMatch: '**/pom/tests/*.spec.ts',
      // dependencies: ['setup'],
      use: { storageState: adminState },
    }
  ],
});
