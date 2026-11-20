import { describe, expect, it } from "vitest";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { urlParserQA } from "@/scripts/url-parser-qa.mjs";

describe("URL parser browser QA contract", () => {
  it("reports missing accessibility coverage instead of claiming a pass", async () => {
    const reportDir = await mkdtemp(join(tmpdir(), "url-parser-qa-"));
    try {
      const report = await urlParserQA(null, { reportDir });
      expect(report).toMatchObject({ ok: false, completed: false, failed: 1, accessibilityAuditRun: false,
        accessibility: { expectedStates: 4, completedStates: 0, violations: null, incomplete: null } });
      expect(JSON.parse(await readFile(join(reportDir, "url-parser-qa.json"), "utf8"))).toEqual(report);
    } finally { await rm(reportDir, { recursive: true, force: true }); }
  });

  it("keeps browser and axe resources caller-owned", async () => {
    const source = await readFile(new URL("../scripts/url-parser-qa.mjs", import.meta.url), "utf8");
    expect(source).not.toMatch(/\.launch\(|\.close\(|\/Users\//);
    expect(source).toContain("page.context()");
    expect(source).toContain("axePath");
    expect(source).toContain("navigator.clipboard.readText()");
  });
});
