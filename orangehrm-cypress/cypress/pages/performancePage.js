class PerformancePage {
  selectorsList() {
    const selectors = {
      pageTitle: "h6.oxd-text--h6",
      searchButton: "[type='submit']",
      addButton: "button",
      table: ".oxd-table",
      submitButton: "[type='submit']",
      cancelButton: "button",
      errorMessage: ".oxd-input-field-error-message",
      topbarNavItem: "a.oxd-topbar-body-nav-tab",
      dropdownMenu: ".oxd-dropdown-menu",
      dropdownItem: ".oxd-dropdown-menu a",
    };

    return selectors;
  }

  checkManageReviewsPage() {
    cy.url().should("include", "/performance");
    cy.get(this.selectorsList().table).should("be.visible");
  }

  checkKpiPage() {
    cy.url().should("include", "/searchKpi");
    cy.contains(this.selectorsList().pageTitle, "Configure").should(
      "be.visible"
    );
  }

  checkMyTrackerPage() {
    cy.url().should("include", "/viewMyPerformanceTrackerList");
    cy.contains(
      this.selectorsList().pageTitle,
      "My Performance Trackers"
    ).should("be.visible");
    cy.get(this.selectorsList().table).should("be.visible");
  }

  runSearchFilter() {
    cy.get(this.selectorsList().searchButton).click();
    cy.get(".oxd-loading-spinner", { timeout: 8000 }).should("not.exist");
  }

  clickAddKpi() {
    cy.get(this.selectorsList().addButton).contains("Add").click();
    cy.url().should("include", "/saveKpi");
  }

  checkRequiredFieldErrors() {
    cy.get(this.selectorsList().errorMessage).should(
      "have.length.greaterThan",
      0
    );
  }

  openManageMenu() {
    cy.get(this.selectorsList().topbarNavItem).contains("Manage").click();
    cy.get(this.selectorsList().dropdownMenu).should("be.visible");
  }

  navigateToReviews() {
    this.openManageMenu();
    cy.get(this.selectorsList().dropdownItem).contains("Manage Reviews").click();
    cy.url().should("include", "/searchPerformanceReview");
  }
}

export default PerformancePage;
