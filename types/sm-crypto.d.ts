/** sm-crypto 0.3.13 无官方类型;只声明本仓用到的面。 */
declare module "sm-crypto" {
  /** SM3 消息摘要(GB/T 32905-2016)。输入 UTF-8 字符串或字节数组,返回小写十六进制。 */
  export function sm3(msg: string | number[], pad?: unknown, mode?: unknown): string;
  export const sm2: Record<string, unknown>;
  export const sm4: Record<string, unknown>;
}
