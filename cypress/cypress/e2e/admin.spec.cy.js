import userData from "../fixtures/user-data.json";
import LoginPage from "../pages/loginPage";
import DashboardPage from "../pages/dashboardPage";
import MenuPage from "../pages/menuPage";
import AdminPage from "../pages/adminPage";
import PimPage from "../pages/pimPage";

const Chance = require("chance");

const chance = new Chance();
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const menuPage = new MenuPage();
const adminPage = new AdminPage();
const pimPage = new PimPage();

describe("Admin Tests", () => {
  beforeEach(() => {
    loginPage.acessLoginPage();
    loginPage.loginWithUser(
      userData.userSuccess.username,
      userData.userSuccess.password,
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

  it("Admin - Create User for Existing Employee and Search by Username", () => {
    const firstName = `Qa${chance.first()}`;
    const middleName = chance.string({ length: 5, alpha: true });
    const lastName = chance.last();
    const employeeId = chance.string({ length: 6, pool: "0123456789" });
    const username = `qa_user_${chance.string({ length: 8, pool: "abcdefghijklmnopqrstuvwxyz0123456789" })}`;
    const password = "Test@1234";

    menuPage.acessPim();
    pimPage.checkEmployeeListPage();
    pimPage.clickAddEmployee();
    pimPage.fillEmployeeForm(firstName, middleName, lastName, employeeId);
    pimPage.saveForm();
    pimPage.checkEmployeeSaved();

    menuPage.acessAdmin();
    adminPage.checkSystemUsersPage();
    adminPage.clickAdd();
    adminPage.checkAddUserPage();
    adminPage.fillUserForm({
      role: "ESS",
      employeeName: `${firstName} ${middleName} ${lastName}`,
      status: "Enabled",
      username,
      password,
    });
    adminPage.saveForm();
    adminPage.searchByUsername(username);
    adminPage.checkUserInTable(username, "ESS", "Enabled");
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
