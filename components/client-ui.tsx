"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { useI18n } from "./i18n-provider";
import { Icon } from "./icons";
import { COPY_BUTTON_MESSAGES } from "./copy-button-copy";

export function CopyButton({
  value,
  className = "",
  label,
  onCopied,
}: {
  value: string | (() => string);
  className?: string;
  label?: string;
  /** 复制成功后的附加动作(如密码工具的定时隐藏明文) */
  onCopied?: () => void;
}) {
  const { locale, t } = useI18n();
  const recoveryId = useId();
  const [feedback, setFeedback] = useState<{
    value: string | (() => string);
    onCopied?: () => void;
    kind: "success" | "error";
  } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revision = useRef(0);
  const state = feedback && feedback.value === value && feedback.onCopied === onCopied ? feedback.kind : "idle";
  const message = COPY_BUTTON_MESSAGES[locale];

  // A changed source/callback or unmount invalidates work before it can report
  // success, invoke an outdated callback, or leave its feedback timer running.
  useLayoutEffect(() => () => {
    revision.current++;
    if (timer.current !== null) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, [value, onCopied]);

  const copy = useCallback(async () => {
    const current = ++revision.current;
    const isCurrent = () => current === revision.current;
    if (timer.current !== null) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    setFeedback(null);
    let text: string;
    try { text = typeof value === "function" ? value() : value; }
    catch {
      if (isCurrent()) setFeedback({ value, onCopied, kind: "error" });
      return;
    }
    if (!text) return;
    let copied = false;
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch {
      if (!isCurrent()) return;
      const active = document.activeElement;
      let textarea: HTMLTextAreaElement | undefined;
      try {
        textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.readOnly = true;
        textarea.tabIndex = -1;
        textarea.setAttribute("aria-hidden", "true");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus({ preventScroll: true });
        textarea.select();
        copied = document.execCommand("copy") === true;
      } catch { copied = false; }
      finally {
        textarea?.remove();
        if (active instanceof HTMLElement && active.isConnected) active.focus({ preventScroll: true });
      }
    }
    if (!isCurrent()) return;
    setFeedback({ value, onCopied, kind: copied ? "success" : "error" });
    if (!copied) return;
    timer.current = setTimeout(() => {
      timer.current = null;
      if (isCurrent()) setFeedback(null);
    }, 1600);
    onCopied?.();
  }, [value, onCopied]);

  return (
    <button
      data-copy-button
      type="button"
      onClick={copy}
      aria-live="polite"
      aria-describedby={state === "error" ? recoveryId : undefined}
      title={state === "error" ? message.recovery : undefined}
      className={`inline-flex items-center gap-1.5 rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)] ${className}`}
    >
      <Icon name={state === "success" ? "check" : "file"} size={14} />
      {state === "success" ? t.common.copied : state === "error" ? message.failed : (label ?? t.common.copy)}
      {state === "error" && <span id={recoveryId} hidden>{message.recovery}</span>}
    </button>
  );
}

/** 文件选择 + 拖放。onFiles 拿到 File[];accept 传 MIME/后缀。 */
export function DropZone({
  onFiles,
  accept,
  multiple = true,
  children,
}: {
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  children?: React.ReactNode;
}) {
  const { t } = useI18n();
  const [over, setOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const pick = (list: FileList | null) => {
    if (!list?.length) return;
    onFiles(multiple ? Array.from(list) : [list[0]]);
  };

  // 全局粘贴上传:页面任意位置 Ctrl+V 图片/文件直接进工具(对标 TinyWow)
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const files = Array.from(e.clipboardData?.files ?? []);
      if (files.length) {
        e.preventDefault();
        onFiles(multiple ? files : [files[0]]);
      }
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [onFiles, multiple]);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        pick(e.dataTransfer.files);
      }}
      className={`dropzone cursor-pointer ${over ? "over" : ""}`}
      aria-label={multiple ? t.common.dropFiles : t.common.dropFile}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          pick(e.target.files);
          e.target.value = "";
        }}
      />
      <div className="pointer-events-none">
        <Icon name="download" size={22} className="mx-auto mb-2 text-[var(--color-sub)]" />
        {children ?? (
          <p className="text-[14px] text-[var(--color-sub)]">
            {multiple ? t.common.dropFiles : t.common.dropFile}
          </p>
        )}
      </div>
    </div>
  );
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
