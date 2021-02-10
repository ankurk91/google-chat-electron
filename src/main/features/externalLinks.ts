import {BrowserWindow, dialog, shell} from 'electron';
import log from "electron-log";

let guardAgainstExternalLinks: Boolean = true;
const RE_GUARD_IN_MINUTES: number = 5;
let interval: NodeJS.Timeout;

export default function (window: BrowserWindow) {
  const handleRedirect = (event: Event, url: string) => {
    if (url === 'about:blank') {
      event.preventDefault();
      return false;
    }

    if (!guardAgainstExternalLinks) {
      return true;
    }

    const whiteListDomains = [
      extractHostname(window.webContents.getURL()),
      'accounts.google.com',
      'accounts.youtube.com',
      'chat.google.com'
    ];

    if (!whiteListDomains.includes(extractHostname(url))) {
      setImmediate(() => {
        shell.openExternal(url);
      })
      event.preventDefault();
    }
  };

  window.webContents.on('will-navigate', handleRedirect);
  window.webContents.on('new-window', handleRedirect);
}

function extractHostname(url: string) {
  return (new URL(url)).hostname;
}

const toggleExternalLinksGuard = (window: BrowserWindow) => {
  const actionLabel = guardAgainstExternalLinks ? 'Disable' : 'Enable';

  dialog.showMessageBox(window, {
    type: 'warning',
    title: 'Confirm',
    message: 'Facing issues during authentication?',
    detail: `You can disable the external links security feature temporarily.\nDont forget to enable it back.\nIf you don't, we will enabled it automatically in ${RE_GUARD_IN_MINUTES} minutes.`,
    buttons: [`${actionLabel} Guard`, 'Close'],
    cancelId: 1,
    defaultId: 1,
  })
    .then(({response}) => {
      if (response === 0) {
        guardAgainstExternalLinks = !guardAgainstExternalLinks;

        stopReGuardTimer();

        if (!guardAgainstExternalLinks) {
          startReGuardTimer()
        }

        logGuardStatus();
      }
    })
}

const logGuardStatus = () => {
  log.debug(`External links guard is set to: ${guardAgainstExternalLinks}`)
}

const stopReGuardTimer = () => {
  clearInterval(interval);
}

const startReGuardTimer = () => {
  interval = setInterval(() => {
    guardAgainstExternalLinks = true;
    logGuardStatus();
  }, 1000 * 60 * RE_GUARD_IN_MINUTES)
}

export {toggleExternalLinksGuard}
