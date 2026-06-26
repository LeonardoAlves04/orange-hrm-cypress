import userData from "../fixtures/user-data.json";
import LoginPage from "../pages/loginPage";
import DashboardPage from "../pages/dashboardPage";
import MenuPage from "../pages/menuPage";
import BuzzPage from "../pages/buzzPage";

const Chance = require("chance");

const chance = new Chance();
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const menuPage = new MenuPage();
const buzzPage = new BuzzPage();

describe("Buzz Tests", () => {
  beforeEach(() => {
    loginPage.acessLoginPage();
    loginPage.loginWithUser(
      userData.userSuccess.username,
      userData.userSuccess.password
    );
    dashboardPage.checkDashboardPage();
    menuPage.acessBuzz();
    buzzPage.checkBuzzPage();
  });

  it("Buzz - Post Input Visible", () => {
    buzzPage.checkPostInputVisible();
  });

  it("Buzz - Feed Has Posts", () => {
    buzzPage.checkFeedHasPosts();
  });

  it("Buzz - First Post Has Action Buttons", () => {
    buzzPage.checkFirstPostHasActionButtons();
  });

  it("Buzz - Post Input Accepts Text", () => {
    const postText = chance.sentence();
    buzzPage.typePost(postText);
    buzzPage.checkPostInputHasText(postText);
  });

  it("Buzz - Create Post and Show in Feed", () => {
    const postText = `Automated post ${chance.guid()}`;
    buzzPage.typePost(postText);
    buzzPage.submitPost();
    buzzPage.checkPostInFeed(postText);
  });
});
