import {BrowserWindow, app} from 'electron';
import {is} from "electron-util";

let willQuit = false;

export default (window: BrowserWindow) => {

  // Allow Mac users to exit from app via Dock context menu "Quit" item
  app.on('before-quit', () => {
    willQuit = true
  })

  window.on('close', (event) => {
    if (!willQuit) {
      event.preventDefault();

      if (is.macos) {
        app.hide();
      } else {
        window.hide();
      }
    }
  })
}
