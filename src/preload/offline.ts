import {ipcRenderer} from 'electron';

window.addEventListener('gchat:checkIfOnline', () => {
  ipcRenderer.send('checkIfOnline')
});

ipcRenderer.on('onlineStatus', (event, online: boolean) => {
  if (online) {
    window.location.replace('https://chat.google.com')
  } else {
    window.location.reload();
  }
});
