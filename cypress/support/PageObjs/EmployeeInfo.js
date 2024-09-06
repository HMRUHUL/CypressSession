import {add} from "lodash";

const {faker} = require("@faker-js/faker");
const fs = require('fs');
import {AddEmployeeObj} from "../Wire/AddEmployeeObj";
const addEmp = new AddEmployeeObj()
const value = addEmp.getEmployeeIdInput()
const employeeData = "employeeData.json"
import {UpdateEmployeeInfo} from "./UpdateEmployeeInfo";
const update = new UpdateEmployeeInfo()
import PIMPageObj from "../Wire/PIMPageObj";
const dir = new PIMPageObj()
export class EmployeeInfo{
    constructor() {
        this.employeeDetails = {}
    }
    enterId(){
        cy.get(addEmp.getEmployeeIdInput()).parent().siblings('div').find('input')
            .invoke('val').then((value)=>{
            this.employeeDetails.EmployeeId = value;
        })
        return this
    }
    enterEmployeeFirstName(firstname){
        cy.get(addEmp.getFirstName()).type(firstname)

        return this
    }
    enterEmployeeLastName(lastName){
        cy.get(addEmp.getLastName()).type(lastName)

        return this
    }
    clickOnToggleCheckbox(){
        cy.get(addEmp.getToggleCheckbox()).click()
        return this
    }
    enterEmployeeUserName(username){
        cy.get(addEmp.getUsername()).parent().siblings('div').find('input')
            .type(username)
        this.employeeDetails.username = username;
        return this
    }
    enterEmployeePassword(password){
        cy.get(addEmp.getPassword()).parent().siblings('div').find('input')
            .type(password)
        this.employeeDetails.password = password;
        return this
    }
    enterEmployeeConfirmPassword(password){
        cy.get(addEmp.getConfirmPassword()).parent().siblings('div').find('input')
            .type(password)
        return this
    }
    clickOnSaveButton(){
        cy.get(addEmp.getSaveButton()).click()
        return this
    }

    assertSuccessMessage(){
        cy.get(addEmp.getSuccessMessage()).should("have.text", "Successfully Saved")
        return this
    }
    fullNameAssert(fullName){
        cy.get(addEmp.getfullNameAssert()).should('contain.text', fullName);
        this.employeeDetails.fullname = fullName;
        return update
    }
    writeJson() {
        // Read the existing data from the file
        cy.readFile(`cypress/fixtures/${employeeData}`).then((data) => {
            data = [];
            data.push(this.employeeDetails);
            cy.writeFile(`cypress/fixtures/${employeeData}`, data);
        });
        return this
    }

    assertSuccessMessageUpdate(){
        cy.get(addEmp.getSuccessMessage()).should("have.text", "Successfully Updated")
        return update;
    }
    assertSuccessMessageEmployeeFound(fullName){
        cy.get(addEmp.getRowName()).invoke('text')
            .then((text) => {
                const normalizedText = text.replace(/\s+/g, ' ').trim(); // Collapse multiple spaces into one and trim
                expect(normalizedText).to.eq(fullName);
            });
    }
    searchEmployeeId(uId){
            cy.get(addEmp.getEmployeeIdInput()).parent().siblings().find('input')
                .type(uId);
            cy.get(addEmp.getSaveButton()).click().wait(2000);
            return this
    }
    uIdAssert(uid){
        cy.get(addEmp.getRow()).invoke('text')
            .then(text => {
                const uId = text.match(/\d+/g);
                cy.log(uId)
                expect(uId[0]).to.eq(uid);
            })
        return this
    }
    getDirectory(){
        cy.get(dir.getClickDir()).click();
        return this;
    }
    searchEmployeeName(fullName){
        cy.get(addEmp.getFullName()).parent().siblings().find('input')
            .type(fullName).wait(2000);
        cy.get(addEmp.getSpan()).click();
        cy.get(addEmp.getSaveButton()).click().wait(2000);
        return this
    }
    getProfileName(fullName){
        cy.get(addEmp.getProfileName()).should("have.text", fullName)
        return this
    }
    myInfo(){
        cy.get(addEmp.getMyInfo()).click();
        cy.scrollTo(0, 400);
        return update
    }



}