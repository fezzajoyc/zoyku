"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { verifyJwt, type JwtVerifyResult } from "../_lib/jwt-verify";
import { jwtVerifyCopy } from "../_lib/jwt-verify-copy";

/**
 * G56:JWT 本地验签面板(Decode 标签之外的 Verify 标签)。
 * 纯 WebCrypto;结果分层呈现(签名/claims 各自独立报告,verdict 取最坏项)。
 */

export function JwtVerifyPanel({ token }: { token: string }) {
  const { locale } = useI18n();
  const L = jwtVerifyCopy(locale);
  const [key, setKey] = useState("");
  const [skew, setSkew] = useState("0");
  const [expectedIss, setExpectedIss] = useState("");
  const [expectedAud, setExpectedAud] = useState("");
  const [result, setResult] = useState<JwtVerifyResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canRun = token.trim() !== "" && key.trim() !== "";
  const skewNum = Number(skew);

  const run = () => {
    setError(null);
    if (!canRun) return;
    void verifyJwt({
      token,
      key,
      clockSkewSeconds: Number.isFinite(skewNum) ? skewNum : 0,
      expectedIss: expectedIss || undefined,
      expectedAud: expectedAud || undefined,
    }).then((r) => {
      if (r.ok) setResult(r);
      else {
        setResult(null);
        setError(L.errors[r.code]);
      }
    });
  };

  const fmtDate = (sec: number | null) => {
    if (sec === null) return null;
    try {
      return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : locale, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(sec * 1000));
    } catch {
      return String(sec);
    }
  };

  const claimRow = useMemo(() => {
    if (!result || !result.ok) return [];
    const c = result.claims;
    return [
      { key: "exp", date: fmtDate(result.expSeconds) },
      { key: "nbf", date: fmtDate(result.nbfSeconds) },
      { key: "iss", date: result.tokenIss },
      { key: "aud", date: Array.isArray(result.tokenAud) ? result.tokenAud.join(", ") : result.tokenAud },
    ].map((row) => ({ ...row, status: c[row.key as keyof typeof c] }));
  }, [result]);

  const verdictTone =
    result?.ok && result.verdict === "valid" ? "text-[var(--color-good)]" : "text-[var(--color-bad)]";

  return (
    <div className="space-y-4" data-jwt-verify="">
      <label className="block space-y-1.5 text-[13px] font-medium">
        <span>{L.keyLabel}</span>
        <textarea
          className="field mono"
          rows={3}
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder={L.keyPlaceholder}
          spellCheck={false}
          aria-label={L.keyLabel}
        />
      </label>

      <div className="grid gap-3 sm:grid-cols-3">
        <label className="block space-y-1.5 text-[13px] font-medium">
          <span>{L.skewLabel}</span>
          <input
            type="number"
            className="field mono w-full"
            value={skew}
            onChange={(e) => setSkew(e.target.value)}
            min={0}
            aria-label={L.skewLabel}
          />
        </label>
        <label className="block space-y-1.5 text-[13px] font-medium">
          <span>{L.issLabel}</span>
          <input
            type="text"
            className="field w-full"
            value={expectedIss}
            onChange={(e) => setExpectedIss(e.target.value)}
            aria-label={L.issLabel}
          />
        </label>
        <label className="block space-y-1.5 text-[13px] font-medium">
          <span>{L.audLabel}</span>
          <input
            type="text"
            className="field w-full"
            value={expectedAud}
            onChange={(e) => setExpectedAud(e.target.value)}
            aria-label={L.audLabel}
          />
        </label>
      </div>

      <button
        type="button"
        onClick={run}
        disabled={!canRun}
        className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white dark:bg-white dark:text-[#1d1d1f] transition-opacity disabled:opacity-40"
      >
        {L.verifyBtn}
      </button>

      {error && (
        <p role="alert" className="rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]">
          {error}
        </p>
      )}

      {result?.ok && (
        <div className="space-y-3">
          <p
            className={`rounded-xl px-4 py-3 text-[15px] font-semibold ${verdictTone} ${
              result.verdict === "valid"
                ? "bg-[rgba(52,199,89,0.10)]"
                : "error-bg"
            }`}
            role="status"
          >
            {L.verdicts[result.verdict]} · {result.alg}
          </p>
          <p className="mono text-[13.5px] leading-5 text-[var(--color-sub)]">
            {L.signature}: {result.signatureValid ? L.sigOk : L.sigFail}
          </p>
          <ul className="divide-y divide-[var(--color-hairline)] rounded-xl border hairline">
            {claimRow.map((row) => (
              <li key={row.key} className="flex flex-wrap items-center gap-x-3 gap-y-1 px-3.5 py-2.5 text-[13.5px]">
                <span className="mono font-semibold">{row.key}</span>
                <span
                  className={
                    row.status === "ok"
                      ? "text-[var(--color-good)]"
                      : row.status === "fail"
                        ? "text-[var(--color-bad)]"
                        : "text-[var(--color-sub)]"
                  }
                >
                  {row.status === "ok" ? L.stOk : row.status === "fail" ? L.stFail : L.stAbsent}
                </span>
                {row.date !== null && row.date !== "" && (
                  <span className="ml-auto text-[var(--color-sub)]">{row.date}</span>
                )}
              </li>
            ))}
          </ul>
          <p className="text-[13px] leading-5 text-[var(--color-sub)]">{L.note}</p>
        </div>
      )}
    </div>
  );
}
