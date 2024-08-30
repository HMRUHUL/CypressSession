const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity:false,
  // reporter: 'cypress-mochawesome-reporter',
  e2e: {
    baseUrl:"https://opensource-demo.orangehrmlive.com//",
    watchForFileChanges:false,
    autoRefresh:false,
    // testIsolation:false,
    supportFile: false,
    // defaultCommandTimeout: 5000,
    setupNodeEvents(on, config) {
      // require('cypress-mochawesome-reporter/plugin')(on);
      // config.specPattern = [
      //   'cypress/e2e/sample_web.cy.js',
      // ]
      return config;
    },
  },
});