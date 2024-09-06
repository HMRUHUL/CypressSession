const addd = "button[type='button']:contains('Add')"

const getId = "label:contains('Employee Id')"
const firstName = "input[name='firstName']"
const lastName = "input[name='lastName']"
const toggleCheckbox = "label span"
const username = "label:contains('Username')"
const password = "label:contains('Password'):not(:contains('Confirm'))"
const confirmPassword = "label:contains('Confirm Password')"
const saveButton = "button[type='submit']"
const successMessage = "p[class*='oxd-text--toast-message']"
const fullNameAssert = 'h6'
const  rowId = ".oxd-table-cell";
const fullName = 'label:contains("Employee Name")'
const span = '.oxd-autocomplete-option > span';
const rowName = ".orangehrm-directory-card-header";
const profileName = 'p.oxd-userdropdown-name';
const myInfo = 'span:contains("My Info")'
export class AddEmployeeObj{
    getAddButton(){
        return addd;
    }
    getEmployeeIdInput() {
        return getId
    }

    getFirstName(){
        return firstName
    }
    getLastName(){
        return lastName
    }
    getFullName(){
        return fullName;
    }
    getToggleCheckbox(){
        return toggleCheckbox
    }
    getUsername(){
        return username
    }
    getPassword(){
        return password
    }
    getConfirmPassword(){
        return confirmPassword
    }
    getSaveButton(){
        return saveButton
    }
    getSuccessMessage(){
        return successMessage
    }
    getfullNameAssert(){
        return fullNameAssert;
    }
    getRow(){
        return rowId;
    }
    getSpan(){
        return span;
    }
    getRowName(){
        return rowName;
    }
    getProfileName(){
        return profileName;
    }
    getMyInfo(){
        return myInfo
    }



}