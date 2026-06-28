class BuzzPage {
  selectorsList() {
    const selectors = {
      postInput: ".oxd-buzz-post-input",
      postButton: ".oxd-button--main[type='submit']",
      posts: ".orangehrm-buzz-post-body-text",
      postCardFooter: ".orangehrm-buzz-post-footer",
      postActionButtons: "button",
      loadingSpinner: ".oxd-loading-spinner",
      successToast: ".oxd-toast--success",
      likeIcon: ".orangehrm-heart-icon",
      commentIcon: ".bi-chat-text-fill",
      shareIcon: ".bi-share-fill",
    };

    return selectors;
  }

  checkBuzzPage() {
    cy.url().should("include", "/buzz");
    cy.get(this.selectorsList().loadingSpinner, { timeout: 10000 }).should(
      "not.exist",
    );
  }

  checkPostInputVisible() {
    cy.get(this.selectorsList().postInput, { timeout: 10000 }).should(
      "be.visible",
    );
  }

  checkFeedHasPosts() {
    cy.get(this.selectorsList().posts, { timeout: 10000 }).should("exist");
  }

  checkFirstPostHasActionButtons() {
    cy.get(this.selectorsList().loadingSpinner, { timeout: 10000 }).should(
      "not.exist",
    );

    cy.get(this.selectorsList().postCardFooter, { timeout: 20000 })
      .should("have.length.greaterThan", 0)
      .first()
      .should("be.visible")
      .within(() => {
        cy.get(this.selectorsList().likeIcon, { timeout: 20000 }).should(
          "exist",
        );
        cy.get(this.selectorsList().commentIcon, { timeout: 20000 }).should(
          "exist",
        );
        cy.get(this.selectorsList().shareIcon, { timeout: 20000 }).should(
          "exist",
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
    cy.get(this.selectorsList().postButton, { timeout: 10000 }).click({
      force: true,
    });
    cy.get(this.selectorsList().successToast, { timeout: 10000 }).should(
      "be.visible",
    );
  }

  checkPostInFeed(text) {
    cy.get(this.selectorsList().loadingSpinner, { timeout: 15000 }).should(
      "not.exist",
    );
    cy.contains(this.selectorsList().posts, text, { timeout: 20000 })
      .scrollIntoView()
      .should("be.visible");
  }
}

export default BuzzPage;
