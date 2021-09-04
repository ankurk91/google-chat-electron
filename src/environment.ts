import {app} from "electron";
import urls from './urls';

// Note: dont try to load this file in renderer process

export default Object.freeze(Object.assign({
  isDev: !app.isPackaged,
  isSnap: require('electron-is-snap').isSnap,
}, urls));
