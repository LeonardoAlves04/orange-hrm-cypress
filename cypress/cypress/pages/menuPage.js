class MenuPage {
  selectorsList() {
    const selectors = {
      menuItem: "a.oxd-main-menu-item",
      myInfoButton: "[href*='/pim/viewMyDetails']",
      adminButton: "[href*='/admin/viewAdminModule']",
      pimButton: "[href*='/pim/viewPimModule']",
      leaveButton: "[href*='/leave/viewLeaveModule']",
      timeButton: "[href*='/time/viewTimeModule']",
      recruitmentButton: "[href*='/recruitment/viewRecruitmentModule']",
      performanceButton: "[href*='/performance/viewPerformanceModule']",
      dashboardButton: "[href*='/dashboard/index']",
      directoryButton: "[href*='/directory/viewDirectory']",
      maintenanceButton: "[href*='/maintenance/viewMaintenanceModule']",
      claimButton: "[href*='/claim/viewClaimModule']",
      buzzButton: "[href*='/buzz/viewBuzz']",
      loadingSpinner: ".oxd-loading-spinner",
    };

    return selectors;
  }

  clickMenuItem(label) {
    cy.contains(this.selectorsList().menuItem, label, { timeout: 10000 })
      .should("be.visible")
      .scrollIntoView()
      .click();
    cy.get(this.selectorsList().loadingSpinner, { timeout: 10000 }).should(
      "not.exist"
    );
  }

  acessMyInfo() {
    this.clickMenuItem("My Info");
  }

  acessAdmin() {
    this.clickMenuItem("Admin");
  }

  acessPim() {
    this.clickMenuItem("PIM");
  }

  acessLeave() {
    this.clickMenuItem("Leave");
  }

  acessTime() {
    this.clickMenuItem("Time");
  }

  acessRecruitment() {
    this.clickMenuItem("Recruitment");
  }

  acessPerformance() {
    this.clickMenuItem("Performance");
  }

  acessDirectory() {
    this.clickMenuItem("Directory");
  }

  acessBuzz() {
    this.clickMenuItem("Buzz");
  }

  acessDashboard() {
    this.clickMenuItem("Dashboard");
  }

  acessMaintenance() {
    this.clickMenuItem("Maintenance");
  }

  acessClaim() {
    this.clickMenuItem("Claim");
  }

  checkAllMenuItemsVisible() {
    const items = [
      "Admin",
      "PIM",
      "Leave",
      "Time",
      "Recruitment",
      "My Info",
      "Performance",
      "Dashboard",
      "Directory",
      "Maintenance",
      "Claim",
      "Buzz",
    ];

    items.forEach((label) => {
      cy.contains(this.selectorsList().menuItem, label).should("be.visible");
    });
  }
}

export default MenuPage;