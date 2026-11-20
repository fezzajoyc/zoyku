import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import rmbQA, { RMB_NOTICE_RACE_CASE_COUNT, rmbUppercaseNoticeRaceQA } from "@/scripts/rmb-uppercase-qa.mjs";

describe("RMB browser QA contracts", () => {
  it("retains mandatory axe and a separately runnable notice race matrix", async () => {
    await expect(rmbQA({})).rejects.toThrow(/axePath/);
    expect(typeof rmbUppercaseNoticeRaceQA).toBe("function");
    expect(RMB_NOTICE_RACE_CASE_COUNT).toBe(12);
  });
  it("keeps the original checks and six axe states without owning the browser", async () => {
    const source = await readFile(new URL("../scripts/rmb-uppercase-qa.mjs", import.meta.url), "utf8");
    expect(source).toContain("47 + RMB_NOTICE_RACE_CASE_COUNT");
    expect(source).toContain("audits.length === 6");
    expect(source).not.toMatch(/\.launch\(|\.close\(|\/Users\//);
    for (const outcome of ["copy B", "earlier copy A", "download ${outcome}", "clears previous ${previous}"]) expect(source).toContain(outcome);
  });
});
