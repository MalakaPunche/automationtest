// export const paymentSelectors = {
//   // Payment form
//   paymentForm: '#payment-form',

//   // Payment fields
//   nameOnCard: 'input[data-qa="name-on-card"]',
//   cardNumber: 'input[data-qa="card-number"]',
//   cvc: 'input[data-qa="cvc"]',
//   expiryMonth: 'input[data-qa="expiry-month"]',
//   expiryYear: 'input[data-qa="expiry-year"]',

//   // Submit
//   confirmButton: 'button[data-qa="pay-button"]',

//   // Success
//   successMessage: 'p:has-text("Congratulations! Your order has been confirmed!")',
//   orderPlacedTitle: 'h2[data-qa="order-placed"]',
//   continueButton: 'a[data-qa="continue-button"]',
// };

export const paymentSelectors = {
  // Payment iframe (Stripe / embedded iframe)
  paymentIframe: 'iframe[name^="__privateStripeFrame"]', // Matches the payment iframe dynamically

  // Payment form inside iframe
  paymentForm: 'form#payment-form',

  // Payment fields inside iframe
  nameOnCard: 'input[data-qa="name-on-card"]',
  cardNumber: 'input[data-qa="card-number"]',
  cvc: 'input[data-qa="cvc"]',
  expiryMonth: 'input[data-qa="expiry-month"]',
  expiryYear: 'input[data-qa="expiry-year"]',

  // Submit / Pay
  confirmButton: 'button[data-qa="pay-button"]',

  // Success
  successMessage: 'p:has-text("Congratulations! Your order has been confirmed!")',
  orderPlacedTitle: 'h2[data-qa="order-placed"]',
  continueButton: 'a[data-qa="continue-button"]',
};
