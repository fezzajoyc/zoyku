"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import type { Locale } from "@/lib/site";
import { calculateCrc16Modbus } from "@/tools/_lib/crc16-modbus";
import { formatCrc16ModbusError } from "@/tools/_lib/crc16-copy";

type Label = Record<Locale, string>;

export const CRC16_UI_LABELS: Record<"sample" | "input" | "hint" | "crc" | "wire" | "lowFirst" | "bytes" | "clear" | "error", Label> = {
  sample: { en: "Use reference sample", zh: "填入标准样例", ja: "基準サンプルを入力", es: "Usar muestra", pt: "Usar amostra", fr: "Utiliser l’exemple", de: "Referenzbeispiel einsetzen", ru: "Вставить пример", it: "Usa esempio", tr: "Örnek veriyi kullan", ko: "기준 샘플 입력", ar: "استخدام العينة المرجعية", hi: "संदर्भ नमूना भरें", id: "Gunakan contoh", vi: "Dùng mẫu chuẩn" },
  input: { en: "Hex bytes", zh: "十六进制字节", ja: "16進バイト", es: "Bytes hex", pt: "Bytes hex", fr: "Octets hexadécimaux", de: "Hex-Bytes", ru: "Шестнадцатеричные байты", it: "Byte esadecimali", tr: "Onaltılık baytlar", ko: "16진수 바이트", ar: "بايتات سداسية عشرية", hi: "हेक्स बाइट", id: "Byte heksadesimal", vi: "Byte thập lục phân" },
  hint: { en: "Enter bytes such as 01 03 00 00 00 0A. Whitespace is ignored.", zh: "输入如 01 03 00 00 00 0A 的字节，空白会忽略。", ja: "01 03 00 00 00 0A のように入力。空白は無視されます。", es: "Escribe bytes como 01 03 00 00 00 0A. Los espacios se ignoran.", pt: "Digite bytes como 01 03 00 00 00 0A. Os espaços são ignorados.", fr: "Saisissez des octets comme 01 03 00 00 00 0A. Les espaces sont ignorés.", de: "Geben Sie Bytes wie 01 03 00 00 00 0A ein. Leerraum wird ignoriert.", ru: "Введите байты, например 01 03 00 00 00 0A. Пробелы игнорируются.", it: "Inserisci byte come 01 03 00 00 00 0A. Gli spazi vengono ignorati.", tr: "01 03 00 00 00 0A gibi baytlar girin. Boşluklar yok sayılır.", ko: "01 03 00 00 00 0A처럼 입력하세요. 공백은 무시됩니다.", ar: "أدخل بايتات مثل 01 03 00 00 00 0A. تُتجاهل المسافات.", hi: "01 03 00 00 00 0A जैसे बाइट दर्ज करें। स्पेस अनदेखे हैं।", id: "Masukkan byte seperti 01 03 00 00 00 0A. Spasi diabaikan.", vi: "Nhập byte như 01 03 00 00 00 0A. Khoảng trắng được bỏ qua." },
  crc: { en: "CRC value (hex)", zh: "CRC 数值（十六进制）", ja: "CRC 値（16進）", es: "Valor CRC (hex)", pt: "Valor CRC (hex)", fr: "Valeur CRC (hex)", de: "CRC-Wert (Hex)", ru: "Значение CRC (hex)", it: "Valore CRC (hex)", tr: "CRC değeri (hex)", ko: "CRC 값(16진수)", ar: "قيمة CRC (سداسي عشري)", hi: "CRC मान (हेक्स)", id: "Nilai CRC (hex)", vi: "Giá trị CRC (hex)" },
  wire: { en: "Modbus wire bytes", zh: "Modbus 报文字节", ja: "Modbus 送信バイト", es: "Bytes de trama Modbus", pt: "Bytes de trama Modbus", fr: "Octets transmis Modbus", de: "Modbus-Leitungsbytes", ru: "Байты Modbus на линии", it: "Byte Modbus trasmessi", tr: "Modbus hat baytları", ko: "Modbus 전송 바이트", ar: "بايتات Modbus المرسلة", hi: "Modbus वायर बाइट", id: "Byte kabel Modbus", vi: "Byte truyền Modbus" },
  lowFirst: { en: "Low byte first", zh: "低字节在前", ja: "下位バイト先行", es: "Byte bajo primero", pt: "Byte baixo primeiro", fr: "Octet bas en premier", de: "Niederwertiges Byte zuerst", ru: "Сначала младший байт", it: "Byte basso per primo", tr: "Düşük bayt önce", ko: "하위 바이트 먼저", ar: "البايت الأقل أولاً", hi: "कम बाइट पहले", id: "Byte rendah lebih dulu", vi: "Byte thấp trước" },
  bytes: { en: "bytes", zh: "字节", ja: "バイト", es: "bytes", pt: "bytes", fr: "octets", de: "Bytes", ru: "байт", it: "byte", tr: "bayt", ko: "바이트", ar: "بايت", hi: "बाइट", id: "byte", vi: "byte" },
  clear: { en: "Clear", zh: "清空", ja: "クリア", es: "Limpiar", pt: "Limpar", fr: "Effacer", de: "Leeren", ru: "Очистить", it: "Cancella", tr: "Temizle", ko: "지우기", ar: "مسح", hi: "साफ़ करें", id: "Hapus", vi: "Xóa" },
  error: { en: "Input error", zh: "输入错误", ja: "入力エラー", es: "Error de entrada", pt: "Erro de entrada", fr: "Erreur de saisie", de: "Eingabefehler", ru: "Ошибка ввода", it: "Errore di input", tr: "Girdi hatası", ko: "입력 오류", ar: "خطأ في الإدخال", hi: "इनपुट त्रुटि", id: "Kesalahan input", vi: "Lỗi nhập liệu" },
};

const pick = (label: Label, locale: string) => label[locale as Locale] ?? label.en;

export function DevCrc16ModbusEngine() {
  const { locale } = useI18n();
  const [input, setInput] = useState("01 03 00 00 00 0A");
  const result = useMemo(() => {
    try {
      return { value: calculateCrc16Modbus(input), error: "" };
    } catch (error) {
      return { value: null, error };
    }
  }, [input]);

  return (
    <ToolPanel>
      <div className="space-y-4" data-crc16-modbus-tool>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[13px] leading-5 text-[var(--color-sub)]">{pick(CRC16_UI_LABELS.hint, locale)}</p>
          <button type="button" className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium hover:bg-[var(--color-surface)]" onClick={() => setInput("01 03 00 00 00 0A")}>
            {pick(CRC16_UI_LABELS.sample, locale)}
          </button>
        </div>
        <label className="grid gap-1.5 text-[13px] font-medium">
          <span>{pick(CRC16_UI_LABELS.input, locale)}</span>
          <textarea className="field mono" rows={5} value={input} onChange={(event) => setInput(event.target.value)} aria-invalid={Boolean(result.error)} aria-describedby={result.error ? "crc16-error" : undefined} spellCheck={false} />
        </label>
        {result.error ? (
          <p id="crc16-error" role="alert" className="error-bg rounded-xl px-3 py-2 text-[13px] leading-5">{pick(CRC16_UI_LABELS.error, locale)}: {formatCrc16ModbusError(result.error, locale)}</p>
        ) : result.value ? (
          <div className="grid gap-3 sm:grid-cols-2" aria-live="polite">
            <div className="rounded-xl bg-[var(--color-surface)] p-3">
              <p className="mb-1 text-[12px] text-[var(--color-sub)]">{pick(CRC16_UI_LABELS.crc, locale)}</p>
              <p className="mono break-all text-[18px] font-semibold">{result.value.crcHex}</p>
              <p className="mt-1 text-[12px] text-[var(--color-sub)]">{result.value.byteLength} {pick(CRC16_UI_LABELS.bytes, locale)}</p>
              <CopyButton value={result.value.crcHex} />
            </div>
            <div className="rounded-xl bg-[var(--color-surface)] p-3">
              <p className="mb-1 text-[12px] text-[var(--color-sub)]">{pick(CRC16_UI_LABELS.wire, locale)}</p>
              <p className="mono break-all text-[18px] font-semibold">{result.value.wireHex}</p>
              <p className="mt-1 text-[12px] text-[var(--color-sub)]">{pick(CRC16_UI_LABELS.lowFirst, locale)}</p>
              <CopyButton value={result.value.wireHex} />
            </div>
          </div>
        ) : null}
        <div className="flex flex-wrap gap-2.5">
          <button type="button" className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium hover:bg-[var(--color-surface)]" onClick={() => setInput("")}>{pick(CRC16_UI_LABELS.clear, locale)}</button>
        </div>
      </div>
    </ToolPanel>
  );
}
