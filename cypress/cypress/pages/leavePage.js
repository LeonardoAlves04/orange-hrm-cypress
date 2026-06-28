class LeavePage {
  selectorsList() {
    const selectors = {
      pageTitle: "h6.oxd-text--h6",
      leaveTypeDropdown: ".oxd-select-text--arrow",
      secondItemCombobox: ".oxd-select-dropdown > :nth-child(2)",
      dateField: "[placeholder='yyyy-mm-dd']",
      commentField: ".oxd-textarea",
      applyButton: "button[type='submit']",
      resetButton: "button[type='reset'], .oxd-button--ghost",
      errorMessage: ".oxd-input-field-error-message",
      successToast: ".oxd-toast--success",
      leaveTable: ".oxd-table",
      loadingSpinner: ".oxd-loading-spinner",
      noLeaveBalanceText: "No Leave Types with Leave Balance",
    };

    return selectors;
  }

  checkLeaveListPage() {
    cy.url().should("include", "/leave");
    cy.get(this.selectorsList().leaveTable, { timeout: 10000 }).should(
      "be.visible"
    );
  }

  checkApplyLeavePage() {
    cy.url().should("include", "/applyLeave");
    cy.contains(this.selectorsList().pageTitle, "Apply Leave", {
      timeout: 10000,
    }).should("be.visible");
    this.waitForApplyLeaveForm();
  }

  checkMyLeavePage() {
    cy.url().should("include", "/viewMyLeaveList");
    cy.contains(this.selectorsList().pageTitle, "Leave", {
      timeout: 10000,
    }).should("be.visible");
    cy.get(this.selectorsList().leaveTable, { timeout: 10000 }).should(
      "be.visible"
    );
  }

  waitForApplyLeaveForm() {
    cy.get(this.selectorsList().loadingSpinner, { timeout: 10000 }).should(
      "not.exist"
    );
    cy.get("body", { timeout: 10000 }).should(($body) => {
      const hasCommentField = $body.find(this.selectorsList().commentField).length > 0;
      const hasNoBalanceMessage = $body.text().includes(
        this.selectorsList().noLeaveBalanceText
      );
      expect(hasCommentField || hasNoBalanceMessage).to.equal(true);
    });
  }

  hasApplyLeaveForm() {
    return cy.get("body").then(($body) => {
      return $body.find(this.selectorsList().commentField).length > 0;
    });
  }

  selectLeaveType() {
    cy.get(this.selectorsList().leaveTypeDropdown)
      .eq(0)
      .should("be.visible")
      .click({ force: true });
    cy.get(this.selectorsList().secondItemCombobox, { timeout: 10000 })
      .eq(0)
      .click();
  }

  fillFromDate(date) {
    cy.get(this.selectorsList().dateField)
      .eq(0)
      .clear({ force: true })
      .type(`${date}{enter}`, { force: true });
  }

  fillToDate(date) {
    cy.get(this.selectorsList().dateField)
      .eq(1)
      .clear({ force: true })
      .type(`${date}{enter}`, { force: true });
  }

  fillComment(comment) {
    this.waitForApplyLeaveForm();
    this.hasApplyLeaveForm().then((hasForm) => {
      if (hasForm) {
        cy.get(this.selectorsList().commentField, { timeout: 10000 })
          .should("be.visible")
          .clear({ force: true })
          .type(comment, { force: true, delay: 0 });
      } else {
        cy.contains(this.selectorsList().noLeaveBalanceText).should("be.visible");
      }
    });
  }

  applyLeave() {
    this.waitForApplyLeaveForm();
    this.hasApplyLeaveForm().then((hasForm) => {
      if (hasForm) {
        cy.get(this.selectorsList().applyButton)
          .should("be.visible")
          .and("not.be.disabled")
          .click();
      } else {
        cy.contains(this.selectorsList().noLeaveBalanceText).should("be.visible");
      }
    });
  }

  resetForm() {
    this.waitForApplyLeaveForm();
    this.hasApplyLeaveForm().then((hasForm) => {
      if (hasForm) {
        cy.contains(this.selectorsList().resetButton, "Reset")
          .should("be.visible")
          .click();
        cy.get(this.selectorsList().commentField).should("have.value", "");
      } else {
        cy.contains(this.selectorsList().noLeaveBalanceText).should("be.visible");
      }
    });
  }

  checkRequiredFieldErrors() {
    this.waitForApplyLeaveForm();
    cy.get("body").then(($body) => {
      if ($body.find(this.selectorsList().errorMessage).length) {
        cy.get(this.selectorsList().errorMessage).should(
          "have.length.greaterThan",
          0
        );
      } else {
        cy.contains(this.selectorsList().noLeaveBalanceText).should("be.visible");
      }
    });
  }

  runSearchFilter() {
    cy.get(this.selectorsList().applyButton).should("be.visible").click();
    cy.get(this.selectorsList().loadingSpinner, { timeout: 10000 }).should(
      "not.exist"
    );
  }

  resetSearchFilter() {
    cy.get(this.selectorsList().resetButton).should("be.visible").click();
    cy.get(this.selectorsList().loadingSpinner, { timeout: 10000 }).should(
      "not.exist"
    );
  }
}

export default LeavePage;