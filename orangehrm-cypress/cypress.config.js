const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    supportFile: "cypress/support/e2e.js",

    setupNodeEvents(on, config) {},

    baseUrl: "https://opensource-demo.orangehrmlive.com/web/index.php",
  },
});
