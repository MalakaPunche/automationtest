import { Page } from '@playwright/test';
import { paymentSelectors } from '../selectors/payment.selectors';
import { PaymentData } from '../models';

export class PaymentPage {
  constructor(private page: Page) {}

  /**
   * Fill payment form with card details
   */
  async fillPaymentDetails(payment: PaymentData) {
    await this.page.waitForSelector(paymentSelectors.paymentForm, { state: 'visible' });
    await this.page.fill(paymentSelectors.nameOnCard, payment.nameOnCard);
    await this.page.fill(paymentSelectors.cardNumber, payment.cardNumber);
    await this.page.fill(paymentSelectors.cvc, payment.cvc);
    await this.page.fill(paymentSelectors.expiryMonth, payment.expiryMonth);
    await this.page.fill(paymentSelectors.expiryYear, payment.expiryYear);
  }

  /**
   * Confirm payment
   */
  async confirmPayment() {
    await this.page.waitForSelector(paymentSelectors.confirmButton, { state: 'visible' });
    await this.page.click(paymentSelectors.confirmButton);
    await this.page.waitForSelector(paymentSelectors.successMessage, { state: 'visible', timeout: 10000 });
  }

  /**
   * Verify if payment was successful
   */
  async isPaymentSuccessful(): Promise<boolean> {
    await this.page.waitForSelector(paymentSelectors.successMessage, { state: 'visible', timeout: 10000 });
    return await this.page.locator(paymentSelectors.successMessage).isVisible();
  }

  /**
   * Get payment success message text
   * Converts null to empty string to satisfy strict TypeScript
   */
  async getSuccessMessage(): Promise<string> {
    const text = await this.page.locator(paymentSelectors.successMessage).textContent();
    return text ?? '';
  }

  /**
   * Click continue after successful payment
   */
  async clickContinue() {
    await this.page.waitForSelector(paymentSelectors.continueButton, { state: 'visible' });
    await this.page.click(paymentSelectors.continueButton);
    await this.page.waitForLoadState('domcontentloaded');
  }
}
