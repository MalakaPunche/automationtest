# Automation with Playwright & TypeScript — Candidate README

## Setup
Follow these steps to set up and run the test suite:

1. Clone the repository:  
   `git clone <repo>`
2. Navigate into the project folder:  
   `cd <folder>`
3. Install dependencies:  
   `npm install`
4. Install Playwright browsers:  
   `npx playwright install`
5. Copy environment variables template and configure credentials:  
   `cp .env.example .env`  
   Fill in `.env` values (e.g., test account credentials, base URL).
6. Run the test suite:  
   `npx playwright test`
7. Open the HTML report:  
   `npx playwright show-report`

## External Assistance Disclosure
The following external tools, resources, and AI assistance were used:

- Selector generation: Chrome DevTools & Playwright Selector Playground
- AI assistance: ChatGPT and Claude was used for code suggestions, fixes, and optimizations.  
  Prompt Example:  
  `"Fix Playwright TypeScript Page Object for product selection and cart item removal with best practices."`
- Libraries & references:
  - Playwright Test (https://playwright.dev/)
  - TypeScript (strict mode)
- Code snippets:
  - Page Object Model (POM) for `ProductsPage` and `CartPage`
  - Models/interfaces: `Product`, `CartItem`
  - Fixtures for authenticated sessions

## Overview
**Target site:** https://automationexercise.com/

**Business Scenario / Test Flow:**
1. Log in to already registered account.
2. Navigate to products page; filter products by category.
3. Verify filtered results (at least the first product).
4. Add first product to cart; verify presence and price in cart.
5. Navigate back; verify filtered results persist.
6. View another product’s detail; verify attributes; add to cart.
7. Remove the first product from cart; verify removal.
8. Proceed to checkout; fill in mock forms.
9. Complete payment successfully.

**Technical Requirements:**
- Continuous end-to-end test flow covering user interactions.
- Page Object Model (POM) implemented.
- Selectors maintained in `/selectors` folder.
- Models/interfaces defined in `/models`.
- Authenticated session handled via fixtures.
- Robust waits and Playwright-native assertions (avoid sleep).
- Prettier for formatting.
- HTML test report with clear test names, assertions, screenshots/traces on failure.


## Notes
- The test suite extracts product details dynamically to ensure validations are accurate.
- Only one quantity per cart item is enforced (site behavior).
- Modal interactions (add to cart, continue shopping) are handled safely to avoid redirection issues.
- Screenshots and traces are included for failure scenarios to demonstrate HTML report reporting.

**Known Issue:** Currently stuck on removing a cart item during checkout; after clicking remove, the page unexpectedly redirects to the product detail page instead of updating the cart.

