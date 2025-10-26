/**
 * 窗口控制组件 - 提供最小化和关闭窗口功能
 * @param {Object} options - 配置选项
 * @param {string} options.containerClass - 容器CSS类名
 * @param {boolean} options.showMinimize - 是否显示最小化按钮
 * @param {boolean} options.showClose - 是否显示关闭按钮
 * @returns {HTMLDivElement} - 创建的窗口控制组件DOM元素
 */
function createWindowControls(options = {}) {
  const {
    containerClass = 'window-controls',
    showMinimize = true,
    showClose = true
  } = options;

  const container = document.createElement('div');
  container.className = containerClass;

  // 创建最小化按钮
  if (showMinimize) {
    const minimizeBtn = document.createElement('div');
    minimizeBtn.className = 'control-btn minimize-btn';
    minimizeBtn.textContent = '−'; // 短横线
    minimizeBtn.title = '最小化';
    minimizeBtn.addEventListener('click', () => {
      if (window.electronAPI?.minimizeWindow) {
        window.electronAPI.minimizeWindow();
      } else {
        console.warn('最小化功能不可用');
      }
    });
    container.appendChild(minimizeBtn);
  }

  // 创建关闭按钮
  if (showClose) {
    const closeBtn = document.createElement('div');
    closeBtn.className = 'control-btn close-btn';
    closeBtn.textContent = '×';
    closeBtn.title = '关闭';
    closeBtn.addEventListener('click', () => {
      if (window.electronAPI?.closeWindow) {
        window.electronAPI.closeWindow();
      } else {
        console.warn('关闭功能不可用');
      }
    });
    container.appendChild(closeBtn);
  }

  // 添加样式
  const style = document.createElement('style');
  style.textContent = `
    .${containerClass} {
      display: flex;
      gap: 10px;
      position: absolute;
      top: 15px;
      right: 15px;
      z-index: 9999; /* 确保按钮在最上层 */
    }
    
    .control-btn {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: #f5f5f5;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #666;
      font-size: 18px;
      cursor: pointer;
      transition: all 0.3s ease;
      user-select: none;
      -webkit-app-region: no-drag; /* 允许按钮接收点击事件 */
    }
    
    .control-btn:hover {
      background: #eaeaea;
    }
    
    .close-btn:hover {
      background: #ff6b6b;
      color: white;
    }
  `;
  document.head.appendChild(style);

  return container;
}

// 导出组件
export default createWindowControls;