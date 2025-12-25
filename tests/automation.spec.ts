// import { test, expect } from '../src/fixtures/sessions';

// import { LoginPage } from '../src/pages/login';
// import { ProductsPage } from '../src/pages/products';
// import { ProductDetailPage } from '../src/pages/product-detail';
// import { CartPage } from '../src/pages/cart';
// import { CheckoutPage } from '../src/pages/checkout';
// import { PaymentPage } from '../src/pages/payment';

// test('User can login and complete purchase flow', async ({ page }) => {
//   // -------------------
//   // Login
//   // -------------------
//   const loginPage = new LoginPage(page);
//   await loginPage.navigate();

//   await loginPage.login({
//     email: 'email999@gmail.com',
//     password: 'Password999!',
//   });

//   expect(await loginPage.isLoggedIn()).toBeTruthy();

//   // -------------------
//   // Products
//   // -------------------
//   const productsPage = new ProductsPage(page);
//   await productsPage.navigate();

//   await productsPage.filterByCategory('Women', 'Dress');
//   await productsPage.viewProductDetails(0);

//   // -------------------
//   // Product Detail
//   // -------------------
//   const productDetailPage = new ProductDetailPage(page);

//   const product = await productDetailPage.getProductDetails();
//   expect(product.name).not.toBe('');
//   expect(product.price).not.toBe('');

//   await productDetailPage.addToCart();
//   await productDetailPage.continueShopping();

//   // -------------------
//   // Cart
//   // -------------------
//   const cartPage = new CartPage(page);
//   await cartPage.navigate();

//   const items = await cartPage.getCartItems();
//   expect(items.length).toBeGreaterThan(0);

//   await cartPage.proceedToCheckout();

//   // -------------------
//   // Checkout
//   // -------------------
//   const checkoutPage = new CheckoutPage(page);

//   expect(await checkoutPage.verifyCheckoutPageVisible()).toBeTruthy();
//   await checkoutPage.addComment('Automated test order');
//   await checkoutPage.placeOrder();

//   // -------------------
//   // Payment
//   // -------------------
//   const paymentPage = new PaymentPage(page);

//   await paymentPage.fillPaymentDetails({
//     nameOnCard: 'Test User',
//     cardNumber: '4111111111111111',
//     cvc: '123',
//     expiryMonth: '12',
//     expiryYear: '2030',
//   });

//   await paymentPage.confirmPayment();

//   expect(await paymentPage.isPaymentSuccessful()).toBeTruthy();

//   const successMessage = await paymentPage.getSuccessMessage();
//   expect(successMessage).toContain('Congratulations');
// });
