"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { downloadBlob } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { Field, Note, Sel, pick } from "./calc-ui";
import { buildWifiPayload, type WifiSecurity } from "../_lib/wifi-qr";

/**
 * QR code generator. The `qrcode` package is imported dynamically on the
 * client; encoding runs entirely in the browser. PNG + SVG download.
 */

type Ecc = "L" | "M" | "Q" | "H";

const L_WIFI = {
  modeText: { en: "Text / URL", zh: "文本或网址", ja: "テキスト・URL", es: "Texto o URL", pt: "Texto ou URL", fr: "Texte ou URL", de: "Text oder URL", ru: "Текст или URL", it: "Testo o URL", tr: "Metin veya URL", ko: "텍스트 또는 URL", ar: "نص أو رابط", hi: "टेक्स्ट या URL", id: "Teks atau URL", vi: "Văn bản hoặc URL" },
  modeWifi: { en: "Wi-Fi network", zh: "Wi-Fi 网络", ja: "Wi-Fi ネットワーク", es: "Red Wi-Fi", pt: "Rede Wi-Fi", fr: "Réseau Wi-Fi", de: "WLAN-Netzwerk", ru: "Сеть Wi-Fi", it: "Rete Wi-Fi", tr: "Wi-Fi ağı", ko: "Wi-Fi 네트워크", ar: "شبكة Wi-Fi", hi: "Wi-Fi नेटवर्क", id: "Jaringan Wi-Fi", vi: "Mạng Wi-Fi" },
  ssid: { en: "Network name (SSID)", zh: "网络名称(SSID)", ja: "ネットワーク名(SSID)", es: "Nombre de red (SSID)", pt: "Nome da rede (SSID)", fr: "Nom du réseau (SSID)", de: "Netzwerkname (SSID)", ru: "Имя сети (SSID)", it: "Nome rete (SSID)", tr: "Ağ adı (SSID)", ko: "네트워크 이름(SSID)", ar: "اسم الشبكة (SSID)", hi: "नेटवर्क नाम (SSID)", id: "Nama jaringan (SSID)", vi: "Tên mạng (SSID)" },
  password: { en: "Password", zh: "密码", ja: "パスワード", es: "Contraseña", pt: "Senha", fr: "Mot de passe", de: "Passwort", ru: "Пароль", it: "Password", tr: "Şifre", ko: "비밀번호", ar: "كلمة المرور", hi: "पासवर्ड", id: "Kata sandi", vi: "Mật khẩu" },
  security: { en: "Security", zh: "加密方式", ja: "暗号化方式", es: "Seguridad", pt: "Segurança", fr: "Sécurité", de: "Verschlüsselung", ru: "Тип защиты", it: "Sicurezza", tr: "Güvenlik", ko: "보안 방식", ar: "نوع التشفير", hi: "सुरक्षा", id: "Keamanan", vi: "Bảo mật" },
  hidden: { en: "Hidden network", zh: "隐藏网络", ja: "隠しネットワーク", es: "Red oculta", pt: "Rede oculta", fr: "Réseau masqué", de: "Verborgenes Netzwerk", ru: "Скрытая сеть", it: "Rete nascosta", tr: "Gizli ağ", ko: "숨김 네트워크", ar: "شبكة مخفية", hi: "छिपा नेटवर्क", id: "Jaringan tersembunyi", vi: "Mạng ẩn" },
  errSsid: { en: "Enter the network name (SSID).", zh: "请输入网络名称(SSID)。", ja: "ネットワーク名(SSID)を入力してください。", es: "Introduce el nombre de red (SSID).", pt: "Informe o nome da rede (SSID).", fr: "Saisissez le nom du réseau (SSID).", de: "Netzwerknamen (SSID) eingeben.", ru: "Введите имя сети (SSID).", it: "Inserisci il nome della rete (SSID).", tr: "Ağ adını (SSID) girin.", ko: "네트워크 이름(SSID)을 입력하세요.", ar: "أدخل اسم الشبكة (SSID).", hi: "नेटवर्क नाम (SSID) दर्ज करें।", id: "Masukkan nama jaringan (SSID).", vi: "Nhập tên mạng (SSID)." },
  errPass: { en: "WPA/WEP networks need a password.", zh: "WPA/WEP 网络需要密码。", ja: "WPA/WEP ネットワークにはパスワードが必要です。", es: "Las redes WPA/WEP necesitan contraseña.", pt: "Redes WPA/WEP precisam de senha.", fr: "Les réseaux WPA/WEP exigent un mot de passe.", de: "WPA/WEP-Netzwerke benötigen ein Passwort.", ru: "Для сетей WPA/WEP нужен пароль.", it: "Le reti WPA/WEP richiedono una password.", tr: "WPA/WEP ağları şifre gerektirir.", ko: "WPA/WEP 네트워크에는 비밀번호가 필요합니다.", ar: "شبكات WPA/WEP تتطلب كلمة مرور.", hi: "WPA/WEP नेटवर्क को पासवर्ड चाहिए।", id: "Jaringan WPA/WEP memerlukan kata sandi.", vi: "Mạng WPA/WEP cần mật khẩu." },
  payloadNote: { en: "Encoded payload", zh: "二维码内容", ja: "QR ペイロード", es: "Contenido del código", pt: "Conteúdo do código", fr: "Contenu du code", de: "QR-Inhalt", ru: "Содержимое кода", it: "Contenuto del codice", tr: "QR içeriği", ko: "QR 내용", ar: "محتوى الرمز", hi: "QR सामग्री", id: "Isi kode", vi: "Nội dung mã" },
} as const;

export function CalcEngineQr() {
  const { locale, t } = useI18n();
  const [text, setText] = useState("https://");
  const [mode, setMode] = useState<"text" | "wifi">("text");
  const [ssid, setSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiSecurity, setWifiSecurity] = useState<WifiSecurity>("WPA");
  const [wifiHidden, setWifiHidden] = useState(false);
  const wifiPayload = buildWifiPayload({ ssid, password: wifiPassword, security: wifiSecurity, hidden: wifiHidden });
  const wifiError = wifiPayload.ok ? "" : pick(locale, wifiPayload.code === "emptySsid" ? L_WIFI.errSsid : L_WIFI.errPass);
  // Wi-Fi 模式:载荷合法才进入编码;文本模式沿用原输入
  const qrText = mode === "wifi" ? (wifiPayload.ok ? wifiPayload.payload : "") : text;
  const wifiNote = mode === "wifi" && wifiPayload.ok ? wifiPayload.payload : "";
  const [size, setSize] = useState(320);
  const [ecc, setEcc] = useState<Ecc>("M");
  const [dark, setDark] = useState("#1d1d1f");
  const [light, setLight] = useState("#ffffff");
  const [logo, setLogo] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!canvasRef.current) return;
      if (!qrText.trim()) {
        const ctx = canvasRef.current.getContext("2d");
        ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        setReady(false);
        return;
      }
      try {
        const QR = (await import("qrcode")).default;
        await QR.toCanvas(canvasRef.current, qrText, {
          width: size,
          margin: 2,
          errorCorrectionLevel: ecc,
          color: { dark, light },
        });
        // LOGO 叠加:中心留白由 EC 纠错冗余兜底(H=30% 冗余最稳);占码面 ≤12%,圆角白底保对比
        if (logo) {
          const ctx = canvasRef.current.getContext("2d");
          if (ctx) {
            const img = new Image();
            await new Promise<void>((res, rej) => {
              img.onload = () => res();
              img.onerror = () => rej(new Error("logo load failed"));
              img.src = logo;
            });
            const logoSide = Math.round(size * 0.22);
            const pad = Math.round(logoSide * 0.12);
            const box = logoSide + pad * 2;
            const x = (size - box) / 2;
            const y = (size - box) / 2;
            ctx.fillStyle = light;
            ctx.beginPath();
            const radius = Math.round(box * 0.18);
            ctx.roundRect(x, y, box, box, radius);
            ctx.fill();
            ctx.drawImage(img, x + pad, y + pad, logoSide, logoSide);
          }
        }
        if (alive) setReady(true);
      } catch {
        if (alive) setReady(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [qrText, size, ecc, dark, light, logo, mode, ssid, wifiPassword, wifiSecurity, wifiHidden]);

  const downloadPng = async () => {
    if (!canvasRef.current || !ready) return;
    canvasRef.current.toBlob((blob) => {
      if (blob) downloadBlob(blob, "qr-code.png");
    }, "image/png");
  };

  const downloadSvg = async () => {
    if (!qrText.trim()) return;
    const QR = (await import("qrcode")).default;
    let svg = await QR.toString(qrText, {
      type: "svg",
      width: size,
      margin: 2,
      errorCorrectionLevel: ecc,
      color: { dark, light },
    });
    // LOGO 同步进 SVG:与 PNG 相同的 22% 面积 + 圆角白底,内嵌 base64 image
    if (logo) {
      const logoSide = size * 0.22;
      const pad = logoSide * 0.12;
      const box = logoSide + pad * 2;
      const x = (size - box) / 2;
      const y = (size - box) / 2;
      const radius = box * 0.18;
      const bg = `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${box.toFixed(2)}" height="${box.toFixed(2)}" rx="${radius.toFixed(2)}" fill="${light}"/>`;
      const img = `<image x="${(x + pad).toFixed(2)}" y="${(y + pad).toFixed(2)}" width="${logoSide.toFixed(2)}" height="${logoSide.toFixed(2)}" href="${logo}"/>`;
      // 注入到 </svg> 前(需在默认命名空间下可用 image/xlink;qrcode 4.x 输出 xmlns 已含 svg 命名空间)
      svg = svg.replace("</svg>", `${bg}${img}</svg>`);
    }
    downloadBlob(new Blob([svg], { type: "image/svg+xml" }), "qr-code.svg");
  };

  return (
    <ToolPanel>
      <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2" role="group">
            {(["text", "wifi"] as const).map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={mode === m}
                onClick={() => setMode(m)}
                className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                  mode === m
                    ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                    : "hairline hover:bg-[var(--color-surface)]"
                }`}
              >
                {pick(locale, m === "text" ? L_WIFI.modeText : L_WIFI.modeWifi)}
              </button>
            ))}
          </div>
          {mode === "text" && (
          <Field label={pick(locale, { en: "Text or URL", zh: "文本或网址", ja: "テキストまたは URL", es: "Texto o URL", pt: "Texto ou URL", fr: "Texte ou URL", de: "Text oder URL", ru: "Текст или URL", it: "Testo o URL", tr: "Metin veya URL", ko: "텍스트 또는 URL", ar: "نص أو رابط", hi: "टेक्स्ट या URL", id: "Teks atau URL", vi: "Văn bản hoặc URL" })}>
            <textarea
              className="field mono"
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="https://example.com"
              aria-label={pick(locale, { en: "Text or URL", zh: "文本或网址", ja: "テキストまたは URL", es: "Texto o URL", pt: "Texto ou URL", fr: "Texte ou URL", de: "Text oder URL", ru: "Текст или URL", it: "Testo o URL", tr: "Metin veya URL", ko: "텍스트 또는 URL", ar: "نص أو رابط", hi: "टेक्स्ट या URL", id: "Teks atau URL", vi: "Văn bản hoặc URL" })}
              spellCheck={false}
            />
          </Field>
          )}
          {mode === "wifi" && (
            <div className="space-y-3">
              <Field label={pick(locale, L_WIFI.ssid)}>
                <input
                  type="text"
                  className="field"
                  value={ssid}
                  onChange={(e) => setSsid(e.target.value)}
                  placeholder="MyHomeWiFi"
                  aria-label={pick(locale, L_WIFI.ssid)}
                />
              </Field>
              {wifiSecurity !== "nopass" && (
                <Field label={pick(locale, L_WIFI.password)}>
                  <input
                    type="text"
                    className="field mono"
                    value={wifiPassword}
                    onChange={(e) => setWifiPassword(e.target.value)}
                    aria-label={pick(locale, L_WIFI.password)}
                  />
                </Field>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={pick(locale, L_WIFI.security)}>
                  <Sel value={wifiSecurity} onChange={(v) => setWifiSecurity(v as WifiSecurity)} aria="wifi security">
                    <option value="WPA">WPA / WPA2 / WPA3</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">{pick(locale, { en: "Open (no password)", zh: "开放(无密码)", ja: "オープン(パスワードなし)", es: "Abierta (sin contraseña)", pt: "Aberta (sem senha)", fr: "Ouverte (sans mot de passe)", de: "Offen (ohne Passwort)", ru: "Открытая (без пароля)", it: "Aperta (senza password)", tr: "Açık (şifresiz)", ko: "개방(비밀번호 없음)", ar: "مفتوحة (بدون كلمة مرور)", hi: "खुला (पासवर्ड नहीं)", id: "Terbuka (tanpa sandi)", vi: "Mở (không mật khẩu)" })}</option>
                  </Sel>
                </Field>
                <Field label={pick(locale, L_WIFI.hidden)}>
                  <label className="flex h-10 items-center gap-2 text-[13.5px]">
                    <input
                      type="checkbox"
                      checked={wifiHidden}
                      onChange={(e) => setWifiHidden(e.target.checked)}
                      className="h-4 w-4"
                      aria-label={pick(locale, L_WIFI.hidden)}
                    />
                    {pick(locale, L_WIFI.hidden)}
                  </label>
                </Field>
              </div>
              {wifiError ? (
                <p className="rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]" role="alert">
                  {wifiError}
                </p>
              ) : (
                <p className="mono rounded-xl bg-[var(--color-surface)] px-3.5 py-2.5 text-[12.5px] leading-5 text-[var(--color-sub)]" aria-label={pick(locale, L_WIFI.payloadNote)}>
                  {wifiNote}
                </p>
              )}
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={pick(locale, { en: "Error correction", zh: "纠错级别", ja: "誤り訂正レベル", es: "Corrección de errores", pt: "Correção de erros", fr: "Correction d'erreur", de: "Fehlerkorrektur", ru: "Коррекция ошибок", it: "Correzione errori", tr: "Hata düzeltme", ko: "오류 복구", ar: "تصحيح الأخطاء", hi: "त्रुटि सुधार", id: "Koreksi kesalahan", vi: "Sửa lỗi" })}>
              <Sel value={ecc} onChange={(v) => setEcc(v as Ecc)} aria="error correction level">
                <option value="L">L · 7%</option>
                <option value="M">M · 15%</option>
                <option value="Q">Q · 25%</option>
                <option value="H">H · 30%</option>
              </Sel>
            </Field>
            <Field label={pick(locale, { en: "Colors (code / background)", zh: "颜色(码 / 背景)", ja: "色(コード / 背景)", es: "Colores (código / fondo)", pt: "Cores (código / fundo)", fr: "Couleurs (code / fond)", de: "Farben (Code / Hintergrund)", ru: "Цвета (код / фон)", it: "Colori (codice / sfondo)", tr: "Renkler (kod / arka plan)", ko: "색상 (코드 / 배경)", ar: "الألوان (الرمز / الخلفية)", hi: "रंग (कोड / पृष्ठभूमि)", id: "Warna (kode / latar)", vi: "Màu sắc (mã / nền)" })}>
              <div className="flex items-center gap-2">
                <input type="color" className="h-10 w-14 cursor-pointer rounded-lg border hairline bg-[var(--color-card)]" value={dark} onChange={(e) => setDark(e.target.value)} aria-label="code color" />
                <input type="color" className="h-10 w-14 cursor-pointer rounded-lg border hairline bg-[var(--color-card)]" value={light} onChange={(e) => setLight(e.target.value)} aria-label="background color" />
              </div>
            </Field>
          </div>
          <Field label={pick(locale, { en: "Logo (optional, center)", zh: "中心 LOGO(可选)", ja: "ロゴ(任意・中央)", es: "Logotipo (opcional, centro)", pt: "Logotipo (opcional, centro)", fr: "Logo (facultatif, centre)", de: "Logo (optional, Mitte)", ru: "Логотип (необяз., центр)", it: "Logo (facoltativo, centro)", tr: "Logo (isteğe bağlı, orta)", ko: "로고(선택, 중앙)", ar: "الشعار (اختياري، الوسط)", hi: "लोगो (वैकल्पिक, केंद्र)", id: "Logo (opsional, tengah)", vi: "Logo (không bắt buộc, giữa)" })}>
            <div className="flex items-center gap-2.5">
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                className="text-[13px]"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) { setLogo(null); return; }
                  const reader = new FileReader();
                  reader.onload = () => setLogo(String(reader.result));
                  reader.readAsDataURL(f);
                }}
                aria-label="logo file"
              />
              {logo && (
                <button
                  type="button"
                  onClick={() => setLogo(null)}
                  className="rounded-full border hairline px-3 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
                >
                  × {t.common.clear}
                </button>
              )}
            </div>
            <p className="mt-1.5 text-[12.5px] leading-5 text-[var(--color-sub)]">
              {pick(locale, {
                en: "Best with error correction H — the code hides the logo from its redundant modules. Keep the logo under ~25% of the code area.",
                zh: "建议搭配纠错级别 H——码点会从冗余模块里“让出”LOGO 位置,LOGO 面积控制在码面 25% 以内。",
                ja: "誤り訂正レベル H との併用が最適です。冗余モジュールがロゴ分を吸収します。ロゴはコード面積の 25% 以内に。",
                es: "Mejor con corrección H: los módulos redundantes dejan espacio al logo. Mantén el logo bajo ~25% del área del código.",
                pt: "Melhor com correção H: os módulos redundantes abrem espaço ao logo. Mantenha o logo abaixo de ~25% da área do código.",
                fr: "Idéal avec la correction H : les modules redondants laissent la place au logo. Gardez le logo sous ~25 % de la zone du code.",
                de: "Am besten mit Korrektur H: Die redundanten Module machen Platz für das Logo. Logo unter ~25 % der Codefläche halten.",
                ru: "Лучше всего с коррекцией H: избыточные модули освобождают место под логотип. Держите логотип в пределах ~25% площади кода.",
                it: "Meglio con correzione H: i moduli ridondanti lasciano spazio al logo. Tieni il logo sotto il ~25% dell'area del codice.",
                tr: "H düzeltme ile en iyi sonuç: yedek modüller logoya yer açar. Logoyu kod alanının ~%25'inin altında tutun.",
                ko: "오류 복구 H와 함께 쓰는 것이 좋습니다 — 여분 모듈이 로고 자리를 흡수합니다. 로고는 코드 면적의 25% 이내로.",
                ar: "الأفضل مع تصحيح H: الوحدات الزائدة تترك مكانًا للشعار. حافظ على الشعار أقل من ~25% من مساحة الرمز.",
                hi: "सुधार H के साथ सबसे अच्छा — अतिरिक्त मॉड्यूल लोगो की जगह बनाते हैं। लोगो को कोड क्षेत्र के ~25% से नीचे रखें।",
                id: "Paling baik dengan koreksi H — modul redundan memberi ruang bagi logo. Jaga logo di bawah ~25% area kode.",
                vi: "Nên dùng kèm sửa lỗi H — các mô-đun dự phòng chừa chỗ cho logo. Giữ logo dưới ~25% diện tích mã.",
              })}
            </p>
          </Field>
          <Field label={`${pick(locale, { en: "Size", zh: "尺寸", ja: "サイズ", es: "Tamaño", pt: "Tamanho", fr: "Taille", de: "Größe", ru: "Размер", it: "Dimensione", tr: "Boyut", ko: "크기", ar: "الحجم", hi: "आकार", id: "Ukuran", vi: "Kích thước" })} (${size} px)`}>
            <input type="range" min={128} max={768} step={16} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full" aria-label="qr size" />
          </Field>
        </div>

        <div className="flex flex-col items-center justify-start gap-3">
          <div className="rounded-2xl border hairline p-3">
            <canvas ref={canvasRef} width={size} height={size} aria-label="QR code preview" />
          </div>
          <div className="flex flex-wrap justify-center gap-2.5">
            <button
              type="button"
              disabled={!ready}
              onClick={downloadPng}
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white dark:bg-white dark:text-[#1d1d1f] transition-opacity disabled:opacity-40"
            >
              {t.common.download} PNG
            </button>
            <button
              type="button"
              disabled={!ready}
              onClick={downloadSvg}
              className="inline-flex items-center gap-1.5 rounded-full border hairline px-4 py-2 text-[13.5px] font-medium transition-colors hover:bg-[var(--color-surface)] disabled:opacity-40"
            >
              {t.common.download} SVG
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Note>
          {pick(locale, {
            en: "Encoding happens in your browser via the qrcode library — the image is never uploaded. Higher error-correction levels keep codes scannable even when partially covered or printed small.",
            zh: "二维码由浏览器内的 qrcode 库生成,图片不会上传。纠错级别越高,二维码被遮挡一部分或印得很小时仍可扫出。",
            ja: "QR コードはブラウザ内の qrcode ライブラリで生成され、画像はアップロードされません。誤り訂正レベルを上げると、一部が隠れても小さく印刷しても読み取れます。",
            es: "La codificación ocurre en su navegador con la librería qrcode: la imagen nunca se sube. Niveles de corrección más altos permiten escanear códigos parcialmente cubiertos o impresos pequeños.",
            pt: "A codificação acontece no seu navegador com a biblioteca qrcode — a imagem nunca é enviada. Níveis maiores de correção mantêm o código legível mesmo parcialmente coberto ou impresso pequeno.",
            fr: "L'encodage se fait dans votre navigateur via la bibliothèque qrcode — l'image n'est jamais téléversée. Des niveaux de correction d'erreur plus élevés gardent les codes lisibles même partiellement couverts ou imprimés petit.",
            de: "Die Kodierung erfolgt im Browser über die qrcode-Bibliothek — das Bild wird nie hochgeladen. Höhere Fehlerkorrekturstufen halten Codes lesbar, selbst wenn sie teilweise verdeckt oder klein gedruckt sind.",
            ru: "Кодирование происходит в браузере через библиотеку qrcode — изображение никогда не загружается. Более высокие уровни коррекции ошибок сохраняют читаемость кода даже при частичном перекрытии или мелкой печати.",
            it: "La codifica avviene nel browser tramite la libreria qrcode — l'immagine non viene mai caricata. Livelli di correzione errori più alti mantengono i codici leggibili anche parzialmente coperti o stampati piccoli.",
            tr: "Kodlama tarayıcınızda qrcode kitaplığıyla yapılır — görüntü asla yüklenmez. Daha yüksek hata düzeltme düzeyleri, kodları kısmen kaplıyken veya küçük basıldığında bile okunur tutar.",
            ko: "인코딩은 브라우저에서 qrcode 라이브러리로 이루어집니다 — 이미지는 절대 업로드되지 않습니다. 높은 오류 복구 수준은 코드가 일부 가려지거나 작게 인쇄돼도 판독 가능하게 유지합니다.",
            ar: "يتم الترميز في متصفحك عبر مكتبة qrcode — لا تُرفع الصورة أبدًا. مستويات تصحيح الأخطاء الأعلى تُبقي الشيفرة قابلة للمسح حتى عند تغطيتها جزئيًا أو طباعتها صغيرة.",
            hi: "एनकोडिंग आपके ब्राउज़र में qrcode लाइब्रेरी से होती है — इमेज कभी अपलोड नहीं होती। उच्च त्रुटि-सुधार स्तर आंशिक ढके या छोटे छपे कोड को भी स्कैन योग्य रखते हैं।",
            id: "Enkode terjadi di peramban Anda lewat pustaka qrcode — gambar tidak pernah diunggah. Tingkat koreksi kesalahan lebih tinggi menjaga kode tetap terbaca meski sebagian tertutup atau dicetak kecil.",
            vi: "Việc mã hóa diễn ra trong trình duyệt qua thư viện qrcode — ảnh không bao giờ được tải lên. Mức sửa lỗi cao giữ mã quét được ngay cả khi bị che một phần hoặc in nhỏ.",
          })}
        </Note>
      </div>
    </ToolPanel>
  );
}
