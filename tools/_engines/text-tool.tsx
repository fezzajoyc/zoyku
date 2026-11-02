"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { TRANSFORMS } from "../_lib/transform-registry";

export type TextOption = {
  key: string;
  label: Record<string, string>;
  default?: boolean;
};

export type TextTransformProps = {
  /** 变换注册表里的 ID(函数不可从服务端传入,见 transform-registry.ts) */
  transform: string;
  options?: TextOption[];
  /** 示例文本,可空 */
  sample?: string;
};

/** 文本变换通用引擎:输入即算,复制/清空。去重、排序、反转、清洗等十余个工具页共用。 */
export function TextTransform({ transform, options = [], sample }: TextTransformProps) {
  const { locale, t } = useI18n();
  const [input, setInput] = useState("");
  const [opts, setOpts] = useState<Record<string, boolean>>(
    Object.fromEntries(options.map((o) => [o.key, o.default ?? false])),
  );

  const output = useMemo(() => {
    const run = TRANSFORMS[transform];
    if (!run) return input;
    try {
      return run(input, opts);
    } catch {
      return input;
    }
  }, [input, transform, opts]);

  return (
    <ToolPanel>
      <div className="space-y-4">
        <textarea
          className="field mono"
          rows={8}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.common.input}
          spellCheck={false}
          aria-label={t.common.input}
        />
        {options.length > 0 && (
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {options.map((o) => (
              <label key={o.key} className="inline-flex cursor-pointer items-center gap-2 text-[14px]">
                <input
                  type="checkbox"
                  className="accent-[var(--color-accent)]"
                  checked={opts[o.key] ?? false}
                  onChange={(e) => setOpts((s) => ({ ...s, [o.key]: e.target.checked }))}
                />
                {o.label[locale] ?? o.label.en}
              </label>
            ))}
          </div>
        )}
        <textarea
          className="field mono bg-[var(--color-surface)]"
          rows={8}
          value={output}
          readOnly
          placeholder={t.common.output}
          spellCheck={false}
          aria-label={t.common.output}
        />
        <div className="flex flex-wrap gap-2.5">
          <CopyButton value={output} />
          <button
            type="button"
            onClick={() => setInput("")}
            className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {t.common.clear}
          </button>
          {sample && input === "" && (
            <button
              type="button"
              onClick={() => setInput(sample)}
              className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium text-[var(--color-accent-strong)] transition-colors hover:bg-[rgba(0,113,227,0.06)]"
            >
              {t.common.sample}
            </button>
          )}
        </div>
      </div>
    </ToolPanel>
  );
}
