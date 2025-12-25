import { Page } from '@playwright/test';
import { loginSelectors } from '../selectors/login.selectors';
import { UserCredentials, UserRegistration } from '../models/user';

export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/login');
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Login existing user
  async login(credentials: UserCredentials) {
    await this.page.fill(loginSelectors.loginEmail, credentials.email);
    await this.page.fill(loginSelectors.loginPassword, credentials.password);
    await this.page.click(loginSelectors.loginButton);
    await this.page.waitForSelector(loginSelectors.loggedInUser);
  }

  // Signup new user
  async signup(user: UserRegistration) {
    await this.page.fill(loginSelectors.signupName, user.name);
    await this.page.fill(loginSelectors.signupEmail, user.email);
    await this.page.click(loginSelectors.signupButton);
  }

  async isLoggedIn(): Promise<boolean> {
    return this.page.locator(loginSelectors.loggedInUser).isVisible();
  }

  async logout() {
    await this.page.click(loginSelectors.logoutLink);
    await this.page.waitForSelector(loginSelectors.loginLink);
  }
}
