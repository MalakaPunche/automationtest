export const checkoutSelectors = {
  // Checkout page
  checkoutInfo: '#cart_items',
  reviewTable: '#cart_info_table',
  cartItemRow: '#cart_info tbody tr',

  // Order review
  itemDescription: '.cart_description h4 a',
  itemPrice: '.cart_price p',
  itemQuantity: '.cart_quantity',
  itemTotal: '.cart_total_price',

  // Comment
  commentTextarea: 'textarea[name="message"]',

  // Place order
  placeOrderButton: 'a[href="/payment"]',
};
