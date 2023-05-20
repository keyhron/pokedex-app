import usersData from "@/data/userData.json";

describe("Pokemon page", () => {
  it("Test redirect if user doesn't have a token", () => {
    cy.NotTokenAndRedirect("/perfil");
  });

  it("Successfully loads and check components", () => {
    cy.SignInAndRedirect();
    cy.openMenu();

    cy.dataCy("nav-profile").should("contain.text", "Mi perfil");
    cy.dataCy("nav-profile").click();

    // We should be redirected to profile
    cy.url().should("include", "/perfil");

    // Check navbar loads again
    cy.dataCy("navbar").should("exist");

    // Check pokemon
    cy.dataCy("title").should("contain.text", "Mi perfil");
    cy.dataCy("user-fullname").should(
      "contain.text",
      `${usersData[0].first_name} ${usersData[0].last_name}`
    );
    cy.dataCy("user-email").should("contain.text", usersData[0].email);
  });

  it("Test link go to home", () => {
    cy.SignInAndRedirect();
    cy.openMenu();
    cy.dataCy("nav-profile").click();

    // We should be redirected to profile
    cy.url().should("include", "/perfil");
    cy.dataCy("link-to-home").click();
    cy.url().should("include", "/");
  });
});

