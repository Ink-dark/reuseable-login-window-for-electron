const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createLoginWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 500,
    resizable: false,
    frame: false,
    transparent: true,
    backgroundColor: '#00000000', // 完全透明背景
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      // 启用ES模块
      webSecurity: true,
      allowRunningInsecureContent: false
    }
  });

  // 加载新的登录页面
  win.loadFile('login-new.html');
  return win;
}

app.whenReady().then(() => {
  const loginWindow = createLoginWindow();
  
  // 监听关闭窗口事件
  ipcMain.on('window-close', () => {
    app.quit(); // 直接退出应用更可靠
  });
  
  // 监听最小化窗口事件
  ipcMain.on('window-minimize', () => {
    loginWindow.minimize();
  });
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createLoginWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
