((document: Document) => {
  const btn: HTMLButtonElement = <HTMLButtonElement>document.getElementById('retry-btn')

  const checkIsOnline = () => {
    btn.disabled = true;
    btn.innerText = 'Checking...';

    window.dispatchEvent(new Event('checkIfOnline'));
  }

  btn.addEventListener('click', checkIsOnline);
  setInterval(checkIsOnline, 1000 * 60)
})(document)

