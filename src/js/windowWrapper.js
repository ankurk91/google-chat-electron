'use strict';

const path = require('path');
const electron = require('electron');
const app = electron.app;

module.exports = (url) => {
  const window = new electron.BrowserWindow({
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      spellcheck: true,
      preload: path.join(app.getAppPath(), 'src/js/renderer.js'),
    },
    icon: path.join(app.getAppPath(), 'resources/icons/normal/256.png'),
    show: false,
    minHeight: 570,
    minWidth: 400,
    center: true,
    title: app.getName(),
    backgroundColor: '#ffffff',
  });

  window.once('ready-to-show', () => {
    window.show();
  });

  window.loadURL(url);

  return window;
};
