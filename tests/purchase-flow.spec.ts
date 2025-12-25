// import { test, expect } from '../src/fixtures/sessions';

// import { LoginPage } from '../src/pages/login';
// import { ProductsPage } from '../src/pages/products';
// import { ProductDetailPage } from '../src/pages/product-detail';
// import { CartPage } from '../src/pages/cart';
// import { CheckoutPage } from '../src/pages/checkout';
// import { PaymentPage } from '../src/pages/payment';

// import { testUser } from '../src/test-data/user.data';
// import { productFilterData } from '../src/test-data/product.data';
// import { checkoutData } from '../src/test-data/checkout.data';
// import { paymentData } from '../src/test-data/payment.data';

// test('End-to-end purchase flow using test data', async ({ page }) => {
//   // -------------------
//   // Login
//   // -------------------
//   const loginPage = new LoginPage(page);
//   await loginPage.navigate();
//   await loginPage.login(testUser);

//   expect(await loginPage.isLoggedIn()).toBeTruthy();

//   // -------------------
//   // Products + Filter
//   // -------------------
//   const productsPage = new ProductsPage(page);
//   await productsPage.navigate();

//   await productsPage.filterByCategory(
//     productFilterData.category,
//     productFilterData.subCategory
//   );

//   const firstProduct = await productsPage.getFirstProduct();
//   expect(firstProduct.name).not.toBe('');
//   expect(firstProduct.price).not.toBe('');

//   // -------------------
//   // First product detail
//   // -------------------
//   await productsPage.viewProductDetails(0);

//   const productDetailPage = new ProductDetailPage(page);
//   const productDetails = await productDetailPage.getProductDetails();

//   expect(productDetails.name).toBe(firstProduct.name);
//   expect(productDetails.price).toBe(firstProduct.price);

//   await productDetailPage.addToCart();
//   await productDetailPage.continueShopping();

//   // -------------------
//   // Cart verification
//   // -------------------
//   const cartPage = new CartPage(page);
//   await cartPage.navigate();

//   const cartItems = await cartPage.getCartItems();
//   expect(cartItems.length).toBeGreaterThan(0);
//   expect(cartItems[0].product.name).toBe(firstProduct.name);

//   // -------------------
//   // Checkout
//   // -------------------
//   await cartPage.proceedToCheckout();

//   const checkoutPage = new CheckoutPage(page);
//   expect(await checkoutPage.verifyCheckoutPageVisible()).toBeTruthy();

//   await checkoutPage.addComment(checkoutData.comment);
//   await checkoutPage.placeOrder();

//   // -------------------
//   // Payment
//   // -------------------
//   const paymentPage = new PaymentPage(page);
//   await paymentPage.fillPaymentDetails(paymentData);
//   await paymentPage.confirmPayment();

//   expect(await paymentPage.isPaymentSuccessful()).toBeTruthy();

//   const successMessage = await paymentPage.getSuccessMessage();
//   expect(successMessage).toContain('Congratulations');
// });


import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login';
import { ProductsPage } from '../src/pages/products';
import { CartPage } from '../src/pages/cart';
import { PaymentPage } from '../src/pages/payment';
import { UserCredentials, Product, PaymentData } from '../src/models';
import { loginSelectors } from '../src/selectors/login.selectors';
import { productsSelectors } from '../src/selectors/products.selectors';

// Mock data for test
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

test.describe('End-to-end purchase flow using test data', () => {
  test('complete e2e purchase with cart item removal', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const paymentPage = new PaymentPage(page);

    // Step 1: Login
    await loginPage.navigate();
    await loginPage.login(testUser);
    await expect(page.locator(loginSelectors.loggedInUser)).toBeVisible();

    // Step 2: Go to products page and filter
    await productsPage.navigate();
    await productsPage.filterByCategory('Women', 'Dress');

    // Step 3: Verify first product
    const firstProduct: Product = await productsPage.getFirstProduct();
    expect(firstProduct.name).not.toBe('');
    expect(firstProduct.price).not.toBe('');

    // Step 4: Add first product to cart
    await productsPage.addFirstProductToCart();
    await cartPage.navigate();
    let cartItems = await cartPage.getCartItems();
    expect(cartItems.length).toBeGreaterThan(0);
    expect(cartItems[0].product.name).toBe(firstProduct.name);

    // Step 5: Go back to product list, verify filter still valid
    await productsPage.goBack();
    const firstProductAfterBack = await productsPage.getFirstProduct();
    expect(firstProductAfterBack.name).toBe(firstProduct.name);

    // Step 6: View second product details and add to cart
    await productsPage.viewProductDetails(1);
    const secondProduct = await productsPage.getFirstProduct(); // first in details page
    await productsPage.addFirstProductToCart();

    // Step 7: Open cart, remove first added item
    await cartPage.navigate();
    await cartPage.removeItem(0);
    cartItems = await cartPage.getCartItems();
    expect(cartItems.find(i => i.product.name === firstProduct.name)).toBeUndefined();

    // Step 8: Proceed to checkout
    await cartPage.proceedToCheckout();

    // Fill in payment form (inside iframe)
    await paymentPage.fillPaymentDetails(paymentInfo);

    // Step 9: Complete payment
    await paymentPage.confirmPayment();

    // Verify payment success
    const isSuccess = await paymentPage.isPaymentSuccessful();
    expect(isSuccess).toBe(true);
    const successMessage = await paymentPage.getSuccessMessage();
    expect(successMessage).toContain('Congratulations! Your order has been confirmed!');

    // Click continue
    await paymentPage.clickContinue();

    // Verify redirected back to home or order confirmation
    await expect(page).toHaveURL(/\/$/);
  });
});
