import { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import EditorWrapper from "./EditorWrapper";
import { Callback } from "./types/global-config";
import { Button, message } from "antd";
// 可根据需要引入不同的主题
import "highlight.js/styles/atom-one-dark.css";
// import { ViewUpdate } from "./types/code-mirror";
import { EditorView } from "@uiw/react-codemirror";
import { EditorRef } from "./types/ref";
import { toolbarConfig } from "./config/toolbar";
import OlIcon from "@/assets/images/ol.svg?raw";

const AppWrapper = styled.div`
  width: 100%;
  height: 95vh;
  background-color: #fafafa;
  padding: 50px;
  // 修改默认颜色
  .mini-md-h1 {
    color: orange;
  }
`;

const App: FC = () => {
  // 请求测试
  const handleUpload = async (file: File, callback: Callback) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log("settimeout 上传成功", file);
        resolve({});
      }, 1500);
    });
    callback({
      url: "https://www.baidu.com/img/flexible/logo/pc/result@2.png",
      alt: "alt",
    });
    message.success("上传成功");
  };

  const [theme, setTheme] = useState("light");
  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // const handleChange = (val: string, view: ViewUpdate) => {
  //   // console.log(val, view);
  // };

  const handleSave = (content: string, view: EditorView) => {
    console.log(content, view);
  };

  const handlePatseUpload = async (file: File, callback: Callback) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log("settimeout 上传成功", file);
        resolve({});
      }, 1500);
    });
    callback({
      url: "https://www.baidu.com/img/flexible/logo/pc/result@2.png",
      alt: "123",
    });
    message.success("上传成功");
  };

  const editorRef = useRef<EditorRef>(null);

  useEffect(() => {
    if (editorRef.current) {
      console.log(editorRef.current);
    }
  }, []);

  // 添加abc工具
  toolbarConfig.addToolbar({
    type: "abc",
    title: "我是测试abc",
    icon: OlIcon,
    description: "我是描述abc",
    hotkey: {
      command: "mod+p",
      description: "Make text bold",
      handle: () => {
        // 处理加粗逻辑
      },
    },
    onClick: () => {
      console.log("我是输出abc");
    },
  });

  return (
    <AppWrapper>
      <Button onClick={changeTheme}>主题切换{theme}</Button>
      <Button
        onClick={() => {
          editorRef.current?.setContent("hello world");
        }}
      >
        插入内容
      </Button>
      <Button
        onClick={() => {
          const text = editorRef.current?.getContent();
          console.log(text);
        }}
      >
        获取内容
      </Button>
      <Button
        onClick={() => {
          editorRef.current?.clear();
        }}
      >
        清空内容
      </Button>
      <Button
        onClick={() => {
          editorRef.current?.setCursor(100, 100);
        }}
      >
        设置光标位置（100，100）
      </Button>
      <Button
        onClick={() => {
          const pos = editorRef.current?.getCursor();
          console.log(pos);
        }}
      >
        获取光标位置
      </Button>
      <Button
        onClick={() => {
          const text = editorRef.current?.getSelection();
          console.log(text);
        }}
      >
        获取选中内容
      </Button>
      <Button
        onClick={() => {
          editorRef.current?.focus();
        }}
      >
        聚焦
      </Button>
      <Button
        onClick={() => {
          const instance = editorRef.current?.getEditorInstance();
          console.log(instance);
        }}
      >
        获取编辑器实例
      </Button>
      <Button
        onClick={() => {
          const instance = editorRef.current?.getPreviewInstance();
          console.log(instance);
        }}
      >
        获取预览区实例
      </Button>
      <EditorWrapper
        status={true}
        onUpload={handleUpload}
        local={true}
        lineNumbers={true}
        theme={theme as "light" | "dark"}
        // onChange={handleChange}
        onSave={handleSave}
        onDragUpload={handlePatseUpload}
        onPatseUpload={handlePatseUpload}
        ref={editorRef}
      />
    </AppWrapper>
  );
};

export default App;
