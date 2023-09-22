// imports
import { showLoginPage } from "./display.js";

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

/**
 * Validate if users' token is expired
 * @param {String} token 
 */
const validateToken = async (token) => {
    let isTokenExpired = false; // defined token expiration

    // set interval to track user token expiration every second
    const interval = setInterval(async() => {
        // send request to backend to check if token expired
        isTokenExpired = await auth.isTokenExpired(token);

        if (isTokenExpired) {
            showLoginPage(); // show login page
            removeToken(); // remove token from localStorage
            clearInterval(interval); // clear interval
        }
    }, 1000);

}

export {
    saveToken,
    removeToken,
    validateToken
}