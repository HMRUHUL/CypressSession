// Import the Faker library
const { faker } = require('@faker-js/faker');
import DashboardPagee from "../support/PageObjs/DashboardPagee";
const dashboard = new DashboardPagee()
import {PIMPage} from "../support/PageObjs/PIMPage";
const PIM = new PIMPage()
import {AddEmployeePage} from "../support/PageObjs/AddEmployeePage";
const addEmp = new AddEmployeePage()
import {Reusables} from "../support/PageObjs/Reusables";
const Reusable = new Reusables()
import {EmployeeInfo} from "../support/PageObjs/EmployeeInfo";
const emp = new EmployeeInfo()

import {UpdateEmployeeInfo} from "../support/PageObjs/UpdateEmployeeInfo";
const update = new UpdateEmployeeInfo()

describe('OrangeHRM End to End Testing', () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const fullName = firstName + " "+ lastName;
    const username = firstName+lastName;
    const password = Reusable.generateRandomPassword()
    const uid = faker.random.numeric(10)
    const nationality = 'Bangladeshi'

    // Hooks
    beforeEach(() => {
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
        cy.login();
    });
    // afterEach(()=>{
    //     cy.logout();
    // })

    it('Validate the whole OrangeHRM flow', () => {
        const adminUserName = "Admin"
        const adminPassword = "admin123"
        cy.loginUser(adminUserName, adminPassword)
        dashboard.dashboardVisible()
            .dashboardVisible().PIMVisible().clickedPIM().clickAdd()
        emp
            .enterEmployeeFirstName(firstName).enterEmployeeLastName(lastName).enterId()
            .clickOnToggleCheckbox().enterEmployeeUserName(username)
            .enterEmployeePassword(password).enterEmployeeConfirmPassword(password)
            .clickOnSaveButton().assertSuccessMessage()
            .writeJson()
            .fullNameAssert(fullName).getNationality(nationality).clickOnSaveButton().assertSuccessMessageUpdate()
            .assertNationality(nationality).clickedPIM()

        cy.readFile(`cypress/fixtures/employeeData.json`).then((data) =>{
            const uid = data[0].EmployeeId;
            emp
                .searchEmployeeId(uid).uIdAssert(uid)
                .getDirectory().searchEmployeeName(firstName).assertSuccessMessageEmployeeFound(fullName);
        })
    })

    it('New User',()=> {
        cy.readFile(`cypress/fixtures/employeeData.json`).then((employee) => {

            const username = employee[0].username
            const password = employee[0].password
            const fullName = employee[0].fullname;
            const bg = 'B+';
            cy.loginUser(username, password)
            emp
                .getProfileName(fullName).myInfo()
                .checkGender().assertSuccessMessageUpdate()
                .getBg(bg).assertBg(bg).assertSuccessMessage()
        })
    });

});
