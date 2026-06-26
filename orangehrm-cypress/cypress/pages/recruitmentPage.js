class RecruitmentPage {
  selectorsList() {
    const selectors = {
      pageTitle: "h6.oxd-text--h6",
      searchButton: "[type='submit']",
      resetButton: "[type='reset']",
      addButton: "button",
      leaveTypeDropdown: ".oxd-select-text--arrow",
      secondItemCombobox: ".oxd-select-dropdown > :nth-child(2)",
      tableRows: ".oxd-table-row--clickable",
      noRecordsText: ".oxd-text",
      submitButton: "[type='submit']",
      cancelButton: "button",
      errorMessage: ".oxd-input-field-error-message",
      firstNameField: "[name='firstName']",
      lastNameField: "[name='lastName']",
      emailField: ".oxd-input-group",
    };

    return selectors;
  }

  checkVacanciesPage() {
    cy.url().should("include", "/recruitment");
    cy.contains(this.selectorsList().pageTitle, "Recruitment").should(
      "be.visible",
    );
  }

  checkCandidatesPage() {
    cy.url().should("include", "/viewCandidates");
    cy.contains(this.selectorsList().pageTitle, "Recruitment").should(
      "be.visible",
    );
  }

  checkAddCandidatePage() {
    cy.url().should("include", "/addCandidate");
    cy.contains(this.selectorsList().pageTitle, "Add Candidate").should(
      "be.visible",
    );
  }

  runSearchFilter() {
    cy.get(this.selectorsList().searchButton).click();
    cy.get(".oxd-loading-spinner", { timeout: 8000 }).should("not.exist");
  }

  resetSearch() {
    cy.get(this.selectorsList().resetButton).click();
  }

  clickAddCandidate() {
    cy.get(this.selectorsList().addButton).contains("Add").click();
    cy.url().should("include", "/addCandidate");
  }

  fillCandidateForm(firstName, lastName, email) {
    cy.get(this.selectorsList().firstNameField)
      .clear({ timeout: 10000 })
      .type(firstName);
    cy.get(this.selectorsList().lastNameField)
      .clear({ timeout: 10000 })
      .type(lastName);
    cy.contains(this.selectorsList().emailField, "Email")
      .find("input")
      .clear({ timeout: 10000 })
      .type(email);
  }

  saveForm() {
    cy.get(this.selectorsList().submitButton).click();
  }

  checkRequiredFieldErrors() {
    cy.get(this.selectorsList().errorMessage).should(
      "have.length.greaterThan",
      0,
    );
  }

  checkInvalidEmailError() {
    cy.contains(this.selectorsList().errorMessage, "Expected format").should(
      "be.visible",
    );
  }

  cancelForm() {
    cy.get(this.selectorsList().cancelButton).contains("Cancel").click();
  }
}

export default RecruitmentPage;
