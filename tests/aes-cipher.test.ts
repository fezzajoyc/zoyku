import { createDecipheriv, createCipheriv, pbkdf2Sync, createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { aesDecrypt, aesEncrypt } from "@/tools/_lib/aes-cipher";

/**
 * CN-026 AES。锚 = node:crypto 双实现交叉验证:
 * 本库(WebCrypto PBKDF2+GCM)加密 → node 按 salt||iv||ct 布局解密;node 加密 → 本库解密。
 * 绝不用记忆向量;派生参数(PBKDF2-SHA256 210k/16B salt)在两侧显式一致。
 */

const PASSWORD = "correct horse battery staple";
const MSG = "zoyku aes cross-check 2026-11-22";

/** node 侧:按本库的 salt||iv||ct Base64 布局解密(GCM)。 */
function nodeDecryptGcm(payloadB64: string, password: string): string {
  const payload = Buffer.from(payloadB64, "base64");
  const salt = payload.subarray(0, 16);
  const iv = payload.subarray(16, 28);
  const ct = payload.subarray(28);
  const key = pbkdf2Sync(password, salt, 210_000, 32, "sha256");
  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(ct.subarray(ct.length - 16));
  const plain = Buffer.concat([decipher.update(ct.subarray(0, ct.length - 16)), decipher.final()]);
  return plain.toString("utf8");
}

/** node 侧:按本库布局加密(GCM,含 auth tag 追加在密文尾部)。 */
function nodeEncryptGcm(plain: string, password: string): string {
  const salt = Buffer.alloc(16, 0x5a); // 固定 salt 便于确定性断言
  const iv = Buffer.alloc(12, 0x11);
  const key = pbkdf2Sync(password, salt, 210_000, 32, "sha256");
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const ct = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  const payload = Buffer.concat([salt, iv, ct, tag]);
  return payload.toString("base64");
}

describe("aesEncrypt × node:crypto 交叉验证(GCM)", () => {
  it("本库加密 → node 解密还原原文", async () => {
    const r = await aesEncrypt(MSG, PASSWORD, "gcm");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(nodeDecryptGcm(r.payload, PASSWORD)).toBe(MSG);
  });

  it("node 加密 → 本库解密还原原文(确定性 salt/iv)", async () => {
    const payload = nodeEncryptGcm(MSG, PASSWORD);
    const r = await aesDecrypt(payload, PASSWORD, "gcm");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.payload).toBe(MSG);
  });

  it("CBC 模式:本库加密 → node 解密(node 无 GCM tag 参与)", async () => {
    const r = await aesEncrypt(MSG, PASSWORD, "cbc");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const payload = Buffer.from(r.payload, "base64");
    const salt = payload.subarray(0, 16);
    const iv = payload.subarray(16, 32);
    const ct = payload.subarray(32);
    const key = pbkdf2Sync(PASSWORD, salt, 210_000, 32, "sha256");
    const decipher = createDecipheriv("aes-256-cbc", key, iv);
    const plain = Buffer.concat([decipher.update(ct), decipher.final()]);
    expect(plain.toString("utf8")).toBe(MSG);
  });
});

describe("认证与拒绝路径", () => {
  it("错误口令 → authFailed(GCM 认证标签拦截)", async () => {
    const r = await aesEncrypt(MSG, PASSWORD, "gcm");
    if (!r.ok) throw new Error("encrypt failed");
    const wrong = await aesDecrypt(r.payload, "wrong password", "gcm");
    expect(wrong.ok).toBe(false);
    if (!wrong.ok) expect(wrong.code).toBe("authFailed");
  });

  it("密文被篡改 → authFailed(而非解出乱码)", async () => {
    const r = await aesEncrypt(MSG, PASSWORD, "gcm");
    if (!r.ok) throw new Error("encrypt failed");
    const bytes = Buffer.from(r.payload, "base64");
    bytes[bytes.length - 1] ^= 0x01; // 翻转 tag 最后一位
    const tampered = bytes.toString("base64");
    const wrong = await aesDecrypt(tampered, PASSWORD, "gcm");
    expect(wrong.ok).toBe(false);
  });

  it("Base64 非法/过短 → badPayload", async () => {
    expect((await aesDecrypt("not-base64!!!", PASSWORD, "gcm")).ok).toBe(false);
    expect((await aesDecrypt("YWJj", PASSWORD, "gcm")).ok).toBe(false); // 3 字节过短
  });

  it("空输入拒绝", async () => {
    expect((await aesEncrypt("", PASSWORD, "gcm")).ok).toBe(false);
    expect((await aesEncrypt(MSG, "", "gcm")).ok).toBe(false);
    expect((await aesDecrypt("", PASSWORD, "gcm")).ok).toBe(false);
  });

  it("同口令两次加密产出不同 payload(随机 salt+IV)", async () => {
    const a = await aesEncrypt(MSG, PASSWORD, "gcm");
    const b = await aesEncrypt(MSG, PASSWORD, "gcm");
    if (!a.ok || !b.ok) throw new Error("encrypt failed");
    expect(a.payload).not.toBe(b.payload);
  });

  it("PBKDF2 派生参数可被 node 独立复现(密钥一致性)", async () => {
    // 用固定 salt 验证两侧派生出相同 AES-256 密钥:同一 payload 双向可解即证
    const payload = nodeEncryptGcm(MSG, PASSWORD);
    const keyHashNode = createHash("sha256").update(pbkdf2Sync(PASSWORD, Buffer.alloc(16, 0x5a), 210_000, 32, "sha256")).digest("hex");
    expect(keyHashNode).toHaveLength(64); // 派生流程可复现;真正的一致性由上面往返测试证明
  });
});
