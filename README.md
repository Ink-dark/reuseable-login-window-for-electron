# 可复用组件库

包含了一个聊天项目中需要使用的所有可复用UI组件，采用模块化设计，方便在不同页面中共享和维护。

## 组件列表

### 1. WindowControls (窗口控制组件)
提供最小化和关闭窗口的按钮功能。

**用法示例：**
```javascript
import { createWindowControls } from './index.js';

const controls = createWindowControls({
  containerClass: 'custom-controls', // 可选的自定义类名
  showMinimize: true,                // 是否显示最小化按钮
  showClose: true                    // 是否显示关闭按钮
});
container.appendChild(controls);
```

### 2. InputField (输入框组件)
创建可配置的表单输入字段。

**用法示例：**
```javascript
import { createInputField } from './index.js';

const usernameInput = createInputField({
  id: 'username',
  type: 'text',
  placeholder: '请输入用户名',
  label: '用户名',
  onChange: (value) => console.log('用户名:', value),
  required: true
});
container.appendChild(usernameInput);

// 使用公共方法
usernameInput.setValue('admin');
const value = usernameInput.getValue();
usernameInput.focus();
```

### 3. Button (按钮组件)
创建自定义样式的按钮。

**用法示例：**
```javascript
import { createButton } from './index.js';

const submitBtn = createButton({
  id: 'submitBtn',
  text: '提交',
  type: 'primary', // primary, secondary, danger
  size: 'medium',  // small, medium, large
  onClick: () => console.log('按钮被点击'),
  disabled: false
});
container.appendChild(submitBtn);

// 使用公共方法
submitBtn.setText('处理中...');
submitBtn.setEnabled(false);
```

### 4. Avatar (头像组件)
创建用户头像，支持文本或图片。

**用法示例：**
```javascript
import { createAvatar } from './index.js';

// 创建文本头像
const textAvatar = createAvatar({
  text: 'JD',
  size: 80,
  bgColor: 'linear-gradient(45deg, #ff6b6b, #ff8e53)'
});
container.appendChild(textAvatar);

// 创建图片头像
const imgAvatar = createAvatar({
  src: '/path/to/avatar.jpg',
  size: 100
});
container.appendChild(imgAvatar);

// 使用公共方法
const avatarEl = textAvatar.querySelector('.avatar');
avatarEl.updateText('JS');
avatarEl.setSize(90);
```

## 统一导入

可以通过索引文件一次性导入所有组件：

```javascript
// 导入所有组件
import * as Components from './components/index.js';

// 使用任意组件
const button = Components.createButton({ text: '点击我' });
```

## 样式定制

所有组件都内置了基础样式，同时提供了自定义CSS类名的选项。你也可以通过修改`styles.css`文件来调整全局样式。

## 扩展建议

1. 可以根据需要为组件添加更多配置选项
2. 可以创建新的组件，如消息提示、模态框等
3. 可以添加组件间的交互逻辑

## 注意事项

1. 确保在DOM加载完成后再创建和使用组件
2. 组件使用ES模块语法，需要在支持的环境中运行
3. 对于Electron应用，请确保正确配置了preload.js以暴露必要的API

---

希望对你有帮助~ 😊