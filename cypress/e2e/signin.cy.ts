describe("Signin page", () => {
  it("Successfully loads", () => {
    cy.visit("/iniciar-sesion"); // change URL to match your dev URL
  });

  it("Signin success", function () {
    const email = "usuario@gmail.com";
    const password = "01020304";

    cy.visit("/iniciar-sesion");

    cy.get("input[name=email]").type(email);

    // {enter} causes the form to submit
    cy.get("input[name=password]").type(`${password}{enter}`);

    // We should be redirected to /
    cy.url().should("include", "/");

    // Our auth token should be present
    cy.window().then((win) => {
      cy.wrap(win.localStorage.getItem("token")).should("exist");
    });
  });
});

