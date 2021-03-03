import {createApp} from './create-app';
import {expect} from 'chai';
import {BrowserWindow} from 'electron';
import {Application} from "spectron";

let app: Application;

describe('Electron app', () => {

  before(() => {
    app = createApp();
    return app.start()
  })

  after(() => {
    if (app && app.isRunning()) {
      return app.stop();
    }
  })

  it('is loaded with default settings', async () => {
    expect(app.isRunning()).to.be.true

    const count = await app.client.getWindowCount();
    expect(count).to.be.equals(1);

    const win = <BrowserWindow>app.browserWindow;
    const isMenuVisible = await win.isMenuBarVisible();
    expect(isMenuVisible).to.be.true;

    const isVisible = await win.isVisible();
    expect(isVisible).to.be.true;

    const {width, height} = await win.getBounds();
    expect(width).to.be.greaterThan(0)
    expect(height).to.be.greaterThan(0)

    const title = await win.getTitle();
    expect(title).to.contain('Google');
  });

});
