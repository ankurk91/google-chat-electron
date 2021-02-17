import path from 'path';
import {app} from 'electron';

declare var process: {
  env: {
    SNAP_USER_COMMON: string
  }
}

export default () => {
  const isSnap = require('electron-is-snap').isSnap;

  if (isSnap) {
    app.setPath(
      'userData',
      path.join(process.env.SNAP_USER_COMMON, '.config', app.getName()));

    app.setAppLogsPath();
  }

}
