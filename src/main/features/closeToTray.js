const {app} = require('electron');

module.exports = (window) => {

  window.on('close', (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      if (window.isVisible() && window.isFocused()) {
        window.minimize();
      } else {
        window.hide()
      }
    }
  });
}
