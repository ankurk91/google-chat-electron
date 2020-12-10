const {Menu, app, shell, clipboard} = require('electron');
const {checkForUpdates} = require('electron-update-notifier');
const path = require('path');
const electronStore = require('electron-store');
const {autoLaunch} = require('./openAtLogin.js');
let store = null;

module.exports = (window) => {
  const pkg = require(path.join(app.getAppPath(), 'package.json'));
  store = new electronStore();

  const menuItems = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'Close To Tray',
          click: () => {
            window.hide()
          }
        },
        {
          label: 'Relaunch',
          click: () => {
            app.relaunch();
            app.exit();
          }
        },
        {
          label: 'Sign Out',
          click: () => {
            window.loadURL('https://www.google.com/accounts/Logout?continue=https://chat.google.com/')
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Ctrl+Q',
          click: () => {
            app.exit();
          }
        }
      ]
    },
    {
      role: 'editMenu'
    },
    {
      label: 'View',
      submenu: [
        {
          role: 'reload'
        },
        {
          role: 'forceReload'
        },
        {
          label: 'Copy Current URL',
          click: () => {
            clipboard.writeText(window.webContents.getURL())
          }
        },
        {
          role: 'toggleDevTools',
          visible: !app.isPackaged || app.commandLine.hasSwitch('debug')
        },
        {
          type: 'separator'
        },
        {
          role: 'resetZoom'
        },
        {
          role: 'zoomIn'
        },
        {
          role: 'zoomOut'
        },
      ]
    },
    {
      label: 'Preferences',
      submenu: [
        {
          label: 'Auto check for Updates',
          type: 'checkbox',
          checked: store.get('app.autoCheckForUpdates', true),
          click: (menuItem) => {
            store.set('app.autoCheckForUpdates', menuItem.checked)
          }
        },
        {
          label: 'Auto launch at Login',
          type: 'checkbox',
          checked: store.get('app.autoLaunchAtLogin', true),
          click: async (menuItem) => {

            if (menuItem.checked) {
              await autoLaunch().enable()
            } else {
              await autoLaunch().disable()
            }

            store.set('app.autoLaunchAtLogin', menuItem.checked)
          }
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Visit Website',
          click: () => {
            setImmediate(() => {
              shell.openExternal(pkg.homepage)
            })
          }
        },
        {
          label: 'Check For Updates',
          click: () => {
            checkForUpdates({
              silent: false
            });
          }
        },
        {
          type: 'separator'
        },
        {
          label: `Version ${app.getVersion()}`,
          enabled: false
        },
      ]
    }
  ]);

  Menu.setApplicationMenu(menuItems)
}
