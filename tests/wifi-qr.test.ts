import { describe, expect, it } from "vitest";
import { buildWifiPayload, escapeWifiField } from "@/tools/_lib/wifi-qr";

/** G22:WIFI 载荷按 ZXing/Android 约定转义与拼装。 */
describe("escapeWifiField", () => {
  it("五个特殊字符逐一转义,反斜杠最先处理不二次转义", () => {
    expect(escapeWifiField("a\\b")).toBe("a\\\\b");
    expect(escapeWifiField("a;b")).toBe("a\\;b");
    expect(escapeWifiField("a,b")).toBe("a\\,b");
    expect(escapeWifiField("a:b")).toBe("a\\:b");
    expect(escapeWifiField('a"b')).toBe("a\\\"b");
    expect(escapeWifiField('\\;,: "\\')).toBe("\\\\\\;\\,\\: \\\"\\\\");
    expect(escapeWifiField("普通中文")).toBe("普通中文");
    expect(escapeWifiField("")).toBe("");
  });
});

describe("buildWifiPayload", () => {
  it("WPA + 密码 + 非隐藏 = 经典形态", () => {
    expect(buildWifiPayload({ ssid: "mynetwork", password: "mypass", security: "WPA", hidden: false })).toEqual({
      ok: true,
      payload: "WIFI:T:WPA;S:mynetwork;P:mypass;;",
    });
  });

  it("隐藏网络输出 H:true,WEP 输出 T:WEP", () => {
    const r = buildWifiPayload({ ssid: "net", password: "12345", security: "WEP", hidden: true });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.payload).toBe("WIFI:T:WEP;S:net;P:12345;H:true;;");
  });

  it("nopass 省略 P 字段,即使传了密码也不输出", () => {
    const r = buildWifiPayload({ ssid: "open-net", password: "ignored", security: "nopass", hidden: false });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.payload).toBe("WIFI:T:nopass;S:open-net;;");
  });

  it("SSID 中的特殊字符完整转义且可逆向(去掉转义反斜杠后还原)", () => {
    const r = buildWifiPayload({ ssid: 'guest;network, "5G":2F\\floor', password: 'p;a\\s"s', security: "WPA", hidden: false });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    // 载荷形态正确
    expect(r.payload.startsWith("WIFI:T:WPA;S:")).toBe(true);
    expect(r.payload.endsWith(";;")).toBe(true);
    // 逐字段还原:按非转义分号切分后,去掉转义反斜杠应还原原文
    const body = r.payload.slice("WIFI:".length, -2);
    const fields = body.split(/(?<!\\);/);
    expect(fields[1]).toBe(`S:${escapeWifiField('guest;network, "5G":2F\\floor')}`);
    expect(fields[1].slice(2).replace(/\\(.)/g, "$1")).toBe('guest;network, "5G":2F\\floor');
    expect(fields[2].slice(2).replace(/\\(.)/g, "$1")).toBe('p;a\\s"s');
  });

  it("空 SSID 与缺密码走结构化错误,绝不抛异常", () => {
    expect(buildWifiPayload({ ssid: "  ", password: "x", security: "WPA", hidden: false })).toEqual({
      ok: false,
      code: "emptySsid",
    });
    expect(buildWifiPayload({ ssid: "net", security: "WPA", hidden: false })).toEqual({
      ok: false,
      code: "passwordRequired",
    });
    expect(buildWifiPayload({ ssid: "net", password: "", security: "WEP", hidden: false })).toEqual({
      ok: false,
      code: "passwordRequired",
    });
  });

  it("SSID 首尾空白修剪后再拼装", () => {
    const r = buildWifiPayload({ ssid: "  net  ", password: "p", security: "WPA", hidden: false });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.payload).toBe("WIFI:T:WPA;S:net;P:p;;");
  });
});
