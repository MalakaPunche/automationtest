// import { Page } from '@playwright/test';
// import { checkoutSelectors } from '../selectors/checkout.selectors';

// export class CheckoutPage {
//   constructor(private page: Page) {}

//   async addComment(comment: string) {
//     await this.page.fill(checkoutSelectors.commentTextarea, comment);
//   }

//   async placeOrder() {
//     await this.page.click(checkoutSelectors.placeOrderButton);
//     await this.page.waitForLoadState('domcontentloaded');
//   }
// }

import { Page } from '@playwright/test';
import { checkoutSelectors } from '../selectors/checkout.selectors';

export class CheckoutPage {
  constructor(private page: Page) {}

  async verifyCheckoutPageVisible(): Promise<boolean> {
    await this.page.waitForSelector(checkoutSelectors.checkoutInfo);
    return this.page.locator(checkoutSelectors.checkoutInfo).isVisible();
  }

  async addComment(comment: string) {
    await this.page.fill(checkoutSelectors.commentTextarea, comment);
  }

  async placeOrder() {
    await this.page.waitForSelector(checkoutSelectors.placeOrderButton);
    await this.page.click(checkoutSelectors.placeOrderButton);
  }
}
