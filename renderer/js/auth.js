// imports
import { showMainPage } from "./display.js";
import { saveToken, validateToken } from "./token.js";
import { showMessage, showErrorMessage } from "./message.js";

/**
 * Login user
 * @param {HTMLElement} e 
 */
async function login(e) {
    e.preventDefault(); 

    // get login inputs
    const usernameInput = document.querySelector('#username');
    const passwordInput = document.querySelector('#password');

    const username = usernameInput.value; // set username value
    const password = passwordInput.value; // set password value

    // if username or password value is not provide
    if (!username || !password) return showErrorMessage('Username or password required');

    try {

        // send login request to backend
        const response = await auth.login({ username, password });

        // if login fail
        if (!response.success) return showErrorMessage(response.message);

        // save token
        saveToken(response.token);
        
        // show main page
        showMainPage();

        // validate if token is expired
        validateToken(response.token);
        
        // show success message
        showMessage(response.message);

        // reset form vlue
        usernameInput.value = '';
        passwordInput.value = '';

    } catch (error) {
        console.error(error);
    }
}

export { login };