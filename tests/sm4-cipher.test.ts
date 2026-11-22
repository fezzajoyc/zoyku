import { describe, expect, it } from "vitest";
import { sm4Encrypt, sm4Decrypt, sm4EncryptBlockRaw, SM4_SPEC_VECTOR } from "@/tools/_lib/sm4-cipher";

/**
 * CN-027 SM4。锚 = GB/T 32907-2016 附录 A 标准向量:
 * key=plaintext=0123456789abcdeffedcba9876543210 → 681edf34d206965e86b3e94f536e4246
 * (向量值经实现复现 + 联网检索双确认;来源 irs 式不靠记忆)
 */

const KEY = "0123456789abcdeffedcba9876543210";
const KEY2 = "fedcba98765432100123456789abcdef";

describe("标准向量(块级,无填充)", () => {
  it("GB/T 32907-2016 附录 A:key=plaintext → 681edf34…", () => {
    const ct = sm4EncryptBlockRaw(Array.from(SM4_SPEC_VECTOR.plaintext), SM4_SPEC_VECTOR.key);
    expect(ct).toBe(SM4_SPEC_VECTOR.ciphertext);
  });

  // 注:字节级解密往返不测——sm-crypto 的解密字符串返回经 UTF-8 路径有损(非 UTF-8 字节序列被变换),
  // 测的是库内部转换而非本仓代码。规范正确性由加密方向向量锚定;解密正确性由 UTF-8 文本往返锚定。
});

describe("文本往返(UTF-8)", () => {
  it("ECB:中文+emoji+ASCII 往返一致", async () => {
    const text = "中文 SM4 测试 🔐 zoyku";
    const r = await sm4Encrypt(text, KEY, "ecb");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.data).toMatch(/^[0-9a-f]+$/);
    const back = await sm4Decrypt(r.data, KEY, "ecb");
    expect(back.ok).toBe(true);
    if (back.ok) expect(back.data).toBe(text);
  });

  it("CBC:带 IV 往返一致", async () => {
    const iv = KEY2;
    const r = await sm4Encrypt("国密分组密码", KEY, "cbc", iv);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const back = await sm4Decrypt(r.data, KEY, "cbc", iv);
    expect(back.ok).toBe(true);
    if (back.ok) expect(back.data).toBe("国密分组密码");
  });

  it("不同密钥解出不同内容(ECB 无认证,输出非原文即可)", async () => {
    const r = await sm4Encrypt("secret", KEY, "ecb");
    if (!r.ok) throw new Error("enc failed");
    const wrong = await sm4Decrypt(r.data, KEY2, "ecb");
    // ECB 无认证:错误密钥可能解出垃圾或填充错误——两种都算"未还原原文"
    if (wrong.ok) expect(wrong.data).not.toBe("secret");
    else expect(wrong.code).toBe("decryptFailed");
  });
});

describe("拒绝路径", () => {
  it("密钥非法:非 hex / 长度错", async () => {
    expect((await sm4Encrypt("x", "short", "ecb")).ok).toBe(false);
    expect((await sm4Encrypt("x", "zz23456789abcdeffedcba9876543210", "ecb")).ok).toBe(false);
    expect((await sm4Encrypt("x", KEY + "00", "ecb")).ok).toBe(false);
  });

  it("CBC 缺 IV / IV 非法", async () => {
    expect((await sm4Encrypt("x", KEY, "cbc")).ok).toBe(false);
    expect((await sm4Encrypt("x", KEY, "cbc", "short")).ok).toBe(false);
  });

  it("密文非 hex / 长度非 16 字节倍数 → badInput", async () => {
    expect((await sm4Decrypt("xyz", KEY, "ecb")).ok).toBe(false);
    expect((await sm4Decrypt("aabb", KEY, "ecb")).ok).toBe(false);
  });

  it("空输入拒绝", async () => {
    expect((await sm4Encrypt("", KEY, "ecb")).ok).toBe(false);
    expect((await sm4Decrypt("", KEY, "ecb")).ok).toBe(false);
  });
});
