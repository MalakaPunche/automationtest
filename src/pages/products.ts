import { Page } from '@playwright/test';
import { productsSelectors } from '../selectors/products';
import { Product } from '../models';

export class ProductsPage {
  constructor(private page: Page) {}

  async navigateToProducts() {
    await this.page.goto('/products');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async filterByCategory(category: string) {
    await this.page.waitForSelector(productsSelectors.categoryList, { state: 'visible' });
    await this.page.click(`${productsSelectors.categoryPrefix}:has-text("${category}")`);
    await this.page.waitForLoadState('networkidle');
  }

  async getFirstProduct(): Promise<Product> {
    await this.page.waitForSelector(productsSelectors.firstProduct, { state: 'visible' });
    
    const name = await this.page.locator(productsSelectors.firstProductName).textContent();
    const price = await this.page.locator(productsSelectors.firstProductPrice).textContent();
    
    return {
      name: name?.trim() || '',
      price: price?.trim() || ''
    };
  }

  async addFirstProductToCart() {
    await this.page.waitForSelector(productsSelectors.firstProductAddToCart, { state: 'visible' });
    await this.page.click(productsSelectors.firstProductAddToCart);
    
    // Wait for confirmation modal/message
    await this.page.waitForSelector(productsSelectors.addToCartConfirmation, { state: 'visible' });
  }

  async viewProductDetails(productIndex: number = 1) {
    const viewProductSelector = `${productsSelectors.viewProductButton}:nth-of-type(${productIndex})`;
    await this.page.waitForSelector(viewProductSelector, { state: 'visible' });
    await this.page.click(viewProductSelector);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async goBack() {
    await this.page.goBack();
    await this.page.waitForLoadState('domcontentloaded');
  }
}