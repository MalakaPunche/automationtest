import { Page } from '@playwright/test';
import { loginSelectors } from '../selectors/login';
import { UserCredentials } from '../models';

export class LoginPage {
  constructor(private page: Page) {}

  async navigateToLogin() {
    await this.page.goto('/login');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async login(credentials: UserCredentials) {
    await this.page.waitForSelector(loginSelectors.emailInput, { state: 'visible' });
    await this.page.fill(loginSelectors.emailInput, credentials.email);
    await this.page.fill(loginSelectors.passwordInput, credentials.password);
    await this.page.click(loginSelectors.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.page.locator(loginSelectors.loggedInUser).isVisible();
  }
}