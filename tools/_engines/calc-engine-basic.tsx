"use client";
import { parseLocaleNumber } from "../_lib/numparse";

import type { Locale } from "@/lib/site";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Stats, Tabs, fmt, fmtMoney, pick } from "./calc-ui";

/**
 * One engine for the simple-form calculators: bmi, percentage, discount,
 * profit, tip, fuel. props.kind selects the tool.
 */

const S: Record<string, Record<string, string>> =  {
  metric: { en: "Metric", zh: "公制", ja: "メートル法", es: "Métrico", pt: "Métrico", fr: "Métrique", de: "Metrisch", ru: "Метрическая", it: "Metrico", tr: "Metrik", ko: "미터법", ar: "متري", hi: "मीट्रिक", id: "Metrik", vi: "Hệ mét" },
  imperial: { en: "Imperial", zh: "英制", ja: "ヤード・ポンド法", es: "Imperial", pt: "Imperial", fr: "Impérial", de: "Imperial", ru: "Имперская", it: "Imperiale", tr: "İngiliz", ko: "야드파운드법", ar: "إمبراطوري", hi: "इम्पीरियल", id: "Imperial", vi: "Hệ Anh" },
  of: { en: "X% of Y", zh: "X% 的 Y", ja: "X% の Y", es: "X% de Y", pt: "X% de Y", fr: "X % de Y", de: "X % von Y", ru: "X % от Y", it: "X% di Y", tr: "Y'nin %X'i", ko: "Y의 X%", ar: "X% من Y", hi: "Y का X%", id: "X% dari Y", vi: "X% của Y" },
  what: { en: "X is what % of Y", zh: "X 是 Y 的百分之几", ja: "X は Y の何%", es: "X es qué % de Y", pt: "X é quanto % de Y", fr: "X est quel % de Y", de: "X sind wie viel % von Y", ru: "X — сколько % от Y", it: "X è quale % di Y", tr: "X, Y'nin yüzde kaçı", ko: "X는 Y의 몇 %", ar: "X هو كم % من Y", hi: "X, Y का कितने % है", id: "X adalah berapa % dari Y", vi: "X chiếm bao nhiêu % của Y" },
  change: { en: "% change", zh: "百分比变化", ja: "変化率", es: "Cambio %", pt: "Variação %", fr: "Variation %", de: "Änderung %", ru: "Изменение %", it: "Variazione %", tr: "Değişim %", ko: "변화율 %", ar: "نسبة التغير %", hi: "प्रतिशत बदलाव", id: "Perubahan %", vi: "Thay đổi %" },
  percent: { en: "Percentage (%)", zh: "百分比 (%)", ja: "パーセント (%)", es: "Porcentaje (%)", pt: "Porcentagem (%)", fr: "Pourcentage (%)", de: "Prozent (%)", ru: "Процент (%)", it: "Percentuale (%)", tr: "Yüzde (%)", ko: "백분율 (%)", ar: "النسبة المئوية (%)", hi: "प्रतिशत (%)", id: "Persentase (%)", vi: "Phần trăm (%)" },
  ofValue: { en: "of value", zh: "的数值", ja: "元の値", es: "del valor", pt: "do valor", fr: "de la valeur", de: "vom Wert", ru: "от значения", it: "del valore", tr: "değerin", ko: "값의", ar: "من القيمة", hi: "मान का", id: "dari nilai", vi: "của giá trị" },
  result: { en: "Result", zh: "结果", ja: "結果", es: "Resultado", pt: "Resultado", fr: "Résultat", de: "Ergebnis", ru: "Результат", it: "Risultato", tr: "Sonuç", ko: "결과", ar: "النتيجة", hi: "परिणाम", id: "Hasil", vi: "Kết quả" },
  from: { en: "From (initial)", zh: "初始值", ja: "開始値", es: "De (inicial)", pt: "De (inicial)", fr: "De (initial)", de: "Von (Anfang)", ru: "Из (начальное)", it: "Da (iniziale)", tr: "Başlangıç", ko: "초기값", ar: "من (الأولي)", hi: "से (प्रारंभ)", id: "Dari (awal)", vi: "Từ (ban đầu)" },
  to: { en: "To (final)", zh: "最终值", ja: "終了値", es: "A (final)", pt: "Para (final)", fr: "Vers (final)", de: "Nach (Ende)", ru: "В (конечное)", it: "A (finale)", tr: "Son değer", ko: "최종값", ar: "إلى (النهائي)", hi: "तक (अंतिम)", id: "Ke (akhir)", vi: "Đến (cuối)" },
  increase: { en: "increase", zh: "增长", ja: "増加", es: "aumento", pt: "aumento", fr: "hausse", de: "Anstieg", ru: "рост", it: "aumento", tr: "artış", ko: "증가", ar: "زيادة", hi: "वृद्धि", id: "kenaikan", vi: "tăng" },
  decrease: { en: "decrease", zh: "下降", ja: "減少", es: "disminución", pt: "queda", fr: "baisse", de: "Rückgang", ru: "снижение", it: "diminuzione", tr: "düşüş", ko: "감소", ar: "انخفاض", hi: "कमी", id: "penurunan", vi: "giảm" },
  price: { en: "Original price", zh: "原价", ja: "元の価格", es: "Precio original", pt: "Preço original", fr: "Prix initial", de: "Originalpreis", ru: "Первоначальная цена", it: "Prezzo originale", tr: "Orijinal fiyat", ko: "원래 가격", ar: "السعر الأصلي", hi: "मूल कीमत", id: "Harga asli", vi: "Giá gốc" },
  discount: { en: "Discount (%)", zh: "折扣 (%)", ja: "割引率 (%)", es: "Descuento (%)", pt: "Desconto (%)", fr: "Remise (%)", de: "Rabatt (%)", ru: "Скидка (%)", it: "Sconto (%)", tr: "İndirim (%)", ko: "할인 (%)", ar: "الخصم (%)", hi: "छूट (%)", id: "Diskon (%)", vi: "Giảm giá (%)" },
  extra: { en: "Extra discount (%)", zh: "叠加折扣 (%)", ja: "追加割引 (%)", es: "Descuento extra (%)", pt: "Desconto extra (%)", fr: "Remise supplémentaire (%)", de: "Zusatzrabatt (%)", ru: "Доп. скидка (%)", it: "Sconto extra (%)", tr: "Ek indirim (%)", ko: "추가 할인 (%)", ar: "خصم إضافي (%)", hi: "अतिरिक्त छूट (%)", id: "Diskon ekstra (%)", vi: "Giảm thêm (%)" },
  none: { en: "none", zh: "无", ja: "なし", es: "ninguno", pt: "nenhum", fr: "aucune", de: "keine", ru: "нет", it: "nessuno", tr: "yok", ko: "없음", ar: "بدون", hi: "कोई नहीं", id: "tidak ada", vi: "không" },
  finalPrice: { en: "Final price", zh: "到手价", ja: "支払額", es: "Precio final", pt: "Preço final", fr: "Prix final", de: "Endpreis", ru: "Итоговая цена", it: "Prezzo finale", tr: "Son fiyat", ko: "최종 가격", ar: "السعر النهائي", hi: "अंतिम कीमत", id: "Harga akhir", vi: "Giá cuối" },
  saved: { en: "You save", zh: "省下", ja: "節約額", es: "Ahorras", pt: "Você economiza", fr: "Vous économisez", de: "Du sparst", ru: "Вы экономите", it: "Risparmi", tr: "Kazancınız", ko: "절약 금액", ar: "توفّر", hi: "आपकी बचत", id: "Anda hemat", vi: "Bạn tiết kiệm" },
  effective: { en: "Effective discount", zh: "实际折扣", ja: "実質割引率", es: "Descuento efectivo", pt: "Desconto efetivo", fr: "Remise effective", de: "Effektiver Rabatt", ru: "Фактическая скидка", it: "Sconto effettivo", tr: "Efektif indirim", ko: "실질 할인율", ar: "الخصم الفعلي", hi: "प्रभावी छूट", id: "Diskon efektif", vi: "Giảm thực tế" },
  cost: { en: "Cost price", zh: "成本价", ja: "仕入価格", es: "Precio de costo", pt: "Preço de custo", fr: "Prix de revient", de: "Einkaufspreis", ru: "Себестоимость", it: "Prezzo di costo", tr: "Maliyet fiyatı", ko: "원가", ar: "سعر التكلفة", hi: "लागत मूल्य", id: "Harga pokok", vi: "Giá vốn" },
  sell: { en: "Selling price", zh: "售价", ja: "販売価格", es: "Precio de venta", pt: "Preço de venda", fr: "Prix de vente", de: "Verkaufspreis", ru: "Цена продажи", it: "Prezzo di vendita", tr: "Satış fiyatı", ko: "판매가", ar: "سعر البيع", hi: "विक्रय मूल्य", id: "Harga jual", vi: "Giá bán" },
  profit: { en: "Profit", zh: "利润", ja: "利益", es: "Ganancia", pt: "Lucro", fr: "Bénéfice", de: "Gewinn", ru: "Прибыль", it: "Profitto", tr: "Kâr", ko: "이익", ar: "الربح", hi: "लाभ", id: "Laba", vi: "Lợi nhuận" },
  loss: { en: "Loss", zh: "亏损", ja: "損失", es: "Pérdida", pt: "Prejuízo", fr: "Perte", de: "Verlust", ru: "Убыток", it: "Perdita", tr: "Zarar", ko: "손실", ar: "الخسارة", hi: "हानि", id: "Rugi", vi: "Lỗ" },
  margin: { en: "Profit margin", zh: "利润率", ja: "利益率", es: "Margen", pt: "Margem de lucro", fr: "Marge bénéficiaire", de: "Gewinnmarge", ru: "Маржа прибыли", it: "Margine di profitto", tr: "Kâr marjı", ko: "이익률", ar: "هامش الربح", hi: "लाभ मार्जिन", id: "Margin laba", vi: "Biên lợi nhuận" },
  markup: { en: "Markup", zh: "加成率", ja: "マークアップ率", es: "Recargo", pt: "Markup", fr: "Marge de majoration", de: "Aufschlag", ru: "Наценка", it: "Ricarico", tr: "Kâr payı", ko: "마크업", ar: "الهامش الإضافي", hi: "मार्कअप", id: "Markup", vi: "Phần cộng thêm" },
  bill: { en: "Bill amount", zh: "账单金额", ja: "請求額", es: "Importe de la cuenta", pt: "Valor da conta", fr: "Montant de l'addition", de: "Rechnungsbetrag", ru: "Сумма счёта", it: "Importo del conto", tr: "Hesap tutarı", ko: "계산서 금액", ar: "مبلغ الفاتورة", hi: "बिल राशि", id: "Jumlah tagihan", vi: "Số tiền hóa đơn" },
  tipPct: { en: "Tip (%)", zh: "小费 (%)", ja: "チップ (%)", es: "Propina (%)", pt: "Gorjeta (%)", fr: "Pourboire (%)", de: "Trinkgeld (%)", ru: "Чаевые (%)", it: "Mancia (%)", tr: "Bahşiş (%)", ko: "팁 (%)", ar: "الإكرامية (%)", hi: "टिप (%)", id: "Tip (%)", vi: "Tiền tip (%)" },
  people: { en: "Split between", zh: "分摊人数", ja: "割り勘の人数", es: "Dividir entre", pt: "Dividir entre", fr: "Diviser entre", de: "Teilen zwischen", ru: "Разделить на", it: "Dividere tra", tr: "Arasında böl", ko: "나눌 인원", ar: "التقسيم بين", hi: "बाँटें", id: "Dibagi antara", vi: "Chia cho" },
  peopleUnit: { en: "people", zh: "人", ja: "人", es: "personas", pt: "pessoas", fr: "personnes", de: "Personen", ru: "чел.", it: "persone", tr: "kişi", ko: "명", ar: "أشخاص", hi: "लोग", id: "orang", vi: "người" },
  tipAmount: { en: "Tip", zh: "小费", ja: "チップ", es: "Propina", pt: "Gorjeta", fr: "Pourboire", de: "Trinkgeld", ru: "Чаевые", it: "Mancia", tr: "Bahşiş", ko: "팁", ar: "الإكرامية", hi: "टिप", id: "Tip", vi: "Tiền tip" },
  total: { en: "Total", zh: "合计", ja: "合計", es: "Total", pt: "Total", fr: "Total", de: "Gesamt", ru: "Итого", it: "Totale", tr: "Toplam", ko: "합계", ar: "الإجمالي", hi: "कुल", id: "Total", vi: "Tổng cộng" },
  perPerson: { en: "Per person", zh: "每人", ja: "一人あたり", es: "Por persona", pt: "Por pessoa", fr: "Par personne", de: "Pro Person", ru: "На человека", it: "A persona", tr: "Kişi başı", ko: "1인당", ar: "لكل شخص", hi: "प्रति व्यक्ति", id: "Per orang", vi: "Mỗi người" },
  distance: { en: "Distance", zh: "距离", ja: "走行距離", es: "Distancia", pt: "Distância", fr: "Distance", de: "Distanz", ru: "Дистанция", it: "Distanza", tr: "Mesafe", ko: "거리", ar: "المسافة", hi: "दूरी", id: "Jarak", vi: "Quãng đường" },
  efficiency: { en: "Fuel efficiency", zh: "油耗", ja: "燃費", es: "Consumo", pt: "Consumo", fr: "Consommation", de: "Verbrauch", ru: "Расход топлива", it: "Consumo", tr: "Yakıt verimi", ko: "연비", ar: "استهلاك الوقود", hi: "ईंधन दक्षता", id: "Konsumsi bahan bakar", vi: "Tiêu hao nhiên liệu" },
  fuelPrice: { en: "Fuel price", zh: "油价", ja: "燃料価格", es: "Precio del combustible", pt: "Preço do combustible", fr: "Prix du carburant", de: "Kraftstoffpreis", ru: "Цена топлива", it: "Prezzo carburante", tr: "Yakıt fiyatı", ko: "유가", ar: "سعر الوقود", hi: "ईंधन मूल्य", id: "Harga bahan bakar", vi: "Giá nhiên liệu" },
  roundTrip: { en: "Round trip", zh: "往返", ja: "往復", es: "Ida y vuelta", pt: "Ida e volta", fr: "Aller-retour", de: "Hin und zurück", ru: "Туда и обратно", it: "Andata e ritorno", tr: "Gidiş-dönüş", ko: "왕복", ar: "ذهاب وعودة", hi: "वापसी सहित", id: "Pulang-pergi", vi: "Khứ hồi" },
  fuelNeeded: { en: "Fuel needed", zh: "所需燃油", ja: "必要な燃料", es: "Combustible necesario", pt: "Combustível necessário", fr: "Carburant nécessaire", de: "Benötigter Kraftstoff", ru: "Необходимое топливо", it: "Carburante necessario", tr: "Gereken yakıt", ko: "필요 연료", ar: "الوقود المطلوب", hi: "आवश्यक ईंधन", id: "Bahan bakar dibutuhkan", vi: "Nhiên liệu cần" },
  fuelCost: { en: "Total fuel cost", zh: "总油费", ja: "燃料費合計", es: "Costo total", pt: "Custo total", fr: "Coût total du carburant", de: "Kraftstoffkosten gesamt", ru: "Итого топливо", it: "Costo totale carburante", tr: "Toplam yakıt maliyeti", ko: "총 연료비", ar: "تكلفة الوقود الإجمالية", hi: "कुल ईंधन लागत", id: "Total biaya bahan bakar", vi: "Tổng chi phí nhiên liệu" },
  costPerKm: { en: "Cost per km", zh: "每公里费用", ja: "1 km あたり", es: "Costo por km", pt: "Custo por km", fr: "Coût par km", de: "Kosten pro km", ru: "Стоимость за км", it: "Costo per km", tr: "km başına maliyet", ko: "km당 비용", ar: "التكلفة لكل كم", hi: "प्रति किमी लागत", id: "Biaya per km", vi: "Chi phí mỗi km" },
  costPerMile: { en: "Cost per mile", zh: "每英里费用", ja: "1 マイルあたり", es: "Costo por milla", pt: "Custo por milha", fr: "Coût par mile", de: "Kosten pro Meile", ru: "Стоимость за милю", it: "Costo per miglio", tr: "mil başına maliyet", ko: "마일당 비용", ar: "التكلفة لكل ميل", hi: "प्रति मील लागत", id: "Biaya per mil", vi: "Chi phí mỗi dặm" },
  kmL: { en: "km per liter", zh: "公里/升", ja: "km/L", es: "km por litro", pt: "km por litro", fr: "km par litre", de: "km pro Liter", ru: "км на литр", it: "km per litro", tr: "litre başına km", ko: "km/L", ar: "كم لكل لتر", hi: "किमी प्रति लीटर", id: "km per liter", vi: "km mỗi lít" },
  l100: { en: "liters per 100 km", zh: "升/100公里", ja: "L/100 km", es: "litros por 100 km", pt: "litros por 100 km", fr: "litres aux 100 km", de: "Liter pro 100 km", ru: "литров на 100 км", it: "litri per 100 km", tr: "100 km başına litre", ko: "L/100km", ar: "لتر لكل 100 كم", hi: "लीटर प्रति 100 किमी", id: "liter per 100 km", vi: "lít mỗi 100 km" },
  mpg: { en: "miles per gallon (US)", zh: "英里/加仑(美)", ja: "マイル/ガロン(米)", es: "millas por galón (EE. UU.)", pt: "milhas por galão (EUA)", fr: "miles par gallon (US)", de: "Meilen pro Gallone (US)", ru: "миль на галлон (США)", it: "miglia per gallone (USA)", tr: "gallon başına mil (ABD)", ko: "mpg(미국)", ar: "ميل لكل جالون (أمريكي)", hi: "मील प्रति गैलन (यूएस)", id: "mil per galon (AS)", vi: "dặm mỗi gallon (Mỹ)" },
};

function num(s: string): number {
  const n = parseLocaleNumber(s);
  return Number.isFinite(n) ? n : NaN;
}

/* ---------------- BMI ---------------- */

function bmiCategory(b: number): number {
  if (b < 18.5) return 0;
  if (b < 25) return 1;
  if (b < 30) return 2;
  return 3;
}

type Locale_ = Locale;

const BMI_NAMES: Record<string, string[]> = {
  en: ["Underweight", "Normal weight", "Overweight", "Obesity"],
  zh: ["偏瘦", "正常", "超重", "肥胖"],
  ja: ["低体重", "普通体重", "過体重", "肥満"],
  es: ["Bajo peso", "Peso normal", "Sobrepeso", "Obesidad"],
  pt: ["Abaixo do peso", "Peso normal", "Sobrepeso", "Obesidade"],
  fr: ["Insuffisance pondérale", "Poids normal", "Surpoids", "Obésité"],
  de: ["Untergewicht", "Normalgewicht", "Übergewicht", "Fettleibigkeit"],
  ru: ["Недостаточный вес", "Нормальный вес", "Избыточный вес", "Ожирение"],
  it: ["Sottopeso", "Peso normale", "Sovrappeso", "Obesità"],
  tr: ["Düşük kilo", "Normal kilo", "Fazla kilo", "Obezite"],
  ko: ["저체중", "정상 체중", "과체중", "비만"],
  ar: ["نقص الوزن", "الوزن الطبيعي", "زيادة الوزن", "السمنة"],
  hi: ["कम वज़न", "सामान्य वज़न", "अधिक वज़न", "मोटापा"],
  id: ["Berat kurang", "Berat normal", "Berat berlebih", "Obesitas"],
  vi: ["Thiếu cân", "Cân nặng bình thường", "Thừa cân", "Béo phì"],
};

function Bmi() {
  const { locale } = useI18n();
  const [units, setUnits] = useState("metric");
  const [cm, setCm] = useState("170");
  const [kg, setKg] = useState("65");
  const [ft, setFt] = useState("5");
  const [inch, setInch] = useState("7");
  const [lb, setLb] = useState("143");

  const hM = units === "metric" ? num(cm) / 100 : (num(ft) * 12 + num(inch)) * 0.0254;
  const wKg = units === "metric" ? num(kg) : num(lb) * 0.45359237;
  const bmi = hM > 0 && wKg > 0 ? wKg / (hM * hM) : NaN;
  const cat = Number.isFinite(bmi) ? bmiCategory(bmi) : null;

  return (
    <ToolPanel>
      <Tabs
        options={[
          { id: "metric", label: pick(locale, S.metric) },
          { id: "imperial", label: pick(locale, S.imperial) },
        ]}
        value={units}
        onChange={setUnits}
      />
      {units === "metric" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={locale === "zh" ? "身高 (cm)" : locale === "ja" ? "身長 (cm)" : locale === "es" ? "Altura (cm)" : locale === "pt" ? "Altura (cm)" : "Height (cm)"}>
            <NumIn value={cm} onChange={setCm} aria="height cm" />
          </Field>
          <Field label={locale === "zh" ? "体重 (kg)" : locale === "ja" ? "体重 (kg)" : locale === "es" ? "Peso (kg)" : locale === "pt" ? "Peso (kg)" : "Weight (kg)"}>
            <NumIn value={kg} onChange={setKg} aria="weight kg" />
          </Field>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label={locale === "zh" ? "身高 (英尺)" : locale === "ja" ? "身長 (フィート)" : locale === "es" ? "Altura (pies)" : locale === "pt" ? "Altura (pés)" : "Height (ft)"}>
            <NumIn value={ft} onChange={setFt} aria="height feet" />
          </Field>
          <Field label={locale === "zh" ? "身高 (英寸)" : locale === "ja" ? "身長 (インチ)" : locale === "es" ? "Altura (pulgadas)" : locale === "pt" ? "Altura (polegadas)" : "Height (in)"}>
            <NumIn value={inch} onChange={setInch} aria="height inches" />
          </Field>
          <Field label={locale === "zh" ? "体重 (磅)" : locale === "ja" ? "体重 (ポンド)" : locale === "es" ? "Peso (lb)" : locale === "pt" ? "Peso (lb)" : "Weight (lb)"}>
            <NumIn value={lb} onChange={setLb} aria="weight pounds" />
          </Field>
        </div>
      )}

      <div className="mt-5">
        <Stats
          items={[
            {
              label: "BMI",
              value: fmt(bmi, locale, 1),
              tone: cat === 1 ? "good" : cat === null ? undefined : "bad",
            },
            {
              label: pick(locale, { en: "Category", zh: "类别", ja: "判定", es: "Categoría", pt: "Categoria", fr: "Catégorie", de: "Kategorie", ru: "Категория", it: "Categoria", tr: "Kategori", ko: "분류", ar: "الفئة", hi: "श्रेणी", id: "Kategori", vi: "Phân loại" }),
              value: cat !== null ? (BMI_NAMES[locale] ?? BMI_NAMES.en)[cat] : "—",
            },
          ]}
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border hairline">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="border-b hairline text-[12.5px] uppercase tracking-wide text-[var(--color-sub)]">
              <th scope="col" className="px-3.5 py-2 text-left font-semibold">BMI</th>
              <th scope="col" className="px-3.5 py-2 text-left font-semibold">
                {pick(locale, { en: "WHO category", zh: "WHO 分类", ja: "WHO 判定", es: "Categoría OMS", pt: "Categoria OMS", fr: "Catégorie OMS", de: "WHO-Kategorie", ru: "Категория ВОЗ", it: "Categoria OMS", tr: "DSÖ kategorisi", ko: "WHO 분류", ar: "فئة منظمة الصحة العالمية", hi: "WHO श्रेणी", id: "Kategori WHO", vi: "Phân loại WHO" })}
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Below 18.5", 0],
              ["18.5 – 24.9", 1],
              ["25.0 – 29.9", 2],
              ["30.0 and above", 3],
            ].map(([r, id], i) => (
              <tr key={i} className={cat === id ? "bg-[rgba(0,113,227,0.08)] font-semibold" : i % 2 ? "bg-[var(--color-surface)]" : ""}>
                <td className="mono px-3.5 py-2">{r}</td>
                <td className="px-3.5 py-2">{(BMI_NAMES[locale] ?? BMI_NAMES.en)[id as number]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3">
        <Note>
          {pick(locale, {
            en: "BMI is a screening measure, not a diagnosis — it does not account for muscle mass, age or body composition.",
            zh: "BMI 只是筛查指标,不是诊断——它不考虑肌肉量、年龄和体脂分布。",
            ja: "BMI はスクリーニング指標であり診断ではありません。筋肉量・年齢・体組成は考慮されません。",
            es: "El IMC es una medida de cribado, no un diagnóstico: no tiene en cuenta la masa muscular, la edad ni la composición corporal.",
            pt: "O IMC é uma medida de triagem, não um diagnóstico — ele não considera massa muscular, idade nem composição corporal.",
            fr: "L'IMC est un indicateur de dépistage, pas un diagnostic : il ne tient pas compte de la masse musculaire, de l'âge ni de la composition corporelle.",
            de: "BMI ist ein Screening-Maß, keine Diagnose — er berücksichtigt weder Muskelmasse noch Alter noch Körperzusammensetzung.",
            ru: "ИМТ — скрининговый показатель, а не диагноз: он не учитывает мышечную массу, возраст и состав тела.",
            it: "Il BMI è uno strumento di screening, non una diagnosi: non tiene conto di massa muscolare, età o composizione corporea.",
            tr: "BKİ bir tarama ölçüsüdür, tanı değildir — kas kütlesini, yaşı ve vücut kompozisyonunu hesaba katmaz.",
            ko: "BMI는 선별 지표이지 진단이 아닙니다 — 근육량·나이·체성분을 반영하지 않습니다.",
            ar: "مؤشر كتلة الجسم أداة فرز لا تشخيص — لا يراعي الكتلة العضلية أو العمر أو تكوين الجسم.",
            hi: "BMI एक स्क्रीनिंग माप है, निदान नहीं — यह मांसपेशी द्रव्यमान, उम्र या शरीर संरचना को ध्यान में नहीं रखता।",
            id: "BMI adalah alat skrining, bukan diagnosis — tidak memperhitungkan massa otot, usia, atau komposisi tubuh.",
            vi: "BMI là thước đo sàng lọc, không phải chẩn đoán — không tính khối cơ, tuổi hay thành phần cơ thể.",
          })}
        </Note>
      </div>
    </ToolPanel>
  );
}

/* ---------------- Percentage ---------------- */

function Percentage() {
  const { locale } = useI18n();
  const [mode, setMode] = useState("of");
  const [a, setA] = useState("15");
  const [b, setB] = useState("200");

  const x = num(a);
  const y = num(b);
  let out = NaN;
  let extra = "";
  if (Number.isFinite(x) && Number.isFinite(y)) {
    if (mode === "of") out = (x / 100) * y;
    else if (mode === "what") out = y === 0 ? NaN : (x / y) * 100;
    else {
      out = x === 0 ? NaN : ((y - x) / Math.abs(x)) * 100;
      if (Number.isFinite(out)) extra = out >= 0 ? pick(locale, S.increase) : pick(locale, S.decrease);
    }
  }

  const suffix = mode === "what" ? " %" : "";
  return (
    <ToolPanel>
      <Tabs
        options={[
          { id: "of", label: pick(locale, S.of) },
          { id: "what", label: pick(locale, S.what) },
          { id: "change", label: pick(locale, S.change) },
        ]}
        value={mode}
        onChange={setMode}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label={
            mode === "of"
              ? pick(locale, S.percent)
              : mode === "what"
                ? pick(locale, { en: "Value X", zh: "数值 X", ja: "値 X", es: "Valor X", pt: "Valor X", fr: "Valeur X", de: "Wert X", ru: "Значение X", it: "Valore X", tr: "X değeri", ko: "X 값", ar: "القيمة X", hi: "मान X", id: "Nilai X", vi: "Giá trị X" })
                : pick(locale, S.from)
          }
        >
          <NumIn value={a} onChange={setA} aria="first value" />
        </Field>
        <Field
          label={
            mode === "of"
              ? pick(locale, S.ofValue)
              : mode === "what"
                ? pick(locale, { en: "Value Y", zh: "数值 Y", ja: "値 Y", es: "Valor Y", pt: "Valor Y", fr: "Valeur Y", de: "Wert Y", ru: "Значение Y", it: "Valore Y", tr: "Y değeri", ko: "Y 값", ar: "القيمة Y", hi: "मान Y", id: "Nilai Y", vi: "Giá trị Y" })
                : pick(locale, S.to)
          }
        >
          <NumIn value={b} onChange={setB} aria="second value" />
        </Field>
      </div>
      <div className="mt-5">
        <Stats
          items={[
            {
              label: pick(locale, S.result),
              value: `${fmt(out, locale, 2)}${suffix}`,
              tone: mode === "change" ? (out >= 0 ? "good" : "bad") : "accent",
            },
            ...(extra
              ? [{ label: pick(locale, { en: "Direction", zh: "方向", ja: "方向", es: "Dirección", pt: "Direção", fr: "Direction", de: "Richtung", ru: "Направление", it: "Direzione", tr: "Yön", ko: "방향", ar: "الاتجاه", hi: "दिशा", id: "Arah", vi: "Hướng" }), value: extra, tone: out >= 0 ? ("good" as const) : ("bad" as const) }]
              : []),
          ]}
        />
      </div>
    </ToolPanel>
  );
}

/* ---------------- Discount ---------------- */

function Discount() {
  const { locale } = useI18n();
  const [price, setPrice] = useState("249");
  const [d1, setD1] = useState("20");
  const [d2, setD2] = useState("");

  const p = num(price);
  const a = num(d1);
  const b = num(d2);
  const hasB = d2.trim() !== "" && Number.isFinite(b);
  const finalPrice = Number.isFinite(p) && Number.isFinite(a) ? p * (1 - a / 100) * (hasB ? 1 - b / 100 : 1) : NaN;
  const saved = Number.isFinite(p) ? p - finalPrice : NaN;
  const eff = Number.isFinite(p) && p > 0 ? (saved / p) * 100 : NaN;

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label={pick(locale, S.price)}>
          <NumIn value={price} onChange={setPrice} aria="original price" />
        </Field>
        <Field label={pick(locale, S.discount)}>
          <NumIn value={d1} onChange={setD1} aria="discount percent" />
        </Field>
        <Field label={`${pick(locale, S.extra)} · ${pick(locale, S.none)}`}>
          <NumIn value={d2} onChange={setD2} aria="extra discount percent" placeholder="0" />
        </Field>
      </div>
      <div className="mt-5">
        <Stats
          items={[
            { label: pick(locale, S.finalPrice), value: fmtMoney(finalPrice, locale, "$"), tone: "accent" },
            { label: pick(locale, S.saved), value: fmtMoney(saved, locale, "$"), tone: "good" },
            { label: pick(locale, S.effective), value: `${fmt(eff, locale, 1)} %` },
          ]}
        />
      </div>
      {hasB && (
        <div className="mt-3">
          <Note>
            {pick(locale, {
              en: "Stacked discounts apply one after another (20% + 10% = 72% of the original price), not 30% off.",
              zh: "叠加折扣是先后应用的(20% + 10% = 原价的 72%),而不是直接打 7 折。",
              ja: "重複割引は順に適用されます(20% + 10% = 元の 72%)。30% オフにはなりません。",
              es: "Los descuentos apilados se aplican uno tras otro (20% + 10% = 72% del precio original), no un 30%.",
              pt: "Descontos acumulados são aplicados em sequência (20% + 10% = 72% do preço original), e não 30%.",
              fr: "Les remises cumulées s'appliquent l'une après l'autre (20 % + 10 % = 72 % du prix initial), pas 30 % de remise.",
              de: "Gestapelte Rabatte greifen nacheinander (20 % + 10 % = 72 % des Originalpreises), nicht 30 % Rabatt.",
              ru: "Ступенчатые скидки применяются последовательно (20% + 10% = 72% исходной цены), а не 30% скидки.",
              it: "Gli sconti cumulati si applicano in sequenza (20% + 10% = 72% del prezzo originale), non il 30% di sconto.",
              tr: "Üst üste indirimler sırayla uygulanır (%20 + %10 = orijinal fiyatın %72'si), %30 indirim değil.",
              ko: "중복 할인은 차례로 적용됩니다(20% + 10% = 원가의 72%) — 30% 할인이 아닙니다.",
              ar: "الخصومات المتكاملة تُطبق تباعًا (20% + 10% = 72% من السعر الأصلي)، وليس خصم 30%.",
              hi: "स्टैक की गई छूटें क्रम से लागू होती हैं (20% + 10% = मूल कीमत का 72%), 30% छूट नहीं।",
              id: "Diskon bertumpuk diterapkan berurutan (20% + 10% = 72% harga asli), bukan potongan 30%.",
              vi: "Giảm giá chồng nhau áp dụng lần lượt (20% + 10% = 72% giá gốc), không phải giảm 30%.",
            })}
          </Note>
        </div>
      )}
    </ToolPanel>
  );
}

/* ---------------- Profit ---------------- */

function Profit() {
  const { locale } = useI18n();
  const [cost, setCost] = useState("80");
  const [sell, setSell] = useState("100");

  const c = num(cost);
  const s = num(sell);
  const profit = s - c;
  const margin = s !== 0 ? (profit / s) * 100 : NaN;
  const markup = c !== 0 ? (profit / c) * 100 : NaN;
  const ok = Number.isFinite(profit);

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.cost)}>
          <NumIn value={cost} onChange={setCost} aria="cost price" />
        </Field>
        <Field label={pick(locale, S.sell)}>
          <NumIn value={sell} onChange={setSell} aria="selling price" />
        </Field>
      </div>
      <div className="mt-5">
        <Stats
          items={[
            {
              label: profit >= 0 ? pick(locale, S.profit) : pick(locale, S.loss),
              value: fmtMoney(Math.abs(profit), locale, "$"),
              tone: ok ? (profit >= 0 ? "good" : "bad") : undefined,
            },
            { label: pick(locale, S.margin), value: `${fmt(margin, locale, 1)} %` },
            { label: pick(locale, S.markup), value: `${fmt(markup, locale, 1)} %` },
          ]}
        />
      </div>
      <div className="mt-3">
        <Note>
          {pick(locale, {
            en: "Margin is profit ÷ selling price; markup is profit ÷ cost. A 25% margin equals a 33.3% markup.",
            zh: "利润率 = 利润 ÷ 售价;加成率 = 利润 ÷ 成本。25% 的利润率对应 33.3% 的加成率。",
            ja: "利益率 = 利益 ÷ 販売価格、マークアップ率 = 利益 ÷ 仕入価格。利益率 25% はマークアップ率 33.3% に相当します。",
            es: "El margen es ganancia ÷ precio de venta; el recargo es ganancia ÷ costo. Un margen del 25% equivale a un recargo del 33,3%.",
            pt: "A margem é lucro ÷ preço de venda; o markup é lucro ÷ custo. Uma margem de 25% equivale a um markup de 33,3%.",
            fr: "La marge = bénéfice ÷ prix de vente ; la majoration = bénéfice ÷ coût. Une marge de 25 % équivaut à une majoration de 33,3 %.",
            de: "Marge = Gewinn ÷ Verkaufspreis; Aufschlag = Gewinn ÷ Kosten. Eine 25-%-Marge entspricht einem 33,3-%-Aufschlag.",
            ru: "Маржа = прибыль ÷ цена продажи; наценка = прибыль ÷ себестоимость. Маржа 25% равна наценке 33,3%.",
            it: "Il margine = profitto ÷ prezzo di vendita; il ricarico = profitto ÷ costo. Un margine del 25% equivale a un ricarico del 33,3%.",
            tr: "Marj = kâr ÷ satış fiyatı; kâr payı = kâr ÷ maliyet. %25 marj, %33,3 kâr payına eşittir.",
            ko: "마진 = 이익 ÷ 판매가; 마크업 = 이익 ÷ 원가. 25% 마진은 33.3% 마크업과 같습니다.",
            ar: "الهامش = الربح ÷ سعر البيع؛ والهامش الإضافي = الربح ÷ التكلفة. هامش 25% يعادل هامشًا إضافيًا 33.3%.",
            hi: "मार्जिन = लाभ ÷ विक्रय मूल्य; मार्कअप = लाभ ÷ लागत। 25% मार्जिन = 33.3% मार्कअप।",
            id: "Margin = laba ÷ harga jual; markup = laba ÷ biaya. Margin 25% setara markup 33,3%.",
            vi: "Biên lợi nhuận = lợi nhuận ÷ giá bán; phần cộng thêm = lợi nhuận ÷ giá vốn. Biên 25% tương đương cộng thêm 33,3%.",
          })}
        </Note>
      </div>
    </ToolPanel>
  );
}

/* ---------------- Tip ---------------- */

function Tip() {
  const { locale } = useI18n();
  const [bill, setBill] = useState("64");
  const [pct, setPct] = useState("15");
  const [people, setPeople] = useState("2");

  const b = num(bill);
  const p = num(pct);
  const n = Math.max(1, Math.floor(num(people) || 1));
  const tip = b * (p / 100);
  const total = b + tip;

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.bill)}>
          <NumIn value={bill} onChange={setBill} aria="bill amount" />
        </Field>
        <Field label={pick(locale, S.people)}>
          <NumIn value={String(people)} onChange={setPeople} aria="number of people" />
        </Field>
      </div>
      <div className="mt-4">
        <span className="mb-2 block text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, S.tipPct)}</span>
        <div className="flex flex-wrap gap-2">
          {[10, 15, 18, 20, 25].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setPct(String(v))}
              className={`mono rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                pct === String(v)
                  ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                  : "hairline hover:bg-[var(--color-surface)]"
              }`}
            >
              {v}%
            </button>
          ))}
          <input
            type="number"
            inputMode="decimal"
            className="field bare mono w-24"
            value={pct}
            onChange={(e) => setPct(e.target.value)}
            aria-label="custom tip percent"
          />
        </div>
      </div>
      <div className="mt-5">
        <Stats
          items={[
            { label: pick(locale, S.tipAmount), value: fmtMoney(tip, locale, "$") },
            { label: pick(locale, S.total), value: fmtMoney(total, locale, "$"), tone: "accent" },
            { label: pick(locale, S.perPerson), value: fmtMoney(total / n, locale, "$"), tone: "good" },
          ]}
        />
      </div>
    </ToolPanel>
  );
}

/* ---------------- Fuel cost ---------------- */

function Fuel() {
  const { locale } = useI18n();
  const [units, setUnits] = useState("metric");
  const [dist, setDist] = useState("450");
  const [eff, setEff] = useState("7.5");
  const [price, setPrice] = useState("1.75");
  const [round, setRound] = useState(false);

  const d = num(dist) * (round ? 2 : 1);
  const e = num(eff);
  const pr = num(price);
  let fuel = NaN;
  if (Number.isFinite(d) && Number.isFinite(e) && e > 0) {
    fuel = units === "metric" ? (d * e) / 100 : d / e;
  }
  const cost = Number.isFinite(fuel) ? fuel * pr : NaN;
  const unitDist = units === "metric" ? "km" : "mi";
  const unitVol = units === "metric" ? "L" : "gal";
  const effLabel = units === "metric" ? pick(locale, S.l100) : pick(locale, S.mpg);

  return (
    <ToolPanel>
      <Tabs
        options={[
          { id: "metric", label: pick(locale, S.metric) },
          { id: "imperial", label: pick(locale, S.imperial) },
        ]}
        value={units}
        onChange={setUnits}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label={`${pick(locale, S.distance)} (${unitDist})`}>
          <NumIn value={dist} onChange={setDist} aria="distance" />
        </Field>
        <Field label={`${pick(locale, S.efficiency)} · ${effLabel}`}>
          <NumIn value={eff} onChange={setEff} aria="fuel efficiency" />
        </Field>
        <Field label={`${pick(locale, S.fuelPrice)} ($/${unitVol})`}>
          <NumIn value={price} onChange={setPrice} aria="fuel price" />
        </Field>
      </div>
      <label className="mt-4 inline-flex cursor-pointer items-center gap-2 text-[14px]">
        <input type="checkbox" className="accent-[var(--color-accent)]" checked={round} onChange={(e) => setRound(e.target.checked)} />
        {pick(locale, S.roundTrip)}
      </label>
      <div className="mt-5">
        <Stats
          items={[
            { label: pick(locale, S.fuelNeeded), value: `${fmt(fuel, locale, 2)} ${unitVol}` },
            { label: pick(locale, S.fuelCost), value: fmtMoney(cost, locale, "$"), tone: "accent" },
            {
              label: units === "metric" ? pick(locale, S.costPerKm) : pick(locale, S.costPerMile),
              value: fmtMoney(Number.isFinite(cost) && d > 0 ? cost / d : NaN, locale, "$", 3),
            },
          ]}
        />
      </div>
    </ToolPanel>
  );
}

export function CalcEngineBasic({ kind }: { kind: string }) {
  switch (kind) {
    case "bmi":
      return <Bmi />;
    case "percentage":
      return <Percentage />;
    case "discount":
      return <Discount />;
    case "profit":
      return <Profit />;
    case "tip":
      return <Tip />;
    case "fuel":
      return <Fuel />;
    default:
      return null;
  }
}
