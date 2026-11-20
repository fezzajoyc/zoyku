import { describe, expect, it } from "vitest";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chineseIdRecoveryQA } from "@/scripts/chinese-id-qa.mjs";

describe("Chinese ID recovery regression contract", () => {
  it("fails clearly without axe instead of reporting unchecked accessibility as passing", async () => {
    const reportDir = await mkdtemp(join(tmpdir(), "chinese-id-recovery-"));
    try {
      const report = await chineseIdRecoveryQA(null, { reportDir });
      expect(report).toMatchObject({ ok: false, completed: false, failed: 1, accessibilityAuditRun: false,
        accessibility: { expectedStates: 4, completedStates: 0, violations: null, incomplete: null } });
      expect(JSON.parse(await readFile(join(reportDir, "chinese-id-recovery-qa.json"), "utf8"))).toEqual(report);
    } finally { await rm(reportDir, { recursive: true, force: true }); }
  });
  it("uses caller-owned browser and axe resources", async () => {
    const source = await readFile(new URL("../scripts/chinese-id-qa.mjs", import.meta.url), "utf8");
    expect(source).not.toMatch(/\.launch\(|\.close\(|\/Users\//);
    expect(source).toContain("page.context()");
    expect(source).toContain("axePath");
  });
});
