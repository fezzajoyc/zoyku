"use client";

import { useCallback, useEffect, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { Note, Sel, pick } from "./calc-ui";

/**
 * Bulk UUID v4 generator. Uses crypto.randomUUID with a manual
 * crypto.getRandomValues fallback; everything is local, nothing is stored.
 */

function uuid4(): string {
  const c = globalThis.crypto as Crypto | undefined;
  if (c && typeof c.randomUUID === "function") return c.randomUUID();
  if (c && typeof c.getRandomValues === "function") {
    const b = new Uint8Array(16);
    c.getRandomValues(b);
    b[6] = (b[6] & 0x0f) | 0x40; // version 4
    b[8] = (b[8] & 0x3f) | 0x80; // RFC 4122 variant
    const h = Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
    return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
  }
  // last resort (non-secure contexts without WebCrypto): Math.random-based v4
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (s) => {
    const v = Number(s);
    return (v ^ (Math.floor(Math.random() * 256) & (15 >> (v / 4)))).toString(16);
  });
}

const COUNTS = [5, 10, 25, 50];

export function CalcEngineUuid() {
  const { locale } = useI18n();
  const [count, setCount] = useState(10);
  const [ids, setIds] = useState<string[]>([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setIds(Array.from({ length: count }, () => uuid4()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, tick]);

  const regenerate = useCallback(() => setTick((t) => t + 1), []);

  return (
    <ToolPanel>
      <div className="flex flex-wrap items-end gap-3">
        <div className="w-40">
          <Sel value={String(count)} onChange={(v) => setCount(Number(v))} aria="number of uuids">
            {COUNTS.map((n) => (
              <option key={n} value={n}>
                {n} UUID{n > 1 && locale !== "zh" ? "s" : ""}
              </option>
            ))}
          </Sel>
        </div>
        <button
          type="button"
          onClick={regenerate}
          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white dark:bg-white dark:text-[#1d1d1f] transition-opacity hover:opacity-90"
        >
          {pick(locale, { en: "Generate", zh: "重新生成", ja: "生成", es: "Generar", pt: "Gerar", fr: "Générer", de: "Generieren", ru: "Сгенерировать", it: "Genera", tr: "Üret", ko: "생성", ar: "توليد", hi: "जेनरेट करें", id: "Hasilkan", vi: "Tạo" })}
        </button>
        <CopyButton value={() => ids.join("\n")} label={pick(locale, { en: "Copy all", zh: "复制全部", ja: "すべてコピー", es: "Copiar todo", pt: "Copiar tudo", fr: "Tout copier", de: "Alle kopieren", ru: "Копировать всё", it: "Copia tutto", tr: "Tümünü kopyala", ko: "모두 복사", ar: "نسخ الكل", hi: "सभी कॉपी करें", id: "Salin semua", vi: "Sao chép tất cả" })} />
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border hairline">
        <ul className="divide-y" style={{ borderColor: "var(--color-hairline)" }}>
          {ids.map((id, i) => (
            <li key={`${tick}-${i}`} className="flex items-center justify-between gap-3 px-3.5 py-2.5">
              <code className="mono min-w-0 flex-1 truncate text-[14px]">{id}</code>
              <CopyButton value={id} label={pick(locale, { en: "Copy", zh: "复制", ja: "コピー", es: "Copiar", pt: "Copiar", fr: "Copier", de: "Kopieren", ru: "Копировать", it: "Copia", tr: "Kopyala", ko: "복사", ar: "نسخ", hi: "कॉपी करें", id: "Salin", vi: "Sao chép" })} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <Note>
          {pick(locale, {
            en: "These are RFC 4122 version 4 UUIDs: 122 random bits from your device's cryptographic random source. If you need time-ordered identifiers, look for the newer v7 variant — same shape, sortable by creation time.",
            zh: "这里生成的是 RFC 4122 版本 4 UUID:122 位随机位来自设备的加密随机源。如需按时间排序的标识符,请了解较新的 v7 变体——格式相同,但按创建时间有序。",
            ja: "生成されるのは RFC 4122 バージョン 4 の UUID です。122 ビットのランダム値をデバイスの暗号学的乱数源から取得します。時刻順に並ぶ識別子が必要な場合は、新しい v7 を検討してください。同じ形式で作成時刻順にソートできます。",
            es: "Son UUID versión 4 de RFC 4122: 122 bits aleatorios de la fuente criptográfica de tu dispositivo. Si necesita identificadores ordenados por tiempo, busque la variante v7: misma forma, ordenable por creación.",
            pt: "São UUIDs versão 4 (RFC 4122): 122 bits aleatórios da fonte criptográfica do seu dispositivo. Se precisar de identificadores ordenados por tempo, procure a variante v7 — mesma forma, ordenável por criação.",
            fr: "Ce sont des UUID RFC 4122 version 4 : 122 bits aléatoires issus de la source cryptographique de votre appareil. Pour des identifiants triés par temps, regardez la variante v7 plus récente — même forme, triable par date de création.",
            de: "Dies sind UUIDs nach RFC 4122 Version 4: 122 Zufallsbits aus der kryptografischen Quelle deines Geräts. Für zeitgeordnete Kennungen sieh dir die neuere Variante v7 an — gleiche Form, nach Erstellungszeit sortierbar.",
            ru: "Это UUID версии 4 по RFC 4122: 122 случайных бита из криптографического источника вашего устройства. Если нужны упорядоченные по времени идентификаторы, посмотрите более новую версию v7 — тот же формат, сортируется по времени создания.",
            it: "Questi sono UUID RFC 4122 versione 4: 122 bit casuali dalla sorgente crittografica del tuo dispositivo. Per identificatori ordinati nel tempo, guarda la variante v7 più recente — stessa forma, ordinabile per data di creazione.",
            tr: "Bunlar RFC 4122 sürüm 4 UUID'leridir: cihazınızın kriptografik rastgele kaynağından 122 rastgele bit. Zamana göre sıralı tanımlayıcılar gerekiyorsa daha yeni v7 varyantına bakın — aynı biçim, oluşturma zamanına göre sıralanabilir.",
            ko: "이것들은 RFC 4122 버전 4 UUID입니다: 기기의 암호학적 난수원에서 나온 122비트입니다. 시간 순 정렬 식별자가 필요하면 더 최신인 v7을 보세요 — 같은 형태, 생성 시각으로 정렬 가능합니다.",
            ar: "هذه معرفات UUID الإصدار 4 وفق RFC 4122: 122 بت عشوائية من مصدر التشفير في جهازك. إن احتجت معرفات مرتبة زمنيًا فابحث عن الإصدار الأحدث v7 — الشكل نفسه وقابل للترتيب حسب وقت الإنشاء.",
            hi: "ये RFC 4122 संस्करण 4 UUID हैं: आपके डिवाइस के क्रिप्टोग्राफ़िक यादृच्छिक स्रोत से 122 यादृच्छिक बिट। समय-क्रमित पहचानकर्ताओं के लिए नए v7 वेरिएंट को देखें — वही रूप, निर्माण समय से क्रमित।",
            id: "Ini adalah UUID RFC 4122 versi 4: 122 bit acak dari sumber acak kriptografis perangkat Anda. Butuh pengenal terurut waktu? Lihat varian v7 yang lebih baru — bentuk sama, dapat diurutkan berdasarkan waktu pembuatan.",
            vi: "Đây là UUID phiên bản 4 theo RFC 4122: 122 bit ngẫu nhiên từ nguồn ngẫu nhiên mật mã của thiết bị. Cần định danh có thứ tự thời gian thì xem biến thể v7 mới hơn — cùng dạng, sắp được theo thời gian tạo.",
          })}
        </Note>
      </div>
    </ToolPanel>
  );
}
