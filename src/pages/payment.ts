import { Page } from '@playwright/test';
import { paymentSelectors } from '../selectors/checkout';
import { PaymentData } from '../models';

export class PaymentPage {
  constructor(private page: Page) {}

  async fillPaymentDetails(payment: PaymentData) {
    await this.page.waitForSelector(paymentSelectors.paymentForm, { state: 'visible' });
    
    await this.page.fill(paymentSelectors.nameOnCard, payment.nameOnCard);
    await this.page.fill(paymentSelectors.cardNumber, payment.cardNumber);
    await this.page.fill(paymentSelectors.cvc, payment.cvc);
    await this.page.fill(paymentSelectors.expiryMonth, payment.expiryMonth);
    await this.page.fill(paymentSelectors.expiryYear, payment.expiryYear);
  }

  async confirmPayment() {
    await this.page.waitForSelector(paymentSelectors.confirmButton, { state: 'visible' });
    await this.page.click(paymentSelectors.confirmButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isPaymentSuccessful(): Promise<boolean> {
    await this.page.waitForSelector(paymentSelectors.successMessage, { state: 'visible', timeout: 10000 });
    return await this.page.locator(paymentSelectors.successMessage).isVisible();
  }

  async getSuccessMessage(): Promise<string> {
    await this.page.waitForSelector(paymentSelectors.successMessage, { state: 'visible' });
    return await this.page.locator(paymentSelectors.successMessage).textContent() || '';
  }
}
```

---

## **Key Points About Proper Waits:**

✅ **Good Waits (Used Above):**
- `page.waitForSelector()` - Wait for element to be in DOM
- `page.waitForLoadState('domcontentloaded')` - Wait for DOM to load
- `page.waitForLoadState('networkidle')` - Wait for network to settle
- `{ state: 'visible' }` - Wait for element to be visible
- `{ timeout: 10000 }` - Custom timeout when needed

❌ **Bad Waits (AVOID):**
- `page.waitForTimeout(5000)` - Hard sleep
- `setTimeout()` - Hard sleep

---

## **Your Structure Now:**
```
/src
  /pages
    ├── login.page.ts
    ├── products.page.ts
    ├── product-detail.page.ts
    ├── cart.page.ts
    ├── checkout.page.ts
    └── payment.page.ts