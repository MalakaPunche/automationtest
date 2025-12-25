// import { Page } from '@playwright/test';
// import { cartSelectors } from '../selectors/cart.selectors';
// import { CartItem } from '../models/cart';

// export class CartPage {
//   constructor(private page: Page) {}

//   async navigate() {
//     await this.page.goto('/view_cart');
//     await this.page.waitForSelector(cartSelectors.cartTable);
//   }

//   async getCartItems(): Promise<CartItem[]> {
//     const rows = this.page.locator(cartSelectors.cartItemRow);
//     const count = await rows.count();
//     const items: CartItem[] = [];

//     for (let i = 0; i < count; i++) {
//       const row = rows.nth(i);
//       const name = await row.locator(cartSelectors.itemName).textContent();
//       const price = await row.locator(cartSelectors.itemPrice).textContent();
//       const quantityText = await row.locator(cartSelectors.itemQuantity).innerText();
//       const quantity = Number(quantityText.replace(/\D/g, '')) || 1;
//       const total = await row.locator(cartSelectors.itemTotal).textContent();

//       items.push({
//         product: { name: name?.trim() || '', price: price?.trim() || '' },
//         quantity,
//         totalPrice: total?.trim() || '',
//       });
//     }

//     return items;
//   }

//   async removeItem(index = 0) {
//     const deleteButtons = this.page.locator(cartSelectors.deleteButton);
//     await deleteButtons.nth(index).click();
//     await this.page.waitForTimeout(500); // small wait for DOM update
//   }

//   async proceedToCheckout() {
//     await this.page.click(cartSelectors.checkoutButton);
//     await this.page.waitForLoadState('domcontentloaded');
//   }

//   async isEmpty(): Promise<boolean> {
//     return this.page.locator(cartSelectors.emptyCartMessage).isVisible();
//   }
// }


import { Page } from '@playwright/test';
import { cartSelectors } from '../selectors/cart.selectors';
import { CartItem } from '../models/cart';

export class CartPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/view_cart');
    await this.page.waitForSelector(cartSelectors.cartTable, { state: 'visible' });
  }

  async getCartItems(): Promise<CartItem[]> {
    const rows = this.page.locator(cartSelectors.cartItemRow);
    const count = await rows.count();
    const items: CartItem[] = [];

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const name = await row.locator(cartSelectors.itemName).textContent();
      const price = await row.locator(cartSelectors.itemPrice).textContent();
      const quantityText = await row.locator(cartSelectors.itemQuantity).innerText();
      const quantity = Number(quantityText.replace(/\D/g, '')) || 1;
      const total = await row.locator(cartSelectors.itemTotal).textContent();

      items.push({
        product: { name: name?.trim() || '', price: price?.trim() || '' },
        quantity,
        totalPrice: total?.trim() || '',
      });
    }

    return items;
  }

  async removeItem(index = 0) {
    const deleteButtons = this.page.locator(cartSelectors.deleteButton);
    await deleteButtons.nth(index).click();

    // Wait for the item to be removed dynamically
    await this.page.waitForFunction(
      (selector, initialCount) => document.querySelectorAll(selector).length < initialCount,
      cartSelectors.cartItemRow,
      await this.page.locator(cartSelectors.cartItemRow).count()
    );
  }

  async proceedToCheckout() {
    await this.page.click(cartSelectors.checkoutButton);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async isEmpty(): Promise<boolean> {
    return this.page.locator(cartSelectors.emptyCartMessage).isVisible();
  }
}
