import { describe, expect, it } from "vitest";
import { CRON_ALIASES, normalizeCron, parseCron } from "@/tools/_lib/cron";

/** G20:标准 @简写按 vixie cron 语义展开;@reboot 专用码;未知简写仍拒绝。 */
describe("cron @shorthand aliases", () => {
  it("七个标准别名映射与 vixie cron 语义一致", () => {
    expect(CRON_ALIASES["@yearly"]).toBe("0 0 1 1 *");
    expect(CRON_ALIASES["@annual"]).toBe("0 0 1 1 *");
    expect(CRON_ALIASES["@monthly"]).toBe("0 0 1 * *");
    expect(CRON_ALIASES["@weekly"]).toBe("0 0 * * 0");
    expect(CRON_ALIASES["@daily"]).toBe("0 0 * * *");
    expect(CRON_ALIASES["@midnight"]).toBe("0 0 * * *");
    expect(CRON_ALIASES["@hourly"]).toBe("0 * * * *");
  });

  it.each(["@daily", "@DAILY", " @daily ", "@hourly", "@weekly", "@monthly", "@yearly", "@annual", "@midnight"])(
    "%s 解析成功并携带 alias 标记",
    (expr) => {
      const r = parseCron(expr);
      expect(r.ok).toBe(true);
      if (!r.ok) return;
      expect(r.alias).toBe(expr.trim().toLowerCase());
      expect(r.breakdown.hasSeconds).toBe(false);
    },
  );

  it("@daily 展开的字段值与手写五段完全一致", () => {
    const alias = parseCron("@daily");
    const manual = parseCron("0 0 * * *");
    expect(alias.ok && manual.ok).toBe(true);
    if (!alias.ok || !manual.ok) return;
    expect(alias.breakdown.fields.map((f) => f.values)).toEqual(
      manual.breakdown.fields.map((f) => f.values),
    );
    expect(alias.breakdown.fields.map((f) => f.raw)).toEqual(["0", "0", "*", "*", "*"]);
  });

  it("@weekly 展开的周字段为周日(0)", () => {
    const r = parseCron("@weekly");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const dow = r.breakdown.fields.at(-1);
    expect(dow?.values).toEqual([0]);
  });

  it("@reboot 返回专用 reboot 码,绝不当作时间表", () => {
    const r = parseCron("@reboot");
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.code).toBe("reboot");
    // normalizeCron 拿不到可喂给 croner 的表达式
    expect(normalizeCron("@reboot")).toBeNull();
  });

  it("未知简写仍报 shorthand 错", () => {
    const r = parseCron("@fortnightly");
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.code).toBe("shorthand");
  });

  it("normalizeCron 把别名归一化为展开式(引擎据此喂 croner)", () => {
    expect(normalizeCron("@daily")).toBe("0 0 * * *");
    expect(normalizeCron("@hourly")).toBe("0 * * * *");
    expect(normalizeCron("@yearly")).toBe("0 0 1 1 *");
  });
});
