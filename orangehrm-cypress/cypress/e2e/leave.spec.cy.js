import userData from "../fixtures/user-data.json";
import LoginPage from "../pages/loginPage";
import DashboardPage from "../pages/dashboardPage";
import MenuPage from "../pages/menuPage";
import LeavePage from "../pages/leavePage";

const Chance = require("chance");

const chance = new Chance();
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const menuPage = new MenuPage();
const leavePage = new LeavePage();

describe("Leave Tests", () => {
  beforeEach(() => {
    loginPage.acessLoginPage();
    loginPage.loginWithUser(
      userData.userSuccess.username,
      userData.userSuccess.password
    );
    dashboardPage.checkDashboardPage();
    menuPage.acessLeave();
  });

  it("Leave - Leave List Page Visible", () => {
    leavePage.checkLeaveListPage();
  });

  it("Leave - Search Filter Runs Without Error", () => {
    leavePage.runSearchFilter();
  });

  it("Leave - Reset Clears Filter", () => {
    leavePage.resetSearchFilter();
  });

  it("Leave - Apply Leave Page Visible", () => {
    cy.visit("leave/applyLeave");
    leavePage.checkApplyLeavePage();
  });

  it("Leave - Apply Leave - Required Field Errors", () => {
    cy.visit("leave/applyLeave");
    leavePage.checkApplyLeavePage();
    leavePage.applyLeave();
    leavePage.checkRequiredFieldErrors();
  });

  it("Leave - Apply Leave - Comment Field Accepts Input", () => {
    cy.visit("leave/applyLeave");
    leavePage.checkApplyLeavePage();
    cy.get("body").then(($body) => {
      if ($body.find(".oxd-textarea").length) {
        const comment = chance.sentence();
        leavePage.fillComment(comment);
        cy.get(".oxd-textarea").should("have.value", comment);
      } else {
        cy.contains("No Leave Types with Leave Balance").should("be.visible");
      }
    });
  });

  it("Leave - Apply Leave - Reset Clears Comment", () => {
    cy.visit("leave/applyLeave");
    leavePage.checkApplyLeavePage();
    cy.get("body").then(($body) => {
      if ($body.find(".oxd-textarea").length) {
        leavePage.fillComment(chance.sentence());
        leavePage.resetForm();
      } else {
        cy.contains("No Leave Types with Leave Balance").should("be.visible");
      }
    });
  });

  it("Leave - My Leave List Page Visible", () => {
    cy.visit("leave/viewMyLeaveList");
    leavePage.checkMyLeavePage();
  });
});
