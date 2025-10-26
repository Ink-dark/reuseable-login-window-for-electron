/**
 * 按钮组件 - 创建可复用的自定义按钮
 * @param {Object} options - 配置选项
 * @param {string} options.id - 按钮ID
 * @param {string} options.text - 按钮文本
 * @param {string} options.type - 按钮类型 (primary, secondary, danger等)
 * @param {string} options.className - 自定义CSS类名
 * @param {Function} options.onClick - 点击事件回调函数
 * @param {boolean} options.disabled - 是否禁用
 * @param {string} options.size - 按钮大小 (small, medium, large)
 * @returns {HTMLButtonElement} - 创建的按钮DOM元素
 */
function createButton(options = {}) {
  const {
    id,
    text = '按钮',
    type = 'primary',
    className = '',
    onClick = () => {},
    disabled = false,
    size = 'medium'
  } = options;

  const button = document.createElement('button');
  button.id = id;
  button.textContent = text;
  button.disabled = disabled;
  
  // 合并CSS类名
  const baseClass = 'custom-button';
  button.className = `${baseClass} ${baseClass}-${type} ${baseClass}-${size} ${className}`.trim();
  
  // 添加点击事件监听
  button.addEventListener('click', (e) => {
    if (!disabled) {
      onClick(e);
    }
  });
  
  // 生成样式
  const style = document.createElement('style');
  style.textContent = `
    .${baseClass} {
      border: none;
      border-radius: 25px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      font-size: 16px;
    }
    
    .${baseClass}:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    /* 类型样式 */
    .${baseClass}-primary {
      background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
      color: white;
    }
    
    .${baseClass}-primary:hover:not(:disabled) {
      background: linear-gradient(135deg, #5a0db5 0%, #1c65e0 100%);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(37, 117, 252, 0.3);
    }
    
    .${baseClass}-secondary {
      background: #f5f5f5;
      color: #666;
    }
    
    .${baseClass}-secondary:hover:not(:disabled) {
      background: #eaeaea;
      color: #333;
    }
    
    .${baseClass}-danger {
      background: #ff6b6b;
      color: white;
    }
    
    .${baseClass}-danger:hover:not(:disabled) {
      background: #ff5252;
      box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
    }
    
    /* 大小样式 */
    .${baseClass}-small {
      padding: 8px 16px;
      font-size: 14px;
      border-radius: 20px;
    }
    
    .${baseClass}-medium {
      padding: 12px 24px;
      width: 100%;
    }
    
    .${baseClass}-large {
      padding: 15px 30px;
      font-size: 18px;
    }
  `;
  document.head.appendChild(style);
  
  // 暴露公共方法
  button.setEnabled = (enabled) => {
    button.disabled = !enabled;
  };
  
  button.setText = (newText) => {
    button.textContent = newText;
  };
  
  return button;
}

// 导出组件
export default createButton;