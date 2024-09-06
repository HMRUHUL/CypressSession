export class Reusables{
    generateRandomPassword() {
        const allChars = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?'
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
        const upper = uppercase.charAt(Math.floor(Math.random() * uppercase.length));
        const lower = lowercase.charAt(Math.floor(Math.random() * lowercase.length));
        const num = numbers.charAt(Math.floor(Math.random() * numbers.length));
        const special = specialChars.charAt(Math.floor(Math.random() * specialChars.length));
        //let password = '';
        let password = lower + upper + num + special;
        for (let i = 5; i < 12; i++) {
            password += allChars.charAt(Math.floor(Math.random() * allChars.length));
        }
        password = password.split('').sort(() => 0.5 - Math.random()).join('');
        return password;
    }
}