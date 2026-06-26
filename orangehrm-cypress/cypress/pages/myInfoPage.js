class MyInfoPage {
  selectorsList() {
    const selectors = {
      firstNameField: "[name='firstName']",
      middleNameField: "[name='middleName']",
      lastNameField: "[name='lastName']",
      genericField: ".oxd-input--active",
      genericCombobox: ".oxd-select-text--arrow",
      secondItemCombobox: ".oxd-select-dropdown > :nth-child(2)",
      thirdItemCombobox: ".oxd-select-dropdown > :nth-child(3)",
      dateField: "[placeholder='yyyy-mm-dd']",
      dateCloseButton: ".--close",
      submitButton: "[type='submit']",
      textInput: ".oxd-select-text-input",
      radioInput: ".oxd-radio-input",
    };

    return selectors;
  }

  fillPersonalDetails(firstName, middleName, lastName) {
    cy.get(this.selectorsList().firstNameField, { timeout: 10000 })
      .clear()
      .type(firstName);
    cy.get(this.selectorsList().middleNameField, { timeout: 10000 })
      .clear()
      .type(middleName);
    cy.get(this.selectorsList().lastNameField, { timeout: 10000 })
      .clear()
      .type(lastName);
  }

  fillEmploymentDetails(
    employeeId,
    OtherId,
    DriversLicenseNumber,
    DriversLicenseDate,
  ) {
    cy.get(this.selectorsList().genericField, { timeout: 10000 })
      .eq(3)
      .clear()
      .type(employeeId);
    cy.get(this.selectorsList().genericField, { timeout: 10000 })
      .eq(4)
      .clear()
      .type(OtherId);
    cy.get(this.selectorsList().genericField, { timeout: 10000 })
      .eq(5)
      .clear()
      .type(DriversLicenseNumber);
    cy.get(this.selectorsList().genericField, { timeout: 10000 })
      .eq(6)
      .clear()
      .type(DriversLicenseDate);
  }

  fillStatusDetails() {
    cy.get(this.selectorsList().dateCloseButton).click();
    cy.get(this.selectorsList().genericCombobox).eq(0).click({ force: true });
    cy.get(this.selectorsList().secondItemCombobox).eq(0).click();
    cy.get(this.selectorsList().genericCombobox).eq(1).click({ force: true });
    cy.get(this.selectorsList().thirdItemCombobox).eq(0).click();
    cy.get(this.selectorsList().radioInput).eq(1).click();
  }

  saveForm() {
    cy.get(this.selectorsList().submitButton).eq(0).click({ force: true });
    cy.get("body").should("contain", "Successfully Updated");
    cy.get(".oxd-toast-close");
  }
}

export default MyInfoPage;
