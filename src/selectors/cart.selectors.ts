// export const cartSelectors = {
//   // Navigation
//   cartLink: 'a[href="/view_cart"]',

//   // Cart table
//   cartTable: '#cart_info_table',
//   cartItemRow: '#cart_info tbody tr',

//   // Cart item details
//   itemImage: '.cart_product img',
//   itemName: '.cart_description h4 a',
//   itemPrice: '.cart_price p',
//   itemQuantity: '.cart_quantity',
//   itemTotal: '.cart_total_price',
//   deleteButton: '.cart_quantity_delete',

//   // Checkout
//   checkoutButton: 'a.check_out',

//   // Empty cart
//   emptyCartMessage: '#empty_cart',
// };

export const cartSelectors = {
  // Navigation
  cartLink: 'a[href="/view_cart"]',

  // Cart table
  cartTable: '#cart_info_table',
  cartItemRow: '#tr.cart_item',

  // Cart item details
  // itemImage: '.cart_product img',
  itemName: '.cart_description p',
  itemPrice: '.cart_price ',
  itemQuantity: '.cart_quantity', // input field for quantity
  itemTotal: '.cart_total', 
  deleteButton: '.cart_delete',

  // Checkout
  checkoutButton: '.check_out',

  // Empty cart
  emptyCartMessage: '.cart-empty',
};
