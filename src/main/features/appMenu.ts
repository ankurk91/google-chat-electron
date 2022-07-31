import {Menu, app, shell, clipboard, BrowserWindow, dialog} from 'electron';
import {checkForUpdates} from 'electron-update-notifier';
import path from 'path';
import {openNewGitHubIssue, debugInfo} from 'electron-util';
import log from 'electron-log';
import {autoLaunch} from './openAtLogin';
import aboutPanel from './aboutPanel';
import store from './../config';
import {toggleExternalLinksGuard} from "./externalLinks";
import environment from "../../environment";

export default (window: BrowserWindow) => {
  const pkg = require(path.join(app.getAppPath(), 'package.json'));

  const relaunchApp = () => {
    app.relaunch({
      // auto-launch adds the --hidden flag to the command during OS start
      // This will launch the app without hidden flag
      args: process.argv.filter(flag => flag !== '--hidden')
    });
    app.exit();
  }

  const resetAppAndRestart = async () => {
    log.log('clearing app data');
    store.clear();
    const {session} = window.webContents;
    await session.clearStorageData();
    await session.clearCache();
    log.log('cleared app data');
    relaunchApp();
  }

  const menuItems = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'Close To Tray',
          accelerator: 'CommandOrControl+W',
          click: () => {
            window.hide()
          }
        },
        {
          label: 'Relaunch',
          click: relaunchApp
        },
        {
          role: 'minimize'
        },
        {
          label: 'Sign Out',
          click: () => {
            window.loadURL(environment.logoutUrl)
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'CommandOrControl+Q',
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
          label: 'Search',
          accelerator: 'CommandOrControl+F',
          click: () => {
            window.webContents.send('searchShortcut');
          }
        },
        {
          label: 'Copy Current URL',
          click: () => {
            clipboard.writeText(window.webContents.getURL())
          }
        },
        {
          role: 'toggleDevTools',
          visible: environment.isDev
        },
        {
          type: 'separator'
        },
        {
          role: 'togglefullscreen'
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
      label: 'History',
      submenu: [
        {
          label: 'Back',
          accelerator: 'Alt+Left',
          click: () => {
            window.webContents.goBack()
          }
        },
        {
          label: 'Forward',
          accelerator: 'Alt+Right',
          click: () => {
            window.webContents.goForward()
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Navigate to Home',
          accelerator: 'Alt+Home',
          click: () => {
            window.loadURL(environment.appUrl)
          }
        }
      ]
    },
    {
      label: 'Preferences',
      submenu: [
        {
          label: 'Auto check for Updates',
          type: 'checkbox',
          enabled: true,
          checked: store.get('app.autoCheckForUpdates'),
          click: (menuItem) => {
            store.set('app.autoCheckForUpdates', menuItem.checked)
          }
        },
        {
          label: 'Auto Launch at Login',
          type: 'checkbox',
          checked: store.get('app.autoLaunchAtLogin'),
          click: async (menuItem) => {

            if (menuItem.checked) {
              await autoLaunch().enable()
            } else {
              await autoLaunch().disable()
            }

            store.set('app.autoLaunchAtLogin', menuItem.checked)
          }
        },
        {
          label: 'Start Hidden',
          type: 'checkbox',
          checked: store.get('app.startHidden'),
          click: async (menuItem) => {
            store.set('app.startHidden', menuItem.checked)
          }
        },
        {
          label: 'Hide Menu Bar',
          type: 'checkbox',
          enabled: process.platform !== 'darwin',
          checked: store.get('app.hideMenuBar'),
          click: async (menuItem) => {
            window.setMenuBarVisibility(!menuItem.checked)
            window.setAutoHideMenuBar(menuItem.checked)
            store.set('app.hideMenuBar', menuItem.checked)
          }
        },
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Say Thanks to Developer',
          click: () => {
            setImmediate(() => {
              shell.openExternal(pkg.homepage)
            })
          }
        },
        {
          label: 'Check For Updates',
          enabled: true,
          click: () => {
            checkForUpdates({
              silent: false,
            });
          }
        },
        {
          label: 'Troubleshooting',
          submenu: [
            {
              label: 'Report issue...',
              click: () => {
                openNewGitHubIssue({
                  repoUrl: pkg.repository,
                  body: `### Platform\n\n${debugInfo()}`
                });
              }
            },
            {
              label: 'Toggle External Links Guard',
              click: () => {
                toggleExternalLinksGuard(window);
              }
            },
            {
              label: 'Demo Badge Count',
              click: () => {
                app.setBadgeCount(Math.floor(Math.random() * 99))
              }
            },
            {
              type: 'separator'
            },
            {
              label: 'Show Logs in File Manager',
              click: () => {
                if (process.platform === 'darwin') {
                  shell.showItemInFolder(app.getPath('logs'))
                } else {
                  shell.showItemInFolder(path.join(app.getPath('userData'), 'logs'))
                }
              }
            },
            {
              label: 'Reset and Relaunch App',
              click: () => {
                dialog.showMessageBox(window, {
                  type: 'warning',
                  title: 'Confirm',
                  message: 'Reset app data?',
                  detail: `You will be logged out from application.\nAll settings will reset to default.\nPress 'Yes' to proceed.`,
                  buttons: ['Yes', 'No'],
                  cancelId: 1,
                  defaultId: 1,
                })
                  .then(({response}) => {
                    if (response === 0) {
                      resetAppAndRestart()
                    }
                  })
              }
            },
          ]
        },
        {
          label: 'About',
          click: () => {
            aboutPanel(window)
          }
        },
        {
          type: 'separator'
        },
        {
          label: `Version ${app.getVersion()}${ environment.isDev ? '-(dev)' : ''}`,
          enabled: false
        },
      ]
    }
  ]);

  Menu.setApplicationMenu(menuItems)
}
