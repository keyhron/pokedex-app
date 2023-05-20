import errorsEs from "@/data/errorsEs.json";

describe("Signin page", () => {
  it("Successfully loads and check components", () => {
    cy.visit("/iniciar-sesion");

    // Check title
    cy.dataCy("title").should("contain.text", "Iniciar sesión");

    // Check Inputs
    cy.get("input[name=email]").should(
      "have.attr",
      "placeholder",
      "Correo electrónico"
    );
    cy.get("input[name=password]").should(
      "have.attr",
      "placeholder",
      "Contraseña"
    );

    // Check button
    cy.get("button[type=submit]").should("contain.text", "Entrar");
  });

  it("Successfully change eye icon in input password", () => {
    cy.visit("/iniciar-sesion");

    cy.get("input[name=password]").should("have.attr", "type", "password");
    cy.dataCy("eye-btn").click();
    cy.get("input[name=password]").should("have.attr", "type", "text");
  });

  it("Signin required password", function () {
    const password = "01020304";

    cy.visit("/iniciar-sesion");
    cy.get("input[name=password]").type(`${password}{enter}`);

    cy.get("div.swal2-html-container").should(
      "contain.text",
      errorsEs.signIn.required
    );
  });

  it("Signin required email", function () {
    const email = "usuario@gmail.com";

    cy.visit("/iniciar-sesion");

    // {enter} causes the form to submit
    cy.get("input[name=email]").type(`${email}{enter}`);

    cy.get("div.swal2-html-container").should(
      "contain.text",
      errorsEs.signIn.required
    );
  });

  it("Signin invalid email", function () {
    const email = "usuario8@gm.c";
    const password = "01020304";

    cy.visit("/iniciar-sesion");

    cy.get("input[name=email]").type(email);

    // {enter} causes the form to submit
    cy.get("input[name=password]").type(`${password}{enter}`);

    cy.get("div.swal2-html-container").should(
      "contain.text",
      errorsEs.signIn.email.invalid
    );
  });

  it("Signin bad email", function () {
    const email = "usuario8@gmail.com";
    const password = "01020304";

    cy.visit("/iniciar-sesion");

    cy.get("input[name=email]").type(email);

    // {enter} causes the form to submit
    cy.get("input[name=password]").type(`${password}{enter}`);

    cy.get("div.swal2-html-container").should(
      "contain.text",
      errorsEs.signIn.incorrect
    );
  });

  it("Signin bad password", function () {
    const email = "usuario@gmail.com";
    const password = "01020306";

    cy.visit("/iniciar-sesion");

    cy.get("input[name=email]").type(email);

    // {enter} causes the form to submit
    cy.get("input[name=password]").type(`${password}{enter}`);

    cy.get("div.swal2-html-container").should(
      "contain.text",
      errorsEs.signIn.incorrect
    );
  });

  it("Signin min length password error", function () {
    const email = "usuario@gmail.com";
    const password = "0102030";

    cy.visit("/iniciar-sesion");

    cy.get("input[name=email]").type(email);

    // {enter} causes the form to submit
    cy.get("input[name=password]").type(`${password}{enter}`);

    cy.get("div.swal2-html-container").should(
      "contain.text",
      errorsEs.signIn.password.minLength
    );
  });

  it("Signin success with enter keyboard", function () {
    cy.SignInAndRedirect();
  });

  it("Signin success with click button", function () {
    const email = "usuario@gmail.com";
    const password = "01020304";

    cy.visit("/iniciar-sesion");

    cy.get("input[name=email]").type(email);

    cy.get("input[name=password]").type(password);

    cy.get("button[type=submit]").click();

    // We should be redirected to /
    cy.url().should("include", "/");

    // Our auth token should be present
    cy.window().its("localStorage.token").should("exist");
  });

  it("Signin and signout", function () {
    cy.SignInAndRedirect();
    cy.openMenu();
    cy.dataCy("btn-signout").should("contain.text", "Cerrar sesión");
    cy.dataCy("btn-signout").click();

    // We should be redirected to signin
    cy.url().should("include", "/iniciar-sesion");
    // Our auth token should not be present
    cy.window().its("localStorage.token").should("not.exist");
  });

  it("Signin, after validate token and redirect", function () {
    cy.SignInAndRedirect();

    cy.visit("/iniciar-sesion");

    // We should be redirected to signin
    cy.url().should("include", "/");
  });
});

