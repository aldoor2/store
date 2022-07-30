import mock from "../../src/product/mocks/default.json";

describe("Products", () => {
  it("should show all products", () => {
    cy.visit("/default");

    cy.get('[data-testid="product"]').should(
      "have.length",
      mock.filter((item) => item.type === "product").length
    );
  });

  it("shows a message when there are no products", () => {
    cy.visit("/empty");

    cy.get('[data-testid="product"]').should("have.length", 0);

    cy.contains("No hay productos");
  });

  it("should show the cart drawer and close it correctly, making sure that the link is valid.", () => {
    cy.visit("/default");

    cy.get('[data-testid="cart"]').should("not.exist");
    cy.get('[data-testid="product"] button').first().click();
    cy.get('[data-testid="show-cart"]').click();
    cy.get('[data-testid="cart"]').should("be.visible");
    cy.get('[data-testid="continue-order"]').click();
    cy.get('[data-testid="complete-order"]')
      .should("have.attr", "href")
      .and("contain", "wa.me");
    cy.get('[aria-label="Close"]').click();
    cy.get('[data-testid="cart"]').should("not.exist");
  });
});
