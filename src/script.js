/* -- Male Female -- */
const male = document.getElementById('male');
const female = document.getElementById('female');

female.addEventListener('click', () => {
    if (female.classList.contains('active')) {
        female.classList.remove('active');
        female.classList.add('notactive');
        
        male.classList.remove('notactive');
        male.classList.add('active');
    }
    else {
        female.classList.remove('notactive');
        female.classList.add('active');

        male.classList.remove('active');
        male.classList.add('notactive');
    }
});

male.addEventListener('click', () => {
    if (male.classList.contains('active')) {
        male.classList.remove('active');
        male.classList.add('notactive');

        female.classList.remove('notactive');
        female.classList.add('active');
    }
    else {
        male.classList.remove('notactive');
        male.classList.add('active');

        female.classList.remove('active');
        female.classList.add('notactive');
    }
});

/* -- Input Field -- */
const vornameImage = document.getElementById('vorname');
const nachnameImage = document.getElementById('nachname');
const emailImage = document.getElementById('email');
const vornameFeld = document.getElementById('vornameFeld');
const nachnameFeld = document.getElementById('nachnameFeld');
const emailFeld = document.getElementById('emailFeld');

vornameFeld.addEventListener('focus', () => {
    changeStyles(vornameImage, '/icons/profile-circle-blue.svg', '1');
})
vornameFeld.addEventListener('blur', () => {
    changeStyles(vornameImage, '/icons/profile-circle.svg', '.7');
})

nachnameFeld.addEventListener('focus', () => { 
    changeStyles(nachnameImage, '/icons/user-octagon-blue.svg', '1');
})
nachnameFeld.addEventListener('blur', () => { 
    changeStyles(nachnameImage, '/icons/user-octagon.svg', '.7');
})

emailFeld.addEventListener('focus', () => { 
    changeStyles(emailImage, '/icons/sms-tracking-blue.svg', '1');
})
emailFeld.addEventListener('blur', () => { 
    changeStyles(emailImage, '/icons/sms-tracking.svg', '.7');
})

function changeStyles(image, path, opacity) {
    image.src = path;
    image.style.opacity = opacity;
}

/* -- Password -- */

// ! Check if password is at least 8 characters long
// ! Check if password contains at least one uppercase letter
// ! Check if password contains at least one lowercase letter
// ! Check if password contains at least one special character

// Get password fields and floating label
const passwordImageFirst = document.getElementById('passwordFirst');
const passwordImageSecond = document.getElementById('passwordSecond');
const passwordFirst = document.getElementsByClassName('password')[0];
const passwordSecond = document.getElementsByClassName('password')[1];
const floatingLabel = document.getElementsByClassName('floating-label')[3];
const floatingLabel2 = document.getElementsByClassName('floating-label')[4];

// Add event listener to password fields and the spans 
floatingLabel.addEventListener('click', () => { passwordFirst.focus(); }); 
floatingLabel2.addEventListener('click', () => { passwordSecond.focus(); });

passwordFirst.addEventListener('blur', validatePasswords);
passwordSecond.addEventListener('blur', validatePasswords);

function validatePasswords() {
    var passwordCheck1 = false;
    var passwordCheck2 = false;
    
    if (passwordFirst.value.length < 8) {
        floatingLabel.textContent = 'Passwort muss mind. 8 Zeichen lang sein!';
        removeSuccess();
        addError();
    }
    else {
        if (!testUppercase(passwordFirst.value, floatingLabel)) { }
        else {
            if (!testLowercase(passwordFirst.value, floatingLabel)) { }
            else {
                if (!testSpecialChar(passwordFirst.value, floatingLabel)) { }
                else {
                    if (!testEqual(passwordFirst.value, passwordSecond.value, floatingLabel)) { }
                    else { 
                        passwordCheck1 = true;
                    }
                }
            }
        }
    }
    if (passwordSecond.value.length < 8) {
        floatingLabel2.textContent = 'Passwort muss mind. 8 Zeichen lang sein!';
        removeSuccess();
        addError();
    }
    else {
        if (!testUppercase(passwordSecond.value, floatingLabel2)) { }
        else {
            if (!testLowercase(passwordSecond.value, floatingLabel2)) { }
            else {
                if (!testSpecialChar(passwordSecond.value, floatingLabel2)) { }
                else {
                    if (!testEqual(passwordFirst.value, passwordSecond.value, floatingLabel2)) { }
                    else { 
                        passwordCheck2 = true;
                    }
                }
            }
        }
    }

    if (passwordCheck1 && passwordCheck2) {
        // Check if passwords match
        if (passwordFirst.value !== passwordSecond.value) {
            floatingLabel.textContent = 'Passwörter stimmen nicht überein!';
            floatingLabel2.textContent = 'Passwörter stimmen nicht überein!';
            removeSuccess();
            addError();
        }
        else {
            // If all checks pass, clear error message and add success class
            floatingLabel.textContent = 'Passwörter stimmen überein!';
            floatingLabel2.textContent = 'Passwörter stimmen überein!'
            removeError();
            addSuccess();
        }
    }

    function addSuccess() {
        passwordImageFirst.src = '/icons/shield-tick.svg';
        passwordImageSecond.src = '/icons/shield-tick.svg';
        passwordFirst.classList.add('success');
        passwordSecond.classList.add('success');
        floatingLabel.classList.add('success');
        floatingLabel2.classList.add('success');
    }

    function removeSuccess() {
        passwordImageFirst.src = '/icons/shield.svg';
        passwordImageSecond.src = '/icons/shield.svg';
        passwordFirst.classList.remove('success');
        passwordSecond.classList.remove('success');
        floatingLabel.classList.remove('success');
        floatingLabel2.classList.remove('success');
    }

    function addError() {
        passwordImageFirst.src = '/icons/shield-cross.svg';
        passwordImageSecond.src = '/icons/shield-cross.svg';
        passwordFirst.classList.add('error');
        passwordSecond.classList.add('error');
        floatingLabel.classList.add('error');
        floatingLabel2.classList.add('error');
    }

    function removeError() {
        passwordImageFirst.src = '/icons/shield.svg';
        passwordImageSecond.src = '/icons/shield.svg';
        passwordFirst.classList.remove('error');
        passwordSecond.classList.remove('error');
        floatingLabel.classList.remove('error');
        floatingLabel2.classList.remove('error');
    }

    function testUppercase(value, Label) {
        if (!/[A-Z]/.test(value)) {
            Label.textContent = 'Passwort muss mind. einen Großbuchstaben enthalten!';
            removeSuccess();
            addError();
            return false;
        }
        else {
            return true;
        }
    }

    function testLowercase(value, Label) {
        if (!/[a-z]/.test(value)) {
            Label.textContent = 'Passwort muss mind. einen Kleinbuchstaben enthalten!';
            removeSuccess();
            addError();
            return false;
        }
        else {
            return true;
        }
    }

    function testSpecialChar(value, Label) {
        if (!/[\W_]/.test(value)) {
            Label.textContent = 'Passwort muss mind. ein Sonderzeichen enthalten!';
            removeSuccess();
            addError();
            return false;
        }
        else {
            return true;
        }
    }

    function testEqual(value1, value2, Label) {
        if (value1 !== value2) {
            Label.textContent = 'Passwörter stimmen nicht überein!';
            removeSuccess();
            addError();
            return false;
        }
        else {
            return true;
        }
    }

    if (passwordFirst.value == '') {
        floatingLabel.textContent = 'Passwort';
    }
    if (passwordSecond.value == '') {
        floatingLabel2.textContent = 'Passwort';
    }
}

/* -- Capslock -- */

const capsLockDiv = document.getElementsByClassName('capslockDiv')[0];
const capsLockDiv2 = document.getElementsByClassName('capslockDiv')[1];

passwordFirst.addEventListener('keydown', (e) => {
    if (e.getModifierState('CapsLock')) {
        capsLockDiv.style.display = 'block';
        capsLockDiv.style.opacity = '1';
    }
    else {
        capsLockDiv.style.display = 'none';
    }
});

passwordSecond.addEventListener('keydown', (e) => {
    if (e.getModifierState('CapsLock')) {
        capsLockDiv2.style.display = 'block';
        capsLockDiv2.style.opacity = '1';
    }
    else {
        capsLockDiv2.style.display = 'none';
    }
});

passwordFirst.addEventListener('blur', () => {
    capsLockDiv.style.opacity = '0';
    setTimeout(() => {
        capsLockDiv.style.display = 'none';
    }, 500);
});

passwordSecond.addEventListener('blur', () => {
    capsLockDiv2.style.opacity = '0';
    setTimeout(() => {
        capsLockDiv2.style.display = 'none';
    }, 500);
});

/* -- Checkbox -- */

const checkbox = document.getElementById('agb');
var checkboxCheck = false;

checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        checkboxCheck = true;
    }
    else {
        checkboxCheck = false;
    }
});


/* -- Check all -- */

const submitButton = document.getElementById('register');
const resetButton = document.getElementById('reset');

const email = document.getElementById('emailFeld');
const emailCheck = false;

const regexAt = /[@]/; 
const regexDot = /[.]/;

submitButton.addEventListener('click', () => {
    let firstname = document.getElementById('vornameFeld');
    let lastname = document.getElementById('nachnameFeld');

    let floatingLabelFirstname = document.getElementsByClassName('floating-label')[0];
    let floatingLabelLastname = document.getElementsByClassName('floating-label')[1];
    let floatingLabelEmail = document.getElementsByClassName('floating-label')[2];

    let firstnameImage = document.getElementById('vorname');
    let lastnameImage = document.getElementById('nachname');
    let emailImage = document.getElementById('email');

    if (firstname.value == '') {
        addRemoveClass(floatingLabelFirstname, firstname);
        firstnameImage.src = './icons/profile-circle-red.svg';
    }
    else {
        addRemoveClass(floatingLabelFirstname, firstname);
        firstnameImage.src = './icons/profile-circle-green.svg';
    }
    
    if (lastname.value == '') {
        addRemoveClass(floatingLabelLastname, lastname);
        lastnameImage.src = './icons/user-octagon-red.svg';
    }
    else {
        addRemoveClass(floatingLabelLastname, lastname);
        lastnameImage.src = './icons/user-octagon-green.svg';
    }

    let emailSubstr = email.value.substr(email.value.indexOf('@') + 1);

    if (!regexAt.test(email.value) && regexDot.test(email.value)) {
        emailImage.src = './icons/sms-tracking-red.svg';
        floatingLabelEmail.classList.remove('success');
        floatingLabelEmail.classList.add('error');
        email.classList.remove('success');
        email.classList.add('error');
        floatingLabelEmail.textContent = "E-Mail muss ein @ und einen Punkt enthalten!";            
    }
    if (!regexAt.test(email.value)) {
        emailImage.src = './icons/sms-tracking-red.svg';
        floatingLabelEmail.classList.remove('success');
        floatingLabelEmail.classList.add('error');
        email.classList.remove('success');
        email.classList.add('error');
        floatingLabelEmail.textContent = "E-Mail muss ein @ enthalten!";  
    }
    if (regexAt.test(email.value) && !regexDot.test(emailSubstr)) {
        emailImage.src = './icons/sms-tracking-red.svg';
        floatingLabelEmail.classList.remove('success');
        floatingLabelEmail.classList.add('error');
        email.classList.remove('success');
        email.classList.add('error');
        floatingLabelEmail.textContent = "E-Mail muss und einen Punkt enthalten!";  
    }
    if (regexAt.test(email.value) && regexDot.test(emailSubstr)) {
        emailImage.src = './icons/sms-tracking-green.svg';
        floatingLabelEmail.classList.remove('error');
        floatingLabelEmail.classList.add('success');
        email.classList.remove('error');
        email.classList.add('success');
        floatingLabelEmail.textContent = "E-Mail";
    }

    if (passwordFirst.value == '' && passwordSecond.value == '') {
        addRemoveClass(floatingLabel, passwordFirst);
        addRemoveClass(floatingLabel2, passwordSecond);
       
        passwordImageFirst.src = './icons/shield-cross.svg';
        passwordImageSecond.src = './icons/shield-cross.svg';
    }
    else {
        if (passwordFirst.value == '') {
            addRemoveClass(floatingLabel, passwordFirst);
            passwordImageFirst.src = './icons/shield-cross.svg';
        }
        if (passwordSecond.value == '') {
            addRemoveClass(floatingLabel2, passwordSecond);
            passwordImageSecond.src = './icons/shield-cross.svg';
        }

        if (passwordFirst.value !== '' && passwordSecond.value !== '') {
            addRemoveClass(floatingLabel, passwordFirst);
            addRemoveClass(floatingLabel2, passwordSecond);
            validatePasswords();
        }
    }

    function addRemoveClass(floatingLabel, name) {
        if (name.value == '') {
            floatingLabel.classList.remove('success');
            floatingLabel.classList.add('error');
            name.classList.remove('success');
            name.classList.add('error');
        }
        else {
            floatingLabel.classList.remove('error');
            floatingLabel.classList.add('success');
            name.classList.remove('error');
            name.classList.add('success');
        }
    }

    if (checkboxCheck == false) {
        document.getElementById('agbcheck').classList.add('agbError');
    }
    else {
        document.getElementById('agbcheck').classList.remove('agbError');
    }

    if (firstname.value !== '' && lastname.value !== '' && email.value !== '' && passwordFirst.value !== '' && passwordSecond.value !== '' && checkboxCheck == true) {
        alert('Erfolgreich registriert!');
    }
});

resetButton.addEventListener('click', () => {
    let resultVorname = document.getElementById('vornameFeld');
    let vornameImage = document.getElementById('vorname');

    let resultNachname = document.getElementById('nachnameFeld');
    let nachnameImage = document.getElementById('nachname');

    let resultEmail = document.getElementById('emailFeld');
    let emailImage = document.getElementById('email');

    let password0 = document.getElementsByClassName('password')[0];
    let passwordImage0 = document.getElementById('passwordFirst');
    
    let password1 = document.getElementsByClassName('password')[1];
    let passwordImage1 = document.getElementById('passwordSecond');

    let floatingLabel1 = document.getElementsByClassName('floating-label')[0];
    let floatingLabel2 = document.getElementsByClassName('floating-label')[1];
    let floatingLabel3 = document.getElementsByClassName('floating-label')[2];
    let floatingLabel4 = document.getElementsByClassName('floating-label')[3];
    let floatingLabel5 = document.getElementsByClassName('floating-label')[4];

    let agbCheck = document.getElementById('agbCheck');

    let textarea = document.getElementById('textarea');

    resultVorname.value = '';
    resultNachname.value = '';
    resultEmail.value = '';

    password0.value = '';
    password1.value = '';

    floatingLabel1.textContent = 'Vorname';
    floatingLabel2.textContent = 'Nachname';
    floatingLabel3.textContent = 'E-Mail';
    floatingLabel4.textContent = 'Passwort';
    floatingLabel5.textContent = 'Passwort';

    agb.checked = false;

    textarea.value = '';
    
    vornameImage.src = './icons/profile-circle.svg';
    nachnameImage.src = './icons/user-octagon.svg';
    emailImage.src = './icons/sms-tracking.svg';
    passwordImage0.src = './icons/shield.svg';
    passwordImage1.src = './icons/shield.svg';

    resultVorname.classList.remove('success');
    resultVorname.classList.remove('error');

    resultNachname.classList.remove('success');
    resultNachname.classList.remove('error');

    resultEmail.classList.remove('success');
    resultEmail.classList.remove('error');

    password0.classList.remove('success');
    password0.classList.remove('error');

    password1.classList.remove('success');
    password1.classList.remove('error');

    floatingLabel1.classList.remove('success');
    floatingLabel1.classList.remove('error');

    floatingLabel2.classList.remove('success');
    floatingLabel2.classList.remove('error');

    floatingLabel3.classList.remove('success');
    floatingLabel3.classList.remove('error');

    floatingLabel4.classList.remove('success');
    floatingLabel4.classList.remove('error');

    floatingLabel5.classList.remove('success');
    floatingLabel5.classList.remove('error');

    agbCheck.classList.remove('agbError');
});