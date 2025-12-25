// import { test, expect } from '../src/fixtures/sessions';
// import { LoginPage } from '../src/pages/login';
// import { ProductsPage } from '../src/pages/products';
// import { ProductDetailPage } from '../src/pages/product-detail';
// import { CartPage } from '../src/pages/cart';
// import { CheckoutPage } from '../src/pages/checkout';
// import { PaymentPage } from '../src/pages/payment';
// import { PaymentData } from '../src/models/payment';

// const paymentData: PaymentData = {
//   nameOnCard: 'John Doe',
//   cardNumber: '4111111111111111',
//   cvc: '123',
//   expiryMonth: '12',
//   expiryYear: '2025',
// };

// test.describe('AutomationExercise E2E', () => {
//   let loginPage: LoginPage;
//   let productsPage: ProductsPage;
//   let productDetailPage: ProductDetailPage;
//   let cartPage: CartPage;
//   let checkoutPage: CheckoutPage;
//   let paymentPage: PaymentPage;

//   test.beforeEach(async ({ page }) => {
//     loginPage = new LoginPage(page);
//     productsPage = new ProductsPage(page);
//     productDetailPage = new ProductDetailPage(page);
//     cartPage = new CartPage(page);
//     checkoutPage = new CheckoutPage(page);
//     paymentPage = new PaymentPage(page);
//   });

//   test('full e2e flow', async ({ page }) => {
//     // Login
//     await loginPage.navigate();
//     await loginPage.login({ email: 'email999@gmail.com', password: 'Password999!' });
//     expect(await loginPage.isLoggedIn()).toBeTruthy();

//     // Products and filter
//     await productsPage.navigateToProducts();
//     await productsPage.filterByCategory('Women');
//     const firstProduct = await productsPage.getFirstProduct();
//     expect(firstProduct.name).not.toBe('');
//     expect(firstProduct.price).not.toBe('');

//     // Add first product to cart
//     await productsPage.addFirstProductToCart();
//     await cartPage.navigateToCart();
//     const cartItems = await cartPage.getCartItems();
//     expect(cartItems.length).toBeGreaterThan(0);
//     expect(cartItems[0].product.name).toBe(firstProduct.name);

//     // View second product and add
//     await productsPage.viewProductDetails(2);
//     const secondProduct = await productDetailPage.getProductDetails();
//     await productDetailPage.addToCart();
//     await productDetailPage.continueShoppingAfterAdd();

//     // Remove first product from cart
//     await cartPage.navigateToCart();
//     await cartPage.removeItem(0);
//     const updatedCart = await cartPage.getCartItems();
//     expect(updatedCart.some(item => item.product.name === firstProduct.name)).toBeFalsy();

//     // Checkout
//     await cartPage.proceedToCheckout();
//     await checkoutPage.fillCheckoutForm({
//       firstName: 'John',
//       lastName: 'Doe',
//       address: '123 Test St',
//       city: 'Testville',
//       state: 'TestState',
//       zipCode: '12345',
//       country: 'United States',
//       mobileNumber: '1234567890',
//     });
//     await checkoutPage.submitCheckout();
//     expect(await checkoutPage.verifyCheckoutSummary()).toBeTruthy();

//     // Payment
//     await paymentPage.fillPaymentDetails(paymentData);
//     await paymentPage.confirmPayment();
//     expect(await paymentPage.isPaymentSuccessful()).toBeTruthy();
//     console.log(await paymentPage.getSuccessMessage());
//     await paymentPage.clickContinue();
//   });
// });
