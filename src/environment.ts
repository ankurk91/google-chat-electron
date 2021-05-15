import {app} from "electron";
import urls from './urls';

// Note: dont try to load this file in renderer process

export default Object.freeze(Object.assign({
  isTesting: (process.env.NODE_ENV === 'testing') && !app.isPackaged,
  isDev: !app.isPackaged,
  isSnap: require('electron-is-snap').isSnap,
  darkReaderExtensionReference: 'eimadpbcbfnmbkopoojfekhnkhdbieeh'
}, urls));
