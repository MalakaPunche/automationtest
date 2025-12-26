import { Page, expect } from '@playwright/test';
import { productsSelectors } from '../selectors/products.selectors';
import { Product } from '../models/product';

export class ProductsPage {
  constructor(private page: Page) {}

  // Navigate to products page
  async navigate() {
    await this.page.goto('/products');
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Filter products by category/sub-category
  async filterByCategory(
    category: 'Women' | 'Men' | 'Kids',
    subCategory?: 'Dress' | 'Tops' | 'Tshirts' | 'Jeans'
  ) {
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

    // Wait for products to be loaded
    await this.page.waitForLoadState('networkidle');
  }

  // ✅ Get first product details safely
  async getFirstProduct(): Promise<Product> {
    const firstCard = this.page.locator(productsSelectors.productCard).first();

    // Wait for the first product card to be visible
    await expect(firstCard).toBeVisible({ timeout: 15000 });

    const name =
      (await firstCard.locator(productsSelectors.productName).textContent())?.trim() || '';
    const price =
      (await firstCard.locator(productsSelectors.productPrice).textContent())?.trim() || '';

    return { name, price };
  }

  // Add first product to cart safely
  async addFirstProductToCart() {
    const firstCard = this.page.locator(productsSelectors.productCard).first();
    const addButton = firstCard.locator(productsSelectors.addToCartButton);

    // Hover to reveal button if hidden
    await firstCard.hover();

    // Click add to cart
    await addButton.click();

    // Wait for modal to appear
    await this.page.waitForSelector(productsSelectors.addToCartConfirmation, { state: 'visible' });

    // Close modal to continue
    await this.page.click(productsSelectors.continueShoppingButton);
  }

  // View product details
  async viewProductDetails(index = 0) {
    const detailButton = this.page.locator(productsSelectors.viewProductButton).nth(index);
    await detailButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Go back to previous page
  async goBack() {
    await this.page.goBack();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
