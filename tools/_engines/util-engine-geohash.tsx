"use client";

import { useState } from "react";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { Tabs, pick } from "./calc-ui";
import { useI18n } from "@/components/i18n-provider";
import { geohashDecode, geohashEncode } from "../_lib/geohash";

/**
 * CN-030:Geohash 编解码引擎。编码(经纬度+精度)与解码(hash)双向。
 * 显示中心点与误差范围——精度即误差界的直接函数。
 */

const L = {
  enc: { en: "Encode", zh: "编码", ja: "エンコード", es: "Codificar", pt: "Codificar" },
  dec: { en: "Decode", zh: "解码", ja: "デコード", es: "Decodificar", pt: "Decodificar" },
  lat: { en: "Latitude (-90 to 90)", zh: "纬度(-90 到 90)", ja: "緯度(-90〜90)", es: "Latitud (-90 a 90)", pt: "Latitude (-90 a 90)" },
  lng: { en: "Longitude (-180 to 180)", zh: "经度(-180 到 180)", ja: "経度(-180〜180)", es: "Longitud (-180 a 180)", pt: "Longitude (-180 a 180)" },
  precision: { en: "Precision (1–12)", zh: "精度(1–12)", ja: "精度(1〜12)", es: "Precisión (1–12)", pt: "Precisão (1–12)" },
  hash: { en: "Geohash", zh: "Geohash", ja: "Geohash", es: "Geohash", pt: "Geohash" },
  center: { en: "Center point", zh: "中心点", ja: "中心点", es: "Punto central", pt: "Ponto central" },
  error: { en: "Error bounds (± lat, ± lng)", zh: "误差范围(±纬,±经)", ja: "誤差範囲(±緯度、±経度)", es: "Límites de error (± lat, ± lng)", pt: "Limites de erro (± lat, ± lng)" },
  run: { en: "Run", zh: "执行", ja: "実行", es: "Ejecutar", pt: "Executar" },
  badPrecision: {
    en: "Precision must be an integer between 1 and 12.",
    zh: "精度必须是 1 到 12 之间的整数。",
    ja: "精度は 1〜12 の整数である必要があります。",
    es: "La precisión debe ser un entero entre 1 y 12.",
    pt: "A precisão deve ser um inteiro entre 1 e 12.",
  },
  badRange: {
    en: "Latitude must be within ±90 and longitude within ±180.",
    zh: "纬度须在 ±90 内,经度须在 ±180 内。",
    ja: "緯度は ±90、経度は ±180 の範囲内である必要があります。",
    es: "La latitud debe estar dentro de ±90 y la longitud dentro de ±180.",
    pt: "A latitude deve estar dentro de ±90 e a longitude dentro de ±180.",
  },
  badGeohash: {
    en: "Invalid Geohash — characters must be from the Base32 set (no a, i, l, o).",
    zh: "无效 Geohash——字符须属于 Base32 集合(不含 a、i、l、o)。",
    ja: "無効な Geohash — 文字は Base32 セットに属する必要があります(a・i・l・o を除く)。",
    es: "Geohash no válido — los caracteres deben ser del conjunto Base32 (sin a, i, l, o).",
    pt: "Geohash inválido — os caracteres devem ser do conjunto Base32 (sem a, i, l, o).",
  },
  note: {
    en: "Geohash interleaves longitude and latitude bits and encodes them in Base32 (the alphabet excludes a, i, l, o to avoid misreading). Nearby locations share prefixes, so a Geohash prefix acts as a proximity bucket for databases and proximity search. Each extra character narrows the cell roughly by a factor of 2–5: at 6 characters the cell is about 1.2 km × 0.6 km; at 12 characters about 3.7 cm. Decoding returns the cell center and its error bounds. All computation runs locally.",
    zh: "Geohash 把经度与纬度的比特交替排列后用 Base32 编码(字母表刻意不含 a、i、l、o 以防误读)。相邻位置共享前缀,因此 Geohash 前缀可作为数据库与就近搜索的邻近桶。每增加一个字符,格子大约缩小 2–5 倍:6 字符约 1.2 km × 0.6 km,12 字符约 3.7 cm。解码返回格子中心与误差范围。全部本机计算。",
    ja: "Geohash は経度と緯度のビットを交互に並べて Base32 でエンコードします(誤読を避けるためアルファベットは a・i・l・o を含みません)。近い位置は接頭辞を共有するため、Geohash 接頭辞はデータベースや近接検索の隣接バケットとして機能します。1 文字ごとにセルは約 2〜5 分の 1 に縮小:6 文字で約 1.2 km × 0.6 km、12 文字で約 3.7 cm。デコードはセル中心と誤差範囲を返します。すべてローカル計算です。",
    es: "Geohash entrelaza bits de longitud y latitud y los codifica en Base32 (el alfabeto excluye a, i, l, o para evitar lecturas erróneas). Las ubicaciones cercanas comparten prefijos, por lo que un prefijo Geohash actúa como cubo de proximidad para bases de datos y búsquedas. Cada carácter extra reduce la celda aproximadamente por un factor de 2–5: a 6 caracteres la celda es de ~1,2 km × 0,6 km; a 12, ~3,7 cm. La decodificación devuelve el centro de la celda y sus límites de error. Todo local.",
    pt: "O Geohash intercala bits de longitude e latitude e os codifica em Base32 (o alfabeto exclui a, i, l, o para evitar leituras erradas). Locais próximos compartilham prefixos, então um prefixo Geohash atua como balde de proximidade para bancos de dados e buscas. Cada caractere extra estrecha a célula por um fator de aproximadamente 2–5: com 6 caracteres a célula é de ~1,2 km × 0,6 km; com 12, ~3,7 cm. A decodificação retorna o centro da célula e seus limites de erro. Tudo local.",
  },
};

export function UtilEngineGeohash() {
  const { locale } = useI18n();
  const [dir, setDir] = useState<"enc" | "dec">("enc");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [precision, setPrecision] = useState("6");
  const [hash, setHash] = useState("");
  const [out, setOut] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [meta, setMeta] = useState<{ center: { lat: number; lng: number }; error: { lat: number; lng: number } } | null>(null);
  const [busy, setBusy] = useState(false);

  const errText = (code: string) =>
    code === "badPrecision" ? pick(locale, L.badPrecision) : code === "badRange" ? pick(locale, L.badRange) : pick(locale, L.badGeohash);

  const doRun = async () => {
    setErr(null);
    setMeta(null);
    setOut("");
    setBusy(true);
    if (dir === "enc") {
      const r = geohashEncode(Number(lat), Number(lng), Number(precision));
      setBusy(false);
      if (r.ok) {
        setOut(r.geohash);
        setMeta({ center: r.center, error: r.error });
      } else setErr(errText(r.code));
    } else {
      const r = geohashDecode(hash);
      setBusy(false);
      if (r.ok) {
        setMeta({ center: r.center, error: r.error });
        setOut(`${r.center.lat.toFixed(6)}, ${r.center.lng.toFixed(6)}`);
      } else setErr(errText(r.code));
    }
  };

  return (
    <ToolPanel>
      <div className="space-y-4">
        <Tabs
          options={[
            { id: "enc", label: pick(locale, L.enc) },
            { id: "dec", label: pick(locale, L.dec) },
          ]}
          value={dir}
          onChange={(v) => {
            setDir(v as "enc" | "dec");
            setOut("");
            setMeta(null);
            setErr(null);
          }}
        />

        {dir === "enc" ? (
          <div className="grid gap-3 sm:grid-cols-3">
            <input type="text" inputMode="decimal" className="field mono" value={lat} onChange={(e) => setLat(e.target.value)} placeholder={pick(locale, L.lat)} aria-label={pick(locale, L.lat)} spellCheck={false} />
            <input type="text" inputMode="decimal" className="field mono" value={lng} onChange={(e) => setLng(e.target.value)} placeholder={pick(locale, L.lng)} aria-label={pick(locale, L.lng)} spellCheck={false} />
            <input type="text" inputMode="numeric" className="field mono" value={precision} onChange={(e) => setPrecision(e.target.value)} placeholder={pick(locale, L.precision)} aria-label={pick(locale, L.precision)} spellCheck={false} />
          </div>
        ) : (
          <input type="text" className="field mono" value={hash} onChange={(e) => setHash(e.target.value)} placeholder={pick(locale, L.hash)} aria-label={pick(locale, L.hash)} spellCheck={false} autoComplete="off" />
        )}

        <button
          type="button"
          onClick={doRun}
          disabled={busy || (dir === "enc" ? !lat.trim() || !lng.trim() : !hash.trim())}
          className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white dark:bg-white dark:text-[#1d1d1f] disabled:opacity-40"
        >
          {busy ? "…" : pick(locale, L.run)}
        </button>

        {err && (
          <p role="alert" className="rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]">
            {err}
          </p>
        )}

        {out && (
          <div className="space-y-2">
            <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{dir === "enc" ? pick(locale, L.hash) : pick(locale, L.center)}</p>
            <textarea className="field mono bg-[var(--color-surface)]" rows={dir === "dec" ? 3 : 2} value={out} readOnly spellCheck={false} aria-label={out} />
            <CopyButton value={out} />
            {meta && (
              <p className="text-[13px] text-[var(--color-sub)]">
                {pick(locale, L.center)}: {meta.center.lat.toFixed(6)}, {meta.center.lng.toFixed(6)} · {pick(locale, L.error)}: ±{meta.error.lat.toFixed(6)} / ±{meta.error.lng.toFixed(6)}
              </p>
            )}
          </div>
        )}

        <p className="text-[13px] leading-5 text-[var(--color-sub)]">{pick(locale, L.note)}</p>
      </div>
    </ToolPanel>
  );
}
