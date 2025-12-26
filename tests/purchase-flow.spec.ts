import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login';
import { ProductsPage } from '../src/pages/products';
import { CartPage } from '../src/pages/cart';
import { PaymentPage } from '../src/pages/payment';
import { UserCredentials, PaymentData } from '../src/models';
import { loginSelectors } from '../src/selectors/login.selectors';

// Test data
const testUser: UserCredentials = {
  email: 'email999@gmail.com',
  password: 'Password999!',
};

const paymentInfo: PaymentData = {
  nameOnCard: 'Admin Hello',
  cardNumber: '4242424242424242',
  cvc: '123',
  expiryMonth: '12',
  expiryYear: '2025',
};

test.describe('E2E purchase flow with cart item removal', () => {
  test('add two products, remove one, complete checkout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const paymentPage = new PaymentPage(page);

    // 1️⃣ Login
    await loginPage.navigate();
    await loginPage.login(testUser);
    await expect(page.locator(loginSelectors.loggedInUser)).toBeVisible();

    // 2️⃣ Navigate to products
    await productsPage.navigate();
    await productsPage.filterByCategory('Women', 'Dress');

    // 3️⃣ Add first product
    const firstProduct = await productsPage.getFirstProduct();
    await productsPage.addFirstProductToCart();

    // 4️⃣ Add second product
    await productsPage.viewProductDetails(1); // 2nd product detail
    const secondProduct = await productsPage.getFirstProduct(); 
    await productsPage.addFirstProductToCart();

    // 5️⃣ Go to cart / checkout page
    await cartPage.navigate();

    // Verify both products exist
    let cartItems = await cartPage.getCartItems();
    expect(cartItems.find(i => i.product.name === firstProduct.name)).toBeDefined();
    expect(cartItems.find(i => i.product.name === secondProduct.name)).toBeDefined();

    // 6️⃣ Remove the second product
    const secondIndex = cartItems.findIndex(i => i.product.name === secondProduct.name);
    await cartPage.removeItem(secondIndex);

    // Verify removed
    cartItems = await cartPage.getCartItems();
    expect(cartItems.find(i => i.product.name === secondProduct.name)).toBeUndefined();

    // 7️⃣ Proceed to checkout
    await cartPage.proceedToCheckout();

    // 8️⃣ Fill payment and confirm
    await paymentPage.fillPaymentDetails(paymentInfo);
    await paymentPage.confirmPayment();

    // Verify success
    const isSuccess = await paymentPage.isPaymentSuccessful();
    expect(isSuccess).toBe(true);

    const successMessage = await paymentPage.getSuccessMessage();
    expect(successMessage).toContain('Congratulations');

    await paymentPage.clickContinue();
    await expect(page).toHaveURL(/\/$/);
  });
});
