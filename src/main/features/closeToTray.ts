import {BrowserWindow} from 'electron';
import {isTesting} from "../../isTesting";

export default (window: BrowserWindow) => {

  // Let spectron to stop the app during testing
  if (isTesting) {
    return;
  }

  window.on('close', (event) => {
    event.preventDefault();
    if (window.isVisible() && window.isFocused()) {
      window.minimize();
    } else {
      window.hide()
    }
  });
}
