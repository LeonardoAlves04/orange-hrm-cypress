class DirectoryPage {
  selectorsList() {
    const selectors = {
      pageTitle: "h6.oxd-text--h6",
      nameSearchField: ".oxd-input",
      searchButton: "[type='submit']",
      resetButton: "[type='reset']",
      directoryCards: ".orangehrm-directory-card",
      cardText: "p, .oxd-text",
    };

    return selectors;
  }

  checkDirectoryPage() {
    cy.url().should("include", "/directory");
    cy.get(this.selectorsList().pageTitle)
      .contains("Directory")
      .should("be.visible");
  }

  checkCardsVisible() {
    cy.get(this.selectorsList().directoryCards).should(
      "have.length.greaterThan",
      0
    );
  }

  searchByName(name) {
    cy.get(this.selectorsList().nameSearchField).eq(0).clear().type(name);
    cy.get(this.selectorsList().searchButton).click();
    cy.get(".oxd-loading-spinner", { timeout: 8000 }).should("not.exist");
  }

  resetSearch() {
    cy.get(this.selectorsList().resetButton).click();
    cy.get(".oxd-loading-spinner", { timeout: 8000 }).should("not.exist");
    cy.get(this.selectorsList().directoryCards).should(
      "have.length.greaterThan",
      0
    );
  }

  checkFirstCardHasContent() {
    cy.get(this.selectorsList().directoryCards)
      .first()
      .within(() => {
        cy.get(this.selectorsList().cardText).should(
          "have.length.greaterThan",
          0
        );
      });
  }
}

export default DirectoryPage;
