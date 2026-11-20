import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import csvQA from "@/scripts/csv-qa.mjs";

describe("portable CSV browser QA", () => {
  it("requires the caller's accessibility bundle instead of skipping checks", async () => {
    await expect(csvQA({})).rejects.toThrow(/axePath/);
  });
  it("leaves browser lifetime and private paths with the caller", async () => {
    const source = await readFile(new URL("../scripts/csv-qa.mjs", import.meta.url), "utf8");
    expect(source).not.toMatch(/\.launch\(|\.close\(|\/Users\//);
    expect(source).toContain("page.context()");
    expect(source).toContain("incomplete");
    expect(source).toContain("readFile(file");
  });
});
