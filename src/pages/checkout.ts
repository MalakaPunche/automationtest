import { Page } from '@playwright/test';
import { checkoutSelectors } from '../selectors/checkout';
import { CheckoutFormData } from '../models';

export class CheckoutPage {
  constructor(private page: Page) {}

  async fillCheckoutForm(data: CheckoutFormData) {
    await this.page.waitForSelector(checkoutSelectors.checkoutForm, { state: 'visible' });
    
    await this.page.fill(checkoutSelectors.firstName, data.firstName);
    await this.page.fill(checkoutSelectors.lastName, data.lastName);
    await this.page.fill(checkoutSelectors.address, data.address);
    await this.page.fill(checkoutSelectors.city, data.city);
    
    if (data.state && checkoutSelectors.state) {
      await this.page.fill(checkoutSelectors.state, data.state);
    }
    
    await this.page.fill(checkoutSelectors.zipCode, data.zipCode);
    await this.page.fill(checkoutSelectors.country, data.country);
    await this.page.fill(checkoutSelectors.mobileNumber, data.mobileNumber);
  }

  async submitCheckout() {
    await this.page.waitForSelector(checkoutSelectors.placeOrderButton, { state: 'visible' });
    await this.page.click(checkoutSelectors.placeOrderButton);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyCheckoutSummary(): Promise<boolean> {
    return await this.page.locator(checkoutSelectors.orderSummary).isVisible();
  }
}