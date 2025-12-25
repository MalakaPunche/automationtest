import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Test Configuration
 * 
 * - Test files are in /tests
 * - Base URL set to automationexercise.com
 * - HTML report enabled
 * - Traces on first retry
 * - Screenshots on failure
 */

export default defineConfig({
  testDir: './tests',           // test folder
  fullyParallel: true,          // run tests in files in parallel
  forbidOnly: !!process.env.CI, // fail build if test.only left
  retries: process.env.CI ? 2 : 0, 
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',             // HTML report
  use: {
    baseURL: 'https://automationexercise.com', // ✅ required for relative URLs
    trace: 'on-first-retry',                  // collect trace on retry
    screenshot: 'only-on-failure',           // capture screenshots on failure
    headless: false,                          // set true in CI
    viewport: { width: 1280, height: 720 },
    actionTimeout: 15_000,                    // max time per action
    ignoreHTTPSErrors: true,                  // ignore HTTPS issues if any
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  // Optional: run a local web server before tests
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
