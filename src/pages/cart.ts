import { Page, expect } from '@playwright/test';
import { cartSelectors } from '../selectors/cart.selectors';
import { CartItem } from '../models/cart';

export class CartPage {
  constructor(private page: Page) {}

  // Navigate to Cart page
  async navigate() {
    await this.page.goto('/view_cart');
    await this.page.waitForSelector(cartSelectors.cartTable, { state: 'visible' });
  }

  // Get all items in the cart (quantity = 1 enforced)
  async getCartItems(): Promise<CartItem[]> {
    const rows = this.page.locator(cartSelectors.cartItemRow);
    const count = await rows.count();
    const items: CartItem[] = [];

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const name = (await row.locator(cartSelectors.itemName).textContent())?.trim() || '';
      const price = (await row.locator(cartSelectors.itemPrice).textContent())?.trim() || '';
      const total = (await row.locator(cartSelectors.itemTotal).textContent())?.trim() || '';

      items.push({
        product: { name, price },
        quantity: 1, // site ensures only 1 per row
        totalPrice: total,
      });
    }

    return items;
  }

  // Remove an item safely at a given index
  async removeItem(index = 0) {
    const rows = this.page.locator(cartSelectors.cartItemRow);
    const deleteButtons = this.page.locator(cartSelectors.deleteButton);

    const rowCountBefore = await rows.count();
    if (rowCountBefore === 0) return;

    await deleteButtons.nth(index).click();

    // Wait until the cart table has one less row
    await expect(rows).toHaveCount(rowCountBefore - 1);
  }

  // Proceed to checkout
  async proceedToCheckout() {
    await this.page.click(cartSelectors.checkoutButton);
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Check if cart is empty
  async isEmpty(): Promise<boolean> {
    return this.page.locator(cartSelectors.emptyCartMessage).isVisible();
  }
}
