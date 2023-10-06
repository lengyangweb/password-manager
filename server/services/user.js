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

const getUsers = () => {
    return new Promise((resolve, reject) => {
        try {
            
        } catch (error) {
            console.error(`Error fetching users`, )
        }
    });
}

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

module.exports = { 
    createUser,
    getUsers,
    getUserByUsername
};