import { Client } from "@modelcontextprotocol/sdk/client/index";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
const server = new Client({
  name: "simple-http-mcp",
  version: "1.0.0",
});
const client = new StdioClientTransport({
  command: "tsx",
  args: ["/Users/zhangyunshan/work/typescript-sdk/aa.ts"],
});
server.connect(client, {
  timeout: 10000,
});
const send = async (method: string, params?: any) => {
  const userID = "userId";
  return new Promise<any>((resolve, reject) => {
    client.onmessage = (message: any) => {
      if (message.jsonrpc === "2.0" && message.id === userID) {
        if (message.error) {
          return reject(new Error(message.error.message));
        }
        resolve(message.result);
      }
    };
    client.send({
      jsonrpc: "2.0",
      id: userID,
      method,
      params,
    });
  });
};

(async () => {
  const tools = await send("tools/list").then((res) => res.tools);
  console.log(tools);
  const vv = await send("tools/call", {
    name: "icon-assistant-search",
    arguments: {
      name: "删除",
      iconType: "complex",
    },
  });
  console.log(vv);
})();
