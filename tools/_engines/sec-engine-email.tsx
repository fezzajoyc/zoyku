"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { Icon } from "@/components/icons";
import { ToolPanel } from "@/components/ui";

/**
 * 邮箱校验器 —— 两段式:
 *  1) 语法检查 100% 本地(长度、local part、域名标签、TLD);
 *  2) MX 检查通过 DNS-over-HTTPS(dns.google)联网查询域名邮件记录,带 A 记录回退。
 *  3) 常见域名拼写纠错(本地编辑距离)。
 * UI 顶部与结果区都要披露"域名部分会联网查询"。
 */

const LABELS: Record<string, Record<string, string>> = {
  placeholder: {
    en: "name@example.com",
    zh: "name@example.com",
    ja: "name@example.com",
    es: "name@example.com",
    pt: "name@example.com",
  },
  validate: { en: "Validate", zh: "校验", ja: "検証", es: "Validar", pt: "Validar" },
  checking: { en: "Checking…", zh: "检测中…", ja: "確認中…", es: "Comprobando…", pt: "Verificando…" },
  disclosure: {
    en: "Network notice: only the domain (the part after the @) is sent to Google's public DNS (dns.google) over HTTPS to check its mail records. The full address and the part before the @ never leave your browser.",
    zh: "联网说明:校验时仅将域名(@ 之后的部分)通过 HTTPS 发送到 Google 公共 DNS(dns.google)查询邮件记录;完整邮箱地址和 @ 之前的部分不会离开你的浏览器。",
    ja: "ネットワーク利用について:検証時はドメイン部分(@ の右側)だけが HTTPS 経由で Google Public DNS(dns.google)に送信され、メールレコードを確認します。メールアドレス全体や @ の左側はブラウザの外に出ません。",
    es: "Aviso de red: solo el dominio (la parte tras la @) se envía por HTTPS al DNS público de Google (dns.google) para comprobar sus registros de correo. La dirección completa y la parte anterior a la @ nunca salen de tu navegador.",
    pt: "Aviso de rede: apenas o domínio (a parte depois do @) é enviado por HTTPS ao DNS público do Google (dns.google) para verificar os registros de e-mail. O endereço completo e a parte antes do @ nunca saem do seu navegador.",
  },
  syntax: { en: "Syntax", zh: "语法格式", ja: "書式", es: "Sintaxis", pt: "Sintaxe" },
  syntaxOk: {
    en: "Valid email format",
    zh: "邮箱格式有效",
    ja: "メールアドレスの書式は有効です",
    es: "Formato de correo válido",
    pt: "Formato de e-mail válido",
  },
  syntaxBad: {
    en: "This is not a valid email format.",
    zh: "这不是有效的邮箱格式。",
    ja: "有効なメールアドレスの形式ではありません。",
    es: "Este no es un formato de correo válido.",
    pt: "Este não é um formato de e-mail válido.",
  },
  typo: { en: "Common-domain check", zh: "常见域名比对", ja: "主要ドメインのチェック", es: "Comprobación de dominio común", pt: "Verificação de domínio comum" },
  typoOk: {
    en: "No typo detected in the domain.",
    zh: "未发现域名拼写错误。",
    ja: "ドメインに誤字は見つかりませんでした。",
    es: "No se detectaron errores en el dominio.",
    pt: "Nenhum erro de digitação detectado no domínio.",
  },
  typoSuggest: {
    en: "Did you mean {suggestion}?",
    zh: "你是不是想输入 {suggestion}?",
    ja: "{suggestion} の間違いではありませんか?",
    es: "¿Quisiste decir {suggestion}?",
    pt: "Você quis dizer {suggestion}?",
  },
  mx: { en: "Mail servers (MX)", zh: "邮件服务器(MX)", ja: "メールサーバー(MX)", es: "Servidores de correo (MX)", pt: "Servidores de e-mail (MX)" },
  mxOk: {
    en: "This domain can receive email.",
    zh: "该域名可以接收邮件。",
    ja: "このドメインはメールを受信できます。",
    es: "Este dominio puede recibir correos.",
    pt: "Este domínio pode receber e-mails.",
  },
  mxNone: {
    en: "No MX records found.",
    zh: "未找到 MX 记录。",
    ja: "MX レコードが見つかりません。",
    es: "No se encontraron registros MX.",
    pt: "Nenhum registro MX encontrado.",
  },
  mxAFallback: {
    en: "No MX records, but the domain has an A record — some servers still accept mail this way.",
    zh: "没有 MX 记录,但该域名有 A 记录——部分服务器仍可能通过这种方式收信。",
    ja: "MX レコードはありませんが、A レコードはあります。この方式でメールを受け付けるサーバーもあります。",
    es: "Sin registros MX, pero el dominio tiene registro A: algunos servidores aún aceptan correo así.",
    pt: "Sem registros MX, mas o domínio tem um registro A — alguns servidores ainda aceitam e-mail assim.",
  },
  mxNull: {
    en: "This domain explicitly publishes that it accepts no mail (null MX).",
    zh: "该域名明确声明不接收任何邮件(null MX)。",
    ja: "このドメインはメールを受け付けないと明示しています(null MX)。",
    es: "Este dominio indica explícitamente que no acepta correo (null MX).",
    pt: "Este domínio declara explicitamente que não aceita e-mail (null MX).",
  },
  enterFirst: {
    en: "Enter an email address and press Validate.",
    zh: "输入邮箱地址后点击校验。",
    ja: "メールアドレスを入力して「検証」を押してください。",
    es: "Introduce un correo y pulsa Validar.",
    pt: "Digite um e-mail e clique em Validar.",
  },
  summaryGood: {
    en: "Looks deliverable",
    zh: "看起来可以投递",
    ja: "配信できそうです",
    es: "Parece entregable",
    pt: "Parece entregável",
  },
  summaryBad: {
    en: "Problems found",
    zh: "发现问题",
    ja: "問題が見つかりました",
    es: "Problemas encontrados",
    pt: "Problemas encontrados",
  },
  networkError: {
    en: "The DNS query failed. Check your connection and try again.",
    zh: "DNS 查询失败,请检查网络连接后重试。",
    ja: "DNS 問い合わせに失敗しました。接続を確認して再試行してください。",
    es: "La consulta DNS falló. Comprueba tu conexión e inténtalo de nuevo.",
    pt: "A consulta DNS falhou. Verifique sua conexão e tente novamente.",
  },
  priority: { en: "priority", zh: "优先级", ja: "優先度", es: "prioridad", pt: "prioridade" },
};

const COMMON_DOMAINS = [
  "gmail.com", "googlemail.com", "outlook.com", "hotmail.com", "live.com", "msn.com",
  "yahoo.com", "icloud.com", "me.com", "aol.com", "proton.me", "protonmail.com",
  "hey.com", "fastmail.com", "zoho.com", "yandex.com", "gmx.com", "mail.com",
  "qq.com", "163.com", "126.com",
];

/** 语法检查:全部本地。宽松但实用的 RFC 5321/5322 近似。 */
function checkSyntax(email: string): boolean {
  const s = email.trim();
  if (s.length === 0 || s.length > 254) return false;
  const at = s.lastIndexOf("@");
  if (at <= 0 || at === s.length - 1) return false;
  const local = s.slice(0, at);
  const domain = s.slice(at + 1);
  // local part
  if (local.length > 64) return false;
  if (!/^[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-]+$/.test(local)) return false;
  if (local.startsWith(".") || local.endsWith(".") || local.includes("..")) return false;
  // domain:小写化后逐标签校验
  const d = domain.toLowerCase();
  if (d.length > 253) return false;
  const labels = d.split(".");
  if (labels.length < 2) return false;
  const labelRe = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/;
  return labels.every((l) => l.length > 0 && l.length <= 63 && labelRe.test(l));
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (Math.abs(m - n) > 3) return 99;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(
        prev[j] + 1,
        cur[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    prev = cur;
  }
  return prev[n];
}

function findTypo(domain: string): string | null {
  let best: { d: string; dist: number } | null = null;
  for (const d of COMMON_DOMAINS) {
    const dist = levenshtein(domain, d);
    if (dist === 0) return null; // 本身就是常见域名
    if (!best || dist < best.dist) best = { d, dist };
  }
  return best && best.dist <= 2 ? best.d : null;
}

type CheckState = "idle" | "loading" | "done" | "error";

function StatusIcon({ ok, warn = false }: { ok: boolean; warn?: boolean }) {
  if (ok) {
    return <Icon name="check" size={16} className="mt-0.5 flex-none text-[var(--color-good)]" />;
  }
  if (warn) {
    return <Icon name="clock" size={16} className="mt-0.5 flex-none text-[#b8860b]" />;
  }
  return (
    <span
      aria-hidden
      className="mt-0.5 inline-flex h-4 w-4 flex-none items-center justify-center rounded-full bg-[var(--color-bad)] text-[11px] font-bold leading-none text-white"
    >
      ×
    </span>
  );
}

export function SecEmailValidatorEngine() {
  const { locale } = useI18n();
  const L = (key: string) => LABELS[key][locale] ?? LABELS[key].en;

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<CheckState>("idle");
  const [syntaxOk, setSyntaxOk] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [mxHosts, setMxHosts] = useState<string[] | null>(null);
  const [hasA, setHasA] = useState(false);
  const [netError, setNetError] = useState(false);

  const run = async () => {
    const s = email.trim();
    const ok = checkSyntax(s);
    setSyntaxOk(ok);
    setNetError(false);
    setMxHosts(null);
    setHasA(false);

    if (!ok) {
      setSuggestion(null);
      setStatus("done");
      return;
    }

    const domain = s.slice(s.lastIndexOf("@") + 1).toLowerCase();
    setSuggestion(findTypo(domain));
    setStatus("loading");
    try {
      const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=MX`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as {
        Status?: number;
        Answer?: { type: number; data: string }[];
      };
      const mx = (data.Answer ?? [])
        .filter((a) => a.type === 15)
        .map((a) => {
          const m = a.data.trim().match(/^(\d+)\s+(\S+)\.?$/);
          return m ? { prio: Number(m[1]), host: m[2] } : null;
        })
        .filter((x): x is { prio: number; host: string } => x !== null)
        .sort((a, b) => a.prio - b.prio);
      setMxHosts(mx.map((m) => m.host));

      if (mx.length === 0) {
        // RFC 5321 隐式路由回退:没有 MX 时看 A/AAAA
        const res2 = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=A`);
        const data2 = res2.ok
          ? ((await res2.json()) as { Answer?: { type: number }[] })
          : { Answer: [] as { type: number }[] };
        setHasA((data2.Answer ?? []).some((a) => a.type === 1 || a.type === 28));
      }
      setStatus("done");
    } catch {
      setNetError(true);
      setStatus("error");
    }
  };

  const deliverable = syntaxOk && mxHosts !== null && mxHosts.length > 0;
  const nullMx = mxHosts !== null && mxHosts.length === 0 && !hasA;

  return (
    <ToolPanel>
      <div className="space-y-4">
        <p className="flex items-start gap-2 rounded-xl bg-[rgba(0,113,227,0.06)] px-4 py-2.5 text-[13px] leading-5 text-[var(--color-sub)]">
          <Icon name="globe" size={15} className="mt-0.5 flex-none text-[var(--color-accent-strong)]" />
          {L("disclosure")}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && void run()}
            placeholder={L("placeholder")}
            className="field min-w-[220px] flex-1"
            spellCheck={false}
            autoComplete="off"
            aria-label={L("placeholder")}
          />
          <button
            type="button"
            onClick={() => void run()}
            disabled={status === "loading" || email.trim().length === 0}
            className="rounded-full bg-[var(--color-accent)] px-5 py-2 text-[13.5px] font-medium text-white transition-colors hover:bg-[var(--color-accent-strong)] disabled:opacity-60"
          >
            {status === "loading" ? L("checking") : L("validate")}
          </button>
        </div>

        {status === "idle" && <p className="text-[13.5px] text-[var(--color-sub)]">{L("enterFirst")}</p>}

        {status === "error" && (
          <p
            role="alert"
            className="rounded-xl bg-[rgba(178,80,0,0.08)] px-4 py-2.5 text-[13.5px] leading-6 text-[var(--color-bad)]"
          >
            {L("networkError")}
          </p>
        )}

        {status === "done" && (
          <div className="space-y-3">
            {syntaxOk && !netError && (
              <p className="inline-flex items-center gap-2 rounded-full bg-[rgba(26,127,55,0.1)] px-3.5 py-1.5 text-[13.5px] font-semibold text-[var(--color-good)]">
                <Icon name="check" size={14} />
                {deliverable ? L("summaryGood") : L("summaryBad")}
              </p>
            )}

            <dl className="space-y-3">
              <div className="flex items-start gap-2.5">
                <StatusIcon ok={syntaxOk} />
                <div className="min-w-0">
                  <dt className="text-[13.5px] font-semibold">{L("syntax")}</dt>
                  <dd className="text-[13.5px] leading-6 text-[var(--color-sub)]">
                    {syntaxOk ? L("syntaxOk") : L("syntaxBad")}
                  </dd>
                </div>
              </div>

              {syntaxOk && suggestion && (
                <div className="flex items-start gap-2.5">
                  <StatusIcon ok={false} />
                  <div className="min-w-0">
                    <dt className="text-[13.5px] font-semibold">{L("typo")}</dt>
                    <dd className="text-[13.5px] leading-6 text-[var(--color-bad)]">
                      {L("typoSuggest").replace("{suggestion}", suggestion)}
                    </dd>
                  </div>
                </div>
              )}

              {syntaxOk && mxHosts !== null && (
                <div className="flex items-start gap-2.5">
                  <StatusIcon ok={mxHosts.length > 0} warn={mxHosts.length === 0 && hasA} />
                  <div className="min-w-0">
                    <dt className="text-[13.5px] font-semibold">{L("mx")}</dt>
                    <dd className="text-[13.5px] leading-6 text-[var(--color-sub)]">
                      {mxHosts.length > 0 ? (
                        <>
                          <span>{L("mxOk")}</span>
                          <ul className="mono mt-1 space-y-0.5 text-[13px]">
                            {mxHosts.slice(0, 6).map((h, i) => (
                              <li key={i}>{h}</li>
                            ))}
                          </ul>
                        </>
                      ) : hasA ? (
                        L("mxAFallback")
                      ) : nullMx ? (
                        L("mxNull")
                      ) : (
                        L("mxNone")
                      )}
                    </dd>
                  </div>
                </div>
              )}
            </dl>
          </div>
        )}
      </div>
    </ToolPanel>
  );
}
