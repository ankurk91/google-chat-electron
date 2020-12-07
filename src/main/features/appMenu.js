const {Menu, app, shell} = require('electron');
const {checkForUpdates} = require('electron-update-notifier');
const path = require('path');

module.exports = (window) => {
  const pkg = require(path.join(app.getAppPath(), 'package.json'));

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
            app.isQuiting = true
            app.quit();
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
            checkForUpdates();
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
