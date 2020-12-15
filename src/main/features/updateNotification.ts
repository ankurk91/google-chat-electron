import {setUpdateNotification, checkForUpdates} from 'electron-update-notifier';
import electronStore from 'electron-store';

let interval: NodeJS.Timeout;
let store: electronStore;

export default function () {
  clearInterval(interval);
  store = new electronStore();

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
  }, 1000 * 60 * 60 * 24 * 7);

  return interval
}
