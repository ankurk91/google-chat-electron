const AutoLaunch = require('auto-launch');
const {app} = require('electron');
const electronStore = require('electron-store');
let autoLaunchInstance = null;

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

module.exports = (window) => {
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

module.exports.autoLaunch = autoLaunch
