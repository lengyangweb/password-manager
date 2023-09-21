const jwt = require('jsonwebtoken');

/**
 * Generate JWT token
 * @param {Number} id 
 * @param {String} username 
 * @returns {String}
 */
const generateToken = (id, username) => {
    return jwt.sign(
        { id, username },
        process.env.JWT_SECRET,
        {
            expiresIn: '1m'
        }
    );
}

const isTokenExpired = (token) => {
 const now = new Date();

 // decode token
 const decode = jwt.decode(token);

 // get milliseconds of current time
 const currentTime = now.getTime();

 // check is currentTime is less then token time
 return currentTime > decode.exp;
}

module.exports = {
    generateToken,
    isTokenExpired
}