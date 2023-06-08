const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // added to keep the test page desktop sized
  viewportHeight: 1000,
  viewportWidth: 1920,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    //hide the example templates
    excludeSpecPattern: ['**/1-getting-started', '**/2-advanced-examples'] 
  },
});