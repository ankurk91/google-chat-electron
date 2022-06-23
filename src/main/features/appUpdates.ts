import {setUpdateNotification, checkForUpdates} from 'electron-update-notifier';
import environment from "../../environment";
import store from '../config'

let interval: NodeJS.Timeout;

export default () => {
  clearInterval(interval);

  const shouldCheckForUpdates = () => {
    return store.get('app.autoCheckForUpdates');
  }

  // Runs once at startup
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
}
