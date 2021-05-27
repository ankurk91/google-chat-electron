import {BrowserWindow} from 'electron';
import {ElectronChromeExtensions} from 'electron-chrome-extensions';
import installExtension from 'electron-devtools-installer';
import environment from "../../environment";
import store from '../config'
import log from 'electron-log';

export default (browserWindow: BrowserWindow) => {

  if (!store.get('app.darkReader')) {
    return;
  }

  const extensions = new ElectronChromeExtensions();
  extensions.addTab(browserWindow.webContents, browserWindow);

  installExtension(environment.darkReaderExtensionReference, {
    loadExtensionOptions: {
      allowFileAccess: true
    }
  })
    .then((name) => log.debug(`Extension loaded:  ${name}`))
    .catch((error) => log.error('Error loading extension: ', error));
}
