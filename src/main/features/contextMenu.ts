import contextMenu from 'electron-context-menu';

export default () => {
  return contextMenu({
    showSaveImage: true,
    showCopyImageAddress: true,
  });
}
