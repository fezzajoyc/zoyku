"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { INTL_LOCALES, Note, pick } from "./calc-ui";

/**
 * Random name picker with a canvas prize wheel.
 * The winner is drawn with crypto.getRandomValues (rejection sampling, no
 * modulo bias); the wheel animation is purely visual and lands on that
 * pre-drawn winner, so the result and the animation can never disagree.
 */

const MAX_NAMES = 100;
const WHEEL = 340;

/** 12 colors that all carry white labels well, cycling by segment. */
const SEG_COLORS = [
  "#0071e3", "#1a7f37", "#b25000", "#6e56cf", "#0e7490", "#be185d",
  "#4d7c0f", "#4338ca", "#0f766e", "#9f1239", "#a16207", "#15803d",
];

const S = {
  names: { en: "Names (one per line)", zh: "名单(每行一个)", ja: "名前(1 行に 1 つ)", es: "Nombres (uno por línea)", pt: "Nomes (um por linha)", fr: "Noms (un par ligne)", de: "Namen (einer pro Zeile)", ru: "Имена (по одному в строке)", it: "Nomi (uno per riga)", tr: "İsimler (satır başına bir)", ko: "이름(한 줄에 하나)", ar: "الأسماء (واحد في كل سطر)", hi: "नाम (प्रति पंक्ति एक)", id: "Nama (satu per baris)", vi: "Tên (mỗi dòng một tên)" },
  count: { en: "{n} names on the wheel", zh: "转盘上共 {n} 个名字", ja: "ホイールに {n} 人", es: "{n} nombres en la ruleta", pt: "{n} nomes na roleta", fr: "{n} noms sur la roue", de: "{n} Namen auf dem Rad", ru: "{n} имён на колесе", it: "{n} nomi sulla ruota", tr: "Çarkta {n} isim", ko: "휠에 {n}개의 이름", ar: "{n} اسمًا على العجلة", hi: "पहिए पर {n} नाम", id: "{n} nama di roda", vi: "{n} tên trên vòng quay" },
  dedupe: { en: "Remove duplicate names", zh: "去除重复名字", ja: "重複した名前を削除", es: "Quitar nombres duplicados", pt: "Remover nomes duplicados", fr: "Supprimer les doublons", de: "Doppelte Namen entfernen", ru: "Убрать дубликаты", it: "Rimuovi nomi duplicati", tr: "Yinelenen adları kaldır", ko: "중복 이름 제거", ar: "إزالة الأسماء المكررة", hi: "डुप्लिकेट नाम हटाएँ", id: "Hapus nama duplikat", vi: "Xóa tên trùng" },
  removeWinner: { en: "Remove the winner after each draw", zh: "抽出后移除中奖者", ja: "抽選後に当選者を除外", es: "Quitar al ganador tras cada sorteo", pt: "Remover o sorteado após cada rodada", fr: "Retirer le gagnant après chaque tirage", de: "Gewinner nach jeder Ziehung entfernen", ru: "Удалять победителя после каждого розыгрыша", it: "Rimuovi il vincitore dopo ogni estrazione", tr: "Her çekilişte kazananı kaldır", ko: "뽑힐 때마다 당첨자 제거", ar: "إزالة الفائز بعد كل سحب", hi: "हर बार विजेता हटाएँ", id: "Hapus pemenang setiap undian", vi: "Xóa người trúng sau mỗi lượt" },
  spin: { en: "SPIN", zh: "开始", ja: "回す", es: "GIRAR", pt: "GIRAR", fr: "TOURNER", de: "DREHEN", ru: "КРУТИТЬ", it: "GIRA", tr: "ÇEVİR", ko: "돌리기", ar: "أدر", hi: "घुमाएँ", id: "PUTAR", vi: "QUAY" },
  spinning: { en: "Spinning…", zh: "转动中…", ja: "回転中…", es: "Girando…", pt: "Girando…", fr: "Rotation…", de: "Dreht…", ru: "Крутится…", it: "Girando…", tr: "Dönüyor…", ko: "돌아가는 중…", ar: "يدور…", hi: "घूम रहा है…", id: "Berputar…", vi: "Đang quay…" },
  winner: { en: "Winner", zh: "中奖者", ja: "当選者", es: "Ganador", pt: "Sorteado", fr: "Gagnant", de: "Gewinner", ru: "Победитель", it: "Vincitore", tr: "Kazanan", ko: "당첨자", ar: "الفائز", hi: "विजेता", id: "Pemenang", vi: "Người trúng" },
  history: { en: "Draw history", zh: "抽取记录", ja: "抽選履歴", es: "Historial de sorteos", pt: "Histórico de sorteios", fr: "Historique des tirages", de: "Ziehungshistorie", ru: "История розыгрышей", it: "Cronologia estrazioni", tr: "Çekiliş geçmişi", ko: "추첨 기록", ar: "سجل السحب", hi: "ड्रॉ इतिहास", id: "Riwayat undian", vi: "Lịch sử quay" },
  empty: { en: "No draws yet.", zh: "还没有抽取记录。", ja: "まだ抽選はありません。", es: "Aún no hay sorteos.", pt: "Nenhum sorteio ainda.", fr: "Aucun tirage pour l'instant.", de: "Noch keine Ziehungen.", ru: "Пока нет розыгрышей.", it: "Nessuna estrazione.", tr: "Henüz çekiliş yok.", ko: "아직 추첨 기록이 없습니다.", ar: "لا توجد سحبات بعد.", hi: "अभी कोई ड्रॉ नहीं।", id: "Belum ada undian.", vi: "Chưa có lượt quay nào." },
  need2: {
    en: "Enter at least 2 names, one per line, to spin the wheel.",
    zh: "请输入至少 2 个名字(每行一个)再转动转盘。",
    ja: "2 人以上の名前を 1 行に 1 つずつ入力してください。",
    es: "Introduzca al menos 2 nombres, uno por línea, para girar la ruleta.",
    pt: "Informe pelo menos 2 nomes, um por linha, para girar a roleta.",
    fr: "Entrez au moins 2 noms, un par ligne, pour faire tourner la roue.",
    de: "Gib mindestens 2 Namen ein (einer pro Zeile), um das Rad zu drehen.",
    ru: "Введите минимум 2 имени (по одному в строке), чтобы крутить колесо.",
    it: "Inserisci almeno 2 nomi, uno per riga, per girare la ruota.",
    tr: "Çarkı döndürmek için en az 2 isim girin (satır başına bir).",
    ko: "휠을 돌리려면 이름을 최소 2개 입력하세요(한 줄에 하나).",
    ar: "أدخل اسمين على الأقل، واحد في كل سطر، لتدوير العجلة.",
    hi: "पहिया घुमाने के लिए कम से कम 2 नाम दर्ज करें (प्रति पंक्ति एक)।",
    id: "Masukkan minimal 2 nama, satu per baris, untuk memutar roda.",
    vi: "Nhập ít nhất 2 tên, mỗi dòng một tên, để quay vòng.",
  },
  full: {
    en: "The wheel holds up to 100 names; extra lines are ignored.",
    zh: "转盘最多容纳 100 个名字,多出的行会被忽略。",
    ja: "ホイールは最大 100 名までです。それ以降の行は無視されます。",
    es: "La ruleta admite hasta 100 nombres; las líneas extra se ignoran.",
    pt: "A roleta aceita até 100 nomes; as linhas extras são ignoradas.",
    fr: "La roue accepte jusqu'à 100 noms ; les lignes supplémentaires sont ignorées.",
    de: "Das Rad fasst bis zu 100 Namen; zusätzliche Zeilen werden ignoriert.",
    ru: "Колесо вмещает до 100 имён; лишние строки игнорируются.",
    it: "La ruota accetta fino a 100 nomi; le righe extra vengono ignorate.",
    tr: "Çark en fazla 100 isim alır; ek satırlar yok sayılır.",
    ko: "휠에는 최대 100개의 이름까지 들어갑니다; 초과 줄은 무시됩니다.",
    ar: "تتسع العجلة حتى 100 اسم؛ وتُتجاهل الأسطر الإضافية.",
    hi: "पहिया में अधिकतम 100 नाम आते हैं; अतिरिक्त पंक्तियाँ अनदेखी होती हैं।",
    id: "Roda menampung hingga 100 nama; baris ekstra diabaikan.",
    vi: "Vòng quay chứa tối đa 100 tên; dòng thừa bị bỏ qua.",
  },
  wheel: { en: "Prize wheel", zh: "抽奖转盘", ja: "抽選ホイール", es: "Ruleta de premios", pt: "Roleta de prêmios", fr: "Roue de loterie", de: "Glücksrad", ru: "Колесо удачи", it: "Ruota della fortuna", tr: "Çarkıfelek", ko: "상품 룰렛", ar: "عجلة الجوائز", hi: "प्राइज़ व्हील", id: "Roda hadiah", vi: "Vòng quay thưởng" },
};

/** Unbiased random integer in [0, n) from crypto.getRandomValues. */
function randBelow(n: number): number {
  if (n <= 1) return 0;
  const buf = new Uint32Array(1);
  const limit = 0x100000000 - (0x100000000 % n);
  let x: number;
  do {
    crypto.getRandomValues(buf);
    x = buf[0];
  } while (x >= limit);
  return x % n;
}

/** Truncate a label so it fits the segment radius, ellipsis at the end. */
function fitLabel(ctx: CanvasRenderingContext2D, text: string, maxW: number): string {
  if (ctx.measureText(text).width <= maxW) return text;
  let t = text;
  while (t.length > 1 && ctx.measureText(`${t}…`).width > maxW) t = t.slice(0, -1);
  return `${t}…`;
}

const TAU = Math.PI * 2;

export function CalcEngineWheel() {
  const { locale, t } = useI18n();
  const [raw, setRaw] = useState("Alice\nBruno\nChen\nDiego\nAmara\nYuki");
  const [dedupe, setDedupe] = useState(true);
  const [removeWinner, setRemoveWinner] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [winnerSeq, setWinnerSeq] = useState(0);
  const [history, setHistory] = useState<{ name: string; at: string }[]>([]);
  const [, setRotTick] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotRef = useRef(0);
  const rafRef = useRef(0);

  const names = useMemo(() => {
    const list = raw.split("\n").map((s) => s.trim()).filter(Boolean);
    const uniq = dedupe ? [...new Set(list)] : list;
    return uniq.slice(0, MAX_NAMES);
  }, [raw, dedupe]);

  /** Draw the whole wheel at a given rotation for a given name list. */
  const draw = useCallback((rotation: number, list: string[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== WHEEL * dpr) {
      canvas.width = WHEEL * dpr;
      canvas.height = WHEEL * dpr;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, WHEEL, WHEEL);

    const cx = WHEEL / 2;
    const cy = WHEEL / 2;
    const R = WHEEL / 2 - 8;
    const n = list.length;

    ctx.save();
    ctx.translate(cx, cy);

    // outer ring
    ctx.beginPath();
    ctx.arc(0, 0, R + 5, 0, TAU);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "rgba(0,0,0,0.14)";
    ctx.stroke();

    if (n === 0) {
      ctx.beginPath();
      ctx.arc(0, 0, R, 0, TAU);
      ctx.fillStyle = "#f5f5f7";
      ctx.fill();
      ctx.restore();
      return;
    }

    const seg = TAU / n;
    ctx.rotate(rotation);

    for (let i = 0; i < n; i++) {
      const a0 = i * seg;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, R, a0, a0 + seg);
      ctx.closePath();
      ctx.fillStyle = SEG_COLORS[i % SEG_COLORS.length];
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.85)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // labels
    if (n <= 60) {
      const fontSize = n <= 8 ? 15 : n <= 16 ? 13 : n <= 32 ? 11 : 10;
      const maxW = R - 46;
      ctx.font = `600 ${fontSize}px ui-monospace, "SF Mono", Menlo, Consolas, monospace`;
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      for (let i = 0; i < n; i++) {
        const mid = i * seg + seg / 2;
        ctx.save();
        ctx.rotate(mid);
        ctx.fillText(fitLabel(ctx, list[i], maxW), R - 12, 0);
        ctx.restore();
      }
    }

    // hub
    ctx.rotate(-rotation);
    ctx.beginPath();
    ctx.arc(0, 0, 17, 0, TAU);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "rgba(0,0,0,0.18)";
    ctx.stroke();
    ctx.restore();

    // pointer triangle at 12 o'clock
    ctx.beginPath();
    ctx.moveTo(cx - 9, 8);
    ctx.lineTo(cx + 9, 8);
    ctx.lineTo(cx, 26);
    ctx.closePath();
    ctx.fillStyle = "#1d1d1f";
    ctx.fill();
  }, []);

  // redraw on data change
  useEffect(() => {
    draw(rotRef.current, names);
  }, [names, draw]);

  // cleanup any in-flight animation
  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const spin = () => {
    const list = names;
    const n = list.length;
    if (spinning || n < 2) return;

    // 1. draw the winner cryptographically
    const wi = randBelow(n);
    const seg = TAU / n;

    // 2. land mid-segment (20%-80% into it) so it never rests on a border
    const targetLocal = (wi + 0.2 + randBelow(61) / 100) * seg;
    const targetRot = -Math.PI / 2 - targetLocal;
    const turns = 5 + randBelow(3); // 5-7 full turns
    const delta = ((((targetRot - rotRef.current) % TAU) + TAU) % TAU) + turns * TAU;
    const duration = 2600 + randBelow(801); // 2.6-3.4 s

    const start = rotRef.current;
    const t0 = performance.now();
    setSpinning(true);
    setWinner(null);

    const step = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // cubic ease-out deceleration
      rotRef.current = start + delta * eased;
      draw(rotRef.current, list);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setRotTick((s) => s + 1);
        setSpinning(false);
        setWinner(list[wi]);
        setWinnerSeq((s) => s + 1);
        setHistory((h) =>
          [{ name: list[wi], at: new Date().toLocaleTimeString(INTL_LOCALES[locale] ?? INTL_LOCALES.en) }, ...h].slice(0, 100),
        );
        if (removeWinner) {
          setRaw((r) => {
            const lines = r.split("\n").map((s) => s.trim()).filter(Boolean);
            const uniq = dedupe ? [...new Set(lines)] : lines;
            const kept = uniq.filter((_, i) => i !== wi).slice(0, MAX_NAMES);
            return kept.join("\n");
          });
        }
      }
    };
    rafRef.current = requestAnimationFrame(step);
  };

  return (
    <ToolPanel>
      <style>{`@keyframes tb-win-pulse{0%{transform:scale(1)}35%{transform:scale(1.03)}100%{transform:scale(1)}}.tb-win-pulse{animation:tb-win-pulse .7s cubic-bezier(.2,.6,.2,1)}`}</style>
      <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
        <div className="space-y-4">
          <label className="block space-y-1.5">
            <span className="block text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, S.names)}</span>
            <textarea
              className="field mono min-h-[13rem]"
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              spellCheck={false}
              aria-label={pick(locale, S.names)}
            />
          </label>
          <p className="text-[13px] text-[var(--color-sub)]">
            {names.length >= MAX_NAMES
              ? pick(locale, S.full)
              : pick(locale, S.count).replace("{n}", String(names.length))}
          </p>
          <div className="space-y-2.5">
            <label className="flex items-center gap-2.5 text-[14px]">
              <input type="checkbox" className="accent-[var(--color-accent)]" checked={dedupe} onChange={(e) => setDedupe(e.target.checked)} />
              {pick(locale, S.dedupe)}
            </label>
            <label className="flex items-center gap-2.5 text-[14px]">
              <input type="checkbox" className="accent-[var(--color-accent)]" checked={removeWinner} onChange={(e) => setRemoveWinner(e.target.checked)} />
              {pick(locale, S.removeWinner)}
            </label>
          </div>
          {winner && (
            <div
              key={winnerSeq}
              className="tb-win-pulse rounded-2xl border hairline bg-[var(--color-surface)] px-5 py-4"
              aria-live="polite"
            >
              <div className="text-[12.5px] font-medium uppercase tracking-wide text-[var(--color-sub)]">
                {pick(locale, S.winner)}
              </div>
              <div className="mt-1 flex items-center justify-between gap-3">
                <span className="text-[20px] font-semibold leading-7">{winner}</span>
                <CopyButton value={winner} />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-4">
          <canvas
            ref={canvasRef}
            style={{ width: WHEEL, height: WHEEL }}
            className="max-w-full"
            role="img"
            aria-label={pick(locale, S.wheel)}
          />
          <button
            type="button"
            onClick={spin}
            disabled={spinning || names.length < 2}
            className="w-44 rounded-full bg-[var(--color-ink)] px-8 py-3 text-[15px] font-semibold text-white dark:bg-white dark:text-[#1d1d1f] transition-opacity hover:opacity-85 disabled:opacity-40"
          >
            {spinning ? pick(locale, S.spinning) : pick(locale, S.spin)}
          </button>
          {names.length < 2 && <p className="max-w-[19rem] text-center text-[13px] text-[var(--color-sub)]">{pick(locale, S.need2)}</p>}
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-[15px] font-semibold">{pick(locale, S.history)}</h3>
          {history.length > 0 && (
            <button
              type="button"
              onClick={() => setHistory([])}
              className="text-[13px] font-medium text-[var(--color-accent-strong)]"
            >
              {t.common.clear}
            </button>
          )}
        </div>
        {history.length === 0 ? (
          <p className="text-[13px] text-[var(--color-sub)]">{pick(locale, S.empty)}</p>
        ) : (
          <ol className="divide-y divide-[var(--color-hairline)] overflow-hidden rounded-xl border hairline">
            {history.map((h, i) => (
              <li key={`${h.at}-${i}`} className="flex items-center justify-between gap-3 px-4 py-2.5 text-[14px]">
                <span className="font-medium">{h.name}</span>
                <span className="mono text-[12.5px] text-[var(--color-sub)]">{h.at}</span>
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className="mt-4">
        <Note>
          {pick(locale, {
            en: "Winners are drawn with your browser's cryptographic random number generator (crypto.getRandomValues) using rejection sampling, so every name has exactly the same chance. The wheel animation is just theater — the result is fixed before the wheel starts and never changes mid-spin.",
            zh: "中奖者由浏览器的加密级随机数生成器(crypto.getRandomValues)以拒绝采样抽出,每个名字概率完全相同。转盘动画只是演出——结果在转动前就已确定,转动中不会改变。",
            ja: "当選者はブラウザの暗号論的乱数生成器(crypto.getRandomValues)を棄却サンプリング付きで使用し、どの名前もまったく同じ確率で選ばれます。ホイールのアニメーションは演出であり、結果は回転開始前に確定し、途中で変わることはありません。",
            es: "El ganador se elige con el generador criptográfico de tu navegador (crypto.getRandomValues) mediante muestreo por rechazo, así que todos los nombres tienen exactamente la misma probabilidad. La animación de la ruleta es solo escenografía: el resultado se fija antes de girar y no cambia durante el giro.",
            pt: "O sorteado é escolhido com o gerador criptográfico do seu navegador (crypto.getRandomValues) por amostragem por rejeição, então todos os nomes têm exatamente a mesma chance. A animação da roleta é só encenação — o resultado é definido antes de girar e não muda durante o giro.",
            fr: "Les gagnants sont tirés avec le générateur de nombres aléatoires cryptographique de votre navigateur (crypto.getRandomValues) par échantillonnage par rejet, donc chaque nom a exactement la même chance. L'animation de la roue n'est que du théâtre — le résultat est fixé avant le démarrage et ne change jamais pendant la rotation.",
            de: "Gewinner werden mit dem kryptografischen Zufallsgenerator deines Browsers (crypto.getRandomValues) per Reject-Sampling gezogen — jeder Name hat exakt dieselbe Chance. Die Radanimation ist nur Theater: Das Ergebnis steht vor dem Start fest und ändert sich nie während des Drehens.",
            ru: "Победители выбираются криптографическим генератором случайных чисел браузера (crypto.getRandomValues) методом отбрасывания, поэтому у каждого имени ровно одинаковый шанс. Анимация колеса — лишь спектакль: результат фиксируется до запуска и никогда не меняется во время вращения.",
            it: "I vincitori sono estratti con il generatore di numeri casuali crittografico del browser (crypto.getRandomValues) tramite campionamento a rifiuto, quindi ogni nome ha esattamente la stessa probabilità. L'animazione della ruota è solo teatro — il risultato è fissato prima dell'avvio e non cambia mai durante la rotazione.",
            tr: "Kazananlar, tarayıcınızın kriptografik rastgele sayı üreteciyle (crypto.getRandomValues) ret örneklemesi kullanılarak seçilir — her ismin şansı tamamen eşittir. Çark animasyonu sadece görüntüdür: sonuç çark başlamadan önce belirlenir ve dönerken asla değişmez.",
            ko: "당첨자는 브라우저의 암호학적 난수 생성기(crypto.getRandomValues)로 기각 샘플링을 거쳐 뽑히므로 모든 이름의 확률이 정확히 같습니다. 휠 애니메이션은 연출일 뿐 — 결과는 시작 전에 정해지고 회전 중에는 절대 바뀌지 않습니다.",
            ar: "يُسحب الفائزون بمولد الأرقام العشوائية التشفيري في متصفحك (crypto.getRandomValues) بأخذ العينات بالرفض، فللجميع الفرصة نفسها تمامًا. حركة العجلة مجرد استعراض — النتيجة محددة قبل بدء الدوران ولا تتغير أبدًا أثناءه.",
            hi: "विजेता आपके ब्राउज़र के क्रिप्टोग्राफ़िक यादृच्छिक संख्या जनरेटर (crypto.getRandomValues) से रिजेक्शन सैंपलिंग द्वारा चुने जाते हैं, इसलिए हर नाम की संभावना बिल्कुल समान है। पहिए का एनिमेशन केवल तमाशा है — परिणाम शुरू होने से पहले तय है और घूमते समय कभी नहीं बदलता।",
            id: "Pemenang diundi dengan generator angka acak kriptografis peramban Anda (crypto.getRandomValues) memakai rejection sampling, sehingga setiap nama berpeluang persis sama. Animasi roda hanya panggung — hasil ditetapkan sebelum roda berputar dan tak pernah berubah saat berputar.",
            vi: "Người trúng được rút bằng bộ sinh số ngẫu nhiên mật mã của trình duyệt (crypto.getRandomValues) với kỹ thuật lấy mẫu khử, nên mọi tên có xác suất như nhau tuyệt đối. Hoạt ảnh vòng quay chỉ là diễn — kết quả được cố định trước khi quay và không bao giờ đổi giữa chừng.",
          })}
        </Note>
      </div>
    </ToolPanel>
  );
}
