import { Buffer } from "node:buffer";
import { describe, expect, it } from "vitest";
import { inspectUuid, UUID_INSPECTOR_INPUT_LIMIT } from "@/tools/_lib/uuid-inspector";

// RFC 9562 Appendix A.1–A.6 and Appendix B.1–B.2; fetched from
// https://www.rfc-editor.org/rfc/rfc9562.txt on 2026-11-22.
const VECTORS = [
  [1, "c232ab00-9414-11ec-b3c8-9f6bdeced846"],
  [3, "5df41881-3aed-3515-88a7-2f4a814cf09e"],
  [4, "919108f7-52d1-4320-9bac-f847db4148a8"],
  [5, "2ed6657d-e927-568b-95e1-2665a8aea6a2"],
  [6, "1ec9414c-232a-6b00-b3c8-9f6bdeced846"],
  [7, "017f22e2-79b0-7cc3-98c4-dc0c0c07398f"],
  [8, "2489e9ad-2ee2-8e00-8ec9-32d5f69181c0"],
  [8, "5c146b14-3c52-8afd-938a-375d0df1fbf6"],
] as const;

describe("UUID inspector uses RFC bytes in network order", () => {
  it.each(VECTORS)("recognizes RFC example version %i: %s", (version, uuid) => {
    const result = inspectUuid(uuid);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const bytes = Buffer.from(uuid.replaceAll("-", ""), "hex");
    expect(result).toMatchObject({ canonical: uuid, version, versionNibble: version, versionSupported: true, variant: "rfc", special: null, isRfc9562: true });
    expect(result.bytes).toEqual([...bytes]);
    expect(result.base64).toBe(bytes.toString("base64"));
    expect(result.binary).toBe([...bytes].map(byte => byte.toString(2).padStart(8, "0")).join(""));
    for (const format of [result.canonical, result.uppercase, result.raw, result.urn, result.braced, result.binary, result.base64]) {
      const roundtrip = inspectUuid(format);
      expect(roundtrip.ok).toBe(true);
      if (roundtrip.ok) expect(roundtrip.bytes).toEqual([...bytes]);
    }
  });
  it("normalizes case, one wrapper and surrounding whitespace without changing bytes", () => {
    const uuid = VECTORS[2][1];
    for (const input of [uuid.toUpperCase(), ` UrN:UuId:${uuid.toUpperCase()}\n`, `{${uuid.toUpperCase()}}`, uuid.replaceAll("-", "").toUpperCase()]) {
      const result = inspectUuid(input);
      expect(result.ok).toBe(true);
      if (result.ok) expect(result).toMatchObject({ canonical: uuid, uppercase: uuid.toUpperCase(), raw: uuid.replaceAll("-", ""), urn: `urn:uuid:${uuid}`, braced: `{${uuid}}` });
    }
  });
  it("uses canonical strict standard Base64 and exactly 128 binary bits", () => {
    const result = inspectUuid("kZEI91LRQyCbrPhH20FIqA==");
    expect(result.ok && result.canonical).toBe("919108f7-52d1-4320-9bac-f847db4148a8");
    expect(inspectUuid("0".repeat(128))).toMatchObject({ ok: true, special: "nil" });
    expect(inspectUuid("1".repeat(128))).toMatchObject({ ok: true, special: "max" });
    for (const bad of ["kZEI91LRQyCbrPhH20FIqB==", "kZEI91LRQyCbrPhH20FIqA", "/////////////////////w__", "1".repeat(127), "1".repeat(129)]) expect(inspectUuid(bad).ok).toBe(false);
  });
});

describe("UUID layout recognition does not invent validity", () => {
  it.each([["0", "ncs"], ["7", "ncs"], ["8", "rfc"], ["b", "rfc"], ["c", "microsoft"], ["d", "microsoft"], ["e", "future"], ["f", "future"]] as const)("classifies variant prefix %s as %s", (prefix, variant) => {
    const result = inspectUuid(`919108f7-52d1-4320-${prefix}bac-f847db4148a8`);
    expect(result).toMatchObject({ ok: true, variant, isRfc9562: variant === "rfc" });
  });
  it.each([0, 9, 10, 15])("keeps unknown version nibble %i parseable without RFC recognition", nibble => {
    expect(inspectUuid(`919108f7-52d1-${nibble.toString(16)}320-9bac-f847db4148a8`)).toMatchObject({ ok: true, version: null, versionNibble: nibble, versionSupported: false, special: null, isRfc9562: false });
  });
  it("recognizes the version-2 assignment without claiming its generator was verified", () => {
    expect(inspectUuid("919108f7-52d1-2320-9bac-f847db4148a8")).toMatchObject({ ok: true, version: 2, versionSupported: true, isRfc9562: true });
  });
  it.each([["00000000-0000-0000-0000-000000000000", "nil", "ncs"], ["ffffffff-ffff-ffff-ffff-ffffffffffff", "max", "future"]] as const)("recognizes special %s outside normal variant/version validation", (input, special, variant) => {
    expect(inspectUuid(input)).toMatchObject({ ok: true, special, variant, version: null, versionSupported: false, isRfc9562: true });
  });
});

describe("UUID input errors are structured and bounded", () => {
  it.each([null, undefined, 4, true, {}, [], new String(VECTORS[0][1])])("rejects non-string %j", input => {
    expect(inspectUuid(input)).toEqual({ ok: false, error: "input-type" });
  });
  it.each(["", " \n\t"])("distinguishes empty input %j", input => expect(inspectUuid(input)).toEqual({ ok: false, error: "empty" }));
  it.each([
    "919108f7-52d1-4320-9bac-f847db4148ag", "919108f7_52d1_4320_9bac_f847db4148a8", "919108f-752d1-4320-9bac-f847db4148a8",
    "{919108f7-52d1-4320-9bac-f847db4148a8", "{{919108f7-52d1-4320-9bac-f847db4148a8}}", "urn:uuid:{919108f7-52d1-4320-9bac-f847db4148a8}",
    "{urn:uuid:919108f7-52d1-4320-9bac-f847db4148a8}", "urn:uuid:919108f752d143209bacf847db4148a8", "919108f7-52d1-4320-9bac- f847db4148a8", "0x919108f752d143209bacf847db4148a8",
    "😀", "９１９１０８f７-５２d１-４３２０-９bac-f８４７db４１４８a８", "1".repeat(33), "1".repeat(36),
  ])("rejects malformed or combined forms %j", input => expect(inspectUuid(input)).toEqual({ ok: false, error: "format" }));
  it("checks raw UTF-16 length before trim and accepts the exact 128-unit boundary", () => {
    expect(UUID_INSPECTOR_INPUT_LIMIT).toBe(128);
    expect(inspectUuid(" ".repeat(93) + VECTORS[0][1])).toEqual({ ok: false, error: "too-long" });
    expect(inspectUuid(" ".repeat(92) + VECTORS[0][1]).ok).toBe(true);
  });
});
