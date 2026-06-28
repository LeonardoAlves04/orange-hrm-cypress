class PimPage {
  selectorsList() {
    const selectors = {
      pageTitle: "h6.oxd-text--h6",
      employeeNameField: ".oxd-autocomplete-text-input input",
      searchButton: "button[type='submit']",
      resetButton: "button[type='reset']",
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
      submitButton: "button[type='submit']",
      cancelButton: "button",
      errorMessage: ".oxd-input-field-error-message",
      successToast: ".oxd-toast--success",
      loadingSpinner: ".oxd-loading-spinner",
    };

    return selectors;
  }

  waitForLoading() {
    cy.get(this.selectorsList().loadingSpinner, { timeout: 10000 }).should(
      "not.exist"
    );
  }

  checkEmployeeListPage() {
    cy.url().should("include", "/pim");
    cy.contains(this.selectorsList().pageTitle, "PIM", {
      timeout: 10000,
    }).should("be.visible");
    this.waitForLoading();
  }

  checkTableHasRecords() {
    cy.get(this.selectorsList().tableRows, { timeout: 10000 }).should(
      "have.length.greaterThan",
      0
    );
  }

  searchByName(firstName, lastName) {
    cy.get(this.selectorsList().employeeNameField)
      .eq(0)
      .clear({ force: true })
      .type(`${firstName} ${lastName}`, { force: true });
    cy.get(this.selectorsList().searchButton).click();
    this.waitForLoading();
  }

  resetSearch() {
    cy.get(this.selectorsList().resetButton).click();
    this.waitForLoading();
    cy.get(this.selectorsList().employeeNameField).eq(0).should("have.value", "");
  }

  checkNoRecordsFound() {
    cy.get(this.selectorsList().noRecordsText, { timeout: 10000 })
      .contains("No Records Found")
      .should("be.visible");
  }

  clickAddEmployee() {
    cy.contains(this.selectorsList().addEmployeeButton, /^Add$/, {
      timeout: 10000,
    })
      .should("be.visible")
      .click();
    cy.url().should("include", "/addEmployee");
    cy.get(this.selectorsList().firstNameField, { timeout: 10000 }).should(
      "be.visible"
    );
  }

  fillEmployeeForm(firstName, middleName, lastName, employeeId = "") {
    cy.get(this.selectorsList().firstNameField)
      .clear({ force: true })
      .type(firstName, { force: true });
    cy.get(this.selectorsList().middleNameField)
      .clear({ force: true })
      .type(middleName, { force: true });
    cy.get(this.selectorsList().lastNameField)
      .clear({ force: true })
      .type(lastName, { force: true });

    if (employeeId) {
      cy.get(this.selectorsList().employeeIdField, { timeout: 10000 })
        .should("be.visible")
        .clear({ force: true })
        .type(employeeId, { force: true });
    }
  }

  enableCreateLogin(username, password) {
    cy.get(this.selectorsList().createLoginToggle).click();
    cy.contains(".oxd-input-group", "Username")
      .find("input")
      .clear({ force: true })
      .type(username, { force: true });
    cy.get(this.selectorsList().passwordField).eq(0).clear().type(password);
    cy.get(this.selectorsList().passwordField).eq(1).clear().type(password);
  }

  saveForm() {
    cy.get(this.selectorsList().submitButton)
      .should("be.visible")
      .and("not.be.disabled")
      .click();
  }

  checkRequiredFieldErrors() {
    cy.get(this.selectorsList().errorMessage).should(
      "have.length.greaterThan",
      0
    );
  }

  checkEmployeeSaved() {
    cy.location("pathname", { timeout: 20000 }).should(
      "include",
      "/pim/viewPersonalDetails"
    );
    this.waitForLoading();
  }

  searchByEmployeeId(employeeId) {
    cy.contains(".oxd-input-group", "Employee Id", { timeout: 10000 })
      .find("input")
      .clear({ force: true })
      .type(employeeId, { force: true });
    cy.get(this.selectorsList().searchButton).click();
    this.waitForLoading();
  }

  checkEmployeeInTable(employeeId, fullName) {
    cy.get(this.selectorsList().tableRows, { timeout: 15000 })
      .should("have.length.greaterThan", 0)
      .then(($rows) => {
        const rowsText = $rows.text().replace(/\s+/g, " ");
        expect(rowsText).to.contain(employeeId);
        fullName.split(" ").forEach((namePart) => {
          expect(rowsText).to.contain(namePart);
        });
      });
  }

  cancelForm() {
    cy.contains(this.selectorsList().cancelButton, "Cancel").click();
    cy.url().should("include", "/viewEmployeeList");
  }
}

export default PimPage;