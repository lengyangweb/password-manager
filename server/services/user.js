const bcryptjs = require('bcryptjs');
const { openDB } = require("../dbs/config");
const db = openDB(); // open database

/**
 * Create user table in the database
 */
const createUserTable = () => {
    const sql = `CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY,
        username NOT NULL UNIQUE,
        email NOT NULL UNIQUE,
        password NOT NULL
    )`;
    db.serialize(() => {
        db.prepare(sql).run((err) => {
            if (err) return console.error(err.message);
        });

        // db.close(); // close database;
    });

}

/**
 * 
 * @param {Object} newUser 
 * @returns {Object}
 */
const createUser = (newUser) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO users(username, email, password)
          VALUES(?, ?, ?)
        `;

        // hash the password before save
        const salt = bcryptjs.genSaltSync(10);
        newUser['password'] = bcryptjs.hashSync(newUser['password'], salt);

        db.run(sql, [ newUser['username'], newUser['email'], newUser['password'] ], (err) => {
            if (err) reject(err.message); // throw error
            resolve({ success: true });
        });
    })
}

/**
 * Get all users
 * @returns {Promise[]}
 */
const getUsers = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM users`;
        
        db.all(query, [], (err, users) => {
            if (err) reject(err.message);
            
            resolve(users); // return users
            // db.close(); // close database
        })
    });
}

/**
 * Get a user by username
 * @param {String} username 
 * @returns {Object}
 */
const getUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users WHERE username = ?`;
        db.all(sql, [username], (err, user) => {
            if (err) reject(err);
            resolve(user);
        })
    })
}

const fetchUser = async () => {
    const axios = require('axios').default;

    try {

        // fetch dummies data
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');

        if (response.status === 200) return response.data;

    } catch (error) {
        console.error(`Fetch user fail`, error);
    }
}

module.exports = { 
    createUserTable,
    createUser,
    getUsers,
    getUserByUsername,
    fetchUser
};