import userData from "../fixtures/user-data.json";
import LoginPage from "../pages/loginPage";
import DashboardPage from "../pages/dashboardPage";
import MenuPage from "../pages/menuPage";
import RecruitmentPage from "../pages/recruitmentPage";

const Chance = require("chance");

const chance = new Chance();
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const menuPage = new MenuPage();
const recruitmentPage = new RecruitmentPage();

describe("Recruitment Tests", () => {
  beforeEach(() => {
    loginPage.acessLoginPage();
    loginPage.loginWithUser(
      userData.userSuccess.username,
      userData.userSuccess.password
    );
    dashboardPage.checkDashboardPage();
    menuPage.acessRecruitment();
    recruitmentPage.checkVacanciesPage();
  });

  it("Recruitment - Vacancies Search Filter Runs Without Error", () => {
    recruitmentPage.runSearchFilter();
  });

  it("Recruitment - Vacancies Reset Clears Filters", () => {
    recruitmentPage.resetSearch();
  });

  it("Recruitment - Candidates Page Visible", () => {
    cy.visit("recruitment/viewCandidates");
    recruitmentPage.checkCandidatesPage();
  });

  it("Recruitment - Navigate to Add Candidate", () => {
    cy.visit("recruitment/viewCandidates");
    recruitmentPage.clickAddCandidate();
    recruitmentPage.checkAddCandidatePage();
  });

  it("Recruitment - Add Candidate - Required Field Errors", () => {
    cy.visit("recruitment/viewCandidates");
    recruitmentPage.clickAddCandidate();
    recruitmentPage.saveForm();
    recruitmentPage.checkRequiredFieldErrors();
  });

  it("Recruitment - Add Candidate - Form Accepts Valid Data", () => {
    cy.visit("recruitment/viewCandidates");
    recruitmentPage.clickAddCandidate();
    recruitmentPage.fillCandidateForm(
      chance.first(),
      chance.last(),
      chance.email()
    );
    cy.get("[name='firstName']").should("not.have.value", "");
  });

  it("Recruitment - Add Candidate - Invalid Email Shows Error", () => {
    cy.visit("recruitment/viewCandidates");
    recruitmentPage.clickAddCandidate();
    recruitmentPage.fillCandidateForm(
      chance.first(),
      chance.last(),
      "invalid-email"
    );
    recruitmentPage.saveForm();
    recruitmentPage.checkInvalidEmailError();
  });
});
