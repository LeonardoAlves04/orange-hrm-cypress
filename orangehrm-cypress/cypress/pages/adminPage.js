class AdminPage {
  selectorsList() {
    const selectors = {
      pageTitle: "h6.oxd-text--h6",
      usernameSearchField: ".oxd-form .oxd-input",
      searchButton: "[type='submit']",
      resetButton: ".oxd-button--ghost",
      addButton: "button",
      tableRows: ".oxd-table-card",
      noRecordsText: ".oxd-text",
      userRoleDropdown: ".oxd-select-text--arrow",
      secondItemCombobox: ".oxd-select-dropdown > :nth-child(2)",
      submitButton: "[type='submit']",
      cancelButton: "button",
      errorMessage: ".oxd-input-field-error-message",
      successToast: ".oxd-toast--success",
      topbarNavItem: ".oxd-topbar-body-nav-tab",
      dropdownMenu: ".oxd-dropdown-menu",
      dropdownItem: ".oxd-dropdown-menu a",
    };

    return selectors;
  }

  checkSystemUsersPage() {
    cy.url().should("include", "/viewSystemUsers");
    cy.contains(this.selectorsList().pageTitle, "User Management").should(
      "be.visible",
    );
  }

  checkTableHasRecords() {
    cy.get(this.selectorsList().tableRows).should("have.length.greaterThan", 0);
  }

  searchByUsername(username) {
    cy.contains(".oxd-input-group", "Username")
      .find("input")
      .clear()
      .type(username);
    cy.get(this.selectorsList().searchButton).click();
    cy.get(".oxd-loading-spinner", { timeout: 8000 }).should("not.exist");
  }

  resetSearch() {
    cy.get(this.selectorsList().resetButton).click();
    cy.contains(".oxd-input-group", "Username")
      .find("input")
      .should("have.value", "");
  }

  checkNoRecordsFound() {
    cy.get(this.selectorsList().noRecordsText)
      .contains("No Records Found")
      .should("be.visible");
  }

  clickAdd() {
    cy.get(this.selectorsList().addButton).contains("Add").click();
    cy.url().should("include", "/saveSystemUser");
  }

  checkAddUserPage() {
    cy.contains(this.selectorsList().pageTitle, "Add User").should(
      "be.visible",
    );
  }

  checkRequiredFieldErrors() {
    cy.get(this.selectorsList().errorMessage).should(
      "have.length.greaterThan",
      0,
    );
  }

  cancelForm() {
    cy.get(this.selectorsList().cancelButton).contains("Cancel").click();
    cy.url().should("include", "/viewSystemUsers");
  }

  openJobMenu() {
    cy.get(this.selectorsList().topbarNavItem).contains("Job").click();
    cy.get(this.selectorsList().dropdownMenu).should("be.visible");
  }

  openOrganizationMenu() {
    cy.get(this.selectorsList().topbarNavItem).contains("Organization").click();
    cy.get(this.selectorsList().dropdownMenu).should("be.visible");
  }

  navigateToJobTitles() {
    this.openJobMenu();
    cy.get(this.selectorsList().dropdownItem).contains("Job Titles").click();
    cy.url().should("include", "/viewJobTitleList");
  }
}

export default AdminPage;
