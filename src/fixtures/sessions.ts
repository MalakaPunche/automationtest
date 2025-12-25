import path from 'path';
import fs from 'fs';
import { test as base, expect } from '@playwright/test';
import { loginSelectors } from '../selectors/login';
import type { UserCredentials } from '../models/user';

type AuthFixtures = {
  authUser: UserCredentials;
  storageState: string;
};

const BASE_URL = 'https://automationexercise.com';
const STORAGE_STATE_PATH = path.join('playwright', '.auth', 'user.json');

const DEFAULT_USER: UserCredentials = {
  email: process.env.TEST_USER_EMAIL || 'replace-me@example.com',
  password: process.env.TEST_USER_PASSWORD || 'replace-me',
};

/**
 * Provides an authenticated storage state that can be reused across tests.
 * Usage:
 *   import { test } from '../src/fixtures/sessions';
 *   test('my test', async ({ page, storageState }) => { ... });
 */
export const test = base.extend<AuthFixtures>({
  authUser: [DEFAULT_USER, { option: true }],

  storageState: [
    async ({ browser, authUser }, use) => {
      await fs.promises.mkdir(path.dirname(STORAGE_STATE_PATH), { recursive: true });

      const context = await browser.newContext({ baseURL: BASE_URL });
      const page = await context.newPage();

      // Navigate and log in
      await page.goto(`${BASE_URL}/login`);
      await page.waitForSelector(loginSelectors.loginEmail, { state: 'visible' });
      await page.fill(loginSelectors.loginEmail, authUser.email);
      await page.fill(loginSelectors.loginPassword, authUser.password);
      await page.click(loginSelectors.loginButton);

      // Verify login succeeded
      await expect(page.locator(loginSelectors.loggedInUser)).toBeVisible({ timeout: 10000 });

      // Persist storage state for reuse
      await context.storageState({ path: STORAGE_STATE_PATH });
      await context.close();

      await use(STORAGE_STATE_PATH);
    },
    { scope: 'worker' },
  ],
});

export const expect = base.expect;
// src/fixtures/sessions.ts
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    // Login logic here
    const loginPage = new LoginPage(page);
    await page.goto('https://automationexercise.com/');
    await loginPage.login(
      process.env.TEST_EMAIL!, 
      process.env.TEST_PASSWORD!
    );
    await use(page);
  },
});

export { expect } from '@playwright/test';
```

---

#### **2. Environment Variables (.env file)**
**Location:** Root directory `.env`

**What you need:**
```
TEST_EMAIL=your_registered_email@example.com
TEST_PASSWORD=your_password