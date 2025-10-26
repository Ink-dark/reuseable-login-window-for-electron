/**
 * 输入框组件 - 创建可复用的表单输入字段
 * @param {Object} options - 配置选项
 * @param {string} options.id - 输入框ID
 * @param {string} options.type - 输入框类型 (text, password, email等)
 * @param {string} options.placeholder - 占位文本
 * @param {string} options.label - 可选的标签文本
 * @param {string} options.containerClass - 容器CSS类名
 * @param {Function} options.onChange - 输入变化回调函数
 * @param {boolean} options.required - 是否必填
 * @returns {HTMLDivElement} - 创建的输入框组件DOM元素
 */
function createInputField(options = {}) {
  const {
    id,
    type = 'text',
    placeholder = '',
    label = '',
    containerClass = 'input-group',
    onChange = () => {},
    required = false
  } = options;

  const container = document.createElement('div');
  container.className = containerClass;

  // 添加标签（如果提供）
  if (label) {
    const labelElement = document.createElement('label');
    labelElement.htmlFor = id;
    labelElement.textContent = label;
    labelElement.style.display = 'block';
    labelElement.style.marginBottom = '5px';
    labelElement.style.fontSize = '14px';
    labelElement.style.color = '#666';
    container.appendChild(labelElement);
  }

  // 创建输入框
  const input = document.createElement('input');
  input.id = id;
  input.type = type;
  input.placeholder = placeholder;
  input.required = required;

  // 添加输入事件监听
  input.addEventListener('input', (e) => {
    onChange(e.target.value, e);
  });

  container.appendChild(input);

  // 添加样式
  const style = document.createElement('style');
  style.textContent = `
    .${containerClass} {
      margin-bottom: 20px;
    }
    
    .${containerClass} input {
      width: 100%;
      padding: 12px 15px;
      border-radius: 25px;
      border: 1px solid #e0e0e0;
      background: #f9f9f9;
      color: #333;
      font-size: 16px;
      outline: none;
      transition: all 0.3s ease;
    }
    
    .${containerClass} input:focus {
      border-color: #2575fc;
      background: white;
      box-shadow: 0 0 0 2px rgba(37, 117, 252, 0.2);
    }
    
    .${containerClass} input::placeholder {
      color: #999;
    }
  `;
  document.head.appendChild(style);

  // 暴露一些公共方法
  container.getValue = () => input.value;
  container.setValue = (value) => { input.value = value; };
  container.focus = () => input.focus();
  container.reset = () => { input.value = ''; };

  return container;
}

// 导出组件
export default createInputField;