const { contextBridge, ipcRenderer } = require('electron');

/**
 * 将Electron API安全地暴露给渲染进程
 * 无论渲染进程是否使用ES模块，都能正常工作
 */
contextBridge.exposeInMainWorld('electronAPI', {
  // 窗口控制相关API
  minimizeWindow: () => ipcRenderer.send('window-minimize'),
  closeWindow: () => ipcRenderer.send('window-close'),
  
  // 可以在这里添加更多需要暴露的API
  // 例如：数据存储、系统信息等
  
  // 版本信息，方便调试
  version: '1.0.0'
});

// 为了兼容性，可以在这里添加一些常用的工具函数
window.addEventListener('DOMContentLoaded', () => {
  console.log('Electron API已成功加载');
});
