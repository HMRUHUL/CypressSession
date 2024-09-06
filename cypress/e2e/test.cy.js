// const loginPage = require('../support/Page Objects/login/login')
//const DirectoryPage = require('../support/Page Objects/Another/directory')
// const directory = require("../support/Page Objects/Another/directory");
import {loginPage} from "../support/login/login";
import {directoryPage} from "../support/Wiring/directory";
// import {logout} from "../support/Page Objects/login/logout";
describe('Test Page', () =>{
    Cypress.on('uncaught:exception', (err, runnable) => {
        console.log('Caught an exception:', err);
        return false;
    });
    beforeEach('For each it block', ()=>{
        cy.visit('/');
        cy.waitTillVisible();
    })
    it('For each user', ()=>{
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
        loginPage.login('admin', 'admin123')
            .viewPim()

    })


})