/**
 * CN-023:RSA 密钥对生成(WebCrypto 原生,零依赖)。
 * RSASSA-PKCS1-v1_5(SHA-256),2048/3072/4096 位,导出 PEM(SPKI/PKCS8)与 JWK。
 * 浏览器 crypto.subtle 生成;测试用 node:crypto 独立实现交叉验证(生成/验签互查)。
 */

export type RsaModulus = 2048 | 3072 | 4096;
export type RsaFormat = "pem" | "jwk";

export type RsaKeyPairResult =
  | {
      ok: true;
      publicKeyPem: string;
      privateKeyPem: string;
      publicKeyJwk: JsonWebKey;
      privateKeyJwk: JsonWebKey;
      modulusBits: RsaModulus;
      keyId: string;
    }
  | { ok: false; code: "unsupported"; message?: string };

const PEM_WRAP = 64;

function derToPem(der: ArrayBuffer, label: "PUBLIC KEY" | "PRIVATE KEY"): string {
  const bytes = new Uint8Array(der);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  const b64 = btoa(binary);
  const lines = b64.match(new RegExp(`.{1,${PEM_WRAP}}`, "g")) ?? [];
  return `-----BEGIN ${label}-----\n${lines.join("\n")}\n-----END ${label}-----`;
}

/** 8 字节随机 keyId(JWK kid 常规做法),hex 展示。 */
function randomKeyId(): string {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function generateRsaKeyPair(modulusBits: RsaModulus): Promise<RsaKeyPairResult> {
  if (typeof crypto === "undefined" || !crypto.subtle) {
    return { ok: false, code: "unsupported", message: "WebCrypto unavailable" };
  }
  const keyPair = await crypto.subtle.generateKey(
    {
      name: "RSASSA-PKCS1-v1_5",
      modulusLength: modulusBits,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: "SHA-256",
    },
    true,
    ["sign", "verify"],
  );
  const spki = await crypto.subtle.exportKey("spki", keyPair.publicKey);
  const pkcs8 = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
  const publicKeyJwk = await crypto.subtle.exportKey("jwk", keyPair.publicKey);
  const privateKeyJwk = await crypto.subtle.exportKey("jwk", keyPair.privateKey);
  return {
    ok: true,
    publicKeyPem: derToPem(spki, "PUBLIC KEY"),
    privateKeyPem: derToPem(pkcs8, "PRIVATE KEY"),
    publicKeyJwk,
    privateKeyJwk,
    modulusBits,
    keyId: randomKeyId(),
  };
}
