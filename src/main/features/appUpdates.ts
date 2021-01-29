import {setUpdateNotification, checkForUpdates} from 'electron-update-notifier';
import store from '../config'

let interval: NodeJS.Timeout;

export default function () {
  const isSnap = require('electron-is-snap').isSnap;
  clearInterval(interval);

  if (isSnap) {
    return
  }

  const shouldCheckForUpdates = () => {
    return store.get('app.autoCheckForUpdates');
  }

  setTimeout(() => {
    if (shouldCheckForUpdates()) {
      setUpdateNotification();
    }
  }, 5000)

  interval = setInterval(() => {
    if (shouldCheckForUpdates()) {
      checkForUpdates()
    }
  }, 1000 * 60 * 60 * 24);

  return interval
}
