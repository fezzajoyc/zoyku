/**
 * CN-031:IPv6 地址压缩与展开(RFC 5952 规范化,纯 TS 零依赖)。
 * 展开:8 组 4 位十六进制全写;压缩:RFC 5952 规范(最长零段缩为 ::、小写、去前导零、仅首个零段缩写)。
 * 锚 = Python ipaddress.IPv6Address(compressed/exploded,2026-11-23 生成)。
 */

export type Ipv6Result =
  | { ok: true; compressed: string; expanded: string }
  | { ok: false; code: "empty" | "badFormat"; message?: string };

const GROUP_RE = /^[0-9a-fA-F]{1,4}$/;

/** 解析 IPv6 地址为 8 组 16 位数值(支持 :: 缩写与 IPv4 映射尾部)。 */
function parseGroups(input: string): number[] | null {
  let s = input.trim();
  // 去方括号与区号(zone index)
  if (s.startsWith("[")) s = s.slice(1, s.endsWith("]") ? -1 : undefined);
  const pct = s.indexOf("%");
  if (pct > 0) s = s.slice(0, pct);
  if (s === "") return null;

  // IPv4 映射尾部(::ffff:192.168.1.1)
  let v4Tail: number[] | null = null; // 2 个 16 位组
  const lastColon = s.lastIndexOf(":");
  if (s.slice(lastColon + 1).includes(".")) {
    const parts = s.slice(lastColon + 1).split(".");
    if (parts.length !== 4) return null;
    const octets: number[] = [];
    for (const p of parts) {
      const n = Number(p);
      if (!Number.isInteger(n) || n < 0 || n > 255) return null;
      octets.push(n);
    }
    v4Tail = [(octets[0] << 8) | octets[1], (octets[2] << 8) | octets[3]];
    s = s.slice(0, lastColon + 1);
    if (s.endsWith(":")) s = s.slice(0, -1); // 留给 :: 处理
  }

  const dbl = s.indexOf("::");
  if (dbl >= 0) {
    if (s.indexOf("::", dbl + 2) >= 0) return null; // 多个 ::
    const left = dbl === 0 ? [] : s.slice(0, dbl).split(":");
    const right = dbl + 2 >= s.length ? [] : s.slice(dbl + 2).split(":");
    if (left.some((g) => !GROUP_RE.test(g)) || right.some((g) => !GROUP_RE.test(g))) return null;
    const leftN = left.map((g) => parseInt(g, 16));
    const rightN = right.map((g) => parseInt(g, 16));
    const v4Groups = v4Tail ? 2 : 0;
    const fill = 8 - leftN.length - rightN.length - v4Groups;
    if (fill < (left.length === 0 && right.length === 0 ? 7 : 0)) return null;
    if (leftN.length + rightN.length + v4Groups > 8) return null;
    const groups = [...leftN, ...Array(fill).fill(0), ...rightN];
    if (v4Tail) groups.push(v4Tail[0], v4Tail[1]);
    if (groups.length !== 8) return null;
    return groups;
  }

  // 无 :: 的完整形式
  const parts = s.split(":");
  if (parts.length !== 8) return null;
  if (parts.some((g) => !GROUP_RE.test(g))) return null;
  const groups = parts.map((g) => parseInt(g, 16));
  if (v4Tail) return null; // IPv4 尾部必须配 ::
  return groups;
}

function groupsToExpanded(groups: number[]): string {
  return groups.map((g) => g.toString(16).padStart(4, "0")).join(":");
}

/** RFC 5952 规范化压缩:最长零段(≥2)缩为 ::,首段优先,小写,去前导零。 */
function compressGroups(groups: number[]): string {
  // RFC 5952 §5:IPv4 映射地址(::ffff:0:0/96)末尾 32 位用点分记法
  if (groups[0] === 0 && groups[1] === 0 && groups[2] === 0 && groups[3] === 0 && groups[4] === 0 && groups[5] === 0xffff) {
    const b3 = (groups[6] >> 8) & 0xff, b4 = groups[6] & 0xff;
    const b5 = (groups[7] >> 8) & 0xff, b6 = groups[7] & 0xff;
    return `::ffff:${b3}.${b4}.${b5}.${b6}`;
  }
  const hexes = groups.map((g) => g.toString(16));
  // 找最长全零段(≥2 组)
  let bestStart = -1;
  let bestLen = 0;
  let curStart = -1;
  let curLen = 0;
  for (let i = 0; i < hexes.length; i++) {
    if (hexes[i] === "0") {
      if (curStart < 0) curStart = i;
      curLen++;
    } else {
      if (curLen > bestLen) { bestLen = curLen; bestStart = curStart; }
      curStart = -1;
      curLen = 0;
    }
  }
  if (curLen > bestLen) { bestLen = curLen; bestStart = curStart; }

  if (bestLen < 2) return hexes.join(":");

  const left = hexes.slice(0, bestStart).join(":");
  const right = hexes.slice(bestStart + bestLen).join(":");
  if (left === "") return "::" + right;
  if (right === "") return left + "::";
  return left + "::" + right;
}

/** 展开:输入任意合法 IPv6 → 完整 8 组形式 + RFC 5952 压缩形式。 */
export function ipv6Expand(input: string): Ipv6Result {
  if (input.trim() === "") return { ok: false, code: "empty" };
  const groups = parseGroups(input);
  if (!groups) return { ok: false, code: "badFormat" };
  return { ok: true, compressed: compressGroups(groups), expanded: groupsToExpanded(groups) };
}

/** 压缩:输入任意合法 IPv6 → RFC 5952 规范形式(便捷别名)。 */
export function ipv6Compress(input: string): Ipv6Result {
  return ipv6Expand(input);
}

/** 校验:输入是否为合法 IPv6。 */
export function isIPv6(input: string): boolean {
  const groups = parseGroups(input);
  return groups !== null && groups.length === 8;
}

/** 展开值的 HexBase64 辅助(测试断言用)。 */
export function ipv6ToBinaryString(input: string): string | null {
  const groups = parseGroups(input);
  if (!groups) return null;
  return groups.map((g) => g.toString(2).padStart(16, "0")).join("");
}
