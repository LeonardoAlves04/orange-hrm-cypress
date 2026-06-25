const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: "https://lumefood-git-master-henriquemanieris-projects.vercel.app",
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
