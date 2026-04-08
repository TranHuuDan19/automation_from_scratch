import { defineConfig } from '@playwright/test';
import env from './utils/config/env' 

export default defineConfig({
  outputDir: './test-results/artifacts/',
  workers: process.env.CI ? 4 : 2,
  retries: process.env.CI ? 3 : 0,
  use: {
        headless: process.env.CI ? true : false,
        viewport: null,
        launchOptions: {
          slowMo: process.env.CI ? 0 : 100,
          args: ['--start-maximized']
        },
        baseURL: env.baseURL,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',  
      },
  projects: [
    {
      name: 'setup',
      testMatch: '**/utils/config/auth.setup.ts',
    },
    {
      name: 'run test',
      testMatch: '**/pom/tests/*.spec.ts',
      dependencies: ['setup'],
      use: { storageState: `storage/auth-${process.env.NODE_ENV}.json` },
    }
  ],
  reporter: [
    [
      "html",
      {
        open: "never",
        outputFolder: './playwright-report/', 
      },
    ],
  ],
});
