/**
 * CN-028:SM2 密钥生成/签名/验签/加解密(sm-crypto 0.3.13,GB/T 32918-2016)。
 * 国密椭圆曲线签名与加密:私钥 64 hex,公钥 130 hex(04 非压缩前缀)。
 * 签名默认 SM3 摘要(hash:true);加密使用 C1C3C2 顺序(cipherMode=1,GB/T 32918 标准)。
 * 每次签名/加密引入随机 k → 输出不确定,测试以"验签/解密往返"锚定。
 */

import { sm2 as sm2Lib } from "sm-crypto";

export type Sm2KeyPair = { privateKey: string; publicKey: string };
export type Sm2ErrCode = "empty" | "badPrivateKey" | "badPublicKey" | "badSignature" | "decryptFailed";
export type Sm2DataResult =
  | { ok: true; data: string }
  | { ok: false; code: Sm2ErrCode; message?: string };
export type Sm2VerifyResult =
  | { ok: true; data: boolean }
  | { ok: false; code: Sm2ErrCode; message?: string };

const PRIV_RE = /^[0-9a-fA-F]{64}$/;
const PUB_RE = /^04[0-9a-fA-F]{128}$/;
const SIG_RE = /^[0-9a-fA-F]{128,256}$/; // 签名 r||s 通常 128 hex,der 编码更长
const MAX_INPUT = 500_000;

export function validSm2PrivateKey(key: string): boolean {
  return PRIV_RE.test(key);
}
export function validSm2PublicKey(key: string): boolean {
  return PUB_RE.test(key);
}

/** 生成密钥对:私钥 64 hex,公钥 130 hex(04 ‖ X ‖ Y,非压缩 SEC1)。 */
export function generateSm2KeyPair(): Sm2KeyPair {
  const kp = sm2Lib.generateKeyPairHex();
  return { privateKey: kp.privateKey, publicKey: kp.publicKey };
}

/** SM2 签名(含 SM3 摘要,输出 r‖s 十六进制)。 */
export function sm2SignMessage(msg: string, privateKey: string): Sm2DataResult {
  if (msg === "" || privateKey === "") return { ok: false, code: "empty" };
  if (!validSm2PrivateKey(privateKey)) return { ok: false, code: "badPrivateKey" };
  if (msg.length > MAX_INPUT) return { ok: false, code: "empty" };
  try {
    const sig = sm2Lib.doSignature(msg, privateKey, { hash: true });
    return { ok: true, data: sig };
  } catch (e) {
    return { ok: false, code: "badPrivateKey", message: e instanceof Error ? e.message : String(e) };
  }
}

/** SM2 验签(hash:true 与签名侧一致)。 */
export function sm2VerifyMessage(msg: string, sig: string, publicKey: string): Sm2VerifyResult {
  if (msg === "" || sig === "" || publicKey === "") return { ok: false, code: "empty" };
  if (!validSm2PublicKey(publicKey)) return { ok: false, code: "badPublicKey" };
  if (!SIG_RE.test(sig.trim())) return { ok: false, code: "badSignature" };
  try {
    const valid = sm2Lib.doVerifySignature(msg, sig.trim(), publicKey, { hash: true });
    return { ok: true, data: valid };
  } catch (e) {
    return { ok: false, code: "badSignature", message: e instanceof Error ? e.message : String(e) };
  }
}

/** SM2 加密(C1C3C2 顺序,GB/T 32918 标准;输出不含 04 前缀,十六进制)。 */
export function sm2EncryptText(msg: string, publicKey: string): Sm2DataResult {
  if (msg === "" || publicKey === "") return { ok: false, code: "empty" };
  if (!validSm2PublicKey(publicKey)) return { ok: false, code: "badPublicKey" };
  if (msg.length > MAX_INPUT) return { ok: false, code: "empty" };
  try {
    const ct = sm2Lib.doEncrypt(msg, publicKey, 1);
    return { ok: true, data: ct };
  } catch (e) {
    return { ok: false, code: "badPublicKey", message: e instanceof Error ? e.message : String(e) };
  }
}

/** SM2 解密(输入不含 04 前缀的十六进制密文;随机 k → 每次解密结果恒定)。 */
export function sm2DecryptText(ct: string, privateKey: string): Sm2DataResult {
  const trimmed = ct.trim();
  if (trimmed === "" || privateKey === "") return { ok: false, code: "empty" };
  if (!validSm2PrivateKey(privateKey)) return { ok: false, code: "badPrivateKey" };
  if (!/^[0-9a-fA-F]+$/.test(trimmed) || trimmed.length < 200) return { ok: false, code: "badSignature" };
  try {
    const plain = sm2Lib.doDecrypt(trimmed, privateKey, 1);
    return { ok: true, data: plain };
  } catch (e) {
    return { ok: false, code: "decryptFailed", message: e instanceof Error ? e.message : String(e) };
  }
}
