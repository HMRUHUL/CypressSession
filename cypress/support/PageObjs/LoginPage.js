import LoginPageObj from "../Wire/LoginPageObj";
const loginPageObjs = new LoginPageObj()
import DashboardPagee from "./DashboardPagee";
class Login{
    enterUsername(username){
        cy.get(loginPageObjs.getUsername()).type(username)
        return this
    }
    enterPassword(password){
        cy.get(loginPageObjs.getPassword()).type(password)
        return this
    }
    clickLoginButton(){
        cy.get(loginPageObjs.getSubmitButton()).click();
        let dashboard = new DashboardPagee()
        return dashboard
    }
}
export default Login
