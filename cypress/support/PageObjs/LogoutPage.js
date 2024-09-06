import {LogoutPageObj} from "../Wire/LogoutPageObj";
import loginPage from "./LoginPage";
const logout = new LogoutPageObj()
export class LogoutPage{
    openLogout(){
        cy.get(logout.getOption()).click();
        return this
    }
    clickLogout(){
        cy.get(logout.getClickButton()).click()
        return this
    }
}