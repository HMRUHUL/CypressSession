const emp = 'label:contains("Nationality")'
const dropdown = '.oxd-select-text-input'
const getSave = 'button[type="submit"]'
const gender = 'label:contains("Male")'
const saveGender = 'input[type="radio"][value="1"]';
const bg = 'label:contains("Blood Type")'
export class UpdateEmployeeInfoObj{
    getNationality(){
        return emp;
    }
    getDropdown(){
        return dropdown
    }
    getSaveButton(){
        return getSave
    }
    getGender(){
        return gender
    }
    getSaveGender(){
        return saveGender
    }
    getBg(){
        return bg;
    }

}