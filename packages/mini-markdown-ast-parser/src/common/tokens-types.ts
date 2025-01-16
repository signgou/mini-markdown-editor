// 定义 Tokens 分词类型：区分当前是什么类型的节点
export const TOKENS_TYPES = {
  // 块级
  Heading: 'heading', // 标题
  Paragraph: 'paragraph', // 段落
  Blockquote: 'blockquote', // 引用
  // 行级
  Text: 'text', // 文本
  Strong: 'strong', // 加粗
  Emphasis: 'emphasis', // 斜体
  Delete: 'delete', // 删除线
  Link: 'link', // 链接
  Image: 'image', // 图片
  InlineCode: 'inlineCode', // 行内高亮
  // 其他
  ThematicBreak: 'thematicBreak', // 分割线
  Code: 'code', // 代码块
  List: 'list', // 列表
  ListItem: 'listItem', // 列表项
  Html: 'html', // html 标签
  Table: 'table', // 表格
  THead: 'thead', // 表格头部
  TBody: 'tbody', // 表格主体
  TR: 'tr', // 表格行
  TH: 'th', // 表格头部列单元格
  TD: 'td' // 表格主体列单元格
} as const
