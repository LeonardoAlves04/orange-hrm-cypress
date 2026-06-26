import userData from "../fixtures/user-data.json";
import LoginPage from "../pages/loginPage";
import DashboardPage from "../pages/dashboardPage";
import MenuPage from "../pages/menuPage";
import PimPage from "../pages/pimPage";

const Chance = require("chance");

const chance = new Chance();
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const menuPage = new MenuPage();
const pimPage = new PimPage();

describe("PIM Tests", () => {
  beforeEach(() => {
    loginPage.acessLoginPage();
    loginPage.loginWithUser(
      userData.userSuccess.username,
      userData.userSuccess.password
    );
    dashboardPage.checkDashboardPage();
    menuPage.acessPim();
    pimPage.checkEmployeeListPage();
  });

  it("PIM - Employee List Has Records", () => {
    pimPage.checkTableHasRecords();
  });

  it("PIM - Search by Name - No Records Found", () => {
    pimPage.searchByName("ZZZ_Inexistente", "XXXXX_Invalido");
    pimPage.checkNoRecordsFound();
  });

  it("PIM - Search Reset Clears Fields", () => {
    pimPage.searchByName("John", "Smith");
    pimPage.resetSearch();
  });

  it("PIM - Add Employee Form - Required Field Errors", () => {
    pimPage.clickAddEmployee();
    pimPage.saveForm();
    pimPage.checkRequiredFieldErrors();
  });

  it("PIM - Add Employee Form - Cancel Returns to List", () => {
    pimPage.clickAddEmployee();
    pimPage.cancelForm();
  });

  it("PIM - Add Employee Form - Login Toggle Shows Fields", () => {
    pimPage.clickAddEmployee();
    pimPage.enableCreateLogin(
      chance.string({ length: 8, alpha: true }),
      "Test@1234"
    );
    cy.get("input[type='password']").eq(0).should("be.visible");
  });

  it("PIM - Add Employee - Success", () => {
    pimPage.clickAddEmployee();
    pimPage.fillEmployeeForm(
      chance.first(),
      chance.name({ middle: true }),
      chance.last()
    );
    pimPage.saveForm();
    pimPage.checkEmployeeSaved();
  });

  it("PIM - Add Employee and Search by Employee Id", () => {
    const firstName = chance.first();
    const middleName = chance.name({ middle: true });
    const lastName = chance.last();
    const employeeId = chance.string({ length: 6, pool: "0123456789" });

    pimPage.clickAddEmployee();
    pimPage.fillEmployeeForm(firstName, middleName, lastName, employeeId);
    pimPage.saveForm();
    pimPage.checkEmployeeSaved();

    cy.visit("pim/viewEmployeeList");
    pimPage.checkEmployeeListPage();
    pimPage.searchByEmployeeId(employeeId);
    pimPage.checkEmployeeInTable(employeeId, `${firstName} ${middleName} ${lastName}`);
  });
});
