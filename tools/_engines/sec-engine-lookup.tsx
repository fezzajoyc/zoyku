"use client";

import { useCallback, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { HTML_LANG } from "@/lib/i18n";
import type { Locale } from "@/lib/site";
import { Icon } from "@/components/icons";
import { ToolPanel } from "@/components/ui";
import { CopyButton } from "@/components/client-ui";

/**
 * DNS / IP / WHOIS 三合一查询引擎,由服务端 props.kind 切换(props 可序列化)。
 * 三个查询都走免费、无密钥、支持 CORS 的公共接口:
 *   dns   → https://dns.google/resolve (DoH)
 *   ip    → https://ipwho.is/
 *   whois → https://rdap.org/domain/{domain}
 * 页面级隐私注记宣称"完全本地",网络类工具必须在 UI 顶部显式披露联网行为。
 */

export type SecLookupKind = "dns" | "ip" | "whois";

const LABELS: Record<string, Record<string, string>> = {
  lookup: { en: "Look up", zh: "查询", ja: "検索", es: "Consultar", pt: "Consultar" },
  queryPlaceholder: {
    en: "example.com",
    zh: "example.com",
    ja: "example.com",
    es: "example.com",
    pt: "example.com",
  },
  domain: { en: "Domain", zh: "域名", ja: "ドメイン", es: "Dominio", pt: "Domínio" },
  type: { en: "Type", zh: "类型", ja: "種類", es: "Tipo", pt: "Tipo" },
  ipPlaceholder: {
    en: "Leave empty to look up your own IP",
    zh: "留空则查询你自己的 IP",
    ja: "空欄で自分の IP を検索",
    es: "Deja vacío para consultar tu propia IP",
    pt: "Deixe vazio para consultar o seu IP",
  },
  myIp: { en: "Use my IP", zh: "查我自己的 IP", ja: "自分の IP を調べる", es: "Usar mi IP", pt: "Usar meu IP" },
  querying: { en: "Querying…", zh: "查询中…", ja: "問い合わせ中…", es: "Consultando…", pt: "Consultando…" },
  errInvalidDomain: {
    en: "Please enter a valid domain name, like example.com.",
    zh: "请输入有效的域名,例如 example.com。",
    ja: "example.com のような有効なドメイン名を入力してください。",
    es: "Introduce un nombre de dominio válido, como example.com.",
    pt: "Digite um nome de domínio válido, como exemplo.com.",
  },
  errInvalidIp: {
    en: "Please enter a valid IPv4 or IPv6 address.",
    zh: "请输入有效的 IPv4 或 IPv6 地址。",
    ja: "有効な IPv4 または IPv6 アドレスを入力してください。",
    es: "Introduce una dirección IPv4 o IPv6 válida.",
    pt: "Digite um endereço IPv4 ou IPv6 válido.",
  },
  errNetwork: {
    en: "The query failed. Check your connection and try again.",
    zh: "查询失败,请检查网络连接后重试。",
    ja: "問い合わせに失敗しました。接続を確認して再試行してください。",
    es: "La consulta falló. Comprueba tu conexión e inténtalo de nuevo.",
    pt: "A consulta falhou. Verifique sua conexão e tente novamente.",
  },
  errNx: {
    en: "This domain does not exist (NXDOMAIN).",
    zh: "该域名不存在(NXDOMAIN)。",
    ja: "このドメインは存在しません(NXDOMAIN)。",
    es: "Este dominio no existe (NXDOMAIN).",
    pt: "Este domínio não existe (NXDOMAIN).",
  },
  noRecords: {
    en: "No {type} records found for this domain.",
    zh: "该域名没有 {type} 记录。",
    ja: "このドメインに {type} レコードは見つかりません。",
    es: "No se encontraron registros {type} para este dominio.",
    pt: "Nenhum registro {type} encontrado para este domínio.",
  },
  disclosureDns: {
    en: "Network notice: the domain you enter is sent to Google's public DNS resolver (dns.google) over HTTPS to resolve the query. Nothing else is shared.",
    zh: "联网说明:你输入的域名会通过 HTTPS 发送到 Google 公共 DNS 解析器(dns.google)完成解析,除此之外不共享任何信息。",
    ja: "ネットワーク利用について:入力したドメイン名は、解決のために HTTPS 経由で Google Public DNS(dns.google)に送信されます。それ以外の情報は送られません。",
    es: "Aviso de red: el dominio que introduzcas se envía por HTTPS al resolvedor público de Google (dns.google) para resolver la consulta. No se comparte nada más.",
    pt: "Aviso de rede: o domínio digitado é enviado por HTTPS ao resolvedor público do Google (dns.google) para fazer a consulta. Nada mais é compartilhado.",
  },
  disclosureIp: {
    en: "Network notice: the IP address you look up is sent to the free ipwho.is API over HTTPS. The site never learns more than that request.",
    zh: "联网说明:你要查询的 IP 地址会通过 HTTPS 发送到免费的 ipwho.is 接口,除此之外网站不会获知更多信息。",
    ja: "ネットワーク利用について:検索する IP アドレスは HTTPS 経由で無料の ipwho.is API に送信されます。それ以上の情報は送られません。",
    es: "Aviso de red: la IP que consultes se envía por HTTPS a la API gratuita de ipwho.is. El sitio no sabe nada más que esa petición.",
    pt: "Aviso de rede: o IP consultado é enviado por HTTPS à API gratuita do ipwho.is. O site não fica sabendo mais do que essa requisição.",
  },
  disclosureWhois: {
    en: "Network notice: the domain is sent over HTTPS to rdap.org, which may redirect to the registry's official RDAP server, to fetch public registration data.",
    zh: "联网说明:域名会通过 HTTPS 发送到 rdap.org(可能重定向到注册管理机构的官方 RDAP 服务器),以获取公开的注册信息。",
    ja: "ネットワーク利用について:公開された登録情報を取得するため、ドメインは HTTPS 経由で rdap.org(レジストリ公式の RDAP サーバーへリダイレクトされる場合があります)に送信されます。",
    es: "Aviso de red: el dominio se envía por HTTPS a rdap.org —que puede redirigir al servidor RDAP oficial del registro— para obtener los datos públicos de registro.",
    pt: "Aviso de rede: o domínio é enviado por HTTPS a rdap.org — que pode redirecionar ao servidor RDAP oficial do registro — para obter os dados públicos de registro.",
  },
  errNotCovered: {
    en: "RDAP does not cover this TLD yet, or the domain is not registered. Country-code registries like .cn, .de and .br often lack public RDAP servers.",
    zh: "RDAP 暂不支持该顶级域名,或该域名未注册。像 .cn、.de、.br 这类国家级域名往往没有公开的 RDAP 服务。",
    ja: "RDAP はこの TLD にまだ対応していないか、ドメインが未登録です。「.cn」「.de」「.br」などの ccTLD には公開 RDAP サーバーがないことが多いです。",
    es: "RDAP aún no cubre este TLD, o el dominio no está registrado. Los registros nacionales como .cn, .de y .br suelen carecer de servidores RDAP públicos.",
    pt: "O RDAP ainda não cobre este TLD, ou o domínio não está registrado. Registros nacionais como .cn, .de e .br geralmente não têm servidores RDAP públicos.",
  },
  errRateLimited: {
    en: "The RDAP service is rate-limiting requests right now. Wait a moment and try again.",
    zh: "RDAP 服务当前正在限流,请稍候再试。",
    ja: "RDAP サービスが現在レート制限中です。少し待ってから再試行してください。",
    es: "El servicio RDAP está limitando las peticiones. Espera un momento e inténtalo de nuevo.",
    pt: "O serviço RDAP está limitando as requisições agora. Aguarde um momento e tente de novo.",
  },
  registrar: { en: "Registrar", zh: "注册商", ja: "レジストラ", es: "Registrador", pt: "Registrante" },
  ianaId: { en: "IANA ID", zh: "IANA 编号", ja: "IANA ID", es: "ID IANA", pt: "ID IANA" },
  created: { en: "Created", zh: "注册时间", ja: "登録日", es: "Creado", pt: "Criado" },
  updated: { en: "Last updated", zh: "最近更新", ja: "最終更新", es: "Última actualización", pt: "Última atualização" },
  expires: { en: "Expires", zh: "到期时间", ja: "有効期限", es: "Expira", pt: "Expira" },
  status: { en: "Status", zh: "状态", ja: "ステータス", es: "Estado", pt: "Situação" },
  nameservers: { en: "Nameservers", zh: "域名服务器", ja: "ネームサーバー", es: "Servidores DNS", pt: "Servidores DNS" },
  dnssec: { en: "DNSSEC", zh: "DNSSEC", ja: "DNSSEC", es: "DNSSEC", pt: "DNSSEC" },
  yes: { en: "Yes", zh: "已启用", ja: "あり", es: "Sí", pt: "Sim" },
  no: { en: "No", zh: "未启用", ja: "なし", es: "No", pt: "Não" },
  ip: { en: "IP address", zh: "IP 地址", ja: "IP アドレス", es: "Dirección IP", pt: "Endereço IP" },
  ipType: { en: "Type", zh: "类型", ja: "種類", es: "Tipo", pt: "Tipo" },
  country: { en: "Country", zh: "国家/地区", ja: "国・地域", es: "País", pt: "País" },
  region: { en: "Region", zh: "省州", ja: "地域", es: "Región", pt: "Região" },
  city: { en: "City", zh: "城市", ja: "都市", es: "Ciudad", pt: "Cidade" },
  isp: { en: "ISP", zh: "运营商", ja: "プロバイダー", es: "ISP", pt: "Provedor" },
  org: { en: "Organization", zh: "组织", ja: "組織", es: "Organización", pt: "Organização" },
  asn: { en: "ASN", zh: "ASN", ja: "ASN", es: "ASN", pt: "ASN" },
  timezone: { en: "Timezone", zh: "时区", ja: "タイムゾーン", es: "Zona horaria", pt: "Fuso horário" },
  coords: { en: "Coordinates", zh: "坐标", ja: "座標", es: "Coordenadas", pt: "Coordenadas" },
  records: { en: "Records", zh: "记录", ja: "レコード", es: "Registros", pt: "Registros" },
  ttl: { en: "TTL (s)", zh: "TTL(秒)", ja: "TTL(秒)", es: "TTL (s)", pt: "TTL (s)" },
  data: { en: "Data", zh: "数据", ja: "値", es: "Datos", pt: "Dados" },
  notAvailable: { en: "—", zh: "—", ja: "—", es: "—", pt: "—" },
};

const DNS_TYPES = ["A", "AAAA", "MX", "TXT", "NS", "CNAME"] as const;
type DnsType = (typeof DNS_TYPES)[number];

const DNS_TYPE_IDS: Record<DnsType, number> = { A: 1, AAAA: 28, MX: 15, TXT: 16, NS: 2, CNAME: 5 };
const DNS_TYPE_NAMES: Record<number, string> = { 1: "A", 2: "NS", 5: "CNAME", 15: "MX", 16: "TXT", 28: "AAAA" };

const DOMAIN_RE = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/;

function extractDomain(raw: string): string | null {
  let s = raw.trim().toLowerCase();
  s = s.replace(/^[a-z][a-z0-9+.-]*:\/\//, ""); // strip scheme
  s = s.replace(/[/?#].*$/, ""); // strip path
  s = s.replace(/\.+$/, "");
  if (s.includes("@")) s = s.split("@").pop() ?? "";
  return DOMAIN_RE.test(s) && s.length <= 253 ? s : null;
}

const IPV4_RE = /^(\d{1,3}\.){3}\d{1,3}$/;
const IPV6_RE = /^[0-9a-f:]+$/i;

function extractIp(raw: string): string | null {
  const s = raw.trim();
  if (IPV4_RE.test(s) && s.split(".").every((p) => Number(p) <= 255)) return s;
  if (s.includes(":") && IPV6_RE.test(s) && s.length >= 2 && s.length <= 45) return s;
  return null;
}

function L(locale: string, key: string): string {
  return LABELS[key][locale] ?? LABELS[key].en;
}

function Disclosure({ kind, locale }: { kind: SecLookupKind; locale: Locale }) {
  const key = kind === "dns" ? "disclosureDns" : kind === "ip" ? "disclosureIp" : "disclosureWhois";
  return (
    <p className="flex items-start gap-2 rounded-xl bg-[rgba(0,113,227,0.06)] px-4 py-2.5 text-[13px] leading-5 text-[var(--color-sub)]">
      <Icon name="globe" size={15} className="mt-0.5 flex-none text-[var(--color-accent-strong)]" />
      {L(locale, key)}
    </p>
  );
}

function ErrorBox({ text }: { text: string }) {
  return (
    <p
      role="alert"
      className="rounded-xl bg-[rgba(178,80,0,0.08)] px-4 py-2.5 text-[13.5px] leading-6 text-[var(--color-bad)]"
    >
      {text}
    </p>
  );
}

function Row({ label, value, mono = false }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 border-b hairline py-2 last:border-b-0">
      <dt className="text-[13.5px] text-[var(--color-sub)]">{label}</dt>
      <dd className={`${mono ? "mono " : ""}text-[13.5px] font-medium break-all text-right`}>{value}</dd>
    </div>
  );
}

/* ----------------------------- DNS (DoH) ----------------------------- */

type DohAnswer = { name: string; type: number; TTL: number; data: string };

function cleanTxt(data: string): string {
  let s = data.trim();
  // TXT 记录形如 "part one" "part two",去掉外层引号并拼接
  const parts = s.match(/"((?:[^"\\]|\\.)*)"/g);
  if (parts) s = parts.map((p) => p.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")).join("");
  return s;
}

function DnsPanel({ locale }: { locale: Locale }) {
  const [domain, setDomain] = useState("");
  const [type, setType] = useState<DnsType>("A");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [answers, setAnswers] = useState<DohAnswer[]>([]);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(
    async (d: string, t: DnsType) => {
      setStatus("loading");
      setError(null);
      try {
        const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(d)}&type=${t}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as { Status?: number; Answer?: DohAnswer[] };
        if (data.Status === 3) {
          setAnswers([]);
          setError(L(locale, "errNx"));
          setStatus("error");
          return;
        }
        const list = (data.Answer ?? []).map((a) => ({
          ...a,
          data: a.type === 16 ? cleanTxt(a.data) : a.data.replace(/\s+$/, ""),
        }));
        setAnswers(list);
        setStatus("done");
      } catch {
        setAnswers([]);
        setError(L(locale, "errNetwork"));
        setStatus("error");
      }
    },
    [locale],
  );

  const submit = () => {
    const d = extractDomain(domain);
    if (!d) {
      setStatus("error");
      setError(L(locale, "errInvalidDomain"));
      setAnswers([]);
      return;
    }
    void run(d, type);
  };

  return (
    <div className="space-y-4">
      <Disclosure kind="dns" locale={locale} />
      <div className="flex flex-wrap items-center gap-2">
        <input
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder={L(locale, "queryPlaceholder")}
          className="field mono min-w-[220px] flex-1"
          spellCheck={false}
          autoComplete="off"
          aria-label={L(locale, "queryPlaceholder")}
        />
        <button
          type="button"
          onClick={submit}
          disabled={status === "loading"}
          className="rounded-full bg-[var(--color-accent)] px-5 py-2 text-[13.5px] font-medium text-white transition-colors hover:bg-[var(--color-accent-strong)] disabled:opacity-60"
        >
          {status === "loading" ? L(locale, "querying") : L(locale, "lookup")}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {DNS_TYPES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={`mono rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
              type === t
                ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                : "hairline hover:bg-[var(--color-surface)]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {error && <ErrorBox text={error} />}

      {status === "done" && (
        answers.length > 0 ? (
          <div className="overflow-x-auto rounded-xl border hairline">
            <table className="w-full min-w-[480px] border-collapse text-[13.5px]">
              <thead>
                <tr className="bg-[var(--color-surface)] text-left text-[12.5px] text-[var(--color-sub)]">
                  <th className="px-3.5 py-2 font-semibold">{L(locale, "type")}</th>
                  <th className="px-3.5 py-2 font-semibold">{L(locale, "ttl")}</th>
                  <th className="px-3.5 py-2 font-semibold">{L(locale, "data")}</th>
                </tr>
              </thead>
              <tbody>
                {answers.map((a, i) => (
                  <tr key={i} className="border-t hairline align-top">
                    <td className="mono px-3.5 py-2 font-semibold whitespace-nowrap">
                      {DNS_TYPE_NAMES[a.type] ?? a.type}
                    </td>
                    <td className="mono px-3.5 py-2 whitespace-nowrap text-[var(--color-sub)]">{a.TTL}</td>
                    <td className="mono px-3.5 py-2 break-all">{a.data}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !error && (
            <p className="text-[13.5px] leading-6 text-[var(--color-sub)]">
              {L(locale, "noRecords").replace("{type}", type)}
            </p>
          )
        )
      )}
    </div>
  );
}

/* ------------------------------ IP (ipwho.is) ------------------------------ */

type IpWhoResponse = {
  success?: boolean;
  message?: string;
  ip?: string;
  type?: string;
  country?: string;
  country_code?: string;
  region?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  connection?: { asn?: number; org?: string; isp?: string; domain?: string };
  timezone?: { id?: string; utc?: string };
};

function IpPanel({ locale }: { locale: Locale }) {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [data, setData] = useState<IpWhoResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(
    async (ip: string) => {
      setStatus("loading");
      setError(null);
      try {
        const res = await fetch(`https://ipwho.is/${ip ? encodeURIComponent(ip) : ""}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as IpWhoResponse;
        if (json.success === false) throw new Error(json.message || "lookup failed");
        setData(json);
        setStatus("done");
      } catch {
        setData(null);
        setError(L(locale, "errNetwork"));
        setStatus("error");
      }
    },
    [locale],
  );

  const submit = (useOwn: boolean) => {
    if (useOwn) {
      void run("");
      return;
    }
    const ip = extractIp(input);
    if (!ip) {
      setStatus("error");
      setError(L(locale, "errInvalidIp"));
      setData(null);
      return;
    }
    void run(ip);
  };

  const dash = L(locale, "notAvailable");

  return (
    <div className="space-y-4">
      <Disclosure kind="ip" locale={locale} />
      <div className="flex flex-wrap items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit(false)}
          placeholder={L(locale, "ipPlaceholder")}
          className="field mono min-w-[220px] flex-1"
          spellCheck={false}
          autoComplete="off"
          aria-label={L(locale, "ipPlaceholder")}
        />
        <button
          type="button"
          onClick={() => submit(false)}
          disabled={status === "loading"}
          className="rounded-full bg-[var(--color-accent)] px-5 py-2 text-[13.5px] font-medium text-white transition-colors hover:bg-[var(--color-accent-strong)] disabled:opacity-60"
        >
          {status === "loading" ? L(locale, "querying") : L(locale, "lookup")}
        </button>
        <button
          type="button"
          onClick={() => submit(true)}
          disabled={status === "loading"}
          className="rounded-full border hairline px-4 py-2 text-[13.5px] font-medium transition-colors hover:bg-[var(--color-surface)] disabled:opacity-60"
        >
          {L(locale, "myIp")}
        </button>
      </div>

      {error && <ErrorBox text={error} />}

      {status === "done" && data && (
        <dl className="rounded-xl border hairline px-4 py-1">
          <Row label={L(locale, "ip")} value={data.ip ?? dash} mono />
          <Row label={L(locale, "ipType")} value={data.type ?? dash} mono />
          <Row
            label={L(locale, "country")}
            value={data.country ? `${data.country}${data.country_code ? ` (${data.country_code})` : ""}` : dash}
          />
          <Row label={L(locale, "region")} value={data.region || dash} />
          <Row label={L(locale, "city")} value={data.city || dash} />
          <Row label={L(locale, "isp")} value={data.connection?.isp || dash} />
          <Row label={L(locale, "org")} value={data.connection?.org || dash} />
          <Row
            label={L(locale, "asn")}
            value={data.connection?.asn ? `AS${data.connection.asn}` : dash}
            mono
          />
          <Row
            label={L(locale, "timezone")}
            value={data.timezone?.id ? `${data.timezone.id}${data.timezone.utc ? ` (UTC${data.timezone.utc})` : ""}` : dash}
          />
          <Row
            label={L(locale, "coords")}
            value={
              typeof data.latitude === "number" && typeof data.longitude === "number"
                ? `${data.latitude.toFixed(4)}, ${data.longitude.toFixed(4)}`
                : dash
            }
            mono
          />
        </dl>
      )}
    </div>
  );
}

/* ------------------------------ WHOIS (RDAP) ------------------------------ */

type RdapEntity = {
  roles?: string[];
  publicIds?: { type?: string; identifier?: string }[];
  vcardArray?: unknown;
};
type RdapResponse = {
  ldhName?: string;
  unicodeName?: string;
  status?: string[];
  events?: { eventAction?: string; eventDate?: string }[];
  entities?: RdapEntity[];
  nameservers?: { ldhName?: string; unicodeName?: string }[];
  secureDNS?: { delegationSigned?: boolean };
};

function vcardName(entity: RdapEntity): string | null {
  const arr = entity.vcardArray;
  if (!Array.isArray(arr) || arr.length < 2 || !Array.isArray(arr[1])) return null;
  for (const entry of arr[1] as unknown[]) {
    if (Array.isArray(entry) && entry[0] === "fn" && typeof entry[3] === "string" && entry[3].length > 0) {
      return entry[3];
    }
  }
  return null;
}

function WhoisPanel({ locale }: { locale: Locale }) {
  const [domain, setDomain] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [data, setData] = useState<RdapResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(
    async (d: string) => {
      setStatus("loading");
      setError(null);
      try {
        const res = await fetch(`https://rdap.org/domain/${encodeURIComponent(d)}`);
        if (res.status === 404) {
          throw new Error("not-covered");
        }
        if (res.status === 429) {
          throw new Error("rate-limited");
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setData((await res.json()) as RdapResponse);
        setStatus("done");
      } catch (e) {
        setData(null);
        const msg = e instanceof Error ? e.message : "";
        setError(
          msg === "not-covered"
            ? L(locale, "errNotCovered")
            : msg === "rate-limited"
              ? L(locale, "errRateLimited")
              : L(locale, "errNetwork"),
        );
        setStatus("error");
      }
    },
    [locale],
  );

  const submit = () => {
    const d = extractDomain(domain);
    if (!d) {
      setStatus("error");
      setError(L(locale, "errInvalidDomain"));
      setData(null);
      return;
    }
    void run(d);
  };

  const dash = L(locale, "notAvailable");
  const fmtDate = (iso?: string) => {
    if (!iso) return dash;
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return new Intl.DateTimeFormat(HTML_LANG[locale] ?? "en", { dateStyle: "medium" }).format(d);
  };
  const eventDate = (action: string) =>
    fmtDate(data?.events?.find((e) => e.eventAction === action)?.eventDate);

  const registrarEntity = data?.entities?.find((e) => e.roles?.includes("registrar"));
  const registrarName = registrarEntity ? vcardName(registrarEntity) : null;
  const ianaId = registrarEntity?.publicIds?.find((p) => (p.type ?? "").toUpperCase().includes("IANA"))?.identifier;
  const statuses = (data?.status ?? []).slice(0, 8);

  return (
    <div className="space-y-4">
      <Disclosure kind="whois" locale={locale} />
      <div className="flex flex-wrap items-center gap-2">
        <input
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder={L(locale, "queryPlaceholder")}
          className="field mono min-w-[220px] flex-1"
          spellCheck={false}
          autoComplete="off"
          aria-label={L(locale, "queryPlaceholder")}
        />
        <button
          type="button"
          onClick={submit}
          disabled={status === "loading"}
          className="rounded-full bg-[var(--color-accent)] px-5 py-2 text-[13.5px] font-medium text-white transition-colors hover:bg-[var(--color-accent-strong)] disabled:opacity-60"
        >
          {status === "loading" ? L(locale, "querying") : L(locale, "lookup")}
        </button>
      </div>

      {error && <ErrorBox text={error} />}

      {status === "done" && data && (
        <div className="space-y-3">
          <dl className="rounded-xl border hairline px-4 py-1">
            <Row label={L(locale, "domain")} value={data.unicodeName || data.ldhName || dash} mono />
            <Row label={L(locale, "registrar")} value={registrarName || dash} />
            <Row label={L(locale, "ianaId")} value={ianaId || dash} mono />
            <Row label={L(locale, "created")} value={eventDate("registration")} mono />
            <Row label={L(locale, "updated")} value={eventDate("last changed")} mono />
            <Row label={L(locale, "expires")} value={eventDate("expiration")} mono />
            <Row
              label={L(locale, "dnssec")}
              value={
                data.secureDNS?.delegationSigned === undefined
                  ? dash
                  : data.secureDNS.delegationSigned
                    ? L(locale, "yes")
                    : L(locale, "no")
              }
            />
          </dl>

          {statuses.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[13.5px] font-semibold">{L(locale, "status")}:</span>
              {statuses.map((s) => (
                <span
                  key={s}
                  className="mono rounded-full bg-[var(--color-surface)] px-2.5 py-1 text-[12px] text-[var(--color-sub)]"
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          {(data.nameservers?.length ?? 0) > 0 && (
            <div>
              <p className="mb-1.5 text-[13.5px] font-semibold">{L(locale, "nameservers")}</p>
              <ul className="space-y-1">
                {data.nameservers!.slice(0, 10).map((ns, i) => (
                  <li key={i} className="mono text-[13.5px]">
                    {ns.ldhName || ns.unicodeName || dash}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-2.5">
            <CopyButton
              value={() =>
                [
                  `${L(locale, "domain")}: ${data.ldhName ?? ""}`,
                  `${L(locale, "registrar")}: ${registrarName ?? ""}`,
                  `${L(locale, "created")}: ${eventDate("registration")}`,
                  `${L(locale, "updated")}: ${eventDate("last changed")}`,
                  `${L(locale, "expires")}: ${eventDate("expiration")}`,
                  `${L(locale, "nameservers")}: ${(data.nameservers ?? []).map((n) => n.ldhName).join(", ")}`,
                ].join("\n")
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function SecLookupEngine({ kind }: { kind: SecLookupKind }) {
  const { locale } = useI18n();
  return (
    <ToolPanel>
      {kind === "dns" ? (
        <DnsPanel locale={locale} />
      ) : kind === "ip" ? (
        <IpPanel locale={locale} />
      ) : (
        <WhoisPanel locale={locale} />
      )}
    </ToolPanel>
  );
}
