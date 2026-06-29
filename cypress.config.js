module.exports = {
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com/web/index.php",
    specPattern: "cypress/cypress/e2e/**/*.cy.js",
    supportFile: "cypress/cypress/support/e2e.js",
    fixturesFolder: "cypress/cypress/fixtures",
    setupNodeEvents(on, config) {},
  },
};