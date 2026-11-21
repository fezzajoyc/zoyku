import { describe, expect, it } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createServer } from "@/mcp/server";

async function connect() {
  const client = new Client({ name: "sequence-bytes-watermark-test", version: "1" });
  const server = createServer();
  const [a, b] = InMemoryTransport.createLinkedPair();
  await Promise.all([client.connect(a), server.connect(b)]);
  return client;
}
const data = (result: Awaited<ReturnType<Client["callTool"]>>) => JSON.parse((result.content as {text:string}[])[0].text);

describe("sequence, frequency, bytes and watermark protocols", () => {
  it("generates exact decimal sequences with signed integer padding", async () => {
    const client = await connect();
    try {
      const result = await client.callTool({ name: "generate_text_sequence", arguments: {
        start: "-0.1", step: "0.1", count: 4, integer_width: 2, prefix: "#", separator: "|",
      } });
      expect(result.isError).not.toBe(true);
      expect(data(result).out).toBe("#-00.1|#00|#00.1|#00.2");
      const invalid = await client.callTool({ name: "generate_text_sequence", arguments: { start: "1e6", step: "1", count: 2 } });
      expect(invalid.isError).toBe(true);
    } finally { await client.close(); }
  });
  it("reports codepoint frequencies after lowercase expansion with an explicit denominator", async () => {
    const client = await connect();
    try {
      const result = await client.callTool({ name: "character_frequency", arguments: { input: "A a😀İ", ignore_whitespace: true, case_mode: "lower" } });
      expect(result.isError).not.toBe(true);
      expect(data(result)).toMatchObject({ total: 5, distinct: 4 });
      expect(data(result).rows.map((row:{character:string,count:number}) => [row.character,row.count])).toEqual([["a",2],["😀",1],["i",1],["̇",1]]);
    } finally { await client.close(); }
  });
  it("preserves leading zero bytes and rejects malformed encoded data", async () => {
    const client = await connect();
    try {
      const encoded = await client.callTool({ name: "convert_byte_encoding", arguments: { input: "000001", from: "hex", to: "base58" } });
      expect(encoded.isError).not.toBe(true);
      expect(data(encoded).output).toBe("112");
      const decoded = await client.callTool({ name: "convert_byte_encoding", arguments: { input: "112", from: "base58", to: "hex" } });
      expect(data(decoded).output.toLowerCase()).toBe("000001");
      const invalid = await client.callTool({ name: "convert_byte_encoding", arguments: { input: "MZ======", from: "base32", to: "utf8" } });
      expect(invalid.isError).toBe(true);
      const invalidUtf8 = await client.callTool({ name: "convert_byte_encoding", arguments: { input: "ff", from: "hex", to: "utf8" } });
      expect(invalidUtf8.isError).toBe(true);
    } finally { await client.close(); }
  });
  it("exposes a bounded watermark placement plan without pretending to render files", async () => {
    const client = await connect();
    try {
      const list = await client.listTools();
      expect(list.tools.some(tool => tool.name === "plan_image_watermark")).toBe(true);
      const result = await client.callTool({ name: "plan_image_watermark", arguments: { width: 32, height: 24, mark_width: 4, mark_height: 2, relative_width: 25, margin: 0, position: "br" } });
      expect(result.isError).not.toBe(true);
      expect(data(result).plan).toMatchObject({ markWidth: 8, markHeight: 4, placements: [{x:28,y:22}] });
      const invalid = await client.callTool({ name: "plan_image_watermark", arguments: { width: 0, height: 24, mark_width: 4, mark_height: 2 } });
      expect(invalid.isError).toBe(true);
    } finally { await client.close(); }
  });
});
