/**
 * 任意二进制文件 ↔ Base64(G21):字节而非 TextDecoder,往返无损。
 * - 编码用分块 btoa(避免 String.fromCharCode 展开超栈),与 node:crypto 全长度交叉核对。
 * - 解码严格校验(标准 Base64 与 Base64URL 均接受;非法输入结构化拒绝)。
 * - 诚实限额:默认 20 MB,超出返回结构化错误而非静默失败。
 */

export const BASE64_FILE_LIMIT = 20 * 1024 * 1024;

// 必须是 3 的倍数:分块 btoa 时各块 padding 只允许出现在最末块,
// 否则块间会插入 "=" 破坏拼接(实测 0x8000(非 3 倍数)在 32769 字节处出错)
const CHUNK = 24576;

/** 任意字节 → 标准 Base64(含 0x00/0xff 等全部字节值)。 */
export function bytesToBase64(bytes: Uint8Array): string {
  let out = "";
  for (let i = 0; i < bytes.length; i += CHUNK) {
    const slice = bytes.subarray(i, i + CHUNK);
    let binary = "";
    for (const byte of slice) binary += String.fromCharCode(byte);
    out += btoa(binary);
  }
  return out;
}

/** Base64/Base64URL 文本 → 字节;非法输入返回 null(长度 %4==1、非法字符、空)。 */
export function base64ToBytes(text: string): Uint8Array<ArrayBuffer> | null {
  const cleaned = text.replace(/\s+/g, "");
  if (cleaned === "" || cleaned.length % 4 === 1) return null;
  const strict = cleaned.replace(/-/g, "+").replace(/_/g, "/");
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(strict)) return null;
  const binary = atob(strict);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
  return out;
}

export type Base64FileResult =
  | { ok: true; base64: string; bytes: number }
  | { ok: false; code: "tooLarge" };

/** 文件字节 → Base64,带诚实限额。 */
export function encodeFileToBase64(bytes: Uint8Array, limit = BASE64_FILE_LIMIT): { ok: true; base64: string; bytes: number } | { ok: false; code: "tooLarge" } {
  if (bytes.byteLength > limit) return { ok: false, code: "tooLarge" };
  return { ok: true, base64: bytesToBase64(bytes), bytes: bytes.byteLength };
}
