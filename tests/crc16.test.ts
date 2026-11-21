import { describe, expect, it } from "vitest";
import {
  CRC16_MODBUS_LIMITS,
  Crc16ModbusError,
  calculateCrc16Modbus,
  crc16Modbus,
  parseHexBytes,
} from "@/tools/_lib/crc16-modbus";
import { formatCrc16ModbusError } from "@/tools/_lib/crc16-copy";
import { CRC16_UI_LABELS } from "@/tools/_engines/dev-engine-crc16";
import { LOCALES } from "@/lib/site";

describe("CRC-16/Modbus", () => {
  it("matches the Modbus RTU reference vector and exposes wire byte order", () => {
    const result = calculateCrc16Modbus("01 03 00 00 00 0A");

    expect(result).toEqual({
      inputHex: "01030000000A",
      byteLength: 6,
      crcHex: "CDC5",
      wireHex: "C5CD",
    });
  });

  it("returns the initialized CRC for an empty payload", () => {
    expect(crc16Modbus(new Uint8Array())).toBe(0xffff);
    expect(calculateCrc16Modbus("").wireHex).toBe("FFFF");
  });

  it("accepts all JavaScript whitespace separators and matches the independent check vector", () => {
    expect(calculateCrc16Modbus("31\u000B32\u00A033\u202934\n35\t36\r37\f38 39").crcHex).toBe("4B37");
    expect(calculateCrc16Modbus("31 32 33 34 35 36 37 38 39")).toEqual(expect.objectContaining({ crcHex: "4B37", wireHex: "374B" }));
    expect(() => parseHexBytes("31\u200B0000")).toThrow();
  });

  it("keeps every interactive CRC label translated for all supported locales", () => {
    for (const locale of LOCALES) {
      for (const [key, labels] of Object.entries(CRC16_UI_LABELS)) {
        expect(labels[locale], `${key}:${locale}`).toBeTruthy();
      }
    }
  });

  it("preserves bytes including zero and ff", () => {
    expect(parseHexBytes("00 ff")).toEqual(new Uint8Array([0x00, 0xff]));
    expect(calculateCrc16Modbus("00 ff").inputHex).toBe("00FF");
  });

  it("rejects odd-length and non-hex input with stable errors", () => {
    expect(() => parseHexBytes("0")).toThrow("even number of hexadecimal digits");
    expect(() => parseHexBytes("GG")).toThrow("only hexadecimal digits");
  });

  it("exposes typed parse errors and formats them in the selected UI language", () => {
    let error: unknown;
    try {
      parseHexBytes("0");
    } catch (caught) {
      error = caught;
    }
    expect(error).toBeInstanceOf(Crc16ModbusError);
    expect((error as Crc16ModbusError).code).toBe("odd-length");
    expect(formatCrc16ModbusError(error, "fr")).toBe("Le nombre de chiffres hexadécimaux doit être pair.");
    for (const code of ["odd-length", "invalid-hex", "too-long"] as const) {
      const typedError = new Crc16ModbusError(code, `English fallback: ${code}`);
      for (const locale of LOCALES) {
        expect(formatCrc16ModbusError(typedError, locale), `${code}:${locale}`).not.toBe(typedError.message);
      }
    }
  });

  it("rejects input beyond the documented limit", () => {
    const tooLong = "00".repeat(CRC16_MODBUS_LIMITS.maxBytes + 1);
    expect(() => parseHexBytes(tooLong)).toThrow("maximum");
  });
});
