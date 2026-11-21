import { describe, expect, it } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createServer } from "@/mcp/server";

async function connect() {
  const server = createServer();
  const client = new Client({ name: "test", version: "0.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  return client;
}

describe("zoyku MCP server", () => {
  it("exposes the full tool registry", async () => {
    const client = await connect();
    const { tools } = await client.listTools();
    expect(tools.length).toBeGreaterThanOrEqual(25);
    const names = new Set(tools.map((t) => t.name));
    for (const expected of [
      "convert_unit", "mortgage_payment", "compound_interest", "salary_breakdown",
      "bmr", "tdee", "body_fat_navy", "water_intake", "running_pace", "one_rep_max",
      "workdays_between", "sleep_schedule", "cooking_convert", "contrast_ratio",
      "grade", "slugify", "text_stats", "transform_text", "parse_csv", "json_to_xml",
      "social_credit_samples", "rmb_uppercase_to_number", "crc16_modbus", "image_pixel_color", "ipv4_range_expand",
    ]) {
      expect(names.has(expected), expected).toBe(true);
    }
    await client.close();
  });

  it("converts units (temperature c→f, data GB→GiB)", async () => {
    const client = await connect();
    const c2f = await client.callTool({ name: "convert_unit", arguments: { category: "temperature", from: "c", to: "f", amount: 20 } });
    expect((c2f.content as any)[0].text).toBe("68");
    const gb = await client.callTool({ name: "convert_unit", arguments: { category: "data", from: "gb", to: "gib", amount: 1000 } });
    expect(Number((gb.content as any)[0].text)).toBeCloseTo(931.3225746, 4);
    await client.close();
  });

  it("computes mortgage payment against the closed formula", async () => {
    const client = await connect();
    const r = await client.callTool({
      name: "mortgage_payment",
      arguments: { home_price: 300000, down_payment: 60000, annual_rate_pct: 6, years: 30 },
    });
    const parsed = JSON.parse((r.content as any)[0].text);
    expect(parsed.monthlyPI).toBeCloseTo(1438.92, 1);
    expect(parsed.schedule.length).toBe(30);
    await client.close();
  });

  it("returns health estimates with documented formulas", async () => {
    const client = await connect();
    const b = await client.callTool({ name: "bmr", arguments: { weight_kg: 80, height_cm: 180, age: 30, sex: "male" } });
    expect((b.content as any)[0].text).toContain("1780");
    expect((b.content as any)[0].text).toContain("Mifflin-St Jeor");
    const w = await client.callTool({ name: "water_intake", arguments: { weight_kg: 70, exercise_minutes: 30 } });
    const parsed = JSON.parse((w.content as any)[0].text);
    expect(parsed.totalMl).toBe(2800);
    await client.close();
  });

  it("handles invalid input at two layers: schema (protocol error) and logic (isError)", async () => {
    const client = await connect();
    // 逻辑层:合法 schema 但无效单位 → handler isError
    const bad = await client.callTool({ name: "convert_unit", arguments: { category: "length", from: "nope", to: "m", amount: 1 } });
    expect((bad as any).isError).toBe(true);
    // 逻辑层:down_payment > home_price → 贷款额为负 → isError(JSON 序列化会把 NaN 变 null,必须用 isError 表达)
    const bad2 = await client.callTool({ name: "mortgage_payment", arguments: { home_price: 100, down_payment: 150, annual_rate_pct: 6, years: 30 } });
    expect((bad2 as any).isError).toBe(true);
    expect((bad2.content as any)[0].text).toContain("must be positive");
    // schema 层:负数价格被 zod 拒绝 → SDK 捕获后返回 isError 结果(不 throw)
    const schemaBad = await client.callTool({ name: "mortgage_payment", arguments: { home_price: -5, down_payment: 0, annual_rate_pct: 6, years: 30 } });
    expect((schemaBad as any).isError).toBe(true);
    expect((schemaBad.content as any)[0].text).toContain("-32602");
    await client.close();
  });

  it("transforms text and validates WCAG contrast", async () => {
    const client = await connect();
    const s = await client.callTool({ name: "slugify", arguments: { text: "Café Mémoirs — 2026!" } });
    expect((s.content as any)[0].text).toBe("cafe-memoirs-2026");
    const c = await client.callTool({ name: "contrast_ratio", arguments: { foreground: "#767676", background: "#ffffff" } });
    const parsed = JSON.parse((c.content as any)[0].text);
    expect(parsed.ratio).toBeCloseTo(4.54, 1);
    expect(parsed.aaNormal).toBe(true);
    expect(parsed.aaaNormal).toBe(false);
    await client.close();
  });

  it("executes the China credit and RMB reverse tools", async () => {
    const client = await connect();
    try {
      const samples = await client.callTool({
        name: "social_credit_samples",
        arguments: { department: "9", category: "1", address_code: "110105", start_body: "D2143569", count: 1 },
      });
      expect(samples.isError).not.toBe(true);
      const sample = JSON.parse((samples.content as any)[0].text);
      expect(sample.codes).toHaveLength(1);
      expect(sample.codes[0]).toMatch(/^91110105D2143569X[0-9A-HJ-NPQRTUWXY]$/);
      expect(sample.codes[0]).toHaveLength(18);

      const amount = await client.callTool({
        name: "rmb_uppercase_to_number",
        arguments: { uppercase: "人民币陆仟零柒元壹角肆分" },
      });
      expect(amount.isError).not.toBe(true);
      expect(JSON.parse((amount.content as any)[0].text)).toMatchObject({ normalizedAmount: "6007.14", minorUnits: "600714" });
    } finally { await client.close(); }
  });

  it("calculates CRC-16/Modbus with explicit wire byte order", async () => {
    const client = await connect();
    try {
      const result = await client.callTool({ name: "crc16_modbus", arguments: { hex: "01 03 00 00 00 0A" } });
      expect(result.isError).not.toBe(true);
      expect(JSON.parse((result.content as any)[0].text)).toMatchObject({ crcHex: "CDC5", wireHex: "C5CD", byteLength: 6 });
    } finally { await client.close(); }
  });
  it("formats an RGBA pixel through the shared image sampler", async () => {
    const client = await connect();
    try {
      const result = await client.callTool({ name: "image_pixel_color", arguments: { x: 3, y: 2, r: 20, g: 40, b: 60, a: 128 } });
      expect(result.isError).not.toBe(true);
      expect(JSON.parse((result.content as any)[0].text)).toMatchObject({
        x: 3, y: 2, hex: "#14283C", hex8: "#14283C80", rgb: "rgb(20, 40, 60)", rgba: "rgba(20, 40, 60, 0.50196)",
      });
      const invalid = await client.callTool({ name: "image_pixel_color", arguments: { x: 0, y: 0, r: 256, g: 0, b: 0, a: 255 } });
      expect(invalid.isError).toBe(true);
    } finally { await client.close(); }
  });
  it("expands an IPv4 range with an explicit display cap", async () => {
    const client = await connect();
    try {
      const result = await client.callTool({ name: "ipv4_range_expand", arguments: { start_ip: "10.0.0.254", end_ip: "10.0.1.2" } });
      expect(result.isError).not.toBe(true);
      expect(JSON.parse((result.content as any)[0].text)).toMatchObject({
        startIp: "10.0.0.254", endIp: "10.0.1.2", total: 5, truncated: false,
        addresses: ["10.0.0.254", "10.0.0.255", "10.0.1.0", "10.0.1.1", "10.0.1.2"],
      });
      const limited = await client.callTool({ name: "ipv4_range_expand", arguments: { start_ip: "0.0.0.0", end_ip: "255.255.255.255", max_results: 2 } });
      expect(limited.isError).not.toBe(true);
      expect(JSON.parse((limited.content as any)[0].text)).toMatchObject({
        total: 2 ** 32, truncated: true, addresses: ["0.0.0.0", "0.0.0.1"],
      });
      const defaultLimit = await client.callTool({ name: "ipv4_range_expand", arguments: { start_ip: "192.0.2.0", end_ip: "192.0.3.0" } });
      expect(defaultLimit.isError).not.toBe(true);
      const preview = JSON.parse((defaultLimit.content as any)[0].text);
      expect(preview).toMatchObject({ total: 257, truncated: true });
      expect(preview.addresses).toHaveLength(256);
      const reversed = await client.callTool({ name: "ipv4_range_expand", arguments: { start_ip: "10.0.0.2", end_ip: "10.0.0.1" } });
      expect(reversed.isError).toBe(true);
      const invalid = await client.callTool({ name: "ipv4_range_expand", arguments: { start_ip: "256.0.0.1", end_ip: "255.255.255.255" } });
      expect(invalid.isError).toBe(true);
      const overLimit = await client.callTool({ name: "ipv4_range_expand", arguments: { start_ip: "192.0.2.0", end_ip: "192.0.2.1", max_results: 4097 } });
      expect(overLimit.isError).toBe(true);
    } finally { await client.close(); }
  });
  it("resolves every advertised activity option with the shared formula", async () => {
    const client = await connect();
    try {
      for (const [activity,factor] of [["sedentary",1.2],["light",1.375],["moderate",1.55],["active",1.725],["very_active",1.9]] as const) {
        const result = await client.callTool({name:"tdee",arguments:{weight_kg:80,height_cm:180,age:30,sex:"male",activity}});
        expect(result.isError,activity).not.toBe(true);
        expect(Number.parseFloat((result.content as {text:string}[])[0].text),activity).toBeCloseTo(1780*factor,2);
      }
    } finally { await client.close(); }
  });
  it("rejects child and out-of-range health measurements at the protocol boundary", async () => {
    const client=await connect();
    try {
      for(const name of ["bmr","tdee"]) for(const patch of [{age:10},{height_cm:1},{weight_kg:701}]) {
        const result=await client.callTool({name,arguments:{weight_kg:80,height_cm:180,age:30,sex:"male",activity:"sedentary",...patch}});
        expect(result.isError,JSON.stringify({name,patch})).toBe(true);
      }
    } finally { await client.close(); }
  });

});
