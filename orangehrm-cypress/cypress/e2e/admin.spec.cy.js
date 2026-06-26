import userData from "../fixtures/user-data.json";
import LoginPage from "../pages/loginPage";
import DashboardPage from "../pages/dashboardPage";
import MenuPage from "../pages/menuPage";
import AdminPage from "../pages/adminPage";

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const menuPage = new MenuPage();
const adminPage = new AdminPage();

describe("Admin Tests", () => {
  beforeEach(() => {
    loginPage.acessLoginPage();
    loginPage.loginWithUser(
      userData.userSuccess.username,
      userData.userSuccess.password
    );
    dashboardPage.checkDashboardPage();
    menuPage.acessAdmin();
    adminPage.checkSystemUsersPage();
  });

  it("Admin - System Users Table Has Records", () => {
    adminPage.checkTableHasRecords();
  });

  it("Admin - Search by Existing Username", () => {
    adminPage.searchByUsername("Admin");
    adminPage.checkTableHasRecords();
  });

  it("Admin - Search by Invalid Username - No Records Found", () => {
    adminPage.searchByUsername("zzz_usuario_invalido_xyz");
    adminPage.checkNoRecordsFound();
  });

  it("Admin - Reset Search Clears Field", () => {
    adminPage.searchByUsername("Admin");
    adminPage.resetSearch();
  });

  it("Admin - Add User Form - Required Field Errors", () => {
    adminPage.clickAdd();
    adminPage.checkAddUserPage();
    cy.get("[type='submit']").click();
    adminPage.checkRequiredFieldErrors();
  });

  it("Admin - Add User Form - Cancel Returns to List", () => {
    adminPage.clickAdd();
    adminPage.cancelForm();
  });

  it("Admin - Job Menu Opens with Subitems", () => {
    adminPage.openJobMenu();
    cy.get(".oxd-dropdown-menu a").contains("Job Titles").should("be.visible");
  });

  it("Admin - Navigate to Job Titles", () => {
    adminPage.navigateToJobTitles();
    cy.get("h6").contains("Job Titles").should("be.visible");
  });

  it("Admin - Organization Menu Opens with Subitems", () => {
    adminPage.openOrganizationMenu();
    cy.get(".oxd-dropdown-menu a")
      .contains("General Information")
      .should("be.visible");
  });
});
