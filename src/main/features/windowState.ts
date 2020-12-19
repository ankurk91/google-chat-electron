import electronStore from 'electron-store';
import throttle from 'lodash/throttle';
import {BrowserWindow, Rectangle} from "electron";

let store: electronStore;

export default function (window: BrowserWindow) {
  store = new electronStore();

  if (store.has('window.bounds')) {
    window.setBounds(<Rectangle>store.get('window.bounds'))
  }

  if (store.get('window.isMaximised', false)) {
    window.maximize()
  }

  const saveWindowPosition = () => {
    store.set('window', {
      bounds: window.getBounds(),
      isMaximized: window.isMaximized()
    })
  }

  window.on('close', saveWindowPosition);
  window.on('resize', throttle(saveWindowPosition, 500));
  window.on('move', throttle(saveWindowPosition, 500));

  window.on('maximize', () => {
    store.set('window.isMaximized', true);
  });

  window.on('unmaximize', () => {
    store.set('window.isMaximized', false);
  });
}
