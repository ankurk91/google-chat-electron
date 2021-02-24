import {BrowserWindow} from 'electron';

export default (window: BrowserWindow) => {

  window.on('close', (event) => {
    event.preventDefault();
    if (window.isVisible() && window.isFocused()) {
      window.minimize();
    } else {
      window.hide()
    }
  });
}
