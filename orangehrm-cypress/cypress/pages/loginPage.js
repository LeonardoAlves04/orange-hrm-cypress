class LoginPage {
  selectorsList() {
    const selectors = {
      usernameField: '[name="username"]',
      passwordField: "[name='password']",
      submitButton: "[type='submit']",
      alertMessage: "[class='orangehrm-login-error']",
      requiredMessage: ".oxd-input-field-error-message",
    };

    return selectors;
  }

  acessLoginPage() {
    cy.visit("auth/login");
  }

  loginWithUser(username, password) {
    cy.get(this.selectorsList().usernameField, { timeout: 10000 }).type(
      username,
    );
    cy.get(this.selectorsList().passwordField, { timeout: 10000 }).type(
      password,
    );
    cy.get(this.selectorsList().submitButton, { timeout: 10000 }).click();
  }

  submitLogin() {
    cy.get(this.selectorsList().submitButton, { timeout: 10000 }).click();
  }

  checkLoginError() {
    cy.get(this.selectorsList().alertMessage, { timeout: 10000 }).should(
      "be.visible",
    );
  }

  checkRequiredFieldErrors(quantity) {
    cy.get(this.selectorsList().requiredMessage).should(
      "have.length",
      quantity,
    );
    cy.get(this.selectorsList().requiredMessage).each(($message) => {
      cy.wrap($message).should("contain.text", "Required");
    });
  }
}

export default LoginPage;
