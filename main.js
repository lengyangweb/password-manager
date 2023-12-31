const os = require('os');
const path = require('path');
require('dotenv').config();
const colors = require('colors');
const { app, BrowserWindow, ipcMain } = require('electron');
const { login } = require('./server/auth');
const { isTokenExpired } = require('./server/utilities/generateToken');
const { createUserTable, createUser } = require('./server/services/user');
const { fetchUser } = require('./renderer/js/user');

const isDev = process.env.NODE_ENV === 'development'; // if dev
const isMac = process.platform === 'darwin'; // mac 

const createMainWindow = () => {
    let mainWindow = new BrowserWindow({
        title: 'Password Manager',
        width: 600,
        maxWidth: 600,
        minHeight: 400,
        maxHeight: isDev ? 700 : 400,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // open dev tools on dev
    isDev && mainWindow.webContents.openDevTools();

    // load file
    mainWindow.loadFile(path.join(__dirname, '/renderer/index.html'));
}

app.whenReady().then(() => {
    createMainWindow(); // initiate main window

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    });

});

// hook
ipcMain.handle('auth:login', (event, credentials) => login(credentials));
ipcMain.handle('auth:validateToken', (event, token) => isTokenExpired(token));
ipcMain.handle('user:register', (event, newUser) => createUser(newUser));

// test hook
ipcMain.handle('user:get', async (event) => await fetchUser())

// if app is closed
app.on('window-all-closed', () => {
    if (!isMac) app.quit(); // quit app if not mac
});