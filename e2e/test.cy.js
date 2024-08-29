import  { register }  from '../../pages/signUp'

const registerObj = new register();

describe('sign up',function() {
    it('sign flow automation ',function() {
        // registerObj.openURL();
        cy.visit('/');
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });

        //  registerObj.clickbtnsignup();
        // registerObj.enterusername();
        // registerObj.enterpassword();
        // registerObj.clicksubmit();
        // registerObj.clickcart();

    })
})