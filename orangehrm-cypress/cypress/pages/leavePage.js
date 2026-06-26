class LeavePage {
  selectorsList() {
    const selectors = {
      pageTitle: "h6.oxd-text--h6",
      leaveTypeDropdown: ".oxd-select-text--arrow",
      secondItemCombobox: ".oxd-select-dropdown > :nth-child(2)",
      fromDateField: "[placeholder='yyyy-mm-dd']",
      commentField: ".oxd-textarea",
      applyButton: "[type='submit']",
      resetButton: ".oxd-button--ghost",
      errorMessage: ".oxd-input-field-error-message",
      successToast: ".oxd-toast--success",
      leaveTable: ".oxd-table",
    };

    return selectors;
  }

  checkLeaveListPage() {
    cy.url().should("include", "/leave");
    cy.get(this.selectorsList().leaveTable).should("be.visible");
  }

  checkApplyLeavePage() {
    cy.url().should("include", "/applyLeave");
    cy.contains(this.selectorsList().pageTitle, "Apply Leave").should(
      "be.visible",
    );
  }

  checkMyLeavePage() {
    cy.url().should("include", "/viewMyLeaveList");
    cy.contains(this.selectorsList().pageTitle, "Leave").should("be.visible");
    cy.get(this.selectorsList().leaveTable).should("be.visible");
  }

  waitForApplyLeaveForm() {
    cy.contains(this.selectorsList().pageTitle, "Apply Leave").should(
      "be.visible",
    );
    cy.get("body").then(($body) => {
      if ($body.find(this.selectorsList().commentField).length) {
        cy.get(this.selectorsList().commentField, { timeout: 10000 }).should(
          "be.visible",
        );
      } else {
        cy.contains("No Leave Types with Leave Balance").should("be.visible");
      }
    });
  }

  selectLeaveType() {
    cy.get(this.selectorsList().leaveTypeDropdown).eq(0).click({ force: true });
    cy.get(this.selectorsList().secondItemCombobox).eq(0).click();
  }

  fillFromDate(date) {
    cy.get(this.selectorsList().fromDateField)
      .eq(0)
      .clear({ timeout: 10000 })
      .type(date);
    cy.get(this.selectorsList().fromDateField)
      .eq(0)
      .should("be.visible")
      .type("{enter}");
  }

  fillToDate(date) {
    cy.get(this.selectorsList().fromDateField)
      .eq(1)
      .should("be.visible")
      .clear()
      .type(date);
    cy.get(this.selectorsList().fromDateField)
      .eq(1)
      .should("be.visible")
      .type("{enter}");
  }

  fillComment(comment) {
    this.waitForApplyLeaveForm();
    cy.get(this.selectorsList().commentField, { timeout: 10000 })
      .should("be.visible")
      .clear();
    cy.get(this.selectorsList().commentField, { timeout: 10000 })
      .should("be.visible")
      .type(comment);
  }

  applyLeave() {
    this.waitForApplyLeaveForm();
    cy.get("body").then(($body) => {
      if ($body.find(this.selectorsList().applyButton).length) {
        cy.get(this.selectorsList().applyButton).should("be.visible").click();
      } else {
        cy.contains("No Leave Types with Leave Balance").should("be.visible");
      }
    });
  }

  resetForm() {
    this.waitForApplyLeaveForm();
    cy.get(this.selectorsList().commentField, { timeout: 10000 })
      .should("be.visible")
      .clear()
      .should("have.value", "");
  }

  checkRequiredFieldErrors() {
    cy.get("body").then(($body) => {
      if ($body.find(this.selectorsList().errorMessage).length) {
        cy.get(this.selectorsList().errorMessage).should(
          "have.length.greaterThan",
          0,
        );
      } else {
        cy.contains("No Leave Types with Leave Balance").should("be.visible");
      }
    });
  }

  runSearchFilter() {
    cy.get(this.selectorsList().applyButton).should("be.visible").click();
    cy.get(".oxd-loading-spinner", { timeout: 8000 }).should("not.exist");
  }

  resetSearchFilter() {
    cy.get(this.selectorsList().resetButton).should("be.visible").click();
    cy.get(".oxd-loading-spinner", { timeout: 8000 }).should("not.exist");
  }
}

export default LeavePage;
