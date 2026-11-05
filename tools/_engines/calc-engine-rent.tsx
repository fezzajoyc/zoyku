"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Sel, Stats, Tabs, fmt, fmtMoney, pick } from "./calc-ui";
import { rentAffordability } from "../_lib/finance";

/**
 * 租房负担能力引擎:收入(毛/净切换)× 比例预设 → 可负担房租上限,
 * 再减去其他月度债务与租客保险得到剩余预算,并给出顶格租房时的债务收入比(DTI)。
 * 纯数学在 tools/_lib/finance.ts 的 rentAffordability()。
 */

const S = {
  income: { en: "Monthly income", zh: "月收入", ja: "月収", es: "Ingreso mensual", pt: "Renda mensal", fr: "Revenu mensuel", de: "Monatseinkommen", ru: "Доход в месяц", it: "Reddito mensile", tr: "Aylık gelir", ko: "월 소득", ar: "الدخل الشهري", hi: "मासिक आय", id: "Penghasilan bulanan", vi: "Thu nhập tháng" },
  basis: { en: "Income basis", zh: "收入口径", ja: "収入の種類", es: "Tipo de ingreso", pt: "Tipo de renda", fr: "Base de revenu", de: "Einkommensbasis", ru: "База дохода", it: "Base reddito", tr: "Gelir esası", ko: "소득 기준", ar: "أساس الدخل", hi: "आय आधार", id: "Basis penghasilan", vi: "Cơ sở thu nhập" },
  gross: { en: "Gross (before tax)", zh: "税前(毛收入)", ja: "額面(税引前)", es: "Bruto (antes de impuestos)", pt: "Bruto (antes de impostos)", fr: "Brut (avant impôts)", de: "Brutto (vor Steuern)", ru: "Грязными (до налогов)", it: "Lordo (al netto delle tasse)", tr: "Brüt (vergi öncesi)", ko: "총액(세전)", ar: "الإجمالي (قبل الضريبة)", hi: "सकल (कर से पहले)", id: "Kotor (sebelum pajak)", vi: "Tổng (trước thuế)" },
  net: { en: "Net (take-home)", zh: "税后(到手)", ja: "手取り(税引後)", es: "Neto (después de impuestos)", pt: "Líquido (após impostos)", fr: "Net (perçu)", de: "Netto (Auszahlung)", ru: "Чистыми (на руки)", it: "Netto (incassato)", tr: "Net (ele geçen)", ko: "순액(실수령)", ar: "الصافي (المستلم)", hi: "निवल (हाथ में)", id: "Bersih (diterima)", vi: "Ròng (thực nhận)" },
  ratio: { en: "Rent-to-income ratio", zh: "房租收入比", ja: "家賃の収入比", es: "Ratio renta / ingreso", pt: "Relação aluguel / renda", fr: "Ratio loyer/revenu", de: "Miete-Einkommen-Quote", ru: "Доля rent в доходе", it: "Rapporto affitto/reddito", tr: "Kira/gelir oranı", ko: "소득 대비 월세 비율", ar: "نسبة الإيجار للدخل", hi: "किराया-आय अनुपात", id: "Rasio sewa/penghasilan", vi: "Tỷ lệ tiền thuê/thu nhập" },
  r30: { en: "30% of gross — the classic rule", zh: "毛收入 30% —— 经典法则", ja: "額面の 30% — 定番の基準", es: "30% del bruto — la regla clásica", pt: "30% do bruto — a regra clássica", fr: "30 % du brut — la règle classique", de: "30 % des Brutto — die klassische Regel", ru: "30 % от грязного — классическое правило", it: "30% del lordo — la regola classica", tr: "Brütün %30'i — klasik kural", ko: "총액의 30% — 고전 규칙", ar: "30% من الإجمالي — القاعدة الكلاسيكية", hi: "सकल का 30% — क्लासिक नियम", id: "30% dari kotor — aturan klasik", vi: "30% tổng thu — quy tắc cổ điển" },
  r33: { en: "33% — a slightly looser cap", zh: "33% —— 稍宽松的上限", ja: "33% — 少し緩い上限", es: "33% — un límite algo más flexible", pt: "33% — um limite um pouco mais folgado", fr: "33 % — une limite un peu plus souple", de: "33 % — etwas lockerere Grenze", ru: "33 % — чуть мягче", it: "33% — limite un po' più elastico", tr: "%33 — biraz daha esnek sınır", ko: "33% — 약간 더 느슨한 상한", ar: "33% — حد أكثر مرونة قليلًا", hi: "33% — थोड़ा ढीली सीमा", id: "33% — batas sedikit lebih longgar", vi: "33% — trần nới lỏng hơn chút" },
  r40: { en: "40% of net — high-cost cities", zh: "净收入 40% —— 高成本城市", ja: "手取りの 40% — 物価の高い都市", es: "40% del neto — ciudades caras", pt: "40% do líquido — cidades caras", fr: "40 % du net — villes très chères", de: "40 % des Netto — teure Städte", ru: "40 % от чистого — дорогие города", it: "40% del netto — costose", tr: "Netin %40'i — pahalı şehirler", ko: "순액의 40% — 물가 높은 도시", ar: "40% من الصافي — مدن مرتفعة التكلفة", hi: "निवल का 40% — महँगे शहर", id: "40% dari bersih — kota mahal", vi: "40% thu nhập ròng — thành phố đắt đỏ" },
  debts: { en: "Other debt payments / month", zh: "其他月度债务还款", ja: "その他の月間返済額", es: "Otras deudas / mes", pt: "Outras dívidas / mês", fr: "Autres dettes / mois", de: "Andere Schulden / Monat", ru: "Другие долги / мес.", it: "Altri debiti / mese", tr: "Diğer borçlar / ay", ko: "기타 부채 상환 / 월", ar: "أقساط أخرى / شهر", hi: "अन्य कर्ज़ / माह", id: "Cicilan lain / bulan", vi: "Nợ khác / tháng" },
  insurance: { en: "Renter insurance / month", zh: "租客保险 / 月", ja: "賃貸保険 / 月", es: "Seguro de inquilino / mes", pt: "Seguro residencial / mês", fr: "Assurance locative / mois", de: "Mieterversicherung / Monat", ru: "Страховка арендатора / мес.", it: "Assicurazione locatario / mese", tr: "Kiralık sigorta / ay", ko: "임차 보험 / 월", ar: "تأمين المستأجر / شهر", hi: "किरायेदार बीमा / माह", id: "Asuransi penyewa / bulan", vi: "Bảo hiểm người thuê / tháng" },
  maxRent: { en: "Max affordable rent", zh: "可负担房租上限", ja: "支払える家賃の上限", es: "Alquiler máximo asumible", pt: "Aluguel máximo acessível", fr: "Loyer max supportable", de: "Maximale Miete", ru: "Максимальная rent", it: "Affitto massimo sostenibile", tr: "Ödenebilecek en yüksek kira", ko: "감당 가능한 최대 월세", ar: "أقصى إيجار ميسور", hi: "अधिकतम किराया", id: "Sewa maks terjangkau", vi: "Tiền thuê tối đa" },
  annualRent: { en: "That rent per year", zh: "全年房租合计", ja: "年間の家賃", es: "Ese alquiler al año", pt: "Esse aluguel por ano", fr: "Ce loyer par an", de: "Diese Miete pro Jahr", ru: "Эта rent за год", it: "Quell'affitto all'anno", tr: "Yıllık kira", ko: "연간 월세 총액", ar: "هذا الإيجار سنويًا", hi: "वार्षिक किराया", id: "Sewa per tahun", vi: "Tiền thuê mỗi năm" },
  remaining: { en: "Left after rent + debts", zh: "房租 + 债务后剩余", ja: "家賃・返済後の残り", es: "Resto tras alquiler y deudas", pt: "Sobra após aluguel e dívidas", fr: "Reste après loyer + dettes", de: "Übrig nach Miete + Schulden", ru: "Остаток после rent и долгов", it: "Resto dopo affitto e debiti", tr: "Kira + borç sonrası kalan", ko: "월세+부채 후 잔액", ar: "المتبقي بعد الإيجار والديون", hi: "किराया+कर्ज़ के बाद शेष", id: "Sisa setelah sewa + hutang", vi: "Còn lại sau thuê + nợ" },
  dti: { en: "Debt-to-income at max rent", zh: "顶格租房的债务收入比", ja: "上限家賃時の債務比率", es: "Deuda / ingreso con el alquiler máximo", pt: "Dívida / renda no aluguel máximo", fr: "Dette/revenu au loyer max", de: "Schuldquote bei Maxmiete", ru: "Долг/доход при макс. rent", it: "Debito/reddito all'affitto max", tr: "Maks kirada borç oranı", ko: "최대 월세 시 부채 비율", ar: "الدين للدخل عند أقصى إيجار", hi: "अधिकतम किराये पर कर्ज़ अनुपात", id: "Rasio utang pada sewa maks", vi: "Tỷ lệ nợ/thu nhập ở mức thuê tối đa" },
  over: {
    en: "Negative budget: rent plus debts exceed the income you entered — look for a lower rent or pay down debt first.",
    zh: "预算为负:房租加债务超过了你输入的收入——考虑降低房租或先还清部分债务。",
    ja: "残りがマイナス:家賃と返済の合計が入力した収入を超えています。家賃を下げるか、先に借金を減らしましょう。",
    es: "Presupuesto negativo: el alquiler más las deudas superan el ingreso indicado; busque un alquiler más bajo o reduzca primero la deuda.",
    pt: "Orçamento negativo: aluguel mais dívidas passam da renda informada — procure um aluguel menor ou quite dívidas primeiro.",
    fr: "Budget négatif : loyer + dettes dépassent le revenu saisi — cherchez un loyer plus bas ou réduisez les dettes.",
    de: "Negatives Budget: Miete + Schulden übersteigen das eingegebene Einkommen — niedrigere Miete suchen oder Schulden senken.",
    ru: "Отрицательный бюджет: аренда + долги превышают введённый доход — ищите жильё дешевле или сокращайте долги.",
    it: "Budget negativo: affitto + debiti superano il reddito inserito — cerca un affitto più basso o riduci i debiti.",
    tr: "Negatif bütçe: kira + borçlar girdiğiniz geliri aşıyor — daha düşük kira arayın veya borçları azaltın.",
    ko: "예산이 음수입니다: 월세+부채가 입력한 소득을 초과합니다 — 더 낮은 월세를 찾거나 부채를 줄이세요.",
    ar: "ميزانية سالبة: الإيجار + الديون تتجاوز الدخل المُدخل — ابحث عن إيجار أقل أو خفّض الديون.",
    hi: "ऋणात्मक बजट: किराया + कर्ज़ दर्ज आय से अधिक है — कम किराये की तलाश करें या कर्ज़ घटाएँ।",
    id: "Anggaran negatif: sewa + hutang melebihi penghasilan yang dimasukkan — cari sewa lebih murah atau kurangi hutang.",
    vi: "Ngân sách âm: tiền thuê + nợ vượt thu nhập đã nhập — tìm nơi rẻ hơn hoặc giảm nợ.",
  },
  ruleNote: {
    en: "The 30% rule traces back to the 1969 Brooke Amendment, which capped public-housing rent at 25% (later 30%) of income, and HUD still calls households paying more than 30% \"cost-burdened\". On a gross basis 30% is the classic cap; if you budget from take-home pay, 40% of net is a common ceiling in expensive cities. Lenders usually want total debts under about 36% of income.",
    zh: "「30% 法则」可追溯到 1969 年的 Brooke 修正案:公共住房租金最初封顶为收入的 25%(后调整为 30%),如今 HUD 仍把房租超过收入 30% 的家庭称为「成本负担过重」。按毛收入算,30% 是经典上限;若按到手收入规划,高成本城市常用净收入 40%。贷款机构一般希望总债务收入比控制在 36% 以内。",
    ja: "30% ルールの起源は 1969 年のブルック修正案で、公営住宅の家賃を収入の 25%(のちに 30%)に制限しました。現在でも HUD は家賃が収入の 30% を超える世帯を「費用負担過重」と呼びます。額面基準なら 30% が定番、手取り基準では物価の高い都市で 40% が上限の目安です。貸し手は総債務比率を概ね 36% 以下にすることを求めます。",
    es: "La regla del 30% se remonta a la Enmienda Brooke de 1969, que limitó el alquiler de la vivienda pública al 25% (luego 30%) del ingreso, y HUD sigue llamando \"cargados por costes\" a los hogares que pagan más del 30%. Sobre el bruto, 30% es el tope clásico; si parte del sueldo neto, 40% del neto es un techo habitual en ciudades caras. Los prestamistas suelen querer deudas totales por debajo del 36% del ingreso.",
    pt: "A regra dos 30% vem da Emenda Brooke de 1969, que limitou o aluguel de moradia pública a 25% (depois 30%) da renda, e o HUD ainda chama de \"sobrecarregados\" os lares que pagam mais de 30%. Sobre o bruto, 30% é o teto clássico; se você planeja pelo salário líquido, 40% do líquido é um teto comum em cidades caras. Credores geralmente querem dívidas totais abaixo de 36% da renda.",
    fr: "La règle des 30 % remonte au Brooke Amendment de 1969, qui plafonnait le loyer du logement public à 30 % du revenu. Elle reste une référence utile, mais les marchés chers la rendent souvent irréaliste — comparez avec les caps 33 % et 40 % ci-dessous.",
    de: "Die 30-%-Regel geht auf das Brooke Amendment von 1969 zurück, das öffentliche Mieten auf 30 % des Einkommens deckelte. Sie bleibt ein nützlicher Anhaltspunkt, aber teure Märkte machen sie oft unrealistisch — vergleiche mit den 33-%- und 40-%-Limits.",
    ru: "Правило 30 % восходит к поправке Брука 1969 года, ограничившей аренду соцжилья 30 % дохода. Оно остаётся полезным ориентиром, но дорогие рынки часто делают его нереалистичным — сравните с лимитами 33 % и 40 % ниже.",
    it: "La regola del 30% risale al Brooke Amendment del 1969, che limitava l'affitto di case popolari al 30% del reddito. Resta un riferimento utile, ma i mercati costosi la rendono spesso irrealistica — confronta con i limiti del 33% e 40% qui sotto.",
    tr: "%30 kuralı, 1969 Brooke Değişikliği'ne dayanır ve kamu konutu kirasını gelirin %30'uyla sınırlardı. Faydalı bir referans olmayı sürdürür, ama pahalı piyasalar genelde gerçekçi kılmaz — aşağıdaki %33 ve %40 sınırlarıyla karşılaştırın.",
    ko: "30% 규칙은 1969년 Brooke 수정안에서 유래하며 공공주택 임대료를 소득의 30%로 제한했습니다. 여전히 유용한 기준이지만 물가가 높은 시장에서는 비현실적일 때가 많습니다 — 아래 33%·40% 상한과 비교해 보세요.",
    ar: "تعود قاعدة 30% إلى تعديل بروك عام 1969 الذي حصر إيجار المساكن العامة بـ30% من الدخل. تظل مرجعًا مفيدًا لكن الأسواق الغالية تجعلها غالبًا غير واقعية — قارن مع حدّي 33% و40% أدناه.",
    hi: "30% नियम 1969 के ब्रुक संशोधन से आया, जिसने सार्वजनिक आवास का किराया आय के 30% पर सीमित किया। यह उपयोगी संदर्भ बना है, पर महँगे बाज़ार इसे अक्सर अव्यावहारिक बना देते हैं — नीचे 33% और 40% सीमाओं से तुलना करें।",
    id: "Aturan 30% berasal dari Amandemen Brooke 1969 yang membatasi sewa perumahan publik pada 30% penghasilan. Tetap jadi acuan berguna, tapi pasar mahal sering membuatnya tak realistis — bandingkan dengan batas 33% dan 40% di bawah.",
    vi: "Quy tắc 30% bắt nguồn từ Tu chính án Brooke 1969, giới hạn tiền thuê nhà công ở 30% thu nhập. Vẫn là tham chiếu hữu ích nhưng thị trường đắt đỏ thường khiến nó phi thực tế — so sánh với trần 33% và 40% bên dưới.",
  },
};

function num(s: string): number {
  const t = s.trim();
  if (t === "") return NaN;
  const n = Number(t.replace(",", "."));
  return Number.isFinite(n) ? n : NaN;
}

export function CalcEngineRent() {
  const { locale } = useI18n();
  const [income, setIncome] = useState("5000");
  const [basis, setBasis] = useState("gross");
  const [ratio, setRatio] = useState("30");
  const [debts, setDebts] = useState("");
  const [insurance, setInsurance] = useState("");

  const res = useMemo(
    () =>
      rentAffordability(
        num(income),
        num(ratio),
        debts.trim() === "" ? 0 : num(debts),
        insurance.trim() === "" ? 0 : num(insurance),
      ),
    [income, ratio, debts, insurance],
  );
  const money = (n: number) => fmtMoney(n, locale, "$");
  const negative = Number.isFinite(res.remainingBudget) && res.remainingBudget < 0;

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.income)}>
          <NumIn value={income} onChange={setIncome} aria="monthly income" />
        </Field>
        <Field label={pick(locale, S.basis)}>
          <Tabs
            options={[
              { id: "gross", label: pick(locale, S.gross) },
              { id: "net", label: pick(locale, S.net) },
            ]}
            value={basis}
            onChange={(id) => {
              setBasis(id);
              // 切换口径时联动推荐比例:毛收入 → 30% 经典法则;到手收入 → 40% 常用上限
              setRatio(id === "net" ? "40" : "30");
            }}
          />
        </Field>
        <Field label={pick(locale, S.ratio)}>
          <Sel value={ratio} onChange={setRatio} aria="rent-to-income ratio">
            <option value="30">{pick(locale, S.r30)}</option>
            <option value="33">{pick(locale, S.r33)}</option>
            <option value="40">{pick(locale, S.r40)}</option>
          </Sel>
        </Field>
        <Field label={pick(locale, S.debts)}>
          <NumIn value={debts} onChange={setDebts} aria="other monthly debt payments" placeholder="0" />
        </Field>
        <Field label={pick(locale, S.insurance)}>
          <NumIn value={insurance} onChange={setInsurance} aria="renter insurance per month" placeholder="0" />
        </Field>
      </div>

      <div className="mt-5">
        <Stats
          items={[
            { label: pick(locale, S.maxRent), value: money(res.maxRent), tone: "accent" },
            { label: pick(locale, S.annualRent), value: money(res.annualRent) },
            {
              label: pick(locale, S.remaining),
              value: money(res.remainingBudget),
              tone: negative ? "bad" : "good",
            },
            { label: pick(locale, S.dti), value: Number.isFinite(res.dtiPct) ? `${fmt(res.dtiPct, locale, 1)}%` : "—" },
          ]}
        />
      </div>

      <div className="mt-3 space-y-2">
        {negative && <Note>{pick(locale, S.over)}</Note>}
        <Note>{pick(locale, S.ruleNote)}</Note>
      </div>
    </ToolPanel>
  );
}
