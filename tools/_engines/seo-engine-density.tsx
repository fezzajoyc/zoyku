"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import type { Locale } from "@/lib/site";
import { loc } from "./seo-locale";

/** 最小停用词表:按语言过滤后再做 n-gram */
const STOPWORD_LISTS: Record<"en" | "zh" | "ja" | "es" | "pt", string[]> = {
  en: ["the","a","an","and","or","but","of","to","in","on","for","with","at","by","from","as","is","are","was","were","be","been","being","it","its","this","that","these","those","you","your","we","our","they","their","he","she","his","her","not","no","do","does","did","have","has","had","will","would","can","could","should","about","into","over","under","more","most","other","some","such","only","than","too","very","just","also","get","got","so","if","then","there","here","what","which","who","when","how","all","any","each","out","up","down","again","once"],
  zh: ["的","了","是","在","我","有","和","就","不","人","都","一","一个","上","也","很","到","说","要","去","你","会","着","没有","看","好","自己","这","那","他","她","它","们","与","及","或","但","而","被","把","让","给","从","对","为","以","之","还","又","再","更","最","很","什么","怎么","可以","因为","所以","如果","但是","然后","已经"],
  ja: ["の","に","は","を","た","が","で","て","と","し","れ","さ","ある","いる","も","する","から","な","こと","として","い","や","れる","など","なっ","ない","この","ため","その","あっ","よう","また","もの","という","あり","まで","られ","なる","へ","か","だ","これ","によって","により","およそ","それ","です","ます","ので","けど","しかし","さらに","すで"],
  es: ["de","la","que","el","en","y","a","los","se","del","las","un","por","con","no","una","su","para","es","al","lo","como","más","o","pero","sus","le","ya","este","sí","porque","esta","entre","cuando","muy","sin","sobre","también","me","hasta","hay","donde","quien","desde","todo","nos","durante","todos","uno","les","ni","contra","otros","ese","eso","ante","ellos","e","esto","mí","antes","algunos","qué","unos","yo","otro","otras","otra","él","tanto","esa","estos","mucho","quienes","nada","muchos","cual","poco","ella","estar","estas","algunas","algo","nosotros","más"],
  pt: ["de","a","o","que","do","da","em","um","para","com","não","uma","os","no","se","na","por","mais","as","dos","como","mas","ao","ele","das","à","seu","sua","ou","quando","muito","nos","já","eu","também","só","pelo","pela","até","isso","ela","entre","depois","sem","mesmo","aos","seus","quem","nas","me","esse","eles","você","essa","num","nem","suas","meu","minha","numa","pelos","elas","qual","nós","lhe","deles","essas","esses","pelas","este","dele","tu","te","vocês"],
};
const STOP_ALL = new Set(Object.values(STOPWORD_LISTS).flat());
const STOP_BY_LANG = Object.fromEntries(
  Object.entries(STOPWORD_LISTS).map(([k, v]) => [k, new Set(v)]),
) as Record<"en" | "zh" | "ja" | "es" | "pt", Set<string>>;

/** CJK(汉字/假名)逐字成词,拉丁/韩文等连续字母数字串为一个词 */
function tokenize(text: string): string[] {
  const tokens: string[] = [];
  const re = /([\u3040-\u30ff\u31f0-\u31ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])|([\p{L}\p{N}][\p{L}\p{N}'’\-]*)/gu;
  for (const m of text.matchAll(re)) {
    if (m[1]) tokens.push(m[1]);
    else if (m[2]) tokens.push(m[2].toLowerCase());
  }
  return tokens;
}

function ngrams(tokens: string[], n: number): Map<string, number> {
  const map = new Map<string, number>();
  for (let i = 0; i + n <= tokens.length; i++) {
    const g = tokens.slice(i, i + n).join(" ");
    map.set(g, (map.get(g) ?? 0) + 1);
  }
  return map;
}

const L = {
  input: loc("Page copy", "页面文案", "ページの文章", "Texto de la página", "Texto da página"),
  lang: loc("Language", "语言", "言語", "Idioma", "Idioma"),
  allLangs: loc("All languages", "全部语言", "全言語", "Todos los idiomas", "Todos os idiomas"),
  en: "English",
  zh: "中文",
  ja: "日本語",
  es: "Español",
  pt: "Português",
  exclude: loc("Exclude stopwords", "排除停用词", "ストップワードを除外", "Excluir palabras vacías", "Excluir stopwords"),
  filter: loc("Filter phrases…", "筛选词组…", "フレーズを絞り込み…", "Filtrar frases…", "Filtrar frases…"),
  words: loc("words", "词", "語", "palabras", "palavras"),
  unique: loc("unique", "去重后", "ユニーク", "únicas", "únicas"),
  one: loc("1 word", "1 词", "1 語", "1 palabra", "1 palavra"),
  two: loc("2 words", "2 词", "2 語", "2 palabras", "2 palavras"),
  three: loc("3 words", "3 词", "3 語", "3 palabras", "3 palabras"),
  phrase: loc("Phrase", "词组", "フレーズ", "Frase", "Frase"),
  count: loc("Count", "次数", "回数", "Veces", "Vezes"),
  density: loc("Density", "密度", "密度", "Densidad", "Densidade"),
  empty: loc("Paste or type text above to see the keyword breakdown.", "在上方粘贴或输入文本,即可查看关键词分布。", "上にテキストを入力するとキーワードの内訳が表示されます。", "Pega o escribe texto arriba para ver el desglose de palabras clave.", "Cole ou digite o texto acima para ver o detalhamento das palavras-chave."),
} as const;

/** 关键词密度检查:1–3 词短语、计数与密度百分比,内置五语停用词表 */
export function SeoDensityEngine() {
  const { locale, t } = useI18n();
  const [text, setText] = useState("");
  const [langSel, setLangSel] = useState<"auto" | "en" | "zh" | "ja" | "es" | "pt">("auto");
  const [excludeStop, setExcludeStop] = useState(true);
  const [filter, setFilter] = useState("");

  const result = useMemo(() => {
    const tokens = tokenize(text);
    const stopSet = langSel === "auto" ? STOP_ALL : STOP_BY_LANG[langSel];
    const kept = excludeStop ? tokens.filter((tk) => !stopSet.has(tk)) : tokens;
    const total = kept.length;
    const sections = [1, 2, 3].map((n) => ({
      n,
      label: n === 1 ? L.one[locale] ?? L.one.en : n === 2 ? L.two[locale] ?? L.two.en : L.three[locale] ?? L.three.en,
      entries: [...ngrams(kept, n).entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])),
    }));
    return { total, unique: new Set(kept).size, sections };
  }, [text, langSel, excludeStop, locale]);

  const q = filter.trim().toLowerCase();
  const langNames: Record<string, string> = { en: L.en, zh: L.zh, ja: L.ja, es: L.es, pt: L.pt };

  return (
    <ToolPanel>
      <div className="space-y-5">
        <label className="block">
          <span className="mb-1 block text-[13.5px] font-semibold">{L.input[locale] ?? L.input.en}</span>
          <textarea
            className="field"
            rows={8}
            value={text}
            placeholder={t.common.input}
            onChange={(e) => setText(e.target.value)}
          />
        </label>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <label className="flex items-center gap-2 text-[14px]">
            <span className="text-[13px] text-[var(--color-sub)]">{L.lang[locale] ?? L.lang.en}</span>
            <select
              className="field w-auto py-1.5"
              value={langSel}
              onChange={(e) => setLangSel(e.target.value as typeof langSel)}
            >
              <option value="auto">{L.allLangs[locale] ?? L.allLangs.en}</option>
              {(["en", "zh", "ja", "es", "pt"] as const).map((k) => (
                <option key={k} value={k}>{langNames[k]}</option>
              ))}
            </select>
          </label>
          <label className="inline-flex cursor-pointer items-center gap-2 text-[14px]">
            <input
              type="checkbox"
              className="accent-[var(--color-accent)]"
              checked={excludeStop}
              onChange={(e) => setExcludeStop(e.target.checked)}
            />
            {L.exclude[locale] ?? L.exclude.en}
          </label>
          <input
            className="field w-auto flex-1 py-1.5 sm:max-w-56"
            type="text"
            value={filter}
            placeholder={L.filter[locale] ?? L.filter.en}
            onChange={(e) => setFilter(e.target.value)}
          />
          {result.total > 0 && (
            <span className="mono text-[13px] text-[var(--color-sub)]">
              {result.total} {L.words[locale] ?? L.words.en} · {result.unique} {L.unique[locale] ?? L.unique.en}
            </span>
          )}
        </div>

        {result.total === 0 ? (
          <p className="text-[14px] text-[var(--color-sub)]">{L.empty[locale] ?? L.empty.en}</p>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {result.sections.map((sec) => {
              const rows = q
                ? sec.entries.filter(([phrase]) => phrase.includes(q)).slice(0, 25)
                : sec.entries.slice(0, 25);
              return (
                <div key={sec.n} className="min-w-0">
                  <p className="mb-2 text-[13.5px] font-semibold">
                    {sec.label}
                    <span className="ml-2 font-normal text-[var(--color-sub)]">
                      {sec.entries.length} {L.unique[locale] ?? L.unique.en}
                    </span>
                  </p>
                  <div className="space-y-px text-[13.5px]">
                    {rows.length === 0 ? (
                      <p className="text-[13px] text-[var(--color-sub)]">—</p>
                    ) : (
                      rows.map(([phrase, count]) => (
                        <div key={phrase} className="flex items-baseline gap-2 rounded-lg px-2 py-1 odd:bg-[var(--color-surface)]">
                          <span className="min-w-0 flex-1 truncate" title={phrase}>{phrase}</span>
                          <span className="mono flex-none tabular-nums text-[var(--color-sub)]">{count}</span>
                          <span className="mono w-14 flex-none text-right tabular-nums font-medium">
                            {((count / result.total) * 100).toFixed(1)}%
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <p className="mono text-[12px] text-[var(--color-sub)]">
          density = count / {result.total || "n"} × 100 · {L.phrase[locale] ?? L.phrase.en} · {L.count[locale] ?? L.count.en} · {L.density[locale] ?? L.density.en}
        </p>
      </div>
    </ToolPanel>
  );
}
