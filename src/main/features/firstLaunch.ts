import util from 'electron-util';
import log from "electron-log";

export default function () {
  if (util.isFirstAppLaunch()) {
    log.debug("First launch")
  }
}
