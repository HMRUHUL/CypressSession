// Import the Faker library
const { faker } = require('@faker-js/faker');


describe('OrangeHRM End to End Testing', () => {
  // const baseUrl = 'https://opensource-demo.orangehrmlive.com/';
  const adminUserName = "Admin"
  const adminPassword = "admin123"

  const employeeDataFile = "employeeData.json" // File to save employee data
  
  function generateRandomPassword() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  // Hooks
  before(() => {
    // Before all tests, visit the base URL
    cy.visit('/');
    cy.title().should("eq", "OrangeHRM")
    // Login using Admin credentials.
    cy.get("input[name='username'").type(adminUserName)
    cy.get("input[name='password'").type(adminPassword)
    cy.get("[type='submit']").click()
  });

  it('Validate the whole OrangeHRM flow', () => {
    cy.waitTillVisible('h6')
    cy.get('h6').should("have.text", "Dashboard")
    //click on PIM
    cy.get("span").contains("PIM").click()
    //click on Add Button
    cy.get("button[type='button']").contains("Add").click()
    cy.waitTillVisible('h6')

    // Create a new employee using Faker
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const fullName = firstName+" "+lastName
    // const employeeId = faker.datatype.uuid(); // Using UUID for a unique employee ID
    // cy.log("EmployeeID",employeeId)
    const username = firstName + lastName
    const password = generateRandomPassword()
    //Fill the employee form
    cy.get("input[name='firstName'").type(firstName)
    cy.get("input[name='lastName']").type(lastName)
    // Click On Create Login Details toggle
    cy.get("input[type='checkbox']").click({ force: true })
    // Fill the login details form.
    cy.get('label').contains("Username").parent().siblings('div').find('input').type(username)
    cy.get('label').contains("Password").parent().siblings('div').find('input').type(password)
    cy.get('label').contains("Confirm Password").parent().siblings('div').find('input').type(password)
    cy.get("button[type='submit']").click()
    // Assert the Employee Creation Notification Message
    cy.get('.oxd-text--toast-message').should("have.text", "Successfully Saved")
    cy.waitTillVisible('h6')
    cy.get('h6').should("contain.text", fullName)

    // Save Employee Details to a file
    cy.writeFile(`cypress/fixtures/${employeeDataFile}`,{
      username,
      password
    });

    // Click On the Directory Menu
    cy.get("span").contains("Directory").click()
    cy.waitTillVisible("h5")
    // Type the firstName in the Employee Name
    cy.get("input[placeholder='Type for hints...']").type(firstName)
    // Get the locator from the API response from the cypress execution snapshot
    cy.get('.oxd-autocomplete-option > span').click()
    // Click on Search
    cy.get("button[type='submit']").click()
    // Assert employee name after searching the employee in the Directory
    // Will fail due to extra spaces in the name, need to trim it.
    // cy.get(".orangehrm-directory-card-header").should("have.text",firstName + " " + lastName)
    
    cy.get(".orangehrm-directory-card-header")
      .invoke('text')
      .then((text) => {
        const normalizedText = text.replace(/\s+/g, ' ').trim(); // Collapse multiple spaces into one and trim
        expect(normalizedText).to.eq(fullName);
      });

    // Log Out As an admin.
    cy.get("span img").click()
    cy.get("li a").contains("Logout").click()
    cy.waitTillVisible("h5")

    // Log In Using Newly Created Employee Creds 
    cy.fixture(employeeDataFile).then((employee)=>{
      //Login with employee creds.
      cy.get("input[name='username'").type(employee.username)
      cy.get("input[name='password'").type(employee.password)
      cy.get("[type='submit']").click()
      // Assert that the Newly Created Employee Full Name is showing beside the profile icon.
      cy.get("p.oxd-userdropdown-name").should("have.text",fullName)
    })
  });

  after(() => {
    // Log Out As Newly Created Employee.
    cy.get("span img").click()
    cy.get("li a").contains("Logout").click()
    cy.waitTillVisible("h5")
    // clear employeedata object after all tests are completed
    cy.writeFile(`cypress/fixtures/${employeeDataFile}`,{});
  });
});
