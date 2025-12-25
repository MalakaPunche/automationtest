import { Page } from '@playwright/test';
import { checkoutSelectors } from '../selectors/checkout.selectors';

export class CheckoutPage {
  constructor(private page: Page) {}

  async addComment(comment: string) {
    await this.page.fill(checkoutSelectors.commentTextarea, comment);
  }

  async placeOrder() {
    await this.page.click(checkoutSelectors.placeOrderButton);
    await this.page.waitForLoadState('domcontentloaded');
  }
}
