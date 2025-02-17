import { defineConfig } from "rspress/config";
import { sidebar } from "./sidebar";
import { pluginPlayground } from "@rspress/plugin-playground";

export default defineConfig({
  plugins: [
    pluginPlayground({
      defaultRenderMode: "pure",
      editorPosition: "right",
    }),
  ],
  builderConfig: {
    tools: {
      rspack: {
        module: {
          rules: [
            {
              enforce: "pre",
              test: /\.mdx$/,
              loader: "./loader/init-value-loader.js",
            },
          ],
        },
      },
    },
  },
  root: "docs",
  title: "Mini Markdown Editor",
  description: "一个基于 React 的 Markdown 编辑器",
  icon: "/logo.svg",
  logo: "/logo.svg",
  logoText: "Mini Markdown Editor",
  outDir: "dist",
  themeConfig: {
    nav: [
      { text: "指南", link: "/guide/", activeMatch: "/guide" },
      { text: "在线尝试", link: "/example/", activeMatch: "/example" },
    ],
    sidebar,
    socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/xiaotianna/mini-markdown-editor",
      },
      {
        icon: {
          svg: '<svg t="1738834286159" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1747" width="22" height="22"><path d="M512 992C246.90666687 992 32 777.09333313 32 512S246.90666687 32 512 32s480 214.90666688 480 480-214.90666688 480-480 480z m242.95999969-533.33333344l-272.58666656 0.01333313c-13.09333313 0-23.70666656 10.61333344-23.70666657 23.69333344l-0.02666625 59.26666687c0 13.09333313 10.60000031 23.70666656 23.69333344 23.70666656h165.96c13.09333313 0 23.70666656 10.60000031 23.70666656 23.69333344v11.85333375A71.10666656 71.10666656 0 0 1 600.89333375 672.00000031h-225.20000062a23.70666656 23.70666656 0 0 1-23.70666657-23.69333343V423.12000031a71.10666656 71.10666656 0 0 1 71.10666657-71.10666656L754.89333313 351.99999969c13.09333313 0 23.69333344-10.60000031 23.70666656-23.69333344L778.66666625 269.06666656c0-13.09333313-10.60000031-23.70666656-23.6933325-23.71999968l-331.8666675 0.01333312C324.93333312 245.34666687 245.33333375 324.94666625 245.33333375 423.12000031v331.83999938c0 13.09333313 10.61333344 23.70666656 23.70666656 23.70666656H618.66666688c88.37333344 0 160.00000031-71.62666687 159.99999937-159.99999937V482.37333313c0-13.08-10.61333344-23.69333344-23.70666656-23.69333344z" fill="#888888" p-id="1748"></path></svg>',
        },
        mode: "link",
        content: "https://gitee.com/lin-yaozhen/mini-markdown-editor",
      },
    ],
    outlineTitle: "本页目录",
    prevPageText: "上一页",
    nextPageText: "下一页",
    searchPlaceholderText: "搜索文档",
    searchNoResultsText: "无法找到相关结果",
    searchSuggestedQueryText: "请重新搜索",
    enableScrollToTop: true,
    footer: {
      message: "2025 字节青训营「前端」",
    },
  },
});
