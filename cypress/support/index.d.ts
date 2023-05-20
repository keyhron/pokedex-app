declare namespace Cypress {
  interface Chainable {
    // Global
    dataCy(value: string): Chainable<JQuery<HTMLElement>>;
    // SignIn page
    SignInAndRedirect(): Chainable<void>;
    NotTokenAndRedirect(route?: string): Chainable<void>;
    // Home page
    testInitialPageCard(): Chainable<void>;
    nextPagination(): Chainable<void>;
    // Profile Page
    openMenu(): Chainable<void>;
  }
}

