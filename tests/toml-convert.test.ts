import { describe, expect, it } from "vitest";
import { tomlToJson, jsonToToml } from "@/tools/_lib/toml-convert";

/**
 * CN-022 TOML↔JSON。锚 = toml-lang/toml 官方 README 文档示例(github raw 抓取,2026-11-22)
 * + @iarna/toml 往返一致性。绝不用记忆向量。
 */

// toml-lang/toml README 第一块 toml 示例(官方文档)
const OFFICIAL_EXAMPLE = `# This is a TOML document.

title = "TOML Example"

[owner]
name = "Tom Preston-Werner"
dob = 1979-05-27T07:32:00-08:00 # First class dates

[database]
server = "192.168.1.1"
ports = [ 8000, 8001, 8002 ]
connection_max = 5000
enabled = true

[servers]

  # Indentation (tabs and/or spaces) is allowed but not required
  [servers.alpha]
  ip = "10.0.0.1"
  dc = "eqdc10"

  [servers.beta]
  ip = "10.0.0.2"
  dc = "eqdc10"

[clients]
data = [ ["gamma", "delta"], [1, 2] ]

# Line breaks are OK when inside arrays
hosts = [
  "alpha",
  "omega"
]`;

describe("tomlToJson(官方示例)", () => {
  it("官方 README 示例解析出正确结构", async () => {
    const r = await tomlToJson(OFFICIAL_EXAMPLE);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const obj = JSON.parse(r.json) as Record<string, unknown>;
    expect(obj.title).toBe("TOML Example");
    expect((obj.owner as Record<string, unknown>).name).toBe("Tom Preston-Werner");
    expect((obj.database as Record<string, unknown>).ports).toEqual([8000, 8001, 8002]);
    expect((obj.database as Record<string, unknown>).enabled).toBe(true);
    expect(((obj.servers as Record<string, unknown>).alpha as Record<string, unknown>).ip).toBe("10.0.0.1");
    expect(obj.clients).toEqual({ data: [["gamma", "delta"], [1, 2]], hosts: ["alpha", "omega"] });
  });

  it("TOML 日期 → JSON ISO 字符串(如实披露行为)", async () => {
    const r = await tomlToJson(OFFICIAL_EXAMPLE);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const obj = JSON.parse(r.json) as Record<string, unknown>;
    expect(obj.owner).toHaveProperty("dob", "1979-05-27T15:32:00.000Z");
  });

  it("非法 TOML 拒绝并带定位信息", async () => {
    const r = await tomlToJson("[broken\nkey =");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("invalid");
  });

  it("空输入拒绝", async () => {
    expect((await tomlToJson("")).ok).toBe(false);
    expect((await tomlToJson("   \n  ")).ok).toBe(false);
  });
});

describe("jsonToToml", () => {
  it("JSON → TOML → JSON 往返一致(嵌套+数组+类型)", async () => {
    const src = {
      title: "demo",
      count: 3,
      enabled: false,
      tags: ["a", "b"],
      nested: { deep: { value: 1.5 }, list: [1, 2, 3] },
    };
    const r = await jsonToToml(JSON.stringify(src));
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const back = await tomlToJson(r.toml);
    expect(back.ok).toBe(true);
    if (!back.ok) return;
    expect(JSON.parse(back.json)).toEqual(src);
  });

  it("官方示例 parse→stringify→parse 全往返(Date 保持同一时刻)", async () => {
    const first = await tomlToJson(OFFICIAL_EXAMPLE);
    expect(first.ok).toBe(true);
    if (!first.ok) return;
    const second = await jsonToToml(first.json);
    expect(second.ok).toBe(true);
    if (!second.ok) return;
    const third = await tomlToJson(second.toml);
    expect(third.ok).toBe(true);
    if (!third.ok) return;
    const obj2 = JSON.parse(third.json) as Record<string, unknown>;
    expect(obj2.title).toBe("TOML Example");
    expect(obj2.clients).toEqual({ data: [["gamma", "delta"], [1, 2]], hosts: ["alpha", "omega"] });
    expect(obj2.owner).toHaveProperty("dob", "1979-05-27T15:32:00.000Z");
  });

  it("JSON 根为数组 → 明确拒绝(unsupported)", async () => {
    const r = await jsonToToml('[1,2,3]');
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("unsupported");
  });

  it("JSON 根为标量 → 明确拒绝", async () => {
    expect((await jsonToToml('42')).ok).toBe(false);
    expect((await jsonToToml('"x"')).ok).toBe(false);
    expect((await jsonToToml('null')).ok).toBe(false);
  });

  it("非法 JSON 拒绝(invalidJson)", async () => {
    const r = await jsonToToml("{not json}");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("invalidJson");
  });

  it("空输入拒绝", async () => {
    expect((await jsonToToml("")).ok).toBe(false);
  });
});
