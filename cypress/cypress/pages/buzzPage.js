class BuzzPage {
  selectorsList() {
    const selectors = {
      postInput: ".oxd-buzz-post-input",
      postButton: "button",
      posts: ".orangehrm-buzz-post",
      postActionButtons: "button",
      loadingSpinner: ".oxd-loading-spinner",
    };

    return selectors;
  }

  checkBuzzPage() {
    cy.url().should("include", "/buzz");
    cy.get(this.selectorsList().loadingSpinner, { timeout: 10000 }).should(
      "not.exist"
    );
  }

  checkPostInputVisible() {
    cy.get(this.selectorsList().postInput, { timeout: 10000 }).should(
      "be.visible"
    );
  }

  checkFeedHasPosts() {
    cy.get(this.selectorsList().posts, { timeout: 10000 }).should("exist");
  }

  checkFirstPostHasActionButtons() {
    cy.get(this.selectorsList().posts, { timeout: 10000 })
      .first()
      .within(() => {
        cy.get(this.selectorsList().postActionButtons).should(
          "have.length.greaterThan",
          0
        );
      });
  }

  typePost(text) {
    cy.get(this.selectorsList().postInput, { timeout: 10000 })
      .first()
      .should("be.visible")
      .click()
      .clear({ force: true })
      .type(text, { force: true, delay: 0 });
  }

  checkPostInputHasText(text) {
    cy.get(this.selectorsList().postInput, { timeout: 10000 })
      .first()
      .should(($field) => {
        const fieldText = $field.val() || $field.text();
        expect(fieldText).to.contain(text);
      });
  }

  submitPost() {
    cy.contains(this.selectorsList().postButton, /^Post$/, { timeout: 10000 })
      .should("be.visible")
      .and("not.be.disabled")
      .click();
  }

  checkPostInFeed(text) {
    cy.get(this.selectorsList().loadingSpinner, { timeout: 15000 }).should(
      "not.exist"
    );
    cy.contains(this.selectorsList().posts, text, { timeout: 20000 })
      .scrollIntoView()
      .should("be.visible");
  }
}

export default BuzzPage;