// // import path from 'path';
// // import fs from 'fs';
// // import { test as base, expect } from '@playwright/test';
// // import { LoginPage } from '../pages/login';

// // const STORAGE_STATE = path.resolve('playwright/.auth/user.json');

// // // Hardcoded credentials
// // const HARDCODED_USER = {
// //   email: 'email999@gmail.com',
// //   password: 'Password999!',
// // };

// // export const test = base.extend({
// //   storageState: async ({ browser }, use) => {
// //     // Use existing storage state if available
// //     if (fs.existsSync(STORAGE_STATE)) {
// //       await use(STORAGE_STATE);
// //       return;
// //     }

// //     // Create new browser context
// //     const context = await browser.newContext();
// //     const page = await context.newPage();

// //     // Login using hardcoded credentials
// //     const login = new LoginPage(page);
// //     await login.navigate();
// //     await login.login(HARDCODED_USER);

// //     // Verify login succeeded
// //     await expect(page.locator('a:has-text("Logged in as")')).toBeVisible();

// //     // Save storage state for reuse
// //     await context.storageState({ path: STORAGE_STATE });
// //     await context.close();

// //     await use(STORAGE_STATE);
// //   },
// // });

// // export { expect };

// import path from 'path';
// import fs from 'fs';
// import { test as base, expect } from '@playwright/test';
// import { LoginPage } from '../pages/login';

// const STORAGE_STATE = path.resolve('playwright/.auth/user.json');

// export const test = base.extend({
//   storageState: async ({ browser }, use) => {
//     if (fs.existsSync(STORAGE_STATE)) {
//       await use(STORAGE_STATE);
//       return;
//     }

//     const context = await browser.newContext({
//       baseURL: 'https://automationexercise.com', // <-- important
//     });
//     const page = await context.newPage();

//     // Login with hardcoded credentials
//     const login = new LoginPage(page);
//     await login.login({ email: 'email999@gmail.com', password: 'Password999!' });

//     await expect(page.locator('a:has-text("Logged in as")')).toBeVisible();

//     await context.storageState({ path: STORAGE_STATE });
//     await context.close();

//     await use(STORAGE_STATE);
//   },
// });

// export { expect };

// src/fixtures/sessions.ts
import path from 'path';
import fs from 'fs';
import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';

const STORAGE_STATE_PATH = path.resolve('playwright/.auth/user.json');

// Hardcoded credentials
const HARDCODED_USER = {
  email: 'email999@gmail.com',
  password: 'Password999!',
};

type AuthFixtures = {
  storageStatePath: string;
};

export const test = base.extend<AuthFixtures>({
  storageStatePath: async ({ browser }, use) => {
    // If storage state already exists, reuse it
    if (fs.existsSync(STORAGE_STATE_PATH)) {
      await use(STORAGE_STATE_PATH);
      return;
    }

    // Otherwise, create new context and login
    const context = await browser.newContext({
      baseURL: 'https://automationexercise.com', // required for relative URLs
    });
    const page = await context.newPage();

    // Navigate to login page
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

    // Perform login with hardcoded credentials
    await loginPage.login(HARDCODED_USER);

    // Verify login succeeded
    await expect(page.locator('a:has-text("Logged in as")')).toBeVisible();

    // Save storage state for reuse
    await fs.promises.mkdir(path.dirname(STORAGE_STATE_PATH), { recursive: true });
    await context.storageState({ path: STORAGE_STATE_PATH });
    await context.close();

    // Provide storage state path to tests
    await use(STORAGE_STATE_PATH);
  },
});

export { expect };
