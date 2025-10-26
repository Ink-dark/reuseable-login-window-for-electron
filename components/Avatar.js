/**
 * 头像组件 - 创建可复用的用户头像
 * @param {Object} options - 配置选项
 * @param {string} options.text - 头像显示的文本（通常是用户名首字母）
 * @param {string} options.src - 头像图片URL（如果提供则使用图片）
 * @param {number} options.size - 头像尺寸（像素）
 * @param {string} options.containerClass - 容器CSS类名
 * @param {string} options.className - 自定义CSS类名
 * @param {string} options.bgColor - 背景颜色或渐变色
 * @returns {HTMLDivElement} - 创建的头像容器DOM元素
 */
function createAvatar(options = {}) {
  const {
    text = 'U',
    src = '',
    size = 100,
    containerClass = 'avatar-container',
    className = '',
    bgColor = 'linear-gradient(45deg, #6a11cb, #2575fc)'
  } = options;

  const container = document.createElement('div');
  container.className = `${containerClass} ${className}`.trim();

  const avatar = document.createElement(src ? 'img' : 'div');
  avatar.className = 'avatar';
  
  // 设置头像大小
  const sizeStyle = `${size}px`;
  avatar.style.width = sizeStyle;
  avatar.style.height = sizeStyle;
  
  // 根据类型设置内容
  if (src) {
    // 图片头像
    avatar.src = src;
    avatar.alt = '用户头像';
    avatar.style.objectFit = 'cover';
  } else {
    // 文本头像
    avatar.textContent = text;
    avatar.style.display = 'flex';
    avatar.style.justifyContent = 'center';
    avatar.style.alignItems = 'center';
    avatar.style.background = bgColor;
    avatar.style.color = 'white';
    avatar.style.fontSize = `${size * 0.4}px`; // 字体大小根据头像尺寸调整
  }

  container.appendChild(avatar);

  // 添加样式
  const style = document.createElement('style');
  style.textContent = `
    .${containerClass} {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 25px;
    }
    
    .avatar {
      width: ${sizeStyle};
      height: ${sizeStyle};
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .avatar:hover {
      transform: scale(1.05);
      transition: transform 0.3s ease;
    }
  `;
  document.head.appendChild(style);

  // 暴露公共方法
  avatar.updateText = (newText) => {
    if (!src && avatar.tagName === 'DIV') {
      avatar.textContent = newText;
    }
  };

  avatar.updateImage = (newSrc) => {
    if (newSrc && avatar.tagName === 'DIV') {
      // 如果原来是文本头像，替换为图片头像
      const newAvatar = document.createElement('img');
      newAvatar.className = 'avatar';
      newAvatar.src = newSrc;
      newAvatar.alt = '用户头像';
      newAvatar.style.width = sizeStyle;
      newAvatar.style.height = sizeStyle;
      newAvatar.style.objectFit = 'cover';
      container.replaceChild(newAvatar, avatar);
      return newAvatar;
    } else if (newSrc && avatar.tagName === 'IMG') {
      // 如果已经是图片头像，更新src
      avatar.src = newSrc;
    }
    return avatar;
  };

  avatar.setSize = (newSize) => {
    const newSizeStyle = `${newSize}px`;
    avatar.style.width = newSizeStyle;
    avatar.style.height = newSizeStyle;
    if (avatar.tagName === 'DIV') {
      avatar.style.fontSize = `${newSize * 0.4}px`;
    }
  };

  return container;
}

// 导出组件
export default createAvatar;