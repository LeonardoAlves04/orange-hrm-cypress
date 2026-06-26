import userData from "../fixtures/user-data.json";
import LoginPage from "../pages/loginPage";
import DashboardPage from "../pages/dashboardPage";
import MenuPage from "../pages/menuPage";
import DirectoryPage from "../pages/directoryPage";

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const menuPage = new MenuPage();
const directoryPage = new DirectoryPage();

describe("Directory Tests", () => {
  beforeEach(() => {
    loginPage.acessLoginPage();
    loginPage.loginWithUser(
      userData.userSuccess.username,
      userData.userSuccess.password
    );
    dashboardPage.checkDashboardPage();
    menuPage.acessDirectory();
    directoryPage.checkDirectoryPage();
  });

  it("Directory - Cards Visible", () => {
    directoryPage.checkCardsVisible();
  });

  it("Directory - First Card Has Content", () => {
    directoryPage.checkFirstCardHasContent();
  });

  it("Directory - Search by Name Returns Result", () => {
    directoryPage.searchByName("Admin");
    directoryPage.checkCardsVisible();
  });

  it("Directory - Search Reset Clears Field", () => {
    directoryPage.searchByName("Admin");
    directoryPage.resetSearch();
  });
});
