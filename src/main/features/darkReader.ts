import {BrowserWindow} from 'electron';
import store from '../config';

export default function (window: BrowserWindow) {
  window.webContents.on('dom-ready', () => {
    window.webContents.send('darkReader', store.get('app.darkReader'))
  });
}
