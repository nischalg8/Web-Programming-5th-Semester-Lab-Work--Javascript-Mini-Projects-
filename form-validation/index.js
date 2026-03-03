
const form = document.getElementById("signupForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Error spans
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");


function validateName() {
    if(nameInput.value.trim() === "") {
        nameError.textContent = "Name is required";
        return false;
    } else if(nameInput.value.trim().length < 3) {
        nameError.textContent = "Name must be at least 3 characters";
        return false;
    } else {
        nameError.textContent = "";
        return true;
    }
}

function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailInput.value.trim() === "") {
        emailError.textContent = "Email is required";
        return false;
    } else if(!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = "Invalid email format";
        return false;
    } else {
        emailError.textContent = "";
        return true;
    }
}

function validatePassword() {
    if(passwordInput.value.trim() === "") {
        passwordError.textContent = "Password is required";
        return false;
    } else if(passwordInput.value.trim().length < 6) {
        passwordError.textContent = "Password must be at least 6 characters";
        return false;
    } else {
        passwordError.textContent = "";
        return true;
    }
}

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);


form.addEventListener("submit", function(e){
    e.preventDefault(); 

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if(isNameValid && isEmailValid && isPasswordValid) {
        alert("Form submitted successfully!");
        form.reset();
    }
});