import AutoLaunch from 'auto-launch';
import {app, BrowserWindow} from 'electron';
import electronStore from 'electron-store';

let autoLaunchInstance: AutoLaunch;

const autoLaunch = () => {
  if (autoLaunchInstance) {
    return autoLaunchInstance;
  }

  autoLaunchInstance = new AutoLaunch({
    name: app.getName(),
    isHidden: true
  });

  return autoLaunchInstance;
}

export default function (window: BrowserWindow) {
  if (!app.isPackaged) return;

  const store = new electronStore();
  autoLaunchInstance = autoLaunch();

  if (!store.get('app.autoCheckForUpdates', true)) {
    autoLaunchInstance.disable();
    return
  }

  if (app.commandLine.hasSwitch('hidden')) {
    window.hide();
  }

  autoLaunchInstance.isEnabled()
    .then((isEnabled) => {
      if (!isEnabled) {
        autoLaunchInstance.enable();
      }
    });
}

export {autoLaunch};
