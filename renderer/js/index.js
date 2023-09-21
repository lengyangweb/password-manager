const lgForm = document.querySelector('#login-form');
const rgForm = document.querySelector('#register-form');
const showLgBtn = document.querySelector('#show-login');
const registerBtn = document.querySelector('#registerBtn');
const showRegBtn = document.querySelector('#show-register');
const mainContainer = document.querySelector('#main-container');
const loginContainer = document.querySelector('#login-container');

/**
 * Show dialog message
 * @param {String} message 
 */
function showMessage(message) {
    Toastify.toast({
        text: message,
        duration: 5000,
        close: false,
        position: "top", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "green",
          color: 'white',
          display: 'flex',
          justifyContent: 'center'
        }
    });
}

/**
 * Show error dialog message
 * @param {String} message 
 */
function showErrorMessage(message) {
    Toastify.toast({
        text: message,
        duration: 5000,
        close: false,
        position: "top", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "red",
          color: 'white',
          display: 'flex',
          justifyContent: 'center'
        }
    });
}

/**
 * Save token to localStorage
 * @param {String} token 
 */
function saveToken(token) {
    // save token to localStorage
    localStorage.setItem('access-token', token);
}

/**
 * Remove token from localStorage
 */
function removeToken() {
    // remove token from localStorage
    localStorage.removeItem('access-token');
}

const validateToken = async (token) => {
    let isTokenExpired = false;
    const interval = setInterval(async() => {
        isTokenExpired = await auth.isTokenExpired(token);

        console.log(isTokenExpired);

        if (isTokenExpired) {
            showLoginPage(); // show login page
            removeToken(); // remove token from localStorage
            clearInterval(interval);
        }
    }, 1000);

}

/**
 * Login user
 * @param {HTMLElement} e 
 */
async function login(e) {
    e.preventDefault();

    // login inputs
    const usernameInput = document.querySelector('#username');
    const passwordInput = document.querySelector('#password');

    const username = usernameInput.value;
    const password = passwordInput.value;

    if (!username || !password) return showErrorMessage('Username or password required');

    try {
        // showMessage('Login Success!');
        // console.log({ user, pass });
        const response = await auth.login({ username, password });

        if (!response.success) {
            return showErrorMessage(response.message);
        }

        // save token
        saveToken(response.token);
        
        showMainPage();

        // validate if token is expired
        validateToken(response.token);
        
        showMessage(response.message);
        usernameInput.value = '';
        passwordInput.value = '';

    } catch (error) {
        console.error(error);
    }
}

const showMainPage = () => {
    // add class hidden to login container
    loginContainer.classList.add('hidden');
    mainContainer.classList.remove('hidden');
}

const showLoginPage = () => {
    // add class hidden to login container
    loginContainer.classList.remove('hidden');
    mainContainer.classList.add('hidden');
}

/**
 * Hanlde registering a new user
 * @param {HTMLElement} e 
 * @returns 
 */
async function registerUser(e) {
    e.preventDefault();

    // register inputs
    const usernameInput = document.querySelector('#rg-username');
    const emailInput = document.querySelector('#rg-email');
    const passwordInput = document.querySelector('#rg-password');

    const username = usernameInput.value;
    const password = passwordInput.value;
    const email = emailInput.value;

    if (!username || !password || !email) return showErrorMessage('Username, password and email required');

    try {
        // send user to backend to handle new user
        const response = await user.register({ username, email, password });

        // if success
        response.success && showMessage('User has been created.');

        usernameInput.value = '';
        passwordInput.value = '';
        emailInput.value = '';
    } catch (error) {
        console.error(error);
    }

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
    console.log('show register');

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

lgForm.addEventListener('submit', async (e) => await login(e) );

addEventListener('DOMContentLoaded', async () => {
    rgForm.classList.add('hidden');

    showLgBtn.addEventListener('click', (e) => showLoginForm());
    showRegBtn.addEventListener('click', (e) => showRegisterForm());
    registerBtn.addEventListener('click', (e) => registerUser(e));

    // check if there's a token
    if (localStorage.getItem('access-token')) {
        const tokenIsExpired = await auth.isTokenExpired(localStorage.getItem('access-token'));

        // if token is expired
        if (tokenIsExpired) {
           showLoginPage();
           return removeToken();
        }


    }
});