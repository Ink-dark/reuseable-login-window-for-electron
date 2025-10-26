/**
 * 组件导出索引文件
 * 统一导出所有可复用组件，方便导入使用
 */

// 导入所有组件
import createWindowControls from './WindowControls.js';
import createInputField from './InputField.js';
import createButton from './Button.js';
import createAvatar from './Avatar.js';

// 导出组件
export {
  createWindowControls,
  createInputField,
  createButton,
  createAvatar
};

// 默认导出包含所有组件的对象
export default {
  createWindowControls,
  createInputField,
  createButton,
  createAvatar
};