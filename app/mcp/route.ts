import { createServer } from "@/mcp/server";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

/**
 * MCP Streamable HTTP 端点(POST /mcp)。
 * 复用 stdio 版同一份 createServer()——工具、描述、错误自愈完全同源。
 * 无鉴权、只读计算类工具,无注入面;GET/DELETE 返回 405(不接受 SSE 流会话)。
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const transport = new StreamableHTTPServerTransport({
  sessionIdGenerator: undefined, // 无状态模式:每个 POST 独立处理,不做会话保持
  enableJsonResponse: true,
});

let ready: Promise<void> | null = null;
async function ensureServer() {
  if (!ready) {
    ready = createServer().connect(transport);
  }
  return ready;
}

export async function POST(req: Request) {
  await ensureServer();
  try {
    return await transport.handleRequest(req, { method: "POST" }, await req.json());
  } catch {
    return Response.json(
      { jsonrpc: "2.0", error: { code: -32700, message: "Parse error" }, id: null },
      { status: 400 },
    );
  }
}

export async function GET() {
  return Response.json({ error: "MCP endpoint: use POST with JSON-RPC 2.0" }, { status: 405 });
}

export const DELETE = GET;
