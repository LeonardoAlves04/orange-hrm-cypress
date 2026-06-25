import userData from "../fixtures/user-data.json";
import LoginPage from "../pages/loginPage";
import RegisterPage from "../pages/registerPage";

const loginPage = new LoginPage();
const registerPage = new RegisterPage();

const uniqueEmail = (prefix) => `${prefix}.${Date.now()}@lumefood.test`;

describe("Login Tests", () => {
  beforeEach(() => {
    loginPage.accessLoginPage();
  });

  it("Login - Page Visible", () => {
    loginPage.checkLoginPage();
  });

  it("Login - Required Fields Present", () => {
    loginPage.checkFieldsAreRequired();
  });

  it("Login - Inputs Accept Data", () => {
    loginPage.fillLoginForm("cliente@lumefood.test", "teste123");
    cy.get(loginPage.selectorsList().emailField).should(
      "have.value",
      "cliente@lumefood.test"
    );
    cy.get(loginPage.selectorsList().passwordField).should("have.value", "teste123");
  });

  it("Login - Invalid Email Format Is Blocked", () => {
    cy.get(loginPage.selectorsList().emailField).type("email-invalido");
    cy.get(loginPage.selectorsList().passwordField).type("teste123");
    loginPage.submitLogin();
    loginPage.checkInvalidEmailFormat();
    cy.url().should("include", "/login");
  });

  it("Login - Invalid Credentials Shows Error", () => {
    loginPage.fillLoginForm(
      userData.invalidUser.email,
      userData.invalidUser.password
    );
    loginPage.submitLogin();
    loginPage.checkSubmitButtonText("Entrando...");
    loginPage.checkToastMessage("Email ou senha incorretos. Tente novamente.");
    cy.url().should("include", "/login");
  });

  it("Login - Navigate to Register", () => {
    loginPage.goToRegister();
    registerPage.checkRegisterPage();
  });

  it("Login - Success", () => {
    const email = uniqueEmail("login");

    registerPage.accessRegisterPage();
    registerPage.fillRegisterForm(
      userData.validUser.name,
      email,
      userData.validUser.password
    );
    registerPage.submitRegister();
    registerPage.checkToastMessage("Conta criada com sucesso! Faça login para continuar.");

    loginPage.fillLoginForm(email, userData.validUser.password);
    loginPage.submitLogin();
    loginPage.checkToastMessage("Login realizado com sucesso!");
    cy.url().should("not.include", "/login");
  });
});
