import { Page } from '@playwright/test';
import { productsSelectors } from '../selectors/products.selectors';
import { Product } from '../models/product';

export class ProductsPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/products');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async filterByCategory(category: 'Women' | 'Men' | 'Kids', subCategory?: 'Dress' | 'Tops' | 'Tshirts' | 'Jeans') {
    if (category === 'Women') await this.page.click(productsSelectors.womenCategory);
    if (category === 'Men') await this.page.click(productsSelectors.menCategory);
    if (category === 'Kids') await this.page.click(productsSelectors.kidsCategory);

    switch (subCategory) {
      case 'Dress':
        await this.page.click(productsSelectors.dressCategory);
        break;
      case 'Tops':
        await this.page.click(productsSelectors.topsCategory);
        break;
      case 'Tshirts':
        await this.page.click(productsSelectors.tshirtsCategory);
        break;
      case 'Jeans':
        await this.page.click(productsSelectors.jeansCategory);
        break;
    }

    await this.page.waitForLoadState('networkidle');
  }

  async getFirstProduct(): Promise<Product> {
    const name = await this.page.locator(productsSelectors.firstProductName).textContent();
    const price = await this.page.locator(productsSelectors.firstProductPrice).textContent();
    return {
      name: name?.trim() || '',
      price: price?.trim() || '',
    };
  }

  async addFirstProductToCart() {
    await this.page.click(productsSelectors.firstProductAddToCart);
    await this.page.waitForSelector(productsSelectors.addToCartConfirmation);
  }

  async viewProductDetails(index = 0) {
    await this.page.locator(productsSelectors.viewProductButton).nth(index).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async goBack() {
    await this.page.goBack();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
