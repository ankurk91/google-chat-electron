import {ipcRenderer} from 'electron';
import environment from "../environment";

// Listen to global event from offline.html
window.addEventListener('app:checkIfOnline', () => {
  ipcRenderer.send('checkIfOnline')
});

// Listen to event from main process
ipcRenderer.on('onlineStatus', (event, online: boolean) => {
  if (online) {
    window.location.replace(environment.appUrl)
  } else {
    window.location.reload();
  }
});
