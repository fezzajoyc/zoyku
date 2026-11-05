"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { Field, Note, NumIn, Sel, TableBox, BigOut, fmt, pick } from "./calc-ui";
import {
  COOKING_DENSITY as COOKING_G_PER_CUP,
  DENSITY_KEYS,
  OVEN_STEPS,
  cToF,
  cookConvert,
  type CookUnit,
} from "../_lib/cooking";

/**
 * 烹饪换算引擎:食材感知的体积↔重量 + 体积/重量内部换算 + 烤箱温度表。
 * 数学与密度表在 tools/_lib/cooking.ts;这里只做本地化标签与 UI。
 */

/** 食材名 [en, zh, ja, es, pt],首列与密度表键一致 */
const ING: Array<[string, string, string, string, string]> = [
  ["All-purpose flour", "中筋面粉", "中力粉", "Harina de trigo", "Farinha de trigo"],
  ["Whole wheat flour", "全麦面粉", "全粒粉", "Harina integral", "Farinha integral"],
  ["Granulated sugar", "白砂糖", "グラニュー糖", "Azúcar granulado", "Açúcar refinado"],
  ["Brown sugar (packed)", "红糖(压实)", "黒糖(押し固めた)", "Azúcar moreno (compactado)", "Açúcar mascavo (compactado)"],
  ["Powdered sugar", "糖粉", "粉糖", "Azúcar glas", "Açúcar de confeiteiro"],
  ["Cocoa powder (unsweetened)", "无糖可可粉", "ココアパウダー(無糖)", "Cacao en polvo (sin azúcar)", "Cacau em pó (sem açúcar)"],
  ["Cornstarch", "玉米淀粉", "コーンスターチ", "Maicena", "Amido de milho"],
  ["Salt (fine)", "食盐(细)", "食塩(細かい)", "Sal fina", "Sal fino"],
  ["Butter", "黄油", "バター", "Mantequilla", "Manteiga"],
  ["Vegetable oil", "植物油", "サラダ油", "Aceite vegetal", "Óleo vegetal"],
  ["Olive oil", "橄榄油", "オリーブオイル", "Aceite de oliva", "Azeite de oliva"],
  ["Water", "水", "水", "Agua", "Água"],
  ["Milk", "牛奶", "牛乳", "Leche", "Leite"],
  ["Heavy cream", "淡奶油", "生クリーム", "Nata líquida", "Creme de leite"],
  ["Yogurt", "酸奶", "ヨーグルト", "Yogur", "Iogurte"],
  ["Honey", "蜂蜜", "はちみつ", "Miel", "Mel"],
  ["Maple syrup", "枫糖浆", "メープルシロップ", "Jarabe de arce", "Xarope de bordo"],
  ["Peanut butter", "花生酱", "ピーナッツバター", "Crema de cacahuete", "Pasta de amendoim"],
  ["White rice (uncooked)", "大米(生)", "米(生)", "Arroz blanco (crudo)", "Arroz branco (cru)"],
  ["Rolled oats", "燕麦片", "オートミール", "Copos de avena", "Aveia em flocos"],
  ["Almond flour", "杏仁粉", "アーモンドプードル", "Harina de almendra", "Farinha de amêndoa"],
  ["Chocolate chips", "巧克力豆", "チョコチップ", "Pepitas de chocolate", "Gotas de chocolate"],
  ["Shredded coconut", "椰蓉", "ココナッツフルーク", "Coco rallado", "Coco ralado"],
  ["Chopped walnuts", "核桃碎", "くるみ(刻み)", "Nueces picadas", "Nozes picadas"],
];

const VOLUME_UNITS: Array<[CookUnit, string, string, string, string, string]> = [
  ["cup", "cup", "杯", "カップ", "taza", "xícara"],
  ["tbsp", "tablespoon", "汤匙", "大さじ", "cucharada", "colher de sopa"],
  ["tsp", "teaspoon", "茶匙", "小さじ", "cucharadita", "colher de chá"],
  ["fl-oz", "fl oz", "液量盎司", "液量オンス", "onza líq.", "onça líq."],
  ["ml", "ml", "毫升", "ml", "ml", "ml"],
  ["l", "liter", "升", "リットル", "litro", "litro"],
];

const WEIGHT_UNITS: Array<[CookUnit, string, string, string, string, string]> = [
  ["g", "gram", "克", "グラム", "gramo", "grama"],
  ["kg", "kilogram", "千克", "キログラム", "kilogramo", "quilograma"],
  ["oz", "ounce", "盎司", "オンス", "onza", "onça"],
  ["lb", "pound", "磅", "ポンド", "libra", "libra"],
];

const S = {
  ingredient: { en: "Ingredient", zh: "食材", ja: "材料", es: "Ingrediente", pt: "Ingrediente", fr: "Ingrédient", de: "Zutat", ru: "Ингредиент", it: "Ingrediente", tr: "Malzeme", ko: "재료", ar: "المكوّن", hi: "सामग्री", id: "Bahan", vi: "Nguyên liệu" },
  amount: { en: "Amount", zh: "数量", ja: "量", es: "Cantidad", pt: "Quantidade", fr: "Quantité", de: "Menge", ru: "Количество", it: "Quantità", tr: "Miktar", ko: "양", ar: "الكمية", hi: "मात्रा", id: "Jumlah", vi: "Số lượng" },
  from: { en: "From", zh: "从", ja: "変換元", es: "De", pt: "De", fr: "De", de: "Von", ru: "Из", it: "Da", tr: "Kaynak", ko: "변환 전", ar: "من", hi: "से", id: "Dari", vi: "Từ" },
  to: { en: "To", zh: "到", ja: "変換先", es: "A", pt: "Para", fr: "Vers", de: "Nach", ru: "В", it: "A", tr: "Hedef", ko: "변환 후", ar: "إلى", hi: "तक", id: "Ke", vi: "Sang" },
  result: { en: "Result", zh: "结果", ja: "結果", es: "Resultado", pt: "Resultado", fr: "Résultat", de: "Ergebnis", ru: "Результат", it: "Risultato", tr: "Sonuç", ko: "결과", ar: "النتيجة", hi: "परिणाम", id: "Hasil", vi: "Kết quả" },
  volume: { en: "Volume", zh: "体积", ja: "体積", es: "Volumen", pt: "Volume", fr: "Volume", de: "Volumen", ru: "Объём", it: "Volume", tr: "Hacim", ko: "부피", ar: "الحجم", hi: "आयतन", id: "Volume", vi: "Thể tích" },
  weight: { en: "Weight", zh: "重量", ja: "重量", es: "Peso", pt: "Peso", fr: "Poids", de: "Gewicht", ru: "Вес", it: "Peso", tr: "Ağırlık", ko: "무게", ar: "الوزن", hi: "वज़न", id: "Berat", vi: "Khối lượng" },
  oven: { en: "Oven temperatures", zh: "烤箱温度对照", ja: "オーブン温度の目安", es: "Temperaturas de horno", pt: "Temperaturas de forno", fr: "Températures du four", de: "Ofentemperaturen", ru: "Температуры духовки", it: "Temperature del forno", tr: "Fırın sıcaklıkları", ko: "오븐 온도", ar: "درجات حرارة الفرن", hi: "ओवन तापमान", id: "Suhu oven", vi: "Nhiệt độ lò" },
  invalid: {
    en: "Enter an amount of zero or more. Converting between volume and weight needs an ingredient from the list.",
    zh: "请输入 ≥ 0 的数量。体积和重量互转需要从列表中选择食材。",
    ja: "0 以上の量を入力してください。体積と重量の変換にはリストから材料を選ぶ必要があります。",
    es: "Introduzca una cantidad de cero o más. Para convertir entre volumen y peso hay que elegir un ingrediente de la lista.",
    pt: "Digite uma quantidade igual ou maior que zero. Para converter entre volume e peso, escolha um ingrediente da lista.",
    fr: "Vérifiez les dates : cet outil attend des dates AAAA-MM-JJ et un nombre entier de jours.",
    de: "Daten prüfen: Das Tool erwartet JJJJ-MM-TT-Daten und eine ganze Zahl von Tagen.",
    ru: "Проверьте даты: нужен формат ГГГГ-ММ-ДД и целое число дней.",
    it: "Controlla le date: lo strumento richiede date AAAA-MM-GG e un numero intero di giorni.",
    tr: "Tarihleri kontrol edin: araç YYYY-AA-GG tarihleri ve tam sayı gün ister.",
    ko: "날짜를 확인하세요: YYYY-MM-DD 형식의 날짜와 정수 일수가 필요합니다.",
    ar: "تحقق من التواريخ: تتطلب الأداة تواريخ بصيغة YYYY-MM-DD وعددًا صحيحًا من الأيام.",
    hi: "तारीखें जाँचें: उपकरण को YYYY-MM-DD तारीखें और पूर्ण दिनों की संख्या चाहिए।",
    id: "Periksa tanggal: alat ini butuh tanggal YYYY-MM-DD dan jumlah hari bulat.",
    vi: "Kiểm tra ngày: công cụ cần ngày dạng YYYY-MM-DD và số ngày nguyên.",
  },
  sameDim: {
    en: "Both units measure the same dimension, so the ingredient is not used for this conversion.",
    zh: "两侧单位属于同一维度,此次换算不需要用到食材密度。",
    ja: "両側の単位は同じ次元なので、この変換に材料は使われません。",
    es: "Ambas unidades miden lo mismo, así que el ingrediente no interviene en esta conversión.",
    pt: "As duas unidades medem a mesma grandeza, então o ingrediente não entra nesta conversão.",
    fr: "Les deux unités mesurent la même dimension ; l'ingrédient n'est pas utilisé pour cette conversion.",
    de: "Beide Einheiten messen dieselbe Dimension — die Zutat wird für diese Umrechnung nicht benötigt.",
    ru: "Обе единицы измеряют одну величину — ингредиент для этого перевода не используется.",
    it: "Entrambe le unità misurano la stessa dimensione: l'ingrediente non serve per questa conversione.",
    tr: "Her iki birim de aynı boyutu ölçüyor — bu dönüşüm için malzemeye gerek yok.",
    ko: "두 단위는 같은 차원을 측정합니다 — 이 변환에는 재료 정보가 사용되지 않습니다.",
    ar: "كلتا الوحدتين تقيسان البعد نفسه — لا يُستخدم المكوّن في هذا التحويل.",
    hi: "दोनों इकाइयाँ एक ही विमा मापती हैं — इस रूपांतरण में सामग्री की आवश्यकता नहीं।",
    id: "Kedua satuan mengukur dimensi yang sama — bahan tidak dipakai untuk konversi ini.",
    vi: "Hai đơn vị đo cùng chiều — không cần dùng nguyên liệu cho phép chuyển này.",
  },
  densityNote: {
    en: "Cup weights are published averages (King Arthur, USDA and similar sources): a scooped cup of flour can vary ±15 %. For baking precision, weigh your ingredients.",
    zh: "每杯克重取自常见出版数据(King Arthur、USDA 等)的平均值:实际舀取可能相差 ±15%。烘焙求准,请以秤为准。",
    ja: "1 カップのグラム数は King Arthur・USDA などの公開値の平均です。すくい方で ±15 % ぐらい変わります。製菓・製パンで正確さが必要なときは秤で量ってください。",
    es: "Los pesos por taza son promedios publicados (King Arthur, USDA y similares): una taza de harina puede variar ±15 %. Para precisión en repostería, pese los ingredientes.",
    pt: "Os pesos por xícara são médias publicadas (King Arthur, USDA e afins): uma xícara de farinha pode variar ±15 %. Para precisão na confeitaria, pese os ingredientes.",
    fr: "Les poids de tasse sont des moyennes publiées (King Arthur, USDA et sources similaires) : une tasse versée de farine ≈ 120 g, une tasse tassée ≈ 160 g. Les écarts de mesure expliquent la plupart des différences de résultat.",
    de: "Tassengewichte sind veröffentlichte Durchschnittswerte (King Arthur, USDA u. ä.): eine geschüttete Tasse Mehl ≈ 120 g, eine gestrichene ≈ 160 g. Messunterschiede erklären die meisten Abweichungen.",
    ru: "Веса чашки — опубликованные средние (King Arthur, USDA и похожие): зачерпнутая чашка муки ≈ 120 г, без горки ≈ 160 г. Различия в мерке объясняют большинство расхождений.",
    it: "I pesi della tazza sono medie pubblicate (King Arthur, USDA e simili): una tazza di farina prelevata ≈ 120 g, livellata ≈ 160 g. Le differenze di misura spiegano la maggior parte delle variazioni.",
    tr: "Bardak ağırlıkları yayımlanmış ortalamalardır (King Arthur, USDA vb.): doldurulmuş bir bardak un ≈ 120 g, overilmiş ≈ 160 g. Ölçü farkları sonuç değişimlerinin çoğunu açıklar.",
    ko: "컵 무게는 공개된 평균값입니다(King Arthur, USDA 등): 가득 퍼낸 밀가루 1컵 ≈ 120g, 수평으로 깎은 1컵 ≈ 160g. 계량 방식 차이가 결과 차이의 대부분을 설명합니다.",
    ar: "أوزان الكوب متوسطات منشورة (King Arthur وUSOما شابه): كوب دقيق مكشوك ≈ 120 غ، مسوّى ≈ 160 غ. اختلاف طريقة القياس يفسر معظم فروق النتيجة.",
    hi: "कप वज़न प्रकाशित औसत हैं (King Arthur, USDA आदि): डली हुई मैदा की कप ≈ 120 ग्राम, समान कटी हुई ≈ 160 ग्राम। मापन का अंतर ज़्यादातर अंतर समझाता है।",
    id: "Berat cangkir adalah rata-rata terpublikasi (King Arthur, USDA, dll.): satu cangkir tepung yang ditakar penuh ≈ 120 g, diratakan ≈ 160 g. Perbedaan cara takar menjelaskan sebagian besar perbedaan hasil.",
    vi: "Trọng lượng cốc là trung bình công bố (King Arthur, USDA v.v.): một cốc bột múc đầy ≈ 120 g, gạt ngang ≈ 160 g. Khác biệt cách đo giải thích phần lớn sai lệch kết quả.",
  },
};

function ingLabel(key: string, locale: string): string {
  const row = ING.find((r) => r[0] === key);
  if (!row) return key;
  const idx = locale === "zh" ? 1 : locale === "ja" ? 2 : locale === "es" ? 3 : locale === "pt" ? 4 : 0;
  return row[idx] ?? row[0];
}

function unitLabel(list: Array<[CookUnit, ...string[]]>, u: CookUnit, locale: string): string {
  const row = list.find((r) => r[0] === u);
  if (!row) return u;
  const idx = locale === "zh" ? 2 : locale === "ja" ? 3 : locale === "es" ? 4 : locale === "pt" ? 5 : 1;
  return row[idx] ?? u;
}

const isVolume = (u: CookUnit) => VOLUME_UNITS.some((r) => r[0] === u);
/** 常见摄氏烤箱档位(显示在 °F 档位右侧的 °C→°F 两列) */
const C_STEPS = [140, 160, 180, 200, 220, 240];

export function CalcEngineCooking() {
  const { locale } = useI18n();
  const [value, setValue] = useState("2");
  const [ingredient, setIngredient] = useState("All-purpose flour");
  const [from, setFrom] = useState<CookUnit>("cup");
  const [to, setTo] = useState<CookUnit>("g");

  const v = Number(value);
  const out = useMemo(() => cookConvert(v, from, to, ingredient), [v, from, to, ingredient]);
  const valid = Number.isFinite(out);
  const sameDim = isVolume(from) === isVolume(to);
  const summary = valid ? `${fmt(out, locale, 2)} ${unitLabel(isVolume(to) ? VOLUME_UNITS : WEIGHT_UNITS, to, locale)}` : "";

  return (
    <ToolPanel>
      <Field label={pick(locale, S.ingredient)}>
        <Sel value={ingredient} onChange={setIngredient} aria={pick(locale, S.ingredient)}>
          {DENSITY_KEYS.map((key) => (
            <option key={key} value={key}>
              {ingLabel(key, locale)} ({pick(locale, { en: `${COOKING_G_PER_CUP[key]} g/cup`, zh: `每杯 ${COOKING_G_PER_CUP[key]} 克`, ja: `1カップ ${COOKING_G_PER_CUP[key]} g`, es: `${COOKING_G_PER_CUP[key]} g/taza`, pt: `${COOKING_G_PER_CUP[key]} g/xícara` })})
            </option>
          ))}
        </Sel>
      </Field>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <Field label={pick(locale, S.amount)}>
          <NumIn value={value} onChange={setValue} aria={pick(locale, S.amount)} placeholder="2" />
        </Field>
        <Field label={pick(locale, S.from)}>
          <Sel value={from} onChange={(x) => setFrom(x as CookUnit)} aria={pick(locale, S.from)}>
            <optgroup label={pick(locale, S.volume)}>
              {VOLUME_UNITS.map((r) => (
                <option key={r[0]} value={r[0]}>{unitLabel(VOLUME_UNITS, r[0], locale)}</option>
              ))}
            </optgroup>
            <optgroup label={pick(locale, S.weight)}>
              {WEIGHT_UNITS.map((r) => (
                <option key={r[0]} value={r[0]}>{unitLabel(WEIGHT_UNITS, r[0], locale)}</option>
              ))}
            </optgroup>
          </Sel>
        </Field>
        <Field label={pick(locale, S.to)}>
          <Sel value={to} onChange={(x) => setTo(x as CookUnit)} aria={pick(locale, S.to)}>
            <optgroup label={pick(locale, S.volume)}>
              {VOLUME_UNITS.map((r) => (
                <option key={r[0]} value={r[0]}>{unitLabel(VOLUME_UNITS, r[0], locale)}</option>
              ))}
            </optgroup>
            <optgroup label={pick(locale, S.weight)}>
              {WEIGHT_UNITS.map((r) => (
                <option key={r[0]} value={r[0]}>{unitLabel(WEIGHT_UNITS, r[0], locale)}</option>
              ))}
            </optgroup>
          </Sel>
        </Field>
      </div>

      {valid ? (
        <>
          <div className="mt-5">
            <BigOut>
              {summary}
            </BigOut>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <CopyButton value={summary} label={pick(locale, { en: "Copy result", zh: "复制结果", ja: "結果をコピー", es: "Copiar resultado", pt: "Copiar resultado", fr: "Copier le résultat", de: "Ergebnis kopieren", ru: "Копировать результат", it: "Copia risultato", tr: "Sonucu kopyala", ko: "결과 복사", ar: "نسخ النتيجة", hi: "परिणाम कॉपी करें", id: "Salin hasil", vi: "Sao chép kết quả" })} />
          </div>
          {sameDim && (
            <div className="mt-3">
              <Note>{pick(locale, S.sameDim)}</Note>
            </div>
          )}
        </>
      ) : (
        <div className="mt-5">
          <Note>{pick(locale, S.invalid)}</Note>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-[14px] font-semibold">{pick(locale, S.oven)}</h3>
        <div className="mt-3">
          <TableBox
            head={["°F", "°C", "°C", "°F"]}
            rows={OVEN_STEPS.map(([f, c], i) => {
              const cStep = C_STEPS[i];
              return [
                f,
                c,
                cStep ?? "",
                cStep === undefined ? "" : Math.round(cToF(cStep)),
              ] as (string | number)[];
            })}
          />
        </div>
      </div>

      <div className="mt-4">
        <Note>{pick(locale, S.densityNote)}</Note>
      </div>
    </ToolPanel>
  );
}
