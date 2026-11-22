"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { pick } from "./calc-ui";
import { validateIbanBatch, IBAN_LIMITS } from "../_lib/iban";

/**
 * CN-024:IBAN 校验/解析引擎。批量逐行,结果含国家/校验位/BBAN/分组格式。
 * 无效行显示具体原因(长度范围/字符集/未知国家/国家长度/mod-97)。
 */

const L = {
  input: {
    en: "IBANs (one per line)",
    zh: "IBAN(每行一个)",
    ja: "IBAN(1 行に 1 つ)",
    es: "IBAN (uno por línea)",
    pt: "IBANs (um por linha)",
  },
  run: { en: "Validate", zh: "校验", ja: "検証", es: "Validar", pt: "Validar" },
  clear: { en: "Clear", zh: "清空", ja: "クリア", es: "Limpiar", pt: "Limpar" },
  summary: {
    en: "{total} checked · {valid} valid · {invalid} invalid",
    zh: "共 {total} 条 · 有效 {valid} · 无效 {invalid}",
    ja: "{total} 件検証 · 有効 {valid} · 無効 {invalid}",
    es: "{total} verificadas · {valid} válidas · {invalid} no válidas",
    pt: "{total} verificadas · {valid} válidas · {invalid} inválidas",
  },
  valid: { en: "Valid", zh: "有效", ja: "有効", es: "Válida", pt: "Válida" },
  invalid: { en: "Invalid", zh: "无效", ja: "無効", es: "No válida", pt: "Inválida" },
  country: { en: "Country", zh: "国家/地区", ja: "国", es: "País", pt: "País" },
  checkDigits: { en: "Check digits", zh: "校验位", ja: "チェックディジット", es: "Dígitos de control", pt: "Dígitos de controle" },
  bban: { en: "BBAN (bank + account)", zh: "BBAN(银行+账号)", ja: "BBAN(銀行+口座)", es: "BBAN (banco + cuenta)", pt: "BBAN (banco + conta)" },
  sepa: { en: "SEPA", zh: "SEPA", ja: "SEPA", es: "SEPA", pt: "SEPA" },
  errors: {
    empty: { en: "Empty line", zh: "空行", ja: "空行", es: "Línea vacía", pt: "Linha vazia" },
    "length-range": { en: "Length outside the 15–34 character IBAN range", zh: "长度不在 IBAN 的 15–34 字符范围内", ja: "長さが IBAN の 15〜34 文字の範囲外です", es: "Longitud fuera del rango de 15 a 34 caracteres", pt: "Comprimento fora da faixa de 15 a 34 caracteres" },
    charset: { en: "Illegal characters (only A-Z and 0-9 allowed)", zh: "非法字符(仅允许 A-Z 与 0-9)", ja: "不正な文字(A-Z と 0-9 のみ許可)", es: "Caracteres no válidos (solo A-Z y 0-9)", pt: "Caracteres inválidos (apenas A-Z e 0-9)" },
    country: { en: "Unknown country code (this country does not use IBAN)", zh: "未知国家码(该国不使用 IBAN)", ja: "不明な国コード(この国は IBAN を使用しません)", es: "Código de país desconocido (este país no usa IBAN)", pt: "Código de país desconhecido (este país não usa IBAN)" },
    mod97: { en: "MOD-97 check failed — a character is wrong or missing", zh: "MOD-97 校验失败——有字符错误或缺失", ja: "MOD-97 検証失敗 — 文字の誤りまたは欠落があります", es: "Fallo de MOD-97: hay un carácter erróneo o faltante", pt: "Falha no MOD-97: há um caractere errado ou ausente" },
  },
  note: {
    en: "Validation covers character set, country length (100-country ISO 13616 registry) and the MOD-97 remainder check. It does not verify bank or account semantics with the domestic banking system, and passing does not prove the account exists. Source: ISO 13616 / ISO/IEC 7064:2003. Everything runs locally.",
    zh: "校验覆盖字符集、国家长度(100 国 ISO 13616 注册表)与 MOD-97 余数校验;不校验银行/账号在各国国内体系中的语义,通过也不代表账户真实存在。依据 ISO 13616 / ISO/IEC 7064:2003。全部本机完成。",
    ja: "検証は文字セット、国ごとの長さ(100 か国の ISO 13616 レジストリ)、MOD-97 余り検査を対象とします。銀行/口座の国内セマンティクスは検証せず、合格しても口座が実在する保証はありません。ISO 13616 / ISO/IEC 7064:2003 に基づく。すべてローカル処理。",
    es: "La validación cubre el conjunto de caracteres, la longitud por país (registro ISO 13616 de 100 países) y la comprobación de resto MOD-97. No verifica la semántica nacional del banco/cuenta, y pasar no demuestra que la cuenta exista. Fuente: ISO 13616 / ISO/IEC 7064:2003. Todo se ejecuta localmente.",
    pt: "A validação cobre conjunto de caracteres, comprimento por país (registro ISO 13616 de 100 países) e a verificação de resto MOD-97. Não verifica a semântica nacional de banco/conta, e passar não prova que a conta existe. Fonte: ISO 13616 / ISO/IEC 7064:2003. Tudo local.",
  },
};

export function SecEngineIban() {
  const { locale } = useI18n();
  const [input, setInput] = useState("");
  const [rows, setRows] = useState<ReturnType<typeof validateIbanBatch> | null>(null);

  const run = () => setRows(validateIbanBatch(input));

  const total = rows?.length ?? 0;
  const valid = rows?.filter((r) => r.result.valid).length ?? 0;

  const renderError = (error?: string): string => {
    if (!error) return "";
    if (error.startsWith("country-length:")) {
      const expect = error.split(":")[1];
      return pick(locale, {
        en: `Wrong length for this country (expected ${expect})`,
        zh: `国家长度不符(应为 ${expect} 位)`,
        ja: `この国の長さが違います(${expect} 桁のはず)`,
        es: `Longitud incorrecta para este país (se esperaban ${expect})`,
        pt: `Comprimento errado para este país (esperado ${expect})`,
      });
    }
    const entry = L.errors[error as keyof typeof L.errors];
    return entry ? pick(locale, entry) : error;
  };

  return (
    <ToolPanel>
      <div className="space-y-4">
        <textarea
          className="field mono"
          rows={5}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={pick(locale, L.input)}
          spellCheck={false}
          aria-label={pick(locale, L.input)}
        />

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={run}
            disabled={!input.trim()}
            className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white dark:bg-white dark:text-[#1d1d1f] transition-opacity disabled:opacity-40"
          >
            {pick(locale, L.run)}
          </button>
          <button
            type="button"
            onClick={() => { setInput(""); setRows(null); }}
            className="rounded-full border hairline px-4 py-2 text-[13.5px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {pick(locale, L.clear)}
          </button>
        </div>

        {rows && (
          <div className="space-y-3">
            <p role="status" className="text-[13.5px] font-medium">
              {pick(locale, L.summary).replace("{total}", String(total)).replace("{valid}", String(valid)).replace("{invalid}", String(total - valid))}
            </p>
            <ul className="space-y-2.5">
              {rows.map((row) => (
                <li key={row.line} className="rounded-xl border hairline px-3.5 py-3">
                  <p className="mono text-[13.5px] font-medium break-all">
                    <span className="text-[var(--color-sub)]">{row.line}. </span>
                    {row.raw}
                  </p>
                  {row.result.valid && row.result.parts ? (
                    <div className="mt-1.5 space-y-1 text-[13px] leading-5 text-[var(--color-sub)]">
                      <p className="font-medium text-[var(--color-good)]">{pick(locale, L.valid)} · {row.result.parts.formatted}</p>
                      <p>
                        {pick(locale, L.country)}: {row.result.parts.country} · {pick(locale, L.checkDigits)}: {row.result.parts.checkDigits} · {pick(locale, L.sepa)}: {row.result.parts.sepa ? "✓" : "—"} · {row.result.parts.length}
                      </p>
                      <p className="break-all">{pick(locale, L.bban)}: {row.result.parts.bban}</p>
                    </div>
                  ) : (
                    <p className="mt-1.5 text-[13px] font-medium text-[var(--color-bad)]">{pick(locale, L.invalid)} — {renderError(row.result.error)}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-[13px] leading-5 text-[var(--color-sub)]">
          {pick(locale, L.note).replace("{n}", String(IBAN_LIMITS.countries))}
        </p>
      </div>
    </ToolPanel>
  );
}
