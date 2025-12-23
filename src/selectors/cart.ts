export const cartSelectors = {
  // Navigation
  cartLink: 'a[href="/view_cart"]',
  
  // Cart Table
  cartTable: '#cart_info_table',
  cartTableBody: '#cart_info tbody',
  cartItemRow: '#cart_info tbody tr',
  
  // Cart Item Details
  itemImage: '.cart_product img',
  itemName: '.cart_description h4 a',
  itemPrice: '.cart_price p',
  itemQuantity: '.cart_quantity button',
  itemTotal: '.cart_total_price',
  deleteButton: '.cart_quantity_delete',
  
  // Cart Summary
  cartInfo: '#cart_info',
  
  // Checkout
  checkoutButton: '.btn-default.check_out',
  proceedToCheckoutLink: 'a:has-text("Proceed To Checkout")',
  
  // Empty Cart
  emptyCartMessage: '#empty_cart p:has-text("Cart is empty!")',
  emptyCartSpan: 'span#empty_cart',
  
  // Register/Login prompt
  registerLoginLink: 'a[href="/login"]',
  registerLoginModal: '.modal-body p:has-text("Register / Login account to proceed on checkout.")'
};