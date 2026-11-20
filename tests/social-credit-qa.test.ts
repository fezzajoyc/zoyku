import { describe, expect, it } from "vitest";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import socialCreditQA, { socialCreditNoticeQA } from "@/scripts/social-credit-qa.mjs";

describe("reusable social credit browser regression", () => {
  it("fails explicitly without axe instead of reporting an accessibility pass", async () => {
    const reportDir = await mkdtemp(join(tmpdir(), "social-credit-qa-"));
    try {
      const report = await socialCreditQA(null, { reportDir });
      expect(report).toMatchObject({ ok: false, completed: false, failed: 1, accessibilityAuditRun: false,
        accessibility: { status: "not_completed", completedStates: 0, violations: null, incomplete: null } });
      expect(JSON.parse(await readFile(join(reportDir, "social-credit-checks.json"), "utf8"))).toEqual(report);
    } finally { await rm(reportDir, { recursive: true, force: true }); }
  });
  it("accepts the caller's browser and axe bundle without a private runtime path", async () => {
    const source = await readFile(new URL("../scripts/social-credit-qa.mjs", import.meta.url), "utf8");
    expect(source).not.toMatch(/\.launch\(|\.close\(|\/Users\//);
    expect(source).toContain("page.context()");
    expect(source).toContain("axePath");
  });
  it("reports a missing page instead of passing unchecked clipboard races", async () => {
    const reportDir = await mkdtemp(join(tmpdir(), "social-credit-notice-qa-"));
    try {
      const report = await socialCreditNoticeQA(null, { reportDir });
      expect(report).toMatchObject({ ok: false, completed: false, expectedChecks: 10, passed: 0, failed: 1 });
      expect(report.issues[0].error).toContain("caller-owned page");
      expect(JSON.parse(await readFile(join(reportDir, "social-credit-notice-checks.json"), "utf8"))).toEqual(report);
    } finally { await rm(reportDir, { recursive: true, force: true }); }
  });
});
