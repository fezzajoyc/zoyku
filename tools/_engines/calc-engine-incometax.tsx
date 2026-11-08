"use client";
import { parseLocaleNumber } from "../_lib/numparse";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Sel, Stats, TableBox, fmt, fmtMoney, pick } from "./calc-ui";
import { federalTax, STANDARD_DEDUCTION_2026, type TaxStatus } from "../_lib/incometax";

/**
 * US federal income tax engine on top of incometax.federalTax(): 2026 bracket
 * math (10/12/22/24/32/35/37%) for single and married-filing-jointly, with the
 * per-bracket tax table, marginal and effective rates. Illustrative figures —
 * labeled as such in the UI; actual filing follows the IRS's latest numbers.
 * props: none.
 * (Named CalcEngineIncomeTax because tools/_engines/calc-engine-tax.tsx is the
 * pre-existing shared GST/VAT engine used by gst/vat-calculator.)
 */

const S = {
  income: { en: "Annual income", zh: "年收入", ja: "年収", es: "Ingresos anuales", pt: "Renda anual", fr: "Revenu annuel", de: "Jahreseinkommen", ru: "Годовой доход", it: "Reddito annuo", tr: "Yıllık gelir", ko: "연간 소득", ar: "الدخل السنوي", hi: "वार्षिक आय", id: "Pendapatan tahunan", vi: "Thu nhập hàng năm" },
  status: { en: "Filing status", zh: "申报状态", ja: "申告区分", es: "Estado de declaración", pt: "Situação de declaração", fr: "Situation fiscale", de: "Steuerstatus", ru: "Статус подачи", it: "Stato della dichiarazione", tr: "Beyan durumu", ko: "신고 상태", ar: "حالة الإقرار", hi: "विभाग की स्थिति", id: "Status pelaporan", vi: "Tình trạng khai thuế" },
  single: { en: "Single", zh: "单身", ja: "単身", es: "Soltero/a", pt: "Solteiro(a)", fr: "Célibataire", de: "Ledig", ru: "Одинокий", it: "Single", tr: "Bekâr", ko: "독신", ar: "أعزب", hi: "अविवाहित", id: "Lajang", vi: "Độc thân" },
  married: { en: "Married filing jointly", zh: "夫妻合并申报", ja: "夫婦共同申告", es: "Matrimonio declaración conjunta", pt: "Casado declaração conjunta", fr: "Marié déclaration commune", de: "Verheiratet, gemeinsam", ru: "Женат, совместная подача", it: "Sposati dichiarazione congiunta", tr: "Evli, ortak beyan", ko: "부부 합산 신고", ar: "متزوج إقرار مشترك", hi: "विवाहित संयुक्त", id: "Menikah gabungan", vi: "Kết hợp khai chung" },
  deduction: { en: "Deduction", zh: "扣除额", ja: "控除額", es: "Deducción", pt: "Dedução", fr: "Déduction", de: "Abzug", ru: "Вычет", it: "Detrazione", tr: "Kesinti", ko: "공제액", ar: "الخصم", hi: "कटौती", id: "Dedeksi", vi: "Khoản khấu trừ" },
  taxable: { en: "Taxable income", zh: "应税所得", ja: "課税所得", es: "Base imponible", pt: "Base de cálculo", fr: "Revenu imposable", de: "Zu versteuerndes Einkommen", ru: "Налогооблагаемый доход", it: "Reddito imponibile", tr: "Vergiye tabi gelir", ko: "과세 소득", ar: "الدخل الخاضع للضريبة", hi: "कर योग्य आय", id: "Pendapatan kena pajak", vi: "Thu nhập tính thuế" },
  total: { en: "Estimated federal tax", zh: "估计联邦税", ja: "推定連邦税", es: "Impuesto federal estimado", pt: "Imposto federal estimado", fr: "Impôt fédéral estimé", de: "Geschätzte Bundessteuer", ru: "Расчётный федеральный налог", it: "Imposta federale stimata", tr: "Tahmini federal vergi", ko: "추정 연방 세금", ar: "الضريبة الفيدرالية التقديرية", hi: "अनुमानित संघीय कर", id: "Perkiraan pajak federal", vi: "Thuế liên bang ước tính" },
  marginal: { en: "Marginal rate", zh: "边际税率", ja: "限界税率", es: "Tipo marginal", pt: "Alíquota marginal", fr: "Taux marginal", de: "Grenzsteuersatz", ru: "Предельная ставка", it: "Aliquota marginale", tr: "Marjinal oran", ko: "한계 세율", ar: "المعدل الحدي", hi: "सीमांत दर", id: "Tarif marginal", vi: "Thuế suất cận biên" },
  effective: { en: "Effective rate", zh: "有效税率", ja: "実効税率", es: "Tipo efectivo", pt: "Alíquota efetiva", fr: "Taux effectif", de: "Effektiver Satz", ru: "Эффективная ставка", it: "Aliquota effettiva", tr: "Efektif oran", ko: "실효 세율", ar: "المعدل الفعلي", hi: "प्रभावी दर", id: "Tarif efektif", vi: "Thuế suất thực tế" },
  brackets: { en: "Tax by bracket", zh: "逐档税额", ja: "段階別の税額", es: "Impuesto por tramo", pt: "Imposto por faixa", fr: "Impôt par tranche", de: "Steuer je Stufe", ru: "Налог по ставкам", it: "Imposta per scaglione", tr: "Dilim bazında vergi", ko: "구간별 세금", ar: "الضريبة حسب الشريحة", hi: "स्लैब अनुसार कर", id: "Pajak per lapisan", vi: "Thuế theo từng bậc" },
  thRate: { en: "Rate", zh: "税率", ja: "税率", es: "Tipo", pt: "Alíquota", fr: "Taux", de: "Satz", ru: "Ставка", it: "Aliquota", tr: "Oran", ko: "세율", ar: "المعدل", hi: "दर", id: "Tarif", vi: "Thuế suất" },
  thRange: { en: "Taxable range", zh: "应税区间", ja: "課税区分", es: "Tramo", pt: "Faixa", fr: "Tranche", de: "Stufe", ru: "Диапазон", it: "Scaglione", tr: "Dilim", ko: "과세 구간", ar: "نطاق الشريحة", hi: "स्लैब सीमा", id: "Rentang kena pajak", vi: "Khoảng tính thuế" },
  thTaxed: { en: "Taxed here", zh: "落入此档金额", ja: "該当金額", es: "Importe en el tramo", pt: "Valor na faixa", fr: "Montant dans la tranche", de: "Betrag in der Stufe", ru: "Сумма в диапазоне", it: "Importo nello scaglione", tr: "Dilimdeki tutar", ko: "해당 구간 금액", ar: "المبلغ في الشريحة", hi: "इस स्लैब में राशि", id: "Nilai di lapisan", vi: "Số tiền trong bậc" },
  thTax: { en: "Tax", zh: "税额", ja: "税額", es: "Impuesto", pt: "Imposto", fr: "Impôt", de: "Steuer", ru: "Налог", it: "Imposta", tr: "Vergi", ko: "세액", ar: "الضريبة", hi: "कर", id: "Pajak", vi: "Thuế" },
  deductionHint: {
    en: "Prefilled with the 2026 US standard deduction ($16,100 single / $32,200 married) — replace it with your actual deductions. Taxable income = income − deduction, floored at zero.",
    zh: "预填 2026 美国标准扣除额(单身 $16,100 / 夫妻合并 $32,200)——请按自身实际扣除额修改。应税所得 = 收入 − 扣除额,下限 0。",
    ja: "2026 年の米国標準控除(単身 $16,100 / 夫婦共同 $32,200)を初期値としています。実際の控除額に置き換えてください。課税所得 = 収入 − 控除額(最低 0)。",
    es: "Precargado con la deducción estándar de EE. UU. 2026 ($16,100 soltero / $32,200 matrimonio) — sustitúyala por sus deducciones reales. Base imponible = ingresos − deducción, mínimo cero.",
    pt: "Pré-preenchida com a dedução padrão dos EUA de 2026 ($16,100 solteiro / $32,200 casal) — substitua pelas suas deduções reais. Base de cálculo = renda − dedução, no mínimo zero.",
    fr: "Pré-rempli avec la déduction standard américaine 2026 (16 100 $ célibataire / 32 200 $ marié) — remplacez-la par vos déductions réelles. Revenu imposable = revenu − déduction, minimum zéro.",
    de: "Vorausgefüllt mit dem US-Standardabzug 2026 (16.100 $ ledig / 32.200 $ verheiratet) — durch Ihre tatsächlichen Abzüge ersetzen. Zu versteuerndes Einkommen = Einkommen − Abzug, mindestens null.",
    ru: "Предзаполнено стандартным вычетом США 2026 ($16,100 одинокий / $32,200 женат) — замените на свои вычеты. Налогооблагаемый доход = доход − вычет, не меньше нуля.",
    it: "Precompilata con la detrazione standard USA 2026 ($16,100 single / $32,200 sposati) — sostituiscila con le tue detrazioni reali. Reddito imponibile = reddito − detrazione, minimo zero.",
    tr: "2026 ABD standart kesintisiyle önceden dolduruldu ($16,100 bekâr / $32,200 evli) — kendi kesintilerinizle değiştirin. Vergiye tabi gelir = gelir − kesinti, en az sıfır.",
    ko: "2026년 미국 표준 공제액(독신 $16,100 / 부부 $32,200)이 기본 입력되어 있습니다. 실제 공제액으로 바꾸세요. 과세 소득 = 소득 − 공제액, 최소 0.",
    ar: "معبأ مسبقًا بالخصم القياسي الأمريكي لعام 2026 (16,100$ أعزب / 32,200$ متزوج) — استبدله بخصوماتك الفعلية. الدخل الخاضع = الدخل − الخصم، بحد أدنى صفر.",
    hi: "2026 अमेरिकी मानक कटौती ($16,100 अविवाहित / $32,200 विवाहित) से पहले से भरा है — अपनी वास्तविक कटौती से बदलें। कर योग्य आय = आय − कटौती, न्यूनतम शून्य।",
    id: "Terisi awal dengan deduksi standar AS 2026 ($16,100 lajang / $32,200 menikah) — ganti dengan deduksi Anda. Pendapatan kena pajak = pendapatan − deduksi, minimal nol.",
    vi: "Điền sẵn khấu trừ tiêu chuẩn Mỹ 2026 (16.100$ độc thân / 32.200$ kết hôn) — thay bằng khấu trừ thực tế của bạn. Thu nhập tính thuế = thu nhập − khấu trừ, tối thiểu 0.",
  },
  note: {
    en: "Illustrative 2026 brackets per IRS Rev. Proc. 2025-32 — check the IRS's latest publications before relying on any number. Real tax bills also involve credits, state and local taxes, capital gains and other items this simplified model ignores; marginal rate is the rate on your last dollar, effective rate is total tax ÷ income.",
    zh: "税级为 2026 年示例口径(IRS Rev. Proc. 2025-32),使用前请以 IRS 最新公布为准。真实税负还涉及抵免、州税与地方税、资本利得等,本简化模型均未计入;边际税率是最后一美元的税率,有效税率 = 总税额 ÷ 收入。",
    ja: "税率区分は 2026 年の例示(IRS Rev. Proc. 2025-32)です。実際の申告では IRS の最新公表値をご確認ください。実際の税額には控除・州税・資本利得など本簡易モデルが含まない項目もあります。限界税率は最後の 1 ドルへの税率、実効税率 = 総税額 ÷ 収入です。",
    es: "Tramos ilustrativos de 2026 según IRS Rev. Proc. 2025-32 — consulte las publicaciones más recientes del IRS antes de fiarse de cualquier cifra. Un impuesto real incluye créditos, impuestos estatales y locales, plusvalías y otros elementos que este modelo simplificado ignora; el tipo marginal es el del último dólar y el efectivo = impuesto total ÷ ingresos.",
    pt: "Faixas ilustrativas de 2026 conforme IRS Rev. Proc. 2025-32 — confira as publicações mais recentes do IRS antes de confiar em qualquer número. Impostos reais envolvem créditos, tributos estaduais e locais, ganhos de capital e outros itens que este modelo simplificado ignora; a alíquota marginal é a do último dólar e a efetiva = imposto total ÷ renda.",
    fr: "Tranches illustratives 2026 selon l'IRS Rev. Proc. 2025-32 — vérifiez les dernières publications de l'IRS avant de vous fier à un chiffre. Une vraie facture fiscale implique crédits, impôts d'État et locaux, plus-values et d'autres éléments ignorés par ce modèle simplifié ; le taux marginal porte sur le dernier dollar, le taux effectif = impôt total ÷ revenu.",
    de: "Illustrative Stufen für 2026 gemäß IRS Rev. Proc. 2025-32 — prüfen Sie die neuesten IRS-Veröffentlichungen, bevor Sie sich auf eine Zahl verlassen. Echte Steuerlasten umfassen Gutschriften, Landes- und Kommunalsteuern, Kapitalerträge und weiteres, was dieses vereinfachte Modell ignoriert; der Grenzsteuersatz gilt für den letzten Dollar, der effektive Satz = Steuer ÷ Einkommen.",
    ru: "Иллюстративные ставки 2026 года по IRS Rev. Proc. 2025-32 — сверяйтесь с актуальными публикациями IRS. Реальный налог включает кредиты, штатные и местные налоги, прирост капитала и прочее, что эта упрощённая модель не учитывает; предельная ставка — ставка последнего доллара, эффективная = налог ÷ доход.",
    it: "Scaglioni illustrativi 2026 secondo IRS Rev. Proc. 2025-32 — verifica le pubblicazioni più recenti dell'IRS prima di affidarti a qualunque cifra. Un'imposta reale include crediti, tasse statali e locali, plusvalenze e altri elementi che questo modello semplificato ignora; l'aliquota marginale si riferisce all'ultimo dollaro, l'effettiva = imposta totale ÷ reddito.",
    tr: "2026 için IRS Rev. Proc. 2025-32'ye dayanan örnek dilimler — herhangi bir sayıya güvenmeden IRS'nin en güncel yayınlarını kontrol edin. Gerçek vergiler kredi, eyalet ve yerel vergiler, sermaye kazançları ve bu basit modelin dışında bırakılan öğeler içerir; marjinal oran son dolara, efektif oran = toplam vergi ÷ gelir.",
    ko: "세금 구간은 IRS Rev. Proc. 2025-32 기준 2026년 예시입니다. 숫자에 의존하기 전 IRS 최신 공표를 확인하세요. 실제 세금에는 세액공제, 주·지방세, 양도소득 등 이 단순 모델이 반영하지 않는 항목이 있습니다. 한계 세율은 마지막 1달러의 세율, 실효 세율 = 총 세금 ÷ 소득입니다.",
    ar: "شرائح توضيحية لعام 2026 وفق IRS Rev. Proc. 2025-32 — راجع أحدث منشورات مصلحة الضرائب قبل الاعتماد على أي رقم. الفاتورة الضريبية الحقيقية تتضمن إعفاءات وضرائب ولاية ومحلية وأرباح رأسمالية وغيرها يتجاهله هذا النموذج المبسط؛ المعدل الحدي يخص آخر دولار، والفعلي = الضريبة ÷ الدخل.",
    hi: "2026 के उदाहरण स्लैब IRS Rev. Proc. 2025-32 के अनुसार — किसी संख्या पर भरोसा करने से पहले IRS की नवीनतम घोषणाएँ देखें। वास्तविक कर में क्रेडिट, राज्य/स्थानीय कर, पूंजीगत लाभ और अन्य मदें शामिल हैं जो यह सरल मॉडल नहीं गिनता; सीमांत दर आखिरी डॉलर की है, प्रभावी दर = कुल कर ÷ आय।",
    id: "Lapisan ilustratif 2026 berdasarkan IRS Rev. Proc. 2025-32 — periksa publikasi terbaru IRS sebelum mengandalkan angka mana pun. Pajak nyata mencakup kredit, pajak negara bagian dan daerah, keuntungan modal, dan hal lain yang diabaikan model sederhana ini; tarif marginal untuk dolar terakhir, tarif efektif = pajak total ÷ pendapatan.",
    vi: "Bậc thuế minh họa năm 2026 theo IRS Rev. Proc. 2025-32 — hãy kiểm tra công bố mới nhất của IRS trước khi tin bất kỳ con số nào. Thuế thật còn gồm tín dụng, thuế tiểu bang và địa phương, lãi vốn và các khoản khác mà mô hình đơn giản hóa này bỏ qua; thuế suất cận biên áp cho đồng đô-la cuối, thuế suất thực tế = tổng thuế ÷ thu nhập.",
  },
};

function num(s: string): number {
  const n = parseLocaleNumber(s);
  return Number.isFinite(n) ? n : NaN;
}

export function CalcEngineIncomeTax() {
  const { locale } = useI18n();
  const [income, setIncome] = useState("100000");
  const [status, setStatus] = useState<TaxStatus>("single");
  const [deduction, setDeduction] = useState(String(STANDARD_DEDUCTION_2026.single));

  const inc = num(income);
  const ded = num(deduction);

  const onStatus = (s: string) => {
    const next = s === "married" ? "married" : "single";
    setStatus(next);
    // 切换申报状态时同步标准扣除额,避免旧状态的数字被误用
    setDeduction(String(STANDARD_DEDUCTION_2026[next]));
  };

  const res = useMemo(() => federalTax(inc, status, ded), [inc, status, ded]);
  const money = (n: number) => fmtMoney(n, locale, "$");

  const rangeLabel = (from: number, to: number | null) =>
    to === null ? `${fmt(from, locale, 0)}+` : `${fmt(from, locale, 0)} – ${fmt(to, locale, 0)}`;

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.income)}>
          <NumIn value={income} onChange={setIncome} aria="annual income" />
        </Field>
        <Field label={pick(locale, S.status)}>
          <Sel value={status} onChange={onStatus} aria="filing status">
            <option value="single">{pick(locale, S.single)}</option>
            <option value="married">{pick(locale, S.married)}</option>
          </Sel>
        </Field>
        <Field label={pick(locale, S.deduction)}>
          <NumIn value={deduction} onChange={setDeduction} aria="deduction" />
        </Field>
      </div>

      <div className="mt-5">
        <Stats
          items={[
            { label: pick(locale, S.total), value: money(res.total), tone: "accent" },
            { label: pick(locale, S.taxable), value: money(res.taxable) },
            { label: pick(locale, S.marginal), value: Number.isFinite(res.marginalRate) ? `${fmt(res.marginalRate, locale, 0)}%` : "—", tone: "bad" },
            { label: pick(locale, S.effective), value: Number.isFinite(res.effectiveRate) ? `${fmt(res.effectiveRate, locale, 2)}%` : "—", tone: "good" },
          ]}
        />
      </div>

      <div className="mt-3">
        <Note>{pick(locale, S.deductionHint)}</Note>
        <p className="mt-2 text-[13px] leading-5 text-[var(--color-sub)]">{pick(locale, S.note)}</p>
      </div>

      {res.brackets.length > 0 && (
        <div className="mt-7">
          <h3 className="mb-3 text-[15px] font-semibold">{pick(locale, S.brackets)}</h3>
          <TableBox
            head={[pick(locale, S.thRate), pick(locale, S.thRange), pick(locale, S.thTaxed), pick(locale, S.thTax)]}
            rows={res.brackets.map((b) => [
              `${fmt(b.rate, locale, 0)}%`,
              rangeLabel(b.from, b.to),
              money(b.taxed),
              money(b.tax),
            ])}
          />
        </div>
      )}
    </ToolPanel>
  );
}
