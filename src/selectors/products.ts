export const productsSelectors = {
  // Navigation
  productsLink: 'a[href="/products"]',
  
  // Product List
  productsList: '.features_items',
  productItem: '.product-image-wrapper',
  
  // First Product
  firstProduct: '.features_items .product-image-wrapper:first-child',
  firstProductName: '.features_items .product-image-wrapper:first-child .productinfo h2',
  firstProductPrice: '.features_items .product-image-wrapper:first-child .productinfo h2',
  firstProductAddToCart: '.features_items .product-image-wrapper:first-child .add-to-cart',
  
  // General Product Selectors
  productName: '.productinfo p',
  productPrice: '.productinfo h2',
  productImage: '.productinfo img',
  addToCartButton: '.add-to-cart',
  viewProductButton: 'a[href*="/product_details"]',
  
  // Category Filter
  categoryPanel: '.left-sidebar .panel-default',
  categoryList: '.panel-body ul',
  womenCategory: 'a[href="#Women"]',
  menCategory: 'a[href="#Men"]',
  kidsCategory: 'a[href="#Kids"]',
  
  // Sub-categories
  dressCategory: 'a[href="/category_products/1"]',
  topsCategory: 'a[href="/category_products/2"]',
  tshirtsCategory: 'a[href="/category_products/3"]',
  jeansCategory: 'a[href="/category_products/6"]',
  
  // Brands Filter
  brandsPanel: '.brands_products',
  brandLink: '.brands_products ul li a',
  
  // Modal after adding to cart
  addToCartModal: '.modal-content',
  addToCartConfirmation: '.modal-body p:has-text("Your product has been added to cart.")',
  continueShoppingButton: 'button[data-dismiss="modal"]',
  viewCartLink: '.modal-body a[href="/view_cart"]',
  
  // Search
  searchInput: '#search_product',
  searchButton: '#submit_search',
  searchedProducts: '.features_items'
};

export const productDetailSelectors = {
  // Product Details Page
  productInfo: '.product-information',
  productName: '.product-information h2',
  productCategory: '.product-information p:has-text("Category:")',
  productPrice: '.product-information span span',
  productAvailability: '.product-information p:has-text("Availability:")',
  productCondition: '.product-information p:has-text("Condition:")',
  productBrand: '.product-information p:has-text("Brand:")',
  
  // Add to Cart
  quantityInput: '#quantity',
  addToCartButton: 'button.cart',
  
  // Modal
  addToCartConfirmation: '.modal-body p:has-text("Your product has been added to cart.")',
  viewCartLink: '.modal-body a[href="/view_cart"]',
  continueShoppingButton: 'button[data-dismiss="modal"]'
};