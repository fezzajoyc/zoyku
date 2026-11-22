/** sm-crypto 0.3.13 无官方类型;只声明本仓用到的面。 */
declare module "sm-crypto" {
  /** SM3 消息摘要(GB/T 32905-2016)。输入 UTF-8 字符串或字节数组,返回小写十六进制。 */
  export function sm3(msg: string | number[], pad?: unknown, mode?: unknown): string;
  export const sm2: Record<string, unknown>;

  /** SM4 块加密(GB/T 32907-2016)。字符串输入按 UTF-8 字节;字节数组输入为原始块。 */
  export interface Sm4Options {
    padding?: "pkcs#5" | "pkcs#7" | "none";
    mode?: "ecb" | "cbc";
    iv?: string | number[];
  }
  export const sm4: {
    encrypt(msg: string | number[], key: string, opts?: Sm4Options): string;
    decrypt(msg: string, key: string, opts?: Sm4Options): string | number[];
    encryptHex?(msg: string | number[], key: string, opts?: Sm4Options): string;
  };
}
