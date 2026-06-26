import userData from "../fixtures/user-data.json";
import LoginPage from "../pages/loginPage";
import DashboardPage from "../pages/dashboardPage";
import MenuPage from "../pages/menuPage";

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const menuPage = new MenuPage();

describe("Dashboard Tests", () => {
  beforeEach(() => {
    loginPage.acessLoginPage();
    loginPage.loginWithUser(
      userData.userSuccess.username,
      userData.userSuccess.password
    );
    dashboardPage.checkDashboardPage();
  });

  it("Dashboard - Widgets Visible", () => {
    dashboardPage.checkWidgetsVisible();
  });

  it("Dashboard - All Menu Items Visible", () => {
    menuPage.checkAllMenuItemsVisible();
  });

  it("Dashboard - Navigate to PIM", () => {
    menuPage.acessPim();
    cy.url().should("include", "/pim");
  });

  it("Dashboard - Navigate to Leave", () => {
    menuPage.acessLeave();
    cy.url().should("include", "/leave");
  });

  it("Dashboard - Navigate to Admin", () => {
    menuPage.acessAdmin();
    cy.url().should("include", "/admin");
  });

  it("Dashboard - Navigate to Recruitment", () => {
    menuPage.acessRecruitment();
    cy.url().should("include", "/recruitment");
  });

  it("Dashboard - Navigate to Performance", () => {
    menuPage.acessPerformance();
    cy.url().should("include", "/performance");
  });

  it("Dashboard - User Dropdown Options Visible", () => {
    dashboardPage.openUserDropdown();
    cy.get(".oxd-userdropdown-link").contains("Logout").should("be.visible");
    cy.get(".oxd-userdropdown-link")
      .contains("Change Password")
      .should("be.visible");
    cy.get(".oxd-userdropdown-link").contains("About").should("be.visible");
    cy.get(".oxd-userdropdown-link").contains("Support").should("be.visible");
  });

  it("Dashboard - Logout Success", () => {
    dashboardPage.logout();
    cy.url().should("include", "/auth/login");
  });

  it("Dashboard - Logout Blocks Protected Route", () => {
    dashboardPage.logout();
    cy.visit("dashboard/index");
    cy.url().should("include", "/auth/login");
  });
});
