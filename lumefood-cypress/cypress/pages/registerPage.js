class RegisterPage {
  selectorsList() {
    return {
      form: "[data-testid='register-form']",
      nameField: "[data-testid='register-input-name']",
      emailField: "[data-testid='register-input-email']",
      passwordField: "[data-testid='register-input-password']",
      submitButton: "[data-testid='register-button-submit']",
      loginLink: "[data-testid='register-link-login']",
    };
  }

  accessRegisterPage() {
    cy.visit("/register");
  }

  checkRegisterPage() {
    cy.url().should("include", "/register");
    cy.contains("h1", "LumeFood").should("be.visible");
    cy.contains("Crie sua conta e comece a pedir").should("be.visible");
    cy.get(this.selectorsList().form).should("be.visible");
  }

  fillRegisterForm(name, email, password) {
    cy.get(this.selectorsList().nameField).clear().type(name);
    cy.get(this.selectorsList().emailField).clear().type(email);
    cy.get(this.selectorsList().passwordField).clear().type(password);
  }

  submitRegister() {
    cy.get(this.selectorsList().submitButton).click();
  }

  checkFieldsAreRequired() {
    cy.get(this.selectorsList().nameField).should("have.attr", "required");
    cy.get(this.selectorsList().emailField).should("have.attr", "required");
    cy.get(this.selectorsList().passwordField).should("have.attr", "required");
  }

  checkPasswordMinLength() {
    cy.get(this.selectorsList().passwordField).should("have.attr", "minlength", "6");
  }

  goToLogin() {
    cy.get(this.selectorsList().loginLink).click();
  }

  checkToastMessage(message) {
    cy.contains(message, { timeout: 10000 }).should("be.visible");
  }
}

export default RegisterPage;
