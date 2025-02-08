import { FC, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import CodeMirror, { type EditorView, ViewUpdate } from "@uiw/react-codemirror";
import * as events from "@uiw/codemirror-extensions-events";
import { useEditorContentStore } from "@/store/editor";
import { handleEditorScroll } from "@/utils/handle-scroll";
import { usePersistEditorContent } from "@/hooks/use-persist-editor-content";
import { ConfigContext } from "../providers/config-provider";
import { createEditorExtensions } from "@/extensions/codemirror";
import { Callback, GlobalConfig } from "@/types/global-config";
import { filterContextProps } from "@/utils/filter-context-props";

const ScrollWrapper = styled.div<{
  $lineNumbers?: boolean;
}>`
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: ${({ $lineNumbers }) => ($lineNumbers ? "0px" : "5px 10px")};
  display: flex;
  flex-direction: column;

  .editor-content {
    width: 100%;
    min-height: 100%;
    font-size: 16px;
    line-height: 24px;
    outline: none;
  }
  .cm-editor {
    outline: none;
    height: 100%;
    background-color: ${(props) => props.theme.background};
  }
  .cm-editor.cm-focused {
    outline: none;
  }
  .cm-scroller {
    height: 100%;
    background-color: ${(props) => props.theme.background};
  }
`;

interface EditorProps extends GlobalConfig {
  className?: string;
  style?: React.CSSProperties;
  isSyncScroll: boolean;
}

const Editor: FC<EditorProps> = (props) => {
  const {
    content,
    setContent,
    scrollWrapper,
    setScrollWrapper,
    setEditorView,
    previewView,
    editorView,
  } = useEditorContentStore();
  // ref转发
  const editorViewRef = useRef<EditorView>();
  // 存储实例
  const setEditorViewInstance = useCallback(
    (view: EditorView) => {
      setEditorView(view);
      editorViewRef.current = view;
    },
    [editorViewRef],
  );
  // 持久化存储内容
  const { saveContent, getContent } = usePersistEditorContent();

  // 处理重加载后的光标位置
  useEffect(() => {
    if (editorView && content) {
      // 将光标移动到文档末尾
      editorView.dispatch({
        selection: { anchor: content.length, head: content.length },
      });
    }
  }, [editorView]);

  // 初始化时获取本地存储的内容
  useEffect(() => {
    setContent(getContent());
  }, []);

  // 编辑器挂载完成后将编辑器示例存储起来
  const handleCreate = (view: EditorView) => {
    setEditorViewInstance(view);
  };

  const { theme, lineNumbers, enableShortcuts, onChange, onDragUpload, onPatseUpload } =
    useContext(ConfigContext);

  console.log(filterContextProps(useContext(ConfigContext), props));

  const handleChange = (val: string, editView: ViewUpdate) => {
    // 更新store
    setContent(val);
    // 本地同步存储
    saveContent(val);
    // 更新编辑器实例
    setEditorViewInstance(editView.view);
    // 将事件暴露给外部
    if (onChange) {
      onChange(val, editView);
    }
  };

  const eventExt = events.scroll({
    scroll: () => {
      if (scrollWrapper !== "editor") return;
      const view = editorViewRef.current;
      if (!(view && previewView && props.isSyncScroll)) return;
      handleEditorScroll({ editorView: view, previewView });
    },
  });

  const handleMouseEnter = () => {
    setScrollWrapper("editor");
  };

  // 拖拽上传
  const handleDragUpload = (file: File, Callback: Callback) => {
    onDragUpload?.(file, Callback);
  };
  // 粘贴上传
  const handlePatseUpload = (file: File, Callback: Callback) => {
    onPatseUpload?.(file, Callback);
  };

  // 创建编辑器扩展
  const extensions = useMemo(
    () =>
      createEditorExtensions({
        enableShortcuts,
        scrollWrapper,
        eventExt,
        onDragUpload: handleDragUpload,
        onPasteUpload: handlePatseUpload,
      }),
    [scrollWrapper],
  );

  return (
    <ScrollWrapper $lineNumbers={lineNumbers}>
      <CodeMirror
        className="markdown-editor-content"
        onCreateEditor={handleCreate}
        theme={theme}
        value={content}
        extensions={extensions}
        basicSetup={{
          lineNumbers: lineNumbers || false,
          foldGutter: false,
          highlightActiveLine: false,
          highlightActiveLineGutter: false,
          searchKeymap: false,
          autocompletion: false,
          defaultKeymap: true,
        }}
        autoFocus={true}
        style={{ height: "100%" }}
        onChange={handleChange}
        onMouseEnter={handleMouseEnter}
      />
    </ScrollWrapper>
  );
};

export default Editor;
