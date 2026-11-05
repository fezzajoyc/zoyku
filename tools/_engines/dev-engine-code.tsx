"use client";

import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { TRANSFORMS } from "../_lib/transform-registry";
import { jsonHintKey, type JsonHintKey } from "../_lib/transforms";

/**
 * Developer 类目的格式化/压缩/校验通用引擎:
 * transform 由服务端工具文件以注册表 ID 传入(mode);
 * sql-format 例外——引擎内部动态 import sql-formatter,不走注册表。
 */

type Props = {
  /** TRANSFORMS 注册表 ID,或特殊值 "sql-format" */
  mode: string;
  /** 显示 2/4/Tab 缩进选择(json-beautify 用) */
  indent?: boolean;
  /** 显示输入/输出字节数与节省百分比 */
  showSize?: boolean;
  /** 校验器模式:结果为 "OK" 显示绿色状态,否则红色错误;合法时顺带展示格式化结果 */
  validator?: "json" | "xml";
  /** json-beautify 显示 Sort keys A→Z 开关(竞品标配功能) */
  sort?: boolean;
  sample?: string;
};

const INDENT_LABELS: Record<string, Record<string, string>> = {
  "2": { en: "2 spaces", zh: "2 空格", ja: "2 スペース", es: "2 espacios", pt: "2 espaços" , fr: "2 espaces", de: "2 Leerzeichen", ru: "2 пробела", it: "2 spazi", tr: "2 boşluk", ko: "공백 2", ar: "مسافتان", hi: "2 स्पेस", id: "2 spasi", vi: "2 dấu cách" },
  "4": { en: "4 spaces", zh: "4 空格", ja: "4 スペース", es: "4 espacios", pt: "4 espaços" , fr: "4 espaces", de: "4 Leerzeichen", ru: "4 пробела", it: "4 spazi", tr: "4 boşluk", ko: "공백 4", ar: "4 مسافات", hi: "4 स्पेस", id: "4 spasi", vi: "4 dấu cách" },
  tab: { en: "Tab", zh: "Tab", ja: "タブ", es: "Tab", pt: "Tab" , fr: "Tabulation", de: "Tab", ru: "Табуляция", it: "Tab", tr: "Sekme", ko: "탭", ar: "علامة جدولة", hi: "टैब", id: "Tab", vi: "Tab" },
};

const VALID_LABELS: Record<string, Record<string, string>> = {
  json: { en: "Valid JSON", zh: "JSON 格式有效", ja: "JSON は有効です", es: "JSON válido", pt: "JSON válido" , fr: "JSON valide", de: "Gültiges JSON", ru: "Корректный JSON", it: "JSON valido", tr: "Geçerli JSON", ko: "유효한 JSON", ar: "JSON صالح", hi: "मान्य JSON", id: "JSON valid", vi: "JSON hợp lệ" },
  xml: { en: "Valid XML", zh: "XML 格式有效", ja: "XML は有効です", es: "XML válido", pt: "XML válido" , fr: "XML valide", de: "Gültiges XML", ru: "Корректный XML", it: "XML valido", tr: "Geçerli XML", ko: "유효한 XML", ar: "XML صالح", hi: "मान्य XML", id: "XML valid", vi: "XML hợp lệ" },
};



const SORT_LABELS: Record<string, string> = {
  en: "Sort keys A→Z",
  zh: "键名 A→Z 排序",
  ja: "キーを A→Z でソート",
  es: "Ordenar claves A→Z",
  pt: "Ordenar chaves A→Z",
  fr: "Trier les clés A→Z",
  de: "Schlüssel A→Z sortieren",
  ru: "Сортировать ключи A→Z",
  it: "Ordina chiavi A→Z",
  tr: "Anahtarları A→Z sırala",
  ko: "키 A→Z 정렬",
  ar: "ترتيب المفاتيح A→Z",
  hi: "कुंजियाँ A→Z क्रमित करें",
  id: "Urutkan kunci A→Z",
  vi: "Sắp xếp khóa A→Z",
};
const UTF8_HINTS: Record<string, Record<string, string>> = {
  trailingComma: {
    en: "Hint: you probably have an extra comma before a closing bracket — remove the last comma in a list or object.",
    zh: "提示:右括号前很可能多了一个逗号——删掉列表或对象末尾的最后一个逗号。",
    ja: "ヒント:閉じ括弧の直前に余分なカンマがある可能性があります。リストやオブジェクト末尾のカンマを削除してください。",
    es: "Sugerencia: probablemente hay una coma extra antes de un corchete de cierre: elimina la última coma de la lista u objeto.",
    pt: "Dica: provavelmente há uma vírgula extra antes de um colchete de fechamento — remova a última vírgula da lista ou objeto.",
    fr: "Astuce : il y a probablement une virgule en trop avant une accolade — supprimez la dernière virgule de la liste ou de l'objet.",
    de: "Hinweis: Vor einer schließenden Klammer steht vermutlich ein überzähliges Komma – entferne das letzte Komma der Liste oder des Objekts.",
    ru: "Подсказка: скорее всего, лишняя запятая перед закрывающей скобкой — удалите последнюю запятую в списке или объекте.",
    it: "Suggerimento: probabilmente c'è una virgola in più prima di una parentesi chiusa: rimuovi l'ultima virgola della lista o dell'oggetto.",
    tr: "İpucu: kapanış parantezinden önce fazladan bir virgül olabilir — liste veya nesnedeki son virgülü kaldırın.",
    ko: "힌트: 닫는 괄호 앞에 쉼표가 하나 더 있을 가능성이 높습니다 — 목록이나 객체의 마지막 쉼표를 삭제하세요.",
    ar: "تلميح: على الأرجح توجد فاصلة زائدة قبل قوس الإغلاق — احذف الفاصلة الأخيرة من القائمة أو الكائن.",
    hi: "संकेत: संभवतः बंद होने वाले ब्रैकेट से पहले एक अतिरिक्त कॉमा है — सूची या ऑब्जेक्ट का अंतिम कॉमा हटाएँ।",
    id: "Petunjuk: kemungkinan ada koma ekstra sebelum kurung penutup — hapus koma terakhir pada daftar atau objek.",
    vi: "Gợi ý: có thể có dấu phẩy thừa trước dấu ngoặc đóng — hãy xóa dấu phẩy cuối cùng trong danh sách hoặc đối tượng.",
  },
  singleQuote: {
    en: "Hint: JSON strings must use double quotes (\") — single quotes (') are not valid.",
    zh: "提示:JSON 字符串必须用双引号(\")——单引号(')不合法。",
    ja: "ヒント:JSON の文字列はダブルクォート(\")必須です。シングルクォート(')は使えません。",
    es: "Sugerencia: las cadenas JSON deben usar comillas dobles (\") — las comillas simples (') no son válidas.",
    pt: "Dica: strings em JSON devem usar aspas duplas (\") — aspas simples (') não são válidas.",
    fr: "Astuce : les chaînes JSON doivent utiliser des guillemets doubles (\") — les apostrophes (') ne sont pas valides.",
    de: "Hinweis: JSON-Strings müssen doppelte Anführungszeichen (\") verwenden – einfache (') sind ungültig.",
    ru: "Подсказка: строки в JSON должны быть в двойных кавычках (\") — одинарные (') недопустимы.",
    it: "Suggerimento: le stringhe JSON devono usare virgolette doppie (\") — gli apostrofi (') non sono validi.",
    tr: "İpucu: JSON dizeleri çift tırnak (\") kullanmalıdır — tek tırnak (') geçersizdir.",
    ko: "힌트: JSON 문자열은 큰따옴표(\")를 써야 합니다 — 작은따옴표(')는 유효하지 않습니다.",
    ar: "تلميح: يجب أن تستخدم سلاسل JSON علامات اقتباس مزدوجة (\") — علامات الاقتباس المفردة (') غير صالحة.",
    hi: "संकेत: JSON स्ट्रिंग में डबल कोट (\") ही इस्तेमाल करें — सिंगल कोट (') मान्य नहीं है।",
    id: "Petunjuk: string JSON harus memakai tanda kutip ganda (\") — tanda kutip tunggal (') tidak valid.",
    vi: "Gợi ý: chuỗi JSON phải dùng dấu nháy kép (\") — dấu nháy đơn (') không hợp lệ.",
  },
  unexpectedEnd: {
    en: "Hint: the JSON ended early — check for a missing closing bracket or brace.",
    zh: "提示:JSON 提前结束——检查是否少了右括号或右花括号。",
    ja: "ヒント:JSON が途中で終わっています。閉じ括弧の打ち漏れを確認してください。",
    es: "Sugerencia: el JSON terminó antes de tiempo: revisa si falta un corchete o llave de cierre.",
    pt: "Dica: o JSON terminou mais cedo — verifique se falta um colchete ou chave de fechamento.",
    fr: "Astuce : le JSON s'est terminé prématurément — vérifiez qu'il ne manque pas une accolade ou un crochet fermant.",
    de: "Hinweis: Der JSON-Text endet vorzeitig – prüfe, ob eine schließende Klammer fehlt.",
    ru: "Подсказка: JSON оборвался — проверьте, не пропущена ли закрывающая скобка.",
    it: "Suggerimento: il JSON è finito troppo presto — controlla se manca una parentesi chiusa.",
    tr: "İpucu: JSON erken bitti — eksik kapanış parantezi olup olmadığını kontrol edin.",
    ko: "힌트: JSON이 도중에 끝났습니다 — 닫는 괄호가 빠졌는지 확인하세요.",
    ar: "تلميح: انتهى JSON مبكرًا — تحقق من عدم وجود قوس إغلاق ناقص.",
    hi: "संकेत: JSON जल्दी खत्म हो गया — बंद होने वाला ब्रैकेट छूटा तो नहीं, जाँचें।",
    id: "Petunjuk: JSON berhenti terlalu dini — periksa apakah ada kurung penutup yang hilang.",
    vi: "Gợi ý: JSON kết thúc sớm — kiểm tra xem có thiếu dấu ngoặc đóng không.",
  },
  unquotedWord: {
    en: "Hint: this word needs to be in double quotes — keys and text values in JSON must be quoted.",
    zh: "提示:这个词需要用双引号包起来——JSON 的键和文本值都必须加引号。",
    ja: "ヒント:この単語はダブルクォートで囲む必要があります。JSON のキーと文字列値は必ず引用符で囲みます。",
    es: "Sugerencia: esta palabra necesita comillas dobles — las claves y los valores de texto en JSON deben ir entre comillas.",
    pt: "Dica: esta palavra precisa de aspas duplas — chaves e valores de texto em JSON devem estar entre aspas.",
    fr: "Astuce : ce mot doit être entre guillemets doubles — les clés et les valeurs textuelles du JSON doivent être citées.",
    de: "Hinweis: Dieses Wort muss in doppelte Anführungszeichen – Schlüssel und Textwerte müssen in JSON zitiert werden.",
    ru: "Подсказка: это слово нужно заключить в двойные кавычки — ключи и текстовые значения в JSON обязательно в кавычках.",
    it: "Suggerimento: questa parola va tra virgolette doppie — chiavi e valori testuali in JSON devono essere quotati.",
    tr: "İpucu: bu kelime çift tırnak içine alınmalı — JSON'da anahtarlar ve metin değerleri tırnak içinde olmalıdır.",
    ko: "힌트: 이 단어는 큰따옴표로 감싸야 합니다 — JSON의 키와 문자열 값은 반드시 따옴표로 감쌉니다.",
    ar: "تلميح: هذه الكلمة تحتاج إلى علامتي اقتباس مزدوجتين — المفاتيح والقيم النصية في JSON يجب أن تكون بين علامتي اقتباس.",
    hi: "संकेत: इस शब्द को डबल कोट में लपेटें — JSON में कुंजियाँ और टेक्स्ट मान अनिवार्य रूप से कोट में होते हैं।",
    id: "Petunjuk: kata ini perlu tanda kutip ganda — kunci dan nilai teks dalam JSON wajib dikutip.",
    vi: "Gợi ý: từ này cần đặt trong dấu nháy kép — khóa và giá trị văn bản trong JSON bắt buộc phải có nháy.",
  },
  invalidEscape: {
    en: "Hint: valid escapes are \\\" \\\\ \\/ \\b \\f \\n \\r \\t and \\uXXXX — check the backslash usage.",
    zh: "提示:合法转义只有 \\\" \\\\ \\/ \\b \\f \\n \\r \\t 和 \\uXXXX——检查反斜杠用法。",
    ja: "ヒント:有効なエスケープは \\\" \\\\ \\/ \\b \\f \\n \\r \\t と \\uXXXX です。バックスラッシュの使い方を確認してください。",
    es: "Sugerencia: los escapes válidos son \\\" \\\\ \\/ \\b \\f \\n \\r \\t y \\uXXXX — revisa el uso de la barra invertida.",
    pt: "Dica: as escapes válidas são \\\" \\\\ \\/ \\b \\f \\n \\r \\t e \\uXXXX — verifique o uso da barra invertida.",
    fr: "Astuce : les échappements valides sont \\\" \\\\ \\/ \\b \\f \\n \\r \\t et \\uXXXX — vérifiez l'usage de l'antislash.",
    de: "Hinweis: Gültige Escapes sind \\\" \\\\ \\/ \\b \\f \\n \\r \\t und \\uXXXX – prüfe die Backslash-Verwendung.",
    ru: "Подсказка: допустимые escape: \\\" \\\\ \\/ \\b \\f \\n \\r \\t и \\uXXXX — проверьте использование обратной косой черты.",
    it: "Suggerimento: le escape valide sono \\\" \\\\ \\/ \\b \\f \\n \\r \\t e \\uXXXX — controlla l'uso del backslash.",
    tr: "İpucu: geçerli kaçış dizileri \\\" \\\\ \\/ \\b \\f \\n \\r \\t ve \\uXXXX — ters bölü kullanımını kontrol edin.",
    ko: "힌트: 유효한 이스케이프는 \\\" \\\\ \\/ \\b \\f \\n \\r \\t 와 \\uXXXX 입니다 — 백슬래시 사용을 확인하세요.",
    ar: "تلميح: رموز التهريب الصالحة هي \\\" \\\\ \\/ \\b \\f \\n \\r \\t و \\uXXXX — تحقق من استخدام الشرطة المائلة العكسية.",
    hi: "संकेत: मान्य एस्केप केवल \\\" \\\\ \\/ \\b \\f \\n \\r \\t और \\uXXXX हैं — बैकस्लैश का उपयोग जाँचें।",
    id: "Petunjuk: escape yang valid adalah \\\" \\\\ \\/ \\b \\f \\n \\r \\t dan \\uXXXX — periksa penggunaan backslash.",
    vi: "Gợi ý: các escape hợp lệ là \\\" \\\\ \\/ \\b \\f \\n \\r \\t và \\uXXXX — kiểm tra cách dùng dấu \\.",
  },
};

const utf8Bytes = (s: string) => new TextEncoder().encode(s).length;

/** 由原始输入推导人话提示字典;非 JSON 错误返回 null */
function jsonHintDict(source: string, errText: string): Record<string, string> | null {
  if (!errText.startsWith("Line ")) return null;
  const key = jsonHintKey(source);
  return key ? UTF8_HINTS[key] : null;
}

export function DevCodeEngine({ mode, indent = false, showSize = false, validator, sort = false, sample }: Props) {
  const { locale, t } = useI18n();
  const [input, setInput] = useState("");
  const [indentChoice, setIndentChoice] = useState<"2" | "4" | "tab">("2");
  const [sortOn, setSortOn] = useState(false);
  const [sqlState, setSqlState] = useState<{ out: string; err: string | null }>({ out: "", err: null });

  const isSql = mode === "sql-format";

  useEffect(() => {
    if (!isSql) return;
    let cancelled = false;
    const timer = setTimeout(() => {
      if (!input.trim()) {
        setSqlState({ out: "", err: null });
        return;
      }
      (async () => {
        try {
          const { format } = await import("sql-formatter");
          const res = format(input, { tabWidth: 2, keywordCase: "upper" });
          if (!cancelled) setSqlState({ out: res, err: null });
        } catch (e) {
          if (!cancelled) setSqlState({ out: "", err: e instanceof Error ? e.message : String(e) });
        }
      })();
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [input, isSql]);

  const run = useMemo(() => {
    if (isSql) return { out: sqlState.out, err: sqlState.err, valid: null as boolean | null };
    const fn = TRANSFORMS[mode];
    if (!fn) return { out: "", err: null, valid: null as boolean | null };
    try {
      const out = fn(input, { four: indentChoice === "4", tab: indentChoice === "tab", sort: sortOn });
      if (validator) {
        if (out === "OK") {
          const prettyFn = TRANSFORMS[validator === "json" ? "json-beautify" : "xml-format"];
          let pretty = "";
          try {
            pretty = prettyFn ? prettyFn(input, {}) : "";
          } catch {
            pretty = "";
          }
          return { out: pretty, err: null, valid: true as const };
        }
        if (out === "") return { out: "", err: null, valid: null as boolean | null };
        return { out: "", err: out, valid: false as const };
      }
      return { out, err: null, valid: null as boolean | null };
    } catch (e) {
      return { out: "", err: e instanceof Error ? e.message : String(e), valid: null as boolean | null };
    }
  }, [input, mode, indentChoice, sortOn, validator, isSql, sqlState]);

  const sizeInfo = useMemo(() => {
    if (!showSize || !input || !run.out || run.out === input) return null;
    const inB = utf8Bytes(input);
    const outB = utf8Bytes(run.out);
    const saved = inB > 0 ? Math.round((1 - outB / inB) * 100) : 0;
    return { inB, outB, saved };
  }, [showSize, input, run.out]);

  return (
    <ToolPanel>
      <div className="space-y-4">
        <textarea
          className="field mono"
          rows={9}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.common.input}
          spellCheck={false}
          aria-label={t.common.input}
        />

        {indent && (
          <div className="flex flex-wrap gap-2">
            {(["2", "4", "tab"] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setIndentChoice(key)}
                className={`mono rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
                  indentChoice === key
                    ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                    : "hairline hover:bg-[var(--color-surface)]"
                }`}
              >
                {INDENT_LABELS[key][locale] ?? INDENT_LABELS[key].en}
              </button>
            ))}
          </div>
        )}

        {sort && mode === "json-beautify" && (
          <button
            type="button"
            onClick={() => setSortOn((v) => !v)}
            aria-pressed={sortOn}
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
              sortOn
                ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                : "hairline hover:bg-[var(--color-surface)]"
            }`}
          >
            {SORT_LABELS[locale] ?? SORT_LABELS.en}
          </button>
        )}

        {run.valid === true && (
          <p
            className="flex items-center gap-1.5 text-[14px] font-medium text-[var(--color-good)]"
            role="status"
          >
            <span aria-hidden>✓</span>
            {VALID_LABELS[validator ?? "json"][locale] ?? VALID_LABELS[validator ?? "json"].en}
          </p>
        )}
        {run.err && (
          <>
            <p
              className="mono whitespace-pre-wrap rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]"
              role="alert"
            >
              {run.err}
            </p>
            {(() => {
              const hint = mode === "json-beautify" || mode === "json-validate" || mode === "json-minify"
                ? jsonHintDict(input, run.err)
                : null;
              if (!hint) return null;
              return (
                <p className="text-[13px] leading-5 text-[var(--color-sub)]" role="note">
                  {hint[locale] ?? hint.en}
                </p>
              );
            })()}
          </>
        )}

        <textarea
          className="field mono bg-[var(--color-surface)]"
          rows={9}
          value={run.out}
          readOnly
          placeholder={t.common.output}
          spellCheck={false}
          aria-label={t.common.output}
        />

        {sizeInfo && (
          <p className="mono text-[13px] text-[var(--color-sub)]">
            {formatBytes(sizeInfo.inB)} → {formatBytes(sizeInfo.outB)}
            {sizeInfo.saved > 0 && <span className="text-[var(--color-good)]"> · −{sizeInfo.saved}%</span>}
          </p>
        )}

        <div className="flex flex-wrap gap-2.5">
          <CopyButton value={run.out} />
          <button
            type="button"
            onClick={() => setInput("")}
            className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {t.common.clear}
          </button>
          {sample && input === "" && (
            <button
              type="button"
              onClick={() => setInput(sample)}
              className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium text-[var(--color-accent-strong)] transition-colors hover:bg-[rgba(0,113,227,0.06)]"
            >
              {t.common.sample}
            </button>
          )}
        </div>
      </div>
    </ToolPanel>
  );
}
