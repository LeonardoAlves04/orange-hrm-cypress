class LoginPage {
  selectorsList() {
    return {
      form: "[data-testid='login-form']",
      emailField: "[data-testid='login-input-email']",
      passwordField: "[data-testid='login-input-password']",
      submitButton: "[data-testid='login-button-submit']",
      registerLink: "[data-testid='login-link-register']",
    };
  }

  accessLoginPage() {
    cy.visit("/login");
  }

  checkLoginPage() {
    cy.url().should("include", "/login");
    cy.contains("h1", "LumeFood").should("be.visible");
    cy.contains("Entre para pedir sua comida favorita").should("be.visible");
    cy.get(this.selectorsList().form).should("be.visible");
  }

  fillLoginForm(email, password) {
    cy.get(this.selectorsList().emailField).clear().type(email);
    cy.get(this.selectorsList().passwordField).clear().type(password);
  }

  submitLogin() {
    cy.get(this.selectorsList().submitButton).click();
  }

  checkFieldsAreRequired() {
    cy.get(this.selectorsList().emailField).should("have.attr", "required");
    cy.get(this.selectorsList().passwordField).should("have.attr", "required");
  }

  checkInvalidEmailFormat() {
    cy.get(this.selectorsList().emailField).then(($input) => {
      expect($input[0].checkValidity()).to.equal(false);
    });
  }

  checkSubmitButtonText(text) {
    cy.get(this.selectorsList().submitButton).should("contain", text);
  }

  goToRegister() {
    cy.get(this.selectorsList().registerLink).click();
  }

  checkToastMessage(message) {
    cy.contains(message, { timeout: 10000 }).should("be.visible");
  }
}

export default LoginPage;
