((window: Window) => {
  const btn: HTMLButtonElement = <HTMLButtonElement>window.document.getElementById('retry-btn')
  const maxAutoAttemptCount = 100;
  let attemptCount = 0
  let interval: NodeJS.Timeout;

  const checkIsOnline = () => {
    if (attemptCount > maxAutoAttemptCount) {
      clearInterval(interval);
    }

    btn.disabled = true;
    btn.innerText = 'Checking...';

    // This script does not have access to Electron APIs (IPC)
    // So lets notify the preload script via an global event
    window.dispatchEvent(new Event('app:checkIfOnline'));
    attemptCount++
  }

  btn.addEventListener('click', checkIsOnline);
  interval = setInterval(checkIsOnline, 1000 * 60)
})(window)

