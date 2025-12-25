import { Page } from '@playwright/test';
import { loginSelectors } from '../selectors/login.selectors';
import { UserCredentials } from '../models/user';

export class LoginPage {
  constructor(private page: Page) {}

  /**
   * Navigate to login page
   */
  async navigate() {
    await this.page.goto('/login');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Login using provided credentials
   */
  async login(credentials: UserCredentials) {
    await this.page.fill(loginSelectors.loginEmail, credentials.email);
    await this.page.fill(loginSelectors.loginPassword, credentials.password);
    await this.page.click(loginSelectors.loginButton);
    await this.page.waitForSelector(loginSelectors.loggedInUser);
  }

  /**
   * Check if user is logged in
   */
  async isLoggedIn(): Promise<boolean> {
    return this.page.locator(loginSelectors.loggedInUser).isVisible();
  }

  /**
   * Logout
   */
  async logout() {
    await this.page.click(loginSelectors.logoutLink);
    await this.page.waitForSelector(loginSelectors.loginLink);
  }
}
