/**
 * 关键词提取公共库:word-counter 面板与 seo/keyword-density-checker 共用。
 * 停用词按语言过滤;CJK 逐字成词,拉丁系连续字母数字串为一个词。
 */

export const STOPWORD_LISTS: Record<"en" | "zh" | "ja" | "es" | "pt", string[]> = {
  en: ["the","a","an","and","or","but","of","to","in","on","for","with","at","by","from","as","is","are","was","were","be","been","being","it","its","this","that","these","those","you","your","we","our","they","their","he","she","his","her","not","no","do","does","did","have","has","had","will","would","can","could","should","about","into","over","under","more","most","other","some","such","only","than","too","very","just","also","get","got","so","if","then","there","here","what","which","who","when","how","all","any","each","out","up","down","again","once"],
  zh: ["的","了","是","在","我","有","和","就","不","人","都","一","一个","上","也","很","到","说","要","去","你","会","着","没有","看","好","自己","这","那","他","她","它","们","与","及","或","但","而","被","把","让","给","从","对","为","以","之","还","又","再","更","最","很","什么","怎么","可以","因为","所以","如果","但是","然后","已经"],
  ja: ["の","に","は","を","た","が","で","て","と","し","れ","さ","ある","いる","も","する","から","な","こと","として","い","や","れる","など","なっ","ない","この","ため","その","あっ","よう","また","もの","という","あり","まで","られ","なる","へ","か","だ","これ","によって","により","およそ","それ","です","ます","ので","けど","しかし","さらに","すで"],
  es: ["de","la","que","el","en","y","a","los","se","del","las","un","por","con","no","una","su","para","es","al","lo","como","más","o","pero","sus","le","ya","este","sí","porque","esta","entre","cuando","muy","sin","sobre","también","me","hasta","hay","donde","quien","desde","todo","nos","durante","todos","uno","les","ni","contra","otros","ese","eso","ante","ellos","e","esto","mí","antes","algunos","qué","unos","yo","otro","otras","otra","él","tanto","esa","estos","mucho","quienes","nada","muchos","cual","poco","ella","estar","estas","algunas","algo","nosotros","más"],
  pt: ["de","a","o","que","do","da","em","um","para","com","não","uma","os","no","se","na","por","mais","as","dos","como","mas","ao","ele","das","à","seu","sua","ou","quando","muito","nos","já","eu","também","só","pelo","pela","até","isso","ela","entre","depois","sem","mesmo","aos","seus","quem","nas","me","esse","eles","você","essa","num","nem","suas","meu","minha","numa","pelos","elas","qual","nós","lhe","deles","essas","esses","pelas","este","dele","tu","te","vocês"],
};
export const STOP_ALL = new Set(Object.values(STOPWORD_LISTS).flat());
export const STOP_BY_LANG = Object.fromEntries(
  Object.entries(STOPWORD_LISTS).map(([k, v]) => [k, new Set(v)]),
) as Record<"en" | "zh" | "ja" | "es" | "pt", Set<string>>;

export function tokenizeKeywords(text: string): string[] {
  const tokens: string[] = [];
  const re = /([\u3040-\u30ff\u31f0-\u31ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])|([\p{L}\p{N}][\p{L}\p{N}'’\-]*)/gu;
  for (const m of text.matchAll(re)) {
    if (m[1]) tokens.push(m[1]);
    else if (m[2]) tokens.push(m[2].toLowerCase());
  }
  return tokens;
}

export function keywordNgrams(tokens: string[], n: number): Map<string, number> {
  const map = new Map<string, number>();
  for (let i = 0; i + n <= tokens.length; i++) {
    const g = tokens.slice(i, i + n).join(" ");
    map.set(g, (map.get(g) ?? 0) + 1);
  }
  return map;
}

/** 关键词 top-K:排除停用词后 1/2/3-gram 计数 */
export function topKeywords(
  text: string,
  opts: { excludeStop?: boolean; topK?: number } = {},
): { total: number; unique: number; top: { phrase: string; count: number }[] } {
  const { excludeStop = true, topK = 10 } = opts;
  const tokens = tokenizeKeywords(text);
  const kept = excludeStop ? tokens.filter((tk) => !STOP_ALL.has(tk)) : tokens;
  const total = kept.length;
  const grams = new Map<string, number>();
  for (const n of [1, 2]) {
    for (const [g, c] of keywordNgrams(kept, n)) {
      if (n === 2) {
        // 二词短语要求两词都非停用词且非纯重复
        const parts = g.split(" ");
        if (parts[0] === parts[1]) continue;
      }
      grams.set(g, (grams.get(g) ?? 0) + c);
    }
  }
  const top = [...grams.entries()]
    .filter(([, c]) => c > 1 || total < 30)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, topK)
    .map(([phrase, count]) => ({ phrase, count }));
  return { total, unique: new Set(kept).size, top };
}
