// https://github.com/jiahaog/nativefier/blob/cf11a71a7c6efd366266fcf39ac6fc49783dd8c7/app/src/preload.ts#L23
((window: Window) => {
  const clickCallback = () => {
    window.dispatchEvent(new Event('gchat:notificationClicked'));
  }

  // @ts-ignore
  const OriginalNotify = window.Notification;

  const newNotify = (title: string, opt: any) => {
    const instance: Notification = new OriginalNotify(title, opt);
    instance.addEventListener('click', clickCallback);
    return instance;
  };

  newNotify.requestPermission = OriginalNotify.requestPermission.bind(OriginalNotify);

  Object.defineProperty(newNotify, 'permission', {
    get: () => OriginalNotify.permission,
  });

  // @ts-ignore
  window.Notification = newNotify;
})(window);
