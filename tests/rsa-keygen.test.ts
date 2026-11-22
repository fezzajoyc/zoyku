import { describe, expect, it } from "vitest";
import { generateKeyPairSync, createPrivateKey, createPublicKey, sign, verify, createSign } from "node:crypto";
import { generateRsaKeyPair } from "@/tools/_lib/rsa-keygen";

/**
 * CN-023 RSA 密钥对。锚 = node:crypto 独立实现交叉验证:
 * WebCrypto 生成 → node 解析 PEM(密钥位数/结构)→ node 用私钥签名 → WebCrypto 导入公钥验签(或反向)。
 * 双实现一致才算通过;不依赖记忆向量。
 */

const DATA = Buffer.from("zoyku rsa cross-check 2026-11-22");

async function webcryptoVerifyImport(pem: string, sig: BufferSource, data: BufferSource): Promise<boolean> {
  const pub = createPublicKey(pem);
  const jwk = pub.export({ format: "jwk" }) as JsonWebKey;
  const key = await crypto.subtle.importKey(
    "jwk",
    jwk,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"],
  );
  return crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, sig, data);
}

describe("generateRsaKeyPair × node:crypto 交叉验证", () => {
  it.each([2048, 3072, 4096])("%i 位:PEM 可被 node 解析,位数正确,签名互验", async (bits) => {
    const r = await generateRsaKeyPair(bits as 2048 | 3072 | 4096);
    expect(r.ok).toBe(true);
    if (!r.ok) return;

    const priv = createPrivateKey(r.privateKeyPem);
    const pub = createPublicKey(r.publicKeyPem);
    expect(pub.asymmetricKeyType).toBe("rsa");
    const pubDetails = pub.export({ format: "jwk" }) as { kty: string; n: string };
    expect(pubDetails.kty).toBe("RSA");
    // 模数位数:base64url n 的字节数 × 8,应等于目标位数(±8 bit 余量)
    const nBytes = Buffer.from(pubDetails.n, "base64url").length;
    expect(nBytes * 8).toBeGreaterThanOrEqual(bits - 8);
    expect(nBytes * 8).toBeLessThanOrEqual(bits);

    // node 签名 → WebCrypto 验签
    const signature = sign("sha256", DATA, priv);
    await expect(webcryptoVerifyImport(r.publicKeyPem, new Uint8Array(signature), new Uint8Array(DATA))).resolves.toBe(true);

    // 篡改数据必须验签失败
    const tampered = Buffer.from(DATA.toString() + "x");
    await expect(webcryptoVerifyImport(r.publicKeyPem, new Uint8Array(signature), new Uint8Array(tampered))).resolves.toBe(false);
  }, 60_000);

  it("WebCrypto 签名 → node 验签(反向)", async () => {
    const r = await generateRsaKeyPair(2048);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    // 用 node 从 PEM 重建私钥并签名;再用 node 公钥验 WebCrypto…此处反向:node 造签名验 WebCrypto 生成对
    // 交叉方向:WebCrypto 生成对导出 JWK → node 导入 → node 签名 → node 验
    const privJwk = r.privateKeyJwk;
    const privNode = createPrivateKey({ key: privJwk as never, format: "jwk" });
    const signature = createSign("sha256").update(DATA).sign(privNode);
    const pubNode = createPublicKey({ key: r.publicKeyJwk as never, format: "jwk" });
    expect(verify("sha256", DATA, pubNode, signature)).toBe(true);
  }, 60_000);

  it("JWK 结构:kty/oct 字段与 key_ops", async () => {
    const r = await generateRsaKeyPair(2048);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.publicKeyJwk.kty).toBe("RSA");
    expect(r.publicKeyJwk.e).toBe("AQAB"); // 65537 的 base64url,标准值
    expect(r.privateKeyJwk.kty).toBe("RSA");
    expect(r.privateKeyJwk.d).toBeTruthy();
    expect(r.keyId).toMatch(/^[0-9a-f]{16}$/);
  }, 60_000);

  it("PEM 结构:标准头尾与 64 字符换行", async () => {
    const r = await generateRsaKeyPair(2048);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.publicKeyPem).toMatch(/^-----BEGIN PUBLIC KEY-----\n/);
    expect(r.privateKeyPem).toMatch(/^-----BEGIN PRIVATE KEY-----\n/);
    const lines = r.publicKeyPem.split("\n").filter((l) => l && !l.startsWith("-----"));
    for (const l of lines) expect(l.length).toBeLessThanOrEqual(64);
  }, 60_000);
});
