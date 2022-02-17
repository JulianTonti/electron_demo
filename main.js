const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
//process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // WARNING: make sure you are familiar with security best practise
    // see: https://www.electronjs.org/docs/latest/tutorial/security
    webPreferences : {
      enableRemoteModule: true,
      preload: path.join(app.getAppPath(), 'src/app.js')
    }
  });
  mainWindow.loadFile(path.join(app.getAppPath(), 'src/app.html'));
  //mainWindow.webContents.openDevTools();
};
app.on('ready', () => {
  ipcMain.handle('dialog', (event, method, params) => dialog[method](params));
  createWindow();
});
app.on('activate', () => BrowserWindow.getAllWindows().length === 0 ? createWindow() : 0);
//app.on('window-all-closed', () => process.platform !== 'darwin' ? app.quit() : 0);


