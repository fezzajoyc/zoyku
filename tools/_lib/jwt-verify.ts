/**
 * JWT 本地签名验证(G56,RFC 7515/7519):纯 WebCrypto,零后端。
 *
 * - 算法白名单:HS256/384/512(HMAC)、RS256/384/512(RSASSA-PKCS1-v1_5)、
 *   ES256/384/512(ECDSA,P-256/384/521)。alg=none 与白名单外一律拒绝。
 * - HMAC 密钥 = 密钥文本的 UTF-8 字节(jwt.io 等主流工具同约定);
 *   RSA/EC 公钥 = SPKI PEM(-----BEGIN PUBLIC KEY-----)。
 * - ES 签名按 JWS 的 raw r‖s;HMAC 用常量时间比较。
 * - Claims:exp/nbf 带可调时钟偏移;iss/aud(字符串或数组)可选期望值。
 * - 任何失败都返回结构化错误,绝不抛异常、绝不联网(kid 仅显示不解析)。
 */

export type JwtVerifyError =
  | "emptyToken"
  | "malformed"
  | "algNone"
  | "unsupportedAlg"
  | "emptyKey"
  | "badKeyFormat"
  | "keyAlgMismatch";

export type JwtClaimStatus = "ok" | "fail" | "absent" | "unverified";

export type JwtVerifySuccess = {
  ok: true;
  signatureValid: boolean;
  alg: string;
  verdict: "valid" | "invalidSignature" | "expired" | "notYetValid" | "claimMismatch";
  claims: {
    exp: JwtClaimStatus;
    nbf: JwtClaimStatus;
    iss: JwtClaimStatus;
    aud: JwtClaimStatus;
  };
  /** 供界面解释的机器事实:NumericDate 原值 */
  expSeconds: number | null;
  nbfSeconds: number | null;
  tokenIss: string | null;
  tokenAud: string | string[] | null;
};

export type JwtVerifyFailure = { ok: false; code: JwtVerifyError };
export type JwtVerifyResult = JwtVerifySuccess | JwtVerifyFailure;

export type JwtVerifyInput = {
  token: string;
  /** HMAC:UTF-8 密钥文本;RSA/EC:SPKI PEM 文本 */
  key: string;
  /** 期望 iss(可选) */
  expectedIss?: string;
  /** 期望 aud(可选;令牌侧 aud 可为数组,含即匹配) */
  expectedAud?: string;
  /** 时钟偏移容差(秒,默认 0) */
  clockSkewSeconds?: number;
  /** 当前时间(秒);测试注入用,默认 Date.now()/1000 */
  nowSeconds?: number;
};

const SUPPORTED: Record<string, { family: "HS" | "RS" | "ES"; hash: "SHA-256" | "SHA-384" | "SHA-512"; curve?: "P-256" | "P-384" | "P-521" }> = {
  HS256: { family: "HS", hash: "SHA-256" },
  HS384: { family: "HS", hash: "SHA-384" },
  HS512: { family: "HS", hash: "SHA-512" },
  RS256: { family: "RS", hash: "SHA-256" },
  RS384: { family: "RS", hash: "SHA-384" },
  RS512: { family: "RS", hash: "SHA-512" },
  ES256: { family: "ES", hash: "SHA-256", curve: "P-256" },
  ES384: { family: "ES", hash: "SHA-384", curve: "P-384" },
  ES512: { family: "ES", hash: "SHA-512", curve: "P-521" },
};

function base64UrlToBytes(part: string): Uint8Array<ArrayBuffer> | null {
  if (!/^[A-Za-z0-9_-]+$/.test(part) || part.length % 4 === 1) return null;
  const base64 = part.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64 + "=".repeat((4 - (base64.length % 4)) % 4));
  return Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** 常量时间字符串比较(长度不同立即 false,同长度累积异或)。 */
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function pemToSpkiDer(pem: string): Uint8Array<ArrayBuffer> | null {
  const body = pem
    .replace(/-----BEGIN [^-]+-----/g, "")
    .replace(/-----END [^-]+-----/g, "")
    .replace(/\s+/g, "");
  if (!/^[A-Za-z0-9+/=]+$/.test(body) || body.length < 16) return null;
  const binary = atob(body);
  return Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
}

function parseHeaderPayload(token: string): { headerObj: Record<string, unknown>; payloadObj: Record<string, unknown>; signedPart: string; signaturePart: string } | { code: "malformed" | "algNone" } {
  const parts = token.trim().split(".");
  // JWS 允许 detached/空签名的两段式;无签名时若 alg=none 仍走专用码,否则按缺签名拒绝
  if (parts.length !== 3 && parts.length !== 2) return { code: "malformed" };
  const headerBytes = base64UrlToBytes(parts[0]);
  const payloadBytes = base64UrlToBytes(parts[1]);
  if (!headerBytes || !payloadBytes) return { code: "malformed" };
  if (parts.length === 2) {
    try {
      const headerObj = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(headerBytes));
      if (typeof headerObj === "object" && headerObj !== null && (headerObj as Record<string, unknown>).alg === "none") {
        return { code: "algNone" };
      }
    } catch {
      return { code: "malformed" };
    }
    return { code: "malformed" };
  }
  if (!/^[A-Za-z0-9_-]+$/.test(parts[2])) return { code: "malformed" };
  try {
    const headerObj = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(headerBytes));
    const payloadObj = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(payloadBytes));
    if (typeof headerObj !== "object" || headerObj === null || Array.isArray(headerObj)) return { code: "malformed" };
    if (typeof payloadObj !== "object" || payloadObj === null || Array.isArray(payloadObj)) return { code: "malformed" };
    return { headerObj, payloadObj, signedPart: `${parts[0]}.${parts[1]}`, signaturePart: parts[2] };
  } catch {
    return { code: "malformed" };
  }
}

async function importVerifyKey(alg: string, spec: { family: "HS" | "RS" | "ES"; hash: "SHA-256" | "SHA-384" | "SHA-512"; curve?: string }, keyText: string): Promise<CryptoKey | { code: JwtVerifyError }> {
  const usages: KeyUsage[] = spec.family === "HS" ? ["sign", "verify"] : ["verify"];
  try {
    if (spec.family === "HS") {
      const secret = new Uint8Array(new TextEncoder().encode(keyText));
      if (secret.length === 0) return { code: "emptyKey" };
      return await crypto.subtle.importKey("raw", secret, { name: "HMAC", hash: spec.hash }, false, usages);
    }
    const der = pemToSpkiDer(keyText);
    if (!der) return { code: "badKeyFormat" };
    if (spec.family === "RS") {
      return await crypto.subtle.importKey("spki", der, { name: "RSASSA-PKCS1-v1_5", hash: spec.hash }, false, usages);
    }
    return await crypto.subtle.importKey("spki", der, { name: "ECDSA", namedCurve: spec.curve as "P-256" | "P-384" | "P-521" }, false, usages);
  } catch {
    return { code: spec.family === "HS" ? "emptyKey" : "badKeyFormat" };
  }
}

function claimStatus(input: { present: boolean; pass: boolean }): JwtClaimStatus {
  if (!input.present) return "absent";
  return input.pass ? "ok" : "fail";
}

function numericClaim(obj: Record<string, unknown>, key: string): number | null {
  const v = obj[key];
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

export async function verifyJwt(input: JwtVerifyInput): Promise<JwtVerifyResult> {
  const token = input.token.trim();
  if (token === "") return { ok: false, code: "emptyToken" };
  if (input.key.trim() === "") return { ok: false, code: "emptyKey" };

  const parsed = parseHeaderPayload(token);
  if ("code" in parsed) {
    return parsed.code === "algNone" ? { ok: false, code: "algNone" } : { ok: false, code: "malformed" };
  }
  const { headerObj, payloadObj, signedPart, signaturePart } = parsed;

  const rawAlg = headerObj.alg;
  const alg = typeof rawAlg === "string" ? rawAlg : "";
  if (alg === "none") return { ok: false, code: "algNone" };
  const spec = SUPPORTED[alg];
  if (!spec) return { ok: false, code: "unsupportedAlg" };

  const key = await importVerifyKey(alg, spec, input.key);
  if ("code" in key) return { ok: false, code: key.code };

  // 签名验证
  const signatureBytes = base64UrlToBytes(signaturePart);
  let signatureValid = false;
  if (signatureBytes) {
    try {
      if (spec.family === "HS") {
        const mac = new Uint8Array(await crypto.subtle.sign("HMAC", key, new Uint8Array(new TextEncoder().encode(signedPart))));
        signatureValid = constantTimeEqual(bytesToBase64Url(mac), signaturePart);
      } else {
        signatureValid = await crypto.subtle.verify(
          spec.family === "RS"
            ? { name: "RSASSA-PKCS1-v1_5" }
            : { name: "ECDSA", hash: spec.hash },
          key,
          signatureBytes,
          new Uint8Array(new TextEncoder().encode(signedPart)),
        );
      }
    } catch {
      signatureValid = false;
    }
  }

  // Claims(RFC 7519 NumericDate = 秒)
  const now = input.nowSeconds ?? Math.floor(Date.now() / 1000);
  const skew = Math.max(0, Math.floor(input.clockSkewSeconds ?? 0));
  const expSeconds = numericClaim(payloadObj, "exp");
  const nbfSeconds = numericClaim(payloadObj, "nbf");
  const expFail = expSeconds !== null && now > expSeconds + skew;
  const nbfFail = nbfSeconds !== null && now + skew < nbfSeconds;

  const issPresent = typeof payloadObj.iss === "string";
  const audPresent = typeof payloadObj.aud === "string" || Array.isArray(payloadObj.aud);
  const issExpected = input.expectedIss?.trim() ?? "";
  const audExpected = input.expectedAud?.trim() ?? "";
  const issPass = issExpected === "" ? true : payloadObj.iss === issExpected;
  const tokenAud = typeof payloadObj.aud === "string" || Array.isArray(payloadObj.aud)
    ? (payloadObj.aud as string | string[])
    : null;
  const audPass = audExpected === ""
    ? true
    : Array.isArray(tokenAud)
      ? tokenAud.includes(audExpected)
      : tokenAud === audExpected;

  let verdict: JwtVerifySuccess["verdict"];
  if (!signatureValid) verdict = "invalidSignature";
  else if (expFail) verdict = "expired";
  else if (nbfFail) verdict = "notYetValid";
  else if (!issPass || !audPass) verdict = "claimMismatch";
  else verdict = "valid";

  return {
    ok: true,
    signatureValid,
    alg,
    verdict,
    claims: {
      exp: claimStatus({ present: expSeconds !== null, pass: !expFail }),
      nbf: claimStatus({ present: nbfSeconds !== null, pass: !nbfFail }),
      iss: claimStatus({ present: issPresent, pass: issPass }),
      aud: claimStatus({ present: audPresent, pass: audPass }),
    },
    expSeconds,
    nbfSeconds,
    tokenIss: typeof payloadObj.iss === "string" ? payloadObj.iss : null,
    tokenAud,
  };
}
