<<<<<<< HEAD
import { defineConfig } from '@playwright/test';
=======
import { defineConfig, devices } from '@playwright/test';
>>>>>>> feat/week6-remaining-task
import env from './src/utils/config/env';

export default defineConfig({
  timeout: 100000,
  outputDir: './test-results/artifacts/',
  workers: process.env.CI ? '100%' : 2,
  retries: process.env.CI ? 1 : 0,
  use: {
    headless: process.env.CI ? true : false,
    viewport: process.env.CI ? { width: 1920, height: 1080 } : null,
    launchOptions: {
      slowMo: process.env.CI ? 0 : 10,
      args: process.env.CI ? [] : ['--start-maximized'],
    },
    baseURL: env.baseURL,
    screenshot: 'only-on-failure',
    video: process.env.CI ? 'off' : 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'setup',
      testMatch: 'src/utils/config/auth.setup.ts',
    },
    {
<<<<<<< HEAD
      name: 'run test',
      testMatch: 'src/pom/tests/*.spec.ts',
      dependencies: ['setup'],
      use: { storageState: `storage/auth-${process.env.NODE_ENV}.json` },
=======
      name: 'chromium',
      testMatch: 'src/**/*.spec.ts',
      dependencies: ['setup'],
      use: { 
        browserName: 'chromium',
        storageState: `storage/auth-${process.env.NODE_ENV}.json` 
      },
    },
    {
      name: 'firefox',
      testMatch: 'src/**/*.spec.ts',
      dependencies: ['setup'],
      use: { 
        browserName: 'firefox',
        storageState: `storage/auth-${process.env.NODE_ENV}.json` 
      },
    },
    {
      name: 'Mobile Chrome',
      testMatch: 'src/**/*.spec.ts',
      dependencies: ['setup'],
      use: { 
        ...devices['Pixel 5'],
        storageState: `storage/auth-${process.env.NODE_ENV}.json` 
      },
>>>>>>> feat/week6-remaining-task
    },
  ],
  reporter: [
    [
      'html',
      {
        open: 'never',
        outputFolder: './playwright-report/',
      },
    ],
  ],
});
