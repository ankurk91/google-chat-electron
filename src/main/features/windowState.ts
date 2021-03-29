import {throttle} from 'throttle-debounce';
import {BrowserWindow} from 'electron';
import store from '../config';

export default (window: BrowserWindow) => {

  if (store.has('window.bounds')) {
    window.setBounds(store.get('window.bounds'))
  }

  window.on('ready-to-show', () => {
    if (store.get('window.isMaximized')) {
      window.maximize()
    }
  })

  const saveWindowPosition = () => {
    if (!window.isMaximized()) {
      store.set('window', {
        bounds: window.getBounds(),
        isMaximized: false
      });
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
