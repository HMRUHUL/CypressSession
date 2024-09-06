// Import the Faker library
const { faker } = require('@faker-js/faker');

describe('OrangeHRM End to End Testing', () => {
    // const baseUrl = 'https://opensource-demo.orangehrmlive.com/';
    const adminUserName = "Admin"
    const adminPassword = "admin123"

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
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
        cy.visit('/');
        cy.title().should("eq", "OrangeHRM")

    });
    afterEach(()=>{
        // Log Out As an admin.
        cy.get("span img").click()
        cy.get("li a").contains("Logout").click()
        cy.waitTillVisible("h5")
    })

    it('Validate the whole OrangeHRM flow', () => {
        // Login using Admin credentials.
        cy.get("input[name='username'").type(adminUserName)
        cy.get("input[name='password'").type(adminPassword)
        cy.get("[type='submit']").click()
        cy.waitTillVisible('h6')
        cy.get('h6').should("have.text", "Dashboard")
        //click on PIM
        cy.get("span").contains("PIM").click()
        //click on Add Button
        cy.get("button[type='button']").contains("Add").click()
        cy.waitTillVisible('h6')
        // Extract the Employee ID.
        var employeeID = ""
        cy.get('label').contains("Employee Id").parent().siblings('div')
            .find('input').invoke("val")
            .then((value)=>{
            employeeID = value
        }).then(()=>{
            // Create a new employee using Faker
            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();
            const fullName = firstName+" "+lastName
            const employeeId = faker.datatype.uuid(); // Using UUID for a unique employee ID
            // cy.log("EmployeeID",employeeId)
            const username = firstName + lastName
            const password = generateRandomPassword()
            //Fill the employee form
            cy.get("input[name='firstName'").type(firstName)
            cy.get("input[name='lastName']").type(lastName)
            // Click On Create Login Details toggle
            cy.get("input[type='checkbox']").click({ force: true })
            // Fill the login details form.
            cy.get('label').contains("Username").parent().siblings('div')
                .find('input').type(username)
            cy.get('label').contains("Password").parent().siblings('div')
                .find('input').type(password)
            cy.get('label').contains("Confirm Password").parent().siblings('div')
                .find('input').type(password)
            cy.get("button[type='submit']").click()
            // Assert the Employee Creation Notification Message
            cy.get('.oxd-text--toast-message').should("have.text", "Successfully Saved")
            cy.waitTillVisible('h6')
            cy.get('h6').should("contain.text", fullName)
            // cy.get('label').contains('Nationality')
            //     .parent().siblings().find('.oxd-select-text-input').should('contain', 'Bangladeshi')
            //     .click()
            cy.get('label').contains('Nationality').parent().siblings()
                .find('.oxd-select-text-input').click()
                .invoke('text')
                .then((val)=>{
                    cy.contains('Bangladeshi').click();
                })
            cy.waitTillVisible()
                //cy.contains('Bangladeshi').click();

            // Save Employee Details to a file
            cy.writeFile(`cypress/fixtures/${employeeDataFile}`,{
                username,
                password,
                employeeID,
                fullName
            });
            // Click On Employee List and search by Employee ID
            cy.get("li a").contains("Employee List").click()
            cy.waitTillVisible('h6')
            cy.fixture(employeeDataFile).then((employee)=>{
                cy.get('label').contains("Employee Id").parent().siblings('div')
                    .find('input').type(employee.employeeID)
                cy.get("button[type='submit']").click()
                //Assert the firstName of the Employee is showing.
                cy.get("div[role='cell'] div").contains(firstName).invoke('text')
                    .then((text) => {
                        const expectedText = text.replace(/\s+/g, ' ').trim(); // Collapse multiple spaces into one and trim
                        expect(expectedText).to.eq(firstName);
                    });
            })


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

            // Log In Using Newly Created Employee Creds

        })
})
    it('ok user',()=> {
        cy.fixture(employeeDataFile).then((employee) => {
            //Login with employee creds.
            cy.get("input[name='username'").type(employee.username)
            cy.get("input[name='password'").type(employee.password)
            cy.get("[type='submit']").click()
            // Assert that the Newly Created Employee Full Name is showing beside the profile icon.
            cy.get("p.oxd-userdropdown-name").should("have.text", employee.fullName)
            // Navigate to My Info
            cy.get("span").contains("My Info").click()
            cy.waitTillVisible("h6")
            cy.scrollTo(0, 600); // Scrolls down 600 pixels from the top
            // Click on the Male Gender Radio button
            cy.get("label").contains("Male").click()
            // Click on the blood type dropdown
            cy.get("label").contains("Blood Type").parent().siblings("div").click()
            // Select a blood Group
            cy.get('.oxd-select-dropdown > :nth-child(4)').click()
            cy.get("button[type='submit']").eq(1).click()
            // Assert the Employee Successfully Saved Message
            cy.get('.oxd-text--toast-message').should("have.text", "Successfully Saved")
        })
    });

});
