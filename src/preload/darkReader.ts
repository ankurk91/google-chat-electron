import {
  enable as enableDarkMode,
  disable as disableDarkMode,
  setFetchMethod
} from 'darkreader';
import {ipcRenderer} from 'electron';

// Fix CORS issue
setFetchMethod(window.fetch)

ipcRenderer.on('darkReader', (event, enable: boolean) => {
  if (enable) {
    enableDarkMode({
      mode: 1,
      contrast: 90
    });
  } else {
    disableDarkMode();
  }
});

