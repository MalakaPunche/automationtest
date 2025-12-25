export const productDetailSelectors = {
  // Product details
  productInfo: '.product-information',
  productName: '.product-information h2',
  productCategory: '.product-information p:has-text("Category:")',
  productPrice: '.product-information span span',
  productAvailability: '.product-information p:has-text("Availability:")',
  productCondition: '.product-information p:has-text("Condition:")',
  productBrand: '.product-information p:has-text("Brand:")',

  // Add to cart
  quantityInput: '#quantity',
  addToCartButton: 'button.cart',

  // Modal
  addToCartConfirmation: '.modal-body p:has-text("Your product has been added to cart.")',
  viewCartLink: '.modal-body a[href="/view_cart"]',
  continueShoppingButton: 'button[data-dismiss="modal"]',
};
