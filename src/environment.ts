import {app} from "electron";

export default {
  isTesting: (process.env.NODE_ENV === 'testing') && !app.isPackaged,
  appUrl: 'https://mail.google.com/chat/u/0',
  logoutUrl: 'https://www.google.com/accounts/Logout?continue=https://mail.google.com/chat/u/0'
}
