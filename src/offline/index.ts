((window: Window) => {
  const btn: HTMLButtonElement = <HTMLButtonElement>window.document.getElementById('retry-btn')

  const checkIsOnline = () => {
    btn.disabled = true;
    btn.innerText = 'Checking...';

    window.dispatchEvent(new Event('gchat:checkIfOnline'));
  }

  btn.addEventListener('click', checkIsOnline);
  setInterval(checkIsOnline, 1000 * 60)
})(window)

