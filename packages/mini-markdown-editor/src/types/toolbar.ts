// 基础工具栏类型
export enum BaseToolbarType {
  HEADING = "heading",
  HEADING_1 = "heading-1",
  HEADING_2 = "heading-2",
  HEADING_3 = "heading-3",
  HEADING_4 = "heading-4",
  HEADING_5 = "heading-5",
  HEADING_6 = "heading-6",
  BOLD = "bold",
  ITALIC = "italic",
  UNDERLINE = "underline",
  DELETE = "delete",
  LINE = "line",
  BLOCKQUOTE = "blockquote",
  UL = "ul",
  OL = "ol",
  INLINECODE = "inlinecode",
  CODE = "code",
  LINK = "link",
  IMAGE = "image",
  IMAGE_LINK = "image-link",
  IMAGE_UPLOAD = "image-upload",
  TABLE = "table",
  UNDO = "undo",
  REDO = "redo",
  FULLSCREEN = "fullscreen",
  WRITE = "write",
  PREVIEW = "preview",
  CONTENTS = "contents",
  HELP = "help",
  OUTPUT = "output",
  EMOJI = "emoji",
  SAVE = "save",
}

// 允许用户扩展的工具栏类型
export type ExtendedToolbarType = string;

// 合并基础类型和扩展类型
export type ToolbarType = BaseToolbarType | ExtendedToolbarType;

// 基础工具栏项接口
export interface BaseToolbarItem {
  type: ToolbarType;
  icon?: string;
  title?: string;
  description?: string;
  disabled?: boolean;
  visible?: boolean;
  onClick?: () => void;
  component?: React.ReactNode;
}

// 工具栏列表项接口
export interface ToolbarItemListItem {
  title: string;
  type: string;
  onClick?: (...args: any[]) => void | (() => void);
}

// 完整的工具栏项接口
export interface ToolbarItem extends BaseToolbarItem {
  list?: ToolbarItemListItem[];
}

// 工具栏上下文值接口
export interface ToolbarContextValues {
  toolbars: ToolbarItem[];
  addToolbar?: (toolbarItem: ToolbarItem) => void;
  removeToolbar?: (type: ToolbarType) => void;
  updateToolbar?: (type: ToolbarType, newConfig: Partial<ToolbarItem>) => void;
  reorderToolbars?: (newOrder: ToolbarType[]) => void;
}

// 类型保护函数
export const isBaseToolbarType = (type: ToolbarType): type is BaseToolbarType => {
  return Object.values(BaseToolbarType).includes(type as BaseToolbarType);
};

// 工具栏配置验证
export interface ToolbarValidationResult {
  isValid: boolean;
  errors: string[];
}

// 工具栏配置验证函数
export const validateToolbarItem = (item: ToolbarItem): ToolbarValidationResult => {
  const errors: string[] = [];

  if (!item.type) {
    errors.push("Toolbar item must have a type");
  }

  if (item.list && !Array.isArray(item.list)) {
    errors.push("Toolbar item list must be an array");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
