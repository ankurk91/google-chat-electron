import {app} from "electron";

export default Object.freeze({
  isTesting: (process.env.NODE_ENV === 'testing') && !app.isPackaged,
  isDev: !app.isPackaged,
  isSnap: require('electron-is-snap').isSnap,
  appUrl: 'https://mail.google.com/chat/u/0',
  logoutUrl: 'https://www.google.com/accounts/Logout?continue=https://mail.google.com/chat/u/0'
})
