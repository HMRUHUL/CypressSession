import PIMPageObj from "../Wire/PIMPageObj";
const pim = new PIMPageObj()
import {AddEmployeePage} from "./AddEmployeePage";
export class PIMPage{
    clickedPIM(){
      cy.get(pim.getClick()).click();
      let employeeInfo = new AddEmployeePage()
      return employeeInfo
    }
}
