import { MCP_TOOLS } from "@/mcp/tools";

/**
 * MCP HTTP JSON-RPC 2.0 端点(POST /mcp)。
 * 标准 JSON-RPC 2.0 实现,支持:
 * - tools/list
 * - tools/call
 * - initialize
 * 与 stdio 模式完全同源(共用 MCP_TOOLS 注册表)。无会话状态,可从任何 HTTP Agent 直接调用。
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type JsonRpcRequest = {
  jsonrpc: "2.0";
  id: string | number | null;
  method: string;
  params?: Record<string, any>;
};

export async function POST(req: Request) {
  let body: JsonRpcRequest;
  try {
    body = await req.json();
  } catch {
    return Response.json(
      { jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } },
      { status: 400 },
    );
  }

  const { id = null, method, params = {} } = body;

  if (method === "initialize") {
    return Response.json({
      jsonrpc: "2.0",
      id,
      result: {
        protocolVersion: "2024-11-05",
        capabilities: { tools: {} },
        serverInfo: { name: "zoyku", version: "1.0.0" },
        instructions:
          "Zoyku: free browser tools (https://zoyku.com). 30+ executable calculation tools matching the website logic.",
      },
    });
  }

  if (method === "tools/list") {
    return Response.json({
      jsonrpc: "2.0",
      id,
      result: {
        tools: MCP_TOOLS.map((t) => ({
          name: t.name,
          description: t.description,
          inputSchema: t.schema,
        })),
      },
    });
  }

  if (method === "tools/call") {
    const { name, arguments: args = {} } = params;
    const tool = MCP_TOOLS.find((t) => t.name === name);
    if (!tool) {
      return Response.json({
        jsonrpc: "2.0",
        id,
        error: { code: -32601, message: `Tool not found: ${name}` },
      });
    }
    try {
      const out = await tool.run(args);
      return Response.json({ jsonrpc: "2.0", id, result: out });
    } catch (e) {
      return Response.json({
        jsonrpc: "2.0",
        id,
        result: {
          content: [{ type: "text", text: `error: ${(e as Error).message}` }],
          isError: true,
        },
      });
    }
  }

  return Response.json({
    jsonrpc: "2.0",
    id,
    error: { code: -32601, message: `Method not found: ${method}` },
  });
}

export async function GET() {
  return Response.json(
    {
      name: "zoyku-mcp",
      transport: "JSON-RPC 2.0 over HTTP POST",
      endpoint: "https://zoyku.com/mcp",
      stdio: "npx zoyku-mcp",
      docs: "https://zoyku.com/en/mcp",
      methods: ["initialize", "tools/list", "tools/call"],
    },
    { status: 200 },
  );
}
