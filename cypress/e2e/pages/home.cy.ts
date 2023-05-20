Cypress.Commands.add("testInitialPageCard", () => {
  const firstPokemon = {
    name: "Bulbasaur",
    weight: "6.9 Kg",
  };

  cy.dataCy("card-pokemon").should("have.length", 10);
  cy.dataCy("card-pokemon-name")
    .first()
    .should("contain.text", firstPokemon.name);
  cy.dataCy("card-pokemon-weight")
    .first()
    .should("contain.text", firstPokemon.weight);
  cy.dataCy("card-pokemon-moves").first().children().should("have.length", 4);

  cy.dataCy("pagination-text-pagination").should(
    "contain.text",
    "Página 1 de 129"
  );
});

describe("Home page", () => {
  it("Test redirect if user doesn't have a token", () => {
    cy.NotTokenAndRedirect();
  });

  it("Successfully loads and check components", () => {
    cy.SignInAndRedirect();

    // Check navbar
    cy.dataCy("navbar").should("exist");

    // Check cards
    cy.dataCy("card-pokemon").should("have.length", 10);
    cy.dataCy("card-pokemon-image").should("have.length", 10);

    // Check pagination
    cy.dataCy("pagination-text-total").should(
      "contain.text",
      "Hay un total de 1281 Pokemones"
    );
    cy.dataCy("pagination-text-pagination").should(
      "contain.text",
      "Página 1 de 129"
    );
    cy.dataCy("pagination-btn-previous").should("contain.text", "Anterior");
    cy.dataCy("pagination-btn-next").should("contain.text", "Siguiente");
  });

  it("Test card component in initial page", () => {
    cy.SignInAndRedirect();
    cy.testInitialPageCard();
  });

  it("Test next pagination and previous pagination", () => {
    const pokemonNewPage = {
      name: "Metapod",
      weight: "9.9 Kg",
    };

    cy.SignInAndRedirect();

    //  Pagination now
    cy.testInitialPageCard();

    cy.dataCy("pagination-btn-previous").should("contain.text", "Anterior");
    cy.dataCy("pagination-btn-previous").should("be.disabled");
    cy.dataCy("pagination-btn-next").should("contain.text", "Siguiente");

    // Pagination next
    cy.dataCy("pagination-btn-next").click();
    cy.dataCy("pagination-btn-previous").should("not.be.disabled");

    cy.dataCy("pagination-text-pagination").should(
      "contain.text",
      "Página 2 de 129"
    );

    // Check cards in new page
    cy.dataCy("card-pokemon-name")
      .first()
      .should("contain.text", pokemonNewPage.name);
    cy.dataCy("card-pokemon-weight")
      .first()
      .should("contain.text", pokemonNewPage.weight);
    cy.dataCy("card-pokemon-moves").first().children().should("have.length", 4);

    // Previous page
    cy.dataCy("pagination-btn-previous").click();
    cy.testInitialPageCard();
  });
});

