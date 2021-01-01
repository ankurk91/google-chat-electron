import {setUpdateNotification, checkForUpdates} from 'electron-update-notifier';
import store from '../config'

let interval: NodeJS.Timeout;

export default function () {
  clearInterval(interval);

  const shouldCheckForUpdates = () => {
    return store.get('app.autoCheckForUpdates', true);
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
