const lgForm = document.querySelector('#login-form');
const rgForm = document.querySelector('#register-form');
const showLgBtn = document.querySelector('#show-login');
const showRegBtn = document.querySelector('#show-register');
const mainContainer = document.querySelector('#main-container');
const loginContainer = document.querySelector('#login-container');

/**
 * Show main page after login
 */
const showMainPage = () => {
    // add class hidden to login container
    loginContainer.classList.add('hidden');
    mainContainer.classList.remove('hidden');
}

// show login page if not login
const showLoginPage = () => {
    // add class hidden to login container
    loginContainer.classList.remove('hidden');
    mainContainer.classList.add('hidden');
}

/**
 * Handle shoing login form on
 */
function showLoginForm() {
    const displayClass = 'hidden';
    const className = 'bg-yellow-600'; // active class

    // remove active class
    showRegBtn.classList.remove(className);
    // add active class to Login btn
    showLgBtn.classList.add(className);

    // hide register form
    lgForm.classList.remove(displayClass);
    rgForm.classList.add(displayClass);
}

/**
 * Handle showing register form
 */
function showRegisterForm() {

    const displayClass = 'hidden';
    const className = 'bg-yellow-600'; // active class

    // remove active class
    showLgBtn.classList.remove(className);
    // add active class to Login btn
    showRegBtn.classList.add(className); 

    // hide register form
    rgForm.classList.remove(displayClass);
    lgForm.classList.add(displayClass);
}

export {
    showMainPage,
    showLoginPage,
    showLoginForm,
    showRegisterForm
}