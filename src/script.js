/* -- Gender -- */
const dropdownChoices = document.getElementById("dropdown");
const dropdownMenu = document.getElementsByClassName("dropdownMenu")[0];
const dropdownImage = document.getElementById("geschlechtImg");


function dropdown() {
    dropdownChoices.classList.toggle("show");
}

window.onclick = function(event) {
    if (dropdownChoices.classList.contains('show')) {
        dropdownMenu.classList.toggle("show-menu");
    }
    else {
        dropdownMenu.classList.remove("show-menu");
    }

    if (!event.target.matches('.dropdownMenu')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
} 

const male = document.getElementById('male');
const female = document.getElementById('female');
const non = document.getElementById('non');
const daniel = document.getElementById('daniel');

male.addEventListener('click', () => { dropdownMenu.textContent = 'Männlich'; });
female.addEventListener('click', () => { dropdownMenu.textContent = 'Weiblich'; });
non.addEventListener('click', () => { dropdownMenu.textContent = 'Nicht definiert'; });
daniel.addEventListener('click', () => { dropdownMenu.textContent = 'Daniel'; });

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

const passwordImageFirst = document.getElementById('passwordFirst');
const passwordImageSecond = document.getElementById('passwordSecond');
const passwordFirst = document.getElementsByClassName('password')[0];
const passwordSecond = document.getElementsByClassName('password')[1];
const floatingLabel = document.getElementsByClassName('floating-label')[3];
const floatingLabel2 = document.getElementsByClassName('floating-label')[4];

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
        if (passwordFirst.value !== passwordSecond.value) {
            floatingLabel.textContent = 'Passwörter stimmen nicht überein!';
            floatingLabel2.textContent = 'Passwörter stimmen nicht überein!';
            removeSuccess();
            addError();
        }
        else {
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
    const firstname = document.getElementById('vornameFeld');
    const lastname = document.getElementById('nachnameFeld');

    const floatingLabelFirstname = document.getElementsByClassName('floating-label')[0];
    const floatingLabelLastname = document.getElementsByClassName('floating-label')[1];
    const floatingLabelEmail = document.getElementsByClassName('floating-label')[2];

    const firstnameImage = document.getElementById('vorname');
    const lastnameImage = document.getElementById('nachname');
    const emailImage = document.getElementById('email');

    if (dropdownMenu.textContent == 'Bitte wählen...' || dropdownMenu.textContent == 'Sie müssen ein Geschlecht auswählen!') {
        dropdownMenu.textContent = 'Sie müssen ein Geschlecht auswählen!';
        dropdownImage.src = './icons/red.svg';
        dropdownMenu.classList.remove('success');
        dropdownMenu.classList.add('error');
    }
    else {
        dropdownMenu.classList.remove('error');
        dropdownMenu.classList.add('success');
        dropdownImage.src = './icons/green.svg';
    }

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

    const emailSubstr = email.value.substr(email.value.indexOf('@') + 1);

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

    if (dropdownMenu.classList.contains('success') && firstname.value !== '' && lastname.value !== '' && email.value !== '' && passwordFirst.value !== '' && passwordSecond.value !== '' && checkboxCheck == true) {
        alert('Erfolgreich registriert!');
    }
});

resetButton.addEventListener('click', () => {
    const dropdownMenu = document.getElementsByClassName("dropdownMenu")[0];
    const dropdownImage = document.getElementById("geschlechtImg");

    const resultVorname = document.getElementById('vornameFeld');
    const vornameImage = document.getElementById('vorname');

    const resultNachname = document.getElementById('nachnameFeld');
    const nachnameImage = document.getElementById('nachname');

    const resultEmail = document.getElementById('emailFeld');
    const emailImage = document.getElementById('email');

    const password0 = document.getElementsByClassName('password')[0];
    const passwordImage0 = document.getElementById('passwordFirst');

    const password1 = document.getElementsByClassName('password')[1];
    const passwordImage1 = document.getElementById('passwordSecond');

    const floatingLabel1 = document.getElementsByClassName('floating-label')[0];
    const floatingLabel2 = document.getElementsByClassName('floating-label')[1];
    const floatingLabel3 = document.getElementsByClassName('floating-label')[2];
    const floatingLabel4 = document.getElementsByClassName('floating-label')[3];
    const floatingLabel5 = document.getElementsByClassName('floating-label')[4];

    const agbCheck = document.getElementById('agbcheck');

    const textarea = document.getElementById('textarea');

    resultVorname.value = '';
    resultNachname.value = '';
    resultEmail.value = '';

    password0.value = '';
    password1.value = '';

    dropdownMenu.textContent = 'Bitte wählen...';
    floatingLabel1.textContent = 'Vorname';
    floatingLabel2.textContent = 'Nachname';
    floatingLabel3.textContent = 'E-Mail';
    floatingLabel4.textContent = 'Passwort';
    floatingLabel5.textContent = 'Passwort';

    agb.checked = false;

    textarea.value = '';

    dropdownImage.src = './icons/gender.svg'
    vornameImage.src = './icons/profile-circle.svg';
    nachnameImage.src = './icons/user-octagon.svg';
    emailImage.src = './icons/sms-tracking.svg';
    passwordImage0.src = './icons/shield.svg';
    passwordImage1.src = './icons/shield.svg';

    dropdownMenu.classList.remove('success');
    dropdownMenu.classList.remove('error');

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