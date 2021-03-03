import path from 'path';
import {Application} from 'spectron';

export const createApp = (): Application => {
  const appPath = path.resolve(__dirname, '..');
  const electronPath = path.resolve(__dirname, '../node_modules/.bin/electron');

  return new Application({
    path: electronPath,
    args: [appPath],
    env: {
      ELECTRON_ENABLE_LOGGING: true,
      ELECTRON_ENABLE_STACK_DUMPING: true,
      NODE_ENV: 'testing'
    },
  });
}
