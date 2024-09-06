const loginPage = require('../support/login/login')

describe('Test Page', () =>{

    beforeEach('For each it', ()=>{
        cy.visit('/');
    })
    it('For each user', ()=>{
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
        loginPage.typeUsername('admin');
        loginPage.typePassword('admin123');
       // loginPage.clickLoginButton();
        cy.contains('Directory').click();
    })
    it('Ok Test', ()=>{


    })

})