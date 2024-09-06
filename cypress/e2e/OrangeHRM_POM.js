// Import the Faker library
const { faker } = require('@faker-js/faker');
import Dashboard from '../support/PageObjects/DashboardPage';
import Login from '../support/PageObjects/LoginPage';
import ReuseableMethods from '../support/PageObjects/ReuseableMethods';
import TopNav from '../support/PageObjects/TopNavPage';


describe('OrangeHRM End to End Testing', () => {
    // const baseUrl = 'https://opensource-demo.orangehrmlive.com/';
    const adminUserName = "Admin"
    const adminPassword = "admin123"
    const reusables = new ReuseableMethods()
    const employeeDataFile = "employeeData.json" // File to save employee data

    const loginPage = new Login()
    const dashboard = new Dashboard()
    const topNav = new TopNav()
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const fullName = firstName + " " + lastName
    const username = firstName + lastName
    const password = reusables.generateRandomPassword()

    // Hooks
    before(() => {
        // Before all tests, visit the base URL
        cy.LoginAndVisitDashboard(adminUserName, adminPassword)

    });

    it('Validate the whole OrangeHRM flow', () => {

        dashboard.assertDashboardHeaderIsVisible()
            .clickOnPIMButton()
            .clickOnAddEmployeeButton()
            .enterEmployeeFirstName(firstName)
            .enterEmployeeLastName(lastName)
            .clickOnToggleCheckbox()
            .enterEmployeeUserName(username)
            .enterEmployeePassword(password)
            .enterEmployeeConfirmPassword(password)
            .clickOnSaveButton()
            .assertSuccessMessage()
            .assertEmployeeNameIsVisible(fullName)
            .clickDirectoryPageFromSideNav()
            .enterEmployeeName(firstName)
            .clickOnSearchButton()
            .assertCardHolderContainsEmployeeName(fullName)
        topNav.logout()
        cy.LoginAndVisitDashboard(username,password)
        dashboard.assertUsernameIsVisible(fullName)
    });

    after(() => {
         topNav.logout()
    });
});
