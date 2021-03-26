// https://github.com/jiahaog/nativefier/blob/cf11a71a7c6efd366266fcf39ac6fc49783dd8c7/app/src/preload.ts#L23
import {ipcRenderer} from 'electron';

// This feature requires contextIsolation to be disabled

const clickCallback = () => {
  ipcRenderer.send('notificationClicked')
}

const NativeNotification = window.Notification;

// Note: this must be the good old ES5 function,
// Dont convert this into an ES6 arrow function
const newNotify = function (title: string, options?: NotificationOptions) {
  const instance: Notification = new NativeNotification(title, options);
  instance.addEventListener('click', clickCallback);
  return instance;
}

newNotify.requestPermission = NativeNotification.requestPermission.bind(NativeNotification);

Object.defineProperty(newNotify, 'permission', {
  get: () => NativeNotification.permission,
});

window.Notification = newNotify as any;


