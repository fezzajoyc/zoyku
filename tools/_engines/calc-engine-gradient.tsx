"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { Field, Note, Tabs, pick } from "./calc-ui";
import { gradientCss, rotateHue, type GradientKind, type RadialShape } from "../_lib/gradient";

/**
 * CSS 渐变生成器:色标管理与 UI 编排;字符串数学全在 tools/_lib/gradient.ts(纯,已测)。
 * 位置留空 = 按色标顺序自动插值(CSS 规则)。输出带回退色、-webkit 前缀行与标准行。
 */

type StopDraft = { color: string; position: number | null };

const DEFAULT_STOPS: StopDraft[] = [
  { color: "#7C3AED", position: null },
  { color: "#EC4899", position: null },
];

const PRESET_PALETTES = [
  { key: "pSunset", colors: ["#F97316", "#DB2777", "#7C3AED"] },
  { key: "pOcean", colors: ["#0EA5E9", "#2563EB", "#1E3A8A"] },
  { key: "pForest", colors: ["#84CC16", "#059669", "#065F46"] },
  { key: "pCandy", colors: ["#F472B6", "#FBCFE8", "#A5F3FC", "#818CF8"] },
  { key: "pMono", colors: ["#111827", "#4B5563", "#9CA3AF", "#F3F4F6"] },
] as const;

const HARMONIZE_STEPS = [30, 45, 60, 90, 120, 150, 180];

const L: Record<string, Record<string, string>> = {
  stops: { en: "Color stops", zh: "色标", ja: "カラーストップ", es: "Paradas de color", pt: "Paradas de cor", fr: "Arrêts de couleur", de: "Farbstops", ru: "Цветовые точки", it: "Stop colore", tr: "Renk durakları", ko: "색상 스톱", ar: "نقاط اللون", hi: "कलर स्टॉप", id: "Stop warna", vi: "Điểm màu" },
  position: { en: "Position %", zh: "位置 %", ja: "位置 %", es: "Posición %", pt: "Posição %", fr: "Position %", de: "Position %", ru: "Позиция %", it: "Posizione %", tr: "Konum %", ko: "위치 %", ar: "الموضع %", hi: "स्थिति %", id: "Posisi %", vi: "Vị trí %" },
  positionAuto: { en: "auto", zh: "自动", ja: "自動", es: "auto", pt: "auto", fr: "auto", de: "auto", ru: "авто", it: "auto", tr: "otomatik", ko: "자동", ar: "تلقائي", hi: "ऑटो", id: "oto", vi: "tự động" },
  kind: { en: "Gradient type", zh: "渐变类型", ja: "グラデーション種別", es: "Tipo de degradado", pt: "Tipo de gradiente", fr: "Type de dégradé", de: "Gradient-Typ", ru: "Тип градиента", it: "Tipo di gradiente", tr: "Gradyan türü", ko: "그라디언트 유형", ar: "نوع التدرج", hi: "ग्रेडिएंट प्रकार", id: "Jenis gradien", vi: "Loại gradient" },
  linear: { en: "Linear", zh: "线性", ja: "線形", es: "Lineal", pt: "Linear", fr: "Linéaire", de: "Linear", ru: "Линейный", it: "Lineare", tr: "Doğrusal", ko: "선형", ar: "خطي", hi: "रैखिक", id: "Linear", vi: "Tuyến tính" },
  radial: { en: "Radial", zh: "径向", ja: "円形", es: "Radial", pt: "Radial", fr: "Radial", de: "Radial", ru: "Радиальный", it: "Radiale", tr: "Radyal", ko: "원형", ar: "شعاعي", hi: "रेडियल", id: "Radial", vi: "Toả tròn" },
  conic: { en: "Conic", zh: "锥形", ja: "円錐", es: "Cónico", pt: "Cônico", fr: "Conique", de: "Konisch", ru: "Конический", it: "Conico", tr: "Konik", ko: "원뿔형", ar: "مخروطي", hi: "कोणीय", id: "Konis", vi: "Nón" },
  angle: { en: "Angle", zh: "角度", ja: "角度", es: "Ángulo", pt: "Ângulo", fr: "Angle", de: "Winkel", ru: "Угол", it: "Angolo", tr: "Açı", ko: "각도", ar: "الزاوية", hi: "कोण", id: "Sudut", vi: "Góc" },
  fromAngle: { en: "From angle", zh: "起始角度", ja: "開始角度", es: "Ángulo inicial", pt: "Ângulo inicial", fr: "Angle de départ", de: "Startwinkel", ru: "Начальный угол", it: "Angolo di partenza", tr: "Başlangıç açısı", ko: "시작 각도", ar: "زاوية البداية", hi: "प्रारंभ कोण", id: "Sudut awal", vi: "Góc bắt đầu" },
  shape: { en: "Shape", zh: "形状", ja: "形状", es: "Forma", pt: "Forma", fr: "Forme", de: "Form", ru: "Форма", it: "Forma", tr: "Şekil", ko: "모양", ar: "الشكل", hi: "आकार", id: "Bentuk", vi: "Hình dạng" },
  circle: { en: "Circle", zh: "圆形", ja: "サークル", es: "Círculo", pt: "Círculo", fr: "Cercle", de: "Kreis", ru: "Круг", it: "Cerchio", tr: "Daire", ko: "원", ar: "دائرة", hi: "वृत्त", id: "Lingkaran", vi: "Tròn" },
  ellipse: { en: "Ellipse", zh: "椭圆", ja: "楕円", es: "Elipse", pt: "Elipse", fr: "Ellipse", de: "Ellipse", ru: "Эллипс", it: "Ellisse", tr: "Elips", ko: "타원", ar: "قطع ناقص", hi: "दीर्घवृत्त", id: "Elips", vi: "Elip" },
  preview: { en: "Live preview", zh: "实时预览", ja: "ライブプレビュー", es: "Vista previa", pt: "Pré-visualização", fr: "Aperçu en direct", de: "Live-Vorschau", ru: "Предпросмотр", it: "Anteprima live", tr: "Canlı önizleme", ko: "실시간 미리보기", ar: "معاينة مباشرة", hi: "लाइव प्रीव्यू", id: "Pratinjau langsung", vi: "Xem trực tiếp" },
  css: { en: "CSS", zh: "CSS 代码", ja: "CSS", es: "CSS", pt: "CSS", fr: "CSS", de: "CSS", ru: "CSS", it: "CSS", tr: "CSS", ko: "CSS", ar: "CSS", hi: "CSS", id: "CSS", vi: "CSS" },
  addStop: { en: "Add color", zh: "添加颜色", ja: "色を追加", es: "Añadir color", pt: "Adicionar cor", fr: "Ajouter une couleur", de: "Farbe hinzufügen", ru: "Добавить цвет", it: "Aggiungi colore", tr: "Renk ekle", ko: "색상 추가", ar: "إضافة لون", hi: "रंग जोड़ें", id: "Tambah warna", vi: "Thêm màu" },
  remove: { en: "Remove", zh: "移除", ja: "削除", es: "Quitar", pt: "Remover", fr: "Supprimer", de: "Entfernen", ru: "Удалить", it: "Rimuovi", tr: "Kaldır", ko: "제거", ar: "إزالة", hi: "हटाएँ", id: "Hapus", vi: "Xóa" },
  presets: { en: "Palettes", zh: "预设配色", ja: "パレット", es: "Paletas", pt: "Paletas", fr: "Palettes", de: "Paletten", ru: "Палитры", it: "Palette", tr: "Paletler", ko: "팔레트", ar: "لوحات الألوان", hi: "पैलेट", id: "Palet", vi: "Bảng màu" },
  harmonize: { en: "Random harmonize", zh: "随机和谐", ja: "ランダム調和", es: "Armonizar al azar", pt: "Harmonizar", fr: "Harmoniser au hasard", de: "Zufällig harmonisieren", ru: "Случайная гармонизация", it: "Armonizza a caso", tr: "Rastgele uyumla", ko: "무작위 조화", ar: "تناغم عشوائي", hi: "यादृच्छिक सामंजस्य", id: "Harmonisasi acak", vi: "Hài hòa ngẫu nhiên" },
  invalid: {
    en: "Add at least two colors (and keep every position a number between 0 and 100).",
    zh: "至少需要两个颜色(位置需为 0–100 的数字)。",
    ja: "色は 2 つ以上必要です(位置は 0〜100 の数値)。",
    es: "Añade al menos dos colores (y usa posiciones numéricas entre 0 y 100).",
    pt: "Adicione pelo menos duas cores (e use posições numéricas entre 0 e 100).",
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
  maxStops: {
    en: "Five stops is the maximum.",
    zh: "最多支持 5 个色标。",
    ja: "ストップは最大 5 つです。",
    es: "El máximo son cinco paradas.",
    pt: "O máximo são cinco paradas.",
    fr: "Cinq arrêts au maximum.",
    de: "Fünf Stops sind das Maximum.",
    ru: "Максимум — пять точек.",
    it: "Cinque stop al massimo.",
    tr: "En fazla beş durak.",
    ko: "최대 5개까지 가능합니다.",
    ar: "الحد الأقصى خمس نقاط توقف.",
    hi: "अधिकतम पाँच स्टॉप।",
    id: "Maksimum lima stop.",
    vi: "Tối đa năm điểm màu.",
  },
  pSunset: { en: "Sunset", zh: "日落", ja: "夕焼け", es: "Atardecer", pt: "Pôr do sol", fr: "Coucher de soleil", de: "Sonnenuntergang", ru: "Закат", it: "Tramonto", tr: "Gün batımı", ko: "노을", ar: "الغروب", hi: "सूर्यास्त", id: "Senja", vi: "Hoàng hôn" },
  pOcean: { en: "Ocean", zh: "海洋", ja: "海", es: "Océano", pt: "Oceano", fr: "Océan", de: "Ozean", ru: "Океан", it: "Oceano", tr: "Okyanus", ko: "바다", ar: "المحيط", hi: "महासागर", id: "Samudra", vi: "Đại dương" },
  pForest: { en: "Forest", zh: "森林", ja: "森", es: "Bosque", pt: "Floresta", fr: "Forêt", de: "Wald", ru: "Лес", it: "Foresta", tr: "Orman", ko: "숲", ar: "الغابة", hi: "वन", id: "Hutan", vi: "Rừng" },
  pCandy: { en: "Candy", zh: "糖果", ja: "キャンディ", es: "Caramelo", pt: "Guloseima", fr: "Bonbon", de: "Bonbon", ru: "Карамель", it: "Caramella", tr: "Şeker", ko: "캔디", ar: "الحلوى", hi: "कैंडी", id: "Permen", vi: "Kẹo" },
  pMono: { en: "Monochrome", zh: "单色灰阶", ja: "モノクロ", es: "Monocromo", pt: "Monocromático", fr: "Monochrome", de: "Monochrom", ru: "Монохром", it: "Monocromo", tr: "Tek renk", ko: "모노크롬", ar: "أحادي اللون", hi: "मोनोक्रोम", id: "Monokrom", vi: "Đơn sắc" },
  hintLinear: {
    en: "0° points up and 90° to the right — the angle runs clockwise.",
    zh: "0° 朝上、90° 朝右,角度顺时针递增。",
    ja: "0° は上向き、90° は右向き。角度は時計回りに進みます。",
    es: "0° apunta hacia arriba y 90° hacia la derecha; el ángulo avanza en sentido horario.",
    pt: "0° aponta para cima e 90° para a direita — o ângulo avança no sentido horário.",
    fr: "0° pointe vers le haut et 90° vers la droite — l'angle tourne dans le sens horaire.",
    de: "0° zeigt nach oben, 90° nach rechts — der Winkel läuft im Uhrzeigersinn.",
    ru: "0° указывает вверх, 90° — вправо; угол отсчитывается по часовой стрелке.",
    it: "0° punta verso l'alto e 90° verso destra — l'angolo gira in senso orario.",
    tr: "0° yukarıyı, 90° sağı gösterir — açı saat yönünde döner.",
    ko: "0°는 위, 90°는 오른쪽을 가리킵니다 — 각도는 시계 방향입니다.",
    ar: "0° يشير للأعلى و90° لليمين — تدور الزاوية باتجاه عقارب الساعة.",
    hi: "0° ऊपर और 90° दाईं ओर — कोण घड़ी की दिशा में घूमता है।",
    id: "0° menunjuk ke atas dan 90° ke kanan — sudut berputar searah jarum jam.",
    vi: "0° hướng lên và 90° sang phải — góc quay theo chiều kim đồng hồ.",
  },
  hintConic: {
    en: "A conic gradient sweeps around a center point, starting at the “from” angle.",
    zh: "锥形渐变围绕中心点旋转扫过,从“起始角度”开始。",
    ja: "円錐グラデーションは中心点の周りを、「開始角度」から一周します。",
    es: "Un degradado cónico barre alrededor de un punto central, empezando en el ángulo inicial.",
    pt: "Um gradiente cônico varre em torno de um ponto central, começando no ângulo inicial.",
    fr: "Un dégradé conique balaie autour d'un point central, en partant de l'angle « from ».",
    de: "Ein Conic-Gradient kreist um einen Mittelpunkt, beginnend beim „from“-Winkel.",
    ru: "Конический градиент обходит вокруг центральной точки, начиная с угла «from».",
    it: "Un gradiente conico ruota attorno a un punto centrale, partendo dall'angolo \"from\".",
    tr: "Konik gradyan, «from» açısından başlayarak merkez nokta etrafında döner.",
    ko: "원뿔형 그라디언트는 «시작» 각도부터 중심점을 중심으로 회전합니다.",
    ar: "يتدرج التدرج المخروطي حول نقطة مركزية بدءًا من زاوية «from».",
    hi: "कोणीय ग्रेडिएंट केंद्र बिंदु के चारों ओर «from» कोण से घूमता है।",
    id: "Gradien konis menyapu mengelilingi titik pusat, mulai dari sudut \"from\".",
    vi: "Gradient nón quét quanh điểm trung tâm, bắt đầu từ góc \"from\".",
  },
  hintRadial: {
    en: "A radial gradient radiates outward from the center of the box.",
    zh: "径向渐变从盒子中心向外扩散。",
    ja: "円形グラデーションはボックスの中心から外側へ広がります。",
    es: "Un degradado radial se irradia desde el centro de la caja.",
    pt: "Um gradiente radial se irradia do centro da caixa para fora.",
    fr: "Un dégradé radial irradie depuis le centre du cadre.",
    de: "Ein radialer Gradient strahlt von der Mitte der Box nach außen.",
    ru: "Радиальный градиент расходится от центра блока наружу.",
    it: "Un gradiente radiale si irradia dal centro del riquadro.",
    tr: "Radyal gradyan kutunun merkezinden dışa doğru yayılır.",
    ko: "원형 그라디언트는 박스 중심에서 바깥으로 퍼집니다.",
    ar: "يتدرج التدرج الشعاعي للخارج من مركز الصندوق.",
    hi: "रेडियल ग्रेडिएंट बॉक्स के केंद्र से बाहर की ओर फैलता है।",
    id: "Gradien radial menyebar keluar dari pusat kotak.",
    vi: "Gradient tỏa tròn lan từ tâm hộp ra ngoài.",
  },
};

/** 色标草稿 → 纯函数输入(位置 null → undefined = 自动) */
function toStops(drafts: StopDraft[]) {
  return drafts.map((d) => ({
    color: d.color,
    position: d.position === null ? undefined : d.position,
  }));
}

function cssBlock(gradient: string, fallback: string): string {
  return [
    `background-color: ${fallback}; /* fallback for old browsers */`,
    `background-image: -webkit-${gradient};`,
    `background-image: ${gradient};`,
  ].join("\n");
}

export function CalcEngineGradient() {
  const { locale, t } = useI18n();
  const [stops, setStops] = useState<StopDraft[]>(DEFAULT_STOPS);
  const [kind, setKind] = useState<GradientKind>("linear");
  const [angle, setAngle] = useState(135);
  const [shape, setShape] = useState<RadialShape>("circle");
  const [notice, setNotice] = useState("");

  const gradient = useMemo(() => {
    const valid = stops.length >= 2 && stops.every((s) => s.color.trim() !== "");
    if (!valid) return null;
    return gradientCss(toStops(stops), kind, kind === "radial" ? 0 : angle, shape);
  }, [stops, kind, angle, shape]);

  const fallback = stops[0]?.color.trim() || "#333333";
  const block = gradient ? cssBlock(gradient, fallback) : "";

  const setStop = (i: number, patch: Partial<StopDraft>) => {
    setStops((prev) => prev.map((s, j) => (j === i ? { ...s, ...patch } : s)));
  };

  const addStop = () => {
    setNotice("");
    if (stops.length >= 5) {
      setNotice(pick(locale, L.maxStops));
      return;
    }
    setStops((prev) => [...prev, { color: "#94A3B8", position: null }]);
  };

  const removeStop = (i: number) => {
    setNotice("");
    setStops((prev) => (prev.length <= 2 ? prev : prev.filter((_, j) => j !== i)));
  };

  const harmonize = () => {
    setNotice("");
    const deg = HARMONIZE_STEPS[Math.floor(Math.random() * HARMONIZE_STEPS.length)] * (Math.random() < 0.5 ? -1 : 1);
    setStops((prev) => {
      const rotated = rotateHue(prev.map((s) => s.color), deg);
      return prev.map((s, i) => ({ ...s, color: rotated[i] }));
    });
  };

  const angleLabel = kind === "conic" ? pick(locale, L.fromAngle) : pick(locale, L.angle);

  return (
    <ToolPanel>
      <div className="space-y-4">
        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, L.stops)}</p>
          <div className="space-y-2">
            {stops.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="color"
                  value={/^#[0-9a-f]{6}$/i.test(s.color.trim()) ? s.color.trim().toLowerCase() : "#94a3b8"}
                  onChange={(e) => setStop(i, { color: e.target.value })}
                  className="h-10 w-12 shrink-0 cursor-pointer rounded-lg border hairline bg-[var(--color-card)]"
                  aria-label={`${pick(locale, L.stops)} ${i + 1}`}
                />
                <input
                  type="text"
                  className="field mono w-28 shrink-0"
                  value={s.color}
                  onChange={(e) => setStop(i, { color: e.target.value })}
                  placeholder="#7C3AED"
                  spellCheck={false}
                  aria-label={`${pick(locale, L.stops)} ${i + 1} hex`}
                />
                <label className="flex min-w-0 flex-1 items-center gap-2">
                  <span className="hidden text-[12.5px] text-[var(--color-sub)] sm:inline">
                    {pick(locale, L.position)}
                  </span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={100}
                    className="field bare mono w-20"
                    value={s.position === null ? "" : s.position}
                    onChange={(e) => {
                      const v = e.target.value === "" ? null : Number(e.target.value);
                      setStop(i, { position: v === null || Number.isFinite(v) ? v : s.position });
                    }}
                    placeholder={pick(locale, L.positionAuto)}
                    aria-label={`${pick(locale, L.position)} ${i + 1}`}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => removeStop(i)}
                  disabled={stops.length <= 2}
                  aria-label={pick(locale, L.remove)}
                  className="h-7 w-7 flex-none rounded-full text-[14px] leading-none text-[var(--color-sub)] hover:bg-[var(--color-surface)] disabled:opacity-30"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={addStop}
              disabled={stops.length >= 5}
              className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)] disabled:opacity-40"
            >
              + {pick(locale, L.addStop)}
            </button>
            <button
              type="button"
              onClick={harmonize}
              className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium text-[var(--color-accent-strong)] transition-colors hover:bg-[rgba(0,113,227,0.06)]"
            >
              ⟳ {pick(locale, L.harmonize)}
            </button>
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, L.presets)}</p>
          <div className="flex flex-wrap gap-2">
            {PRESET_PALETTES.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => {
                  setNotice("");
                  setStops(p.colors.map((c) => ({ color: c, position: null })));
                }}
                aria-label={pick(locale, L[p.key])}
                className="flex items-center gap-2 rounded-full border hairline py-1 pl-1.5 pr-3.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
              >
                <span className="flex" aria-hidden>
                  {p.colors.map((c, i) => (
                    <span
                      key={`${c}-${i}`}
                      className="inline-block h-4 w-4 rounded-full border hairline"
                      style={{ background: c, marginLeft: i > 0 ? -6 : 0 }}
                    />
                  ))}
                </span>
                {pick(locale, L[p.key])}
              </button>
            ))}
          </div>
        </div>

        <Tabs
          options={[
            { id: "linear", label: pick(locale, L.linear) },
            { id: "radial", label: pick(locale, L.radial) },
            { id: "conic", label: pick(locale, L.conic) },
          ]}
          value={kind}
          onChange={(id) => setKind(id as GradientKind)}
        />

        {kind === "radial" ? (
          <Field label={pick(locale, L.shape)}>
            <select
              className="field sm:w-56"
              value={shape}
              onChange={(e) => setShape(e.target.value as RadialShape)}
              aria-label={pick(locale, L.shape)}
            >
              <option value="circle">{pick(locale, L.circle)}</option>
              <option value="ellipse">{pick(locale, L.ellipse)}</option>
            </select>
          </Field>
        ) : (
          <Field label={`${angleLabel}: ${angle}°`}>
            <input
              type="range"
              min={0}
              max={359}
              value={angle}
              onChange={(e) => setAngle(+e.target.value)}
              className="w-full"
              aria-label={angleLabel}
            />
          </Field>
        )}

        {notice && (
          <p className="rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] text-[var(--color-bad)]" role="alert">
            {notice}
          </p>
        )}

        <Field label={pick(locale, L.preview)}>
          <div
            className="h-44 w-full rounded-xl border hairline"
            style={gradient ? { backgroundImage: gradient } : undefined}
            role="img"
            aria-label={gradient ?? pick(locale, L.invalid)}
          />
        </Field>

        {gradient ? (
          <Field label={pick(locale, L.css)}>
            <pre className="overflow-x-auto rounded-xl bg-[var(--color-surface)] px-3.5 py-3 text-[13px] leading-5">{block}</pre>
            <div className="mt-2 flex flex-wrap gap-2.5">
              <CopyButton value={block} label={t.common.copy} />
            </div>
          </Field>
        ) : (
          <p className="rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] text-[var(--color-bad)]" role="alert">
            {pick(locale, L.invalid)}
          </p>
        )}

        <Note>
          {kind === "linear"
            ? pick(locale, L.hintLinear)
            : kind === "conic"
              ? pick(locale, L.hintConic)
              : pick(locale, L.hintRadial)}
        </Note>
      </div>
    </ToolPanel>
  );
}
