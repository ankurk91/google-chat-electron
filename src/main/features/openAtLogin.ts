import AutoLaunch from 'auto-launch';
import {app, BrowserWindow} from 'electron';
import store from '../config';

let autoLaunchInstance: AutoLaunch;

const autoLaunch = (): AutoLaunch => {
  if (autoLaunchInstance) {
    return autoLaunchInstance;
  }

  autoLaunchInstance = new AutoLaunch({
    name: app.getName(),
    isHidden: true
  });

  return autoLaunchInstance;
}

export default (window: BrowserWindow) => {
  if (!app.isPackaged) return;

  autoLaunchInstance = autoLaunch();

  if (!store.get('app.autoLaunchAtLogin')) {
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
