import DashboardPageObj from "../Wire/DashboardPageObj";
const header = new DashboardPageObj();
import {PIMPage} from "./PIMPage";
class DashboardPagee{
    dashboardVisible(){
        cy.get(header.getDashboardHeader()).should("have.text", "Dashboard")
        return this
    }
    PIMVisible(){
        let pimPage = new PIMPage()
        return pimPage;
    }

}
export default DashboardPagee