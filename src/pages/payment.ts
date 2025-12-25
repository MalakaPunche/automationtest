// import { Page, Frame } from '@playwright/test';
// import { paymentSelectors } from '../selectors/payment.selectors';
// import { PaymentData } from '../models';

// export class PaymentPage {
//   private frame: Frame | null = null;

//   constructor(private page: Page) {}

//   /**
//    * Get the iframe containing the payment form
//    */
//   private async getPaymentFrame(): Promise<Frame> {
//     if (this.frame) return this.frame;

//     const iframeElement = await this.page.waitForSelector('iframe', { state: 'attached' });
//     const frame = await iframeElement.contentFrame();
//     if (!frame) throw new Error('Payment iframe not found');
//     this.frame = frame;
//     return frame;
//   }

//   /**
//    * Fill payment form with card details
//    */
//   async fillPaymentDetails(payment: PaymentData) {
//     const frame = await this.getPaymentFrame();
//     await frame.waitForSelector(paymentSelectors.paymentForm, { state: 'visible' });
//     await frame.fill(paymentSelectors.nameOnCard, payment.nameOnCard);
//     await frame.fill(paymentSelectors.cardNumber, payment.cardNumber);
//     await frame.fill(paymentSelectors.cvc, payment.cvc);
//     await frame.fill(paymentSelectors.expiryMonth, payment.expiryMonth);
//     await frame.fill(paymentSelectors.expiryYear, payment.expiryYear);
//   }

//   /**
//    * Confirm payment
//    */
//   async confirmPayment() {
//     const frame = await this.getPaymentFrame();
//     await frame.waitForSelector(paymentSelectors.confirmButton, { state: 'visible' });
//     await frame.click(paymentSelectors.confirmButton);
//     await frame.waitForSelector(paymentSelectors.successMessage, { state: 'visible', timeout: 10000 });
//   }

//   /**
//    * Verify if payment was successful
//    */
//   async isPaymentSuccessful(): Promise<boolean> {
//     const frame = await this.getPaymentFrame();
//     await frame.waitForSelector(paymentSelectors.successMessage, { state: 'visible', timeout: 10000 });
//     return await frame.locator(paymentSelectors.successMessage).isVisible();
//   }

//   /**
//    * Get payment success message text
//    * Converts null to empty string to satisfy strict TypeScript
//    */
//   async getSuccessMessage(): Promise<string> {
//     const frame = await this.getPaymentFrame();
//     const text = await frame.locator(paymentSelectors.successMessage).textContent();
//     return text ?? '';
//   }

//   /**
//    * Click continue after successful payment
//    * Usually outside iframe
//    */
//   async clickContinue() {
//     await this.page.waitForSelector(paymentSelectors.continueButton, { state: 'visible' });
//     await this.page.click(paymentSelectors.continueButton);
//     await this.page.waitForLoadState('domcontentloaded');
//   }
// }


import { Page } from '@playwright/test';
import { paymentSelectors } from '../selectors/payment.selectors';
import { PaymentData } from '../models';

export class PaymentPage {
  constructor(private page: Page) {}

  /**
   * Fill payment form inside iframe
   */
  async fillPaymentDetails(payment: PaymentData) {
    const frame = this.page.frameLocator(paymentSelectors.paymentIframe);

    await frame.locator(paymentSelectors.paymentForm).waitFor({ state: 'visible', timeout: 10000 });
    await frame.locator(paymentSelectors.nameOnCard).fill(payment.nameOnCard);
    await frame.locator(paymentSelectors.cardNumber).fill(payment.cardNumber);
    await frame.locator(paymentSelectors.cvc).fill(payment.cvc);
    await frame.locator(paymentSelectors.expiryMonth).fill(payment.expiryMonth);
    await frame.locator(paymentSelectors.expiryYear).fill(payment.expiryYear);
  }

  /**
   * Confirm payment inside iframe
   */
  async confirmPayment() {
    const frame = this.page.frameLocator(paymentSelectors.paymentIframe);
    await frame.locator(paymentSelectors.confirmButton).click();

    // Wait for success message outside iframe
    await this.page.locator(paymentSelectors.successMessage).waitFor({ state: 'visible', timeout: 10000 });
  }

  /**
   * Verify if payment was successful
   */
  async isPaymentSuccessful(): Promise<boolean> {
    return await this.page.locator(paymentSelectors.successMessage).isVisible();
  }

  /**
   * Get payment success message text
   */
  async getSuccessMessage(): Promise<string> {
    const text = await this.page.locator(paymentSelectors.successMessage).textContent();
    return text ?? '';
  }

  /**
   * Click continue after successful payment
   */
  async clickContinue() {
    await this.page.locator(paymentSelectors.continueButton).waitFor({ state: 'visible' });
    await this.page.locator(paymentSelectors.continueButton).click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
