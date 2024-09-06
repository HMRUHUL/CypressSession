import {AddEmployeeObj} from "../Wire/AddEmployeeObj";
import {EmployeeInfo} from "./EmployeeInfo";
const ad = new AddEmployeeObj()
export class AddEmployeePage{
    clickAdd(){
        cy.get(ad.getAddButton()).click();
        let emp =  new EmployeeInfo()
        return emp;
    }

}