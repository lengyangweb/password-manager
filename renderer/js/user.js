// imports
import { showMessage, showErrorMessage } from "./message.js";

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

export { registerUser };