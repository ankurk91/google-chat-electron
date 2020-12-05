const AutoLaunch = require('auto-launch');
const {app} = require('electron');

module.exports = (window) => {
  if (!app.isPackaged) return;

  let autoLaunch = new AutoLaunch({
    name: app.getName(),
    isHidden: true
  });

  if (app.commandLine.hasSwitch('hidden')) {
    window.hide();
  }

  autoLaunch.isEnabled()
    .then((isEnabled) => {
      if (!isEnabled) {
        autoLaunch.enable();
      }
    })
    .catch((error) => {
      console.error(error)
    });
}
