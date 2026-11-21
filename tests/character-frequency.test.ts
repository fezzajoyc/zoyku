import { describe, expect, it } from "vitest";
import { countCharacterFrequency, exportCharacterFrequency, FREQUENCY_LIMITS, type CharacterFrequencyOptions } from "@/tools/_lib/character-frequency";
describe("Unicode codepoint frequency", () => {
  it("counts repeated Unicode characters with exact retained-codepoint denominator", () => {
    const r = countCharacterFrequency("AaA中😀😀");
    expect(r.error).toBeNull(); expect(r.rawCodePoints).toBe(6); expect(r.total).toBe(6); expect(r.distinct).toBe(4);
    expect(r.rows.map(x => [x.character,x.count])).toEqual([["A",2],["😀",2],["a",1],["中",1]]);
    expect(r.rows[0].share).toBeCloseTo(2/6);
  });
  it("lowercases the full text before counting and counts lowercase expansions", () => {
    const r = countCharacterFrequency("İIı", { caseMode: "lower" });
    expect(r.rawCodePoints).toBe(3); expect(r.total).toBe(4);
    expect(r.rows.map(x => [x.codepoint,x.count])).toEqual([["U+0069",2],["U+0307",1],["U+0131",1]]);
    expect(countCharacterFrequency("ΟΣ", { caseMode: "lower" }).rows.map(x=>x.character)).toEqual(["ο","ς"]);
  });
  it("counts combining marks and ZWJ emoji components separately without normalization", () => {
    const r = countCharacterFrequency("é e\u0301👩‍💻", { ignoreWhitespace: true, sort: "first" });
    expect(r.rows.map(x=>x.character)).toEqual(["é","e","\u0301","👩","‍","💻"]); expect(r.total).toBe(6);
  });
  it("can ignore Unicode whitespace and keeps empty input distinct from all-filtered text", () => {
    expect(countCharacterFrequency("").rawCodePoints).toBe(0);
    const r=countCharacterFrequency(" \t\r\n\u00a0\u2003",{ignoreWhitespace:true});
    expect(r.rawCodePoints).toBe(6);expect(r.total).toBe(0);expect(r.rows).toEqual([]);expect(r.error).toBeNull();
    expect(countCharacterFrequency(" ").rows[0].character).toBe(" ");
  });
  it("sorts deterministically and display limits never change counts or exported rows", () => {
    expect(countCharacterFrequency("cbba",{sort:"count-asc"}).rows.map(x=>x.character)).toEqual(["c","a","b"]);
    expect(countCharacterFrequency("😀aA",{sort:"codepoint"}).rows.map(x=>x.character)).toEqual(["A","a","😀"]);
    const r=countCharacterFrequency("abc",{limit:1});expect(r.rows).toHaveLength(3);expect(r.shown).toBe(1);expect(r.truncated).toBe(true);expect(r.rows[0].share).toBeCloseTo(1/3);
    expect(exportCharacterFrequency(r,"csv").split("\r\n")).toHaveLength(4);
  });
  it("exports every row with escaped control/quote characters and stable codepoints", () => {
    const r=countCharacterFrequency('a"\n',{sort:"first"});
    const csv=exportCharacterFrequency(r,"csv");
    expect(csv.startsWith("character_json,codepoint,count,share\r\n")).toBe(true);
    expect(csv).toContain('U+000A,1,0.333333333333');
    expect(exportCharacterFrequency(r,"txt")).toBe('character_json\tcodepoint\tcount\tshare\n"a"\tU+0061\t1\t0.333333333333\n"\\\""\tU+0022\t1\t0.333333333333\n"\\n"\tU+000A\t1\t0.333333333333');
  });
  it("rejects input/configuration and distinct limits without partial rows", () => {
    for(const input of [null,1,{},[]])expect(countCharacterFrequency(input).error).toBe("input-type");
    for(const options of [null,[],{caseMode:"fold"},{sort:"random"},{ignoreWhitespace:"yes"},{limit:0},{limit:501}])expect(countCharacterFrequency("a",options as CharacterFrequencyOptions).error).toBe("options");
    expect(countCharacterFrequency("x".repeat(100001)).error).toBe("input-limit");
    expect(countCharacterFrequency("😀".repeat(50000)).total).toBe(50000);
    const chars=Array.from({length:4096},(_,i)=>String.fromCodePoint(0x1000+i)).join("");
    expect(countCharacterFrequency(chars).distinct).toBe(4096);
    const r=countCharacterFrequency(chars+"😀");expect(r.error).toBe("distinct-limit");expect(r.rows).toEqual([]);
    expect(exportCharacterFrequency(r,"csv")).toBe("");expect(FREQUENCY_LIMITS.displayRows).toBe(500);
  });
});
