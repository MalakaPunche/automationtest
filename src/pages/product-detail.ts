import { Page } from '@playwright/test';
import { productDetailSelectors } from '../selectors/products';
import { Product } from '../models';

export class ProductDetailPage {
  constructor(private page: Page) {}

  async getProductDetails(): Promise<Product> {
    await this.page.waitForSelector(productDetailSelectors.productName, { state: 'visible' });
    
    const name = await this.page.locator(productDetailSelectors.productName).textContent();
    const price = await this.page.locator(productDetailSelectors.productPrice).textContent();
    const category = await this.page.locator(productDetailSelectors.productCategory).textContent();
    
    return {
      name: name?.trim() || '',
      price: price?.trim() || '',
      category: category?.trim() || ''
    };
  }

  async addToCart() {
    await this.page.waitForSelector(productDetailSelectors.addToCartButton, { state: 'visible' });
    await this.page.click(productDetailSelectors.addToCartButton);
    
    // Wait for confirmation
    await this.page.waitForSelector(productDetailSelectors.addToCartConfirmation, { state: 'visible' });
  }

  async continueShoppingAfterAdd() {
    await this.page.waitForSelector(productDetailSelectors.continueShoppingButton, { state: 'visible' });
    await this.page.click(productDetailSelectors.continueShoppingButton);
  }
}