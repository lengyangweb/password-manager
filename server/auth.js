const bcryptjs = require('bcryptjs');
const { getUserByUsername } = require('./services/user');
const { generateToken } = require('./utilities/generateToken');

/**
 * Handle login authentication
 * @param {Object} credentials 
 * @returns {Object}
 */
async function login(credentials) {
    
    try {

        // desctructure username and password fields
        const { username, password } = credentials;

        // get user from service
        const users = await getUserByUsername(username);
        
        // if no user
        if (!users || !users.length) {
            return { 
                succes: false, 
                message: `User doesn't exist` 
            }
        }

        // destructure user
        const [user] = users;

        // validate password
        const passMatch = bcryptjs.compareSync(password, user['password']);

        // if password doesn't match
        if (!passMatch) {
            return { 
                success: false, 
                message: 'Invalid username or password' 
            };
        }

        return {
            success: true,
            token: generateToken(user['id'], user['username']),
            message: `Login Successfully!`
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = { login }