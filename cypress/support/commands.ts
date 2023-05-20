/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("SignInAndRedirect", () => {
  // Credentials for login
  const email = "usuario@gmail.com";
  const password = "01020304";

  cy.visit("/iniciar-sesion");

  cy.get("input[name=email]").type(email);

  // {enter} causes the form to submit
  cy.get("input[name=password]").type(`${password}{enter}`);

  // We should be redirected to /
  cy.url().should("include", "/");

  // Our auth token should be present
  cy.window().its("localStorage.token").should("exist");
});
Cypress.Commands.add("NotTokenAndRedirect", (route = "/") => {
  // Our auth token should not be present
  cy.window().its("localStorage.token").should("not.exist");

  // Visit page
  cy.visit(route);

  // We should be redirected to signin
  cy.url().should("include", "/iniciar-sesion");
});
Cypress.Commands.add("openMenu", () => {
  // Check navbar
  cy.dataCy("navbar").should("exist");

  // Open menu
  cy.dataCy("btn-menu").click();
  cy.dataCy("menu").should("exist");
});
Cypress.Commands.add("dataCy", (value) => {
  return cy.get(`[data-cy=${value}]`);
});
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

