import { Page } from '@playwright/test';
import { productDetailSelectors } from '../selectors/product-detail.selectors';
import { Product } from '../models/product';

export class ProductDetailPage {
  constructor(private page: Page) {}

  async getProductDetails(): Promise<Product> {
    const name = await this.page.locator(productDetailSelectors.productName).textContent();
    const price = await this.page.locator(productDetailSelectors.productPrice).textContent();
    const category = await this.page.locator(productDetailSelectors.productCategory).textContent();
    return {
      name: name?.trim() || '',
      price: price?.trim() || '',
      category: category?.trim() || '',
    };
  }

  async addToCart() {
    await this.page.click(productDetailSelectors.addToCartButton);
    await this.page.waitForSelector(productDetailSelectors.addToCartConfirmation);
  }

  async continueShopping() {
    await this.page.click(productDetailSelectors.continueShoppingButton);
  }
}
