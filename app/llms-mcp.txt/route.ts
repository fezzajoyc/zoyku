import { MCP_TOOLS } from "@/mcp/tools";
import { SITE } from "@/lib/site";

/** llms-mcp.txt:AI agent 可读的 MCP 服务器说明书(端点 + 全量工具 schema),与 MCP_TOOLS 注册表同源 */
export function GET() {
  const body = [
    "# Zoyku MCP Server Guide",
    "",
    "Zoyku exposes its browser-tool logic as executable MCP tools: the website and the MCP server run the same tested implementations, not two separate codepaths.",
    "",
    "## Connection",
    "",
    `- HTTP (recommended for agents): POST ${SITE.domain}/mcp — JSON-RPC 2.0, methods: initialize, tools/list, tools/call. Rate limit: 30 requests/min per IP.`,
    `- Discovery: GET ${SITE.domain}/mcp returns this tool list as JSON.`,
    "- stdio: `npx zoyku-mcp` (Node.js 18+), config guide: https://zoyku.com/en/mcp",
    "",
    "## Tools",
    "",
    ...MCP_TOOLS.map(
      (t) =>
        `- **${t.name}** (${t.title}): ${t.description}\n  Schema: ${JSON.stringify(t.schema)}`,
    ),
    "",
  ].join("\n");

  return new Response(body, {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, s-maxage=3600",
    },
  });
}
