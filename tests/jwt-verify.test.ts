import { createHash, createHmac, generateKeyPairSync, sign as nodeSign } from "node:crypto";
import { describe, expect, it } from "vitest";
import { verifyJwt } from "@/tools/_lib/jwt-verify";

/** G56:JWT 本地验证。锚 = jwt.io 公开示例向量 + node:crypto 三族独立签名交叉核对。 */

const b64u = (buf: Buffer) => buf.toString("base64url");
const b64uJson = (obj: unknown) => b64u(Buffer.from(JSON.stringify(obj), "utf8"));

/**
 * jwt.io 风格示例:注意实测这个广泛流传的副本 payload(exp=1893456000)被人改过而
 * 签名未重签,与密钥 "your-256-bit-secret" 的 HMAC 不匹配——正好作为"签名无效"的
 * 真实案例锚点;正确签名的对照令牌由 node:crypto 现场生成。
 */
const JWT_IO_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkYSBMb3ZlbGFjZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxODkzNDU2MDAwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

function hmacToken(alg: "HS256" | "HS384" | "HS512", secret: string, payload: Record<string, unknown>): string {
  const hash = alg === "HS256" ? "sha256" : alg === "HS384" ? "sha384" : "sha512";
  const header = { alg, typ: "JWT" };
  const signed = `${b64uJson(header)}.${b64uJson(payload)}`;
  const sig = createHmac(hash, secret).update(signed).digest("base64url");
  return `${signed}.${sig}`;
}

describe("HS 族(HMAC)", () => {
  it("正确签名的 HS256 令牌验证通过(node 现场生成,自洽向量)", async () => {
    const token = hmacToken("HS256", "your-256-bit-secret", {
      sub: "1234567890", name: "Ada Lovelace", role: "admin",
      iat: 1516239022, exp: 1893456000,
    });
    const r = await verifyJwt({ token, key: "your-256-bit-secret" });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.signatureValid).toBe(true);
    expect(r.verdict).toBe("valid");
    expect(r.alg).toBe("HS256");
    expect(r.claims.exp).toBe("ok");
  });

  it("流传副本的陈旧 jwt.io 示例:payload 被改未重签 → 签名无效(真实演示)", async () => {
    const r = await verifyJwt({ token: JWT_IO_TOKEN, key: "your-256-bit-secret" });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.signatureValid).toBe(false);
    expect(r.verdict).toBe("invalidSignature");
  });

  it.each(["HS256", "HS384", "HS512"] as const)("node:crypto %s 签名交叉验证", async (alg) => {
    const secret = "s3cr3t-key-测试";
    const token = hmacToken(alg, secret, { sub: "u1", iss: "zoyku", aud: "api" });
    const r = await verifyJwt({ token, key: secret, expectedIss: "zoyku", expectedAud: "api" });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.signatureValid).toBe(true);
    expect(r.verdict).toBe("valid");
    expect(r.alg).toBe(alg);
  });

  it("payload 段被替换(合法 Base64URL+合法 JSON)→ 签名失效", async () => {
    const token = hmacToken("HS256", "s3cr3t-key-测试", { sub: "u1" });
    const forged = hmacToken("HS256", "s3cr3t-key-测试", { sub: "u2", admin: true });
    const [h1, p1, s1] = token.split(".");
    const [, p2] = forged.split(".");
    // 用 u2 的合法 payload 段替换 u1 的,但保留 u1 的签名段 → JSON 合法、签名必不匹配
    const r = await verifyJwt({ token: `${h1}.${p2}.${s1}`, key: "s3cr3t-key-测试" });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.signatureValid).toBe(false);
    expect(r.verdict).toBe("invalidSignature");
  });

  it("错误密钥 → invalidSignature,verdict 不给 valid", async () => {
    const token = hmacToken("HS256", "right-key", { sub: "u1" });
    const r = await verifyJwt({ token, key: "wrong-key" });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.signatureValid).toBe(false);
    expect(r.verdict).toBe("invalidSignature");
  });
});

describe("RS/ES 族(node:crypto 独立签名)", () => {
  const rsa = generateKeyPairSync("rsa", { modulusLength: 2048 });
  const ec = generateKeyPairSync("ec", { namedCurve: "P-256" });
  const rsaSpki = rsa.publicKey.export({ type: "spki", format: "pem" }).toString();
  const ecSpki = ec.publicKey.export({ type: "spki", format: "pem" }).toString();

  it.each(["RS256", "RS384", "RS512"] as const)("node RSA %s 交叉验证", async (alg) => {
    const hash = alg.slice(2).toLowerCase();
    const header = { alg, typ: "JWT" };
    const payload = { sub: "u1", exp: Math.floor(Date.now() / 1000) + 3600 };
    const signed = `${b64uJson(header)}.${b64uJson(payload)}`;
    const sig = nodeSign(`sha${hash}`, Buffer.from(signed), rsa.privateKey).toString("base64url");
    const r = await verifyJwt({ token: `${signed}.${sig}`, key: rsaSpki });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.signatureValid).toBe(true);
    expect(r.verdict).toBe("valid");
    expect(r.alg).toBe(alg);
  });

  it.each(["ES256"] as const)("node EC %s 交叉验证(raw r‖s)", async (alg) => {
    const header = { alg, typ: "JWT" };
    const payload = { sub: "u1", exp: Math.floor(Date.now() / 1000) + 3600 };
    const signed = `${b64uJson(header)}.${b64uJson(payload)}`;
    const sig = nodeSign("sha256", Buffer.from(signed), {
      key: ec.privateKey,
      dsaEncoding: "ieee-p1363", // JWS raw r‖s
    }).toString("base64url");
    const r = await verifyJwt({ token: `${signed}.${sig}`, key: ecSpki });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.signatureValid).toBe(true);
    expect(r.verdict).toBe("valid");
  });

  it("RS256 令牌配 EC 公钥 → 导入阶段结构化拒绝(badKeyFormat),不崩溃", async () => {
    const signed = `${b64uJson({ alg: "RS256", typ: "JWT" })}.${b64uJson({ sub: "u1" })}`;
    const sig = nodeSign("sha256", Buffer.from(signed), rsa.privateKey).toString("base64url");
    const r = await verifyJwt({ token: `${signed}.${sig}`, key: ecSpki });
    expect(r).toEqual({ ok: false, code: "badKeyFormat" });
  });
});

describe("算法白名单与结构化拒绝", () => {
  it("alg=none 明确拒绝", async () => {
    const token = `${b64uJson({ alg: "none" })}.${b64uJson({ sub: "u1" })}.`;
    const r = await verifyJwt({ token: token.slice(0, -1), key: "k" });
    expect(r).toEqual({ ok: false, code: "algNone" });
  });

  it.each(["HS1", "RS1", "dir", "RSA-OAEP", ""])("白名单外算法 %j 拒绝", async (alg) => {
    const token = `${b64uJson({ alg, typ: "JWT" })}.${b64uJson({ sub: "u1" })}.abc`;
    const r = await verifyJwt({ token, key: "k" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("unsupportedAlg");
  });

  it("缺 alg 头拒绝;畸形 token 结构化拒绝", async () => {
    expect(await verifyJwt({ token: `${b64uJson({ typ: "JWT" })}.${b64uJson({ sub: "x" })}.abc`, key: "k" })).toEqual({ ok: false, code: "unsupportedAlg" });
    expect(await verifyJwt({ token: "not-a-jwt", key: "k" })).toEqual({ ok: false, code: "malformed" });
    expect(await verifyJwt({ token: "", key: "k" })).toEqual({ ok: false, code: "emptyToken" });
    expect(await verifyJwt({ token: `${b64uJson({ alg: "HS256" })}.${b64uJson({ sub: "x" })}.abc`, key: "" })).toEqual({ ok: false, code: "emptyKey" });
    const rsSigned = `${b64uJson({ alg: "RS256", typ: "JWT" })}.${b64uJson({ sub: "x" })}`;
    expect(await verifyJwt({ token: `${rsSigned}.abc`, key: "-----BEGIN X-----\nnope\n-----END X-----" })).toEqual({ ok: false, code: "badKeyFormat" });
  });
});

describe("Claims:exp/nbf/iss/aud", () => {
  const key = "claims-key";
  const now = 1_800_000_000;

  it("exp 过期 → verdict=expired;skew 容差内可挽回", async () => {
    const expired = hmacToken("HS256", key, { exp: now - 100 });
    const r1 = await verifyJwt({ token: expired, key, nowSeconds: now });
    const r2 = await verifyJwt({ token: expired, key, nowSeconds: now, clockSkewSeconds: 200 });
    expect(r1.ok && r1.verdict).toBe("expired");
    expect(r2.ok && r2.verdict).toBe("valid");
    expect(r2.ok && r2.claims.exp).toBe("ok");
  });

  it("nbf 未生效 → verdict=notYetValid;absent 时不参与判定", async () => {
    const future = hmacToken("HS256", key, { nbf: now + 500 });
    const r1 = await verifyJwt({ token: future, key, nowSeconds: now });
    expect(r1.ok && r1.verdict).toBe("notYetValid");
    expect(r1.ok && r1.claims.nbf).toBe("fail");
    const noClaims = hmacToken("HS256", key, { sub: "x" });
    const r2 = await verifyJwt({ token: noClaims, key, nowSeconds: now });
    expect(r2.ok && r2.claims.exp).toBe("absent");
    expect(r2.ok && r2.claims.nbf).toBe("absent");
    expect(r2.ok && r2.verdict).toBe("valid");
  });

  it("iss 期望不匹配 → claimMismatch;aud 数组含期望值即通过", async () => {
    const issWrong = hmacToken("HS256", key, { iss: "evil", aud: ["a", "api"] });
    const r1 = await verifyJwt({ token: issWrong, key, nowSeconds: now, expectedIss: "zoyku", expectedAud: "api" });
    expect(r1.ok && r1.verdict).toBe("claimMismatch");
    expect(r1.ok && r1.claims.iss).toBe("fail");
    expect(r1.ok && r1.claims.aud).toBe("ok");
    const audArrayOk = hmacToken("HS256", key, { iss: "zoyku", aud: ["a", "api"] });
    const r2 = await verifyJwt({ token: audArrayOk, key, nowSeconds: now, expectedIss: "zoyku", expectedAud: "api" });
    expect(r2.ok && r2.verdict).toBe("valid");
    const audMiss = hmacToken("HS256", key, { iss: "zoyku", aud: "other" });
    const r3 = await verifyJwt({ token: audMiss, key, nowSeconds: now, expectedIss: "zoyku", expectedAud: "api" });
    expect(r3.ok && r3.verdict).toBe("claimMismatch");
    expect(r3.ok && r3.claims.aud).toBe("fail");
  });

  it("签名无效时 claims 仍如实报告(verdict 由最坏项决定)", async () => {
    const tampered = hmacToken("HS256", "right", { exp: now - 10, iss: "evil" });
    const r = await verifyJwt({ token: tampered, key: "wrong", nowSeconds: now, expectedIss: "zoyku" });
    expect(r.ok && r.signatureValid).toBe(false);
    expect(r.ok && r.verdict).toBe("invalidSignature");
    expect(r.ok && r.claims.exp).toBe("fail");
    expect(r.ok && r.claims.iss).toBe("fail");
  });
});
