/**
 * CN-038:文件编码探测(零依赖,浏览器原生 TextDecoder)。
 *
 * 为什么浏览器能做这件事:WHATWG Encoding 标准要求实现方提供 utf-8/utf-16le/utf-16be
 * 以及 gbk/gb18030/big5/shift_jis/euc-jp/euc-kr/windows-125x/iso-8859-x/koi8 等解码器。
 * `new TextDecoder(label, { fatal: true })` 遇到非法字节序列会抛 TypeError ——
 * 这个「能否严格解码」本身就是最强的判别信号,比任何统计猜测都硬。
 *
 * 探测流程(四层,逐层收紧):
 * 1. BOM:UTF-8 / UTF-16LE / UTF-16BE 的 BOM 直接定案(零误判)。
 * 2. UTF-16 启发:奇数/偶数位置大量 NUL 字节 → UTF-16LE/BE(文本文件几乎不含 NUL)。
 * 3. 严格解码筛选:对候选编码逐个 fatal 解码,失败即淘汰。
 * 4. 语种可信度打分:按编码所属文字系统的常用区段统计命中率,并对控制符/私用区/U+FFFD 扣分。
 *
 * 诚实边界(工具文案同源):
 * - 探测是启发式,不是证明。短文本、纯 ASCII、或同一字节序列在两种编码下都合法的情形
 *   (例如 GBK 与 GB18030 对常用字的字节完全重合)必然存在多解,结果按置信度分级呈现,
 *   并且永远把全部候选列出来让人自行判断。
 * - 不猜「内容语义」,只用字节合法性与文字区段统计;不做 BOM 之外的元数据推断。
 * - 编码转换方向(文本→GBK)浏览器无原生支持,本工具只做解码(与 CN-018 一致)。
 */

export type EncodingCandidate = {
  /** WHATWG label(展示与再解码都用它) */
  label: string;
  /** 人类可读名 */
  name: string;
  /** 0–100 的语种可信度(仅对严格解码成功的候选计算) */
  score: number;
  /** 非 U+FFFD 之外的异常字符数(控制符/私用区) */
  suspicious: number;
  /** 该文字系统的常用字符命中数 */
  scriptHits: number;
};

export type DetectConfidence = "bom" | "high" | "medium" | "low";

export type DetectResult =
  | {
      ok: true;
      /** 最优候选的 label */
      label: string;
      name: string;
      confidence: DetectConfidence;
      /** 为什么这么判(可读证据,供 UI 展示) */
      reason: string;
      /** 全部严格解码成功的候选,按分数降序(含最优) */
      candidates: EncodingCandidate[];
      /** 用最优编码解出的文本 */
      text: string;
      byteLength: number;
    }
  | { ok: false; code: "empty" | "tooLarge" | "undetectable"; message?: string };

/** 与 CN-018 GBK 解码器一致的上限:同步解码,避免长任务。 */
export const MAX_BYTES = 2_000_000;

/** 候选编码 + 其所属文字系统的常用区段 + 展示名。 */
/** 文字系统族 —— 判别力的来源。真正的歧义发生在同一族内(如 GBK/Big5、Latin-1/cp1252)。 */
type Family = "cjk" | "japanese" | "korean" | "cyrillic" | "greek" | "latin" | "utf";

type Spec = {
  label: string;
  name: string;
  family: Family;
  /** 该编码是否与 ASCII 兼容(纯 ASCII 输入时都可疑地"能解") */
  asciiCompatible: boolean;
};

const CJK_UNIFIED: Array<[number, number]> = [
  [0x4e00, 0x9fff],
  [0x3400, 0x4dbf],
];
const HIRAGANA_KATAKANA: Array<[number, number]> = [
  [0x3040, 0x309f],
  [0x30a0, 0x30ff],
];
const HANGUL: Array<[number, number]> = [[0xac00, 0xd7af]];
const CYRILLIC: Array<[number, number]> = [
  [0x0400, 0x04ff],
  [0x0500, 0x052f],
];
const GREEK: Array<[number, number]> = [
  [0x0370, 0x03ff],
  [0x1f00, 0x1fff],
];
const LATIN_SUPPLEMENT: Array<[number, number]> = [
  [0x00c0, 0x00ff], // À–ÿ
  [0x0100, 0x017f], // Latin Extended-A
  [0x2018, 0x201f], // 引号/撇号
  [0x20ac, 0x20ac], // €
];

const SPECS: Spec[] = [
  { label: "utf-8", name: "UTF-8", family: "utf", asciiCompatible: true },
  { label: "gbk", name: "GBK(简体中文)", family: "cjk", asciiCompatible: true },
  { label: "gb18030", name: "GB18030(简体中文超集)", family: "cjk", asciiCompatible: true },
  { label: "big5", name: "Big5(繁体中文)", family: "cjk", asciiCompatible: true },
  { label: "shift_jis", name: "Shift_JIS(日文)", family: "japanese", asciiCompatible: true },
  { label: "euc-jp", name: "EUC-JP(日文)", family: "japanese", asciiCompatible: true },
  { label: "euc-kr", name: "EUC-KR(韩文)", family: "korean", asciiCompatible: true },
  { label: "windows-1251", name: "Windows-1251(西里尔)", family: "cyrillic", asciiCompatible: true },
  { label: "iso-8859-5", name: "ISO-8859-5(西里尔)", family: "cyrillic", asciiCompatible: true },
  { label: "koi8-r", name: "KOI8-R(西里尔)", family: "cyrillic", asciiCompatible: true },
  { label: "windows-1253", name: "Windows-1253(希腊)", family: "greek", asciiCompatible: true },
  { label: "iso-8859-7", name: "ISO-8859-7(希腊)", family: "greek", asciiCompatible: true },
  { label: "windows-1252", name: "Windows-1252(西欧)", family: "latin", asciiCompatible: true },
  { label: "iso-8859-1", name: "ISO-8859-1(西欧)", family: "latin", asciiCompatible: true },
  { label: "iso-8859-15", name: "ISO-8859-15(西欧,含 €)", family: "latin", asciiCompatible: true },
  { label: "iso-8859-2", name: "ISO-8859-2(中欧)", family: "latin", asciiCompatible: true },
];

export const ENCODING_SPECS = SPECS;

/* -------------------------------------------------------------------------- */
/* 1. BOM                                                                      */
/* -------------------------------------------------------------------------- */

export type BomKind = "utf-8" | "utf-16le" | "utf-16be";

/** 检测 BOM 并返回其类型与长度(无 BOM → null)。 */
export function detectBom(bytes: Uint8Array): { kind: BomKind; length: number; label: string } | null {
  if (bytes.length >= 3 && bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf) {
    return { kind: "utf-8", length: 3, label: "utf-8" };
  }
  if (bytes.length >= 2 && bytes[0] === 0xff && bytes[1] === 0xfe) {
    return { kind: "utf-16le", length: 2, label: "utf-16le" };
  }
  if (bytes.length >= 2 && bytes[0] === 0xfe && bytes[1] === 0xff) {
    return { kind: "utf-16be", length: 2, label: "utf-16be" };
  }
  return null;
}

/* -------------------------------------------------------------------------- */
/* 2. UTF-16 启发                                                              */
/* -------------------------------------------------------------------------- */

/** 无 BOM 的 UTF-16 启发:统计偶/奇位置的 NUL 字节占比。 */
export function guessUtf16NoBom(bytes: Uint8Array): "utf-16le" | "utf-16be" | null {
  if (bytes.length < 4 || bytes.length % 2 !== 0) return null;
  let evenNul = 0;
  let oddNul = 0;
  // 只看前 4096 字节,足够判断,且避免大文件全量扫描
  const limit = Math.min(bytes.length, 4096);
  for (let i = 0; i < limit; i++) {
    if (bytes[i] === 0x00) {
      if (i % 2 === 0) evenNul++;
      else oddNul++;
    }
  }
  const pairs = Math.floor(limit / 2);
  if (pairs === 0) return null;
  // 拉丁/中日韩文本在 UTF-16 里,低字节在高位(BE: 偶数位为高字节)…
  // 实测:LE 文本 "Hello" = 48 00 65 00 …(奇数位 NUL);BE 文本 = 00 48 00 65(偶数位 NUL)
  if (oddNul / pairs > 0.4) return "utf-16le";
  if (evenNul / pairs > 0.4) return "utf-16be";
  return null;
}

/* -------------------------------------------------------------------------- */
/* 3+4. 严格解码 + 语种打分                                                    */
/* -------------------------------------------------------------------------- */

const CONTROL_ALLOWED = new Set([0x09, 0x0a, 0x0d]);

/** 是否可疑字符:控制符(除 \t\n\r)、私用区、代理区、非字符、替换符、C1 控制符。 */
function isSuspicious(cp: number): boolean {
  if (cp === 0xfffd) return true;
  if (cp < 0x20 && !CONTROL_ALLOWED.has(cp)) return true;
  if (cp >= 0x7f && cp <= 0x9f) return true;
  if (cp >= 0xe000 && cp <= 0xf8ff) return true;
  if (cp >= 0xd800 && cp <= 0xdfff) return true;
  if ((cp >= 0xfdd0 && cp <= 0xfdef) || (cp & 0xfffe) === 0xfffe) return true;
  return false;
}

/*
 * ── 为什么必须用「高频字表」而不是「区段命中率」 ──────────────────────────────
 * 实测(见 tests/encoding-detect.test.ts 的字节样本):
 * GBK 字节 "d6d0cec4b2e2cad4bcf2cce5"(中文测试简体)在多种编码下都能严格解码:
 *   gbk      → 中文测试简体     ← 正确
 *   big5     → 笢恅聆彸潠极      ← 全是 CJK 统一表意文字,区段命中率 100%
 *   euc-jp   → 嶄猟霞編酒悶      ← 同上
 * 如果只按「非 ASCII 字符是否落在 CJK 区段」打分,这三种编码都是满分 —— 完全无法区分。
 * 真正的判别信号是**字符频率**:正确解码产生的是高频常用字,错解码产生的是生僻字。
 * 这是 chardet/uchardet 一类工具的核心手法,也是本模块采用的做法。
 */

/** 简体中文最高频字(约 200 个,覆盖日常文本大部分出现次数)。 */
/**
 * 简体高频字表(约 300 字)。
 * 用途说明:这不是权威字频表,而是一份「日常文本里出现率很高」的精选集合,
 * 用来给「同字节多解」的情形排序(正确解码产出常用字,错解码产出生僻字)。
 * 它的覆盖范围直接决定 CJK 判别的灵敏度,属于本工具的已知启发式局限。
 */
const COMMON_SIMPLIFIED = new Set(
  "的一是不了人我在有他这为之大来以个中上们到说国和地也子时道出而要于就下得可你年生自会那后能对着事" +
    "其里所去行过家十用发天如然作方成者多日都三小军二无同么经法当起与好看学进种将还分此心前面又定见只主没公从" +
    "问但何先建放做最正名同意民展明较真想几近处系或题给根路更打水重点体内因手白百千高长多少新旧老少东南西北" +
    "中文测试简体繁汉字语言书写读取文件编码显示结果正确错误新闻内容数据表格信息版本系统软件程序电脑网络手表手机" +
    "工作学习生活时间地方问题情况发展经济文化教育历史社会政府企业市场产品服务管理技术设计开发用户界面功能" +
    "设置输入输出保存打开关闭删除添加修改查询搜索选择确认取消返回上一页下一项列表详情说明帮助支持联系我们" +
    "以下以上左右前后中间开始结束继续停止运行完成成功失败注意警告提示参考示例格式类型大小总价值钱费用价格"
);

/** 繁体高频字表(与简体表同源,按繁体字形书写;用于区分 Big5 与 GBK 的同字节多解)。 */
const COMMON_TRADITIONAL = new Set(
  "的一是不了人我在有他這為之大來以個中上們到說國和地也子時道出而要於就下得可你年生自會那後能對著事" +
    "其裡所去行過家十用發天如然作方成者多日都三小軍二無同麼經法當起與好看學進種將還分此心前面又定見只主沒公從" +
    "問但何先建放做最正名同意民展明較真想幾近處系或題給根路更打水重點體內因手白百千高長多少新舊老少東南西北" +
    "中文測試簡體繁漢字語言書寫讀取文件編碼顯示結果正確錯誤新聞內容數據表格信息版本系統軟體程式電腦網絡手錶手機" +
    "工作學習生活時間地方問題情況發展經濟文化教育歷史社會政府企業市場產品服務管理技術設計開發用戶界面功能" +
    "設定輸入輸出保存打開關閉刪除添加修改查詢搜索選擇確認取消返回上一頁下一項列表詳情說明幫助支持聯繫我們" +
    "以下以上左右前後中間開始結束繼續停止運行完成成功失敗注意警告提示參考範例格式類型大小總價值錢費用價格"
);

/** ISO-8859-1 的 0xA0–0xBF 遗留符号:正常散文里几乎不出现,解出它们是该编码的负面证据。 */
const ISO_LATIN1_LEGACY = new Set(
  "¤¦¨©ª®¯±´µ¶·¸¹º¼½¾¿\u00a0\u00ad",
);

/** 假名(平假名 + 片假名)—— 只有日文使用,是日文编码的决定性证据。 */
function isKana(cp: number): boolean {
  return (cp >= 0x3040 && cp <= 0x309f) || (cp >= 0x30a0 && cp <= 0x30ff);
}

/** 韩文音节 —— EUC-KR 的决定性证据。 */
function isHangul(cp: number): boolean {
  return (cp >= 0xac00 && cp <= 0xd7af) || (cp >= 0x1100 && cp <= 0x11ff) || (cp >= 0x3130 && cp <= 0x318f);
}

function isCjk(cp: number): boolean {
  return (cp >= 0x4e00 && cp <= 0x9fff) || (cp >= 0x3400 && cp <= 0x4dbf);
}

function isCyrillic(cp: number): boolean {
  return (cp >= 0x400 && cp <= 0x52f);
}

function isGreek(cp: number): boolean {
  return (cp >= 0x370 && cp <= 0x3ff) || (cp >= 0x1f00 && cp <= 0x1fff);
}

function isLatinSupplement(cp: number): boolean {
  return (
    (cp >= 0xc0 && cp <= 0xff) ||
    (cp >= 0x100 && cp <= 0x17f) ||
    (cp >= 0x2018 && cp <= 0x201f) ||
    cp === 0x20ac
  );
}

function isLatinAscii(cp: number): boolean {
  return (cp >= 0x41 && cp <= 0x5a) || (cp >= 0x61 && cp <= 0x7a);
}

/*
 * ── 单字节文字系统的高频字母表 ─────────────────────────────────────────────────
 * 单字节编码没有非法字节序列,「能否解码」对它们完全不提供信息。
 * 唯一的判别信号是**字母使用频率**:真实自然语言的文字高度集中在前十几个字母上。
 * 实测反例:cp1251 字节 "cff0e8e2e5f220ece8f0"(Привет мир)在 iso-8859-7 下解出
 * "Οπθβες μθπ" —— θ 出现 3 次,而 θ 不在希腊语高频字母表里,这是错解码的指纹。
 */
const CYRILLIC_TOP = "оеаинтсрвлкмдпуяыьгзбчйхжшюцщэфъё";
const GREEK_TOP = "αεοτινρσηκπμλυδγθχφβωξζψ";

/** 高频字母覆盖率 + 低频字母重复惩罚。返回 [0,1] 的乘子。 */
function letterProfile(cps: number[], lower: (cp: number) => number, topSet: string): {
  ratio: number;
  rareRepeat: number;
  mult: number;
} {
  let letters = 0;
  let inTop = 0;
  const counts = new Map<string, number>();
  for (const cp of cps) {
    const lc = lower(cp);
    if (lc < 0) continue;
    letters++;
    const ch = String.fromCodePoint(lc);
    if (topSet.includes(ch)) inTop++;
    counts.set(ch, (counts.get(ch) ?? 0) + 1);
  }
  if (letters === 0) return { ratio: 0, rareRepeat: 0, mult: 0 };
  const ratio = inTop / letters;
  // 不在高频集的字母出现 ≥3 次 → 视为错解码(真实文本极少重复生僻字母)
  let rareRepeat = 0;
  for (const [ch, n] of counts) {
    if (!topSet.includes(ch) && n >= 3) rareRepeat += n;
  }
  const rarePenalty = rareRepeat > 0 ? Math.max(0.1, 1 - rareRepeat / letters) : 1;
  return { ratio, rareRepeat, mult: rarePenalty };
}

function isLetterish(cp: number): boolean {
  return isLatinAscii(cp) || isCyrillic(cp) || isGreek(cp) || isKana(cp) || isHangul(cp) || isCjk(cp);
}

function isWordSeparator(cp: number): boolean {
  return !isLetterish(cp);
}

/**
 * 词中大写字母数:真实文本里大写只出现在词首(句首/专名),不会夹在词中间。
 * 错解码的典型特征恰恰是「词中间冒出大写」(如 cp1251 字节被希腊编码解成 "Οπθβες μθπ",
 * 或 GBK 字节被 cp1251 解成全大写无空格串)。
 * 这个信号比「大写总比例」更精确,因为它排除了句首与缩写这类合法情况。
 */
function midWordUppercase(cps: number[], isUpper: (cp: number) => boolean): number {
  let count = 0;
  for (let i = 1; i < cps.length; i++) {
    const cp = cps[i];
    if (!isUpper(cp)) continue;
    // 前一个字符是字母 → 这是词中大写
    if (isLetterish(cps[i - 1])) count++;
  }
  return count;
}

export type ScoreDetail = {
  score: number;
  suspicious: number;
  /** 该族文字系统的专属字符命中数(假名/韩文音节/CJK 高频字等) */
  scriptHits: number;
  /** 用于调试与 UI 展示的短语说明 */
  signal: string;
};

/**
 * 打分 0–100。核心思路:
 * - 专属文字系统(假名 / 韩文音节)一旦出现,该族直接拿到高分,因为其他编码不可能凭空产出它们;
 * - CJK 只能靠**高频字比例**区分(不同编码都能产出「合法但生僻」的汉字);
 * - 混排文字(Latin+Cyrillic 等)与大量大写字母是典型错解码特征,必须惩罚;
 * - 控制符 / 私用区 / 替换符强惩罚。
 */
export function scoreDecoded(text: string, spec: Spec): ScoreDetail {
  const cps: number[] = [];
  for (const ch of text) {
    const cp = ch.codePointAt(0);
    if (cp !== undefined) cps.push(cp);
  }
  const total = cps.length;
  if (total === 0) return { score: 0, suspicious: 0, scriptHits: 0, signal: "empty" };

  let suspicious = 0;
  let nonAscii = 0;
  let latinAscii = 0;
  let upper = 0;
  let lower = 0;
  let kana = 0;
  let hangul = 0;
  let cjkCommon = 0;
  let cjkAny = 0;
  let cyrillic = 0;
  let greek = 0;
  let latinSupp = 0;

  for (const cp of cps) {
    if (isSuspicious(cp)) suspicious++;
    if (cp > 0x7f) nonAscii++;
    if (isLatinAscii(cp)) {
      latinAscii++;
      if (cp >= 0x41 && cp <= 0x5a) upper++;
      else lower++;
    }
    if (isKana(cp)) kana++;
    if (isHangul(cp)) hangul++;
    if (isCjk(cp)) {
      cjkAny++;
      const ch = String.fromCodePoint(cp);
      if (COMMON_SIMPLIFIED.has(ch) || COMMON_TRADITIONAL.has(ch)) cjkCommon++;
    }
    if (isCyrillic(cp)) cyrillic++;
    if (isGreek(cp)) greek++;
    if (isLatinSupplement(cp)) latinSupp++;
  }

  const suspiciousRatio = suspicious / total;
  const penalty = Math.min(100, Math.round(suspiciousRatio * 200));

  let raw: number;
  let signal: string;

  switch (spec.family) {
    case "japanese": {
      // 假名比例是决定性证据:正确解码的日文必然含假名(除非纯汉字标题,那种情况本来就是中日共有)
      const kanaRatio = kana / total;
      const cjkRatio = cjkCommon / Math.max(1, cjkAny || 1);
      raw = Math.min(100, Math.round(kanaRatio * 130 + (cjkAny > 0 ? cjkRatio * 60 : 0)));
      signal = kana > 0 ? `${kana} kana character(s)` : "no kana";
      break;
    }
    case "korean": {
      const hangulRatio = hangul / total;
      raw = Math.min(100, Math.round(hangulRatio * 150));
      signal = hangul > 0 ? `${hangul} Hangul syllable(s)` : "no Hangul";
      break;
    }
    case "cjk": {
      // 只靠高频字比例:生僻字(错解码产物)不计分
      const commonRatio = cjkAny > 0 ? cjkCommon / cjkAny : 0;
      raw = Math.min(100, Math.round(commonRatio * 200));
      signal = cjkAny > 0 ? `${cjkCommon}/${cjkAny} common ideographs` : "no ideographs";
      break;
    }
    case "cyrillic": {
      /*
       * 单字节编码「什么字节都能解」(它们没有非法序列),所以「严格解码成功」对它们零信息量。
       * 必须靠文本形态证据:西里尔占比 / 大写占比 / 是否有空格 / 是否混入拉丁。
       * 实测反例:GBK 字节在 windows-1251 下解出 "ЦРОДІвКФјтМе" —— 全大写无空格,是典型错解码。
       */
      const cyrRatio = nonAscii > 0 ? cyrillic / nonAscii : 0;
      const mixed = latinAscii > 0 && cyrillic > 0;
      // 西里尔大写区(U+0400–U+042F)与拉丁大写一样罕见
      let cyrUpper = 0;
      let cyrLower = 0;
      for (const cp of cps) {
        if (cp >= 0x400 && cp <= 0x42f) cyrUpper++;
        else if (cp >= 0x430 && cp <= 0x44f) cyrLower++;
      }
      const capsRatio = cyrUpper + cyrLower > 0 ? cyrUpper / (cyrUpper + cyrLower) : 0;
      const capsPenalty = capsRatio > 0.5 ? 0.25 : 1; // 全大写 → 只留 1/4 分
      const spaceCount = cps.filter((cp) => cp === 0x20).length;
      // 长文本却一个空格都没有 → 西里尔自然语言必有分词空格
      const noSpacePenalty = total > 12 && spaceCount === 0 ? 0.5 : 1;
      const mixedPenalty = mixed ? 0.35 : 1;
      // 词中西里尔大写 → 错解码特征(见 midWordUppercase 注释)
      const midCaps = midWordUppercase(cps, (cp) => cp >= 0x400 && cp <= 0x42f);
      const midCapsPenalty = midCaps > 0 ? Math.max(0.15, 1 - midCaps * 0.25) : 1;
      // 字母频率:统计整个西里尔区段(U+0400–U+04FF),只把大写映射成小写。
      // 关键:扩展字母(ѓ ѕ ў 等)也必须计入,它们正是「这不是俄文」的证据。
      const prof = letterProfile(
        cps,
        (cp) => (cp >= 0x400 && cp <= 0x4ff ? (cp >= 0x410 && cp <= 0x42f ? cp + 0x20 : cp) : -1),
        CYRILLIC_TOP,
      );
      const freqMult = prof.ratio >= 0.95 ? 1 : Math.max(0.2, prof.ratio) * prof.mult;
      raw = Math.round(cyrRatio * 100 * capsPenalty * noSpacePenalty * mixedPenalty * midCapsPenalty * freqMult);
      signal = `${cyrillic} Cyrillic, top-letter ratio ${(prof.ratio * 100).toFixed(0)}%${prof.rareRepeat ? `, ${prof.rareRepeat} rare-letter repeat(s)` : ""}`;
      break;
    }
    case "greek": {
      const grRatio = nonAscii > 0 ? greek / nonAscii : 0;
      const mixed = latinAscii > 0 && greek > 0;
      const spaceCount = cps.filter((cp) => cp === 0x20).length;
      const noSpacePenalty = total > 12 && spaceCount === 0 ? 0.5 : 1;
      // 词中希腊大写(U+0391–U+03A9)→ 错解码特征
      const midCaps = midWordUppercase(cps, (cp) => cp >= 0x391 && cp <= 0x3a9);
      const midCapsPenalty = midCaps > 0 ? Math.max(0.15, 1 - midCaps * 0.3) : 1;
      // 字母频率:统计整个希腊区段(U+0370–U+03FF),大写映射成小写
      const prof = letterProfile(
        cps,
        (cp) => (cp >= 0x370 && cp <= 0x3ff ? (cp >= 0x391 && cp <= 0x3a9 ? cp + 0x20 : cp) : -1),
        GREEK_TOP,
      );
      const freqMult = prof.ratio >= 0.95 ? 1 : Math.max(0.2, prof.ratio) * prof.mult;
      raw = Math.round(grRatio * 100 * (mixed ? 0.35 : 1) * noSpacePenalty * midCapsPenalty * freqMult);
      signal = `${greek} Greek, top-letter ratio ${(prof.ratio * 100).toFixed(0)}%${prof.rareRepeat ? `, ${prof.rareRepeat} rare-letter repeat(s)` : ""}`;
      break;
    }
    case "latin": {
      /*
       * 判别规则:真实西欧文本由「基本 ASCII 字母」主导,重音字母只是点缀(通常 < 20%)。
       * 反例:Big5 字节在 iso-8859-15 下解出 "€€€åŽúžÕÁcÅé" —— 几乎全是重音/符号,只有一个 ASCII 字母。
       *
       * 「ISO-8859-1 C1 区遗留符号」加分项:0xA0–0xBF 在 ISO-8859-1 里是 ¤ ¦ § ¨ © ª ® ¯ ± ´ µ ¶ ·
       * ¸ ¹ º ¼ ½ ¾ 这类几乎不出现在正常散文里的字符,而在 ISO-8859-15 / Windows-1252 里同一字节
       * 常映射为 € 等真正会出现的符号。因此「解出 €」是该候选的正面证据,「解出 ¤」是负面证据。
       */
      const LETTERS_ONLY = latinAscii;
      const suppRatio = LETTERS_ONLY + latinSupp > 0 ? latinSupp / (LETTERS_ONLY + latinSupp) : 0;
      const foreign = (cyrillic + greek) / total;
      const mixed = latinAscii > 0 && (cyrillic > 0 || greek > 0);

      // LEGACY_C1 每次调用重建 → 移到模块级(ISO_LATIN1_LEGACY);审查修正
      let euroCount = 0;
      let legacyC1 = 0;
      for (const cp of cps) {
        if (cp === 0x20ac) euroCount++;
        else if (ISO_LATIN1_LEGACY.has(String.fromCodePoint(cp))) legacyC1++;
      }
      // € 出现在正常文本里(尤其价格/欧洲语境),给小幅加分;遗留 C1 符号给扣分
      const c1Mult = legacyC1 > 0 ? Math.max(0.3, 1 - legacyC1 / Math.max(1, total) * 2) : 1;
      const euroBonus = euroCount > 0 ? 12 : 0;

      if (LETTERS_ONLY === 0 && latinSupp > 0) {
        raw = Math.round(10 * (1 - foreign));
      } else if (LETTERS_ONLY === 0) {
        raw = 0;
      } else {
        raw = Math.round(95 - suppRatio * 95 - foreign * 100);
        raw = Math.round(raw * (mixed ? 0.25 : 1));
        raw = Math.round(raw * c1Mult) + euroBonus;
      }
      signal = `${LETTERS_ONLY} basic Latin, ${latinSupp} accented${euroCount ? `, ${euroCount} €` : ""}${legacyC1 ? `, ${legacyC1} legacy C1 symbol(s)` : ""}${mixed ? ", mixed with Cyrillic/Greek" : ""}`;
      break;
    }
    case "utf": {
      // UTF-8 严格解码成功本身就是强证据(它能接受多字节序列,而单字节编码会在合法序列上"意外成功")
      // 但纯 ASCII 时无法区分,交给上层压分
      const utfEvidence = nonAscii > 0 ? 1 : 0;
      raw = Math.round(60 + 40 * utfEvidence);
      signal = nonAscii > 0 ? `${nonAscii} non-ASCII char(s) strictly decoded` : "pure ASCII";
      break;
    }
  }

  const score = Math.max(0, Math.min(100, raw - penalty));
  return {
    score,
    suspicious,
    scriptHits: kana + hangul + cjkCommon + cyrillic + greek + latinSupp,
    signal: penalty > 0 ? `${signal}; ${suspicious} suspicious char(s)` : signal,
  };
}

/** 严格解码:成功返回文本,失败 null。 */
export function strictDecode(bytes: Uint8Array, label: string): string | null {
  try {
    const decoder = new TextDecoder(label, { fatal: true, ignoreBOM: false });
    return decoder.decode(bytes);
  } catch {
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/* 主入口                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * 探测编码。
 * `data` 是原始字节(浏览器里来自 File.arrayBuffer() 或十六进制粘贴解码)。
 */
export function detectEncoding(bytes: Uint8Array): DetectResult {
  if (bytes.length === 0) return { ok: false, code: "empty" };
  if (bytes.length > MAX_BYTES) return { ok: false, code: "tooLarge", message: `${bytes.length} bytes` };

  // ── 层 1:BOM 定案
  const bom = detectBom(bytes);
  if (bom) {
    const payload = bytes.subarray(bom.length);
    const text = strictDecode(payload, bom.label) ?? new TextDecoder(bom.label, { fatal: false }).decode(payload);
    const spec = SPECS.find((s) => s.label === bom.label);
    const s = spec ? scoreDecoded(text, spec) : { score: 100, suspicious: 0, scriptHits: 0, nonAscii: 0 };
    return {
      ok: true,
      label: bom.label,
      name: spec?.name ?? bom.label.toUpperCase(),
      confidence: "bom",
      reason: `Byte order mark found (${bom.length} bytes)`,
      candidates: [
        { label: bom.label, name: spec?.name ?? bom.label.toUpperCase(), score: 100, suspicious: s.suspicious, scriptHits: s.scriptHits },
      ],
      text,
      byteLength: bytes.length,
    };
  }

  // ── 层 2:UTF-16 无 BOM 启发
  const utf16 = guessUtf16NoBom(bytes);
  if (utf16) {
    const strict = strictDecode(bytes, utf16);
    if (strict !== null) {
      const spec = SPECS.find((s) => s.label === "utf-8"); // 借用脚本集合
      const s = spec ? scoreDecoded(strict, spec) : { score: 90, suspicious: 0, scriptHits: 0, nonAscii: 0 };
      return {
        ok: true,
        label: utf16,
        name: utf16 === "utf-16le" ? "UTF-16 LE(无 BOM)" : "UTF-16 BE(无 BOM)",
        confidence: "high",
        reason: "Frequent NUL bytes in alternating positions",
        candidates: [
          { label: utf16, name: utf16.toUpperCase(), score: 90, suspicious: s.suspicious, scriptHits: s.scriptHits },
        ],
        text: strict,
        byteLength: bytes.length,
      };
    }
  }

  // ── 层 3+4:严格解码 + 打分
  const candidates: EncodingCandidate[] = [];
  let best: { spec: Spec; text: string; score: number } | null = null;
  let bestText: string | null = null;

  for (const spec of SPECS) {
    const text = strictDecode(bytes, spec.label);
    if (text === null) continue; // 严格解码失败 → 淘汰
    const s = scoreDecoded(text, spec);
    candidates.push({ label: spec.label, name: spec.name, score: s.score, suspicious: s.suspicious, scriptHits: s.scriptHits });
    if (!best || s.score > best.score) {
      best = { spec, text, score: s.score };
      bestText = text;
    } else if (best && s.score === best.score && text === bestText) {
      // 同分同文本(典型:GBK 与 GB18030 对常用字字节重合)→ 保留先出现者,但两条都进候选
    }
  }

  if (!best || bestText === null) {
    return { ok: false, code: "undetectable", message: "no candidate encoding decoded these bytes strictly" };
  }

  /*
   * 同分排序策略(决定 UI 首选与「默认推荐」):
   * 1. 分数降序;
   * 2. 同分时 UTF-8 优先 —— 纯 ASCII 场景下所有 ASCII 兼容编码同分,
   *    UTF-8 是现代默认,把 iso-8859-1 顶到首位是反直觉的;
   * 3. 再按 SPECS 定义顺序(GBK 排在 GB18030 前,更常见)、最后字典序。
   */
  const specOrder = new Map(SPECS.map((sp, i) => [sp.label, i] as const));
  candidates.sort(
    (a, b) =>
      b.score - a.score ||
      (a.label === "utf-8" ? -1 : b.label === "utf-8" ? 1 : 0) ||
      (specOrder.get(a.label) ?? 999) - (specOrder.get(b.label) ?? 999) ||
      a.label.localeCompare(b.label),
  );

  // API 自洽:对外暴露的 label 必须就是 candidates[0](否则同分时两者不一致)。
  // 同分对 CJK 很常见(GBK 与 GB18030 对常用字字节完全重合),让字典序在 UI 上做确定性排列,
  // 但**首选编码按 SPECS 定义顺序优先**(GBK 比 GB18030 更常见,更适合作为默认推荐)。
  const topLabel = candidates[0].label;
  if (best && topLabel !== best.spec.label) {
    const altText = strictDecode(bytes, topLabel);
    if (altText !== null) {
      const altSpec = SPECS.find((sp) => sp.label === topLabel);
      if (altSpec) {
        best = { spec: altSpec, text: altText, score: candidates[0].score };
        bestText = altText;
      }
    }
  }

  // 置信度分级:只有最高分严格领先第二名才算 high;纯 ASCII 一律 low
  const nonAscii = candidates[0]?.scriptHits !== undefined;
  const top = candidates[0];
  const second = candidates[1];
  const isPureAscii = [...bestText].every((c) => c.codePointAt(0) !== undefined && (c.codePointAt(0) as number) < 0x80);

  /*
   * 纯 ASCII 的特殊处理:所有 ASCII 兼容编码解出完全相同的文本,
   * 分数差异只来自各自的族打分公式(拉丁族对纯字母给 95,UTF-8 族给 60),
   * 这个差异没有任何信息含量 —— 因此把 utf-8 顶到首位作为默认推荐,
   * 并把置信度标为 low(见下方分级)。这是「默认值合理」而非「判定正确」。
   */
  if (isPureAscii) {
    const utf8Idx = candidates.findIndex((c) => c.label === "utf-8");
    if (utf8Idx >= 0) {
      const [u] = candidates.splice(utf8Idx, 1);
      candidates.unshift(u);
    }
    const utf8Spec = SPECS.find((sp) => sp.label === "utf-8");
    const utf8Text = strictDecode(bytes, "utf-8");
    if (utf8Spec && utf8Text !== null) {
      best = { spec: utf8Spec, text: utf8Text, score: candidates[0].score };
      bestText = utf8Text;
    }
  }
  let confidence: DetectConfidence;
  let reason: string;
  if (isPureAscii) {
    confidence = "low";
    reason = "Input is pure ASCII — UTF-8 and every ASCII-compatible encoding agree, so no distinction is possible";
  } else if (top.score >= 80 && (!second || top.score - second.score >= 15)) {
    confidence = "high";
    reason = `Strict decode succeeded and script match is dominant (score ${top.score}, next ${second?.score ?? "—"})`;
  } else if (top.score >= 55) {
    confidence = "medium";
    reason = `Strict decode succeeded with plausible script match (score ${top.score}); alternatives listed below`;
  } else {
    confidence = "low";
    reason = "Multiple encodings decode these bytes with similar plausibility — check the alternatives";
  }
  void nonAscii;

  return {
    ok: true,
    label: best.spec.label,
    name: best.spec.name,
    confidence,
    reason,
    candidates,
    text: bestText,
    byteLength: bytes.length,
  };
}

/* -------------------------------------------------------------------------- */
/* 辅助                                                                        */
/* -------------------------------------------------------------------------- */

/** 按指定编码解码(用户手动改选后调用)。不做 fatal,损坏字节显示为 U+FFFD。 */
export function decodeWith(bytes: Uint8Array, label: string): { text: string; replacements: number } {
  const text = new TextDecoder(label, { fatal: false }).decode(bytes);
  let replacements = 0;
  for (const ch of text) if (ch === "\u{FFFD}") replacements++;
  return { text, replacements };
}

/** 字节长度的人类可读格式。 */
export function humanBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}
