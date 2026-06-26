import userData from "../fixtures/user-data.json";
import LoginPage from "../pages/loginPage";
import DashboardPage from "../pages/dashboardPage";
import MenuPage from "../pages/menuPage";
import MyInfoPage from "../pages/myInfoPage";

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

describe("Login Orange HRM Tests", () => {
  it("Login - Empty Username and Password", () => {
    loginPage.acessLoginPage();
    loginPage.submitLogin();
    loginPage.checkRequiredFieldErrors(2);
  });

  it("Login - Empty Username", () => {
    loginPage.acessLoginPage();
    cy.get("[name='password']").type(userData.userSuccess.password);
    loginPage.submitLogin();
    loginPage.checkRequiredFieldErrors(1);
  });

  it("Login - Empty Password", () => {
    loginPage.acessLoginPage();
    cy.get("[name='username']").type(userData.userSuccess.username);
    loginPage.submitLogin();
    loginPage.checkRequiredFieldErrors(1);
  });

  it("Login - Fail", () => {
    loginPage.acessLoginPage();
    loginPage.loginWithUser(
      userData.userFail.username,
      userData.userFail.password,
    );
    loginPage.checkLoginError();
  });

  it("Login - Success", () => {
    loginPage.acessLoginPage();
    loginPage.loginWithUser(
      userData.userSuccess.username,
      userData.userSuccess.password,
    );
    dashboardPage.checkDashboardPage();
  });

  it("Login - Protected Route Redirects to Login", () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit("dashboard/index");
    cy.url().should("include", "/auth/login");
  });
});
