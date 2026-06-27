class MenuPage {
  selectorsList() {
    const selectors = {
      myInfoButton: "[href='/web/index.php/pim/viewMyDetails']",
      adminButton: "[href='/web/index.php/admin/viewAdminModule']",
      pimButton: "[href='/web/index.php/pim/viewPimModule']",
      leaveButton: "[href='/web/index.php/leave/viewLeaveModule']",
      timeButton: "[href='/web/index.php/time/viewTimeModule']",
      recruitmentButton:
        "[href='/web/index.php/recruitment/viewRecruitmentModule']",
      performanceButton:
        "[href='/web/index.php/performance/viewPerformanceModule']",
      dashboardButton: "[href='/web/index.php/dashboard/index']",
      directoryButton: "[href='/web/index.php/directory/viewDirectory']",
      maintenanceButton:
        "[href='/web/index.php/maintenance/viewMaintenanceModule']",
      claimButton: "[href='/web/index.php/claim/viewClaimModule']",
      buzzButton: "[href='/web/index.php/buzz/viewBuzz']",
    };

    return selectors;
  }

  acessMyInfo() {
    cy.get(this.selectorsList().myInfoButton).click();
  }

  acessAdmin() {
    cy.get(this.selectorsList().adminButton).click();
  }

  acessPim() {
    cy.get(this.selectorsList().pimButton).click();
  }

  acessLeave() {
    cy.get(this.selectorsList().leaveButton).click();
  }

  acessTime() {
    cy.get(this.selectorsList().timeButton).click();
  }

  acessRecruitment() {
    cy.get(this.selectorsList().recruitmentButton).click();
  }

  acessPerformance() {
    cy.get(this.selectorsList().performanceButton).click();
  }

  acessDirectory() {
    cy.get(this.selectorsList().directoryButton).click();
  }

  acessBuzz() {
    cy.get(this.selectorsList().buzzButton).click();
  }

  acessDashboard() {
    cy.get(this.selectorsList().dashboardButton).click();
  }

  acessMaintenance() {
    cy.get(this.selectorsList().maintenanceButton).click();
  }

  acessClaim() {
    cy.get(this.selectorsList().claimButton).click();
  }

  checkAllMenuItemsVisible() {
    const items = [
      "adminButton",
      "pimButton",
      "leaveButton",
      "timeButton",
      "recruitmentButton",
      "myInfoButton",
      "performanceButton",
      "dashboardButton",
      "directoryButton",
      "maintenanceButton",
      "claimButton",
      "buzzButton",
    ];
    items.forEach((key) => {
      cy.get(this.selectorsList()[key]).should("be.visible");
    });
  }
}

export default MenuPage;
