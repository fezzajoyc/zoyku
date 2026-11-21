export const CRC16_MODBUS_LIMITS = {
  maxBytes: 1_000_000,
} as const;

export type Crc16ModbusResult = {
  inputHex: string;
  byteLength: number;
  crcHex: string;
  wireHex: string;
};

export type Crc16ModbusErrorCode = "odd-length" | "invalid-hex" | "too-long";

export class Crc16ModbusError extends Error {
  readonly code: Crc16ModbusErrorCode;

  constructor(code: Crc16ModbusErrorCode, message: string) {
    super(message);
    this.name = "Crc16ModbusError";
    this.code = code;
  }
}

/** Parse a whitespace-separated hexadecimal byte stream without changing byte order. */
export function parseHexBytes(input: string): Uint8Array {
  const compact = input.replace(/\s+/g, "");
  if (compact.length % 2 !== 0) {
    throw new Crc16ModbusError("odd-length", "Input must contain an even number of hexadecimal digits.");
  }
  if (!/^[0-9a-fA-F]*$/.test(compact)) {
    throw new Crc16ModbusError("invalid-hex", "Input may contain only hexadecimal digits and whitespace.");
  }
  const byteLength = compact.length / 2;
  if (byteLength > CRC16_MODBUS_LIMITS.maxBytes) {
    throw new Crc16ModbusError("too-long", `Input exceeds the maximum of ${CRC16_MODBUS_LIMITS.maxBytes} bytes.`);
  }
  const bytes = new Uint8Array(byteLength);
  for (let i = 0; i < byteLength; i += 1) {
    bytes[i] = Number.parseInt(compact.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

/** CRC-16/Modbus: poly 0xA001, init 0xFFFF, reflected input/output, xorout 0. */
export function crc16Modbus(bytes: Uint8Array): number {
  let crc = 0xffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc & 1) === 1 ? (crc >>> 1) ^ 0xa001 : crc >>> 1;
    }
  }
  return crc & 0xffff;
}

function hexByte(value: number): string {
  return value.toString(16).padStart(2, "0").toUpperCase();
}

export function calculateCrc16Modbus(input: string): Crc16ModbusResult {
  const bytes = parseHexBytes(input);
  const crc = crc16Modbus(bytes);
  const low = crc & 0xff;
  const high = (crc >>> 8) & 0xff;
  return {
    inputHex: Array.from(bytes, hexByte).join(""),
    byteLength: bytes.length,
    crcHex: `${hexByte(high)}${hexByte(low)}`,
    wireHex: `${hexByte(low)}${hexByte(high)}`,
  };
}
