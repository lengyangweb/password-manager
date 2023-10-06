const bcryptjs = require('bcryptjs');
const { PrismaClient, Prisma } = require('@prisma/client');
const { generateToken } = require('../utilities/generateToken');

/**
 * 
 * @param {Object} newUser 
 * @returns {Object}
 */
const createUser = (newUser) => {
    return new Promise(async(resolve, reject) => {
        const prisma = new PrismaClient();
        // hash password
        const passHash = bcryptjs.hashSync(newUser.password, 10);
        newUser.password = passHash;

        try {
            const result = await prisma.user.create({
                data: newUser
            });
            // if user isn't created
            if (!result) {
                resolve({
                    success: false,
                    message: 'Unable to create user'
                });
            }
            // return new user info
            resolve(result);
        } catch (error) {
            console.error(`Error creating new user`, error);
            await prisma.$disconnect();
            reject(error);
        }
    })
}

/**
 * Get all users
 * @returns {Promise[]}
 */
const getUsers = () => {
    return new Promise((resolve, reject) => {
        try {
            
        } catch (error) {
            console.error(`Error fetching users`, )
        }
    });
}

/**
 * Get a user by username
 * @param {String} username 
 * @returns {Object}
 */
const getUserByUsername = (username) => {
    return new Promise(async(resolve, reject) => {
        const prisma = new PrismaClient();
        try {
            // query user
            const user = await prisma.user.findFirst({
                where: { username: username }
            });
            resolve({ ...user });
        } catch (error) {
            console.error(`Error fetching username`, error);
            await prisma.$disconnect();
            reject(error);
        } 
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
    createUser,
    getUsers,
    getUserByUsername,
    fetchUser
};