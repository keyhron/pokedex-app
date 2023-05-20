describe("Pokemon page", () => {
  it("Test redirect if user doesn't have a token", () => {
    cy.NotTokenAndRedirect("/pokemon/1");
  });

  it("Successfully loads and check components", () => {
    const pokemon = {
      name: "Bulbasaur",
      weight: "Peso: 6.9 Kg",
      height: "Altura: 0.7 Mts",
    };

    cy.SignInAndRedirect();
    cy.dataCy("card-pokemon").first().click();

    // We should be redirected
    cy.url().should("include", "/pokemon/1");

    // Check navbar
    cy.dataCy("navbar").should("exist");

    // Check pokemon
    cy.dataCy("title").should("contain.text", pokemon.name);
    cy.dataCy("pokemon-image").should("exist");
    cy.dataCy("pokemon-weigth").should("contain.text", pokemon.weight);
    cy.dataCy("pokemon-heigth").should("contain.text", pokemon.height);
    cy.dataCy("pokemon-abilities")
      .get("ul")
      .children()
      .should("have.length.gte", 1);
    cy.dataCy("pokemon-types")
      .get("ul")
      .children()
      .should("have.length.gte", 1);
    cy.dataCy("pokemon-stats")
      .get("ul")
      .children()
      .should("have.length.gte", 1);
    cy.dataCy("pokemon-moves")
      .get("ul")
      .children()
      .should("have.length.gte", 1);
  });

  it("Test link go to home", () => {
    cy.SignInAndRedirect();
    cy.dataCy("card-pokemon").first().click();

    // We should be redirected
    cy.url().should("include", "/pokemon/1");
    cy.dataCy("link-to-home").click();

    cy.url().should("include", "/");
  });
});

