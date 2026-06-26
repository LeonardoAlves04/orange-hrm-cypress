class DashboardPage {
  selectorsList() {
    const selectors = {
      dashboardGrid: "[class='oxd-layout-context']",
      dashboardWidget: ".orangehrm-dashboard-widget",
      userDropdown: ".oxd-userdropdown-tab",
      userDropdownLink: ".oxd-userdropdown-link",
    };

    return selectors;
  }

  checkDashboardPage() {
    cy.location("pathname", {
      timeout: 10000,
    }).should("equal", "/web/index.php/dashboard/index");
    cy.get(this.selectorsList().dashboardGrid).should("be.visible");
  }

  checkWidgetsVisible() {
    cy.get(this.selectorsList().dashboardWidget).should(
      "have.length.greaterThan",
      0
    );
  }

  openUserDropdown() {
    cy.get(this.selectorsList().userDropdown).click();
    cy.get(this.selectorsList().userDropdownLink).should("be.visible");
  }

  logout() {
    this.openUserDropdown();
    cy.get(this.selectorsList().userDropdownLink).contains("Logout").click();
  }
}

export default DashboardPage;
