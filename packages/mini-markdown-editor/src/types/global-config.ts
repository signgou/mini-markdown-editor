import { EditorView, ViewUpdate } from "@uiw/react-codemirror";
import { ToolbarType } from "./toolbar";

export interface GlobalConfig {
  /**
   * 编辑器内容
   * @type {string}
   */
  initialValue?: string;
  /**
   * 需要渲染的 toolbar，默认全部渲染
   * @type {ToolbarType[]} 需要渲染的 toolbar 数组
   * @type {Record<ToolbarType, boolean>} 需要渲染的 toolbar 对象，值为 true 时渲染，false 时不渲染
   */
  toolbar?: ToolbarType[] | Record<ToolbarType, boolean>;
  /**
   * 底部状态栏是否显示，默认显示
   * @type {boolean}
   */
  status?: boolean;
  /**
   * 编辑器主题
   * @type {"light" | "dark"}
   */
  theme?: "light" | "dark";
  /**
   * 是否开启本地存储
   * @type {boolean}
   */
  local?: boolean; // 是否开启本地存储
  /**
   * 编辑区是否显示行号
   * @type {boolean}
   */
  lineNumbers?: boolean;
  /**
   * 是否开启快捷键支持
   * @type {boolean}
   */
  enableShortcuts?: boolean;
  /**
   * 改变编辑器内容时触发
   * @type {(value: string, editorView: ViewUpdate) => void}
   */
  onChange?: (value: string, editorView: ViewUpdate) => void;
  /**
   * 上传图片时触发
   * @type {(file: File, callback: Callback) => void}
   */
  onUpload?: (file: File, callback: Callback) => void;
  /**
   * 拖拽上传图片时触发
   * @type {(file: File, callback: Callback) => void}
   */
  onDragUpload?: (file: File, callback: Callback) => void;
  /**
   * 粘贴上传图片时触发
   * @type {(file: File, callback: Callback) => void}
   */
  onPatseUpload?: (file: File, callback: Callback) => void;
  /**
   * 保存触发
   * @type {(value: string, editorView: EditorView) => void}
   */
  onSave?: (value: string, editorView: EditorView) => void;
}

export type Callback = (param: { url: string; alt?: string }) => void;
