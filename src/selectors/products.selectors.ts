export const productsSelectors = {
  // Navigation
  productsLink: 'a[href="/products"]',

  // Product listing
  productsList: '.features_items',
  productItem: '.product-image-wrapper',

  // First product (used for verification)
  firstProduct: '.features_items .product-image-wrapper:first-child',
  firstProductName: '.features_items .product-image-wrapper:first-child .productinfo p',
  firstProductPrice: '.features_items .product-image-wrapper:first-child .productinfo h2',
  firstProductAddToCart: '.features_items .product-image-wrapper:first-child .add-to-cart',

  // General product selectors
  productName: '.productinfo p',
  productPrice: '.productinfo h2',
  addToCartButton: '.add-to-cart',
  viewProductButton: 'a[href^="/product_details"]',

  // Category filter
  categoryPanel: '.left-sidebar',
  womenCategory: 'a[href="#Women"]',
  menCategory: 'a[href="#Men"]',
  kidsCategory: 'a[href="#Kids"]',

  // Subcategories
  dressCategory: 'a[href="/category_products/1"]',
  topsCategory: 'a[href="/category_products/2"]',
  tshirtsCategory: 'a[href="/category_products/3"]',
  jeansCategory: 'a[href="/category_products/6"]',

  // Add-to-cart modal
  addToCartModal: '.modal-content',
  addToCartConfirmation: '.modal-body p:has-text("Your product has been added to cart.")',
  continueShoppingButton: 'button[data-dismiss="modal"]',
  viewCartLink: '.modal-body a[href="/view_cart"]',

  // Search
  searchInput: '#search_product',
  searchButton: '#submit_search',
};
