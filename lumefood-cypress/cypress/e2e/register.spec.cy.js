import userData from "../fixtures/user-data.json";
import RegisterPage from "../pages/registerPage";
import LoginPage from "../pages/loginPage";

const registerPage = new RegisterPage();
const loginPage = new LoginPage();

const uniqueEmail = (prefix) => `${prefix}.${Date.now()}@lumefood.test`;

describe("Register Tests", () => {
  beforeEach(() => {
    registerPage.accessRegisterPage();
  });

  it("Register - Page Visible", () => {
    registerPage.checkRegisterPage();
  });

  it("Register - Required Fields Present", () => {
    registerPage.checkFieldsAreRequired();
  });

  it("Register - Password Minimum Length Present", () => {
    registerPage.checkPasswordMinLength();
  });

  it("Register - Inputs Accept Data", () => {
    registerPage.fillRegisterForm(
      "Cliente Teste",
      "cliente@lumefood.test",
      "teste123"
    );
    cy.get(registerPage.selectorsList().nameField).should(
      "have.value",
      "Cliente Teste"
    );
    cy.get(registerPage.selectorsList().emailField).should(
      "have.value",
      "cliente@lumefood.test"
    );
    cy.get(registerPage.selectorsList().passwordField).should(
      "have.value",
      "teste123"
    );
  });

  it("Register - Short Password Shows Error", () => {
    registerPage.fillRegisterForm("Cliente Teste", "cliente@lumefood.test", "123");
    registerPage.submitRegister();
    registerPage.checkToastMessage("A senha deve ter pelo menos 6 caracteres.");
    cy.url().should("include", "/register");
  });

  it("Register - Navigate to Login", () => {
    registerPage.goToLogin();
    loginPage.checkLoginPage();
  });

  it("Register - Create Account", () => {
    registerPage.fillRegisterForm(
      userData.newUser.name,
      uniqueEmail("register"),
      userData.newUser.password
    );
    registerPage.submitRegister();
    registerPage.checkToastMessage("Conta criada com sucesso! Faça login para continuar.");
    loginPage.checkLoginPage();
  });
});
