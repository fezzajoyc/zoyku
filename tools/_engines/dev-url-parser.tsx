"use client";

import { useId, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import type { Locale } from "@/lib/site";
import { parseUrl } from "../_lib/url-parser";

/**
 * URL 拆解引擎:纯浏览器 URL API,无依赖。
 * 主机/端口与自定义 scheme 的保守区分见纯函数及下方本地说明。
 */

export const URL_PARSER_POLICY_NOTES: Record<Locale, string> = {
  en: "Bare dotted hosts and localhost with numeric ports use HTTPS. Other colon prefixes are kept as schemes, including custom ones. Use https:// or scheme:// to disambiguate; IPv6 hosts need [brackets]. Internal and trailing empty path segments are retained.",
  zh: "带数字端口的裸点分主机及 localhost 按 HTTPS 解析；其他冒号前缀保留为协议，包括自定义协议。有歧义时请写明 https:// 或 scheme://；IPv6 主机需加 [方括号]。保留路径内部及末尾的空段。",
  ja: "数値ポート付きのドットを含むホストと localhost は HTTPS と解釈します。他のコロン接頭辞は独自スキームを含め保持します。曖昧な場合は https:// または scheme:// を明記し、IPv6 ホストは [角括弧] で囲んでください。途中と末尾の空のパス要素を保持します。",
  es: "Los hosts con puntos y localhost con puerto numérico usan HTTPS. Los demás prefijos con dos puntos se conservan como esquemas, incluidos los propios. Usa https:// o scheme:// para aclararlo; IPv6 requiere [corchetes]. Se conservan segmentos vacíos internos y finales.",
  pt: "Hosts com ponto e localhost com porta numérica usam HTTPS. Outros prefixos com dois-pontos são mantidos como esquemas, inclusive personalizados. Use https:// ou scheme:// para esclarecer; IPv6 exige [colchetes]. Segmentos vazios internos e finais são preservados.",
  fr: "Les hôtes avec un point et localhost avec port numérique utilisent HTTPS. Les autres préfixes suivis de deux-points restent des schémas, même personnalisés. Précisez https:// ou scheme:// en cas d’ambiguïté ; IPv6 exige des [crochets]. Les segments vides internes et finaux sont conservés.",
  de: "Punktierte Hosts und localhost mit numerischem Port werden als HTTPS interpretiert. Andere Doppelpunkt-Präfixe bleiben Schemes, auch eigene. Bei Mehrdeutigkeit https:// oder scheme:// angeben; IPv6-Hosts benötigen [Klammern]. Innere und abschließende leere Pfadsegmente bleiben erhalten.",
  ru: "Имена хостов с точкой и localhost с числовым портом используют HTTPS. Другие префиксы с двоеточием сохраняются как схемы, включая собственные. Укажите https:// или scheme:// для ясности; IPv6 требует [скобок]. Пустые сегменты внутри и в конце пути сохраняются.",
  it: "Gli host con punti e localhost con porta numerica usano HTTPS. Gli altri prefissi con due punti restano schemi, anche personalizzati. Specifica https:// o scheme:// per chiarire; IPv6 richiede [parentesi quadre]. I segmenti vuoti interni e finali vengono mantenuti.",
  tr: "Sayısal portlu noktalı ana makineler ve localhost, HTTPS olarak yorumlanır. Diğer iki nokta önekleri özel olanlar dâhil şema olarak korunur. Belirsizlikte https:// veya scheme:// yazın; IPv6 için [köşeli parantez] gerekir. İç ve sondaki boş yol parçaları korunur.",
  ko: "숫자 포트가 붙은 점 포함 호스트와 localhost는 HTTPS로 해석합니다. 다른 콜론 접두사는 사용자 정의를 포함해 스킴으로 유지합니다. 모호하면 https:// 또는 scheme://를 명시하고 IPv6 호스트는 [대괄호]로 감싸세요. 경로 내부와 끝의 빈 세그먼트도 유지합니다.",
  ar: "تستخدم أسماء المضيف ذات النقاط وlocalhost مع منفذ رقمي HTTPS. تُحفظ بادئات النقطتين الأخرى كمخططات، ومنها المخصصة. اكتب https:// أو scheme:// لإزالة الغموض؛ يحتاج IPv6 إلى [أقواس]. تُحفظ مقاطع المسار الفارغة الداخلية والنهائية.",
  hi: "बिंदु वाले होस्ट और संख्यात्मक पोर्ट वाला localhost, HTTPS मानते हैं। अन्य कोलन उपसर्ग कस्टम सहित स्कीम के रूप में रहते हैं। अस्पष्टता में https:// या scheme:// दें; IPv6 होस्ट को [कोष्ठक] चाहिए। पथ के बीच और अंत के खाली खंड बने रहते हैं।",
  id: "Host bertitik dan localhost dengan port numerik memakai HTTPS. Awalan titik dua lainnya tetap menjadi skema, termasuk skema khusus. Gunakan https:// atau scheme:// agar jelas; IPv6 perlu [kurung siku]. Segmen kosong di tengah dan akhir jalur dipertahankan.",
  vi: "Máy chủ có dấu chấm và localhost kèm cổng số dùng HTTPS. Các tiền tố dấu hai chấm khác được giữ làm lược đồ, kể cả tùy chỉnh. Ghi https:// hoặc scheme:// để tránh mơ hồ; IPv6 cần [ngoặc vuông]. Giữ các đoạn đường dẫn rỗng bên trong và cuối.",
};

const L: Record<string, Record<string, string>> = {
  protocol: { en: "Protocol", zh: "协议", ja: "プロトコル", es: "Protocolo", pt: "Protocolo" },
  host: { en: "Host", zh: "主机", ja: "ホスト", es: "Host", pt: "Host" },
  port: { en: "Port", zh: "端口", ja: "ポート", es: "Puerto", pt: "Porta" },
  hash: { en: "Hash", zh: "锚点(Hash)", ja: "ハッシュ", es: "Fragmento (hash)", pt: "Fragmento (hash)" },
  segments: {
    en: "Path segments",
    zh: "路径分段",
    ja: "パスセグメント",
    es: "Segmentos de ruta",
    pt: "Segmentos do caminho",
  },
  params: {
    en: "Query parameters",
    zh: "查询参数",
    ja: "クエリパラメータ",
    es: "Parámetros de consulta",
    pt: "Parâmetros de consulta",
  },
  copyJson: {
    en: "Copy as JSON",
    zh: "复制为 JSON",
    ja: "JSON としてコピー",
    es: "Copiar como JSON",
    pt: "Copiar como JSON",
  },
  empty: { en: "(empty)", zh: "(空)", ja: "(空)", es: "(vacío)", pt: "(vazio)" },
  invalid: {
    en: "That doesn’t look like a valid URL — check the spelling or add a scheme like https://",
    zh: "这不是一个有效的 URL——检查拼写,或补上 https:// 这样的协议头",
    ja: "有効な URL ではないようです。スペルを確認するか、https:// のようなスキームを追加してください",
    es: "No parece una URL válida — revisa la escritura o añade un esquema como https://",
    pt: "Não parece uma URL válida — confira a digitação ou adicione um esquema como https://",
  },
};

const pick = (l: Record<string, string>, locale: Locale) => l[locale] ?? l.en;

export function DevUrlParserEngine({
  sample = "https://example.com/shop/shoes?color=red&size=42&utm_source=newsletter#reviews",
}: {
  sample?: string;
}) {
  const { locale, t } = useI18n();
  const id = useId();
  const [input, setInput] = useState("");

  const parsed = useMemo(() => parseUrl(input), [input]);
  const hasInput = input.trim() !== "";

  const json = useMemo(() => {
    if (!parsed) return "";
    return JSON.stringify(
      {
        protocol: parsed.protocol,
        host: parsed.host,
        port: parsed.port,
        pathname: parsed.pathname,
        segments: parsed.segments,
        query: parsed.params.map((p) => ({ key: p.key, value: p.value })),
        hash: parsed.hash,
      },
      null,
      2,
    );
  }, [parsed]);

  const part = (label: string, value: string) => (
    <div className="rounded-xl bg-[var(--color-surface)] px-3.5 py-2.5">
      <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-[var(--color-sub)]">{label}</p>
      <p className="mono mt-0.5 break-all text-[14px] font-medium">{value || "—"}</p>
    </div>
  );

  return (
    <ToolPanel>
      <div className="space-y-4" data-url-parser-tool>
        <input
          type="url"
          className="field mono"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="https://example.com/path?query=1#hash"
          spellCheck={false}
          aria-label={t.common.input}
          aria-describedby={`${id}-policy`}
        />
        <p id={`${id}-policy`} className="text-[13px] leading-6 text-[var(--color-sub)]">{URL_PARSER_POLICY_NOTES[locale]}</p>

        {hasInput && !parsed && (
          <p
            className="rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]"
            role="alert"
          >
            {pick(L.invalid, locale)}
          </p>
        )}

        {parsed && (
          <div className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {part(pick(L.protocol, locale), parsed.protocol)}
              {part(pick(L.host, locale), parsed.host)}
              {part(pick(L.port, locale), parsed.port)}
              {part(pick(L.hash, locale), parsed.hash)}
            </div>

            {parsed.segments.length > 0 && (
              <div>
                <p className="mb-1.5 text-[13px] font-semibold">
                  {pick(L.segments, locale)}
                  <span className="ml-1.5 font-normal text-[var(--color-sub)]">{parsed.segments.length}</span>
                </p>
                <div className="divide-y divide-[var(--color-hairline)] rounded-xl border hairline">
                  {parsed.segments.map((seg, i) => (
                    <p key={`${i}-${seg}`} className="mono flex items-center gap-3 px-3.5 py-2 text-[13.5px]">
                      <span className="w-8 flex-none text-right text-[var(--color-sub)]">/{i + 1}</span>
                      <span className="min-w-0 break-all" data-testid="url-path-segment">{seg === "" ? pick(L.empty, locale) : seg}</span>
                    </p>
                  ))}
                </div>
              </div>
            )}

            {parsed.params.length > 0 && (
              <div>
                <p className="mb-1.5 text-[13px] font-semibold">
                  {pick(L.params, locale)}
                  <span className="ml-1.5 font-normal text-[var(--color-sub)]">{parsed.params.length}</span>
                </p>
                <div className="divide-y divide-[var(--color-hairline)] rounded-xl border hairline">
                  {parsed.params.map((p, i) => (
                    <div key={`${i}-${p.key}`} className="flex flex-col gap-0.5 px-3.5 py-2 sm:flex-row sm:gap-3">
                      <p className="mono w-56 flex-none break-all text-[13.5px] font-semibold">{p.key}</p>
                      <p className="mono min-w-0 flex-1 break-all text-[13.5px] text-[var(--color-sub)]">
                        {p.value || pick(L.empty, locale)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-2.5">
          {parsed && <CopyButton value={json} label={pick(L.copyJson, locale)} />}
          <button
            type="button"
            onClick={() => setInput("")}
            className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {t.common.clear}
          </button>
          {!hasInput && (
            <button
              type="button"
              onClick={() => setInput(sample)}
              className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium text-[var(--color-accent-text)] transition-colors hover:bg-[rgba(0,113,227,0.06)]"
            >
              {t.common.sample}
            </button>
          )}
        </div>

      </div>
    </ToolPanel>
  );
}
