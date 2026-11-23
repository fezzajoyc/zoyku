"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { Tabs, pick } from "./calc-ui";
import { useI18n } from "@/components/i18n-provider";
import type { Locale } from "@/lib/site";
import { countPemCerts, decodeCertificate, generateSelfSignedCert, type CertInfo } from "../_lib/x509-decode";

/**
 * CN-035:X.509 证书解析 / 自签发引擎。
 * 解析 tab:粘 PEM → 结构化字段 + SHA-256/SHA-1 指纹 + SAN 列表 + 自签验签结果。
 * 生成 tab:自签发测试用证书(RSA 2048,SAN/有效期/CA 可选)。
 * 诚实边界:不做信任链验证(无系统根库/不查 CRL-OCSP),UI 会明说。
 */

const L = {
  tabDecode: { en: "Decode certificate", zh: "解析证书", ja: "証明書を解析", es: "Decodificar certificado", pt: "Decodificar certificado" },
  tabGen: { en: "Create test certificate", zh: "生成测试证书", ja: "テスト証明書を作成", es: "Crear certificado de prueba", pt: "Criar certificado de teste" },
  pemIn: { en: "Certificate (PEM)", zh: "证书(PEM)", ja: "証明書(PEM)", es: "Certificado (PEM)", pt: "Certificado (PEM)" },
  decode: { en: "Decode", zh: "解析", ja: "解析する", es: "Decodificar", pt: "Decodificar" },
  busy: { en: "Working…", zh: "处理中…", ja: "処理中…", es: "Procesando…", pt: "Processando…" },
  field: { en: "Field", zh: "字段", ja: "項目", es: "Campo", pt: "Campo" },
  value: { en: "Value", zh: "值", ja: "値", es: "Valor", pt: "Valor" },
  san: { en: "Subject alternative names", zh: "主题备用名称(SAN)", ja: "サブジェクト代替名(SAN)", es: "Nombres alternativos (SAN)", pt: "Nomes alternativos (SAN)" },
  fp: { en: "Fingerprints", zh: "指纹", ja: "フィンガープリント", es: "Huellas", pt: "Impressões digitais" },
  status: { en: "Status", zh: "状态", ja: "状態", es: "Estado", pt: "Estado" },
  valid: { en: "Valid now", zh: "当前有效", ja: "現在有効", es: "Válido ahora", pt: "Válido agora" },
  expired: { en: "Expired", zh: "已过期", ja: "期限切れ", es: "Caducado", pt: "Expirado" },
  notYet: { en: "Not yet valid", zh: "尚未生效", ja: "まだ有効ではありません", es: "Aún no válido", pt: "Ainda não válido" },
  daysLeft: { en: "{n} days remaining", zh: "剩余 {n} 天", ja: "残り {n} 日", es: "{n} días restantes", pt: "{n} dias restantes" },
  selfSignedOk: { en: "Self-signature verifies (self-signed only — no chain of trust is checked)", zh: "自签验签通过(仅自签,未验证信任链)", ja: "自己署名の検証に成功(自己署名のみ。信頼チェーンは未検証)", es: "La autofirma verifica (solo autofirmado; no se comprueba la cadena de confianza)", pt: "A autoassinatura verifica (apenas autoassinado; a cadeia de confiança não é verificada)" },
  selfSignedBad: { en: "Self-signature does NOT verify", zh: "自签验签失败", ja: "自己署名の検証に失敗", es: "La autofirma NO verifica", pt: "A autoassinatura NÃO verifica" },
  multiPem: { en: "This input contains {n} certificates — the first one is decoded; use a standalone PEM to inspect others.", zh: "输入包含 {n} 张证书——只解析第一张;要检查其它的请单独粘贴。", ja: "入力に {n} 件の証明書が含まれています — 最初の 1 件のみ解析されます。他を調べるには単体の PEM を貼り付けてください。", es: "La entrada contiene {n} certificados; solo se decodifica el primero. Usa un PEM individual para inspeccionar los demás.", pt: "A entrada contém {n} certificados — apenas o primeiro é decodificado; use um PEM individual para inspecionar os outros." },
  errEmpty: { en: "Paste a PEM certificate first.", zh: "请先粘贴 PEM 证书。", ja: "まず PEM 証明書を貼り付けてください。", es: "Pega primero un certificado PEM.", pt: "Cole primeiro um certificado PEM." },
  errNoPem: { en: "No PEM certificate block found — expected -----BEGIN CERTIFICATE---.--.", zh: "找不到 PEM 证书块——应为 -----BEGIN CERTIFICATE---.-- 形式。", ja: "PEM 証明書ブロックが見つかりません — -----BEGIN CERTIFICATE---.-- 形式が必要です。", es: "No se encontró un bloque PEM — se esperaba -----BEGIN CERTIFICATE---.--.", pt: "Nenhum bloco PEM encontrado — esperado -----BEGIN CERTIFICATE---.--." },
  errParse: { en: "Could not parse this certificate — the PEM block is malformed or corrupt.", zh: "无法解析该证书——PEM 块格式错误或已损坏。", ja: "この証明書を解析できませんでした — PEM ブロックが壊れているか不正です。", es: "No se pudo analizar este certificado — el bloque PEM está malformado o corrupto.", pt: "Não foi possível analisar este certificado — o bloco PEM está malformado ou corrompido." },
  errUnsupported: { en: "This browser cannot run the certificate engine.", zh: "此浏览器无法运行证书引擎。", ja: "このブラウザは証明書エンジンを実行できません。", es: "Este navegador no puede ejecutar el motor de certificados.", pt: "Este navegador não pode executar o motor de certificados." },
  cn: { en: "Common name (CN)", zh: "通用名(CN)", ja: "コモンネーム(CN)", es: "Nombre común (CN)", pt: "Nome comum (CN)" },
  org: { en: "Organization (O)", zh: "组织(O)", ja: "組織(O)", es: "Organización (O)", pt: "Organização (O)" },
  ou: { en: "Department (OU)", zh: "部门(OU)", ja: "部門(OU)", es: "Departamento (OU)", pt: "Departamento (OU)" },
  country: { en: "Country (2 letters)", zh: "国家(2 字母)", ja: "国(2 文字)", es: "País (2 letras)", pt: "País (2 letras)" },
  sanDns: { en: "Extra DNS names (comma separated)", zh: "额外 DNS 名(逗号分隔)", ja: "追加 DNS 名(カンマ区切り)", es: "Nombres DNS extra (separados por coma)", pt: "Nomes DNS extras (separados por vírgula)" },
  sanIp: { en: "Extra IP addresses (comma separated)", zh: "额外 IP 地址(逗号分隔)", ja: "追加 IP(カンマ区切り)", es: "IPs adicionales (separados por coma)", pt: "IPs extras (separados por vírgula)" },
  days: { en: "Validity", zh: "有效期", ja: "有効期間", es: "Validez", pt: "Validade" },
  caMode: { en: "Sign as a CA certificate (adds keyCertSign)", zh: "作为 CA 证书签发(加 keyCertSign)", ja: "CA 証明書として署名(keyCertSign を追加)", es: "Firmar como certificado CA (añade keyCertSign)", pt: "Assinar como certificado CA (adiciona keyCertSign)" },
  gen: { en: "Generate certificate + key", zh: "生成证书与私钥", ja: "証明書と鍵を生成", es: "Generar certificado y clave", pt: "Gerar certificado e chave" },
  certOut: { en: "Certificate (PEM)", zh: "证书(PEM)", ja: "証明書(PEM)", es: "Certificado (PEM)", pt: "Certificado (PEM)" },
  keyOut: { en: "Private key (PEM) — keep it secret", zh: "私钥(PEM)——务必保密", ja: "秘密鍵(PEM)— 厳重に保管", es: "Clave privada (PEM) — mantenla secreta", pt: "Chave privada (PEM) — mantenha em segredo" },
  genNote: {
    en: "RSA 2048 keys are generated with node-forge in this tab (typically a fraction of a second). The certificate is self-signed and SHA-256 signed — suitable for local development, internal services and test fixtures, never for public websites. No certificate-transparency logging, no expiry monitoring and no revocation are implied.",
    zh: "RSA 2048 密钥在本标签页内由 node-forge 生成(通常不到一秒)。证书为自签发、SHA-256 签名——适合本地开发、内部服务与测试数据,绝不用于公网网站。不涉及证书透明度日志、到期监控与吊销。",
    ja: "RSA 2048 鍵はこのタブ内で node-forge により生成されます(通常 1 秒未満)。証明書は自己署名で SHA-256 署名 — ローカル開発・社内サービス・テスト用に適し、公開サイトには決して使わないでください。証明書透明性ログ、有効期限監視、失効は含まれません。",
    es: "Las claves RSA 2048 se generan con node-forge en esta pestaña (normalmente menos de un segundo). El certificado es autofirmado y firmado con SHA-256 — apto para desarrollo local, servicios internos y fixtures, nunca para sitios públicos. No implica registro de transparencia, monitoreo de caducidad ni revocación.",
    pt: "As chaves RSA 2048 são geradas com node-forge nesta aba (normalmente menos de um segundo). O certificado é autoassinado e assinado com SHA-256 — adequado para desenvolvimento local, serviços internos e fixtures, nunca para sites públicos. Não implica registro de transparência, monitoramento de expiração nem revogação.",
  },
  decodeNote: {
    en: "Parsing runs entirely in this tab with node-forge. Determining whether a certificate is trusted requires the operating system's root store, CRL and OCSP checks — none of which a browser tool can do, so this tool deliberately reports facts (subject, validity, fingerprints, extensions, self-signature) and never claims trust.",
    zh: "解析完全在本标签页内由 node-forge 完成。判断证书是否受信需要操作系统根证书库、CRL 与 OCSP 检查——浏览器工具做不到这些,所以本工具只报告客观事实(subject、有效期、指纹、扩展项、自签验签),绝不声称「受信」。",
    ja: "解析は node-forge によりこのタブ内で完結します。証明書が信頼されるかどうかの判断には OS のルートストア、CRL、OCSP の確認が必要で、ブラウザツールには不可能です。よって本ツールは事実(サブジェクト、有効期間、フィンガープリント、拡張、自己署名検証)のみを報告し、信頼を主張しません。",
    es: "El análisis se ejecuta por completo con node-forge en esta pestaña. Determinar si un certificado es de confianza requiere el almacén raíz del sistema, CRL y OCSP — nada de lo cual puede hacer una herramienta de navegador, así que solo informamos hechos (sujeto, validez, huellas, extensiones, autofirma) y nunca afirmamos confianza.",
    pt: "A análise roda inteiramente nesta aba com node-forge. Determinar se um certificado é confiável exige o repositório raiz do sistema, CRL e OCSP — nada que uma ferramenta de navegador possa fazer, então reportamos apenas fatos (sujeito, validade, impressões digitais, extensões, autoassinatura) e nunca afirmamos confiança.",
  },
};

const DAY_OPTIONS: Array<{ value: 30 | 90 | 365 | 3650; label: string }> = [
  { value: 30, label: "30 d" },
  { value: 90, label: "90 d" },
  { value: 365, label: "1 y" },
  { value: 3650, label: "10 y" },
];

function errMsg(code: string, locale: Locale): string {
  switch (code) {
    case "empty":
      return pick(locale, L.errEmpty);
    case "noPem":
      return pick(locale, L.errNoPem);
    case "parse":
      return pick(locale, L.errParse);
    default:
      return pick(locale, L.errUnsupported);
  }
}

/** 字段表行(渲染统一)。 */
function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex gap-3 border-b hairline py-1.5 text-[13px] leading-5 last:border-b-0">
      <span className="w-40 shrink-0 text-[var(--color-sub)]">{k}</span>
      <span className={`min-w-0 break-all ${mono ? "mono" : ""}`}>{v}</span>
    </div>
  );
}

function statusLabel(d: CertInfo, locale: Locale): string {
  if (d.expired) return pick(locale, L.expired);
  if (d.notYetValid) return pick(locale, L.notYet);
  return pick(locale, L.valid);
}

export function DevEngineX509() {
  const { locale } = useI18n();
  const [tab, setTab] = useState<"decode" | "gen">("decode");
  const [pemIn, setPemIn] = useState("");
  const [info, setInfo] = useState<CertInfo | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // 生成 tab 状态
  const [cn, setCn] = useState("localhost");
  const [org, setOrg] = useState("");
  const [ou, setOu] = useState("");
  const [country, setCountry] = useState("US");
  const [sanDns, setSanDns] = useState("");
  const [sanIp, setSanIp] = useState("127.0.0.1");
  const [days, setDays] = useState<30 | 90 | 365 | 3650>(365);
  const [caMode, setCaMode] = useState(false);
  const [genResult, setGenResult] = useState<{ certPem: string; keyPem: string; fingerprint: string } | null>(null);

  const [busy, setBusy] = useState(false);

  const doDecode = async () => {
    setErr(null);
    setInfo(null);
    setNotice(null);
    setBusy(true);
    const r = await decodeCertificate(pemIn);
    setBusy(false);
    if (!r.ok) {
      setErr(errMsg(r.code, locale));
      return;
    }
    setInfo(r.data);
    const n = countPemCerts(pemIn);
    if (n > 1) setNotice(pick(locale, L.multiPem).replace("{n}", String(n)));
  };

  const doGenerate = async () => {
    setErr(null);
    setGenResult(null);
    setBusy(true);
    const r = await generateSelfSignedCert({
      commonName: cn,
      organization: org || undefined,
      organizationalUnit: ou || undefined,
      country,
      sanDns: sanDns.split(",").map((s) => s.trim()).filter(Boolean),
      sanIp: sanIp.split(",").map((s) => s.trim()).filter(Boolean),
      days,
      ca: caMode,
    });
    setBusy(false);
    if (!r.ok) {
      setErr(errMsg(r.code, locale));
      return;
    }
    setGenResult({ certPem: r.certPem, keyPem: r.keyPem, fingerprint: r.fingerprintSha256 });
  };

  const rows = useMemo(() => {
    if (!info) return [];
    const R: Array<{ k: string; v: string; mono?: boolean }> = [
      { k: "Subject", v: info.subject },
      { k: "Issuer", v: info.issuer },
      { k: "Serial", v: info.serialHex, mono: true },
      { k: "Version", v: `v${info.version}` },
      { k: "Not before", v: info.notBefore },
      { k: "Not after", v: info.notAfter },
      { k: "Signature", v: info.signatureAlgorithm, mono: true },
      { k: "Public key", v: `${info.publicKeyAlgorithm} ${info.publicKeyBits} bits` },
      { k: "CA (basicConstraints)", v: info.isCa ? "TRUE" : "FALSE" },
      { k: "Key usage", v: info.keyUsage.length > 0 ? info.keyUsage.join(", ") : "—" },
      { k: "Ext. key usage", v: info.extendedKeyUsage.length > 0 ? info.extendedKeyUsage.join(", ") : "—" },
    ];
    return R;
  }, [info]);

  return (
    <ToolPanel>
      <div className="space-y-4">
        <Tabs
          options={[
            { id: "decode", label: pick(locale, L.tabDecode) },
            { id: "gen", label: pick(locale, L.tabGen) },
          ]}
          value={tab}
          onChange={(v) => {
            setTab(v as "decode" | "gen");
            setErr(null);
            setInfo(null);
            setGenResult(null);
            setNotice(null);
          }}
        />

        {err && (
          <p role="alert" className="rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]">
            {err}
          </p>
        )}

        {tab === "decode" ? (
          <>
            <textarea
              className="field mono"
              rows={8}
              value={pemIn}
              onChange={(e) => setPemIn(e.target.value)}
              placeholder="-----BEGIN CERTIFICATE----- ..."
              spellCheck={false}
              aria-label={pick(locale, L.pemIn)}
            />
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={doDecode}
                disabled={busy || !pemIn.trim()}
                className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white dark:bg-white dark:text-[#1d1d1f] transition-opacity disabled:opacity-40"
              >
                {busy ? pick(locale, L.busy) : pick(locale, L.decode)}
              </button>
              {pemIn && (
                <button
                  type="button"
                  onClick={() => {
                    setPemIn("");
                    setInfo(null);
                    setErr(null);
                    setNotice(null);
                  }}
                  className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
                >
                  Clear
                </button>
              )}
            </div>

            {notice && <p className="text-[13px] leading-5 text-[var(--color-sub)]">{notice}</p>}

            {info && (
              <div className="space-y-4">
                <div className="rounded-xl bg-[var(--color-surface)] px-3.5 py-3">
                  <p className="text-[13px] font-medium">
                    {statusLabel(info, locale)}
                    <span className="ml-2 text-[var(--color-sub)]">
                      {pick(locale, L.daysLeft).replace("{n}", String(info.daysRemaining))}
                    </span>
                  </p>
                  {info.selfIssued && (
                    <p className={`mt-1 text-[12.5px] leading-5 ${info.selfSignatureValid ? "text-[var(--color-good,#0a7d33)]" : "text-[var(--color-bad)]"}`}>
                      {info.selfSignatureValid ? pick(locale, L.selfSignedOk) : pick(locale, L.selfSignedBad)}
                    </p>
                  )}
                </div>

                <div>
                  {rows.map((r) => (
                    <Row key={r.k} k={r.k} v={r.v} mono={r.mono} />
                  ))}
                </div>

                <div className="space-y-1.5">
                  <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.san)}</p>
                  {info.subjectAltNames.length === 0 ? (
                    <p className="text-[13px] text-[var(--color-sub)]">—</p>
                  ) : (
                    <ul className="space-y-0.5">
                      {info.subjectAltNames.map((n) => (
                        <li key={`${n.type}:${n.value}`} className="mono text-[13px] leading-5">
                          {n.type.toUpperCase()} · {n.value}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="space-y-1.5">
                  <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.fp)}</p>
                  <div className="space-y-1.5">
                    <div className="flex items-start gap-2">
                      <span className="mono min-w-0 flex-1 break-all text-[12.5px] leading-5 text-[var(--color-sub)]">SHA-256 {info.fingerprintSha256}</span>
                      <CopyButton value={info.fingerprintSha256} />
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mono min-w-0 flex-1 break-all text-[12.5px] leading-5 text-[var(--color-sub)]">SHA-1 {info.fingerprintSha1}</span>
                      <CopyButton value={info.fingerprintSha1} />
                    </div>
                  </div>
                </div>

                <p className="text-[13px] leading-5 text-[var(--color-sub)]">{pick(locale, L.decodeNote)}</p>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, L.cn)}</span>
                <input className="field mono" value={cn} onChange={(e) => setCn(e.target.value)} placeholder="localhost" spellCheck={false} aria-label={pick(locale, L.cn)} />
              </label>
              <label className="block">
                <span className="mb-1 block text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, L.country)}</span>
                <input className="field mono" value={country} onChange={(e) => setCountry(e.target.value.slice(0, 2).toUpperCase())} placeholder="US" spellCheck={false} aria-label={pick(locale, L.country)} />
              </label>
              <label className="block">
                <span className="mb-1 block text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, L.org)}</span>
                <input className="field" value={org} onChange={(e) => setOrg(e.target.value)} placeholder="Example Inc" spellCheck={false} aria-label={pick(locale, L.org)} />
              </label>
              <label className="block">
                <span className="mb-1 block text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, L.ou)}</span>
                <input className="field" value={ou} onChange={(e) => setOu(e.target.value)} placeholder="DevOps" spellCheck={false} aria-label={pick(locale, L.ou)} />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1 block text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, L.sanDns)}</span>
                <input className="field mono" value={sanDns} onChange={(e) => setSanDns(e.target.value)} placeholder="www.example.test, api.example.test" spellCheck={false} aria-label={pick(locale, L.sanDns)} />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1 block text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, L.sanIp)}</span>
                <input className="field mono" value={sanIp} onChange={(e) => setSanIp(e.target.value)} placeholder="127.0.0.1, 10.0.0.5" spellCheck={false} aria-label={pick(locale, L.sanIp)} />
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-wrap items-center gap-2" role="group" aria-label={pick(locale, L.days)}>
                <span className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.days)}</span>
                {DAY_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    aria-pressed={days === o.value}
                    onClick={() => setDays(o.value)}
                    className={`mono rounded-full border px-3 py-1 text-[12.5px] font-medium transition-colors ${
                      days === o.value
                        ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                        : "hairline hover:bg-[var(--color-surface)]"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-2 text-[13px]">
                <input type="checkbox" checked={caMode} onChange={(e) => setCaMode(e.target.checked)} />
                {pick(locale, L.caMode)}
              </label>
            </div>

            <button
              type="button"
              onClick={doGenerate}
              disabled={busy || !cn.trim()}
              className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white dark:bg-white dark:text-[#1d1d1f] transition-opacity disabled:opacity-40"
            >
              {busy ? pick(locale, L.busy) : pick(locale, L.gen)}
            </button>

            {genResult && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.certOut)}</p>
                  <textarea className="field mono bg-[var(--color-surface)]" rows={9} value={genResult.certPem} readOnly spellCheck={false} aria-label={pick(locale, L.certOut)} />
                  <div className="flex flex-wrap gap-2.5">
                    <CopyButton value={genResult.certPem} />
                    <span className="mono self-center break-all text-[12px] text-[var(--color-sub)]">SHA-256 {genResult.fingerprint}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.keyOut)}</p>
                  <textarea className="field mono bg-[var(--color-surface)]" rows={11} value={genResult.keyPem} readOnly spellCheck={false} aria-label={pick(locale, L.keyOut)} />
                  <CopyButton value={genResult.keyPem} />
                </div>
              </div>
            )}

            <p className="text-[13px] leading-5 text-[var(--color-sub)]">{pick(locale, L.genNote)}</p>
          </>
        )}
      </div>
    </ToolPanel>
  );
}
