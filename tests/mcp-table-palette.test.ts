import { describe, it, expect } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createServer } from "@/mcp/server";

async function connected() {
  const server = createServer();
  const client = new Client({ name: "table-palette-test", version: "1" });
  const [ct, st] = InMemoryTransport.createLinkedPair();
  await Promise.all([server.connect(st), client.connect(ct)]);
  return client;
}

function parsed(result: Awaited<ReturnType<Client["callTool"]>>) {
  const content = result.content as { type: string; text: string }[];
  return JSON.parse(content[0].text);
}

describe("table and palette MCP protocols", () => {
  it("transposes raw text cells and swaps one-based columns without coercion", async () => {
    const client = await connected();
    try {
      const transposed = await client.callTool({ name: "csv_table_transform", arguments: { input: 'id,code\n1,001\n2,"Ada, Countess"', operation: "transpose" } });
      expect(transposed.isError).not.toBe(true);
      expect(parsed(transposed)).toMatchObject({ out: 'id,1,2\ncode,001,"Ada, Countess"', rows: 2, columns: 3 });
      const swapped = await client.callTool({ name: "csv_table_transform", arguments: { input: 'name;amount\n" Ada ";001', operation: "swap", delimiter: ";", first_column: 1, second_column: 2 } });
      expect(swapped.isError).not.toBe(true);
      expect(parsed(swapped)).toMatchObject({ out: "amount;name\n001; Ada ", rows: 2, columns: 2 });
      const badShape = await client.callTool({ name: "csv_table_transform", arguments: { input: "a,b\nc", operation: "transpose" } });
      expect(badShape.isError).toBe(true);
      const badColumn = await client.callTool({ name: "csv_table_transform", arguments: { input: "a,b", operation: "swap", first_column: 0, second_column: 1 } });
      expect(badColumn.isError).toBe(true);
    } finally { await client.close(); }
  });

  it("rejects oversized protocol requests and responses instead of returning truncated CSV", async () => {
    const client = await connected();
    try {
      const input = await client.callTool({ name: "csv_table_transform", arguments: { input: "x".repeat(100001), operation: "transpose" } });
      expect(input.isError).toBe(true);
      const output = await client.callTool({ name: "csv_table_transform", arguments: { input: "x".repeat(98000) + ",".repeat(999), operation: "transpose" } });
      expect(output.isError).toBe(true);
    } finally { await client.close(); }
  });

  it("groups a raw raster with transparent pixels and alpha-weighted percentages", async () => {
    const client = await connected();
    try {
      const result = await client.callTool({ name: "image_palette", arguments: {
        width: 4, height: 1, color_count: 2,
        rgba: [255, 0, 0, 255, 255, 0, 0, 255, 0, 0, 255, 255, 0, 255, 0, 0],
      } });
      expect(result.isError).not.toBe(true);
      const palette = parsed(result);
      expect(palette).toMatchObject({ sampledPixels: 4, visibleSamplePixels: 3 });
      expect(palette.groups).toHaveLength(2);
      expect(palette.groups[0]).toMatchObject({ hex: "#FF0000" });
      expect(palette.groups[0].percentage).toBeCloseTo(200 / 3);
      expect(palette.groups[1]).toMatchObject({ hex: "#0000FF" });
      const allTransparent = await client.callTool({ name: "image_palette", arguments: { width: 1, height: 1, rgba: [20, 40, 60, 0] } });
      expect(allTransparent.isError).not.toBe(true);
      expect(parsed(allTransparent).groups).toEqual([]);
      const malformed = await client.callTool({ name: "image_palette", arguments: { width: 2, height: 2, rgba: [0, 0, 0, 255] } });
      expect(malformed.isError).toBe(true);
      const badChannel = await client.callTool({ name: "image_palette", arguments: { width: 1, height: 1, rgba: [256, 0, 0, 255] } });
      expect(badChannel.isError).toBe(true);
    } finally { await client.close(); }
  });
});
