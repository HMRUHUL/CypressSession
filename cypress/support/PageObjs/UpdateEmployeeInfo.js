import {UpdateEmployeeInfoObj} from "../Wire/UpdateEmployeeInfoObj";
const emp = new UpdateEmployeeInfoObj();
import {PIMPage} from "./PIMPage";
import {EmployeeInfo} from "./EmployeeInfo";


export class UpdateEmployeeInfo{
    getNationality(nationality){
        cy.get(emp.getNationality()).parent().siblings()
            .find(emp.getDropdown()).click()
            .invoke('text')
            .then((val)=>{
                cy.contains(nationality).click();
            })
        return this
    }
    clickOnSaveButton(){
        cy.get(emp.getSaveButton()).first().click();
        let empInfo = new EmployeeInfo()
        return empInfo
    }
    assertNationality(nationality){
        cy.get(emp.getDropdown()).first().should('have.text', nationality);
        let pim = new PIMPage()
        return pim;
    }
    assertBg(bg){
        cy.get(emp.getDropdown()).eq(2).should('have.text', bg);
        let empInfo =  new EmployeeInfo()
        return empInfo
    }
    checkGender(){
        cy.get(emp.getGender()).click()
        cy.get(emp.getSaveButton()).first().click();
        let empInfo =  new EmployeeInfo()
        return empInfo
    }
    getBg(bg){
        cy.get(emp.getBg()).parent().siblings()
            .find(emp.getDropdown()).click()
            .invoke('text')
            .then((val)=>{
                cy.contains(bg).click();
            })
        cy.get(emp.getSaveButton()).eq(1).click();
        return this
    }





}