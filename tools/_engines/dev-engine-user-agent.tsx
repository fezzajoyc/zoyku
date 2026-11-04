"use client";

import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { parseUserAgent } from "../_lib/user-agent";

/**
 * User-Agent 解析器:浏览器/版本、引擎、OS/版本、设备类型。
 * 输入为空时用当前 navigator.userAgent 作示例。
 */

const LABELS: Record<string, Record<string, string>> = {
  input: { en: "User-Agent string (empty = your current browser)", zh: "User-Agent 字符串(留空 = 当前浏览器)", ja: "User-Agent 文字列(空欄 = 現在のブラウザ)", es: "Cadena User-Agent (vacío = tu navegador actual)", pt: "String User-Agent (vazio = seu navegador atual)" },
  browser: { en: "Browser", zh: "浏览器", ja: "ブラウザ", es: "Navegador", pt: "Navegador" },
  engine: { en: "Rendering engine", zh: "渲染引擎", ja: "レンダリングエンジン", es: "Motor de renderizado", pt: "Motor de renderização" },
  os: { en: "Operating system", zh: "操作系统", ja: "OS", es: "Sistema operativo", pt: "Sistema operacional" },
  device: { en: "Device type", zh: "设备类型", ja: "デバイス種別", es: "Tipo de dispositivo", pt: "Tipo de dispositivo" },
  desktop: { en: "Desktop", zh: "桌面", ja: "デスクトップ", es: "Escritorio", pt: "Desktop" },
  mobile: { en: "Mobile", zh: "移动", ja: "モバイル", es: "Móvil", pt: "Celular" },
  tablet: { en: "Tablet", zh: "平板", ja: "タブレット", es: "Tableta", pt: "Tablet" },
  bot: { en: "Bot / crawler", zh: "爬虫 / Bot", ja: "ボット / クローラー", es: "Bot / rastreador", pt: "Bot / rastreador" },
  unknown: { en: "Unknown", zh: "未知", ja: "不明", es: "Desconocido", pt: "Desconhecido" },
};

export function DevEngineUserAgentParser() {
  const { locale } = useI18n();
  const L = (k: string) => LABELS[k]?.[locale] ?? LABELS[k]?.en ?? k;
  const [ua, setUa] = useState("");

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.userAgent) setUa(navigator.userAgent);
  }, []);

  const r = useMemo(() => parseUserAgent(ua), [ua]);
  const deviceLabel = L(r.device);

  const rows: [string, string][] = [
    [L("browser"), r.browserVersion ? `${r.browser} ${r.browserVersion}` : r.browser],
    [L("engine"), r.engineVersion ? `${r.engine} ${r.engineVersion}` : r.engine],
    [L("os"), r.osVersion ? `${r.os} ${r.osVersion}` : r.os],
    [L("device"), deviceLabel],
  ];

  return (
    <ToolPanel>
      <div className="space-y-4">
        <textarea
          className="field mono"
          rows={4}
          value={ua}
          onChange={(e) => setUa(e.target.value)}
          placeholder={L("input")}
          spellCheck={false}
          aria-label={L("input")}
        />

        <div className="grid gap-3 sm:grid-cols-2">
          {rows.map(([label, value]) => (
            <div key={label} className="rounded-xl bg-[var(--color-surface)] px-4 py-3">
              <p className="mb-0.5 text-[12.5px] font-medium text-[var(--color-sub)]">{label}</p>
              <p className="mono break-all text-[15px] font-semibold">{value || L("unknown")}</p>
            </div>
          ))}
        </div>

        <p className="break-all rounded-lg border hairline px-3 py-2 text-[12.5px] leading-5 text-[var(--color-sub)]">
          <span className="mono">{ua}</span>
        </p>
      </div>
    </ToolPanel>
  );
}
