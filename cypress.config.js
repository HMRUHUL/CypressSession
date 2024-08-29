const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    //specPattern: "cypress/integration/**/*.{js,ts,jsx,tsx}", // Support both .js and .ts files
    baseUrl: "https://www.google.com",
  },
});
