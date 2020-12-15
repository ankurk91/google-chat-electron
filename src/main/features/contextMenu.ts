import contextMenu from 'electron-context-menu';

export default function () {
  return contextMenu({
    showSaveImage: true,
    showCopyImageAddress: true,
  });
}
