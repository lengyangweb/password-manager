const { contextBridge, ipcRenderer } = require('electron');
const Toastify = require('toastify-js');
const jwt = require('jsonwebtoken');

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
});

contextBridge.exposeInMainWorld('Toastify', {
    hello: () => console.log('Hello World!'),
    toast: (options) => Toastify(options).showToast()
});

contextBridge.exposeInMainWorld('auth', {
    login: (credentials) => ipcRenderer.invoke('auth:login', credentials),
    isTokenExpired: (token) => ipcRenderer.invoke('auth:validateToken', token),
    logout: () => ipcRenderer.invoke('auth:logout')
});

contextBridge.exposeInMainWorld('user', {
  register: (newUser) => ipcRenderer.invoke('user:register', newUser)
});