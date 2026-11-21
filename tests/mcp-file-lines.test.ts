import { describe, expect, it } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createServer } from "@/mcp/server";

async function connect() {
  const client = new Client({ name: "file-lines-test", version: "1" });
  const server = createServer();
  const [a, b] = InMemoryTransport.createLinkedPair();
  await Promise.all([client.connect(a), server.connect(b)]);
  return client;
}
const data = (r: Awaited<ReturnType<Client["callTool"]>>) => JSON.parse((r.content as {text: string}[])[0].text);

describe("file and line MCP tools", () => {
  it("identifies signatures while retaining unknown and generic-container distinctions", async () => {
    const c = await connect();
    try {
      const png = await c.callTool({ name: "file_signature", arguments: { hex: "89 50 4e 47 0d 0a 1a 0a" } });
      expect(png.isError).not.toBe(true);
      expect(data(png)).toMatchObject({ bytesRead: 8, signature: {id: "png", mime: "image/png"} });
      const zip = await c.callTool({ name: "file_signature", arguments: { hex: "504b0304" } });
      expect(data(zip).signature).toMatchObject({id: "zip", container: true});
      const unknown = await c.callTool({ name: "file_signature", arguments: { hex: "616263" } });
      expect(unknown.isError).not.toBe(true);
      expect(data(unknown).signature).toBeNull();
      const malformed = await c.callTool({ name: "file_signature", arguments: { hex: "G0" } });
      expect(malformed.isError).toBe(true);
    } finally { await c.close(); }
  });

  it("numbers lines without discarding Unicode, whitespace or a terminal empty line", async () => {
    const c = await connect();
    try {
      const result = await c.callTool({ name: "add_line_numbers", arguments: { input: " Ada \r\n中😀\n", start: 9, step: 1, padding: "auto" } });
      expect(result.isError).not.toBe(true);
      expect(data(result)).toMatchObject({out: " 9.  Ada \n10. 中😀\n11. ", lineCount: 3});
      const suffix = await c.callTool({ name: "add_line_numbers", arguments: { input: "a\nb", position: "suffix", separator: " | ", start: 0, step: 2 } });
      expect(data(suffix)).toMatchObject({out: "a | 0\nb | 2", lineCount: 2});
      const invalid = await c.callTool({ name: "add_line_numbers", arguments: { input: "a", step: 0 } });
      expect(invalid.isError).toBe(true);
    } finally { await c.close(); }
  });

  it("converts YAML to JSON using the same bounded local implementation", async () => {
    const c = await connect();
    try {
      const result = await c.callTool({ name: "convert_yaml_json", arguments: { input: "name: Ada\nactive: true", direction: "yaml2json" } });
      expect(result.isError).not.toBe(true);
      expect(JSON.parse(data(result).output)).toEqual({ name: "Ada", active: true });
      const bad = await c.callTool({ name: "convert_yaml_json", arguments: { input: "x: &x [*x]", direction: "yaml2json" } });
      expect(bad.isError).toBe(true);
      const rounded = await c.callTool({ name: "convert_yaml_json", arguments: { input: "x: 1.e-999", direction: "yaml2json" } });
      expect(rounded.isError).toBe(true);
      const expanded = await c.callTool({ name: "convert_yaml_json", arguments: { input: "items: [" + Array(20_000).fill("1").join(",") + "]", direction: "yaml2json" } });
      expect(expanded.isError).toBe(true);
    } finally { await c.close(); }
  });
});
