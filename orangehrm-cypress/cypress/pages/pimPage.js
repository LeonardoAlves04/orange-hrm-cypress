class PimPage {
  selectorsList() {
    const selectors = {
      pageTitle: "h6.oxd-text--h6",
      employeeNameField: ".oxd-autocomplete-text-input input",
      searchButton: "[type='submit']",
      resetButton: "[type='reset']",
      addEmployeeButton: "button",
      tableRows: ".oxd-table-card",
      noRecordsText: ".oxd-text",
      firstNameField: "[name='firstName']",
      middleNameField: "[name='middleName']",
      lastNameField: "[name='lastName']",
      employeeIdField: ".orangehrm-employee-id input",
      createLoginToggle: ".oxd-switch-input",
      usernameField: "input[autocomplete='off']",
      passwordField: "input[type='password']",
      submitButton: "[type='submit']",
      cancelButton: "button",
      errorMessage: ".oxd-input-field-error-message",
    };

    return selectors;
  }

  checkEmployeeListPage() {
    cy.url().should("include", "/pim");
    cy.contains(this.selectorsList().pageTitle, "PIM").should("be.visible");
  }

  checkTableHasRecords() {
    cy.get(this.selectorsList().tableRows).should("have.length.greaterThan", 0);
  }

  searchByName(firstName, lastName) {
    cy.get(this.selectorsList().employeeNameField)
      .eq(0)
      .clear()
      .type(`${firstName} ${lastName}`);
    cy.get(this.selectorsList().searchButton).click();
    cy.get(".oxd-loading-spinner", { timeout: 8000 }).should("not.exist");
  }

  resetSearch() {
    cy.get(this.selectorsList().resetButton).click();
    cy.get(this.selectorsList().employeeNameField)
      .eq(0)
      .should("have.value", "");
  }

  checkNoRecordsFound() {
    cy.get(this.selectorsList().noRecordsText)
      .contains("No Records Found")
      .should("be.visible");
  }

  clickAddEmployee() {
    cy.get(this.selectorsList().addEmployeeButton).contains("Add").click();
    cy.url().should("include", "/addEmployee");
  }

  fillEmployeeForm(firstName, middleName, lastName, employeeId = "") {
    cy.get(this.selectorsList().firstNameField)
      .clear({ timeout: 10000 })
      .type(firstName);
    cy.get(this.selectorsList().middleNameField)
      .clear({ timeout: 10000 })
      .type(middleName);
    cy.get(this.selectorsList().lastNameField)
      .clear({ timeout: 10000 })
      .type(lastName);

    if (employeeId) {
      cy.get(this.selectorsList().employeeIdField)
        .clear({ timeout: 10000 })
        .type(employeeId);
    }
  }

  enableCreateLogin(username, password) {
    cy.get(this.selectorsList().createLoginToggle).click();
    cy.contains(".oxd-input-group", "Username")
      .find("input")
      .clear()
      .type(username);
    cy.get(this.selectorsList().passwordField).eq(0).clear().type(password);
    cy.get(this.selectorsList().passwordField).eq(1).clear().type(password);
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

  checkEmployeeSaved() {
    cy.url().should("include", "/viewPersonalDetails");
  }

  searchByEmployeeId(employeeId) {
    cy.contains(".oxd-input-group", "Employee Id")
      .find("input")
      .clear()
      .type(employeeId);
    cy.get(this.selectorsList().searchButton).click();
    cy.get(".oxd-loading-spinner", { timeout: 8000 }).should("not.exist");
  }

  checkEmployeeInTable(employeeId, fullName) {
    cy.get(this.selectorsList().tableRows)
      .should("have.length.greaterThan", 0)
      .first()
      .should("contain.text", employeeId)
      .and("contain.text", fullName);
  }

  cancelForm() {
    cy.get(this.selectorsList().cancelButton).contains("Cancel").click();
    cy.url().should("include", "/viewEmployeeList");
  }
}

export default PimPage;
