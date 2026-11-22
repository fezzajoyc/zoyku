import { describe, expect, it } from "vitest";
import {
  generateSm2KeyPair,
  sm2SignMessage,
  sm2VerifyMessage,
  sm2EncryptText,
  sm2DecryptText,
  validSm2PrivateKey,
  validSm2PublicKey,
} from "@/tools/_lib/sm2-cipher";

/**
 * CN-028 SM2。锚 = GB/T 32918-2016 算法一致性:
 * SM2 含随机 k,输出每次不同——锚定方式是属性化验证(格式/往返/篡改拒绝/跨钥失败),
 * 而非固定向量。密钥格式符合 SEC1 非压缩点(04 ‖ X ‖ Y)。
 */

describe("密钥对生成与格式", () => {
  it("私钥 64 hex / 公钥 130 hex 且 04 前缀(SEC1 非压缩点)", () => {
    const kp = generateSm2KeyPair();
    expect(kp.privateKey).toMatch(/^[0-9a-f]{64}$/);
    expect(kp.publicKey).toMatch(/^04[0-9a-f]{128}$/);
    expect(validSm2PrivateKey(kp.privateKey)).toBe(true);
    expect(validSm2PublicKey(kp.publicKey)).toBe(true);
  });

  it("两次生成的密钥对不同(随机性)", () => {
    const a = generateSm2KeyPair();
    const b = generateSm2KeyPair();
    expect(a.privateKey).not.toBe(b.privateKey);
  });

  it("非法密钥格式拒绝", () => {
    expect(validSm2PrivateKey("short")).toBe(false);
    expect(validSm2PublicKey("02" + "a".repeat(128))).toBe(false); // 压缩前缀不接受
    expect(validSm2PublicKey("04" + "g".repeat(128))).toBe(false);
  });
});

describe("签名与验签", () => {
  const kp = generateSm2KeyPair();
  const MSG = "zoyku sm2 签名测试 2026-11-23";

  it("签名 → 验签通过", () => {
    const r = sm2SignMessage(MSG, kp.privateKey);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const sig = r.data as string;
    expect(sig).toMatch(/^[0-9a-f]+$/);
    const v = sm2VerifyMessage(MSG, sig, kp.publicKey);
    expect(v.ok).toBe(true);
    if (v.ok) expect(v.data).toBe(true);
  });

  it("消息篡改 → 验签拒绝", () => {
    const r = sm2SignMessage(MSG, kp.privateKey);
    if (!r.ok) throw new Error("sign failed");
    const v = sm2VerifyMessage(MSG + "x", r.data as string, kp.publicKey);
    expect(v.ok).toBe(true);
    if (v.ok) expect(v.data).toBe(false);
  });

  it("签名篡改 → 验签拒绝", () => {
    const r = sm2SignMessage(MSG, kp.privateKey);
    if (!r.ok) throw new Error("sign failed");
    const sig = r.data as string;
    const flipped = sig.slice(0, -2) + (sig.slice(-2) === "00" ? "11" : "00");
    const v = sm2VerifyMessage(MSG, flipped, kp.publicKey);
    expect(v.ok).toBe(true);
    if (v.ok) expect(v.data).toBe(false);
  });

  it("随机 k:同消息两次签名不同,验签都通过", () => {
    const s1 = sm2SignMessage(MSG, kp.privateKey);
    const s2 = sm2SignMessage(MSG, kp.privateKey);
    if (!s1.ok || !s2.ok) throw new Error("sign failed");
    expect(s1.data).not.toBe(s2.data);
    for (const sig of [s1.data as string, s2.data as string]) {
      const v = sm2VerifyMessage(MSG, sig, kp.publicKey);
      if (v.ok) expect(v.data).toBe(true);
    }
  });

  it("错误公钥 → 验签 false", () => {
    const kp2 = generateSm2KeyPair();
    const r = sm2SignMessage(MSG, kp.privateKey);
    if (!r.ok) throw new Error("sign failed");
    const v = sm2VerifyMessage(MSG, r.data as string, kp2.publicKey);
    if (v.ok) expect(v.data).toBe(false);
  });
});

describe("加密与解密(C1C3C2)", () => {
  const kp = generateSm2KeyPair();
  const MSG = "国密 SM2 加密往返 🔐 2026";

  it("加密 → 解密还原原文(含中文与 emoji)", async () => {
    const r = sm2EncryptText(MSG, kp.publicKey);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.data).toMatch(/^[0-9a-f]+$/);
    const d = sm2DecryptText(r.data, kp.privateKey);
    expect(d.ok).toBe(true);
    if (d.ok) expect(d.data).toBe(MSG);
  });

  it("随机 k:同明文两次密文不同,均可解密", () => {
    const c1 = sm2EncryptText(MSG, kp.publicKey);
    const c2 = sm2EncryptText(MSG, kp.publicKey);
    if (!c1.ok || !c2.ok) throw new Error("encrypt failed");
    expect(c1.data).not.toBe(c2.data);
    const d1 = sm2DecryptText(c1.data, kp.privateKey);
    const d2 = sm2DecryptText(c2.data, kp.privateKey);
    expect(d1.ok && d2.ok).toBe(true);
    if (d1.ok && d2.ok) {
      expect(d1.data).toBe(MSG);
      expect(d2.data).toBe(MSG);
    }
  });

  it("错误私钥 → 解密失败或乱码(非原文)", async () => {
    const kp2 = generateSm2KeyPair();
    const r = sm2EncryptText(MSG, kp.publicKey);
    if (!r.ok) throw new Error("encrypt failed");
    const d = sm2DecryptText(r.data, kp2.privateKey);
    if (d.ok) expect(d.data).not.toBe(MSG);
    else expect(["decryptFailed", "badSignature"]).toContain(d.code);
  });

  it("公钥缺 04 前缀拒绝", () => {
    const r = sm2EncryptText(MSG, kp.publicKey.slice(2));
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("badPublicKey");
  });
});
