const bcryptjs = require('bcryptjs');
const { getUserByUsername } = require('./services/user');
const { generateToken } = require('./utilities/generateToken');

async function login(credentials) {
    
    try {
        const { username, password } = credentials;

        const user = await getUserByUsername(username);
        
        // if no user
        if (!user) {
            return { 
                succes: false, 
                message: `User doesn't exist` 
            }
        }

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

module.exports = {
    login
}