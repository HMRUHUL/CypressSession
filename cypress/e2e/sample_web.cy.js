// Import the Faker library
import { faker } from '@faker-js/faker';
import 'cypress-file-upload';

describe('OrangeHRM End to End Testing', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    console.log('Caught an exception:', err);
    return false;
  });
  cy.waitTillVisible = () => {
    cy.wait(5000);
  };
  const adminUserName = "Admin"
  const adminPassword = "admin123"
  console.log(adminPassword)
  const employeeDataFile = "employeeData.json" // File to save employee data
  
  function generateRandomPassword() {
    const allChars = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?'
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
    const upper = uppercase.charAt(Math.floor(Math.random() * uppercase.length));
    const lower = lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    const num = numbers.charAt(Math.floor(Math.random() * numbers.length));
    const special = specialChars.charAt(Math.floor(Math.random() * specialChars.length));
    //let password = '';
    let password = lower + upper + num + special;
    for (let i = 5; i < 12; i++) {
      password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
    password = password.split('').sort(() => 0.5 - Math.random()).join('');
    return password;
  }
  // Hooks
  beforeEach(() => {
    // Before all tests, visit the base URL
    cy.visit('/');
    cy.title().should("eq", "OrangeHRM")
    cy.waitTillVisible()
  });
  let userId = '';
  let fullName ='';
  let password = '';
  function fillUserId() {
    const length = faker.number.int({ min: 1, max: 10 });
    userId = faker.string.numeric(length);
    cy.log(userId);
    cy.get('label').contains('Employee Id').parent().siblings().find('input').clear()
        .type(userId)
    cy.wait(1000);
    cy.get('body').then(($body) => {
      if ($body.find('span:contains("Employee Id already exists")').length > 0) {
        cy.log('Employee Id is already taken, generating a new one...');
        fillUserId();
      }
    });
  }

  it('OrangeHRM flow for Admin', () => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    cy.get("input[name='username']").type(adminUserName)
    cy.get("input[name='password']").type(adminPassword)
    cy.get("[type='submit']").click()

    cy.waitTillVisible('h6')
    cy.get('h6').should("have.text", "Dashboard")
    //click on PIM
    cy.get("span").contains("PIM").click()
    //click on Add Button
    cy.get("button[type='button']").contains("Add").click()
    cy.waitTillVisible('h6')
    // cy.get('.employee-image').click() //parent().siblings().find('button i')
    // cy.get('.employee-image')
    //     .attachFile('images.jpg');

    // Create a New Employee
    const firstName = faker.person.firstName();
    const middleName = faker.person.middleName();
    const lastName =  faker.person.lastName();
    const fName = firstName+" "+middleName+" "+lastName;
    fullName = firstName + " "+ lastName;
    cy.log(fullName);
    const username = firstName + lastName;
    password = generateRandomPassword();
    cy.get("input[name='firstName']").type(firstName)
    cy.get('input[name = "middleName"]').type(middleName);
    cy.get("input[name='lastName']").type(lastName)
    fillUserId(); //Generate UserId
    // Create Login Details
    cy.get("input[type='checkbox']").click({ force: true });
    cy.get('label').contains("Username").parent().siblings('div').find('input')
        .type(username)
    cy.get('label').contains("Password").parent().siblings('div').find('input')
        .type(password)
    cy.get('label').contains("Confirm Password").parent().parent().children().find('input')
        .type(password)
    cy.get("button[type='submit']").click()
    // Write file
    cy.writeFile(`cypress/fixtures/${employeeDataFile}`,{
      userId,
      username,
      password
    });
    // Assert the Employee Creation Notification Message
    cy.get('.oxd-text--toast-message').should("have.text", "Successfully Saved")
    cy.waitTillVisible('h6')
    cy.get('h6').should("contain.text", fullName)
    //Search by Employee
    cy.get(".oxd-main-menu-item.active").contains("PIM").click()
    cy.get('label').contains('Employee Id').parent().siblings().find('input')
        .type(userId);
    cy.get("button[type='submit']").click()
    cy.wait(5000);
    cy.get(".oxd-table-cell")
        .invoke('text')
        .then(text => {
          const uId = text.match(/\d+/g);
          expect(uId[0]).to.eq(userId);
        })



    // Click On the Directory Menu
    cy.get("span").contains("Directory").click()
    cy.waitTillVisible("h5")
    // Type the firstName in the Employee Name
    // cy.get("input[placeholder='Type for hints...']").type(firstName)
    cy.get('label').contains('Employee Name').parent().siblings().find('input')
        .type(firstName);
    cy.wait(2000);
    cy.get('.oxd-autocomplete-option > span').click()
    // Click on Search
    cy.get("button[type='submit']").click()
    cy.get(".orangehrm-directory-card-header")
      .invoke('text')
      .then((text) => {
        const normalizedText = text.replace(/\s+/g, ' ').trim(); // Collapse multiple spaces into one and trim
        expect(normalizedText).to.eq(fName);
      });
    // Log Out As an admin.
    cy.get("span img").click()
    cy.get("li a").contains("Logout").click()
    cy.log(fullName)
  });

 it('User Login', () =>{
   cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
   cy.log(fullName)
   cy.fixture(employeeDataFile).then((employee)=>{
     cy.get("input[name='username']").type(employee.username)
     cy.get("input[name='password']").type(employee.password)
     cy.get("[type='submit']").click()
     // cy.get("p.oxd-userdropdown-name").should("have.text",fullName)
     //Update My Info
     cy.get("span").contains("My Info").click()
     cy.waitTillVisible();
     cy.get('label').contains('Gender')
         .parent().siblings().find('input[type="radio"][value="1"]').click({force:true});
     cy.get('button[type="submit"]').first().click();
     cy.get('.oxd-text--toast-message').should("have.text", "Successfully Updated")
     cy.waitTillVisible()

     cy.get('label').contains('Blood Type')
         .parent().siblings().find('.oxd-select-text-input').click()
     cy.contains('O+').click();
     cy.get('button[type="submit"]').eq(1).click();
     cy.get('.oxd-text--toast-message').should("have.text", "Successfully Saved")
     cy.waitTillVisible()

   })
  })
  after(() => {
    // Log Out As Newly Created Employee.
    cy.get("span img").click()
    cy.get("li a").contains("Logout").click()
    cy.waitTillVisible("h5")
    cy.writeFile(`cypress/fixtures/${employeeDataFile}`,{});
  });
});
