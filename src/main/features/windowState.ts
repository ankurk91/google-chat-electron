import electronStore from 'electron-store';
import {throttle} from 'throttle-debounce';
import {BrowserWindow, Rectangle} from 'electron';

let store: electronStore;

export default function (window: BrowserWindow) {
  store = new electronStore();

  if (store.has('window.bounds')) {
    window.setBounds(<Rectangle>store.get('window.bounds'))
  }

  window.on('ready-to-show', () => {
    if (store.get('window.isMaximized', false)) {
      window.maximize()
    }
  })

  const saveWindowPosition = () => {
    if (!window.isMaximized()) {
      store.set('window.bounds', window.getBounds())
    }
  }

  window.on('close', saveWindowPosition);
  window.on('resize', throttle(500, saveWindowPosition));
  window.on('move', throttle(500, saveWindowPosition));

  window.on('maximize', () => {
    store.set('window.isMaximized', true);
  });

  window.on('unmaximize', () => {
    store.set('window.isMaximized', false);
  });
}
