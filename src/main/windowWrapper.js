const path = require('path');
const {app, BrowserWindow} = require('electron');

module.exports = (url) => {
  const window = new BrowserWindow({
    webPreferences: {
      autoplayPolicy: 'user-gesture-required',
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      preload: path.join(app.getAppPath(), 'src/renderer/index.js'),
    },
    icon: path.join(app.getAppPath(), 'resources/icons/normal/256.png'),
    show: false,
    minHeight: 570,
    minWidth: 400,
    center: true,
    title: app.getName(),
    backgroundColor: '#f8f8f8',
  });

  window.once('ready-to-show', () => {
    window.show();
  });

  window.loadURL(url);

  return window;
};
