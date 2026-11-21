"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { HTML_LANG } from "@/lib/i18n";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { fill } from "../_lib/types";
import { UUID_NAMESPACES, UUID_NIL, uuidV1, uuidV3, uuidV5, uuidV7 } from "../_lib/uuid-versions";

/**
 * G16:UUID 版本家族生成器。
 * - v4/v1/v7:批量(1–500);v4 走 crypto.randomUUID,v1/v7 走 _lib/uuid-versions。
 * - v3/v5:命名空间(预设 DNS/URL/OID/X500)+ 名字逐行,一行一个。
 * - NIL:单值常量。命名空间非法/名字空 → 引擎级结构化错误提示。
 */

type UuidVersion = "v4" | "v1" | "v7" | "v3" | "v5" | "nil";

const D = {
  count: {
    en: "Count", zh: "数量", ja: "個数", es: "Cantidad", pt: "Quantidade",
  },
  version: {
    en: "Version", zh: "版本", ja: "バージョン", es: "Versión", pt: "Versão",
  },
  generate: {
    en: "Generate", zh: "生成", ja: "生成", es: "Generar", pt: "Gerar",
  },
  namespace: {
    en: "Namespace UUID (canonical, with hyphens)",
    zh: "命名空间 UUID(规范连字符格式)",
    ja: "名前空間 UUID(ハイフン付き正規形式)",
    es: "UUID de espacio de nombres (canónico, con guiones)",
    pt: "UUID de namespace (canônico, com hifens)",
  },
  names: {
    en: "Names, one per line (UTF-8, max 100)",
    zh: "名字,每行一个(UTF-8,最多 100 行)",
    ja: "名前(1 行に 1 つ、UTF-8、最大 100 行)",
    es: "Nombres, uno por línea (UTF-8, máx. 100)",
    pt: "Nomes, um por linha (UTF-8, máx. 100)",
  },
  errNamespace: {
    en: "Namespace must be a canonical UUID with hyphens, like 6ba7b810-9dad-11d1-80b4-00c04fd430c8.",
    zh: "命名空间必须是规范的连字符 UUID,例如 6ba7b810-9dad-11d1-80b4-00c04fd430c8。",
    ja: "名前空間は 6ba7b810-9dad-11d1-80b4-00c04fd430c8 のようなハイフン付き正規 UUID で指定してください。",
    es: "El espacio de nombres debe ser un UUID canónico con guiones, p. ej. 6ba7b810-9dad-11d1-80b4-00c04fd430c8.",
    pt: "O namespace deve ser um UUID canônico com hifens, ex. 6ba7b810-9dad-11d1-80b4-00c04fd430c8.",
  },
  errEmptyName: {
    en: "Each name line must be non-empty (blank lines are ignored, but at least one name is required).",
    zh: "每一行名字都不能为空(空行会被忽略,但至少要有一行名字)。",
    ja: "各行の名前は空にできません(空行は無視されますが、1 行以上の名前が必要です)。",
    es: "Cada línea de nombre no puede estar vacía (se ignoran las vacías, pero se requiere al menos una).",
    pt: "Cada linha de nome não pode estar vazia (linhas vazias são ignoradas, mas é necessário ao menos uma).",
  },
  note: {
    en: "{n} IDs generated locally at {time}.",
    zh: "已于 {time} 在本地生成 {n} 个 ID。",
    ja: "{time} にローカルで {n} 個生成しました。",
    es: "{n} IDs generados localmente a las {time}.",
    pt: "{n} IDs gerados localmente às {time}.",
  },
  noteV1: {
    en: "v1 encodes a millisecond-precision timestamp plus a random multicast node (no real MAC) — {n} IDs generated locally at {time}.",
    zh: "v1 包含毫秒级时间戳与随机多播节点(不含真实 MAC)——已于 {time} 在本地生成 {n} 个 ID。",
    ja: "v1 はミリ秒精度のタイムスタンプとランダムなマルチキャストノード(実 MAC なし)を含みます。{time} にローカルで {n} 個生成しました。",
    es: "v1 incluye una marca de tiempo en milisegundos y un nodo multicast aleatorio (sin MAC real): {n} IDs generados localmente a las {time}.",
    pt: "v1 inclui um timestamp em milissegundos e um nó multicast aleatório (sem MAC real): {n} IDs gerados localmente às {time}.",
  },
  noteV7: {
    en: "v7 embeds the Unix timestamp so IDs sort chronologically — {n} IDs generated locally at {time}.",
    zh: "v7 内嵌 Unix 时间戳,ID 按时间排序——已于 {time} 在本地生成 {n} 个 ID。",
    ja: "v7 は Unix タイムスタンプを埋め込み、ID は時系列で並びます。{time} にローカルで {n} 個生成しました。",
    es: "v7 incorpora el timestamp Unix, por lo que los IDs se ordenan cronológicamente: {n} IDs generados localmente a las {time}.",
    pt: "v7 incorpora o timestamp Unix, então os IDs ordenam cronologicamente: {n} IDs gerados localmente às {time}.",
  },
  noteV3V5: {
    en: "{n} name-based IDs via {algo} — deterministic: same namespace+name always yields the same UUID.",
    zh: "{n} 个基于名字的 ID({algo})——确定性:相同命名空间+名字永远得到相同 UUID。",
    ja: "{n} 個の名前ベース ID({algo})— 同じ名前空間+名前なら常に同じ UUID になります。",
    es: "{n} IDs basados en nombre vía {algo}: determinista; mismo namespace+nombre da siempre el mismo UUID.",
    pt: "{n} IDs baseados em nome via {algo} — determinístico: mesmo namespace+nome sempre gera o mesmo UUID.",
  },
  noteNil: {
    en: "NIL UUID is the fixed all-zero value per RFC 9562 §5.9 — it has no randomness to generate.",
    zh: "NIL UUID 是 RFC 9562 §5.9 规定的固定全零值——它没有随机性可生成。",
    ja: "NIL UUID は RFC 9562 §5.9 が定める固定の全ゼロ値で、ランダム性はありません。",
    es: "El UUID NIL es el valor fijo de ceros definido en RFC 9562 §5.9: no tiene aleatoriedad que generar.",
    pt: "O UUID NIL é o valor fixo de zeros do RFC 9562 §5.9 — não há aleatoriedade a gerar.",
  },
  algoMd5: { en: "MD5 (v3)", zh: "MD5(v3)", ja: "MD5(v3)", es: "MD5 (v3)", pt: "MD5 (v3)" },
  algoSha1: { en: "SHA-1 (v5)", zh: "SHA-1(v5)", ja: "SHA-1(v5)", es: "SHA-1 (v5)", pt: "SHA-1 (v5)" },
} as const;

const VERSION_DESC: Record<Exclude<UuidVersion, "nil">, Record<string, string>> = {
  v4: { en: "v4 random", zh: "v4 随机", ja: "v4 ランダム", es: "v4 aleatorio", pt: "v4 aleatório" },
  v1: { en: "v1 timestamp", zh: "v1 时间戳", ja: "v1 タイムスタンプ", es: "v1 timestamp", pt: "v1 timestamp" },
  v7: { en: "v7 sortable", zh: "v7 可排序", ja: "v7 ソート可能", es: "v7 ordenable", pt: "v7 ordenável" },
  v3: { en: "v3 MD5 name", zh: "v3 MD5 命名", ja: "v3 MD5 名前", es: "v3 MD5 nombre", pt: "v3 MD5 nome" },
  v5: { en: "v5 SHA-1 name", zh: "v5 SHA-1 命名", ja: "v5 SHA-1 名前", es: "v5 SHA-1 nombre", pt: "v5 SHA-1 nome" },
};
const NIL_LABEL: Record<string, string> = {
  en: "NIL (all zero)", zh: "NIL(全零)", ja: "NIL(全ゼロ)", es: "NIL (todo cero)", pt: "NIL (tudo zero)",
};

const NAME_BASED: readonly UuidVersion[] = ["v3", "v5"];

export function DevUuidEngine() {
  const { locale, t } = useI18n();
  const [version, setVersion] = useState<UuidVersion>("v4");
  const [count, setCount] = useState(10);
  const [namespace, setNamespace] = useState(UUID_NAMESPACES.DNS);
  const [names, setNames] = useState("python.org\nzoyku.com");
  const [out, setOut] = useState("");
  const [note, setNote] = useState("");
  const [err, setErr] = useState("");

  const pickL = (d: Record<string, string>) => d[locale] ?? d.en;

  const generate = () => {
    setErr("");
    setNote("");
    const time = new Intl.DateTimeFormat(HTML_LANG[locale] ?? HTML_LANG.en, { dateStyle: "short", timeStyle: "medium" }).format(new Date());
    if (version === "nil") {
      setOut(UUID_NIL);
      setNote(pickL(D.noteNil));
      return;
    }
    if (NAME_BASED.includes(version)) {
      const list = names.split("\n").map((line) => line.trim()).filter((line) => line !== "");
      if (list.length === 0) {
        setErr(pickL(D.errEmptyName));
        setOut("");
        return;
      }
      const capped = list.slice(0, 100);
      const results: string[] = [];
      for (const name of capped) {
        const r = version === "v3" ? uuidV3(namespace.trim(), name) : null;
        if (r) {
          if (!r.ok) {
            setErr(pickL(r.code === "badNamespace" ? D.errNamespace : D.errEmptyName));
            setOut("");
            return;
          }
          results.push(r.uuid);
        }
      }
      if (version === "v5") {
        // v5 异步逐个计算;先清空再用 Promise 串行填充
        setOut("…");
        (async () => {
          const lines: string[] = [];
          for (const name of capped) {
            const r = await uuidV5(namespace.trim(), name);
            if (!r.ok) {
              setErr(pickL(r.code === "badNamespace" ? D.errNamespace : D.errEmptyName));
              setOut("");
              return;
            }
            lines.push(r.uuid);
          }
          setOut(lines.join("\n"));
          setNote(fill(pickL(D.noteV3V5), { n: String(lines.length), algo: pickL(D.algoSha1) }));
        })();
        setNote("");
        return;
      }
      setOut(results.join("\n"));
      setNote(fill(pickL(D.noteV3V5), { n: String(results.length), algo: pickL(D.algoMd5) }));
      return;
    }
    // 批量随机版本 v4/v1/v7
    const n = Math.max(1, Math.min(500, Math.floor(count) || 1));
    const ids = Array.from({ length: n }, () => (version === "v4" ? crypto.randomUUID() : version === "v1" ? uuidV1() : uuidV7()));
    setOut(ids.join("\n"));
    const noteKey = version === "v4" ? D.note : version === "v1" ? D.noteV1 : D.noteV7;
    setNote(fill(pickL(noteKey), { n: String(n), time }));
  };

  return (
    <ToolPanel>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2" role="group">
          {(["v4", "v1", "v7", "v3", "v5", "nil"] as UuidVersion[]).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={version === v}
              onClick={() => {
                setVersion(v);
                setErr("");
              }}
              className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                version === v
                  ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                  : "hairline hover:bg-[var(--color-surface)]"
              }`}
            >
              {v === "nil" ? pickL(NIL_LABEL) : pickL(VERSION_DESC[v])}
            </button>
          ))}
        </div>

        {NAME_BASED.includes(version) ? (
          <div className="space-y-3">
            <label className="block space-y-1.5">
              <span className="block text-[13px] font-medium">{pickL(D.namespace)}</span>
              <input
                type="text"
                className="field mono"
                value={namespace}
                onChange={(e) => setNamespace(e.target.value)}
                spellCheck={false}
                aria-label={pickL(D.namespace)}
              />
              <span className="flex flex-wrap gap-1.5">
                {Object.entries(UUID_NAMESPACES).map(([k, u]) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setNamespace(u)}
                    className="rounded-full border hairline px-2.5 py-1 text-[12px] font-medium hover:bg-[var(--color-surface)]"
                  >
                    {k}
                  </button>
                ))}
              </span>
            </label>
            <label className="block space-y-1.5">
              <span className="block text-[13px] font-medium">{pickL(D.names)}</span>
              <textarea
                className="field mono"
                rows={4}
                value={names}
                onChange={(e) => setNames(e.target.value)}
                spellCheck={false}
                aria-label={pickL(D.names)}
              />
            </label>
          </div>
        ) : version !== "nil" ? (
          <label className="inline-flex items-center gap-2 text-[14px]">
            <span>{pickL(D.count)}</span>
            <input
              type="number"
              className="field bare mono w-24 px-2.5 py-1.5 text-[14px]"
              min={1}
              max={500}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              aria-label={pickL(D.count)}
            />
          </label>
        ) : null}

        <button
          type="button"
          onClick={generate}
          className="rounded-full bg-[var(--color-action-bg)] px-4 py-1.5 text-[13.5px] font-medium text-white transition-colors hover:bg-[var(--color-action-hover)]"
        >
          {pickL(D.generate)}
        </button>

        {err && (
          <p className="rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]" role="alert">
            {err}
          </p>
        )}

        <textarea
          className="field mono bg-[var(--color-surface)]"
          rows={8}
          value={out}
          readOnly
          placeholder={t.common.output}
          spellCheck={false}
          aria-label={t.common.output}
        />

        {note && <p className="text-[13px] leading-5 text-[var(--color-sub)]">{note}</p>}

        <div className="flex flex-wrap gap-2.5">
          <CopyButton value={out} />
          <button
            type="button"
            onClick={() => {
              setOut("");
              setNote("");
              setErr("");
            }}
            className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {t.common.clear}
          </button>
        </div>
      </div>
    </ToolPanel>
  );
}
