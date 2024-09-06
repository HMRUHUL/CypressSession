// ***********************************************
// This example comman.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --

import Login from "./PageObjects/LoginPage";
import Dashboard from "./PageObjects/DashboardPage";

// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const loginPage = new Login()
const dashboard = new Dashboard()
/// <reference types="cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });  

Cypress.Commands.add("waitTillVisible",(selector,timeout=5000)=>{
    cy.get(selector,{timeout}).should("be.visible")
});

Cypress.Commands.add('orangeHRMLogin', (uname, password) => {
  cy.session([uname, password], () => {
    cy.visit('/')
    loginPage.enterUsername(uname)
      .enterPassword(password)
      .clickLoginButton()

  },
    {
      cacheAcrossSpecs: true
    }
  )
})

Cypress.Commands.add('LogoutUser', (username, password) => {
  cy.orangeHRMLogin(username, password)
  cy.visit("/")
})
