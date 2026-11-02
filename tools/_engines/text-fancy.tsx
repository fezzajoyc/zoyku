"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import type { Locale } from "@/lib/site";
import { TRANSFORMS } from "../_lib/transform-registry";

/**
 * 花体字引擎:12 种 Unicode 风格逐一调用变换注册表的 fancy-* ID,
 * 输入即算,每行独立复制。未映射字符(CJK/emoji)由变换函数原样保留。
 */

type Name = Record<string, string>;

const STYLES: { id: string; name: Name }[] = [
  {
    id: "fancy-bold",
    name: { en: "Bold", zh: "粗体", ja: "太字", es: "Negrita", pt: "Negrito" },
  },
  {
    id: "fancy-italic",
    name: { en: "Italic", zh: "斜体", ja: "斜体", es: "Cursiva", pt: "Itálico" },
  },
  {
    id: "fancy-bold-italic",
    name: { en: "Bold italic", zh: "粗斜体", ja: "太字斜体", es: "Negrita cursiva", pt: "Negrito itálico" },
  },
  {
    id: "fancy-script",
    name: { en: "Script", zh: "手写体", ja: "筆記体", es: "Manuscrita", pt: "Manuscrito" },
  },
  {
    id: "fancy-bold-script",
    name: { en: "Bold script", zh: "粗手写体", ja: "太字筆記体", es: "Manuscrita negrita", pt: "Manuscrito negrito" },
  },
  {
    id: "fancy-double-struck",
    name: { en: "Double-struck", zh: "空心体", ja: "白抜き", es: "Doble trazo", pt: "Duplo traço" },
  },
  {
    id: "fancy-monospace",
    name: { en: "Monospace", zh: "等宽", ja: "等幅", es: "Monoespaciada", pt: "Monoespaçado" },
  },
  {
    id: "fancy-circled",
    name: { en: "Circled", zh: "圆圈字母", ja: "円囲み", es: "En círculos", pt: "Circulado" },
  },
  {
    id: "fancy-squared",
    name: { en: "Squared", zh: "方框字母", ja: "四角囲み", es: "En cuadros", pt: "Quadrado" },
  },
  {
    id: "fancy-fullwidth",
    name: { en: "Fullwidth", zh: "全角", ja: "全角", es: "Ancho completo", pt: "Largura total" },
  },
  {
    id: "fancy-strikethrough",
    name: { en: "Strikethrough", zh: "删除线", ja: "打ち消し線", es: "Tachado", pt: "Riscado" },
  },
  {
    id: "fancy-underline",
    name: { en: "Underline", zh: "下划线", ja: "下線", es: "Subrayado", pt: "Sublinhado" },
  },
];

export function TextFancyEngine({ sample = "Hello, world! 123" }: { sample?: string }) {
  const { locale, t } = useI18n();
  const [input, setInput] = useState(sample);

  const rows = useMemo(
    () =>
      STYLES.map(({ id, name }) => {
        let out = input;
        const run = TRANSFORMS[id];
        if (run) {
          try {
            out = run(input, {});
          } catch {
            out = input;
          }
        }
        return { id, name, out };
      }),
    [input],
  );

  return (
    <ToolPanel>
      <div className="space-y-5">
        <textarea
          className="field"
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.common.input}
          spellCheck={false}
          aria-label={t.common.input}
        />

        <ul className="divide-y divide-[var(--color-hairline)]">
          {rows.map((r) => (
            <li key={r.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-[var(--color-sub)]">
                  {r.name[locale] ?? r.name.en}
                </p>
                <p className="mt-0.5 break-all text-[17px] leading-7">
                  {r.out || <span className="text-[var(--color-sub)]">…</span>}
                </p>
              </div>
              <CopyButton value={r.out} className="flex-none" />
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => setInput("")}
            className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {t.common.clear}
          </button>
        </div>
      </div>
    </ToolPanel>
  );
}
