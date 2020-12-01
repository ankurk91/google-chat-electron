'use strict';

const path = require('path');
const electron = require('electron');
const app = electron.app;

const TrayIcon = require('./features/trayIcon.js');
const WindowState = require('./features/windowState.js');
const ExternalLinks = require('./features/externalLinks.js');
const BadgeIcons = require('./features/badgeIcon.js');

// Garbage collection hack
let trayIcon = null;
let window;

module.exports = (url) => {
  window = new electron.BrowserWindow({
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      spellcheck: true,
      preload: path.join(app.getAppPath(), 'src/js/renderer.js'),
    },
    icon: path.join(app.getAppPath(), 'resources/icons/normal/256.png'),
    show: false
  });

  window.once('ready-to-show', () => {
    window.show();
  });

  window.loadURL(url);

  WindowState(window);
  trayIcon = TrayIcon(app, window);
  BadgeIcons(app, window, trayIcon);

  ExternalLinks(window);
  return window;
};
