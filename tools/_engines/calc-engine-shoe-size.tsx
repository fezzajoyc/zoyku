"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, Note, NumIn, Sel, Stats, Tabs, TableBox, fmt, pick } from "./calc-ui";
import { SHOE_TABLE, shoeConvert, type ShoeSystem } from "../_lib/shoe-size";

/**
 * 鞋码换算引擎:内置对照表双向精确查找,男/女两个页签。
 * 数据与查找在 tools/_lib/shoe-size.ts,这里只做本地化标签与 UI。
 */

const S = {
  men: { en: "Men", zh: "男款", ja: "メンズ", es: "Hombre", pt: "Masculino", fr: "Hommes", de: "Herren", ru: "Мужчины", it: "Uomini", tr: "Erkek", ko: "남성", ar: "رجال", hi: "पुरुष", id: "Pria", vi: "Nam" },
  women: { en: "Women", zh: "女款", ja: "レディース", es: "Mujer", pt: "Feminino", fr: "Femmes", de: "Damen", ru: "Женщины", it: "Donne", tr: "Kadın", ko: "여성", ar: "نساء", hi: "महिलाएँ", id: "Wanita", vi: "Nữ" },
  system: { en: "I know this size", zh: "我知道这个码", ja: "このサイズで探す", es: "Conozco esta talla", pt: "Sei este tamanho", fr: "Je connais cette taille", de: "Ich kenne diese Größe", ru: "Я знаю этот размер", it: "Conosco questa taglia", tr: "Bu bedeni biliyorum", ko: "이 사이즈를 알고 있습니다", ar: "أعرف هذا المقاس", hi: "मैं यह साइज़ जानता/जानती हूँ", id: "Saya tahu ukuran ini", vi: "Tôi biết cỡ này" },
  size: { en: "Size", zh: "码数", ja: "サイズ", es: "Talla", pt: "Tamanho", fr: "Taille", de: "Größe", ru: "Размер", it: "Taglia", tr: "Beden", ko: "사이즈", ar: "المقاس", hi: "साइज़", id: "Ukuran", vi: "Cỡ" },
  us: { en: "US", zh: "美码(US)", ja: "US", es: "US", pt: "US", fr: "US", de: "US", ru: "США", it: "US", tr: "ABD", ko: "미국", ar: "أمريكي", hi: "यूएस", id: "AS", vi: "Mỹ" },
  uk: { en: "UK", zh: "英码(UK)", ja: "UK", es: "UK", pt: "UK", fr: "UK", de: "UK", ru: "Британия", it: "UK", tr: "İngiltere", ko: "영국", ar: "بريطاني", hi: "यूके", id: "Inggris", vi: "Anh" },
  eu: { en: "EU", zh: "欧码(EU)", ja: "EU", es: "EU", pt: "EU", fr: "EU", de: "EU", ru: "Европа", it: "EU", tr: "AB", ko: "유럽", ar: "أوروبي", hi: "ईयू", id: "EROPA", vi: "Âu" },
  jp: { en: "Japan / foot length (cm)", zh: "日本码 / 脚长(cm)", ja: "JP / 足長(cm)", es: "Japón / largo del pie (cm)", pt: "Japão / comprimento do pé (cm)", fr: "Japon / longueur du pied (cm)", de: "Japan / Fußlänge (cm)", ru: "Япония / длина стопы (см)", it: "Giappone / lunghezza piede (cm)", tr: "Japonya / ayak uzunluğu (cm)", ko: "일본/발 길이(cm)", ar: "اليابان / طول القدم (سم)", hi: "जापान / पैर की लंबाई (सेमी)", id: "Jepang / panjang kaki (cm)", vi: "Nhật / dài bàn chân (cm)" },
  footLength: { en: "Foot length / Japan", zh: "脚长 / 日本码", ja: "足長 / JP", es: "Largo del pie / Japón", pt: "Comprimento do pé / Japão", fr: "Longueur du pied / Japon", de: "Fußlänge / Japan", ru: "Длина стопы / Япония", it: "Lunghezza piede / Giappone", tr: "Ayak uzunluğu / Japonya", ko: "발 길이/일본", ar: "طول القدم / اليابان", hi: "पैर की लंबाई / जापान", id: "Panjang kaki / Jepang", vi: "Dài bàn chân / Nhật" },
  usMenOut: { en: "US men", zh: "美码(男)", ja: "US(メンズ)", es: "US hombre", pt: "US masculino", fr: "US homme", de: "US Herren", ru: "США муж.", it: "US uomo", tr: "ABD erkek", ko: "미국 남성", ar: "أمريكي رجال", hi: "यूएस पुरुष", id: "AS pria", vi: "Mỹ nam" },
  usWomenOut: { en: "US women", zh: "美码(女)", ja: "US(レディース)", es: "US mujer", pt: "US feminino", fr: "US femme", de: "US Damen", ru: "США жен.", it: "US donna", tr: "ABD kadın", ko: "미국 여성", ar: "أمريكي نساء", hi: "यूएस महिला", id: "AS wanita", vi: "Mỹ nữ" },
  ukOut: { en: "UK", zh: "英码", ja: "UK", es: "UK", pt: "UK", fr: "UK", de: "UK", ru: "Британия", it: "UK", tr: "İngiltere", ko: "영국", ar: "بريطاني", hi: "यूके", id: "Inggris", vi: "Anh" },
  euOut: { en: "EU", zh: "欧码", ja: "EU", es: "EU", pt: "EU", fr: "EU", de: "EU", ru: "Европа", it: "EU", tr: "AB", ko: "유럽", ar: "أوروبي", hi: "ईयू", id: "EROPA", vi: "Âu" },
  tableCm: { en: "Foot length (cm)", zh: "脚长(cm)", ja: "足長(cm)", es: "Largo del pie (cm)", pt: "Comprimento (cm)", fr: "Longueur du pied (cm)", de: "Fußlänge (cm)", ru: "Длина стопы (см)", it: "Lunghezza piede (cm)", tr: "Ayak uzunluğu (cm)", ko: "발 길이(cm)", ar: "طول القدم (سم)", hi: "पैर की लंबाई (सेमी)", id: "Panjang kaki (cm)", vi: "Dài bàn chân (cm)" },
  tableUs: { en: "US", zh: "美码", ja: "US", es: "US", pt: "US", fr: "US", de: "US", ru: "США", it: "US", tr: "ABD", ko: "미국", ar: "أمريكي", hi: "यूएस", id: "AS", vi: "Mỹ" },
  tableUk: { en: "UK", zh: "英码", ja: "UK", es: "UK", pt: "UK", fr: "UK", de: "UK", ru: "Британия", it: "UK", tr: "İngiltere", ko: "영국", ar: "بريطاني", hi: "यूके", id: "Inggris", vi: "Anh" },
  tableEu: { en: "EU", zh: "欧码", ja: "EU", es: "EU", pt: "EU", fr: "EU", de: "EU", ru: "Европа", it: "EU", tr: "AB", ko: "유럽", ar: "أوروبي", hi: "ईयू", id: "EROPA", vi: "Âu" },
  fullTable: {
    en: "Full chart",
    zh: "完整对照表",
    ja: "全サイズ表",
    es: "Tabla completa",
    pt: "Tabela completa",
    fr: "Tableau complet",
    de: "Volle Tabelle",
    ru: "Полная таблица",
    it: "Tabella completa",
    tr: "Tam tablo",
    ko: "전체 표",
    ar: "الجدول الكامل",
    hi: "पूरी तालिका",
    id: "Tabel lengkap",
    vi: "Bảng đầy đủ",
  },
  notFound: {
    en: "That size is not in the chart. Sizes run in half steps (and EU steps are irregular) — try the nearest half size or pick from the full chart below.",
    zh: "表里没有这个码。码数以半码为步进(欧码档位还不规则)——试试最接近的半码,或直接在下方完整对照表里选。",
    ja: "そのサイズは表にありません。サイズは 0.5 刻み(EU は不規則)なので、近い半サイズを試すか、下の全サイズ表から選んでください。",
    es: "Esa talla no está en la tabla. Las tallas van en medios pasos (y los pasos EU son irregulares): pruebe la media talla más cercana o elija en la tabla completa de abajo.",
    pt: "Esse número não está na tabela. Os tamanhos vão em meios passos (e os passos EU são irregulares) — tente o meio número mais próximo ou escolha na tabela completa abaixo.",
    fr: "Cette taille n'est pas dans le tableau. Les tailles avancent par demi-mesures (et les pas EU sont irréguliers) — essayez la valeur la plus proche.",
    de: "Diese Größe ist nicht in der Tabelle. Größen laufen in Halb schritten (EU-Schritte sind unregelmäßig) — versuche den nächsten Wert.",
    ru: "Такого размера нет в таблице. Размеры идут полушагами (шаги EU нерегулярны) — попробуйте ближайшее значение.",
    it: "Questa taglia non è in tabella. Le taglie avanzano a mezzi passi (e i passi EU sono irregolari) — prova il valore più vicino.",
    tr: "Bu beden tabloda yok. Bedenler yarım adımlarla ilerler (EU adımları düzensiz) — en yakın değeri deneyin.",
    ko: "해당 사이즈가 표에 없습니다. 사이즈는 반 걸음씩 증가하고(EU는 불규칙) 가장 가까운 값을 시도해 보세요.",
    ar: "هذا المقاس ليس في الجدول. المقاسات تتقدم بأنصاف خطوات (وخطوات EU غير منتظمة) — جرّب أقرب قيمة.",
    hi: "यह साइज़ तालिका में नहीं है। साइज़ आधे कदम से बढ़ते हैं (EU कदम अनियमित हैं) — निकटतम मान आज़माएँ।",
    id: "Ukuran itu tidak ada di tabel. Ukuran berjalan dalam setengah langkah (langkah EU tidak teratur) — coba nilai terdekat.",
    vi: "Cỡ này không có trong bảng. Cỡ đi theo nửa bước (bước EU không đều) — hãy thử giá trị gần nhất.",
  },
  honesty: {
    en: "Real shoes vary about half a size between brands, and EU sizing is not standardized. Treat the chart as a strong starting point, then trust the brand's own size guide. For the foot length column, measure at the end of the day while standing.",
    zh: "不同品牌的实际鞋码普遍相差约半码,欧码也没有统一标准。把对照表当作可靠的起点,下单前再对一下品牌自家的尺码指南;要量脚长,请在傍晚站立状态下测量。",
    ja: "実際の靴はブランドによって約 0.5 サイズ違いますし、EU サイズは統一されていません。この表を出発点にし、購入前に対象ブランドのサイズガイドを確認してください。足長は夕方に立った状態で測るのが確実です。",
    es: "Entre marcas, el calzado real varía cerca de media talla, y el tallaje EU no está normalizado. Tome la tabla como punto de partida sólido y confíe en la guía de la marca. Para el largo del pie, mida al final del día de pie.",
    pt: "Entre marcas, o calçado real varia cerca de meio número, e a numeração EU não é padronizada. Use a tabela como ponto de partida confiável e confira o guia da marca. Para o comprimento do pé, meça no fim do dia, em pé.",
    fr: "Les vraies chaussures varient d'environ une demi-taille selon les marques, et le pointage EU n'est pas normalisé. Traitez ce tableau comme un point de départ : en cas de doute, essayez les deux tailles adjacentes.",
    de: "Echte Schuhe variieren je nach Marke um etwa eine halbe Größe, und EU-Größen sind nicht genormt. Behandle die Tabelle als Startpunkt: im Zweifel beide Nachbargrößen anprobieren.",
    ru: "Настоящая обувь различается между брендами примерно на полразмера, а EU-размеры не стандартизированы. Считайте таблицу отправной точкой: при сомнении примерьте оба соседних размера.",
    it: "Le scarpe vere variano di circa mezza taglia tra i marchi e la taglia UE non è standardizzata. Tratta la tabella come punto di partenza: nel dubbio prova entrambe le taglie adiacenti.",
    tr: "Gerçek ayakkabılar markalara göre yaklaşık yarım beden oynar ve EU bedenlendirmesi standart değildir. Tabloyu başlangıç noktası sayın: şüphede iki komşu bedeni de deneyin.",
    ko: "실제 신발은 브랜드에 따라 약 반 사이즈씩 차이가 나고 EU 사이즈는 표준화되어 있지 않습니다. 이 표는 출발점으로 삼고 애매하면 양옆 사이즈를 모두 신어 보세요.",
    ar: "الأحذية الحقيقية تتفاوت بنحو نصف مقاس بين العلامات، ومقاسات EU غير موحدة. اعتبر الجدول نقطة انطلاق: عند الشك جرّب المقاسين المتجاورين.",
    hi: "असली जूते ब्रांड के अनुसार लगभग आधे साइज़ भिन्न होते हैं, और EU साइज़िंग मानकीकृत नहीं है। तालिका को शुरुआती बिंदु मानें: संदेह होने पर दोनों निकट साइज़ आज़माएँ।",
    id: "Sepatu nyata bervariasi sekitar setengah ukuran antar merek, dan ukuran EU tidak terstandar. Anggap tabel ini titik awal: bila ragu, coba kedua ukuran tetangga.",
    vi: "Giày thật chênh khoảng nửa cỡ giữa các hãng và cỡ EU không chuẩn hóa. Coi bảng này là điểm khởi đầu: nếu phân vân, thử cả hai cỡ liền kề.",
  },
};

const SYSTEM_LABELS = [S.us, S.uk, S.eu, S.jp];
const SYSTEM_IDS: ShoeSystem[] = ["us", "uk", "eu", "jp"];

export function CalcEngineShoeSize() {
  const { locale } = useI18n();
  const [gender, setGender] = useState("men");
  const [system, setSystem] = useState<ShoeSystem>("us");
  const [size, setSize] = useState("9");

  const g = gender === "women" ? "women" : "men";
  const row = useMemo(
    () => shoeConvert(Number(size), system, g),
    [size, system, g],
  );
  const usLabel = g === "men" ? S.usMenOut : S.usWomenOut;

  return (
    <ToolPanel>
      <Tabs
        options={[
          { id: "men", label: pick(locale, S.men) },
          { id: "women", label: pick(locale, S.women) },
        ]}
        value={gender}
        onChange={setGender}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.system)}>
          <Sel value={system} onChange={(v) => setSystem(v as ShoeSystem)} aria={pick(locale, S.system)}>
            {SYSTEM_IDS.map((id, i) => (
              <option key={id} value={id}>
                {pick(locale, SYSTEM_LABELS[i])}
              </option>
            ))}
          </Sel>
        </Field>
        <Field label={pick(locale, S.size)}>
          <NumIn value={size} onChange={setSize} aria={pick(locale, S.size)} placeholder="9" />
        </Field>
      </div>

      {row ? (
        <div className="mt-5">
          <Stats
            items={[
              { label: pick(locale, usLabel), value: fmt(g === "men" ? row.usMen : row.usWomen, locale, 1), tone: "accent" },
              { label: pick(locale, S.ukOut), value: fmt(row.uk, locale, 1) },
              { label: pick(locale, S.euOut), value: fmt(row.eu, locale, 1) },
              { label: pick(locale, S.footLength), value: fmt(row.cm, locale, 1) },
            ]}
          />
        </div>
      ) : (
        <div className="mt-5">
          <Note>{pick(locale, S.notFound)}</Note>
        </div>
      )}

      <div className="mt-6">
        <Note>{pick(locale, S.fullTable)}</Note>
      </div>
      <div className="mt-2">
        <TableBox
          head={[
            pick(locale, S.tableCm),
            `${pick(locale, S.tableUs)} (${g === "men" ? pick(locale, S.men) : pick(locale, S.women)})`,
            pick(locale, S.tableUk),
            pick(locale, S.tableEu),
          ]}
          rows={SHOE_TABLE.map((r) => [
            fmt(r.cm, locale, 1),
            fmt(g === "men" ? r.usMen : r.usWomen, locale, 1),
            fmt(r.uk, locale, 1),
            fmt(r.eu, locale, 1),
          ])}
        />
      </div>
      <div className="mt-4">
        <Note>{pick(locale, S.honesty)}</Note>
      </div>
    </ToolPanel>
  );
}
