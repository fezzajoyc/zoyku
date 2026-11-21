/**
 * WiFi 二维码载荷构建(G22):按 ZXing/Android Wi-Fi QR 约定生成
 * `WIFI:T:<安全>;S:<SSID>;P:<密码>;H:<隐藏>;;` 形式。
 *
 * 转义规则:`\` `;` `,` `:` `"` 五个字符前加反斜杠;反斜杠本身先转义。
 * - nopass 不输出 P 字段;WPA/WEP 必须有密码(诚实校验,不静默置空)。
 * - SSID 非空必填;隐藏网络输出 `H:true`。
 * 参考:Android 官方 QR 码生成器与 ZXing WifiTlvParsedResult 的解析规则。
 */

export type WifiSecurity = "WPA" | "WEP" | "nopass";

export type WifiQrResult =
  | { ok: true; payload: string }
  | { ok: false; code: "emptySsid" | "passwordRequired" };

export type WifiQrInput = {
  ssid: string;
  password?: string;
  security: WifiSecurity;
  hidden: boolean;
};

/** 按规范转义五个特殊字符;反斜杠最先处理避免二次转义。 */
export function escapeWifiField(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/([;,:"])/g, "\\$1");
}

export function buildWifiPayload(input: WifiQrInput): WifiQrResult {
  const ssid = input.ssid.trim();
  if (ssid === "") return { ok: false, code: "emptySsid" };
  const password = input.password ?? "";
  if (input.security !== "nopass" && password === "") {
    return { ok: false, code: "passwordRequired" };
  }
  const parts = [`T:${input.security}`, `S:${escapeWifiField(ssid)}`];
  if (input.security !== "nopass") parts.push(`P:${escapeWifiField(password)}`);
  if (input.hidden) parts.push("H:true");
  return { ok: true, payload: `WIFI:${parts.join(";")};;` };
}
