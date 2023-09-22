const Toastify = require('toastify-js');
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
});

// handle message request
contextBridge.exposeInMainWorld('Toastify', {
    hello: () => console.log('Hello World!'),
    toast: (options) => Toastify(options).showToast()
});

// handle authentication request
contextBridge.exposeInMainWorld('auth', {
    login: (credentials) => ipcRenderer.invoke('auth:login', credentials),
    isTokenExpired: (token) => ipcRenderer.invoke('auth:validateToken', token),
    logout: () => ipcRenderer.invoke('auth:logout')
});

// handle user request
contextBridge.exposeInMainWorld('user', {
  register: (newUser) => ipcRenderer.invoke('user:register', newUser),
  getUser: () => ipcRenderer.invoke('user:get')
});