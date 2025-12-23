export const checkoutSelectors = {
  // Checkout Page
  checkoutInfo: '#cart_items',
  checkoutForm: '.checkout-information',
  
  // Address Details (Review - Already filled from account)
  deliveryAddress: '#address_delivery',
  billingAddress: '#address_invoice',
  
  // Order Review
  orderReview: '#cart_info',
  reviewTable: '#cart_info_table',
  cartItemRow: '#cart_info tbody tr',
  
  // Item Details in Review
  itemDescription: '.cart_description h4',
  itemPrice: '.cart_price p',
  itemQuantity: '.cart_quantity button',
  itemTotal: '.cart_total_price',
  
  // Totals
  subTotal: '#cart_info tfoot tr td:has-text("Total")',
  totalAmount: '.cart_total_price',
  
  // Comment/Message
  commentTextarea: 'textarea[name="message"]',
  
  // Place Order Button
  placeOrderButton: 'a[href="/payment"]',
  placeOrderLink: '.btn-default.check_out'
};

export const paymentSelectors = {
  // Payment Page
  paymentForm: '#payment-form',
  
  // Payment Details
  nameOnCard: 'input[data-qa="name-on-card"]',
  cardNumber: 'input[data-qa="card-number"]',
  cvc: 'input[data-qa="cvc"]',
  expiryMonth: 'input[data-qa="expiry-month"]',
  expiryYear: 'input[data-qa="expiry-year"]',
  
  // Submit Payment
  confirmButton: 'button[data-qa="pay-button"]',
  submitButton: '#submit',
  
  // Success
  successMessage: 'p:has-text("Congratulations! Your order has been confirmed!")',
  orderPlacedMessage: '.title:has-text("Order Placed!")',
  successTitle: 'h2[data-qa="order-placed"]',
  
  // Download Invoice
  downloadInvoiceButton: 'a[href="/download_invoice"]',
  continueButton: 'a[data-qa="continue-button"]'
};