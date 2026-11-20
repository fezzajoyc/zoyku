"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "./icons";
import { CopyButton } from "./client-ui";
import { tileStyle } from "@/lib/tool-colors";
import { readPins, togglePin } from "@/lib/pins";

type Item = { slug: string; category: string; icon: string; name: string };

/**
 * 引擎下方的相关工具快捷入口。只负责导航,不自动把输入或输出传给下一工具。
 */
export function NextToolsBar({
  tools,
  locale,
  labels,
}: {
  tools: Item[];
  locale: string;
  labels: { nextTitle: string; copyLink: string; copied: string; pinned: string[] };
}) {
  const [pins, setPins] = useState<string[]>([]);

  useEffect(() => {
    setPins(readPins());
  }, []);

  const url =
    typeof window === "undefined" ? "" : window.location.href.split("?")[0].split("#")[0];

  return (
    <div className="mt-8 rounded-2xl border hairline bg-[var(--color-surface)] p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-[13.5px] font-semibold">
          <Icon name="sparkle" size={15} className="text-[var(--color-accent)]" />
          {labels.nextTitle}
        </p>
        <CopyButton
          value={url}
          label={labels.copyLink}
          className="inline-flex items-center gap-1.5 rounded-full border hairline px-3.5 py-1.5 text-[12.5px] font-medium text-[var(--color-sub)] transition-colors hover:bg-[var(--color-card)] hover:text-[var(--color-ink)]"
        />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {tools.map((tool) => {
          const isPinned = pins.includes(tool.slug);
          return (
            <div
              key={tool.slug}
              className="group inline-flex items-center rounded-full border hairline bg-[var(--color-card)] text-[13px] font-medium transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(0,0,0,0.06)]"
            >
              <Link href={`/${locale}/tools/${tool.slug}`} className="inline-flex items-center gap-2 rounded-full py-2 pl-3.5 pr-1.5">
              <span
                className="inline-flex flex-none rounded-md p-1.5 transition-transform group-hover:scale-105"
                style={tileStyle(tool.slug, tool.category)}
              >
                <Icon name={tool.icon} size={13} />
              </span>
              {tool.name}
              </Link>
              <button
                type="button"
                onClick={() => {
                  setPins((prev) => togglePin(tool.slug, prev));
                }}
                aria-label={`${isPinned ? labels.pinned[1] : labels.pinned[0]}: ${tool.name}`}
                aria-pressed={isPinned}
                className={`mr-2 rounded p-1.5 text-[12px] transition-opacity max-sm:opacity-100 focus-visible:opacity-100 ${
                  isPinned
                    ? "text-[#946509] dark:text-[#f4c15d] opacity-100"
                    : "text-[var(--color-sub)] opacity-0 group-hover:opacity-100"
                }`}
              >
                ★
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
