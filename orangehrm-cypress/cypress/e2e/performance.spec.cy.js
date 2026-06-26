import userData from "../fixtures/user-data.json";
import LoginPage from "../pages/loginPage";
import DashboardPage from "../pages/dashboardPage";
import MenuPage from "../pages/menuPage";
import PerformancePage from "../pages/performancePage";

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const menuPage = new MenuPage();
const performancePage = new PerformancePage();

describe("Performance Tests", () => {
  beforeEach(() => {
    loginPage.acessLoginPage();
    loginPage.loginWithUser(
      userData.userSuccess.username,
      userData.userSuccess.password
    );
    dashboardPage.checkDashboardPage();
    menuPage.acessPerformance();
  });

  it("Performance - Manage Reviews Page Visible", () => {
    cy.visit("performance/searchPerformanceReview");
    performancePage.checkManageReviewsPage();
  });

  it("Performance - Manage Reviews Search Runs Without Error", () => {
    cy.visit("performance/searchPerformanceReview");
    performancePage.runSearchFilter();
  });

  it("Performance - KPI Page Visible", () => {
    cy.visit("performance/searchKpi");
    performancePage.checkKpiPage();
  });

  it("Performance - Navigate to Add KPI", () => {
    cy.visit("performance/searchKpi");
    performancePage.clickAddKpi();
  });

  it("Performance - Add KPI - Required Field Errors", () => {
    cy.visit("performance/searchKpi");
    performancePage.clickAddKpi();
    cy.get("[type='submit']").click();
    performancePage.checkRequiredFieldErrors();
  });

  it("Performance - My Tracker Page Visible", () => {
    cy.visit("performance/viewMyPerformanceTrackerList");
    performancePage.checkMyTrackerPage();
  });
});
