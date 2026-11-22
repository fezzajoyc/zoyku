/**
 * CN-026:AES 加解密(WebCrypto 原生,零依赖)。
 * 口令 → PBKDF2-SHA256(210,000 次迭代,OWASP 2023 推荐)派生密钥 → AES-GCM-256(认证加密,默认)
 * 或 AES-CBC-256(遗留兼容,无认证,输出附带说明)。IV 随机(GCM 12 字节/CBC 16 字节)。
 * 输出格式:salt(16B) + IV + 密文 的 Base64 组合,自描述可解。
 * 测试锚 = node:crypto 双实现交叉验证(本库加密→node 解密,node 加密→本库解密)。
 */

export type AesMode = "gcm" | "cbc";
export type AesResult =
  | { ok: true; payload: string }
  | { ok: false; code: "empty" | "tooLong" | "badPayload" | "authFailed" | "unsupported"; message?: string };

const PBKDF2_ITERATIONS = 210_000;
const SALT_BYTES = 16;
const IV_GCM = 12;
const IV_CBC = 16;
const MAX_INPUT = 2_000_000;

function base64Encode(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

function base64Decode(s: string): Uint8Array | null {
  if (s.length === 0 || s.length % 4 !== 0 || !/^[A-Za-z0-9+/]+={0,2}$/.test(s)) return null;
  try {
    const binary = atob(s);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  } catch {
    return null;
  }
}

async function deriveKey(password: string, salt: Uint8Array, mode: AesMode): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: salt as BufferSource, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    baseKey,
    { name: mode === "gcm" ? "AES-GCM" : "AES-CBC", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

/** 加密:输出 Base64( salt(16B) || IV || ciphertext )。 */
export async function aesEncrypt(plaintext: string, password: string, mode: AesMode = "gcm"): Promise<AesResult> {
  if (plaintext === "" || password === "") return { ok: false, code: "empty" };
  if (plaintext.length > MAX_INPUT) return { ok: false, code: "tooLong" };
  if (typeof crypto === "undefined" || !crypto.subtle) return { ok: false, code: "unsupported" };

  const salt = new Uint8Array(SALT_BYTES);
  crypto.getRandomValues(salt);
  const iv = new Uint8Array(mode === "gcm" ? IV_GCM : IV_CBC);
  crypto.getRandomValues(iv);
  const key = await deriveKey(password, salt, mode);

  const enc = new TextEncoder();
  const params: AesGcmParams | AesCbcParams =
    mode === "gcm" ? { name: "AES-GCM", iv: iv as BufferSource } : { name: "AES-CBC", iv: iv as BufferSource };
  const ciphertext = new Uint8Array(await crypto.subtle.encrypt(params, key, enc.encode(plaintext)));

  const payload = new Uint8Array(SALT_BYTES + iv.length + ciphertext.length);
  payload.set(salt, 0);
  payload.set(iv, SALT_BYTES);
  payload.set(ciphertext, SALT_BYTES + iv.length);
  return { ok: true, payload: base64Encode(payload) };
}

/** 解密:输入 Base64( salt || IV || ciphertext );口令错/GCM 认证失败 → authFailed。 */
export async function aesDecrypt(payloadB64: string, password: string, mode: AesMode = "gcm"): Promise<AesResult> {
  if (payloadB64.trim() === "" || password === "") return { ok: false, code: "empty" };
  if (payloadB64.length > MAX_INPUT) return { ok: false, code: "tooLong" };
  if (typeof crypto === "undefined" || !crypto.subtle) return { ok: false, code: "unsupported" };

  const payload = base64Decode(payloadB64.trim());
  if (!payload) return { ok: false, code: "badPayload" };
  const ivLen = mode === "gcm" ? IV_GCM : IV_CBC;
  if (payload.length <= SALT_BYTES + ivLen) return { ok: false, code: "badPayload" };

  const salt = payload.slice(0, SALT_BYTES);
  const iv = payload.slice(SALT_BYTES, SALT_BYTES + ivLen);
  const ciphertext = payload.slice(SALT_BYTES + ivLen);
  const key = await deriveKey(password, salt, mode);

  const params: AesGcmParams | AesCbcParams =
    mode === "gcm" ? { name: "AES-GCM", iv: iv as BufferSource } : { name: "AES-CBC", iv: iv as BufferSource };
  try {
    const plain = await crypto.subtle.decrypt(params, key, ciphertext as BufferSource);
    return { ok: true, payload: new TextDecoder().decode(plain) };
  } catch {
    return { ok: false, code: "authFailed" };
  }
}
