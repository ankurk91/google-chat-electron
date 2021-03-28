import {app} from "electron";

export default {
  isTesting: (process.env.NODE_ENV === 'testing') && !app.isPackaged,
  appUrl: 'https://chat.google.com/',
  logoutUrl: 'https://www.google.com/accounts/Logout?continue=https://chat.google.com/'
}
