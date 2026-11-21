import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * 命令面板的行为契约。vitest 环境是 node(无 DOM),Enter 默认激活行为
 * 只在真实浏览器里发生(面板关闭→焦点回落到触发按钮→激活 click 把面板
 * 重新点开,跳转后遮罩残留),无法在 node 里复现——因此用源码契约钉住
 * 两道防线,配合 scripts/*-qa.mjs 系浏览器 E2E 验证真实行为。
 */
const source = readFileSync(
  join(import.meta.dirname, "../components/command-palette.tsx"),
  "utf8",
);

describe("command palette navigation contracts", () => {
  it("Enter 导航前必须 preventDefault,禁止默认激活落到回焦的触发按钮上", () => {
    // 键盘分支:preventDefault 必须在 go() 之前出现
    const branch = source.match(
      /if \(event\.key === "Enter" && results\[active\]\) \{[\s\S]*?\}/,
    );
    expect(branch, "Enter 分支必须是带 preventDefault 的块语句").toBeTruthy();
    const body = branch![0];
    const preventIdx = body.indexOf("event.preventDefault()");
    const goIdx = body.indexOf("go(results[active].slug)");
    expect(preventIdx).toBeGreaterThan(-1);
    expect(goIdx).toBeGreaterThan(preventIdx);
    // 不再存在裸的旧式单行分支(无 preventDefault 直接 go)
    expect(source).not.toMatch(
      /if \(event\.key === "Enter" && results\[active\]\)\s*\n\s*go\(/,
    );
  });

  it("路由变化必须自动关闭面板(面板不得跨路由存活)", () => {
    expect(source).toContain("usePathname");
    expect(source).toMatch(
      /useEffect\(\(\) => \{\s*\n\s*onCloseRef\.current\(\);\s*\n\s*\}, \[pathname\]\)/,
    );
    // latest-ref 保证路由 effect 关闭的永远是最新回调
    expect(source).toContain("onCloseRef.current = onClose;");
  });
});
