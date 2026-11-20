/** The OCR script is shared by the image and PDF tools and loaded only on use. */
const TESSERACT_CDN = "https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js";
let pending: Promise<Record<string, unknown>> | null = null;

export function loadTesseract(): Promise<Record<string, unknown>> {
  if (pending) return pending;
  const attempt = new Promise<Record<string, unknown>>((resolve, reject) => {
    const host = window as unknown as Record<string, unknown>;
    if (host.Tesseract) {
      resolve(host.Tesseract as Record<string, unknown>);
      return;
    }
    const script = document.createElement("script");
    script.src = TESSERACT_CDN;
    script.async = true;
    const fail = () => {
      script.remove();
      reject(new Error("cdn"));
    };
    script.onload = () => {
      if (host.Tesseract) resolve(host.Tesseract as Record<string, unknown>);
      else fail();
    };
    script.onerror = fail;
    document.head.appendChild(script);
  });
  pending = attempt;
  void attempt.catch(() => {
    // An older failed request must never discard a newer in-flight attempt.
    if (pending === attempt) pending = null;
  });
  return attempt;
}
