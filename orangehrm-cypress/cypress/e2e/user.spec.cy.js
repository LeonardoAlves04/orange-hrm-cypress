import userData from "../fixtures/user-data.json";
import LoginPage from "./../pages/loginPage";
import DashboardPage from "./../pages/dashboardPage";
import MenuPage from "../pages/menuPage";
import MyInfoPage from "../pages/myInfoPage";

const Chance = require("chance");

const chance = new Chance();
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const menuPage = new MenuPage();
const myInfoPage = new MyInfoPage();

describe("Orange HRM Tests", () => {
  it("User Info Update - Success", () => {
    loginPage.acessLoginPage();

    loginPage.loginWithUser(
      userData.userSuccess.username,
      userData.userSuccess.password,
    );

    dashboardPage.checkDashboardPage();

    menuPage.acessMyInfo();

    myInfoPage.fillPersonalDetails(
      chance.first(),
      chance.name({ middle: true }),
      chance.last(),
    );

    myInfoPage.fillEmploymentDetails(
      chance.string({ length: 5 }),
      chance.string({ length: 5 }),
      chance.string({ length: 7 }),
      chance.date({ year: 2024 }).toISOString().split("T")[0],
    );

    myInfoPage.fillStatusDetails();

    myInfoPage.saveForm();
  });
});
