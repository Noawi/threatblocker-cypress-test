/**
 * //Test case: Verify correct display of 2018 standings and logging of team names
 *   Browser Tested: Google Chrome
     Preconditions: 
        In the cypress.config.js viewport width & height are set to 1000 and 1920 in order to keep the original page width.
        Without this, once the test opens in Cypress in the dual pane view, the page will responsively change and a filter button appears.
        This will require tests for responsive page dimensions. 

        Error handling is also added to catch uncaught exceptions. 

     Steps:
     1. Visit the WNBA standings webpage
     2. Select the season "2018" from the dropdown
     3. Assert the number of table records is 12
     4. Iterate over the table rows
     5. Log the team names from the first column
     Expected results: 
     - The webpage displays the 2018 standings
     - The table contains 12 records
     - The team names are logged successfully

     Date Tested: 6/8/23
     Test Results: Passed
     Tester: Norman Wright
 * 
 * 
 */

describe("WNBA Standings", () => {
    it("should display 2018 standings, assert table length and log team names", () => {
      
        //1. Load the page: https://www.wnba.com/standings/
        cy.visit("https://www.wnba.com/standings/");
      
        //2. Set the season to 2018 from seasons dropdown
        /**
        * Note: without force:true, the test would throw the following error:
            * This element <select#Season-dropdown> is not visible because its parent <div._FiltersDropdown--wrapper_kzx0r_57._FiltersDropdown--wrapper__close_kzx0r_66> has CSS property: overflow: hidden and an effective width and height of: 0 x 0 pixels.
              Fix this problem, or use {force: true} to disable error checking
        */
        cy.get("select[name='Season']").select("2018",{force:true});
  
        //3. Assert that the number of table records is 12
        cy.get("._TableWrapper_1gqq9_13 table tbody tr").should("have.length", 12);
  
        //4. Iterate over the table and print the team names in column 1 using cypress log API
        cy.get("._TableWrapper_1gqq9_13 table tbody tr").each((row) => { //get each row in the table 
            cy.wrap(row) // wrap the row element so that the Cypress commands operate within the context of that specific row. 
              .find('._TeamName__name_t3qn4_19')// find by class name 
              .invoke("text") // invoke('text') yields the text of the HTML element as is without changing case
              .then((teamName) => { //then print the team name for that row
                cy.log(teamName);
              });
          });

    });
  });
  
  // added in case the application under test throws an uncaught exception
  Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
      })