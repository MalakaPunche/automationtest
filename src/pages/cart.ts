import { Page } from '@playwright/test';
import { cartSelectors } from '../selectors/cart';
import { CartItem } from '../models';

export class CartPage {
  constructor(private page: Page) {}

  async navigateToCart() {
    await this.page.goto('/view_cart');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getCartItems(): Promise<CartItem[]> {
    await this.page.waitForSelector(cartSelectors.cartTable, { state: 'visible' });
    
    const rows = await this.page.locator(cartSelectors.cartItemRow).all();
    const items: CartItem[] = [];

    for (const row of rows) {
      const name = await row.locator(cartSelectors.itemName).textContent();
      const price = await row.locator(cartSelectors.itemPrice).textContent();
      const quantity = await row.locator(cartSelectors.itemQuantity).textContent();
      const total = await row.locator(cartSelectors.itemTotal).textContent();

      items.push({
        product: {
          name: name?.trim() || '',
          price: price?.trim() || ''
        },
        quantity: parseInt(quantity?.trim() || '1'),
        totalPrice: total?.trim() || ''
      });
    }

    return items;
  }

  async removeItem(itemIndex: number = 0) {
    await this.page.waitForSelector(cartSelectors.cartItemRow, { state: 'visible' });
    
    const deleteButtons = await this.page.locator(cartSelectors.deleteButton).all();
    if (deleteButtons[itemIndex]) {
      await deleteButtons[itemIndex].click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async proceedToCheckout() {
    await this.page.waitForSelector(cartSelectors.checkoutButton, { state: 'visible' });
    await this.page.click(cartSelectors.checkoutButton);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async isCartEmpty(): Promise<boolean> {
    const emptyCartMessage = this.page.locator(cartSelectors.emptyCartMessage);
    return await emptyCartMessage.isVisible();
  }
}