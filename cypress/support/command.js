
import Login from "./PageObjs/LoginPage";
const loginPage = new Login()
import {LogoutPage} from "./PageObjs/LogoutPage";
const logout = new LogoutPage();
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

Cypress.Commands.add("waitTillVisible",(selector,timeout=5000)=>{
    cy.get(selector,{timeout}).should("be.visible")
});

Cypress.Commands.add('login', () =>{
    cy.visit('/')
    cy.title().should("eq", "OrangeHRM")
})
Cypress.Commands.add('loginUser', (username, password) =>{
   // cy.session([username, password], () =>
        {
        loginPage.enterUsername(username).enterPassword(password).clickLoginButton()

        }
     // )
})

Cypress.Commands.add('logout', ()=>{
    logout
        .openLogout()
        .clickLogout()
})
