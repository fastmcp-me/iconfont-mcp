#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { writeFileSync } from "fs";
import searchIcon from "./searchIcon";
import { resolve } from "path";
const server = new McpServer({ name: "simple-http-mcp", version: "1.0.0" });
server.registerTool(
  "icon-assistant-search",
  {
    description: "图标助手-搜索图标",
    inputSchema: {
      name: z.string().describe("图标名称"),
      iconType: z
        .string()
        .describe(
          "图标类型,默认为全部, 可选值（全部：''、线性:line、面性:fill、扁平:flat、手绘:hand、简约:simple、精美:complex）"
        ),
    },
  },
  async ({ name, iconType }) => {
    return {
      content: [
        {
          type: "text",
          text: `成功搜索到如下图标：`,
        },
        {
          type: "text",
          text: JSON.stringify(
            await searchIcon(name, iconType).then((res) =>
              res.map((e: any) => ({
                name: e.name,
                svg: e.show_svg,
              }))
            ),
            null,
            4
          ),
        },
      ],
    };
  }
);
server.registerTool(
  "icon-assistant-download",
  {
    description: "图标助手-下载图标",
    inputSchema: {
      name: z.string().describe("图标名称"),
      svg: z.string().describe("图标svg内容"),
      cwd: z.string().describe("当前工作目录"),
      icons: z
        .array(z.string())
        .describe("图标下载存放目录,默认：src/assets/iconfont"),
    },
  },
  async ({ name, cwd, icons, svg }) => {
    const filePath = resolve(cwd, icons[0], `${name}.svg`);
    writeFileSync(filePath, svg);
    return {
      content: [
        {
          type: "text",
          text: `下载成功:${filePath}`,
        },
      ],
    };
  }
);
server.connect(new StdioServerTransport());
