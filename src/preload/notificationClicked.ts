import {ipcRenderer} from 'electron';

window.addEventListener('gchat:notificationClicked', () => {
  ipcRenderer.send('gchat:notificationClicked')
});
