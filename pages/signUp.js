export class register{
    weblocators = {
        btnsignup: '#signin2',
        username: '#sign-username',
        password: '#sign-password',
        submit: '[onclick="register()"]',
        cart: '#cartur'
    }
    openURL(){
        cy.visit('https://www.demoblaze.com/');
    }
    clickbtnsignup(){
        cy.get(this.weblocators.btnsignup).click();
    }
    enterusername(){
        cy.get(this.weblocators.username).type('ruhul');
    }
    enterpassword(){
        cy.get(this.weblocators.password).type('1234');
    }
    clicksubmit(){
        cy.get(this.weblocators.submit).click();
    }
    clickcart(){
        cy.get(this.weblocators.cart).click();

    }
}