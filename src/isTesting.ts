import {app} from "electron";

export const isTesting: boolean = (process.env.NODE_ENV === 'testing') && !app.isPackaged;
