export const loginSelectors = {
  // Navigation
  loginLink: 'a[href="/login"]',

  // Login form (existing user)
  loginForm: 'form[action="/login"]',
  loginEmail: 'input[data-qa="login-email"]',
  loginPassword: 'input[data-qa="login-password"]',
  loginButton: 'button[data-qa="login-button"]',

  // // Signup form (new user)
  // signupForm: 'form[action="/signup"]',
  // signupName: 'input[data-qa="signup-name"]',
  // signupEmail: 'input[data-qa="signup-email"]',
  // signupButton: 'button[data-qa="signup-button"]',

  // // Account creation (after signup)
  // accountInfoForm: '#form',
  // titleMr: '#id_gender1',
  // titleMrs: '#id_gender2',
  // password: '#password',
  // days: '#days',
  // months: '#months',
  // years: '#years',

  // firstName: '#first_name',
  // lastName: '#last_name',
  // company: '#company',
  // address1: '#address1',
  // address2: '#address2',
  // country: '#country',
  // state: '#state',
  // city: '#city',
  // zipcode: '#zipcode',
  // mobileNumber: '#mobile_number',

  // createAccountButton: 'button[data-qa="create-account"]',
  // accountCreatedMessage: 'h2[data-qa="account-created"]',
  // continueButton: 'a[data-qa="continue-button"]',

  // Logged-in state
  loggedInUser: 'a:has-text("Logged in as")',
  logoutLink: 'a[href="/logout"]',
  deleteAccountLink: 'a[href="/delete_account"]',
};
