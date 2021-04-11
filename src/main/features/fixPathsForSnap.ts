import path from 'path';
import {app} from 'electron';
import environment from "../../environment";

declare var process: {
  env: {
    SNAP_USER_COMMON: string
  }
}

// https://github.com/electron/electron/issues/23854
export default () => {

  if (environment.isSnap) {
    app.setPath(
      'userData',
      path.join(process.env.SNAP_USER_COMMON, '.config', app.getName()));

    app.setAppLogsPath();
  }

}
