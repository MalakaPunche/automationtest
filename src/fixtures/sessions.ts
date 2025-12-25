import path from 'path';
import fs from 'fs';
import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
// import { RegisterPage } from '../pages/login';

const STORAGE_STATE = path.resolve('playwright/.auth/user.json');

export const test = base.extend({
  storageState: async ({ browser }, use) => {
    if (fs.existsSync(STORAGE_STATE)) {
      await use(STORAGE_STATE);
      return;
    }

    const context = await browser.newContext();
    const page = await context.newPage();

    // Register new user
    const register = new RegisterPage(page);
    await register.registerRandomUser();

    // Login
    const login = new LoginPage(page);
    await login.loginWithRegisteredUser();

    await expect(page.locator('a:has-text("Logged in as")')).toBeVisible();

    await context.storageState({ path: STORAGE_STATE });
    await context.close();

    await use(STORAGE_STATE);
  },
});

export { expect };
