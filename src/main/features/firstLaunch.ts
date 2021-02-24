import util from 'electron-util';
import log from "electron-log";

export default () => {
  if (util.isFirstAppLaunch()) {
    log.debug("First launch")
  }
}
