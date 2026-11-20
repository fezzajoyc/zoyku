import type { Locale } from "@/lib/site";

export const COPY_BUTTON_MESSAGES: Record<Locale, { failed: string; recovery: string }> = {
  en: { failed: "Copy failed", recovery: "Copy failed. Select the source text and copy it manually, or try again." },
  zh: { failed: "复制失败", recovery: "复制失败。请选中原文手动复制，或重试。" },
  ja: { failed: "コピー失敗", recovery: "コピーできません。元のテキストを選択して手動でコピーするか、再試行してください。" },
  es: { failed: "Error al copiar", recovery: "No se pudo copiar. Selecciona el texto original y cópialo manualmente, o reintenta." },
  pt: { failed: "Falha ao copiar", recovery: "Não foi possível copiar. Selecione o texto original e copie manualmente, ou tente de novo." },
  fr: { failed: "Échec de la copie", recovery: "Copie impossible. Sélectionnez le texte source et copiez-le manuellement, ou réessayez." },
  de: { failed: "Kopieren fehlgeschlagen", recovery: "Kopieren fehlgeschlagen. Markiere den Ausgangstext und kopiere ihn manuell oder versuche es erneut." },
  ru: { failed: "Не скопировано", recovery: "Не удалось скопировать. Выделите исходный текст и скопируйте его вручную или повторите попытку." },
  it: { failed: "Copia non riuscita", recovery: "Copia non riuscita. Seleziona il testo originale e copialo manualmente, oppure riprova." },
  tr: { failed: "Kopyalanamadı", recovery: "Kopyalanamadı. Kaynak metni seçip elle kopyalayın veya yeniden deneyin." },
  ko: { failed: "복사 실패", recovery: "복사하지 못했습니다. 원문을 선택해 직접 복사하거나 다시 시도하세요." },
  ar: { failed: "تعذر النسخ", recovery: "تعذر النسخ. حدّد النص الأصلي وانسخه يدوياً، أو أعد المحاولة." },
  hi: { failed: "कॉपी नहीं हुआ", recovery: "कॉपी नहीं हुआ। मूल पाठ चुनकर हाथ से कॉपी करें या फिर प्रयास करें।" },
  id: { failed: "Gagal menyalin", recovery: "Gagal menyalin. Pilih teks sumber dan salin secara manual, atau coba lagi." },
  vi: { failed: "Sao chép thất bại", recovery: "Không sao chép được. Hãy chọn văn bản gốc để sao chép thủ công hoặc thử lại." },
};
