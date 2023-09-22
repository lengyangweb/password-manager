// imports
import { login } from './auth.js';
import { registerUser } from './user.js';
import { removeToken } from './token.js';
import { showLoginPage, showLoginForm, showRegisterForm } from './display.js';

// variables
const lgForm = document.querySelector('#login-form');
const rgForm = document.querySelector('#register-form');
const showLgBtn = document.querySelector('#show-login');
const registerBtn = document.querySelector('#registerBtn');
const showRegBtn = document.querySelector('#show-register');

// add event listener for login submition
lgForm.addEventListener('submit', async (e) => await login(e) );

// add event listener for content loaded
addEventListener('DOMContentLoaded', async () => {
    rgForm.classList.add('hidden');

    // add event listners for buttons
    showLgBtn.addEventListener('click', (e) => showLoginForm());
    showRegBtn.addEventListener('click', (e) => showRegisterForm());
    registerBtn.addEventListener('click', (e) => registerUser(e));

    // check if there's a token
    if (localStorage.getItem('access-token')) {

        // send request to back to see token expired, might want to recheck?
        const tokenIsExpired = await auth.isTokenExpired(localStorage.getItem('access-token'));

        // if token is expired
        if (tokenIsExpired) {
           showLoginPage(); // show main page
           return removeToken(); // remove token
        }


    }
});
