((window: Window) => {
  const btn = window.document.getElementById('retry-btn') as HTMLButtonElement
  const MAX_AUTO_ATTEMPT_COUNT = 100;
  let attemptCount = 0
  let interval: NodeJS.Timeout;

  const checkIsOnline = () => {
    if (attemptCount > MAX_AUTO_ATTEMPT_COUNT) {
      clearInterval(interval);
    }

    btn.disabled = true;
    btn.innerText = 'Checking...';

    // This script does not have access to Electron APIs (IPC)
    // So let's notify the preload script via a global event
    window.dispatchEvent(new Event('app:checkIfOnline'));
    attemptCount++
  }

  btn.addEventListener('click', checkIsOnline);
  interval = setInterval(checkIsOnline, 1000 * 60)
})(window)

