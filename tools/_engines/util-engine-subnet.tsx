"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { Note, TextIn, Tabs, pick } from "./calc-ui";
import {
  intToIp,
  parseCidr,
  smallestCidr,
  subnetInfo,
} from "../_lib/subnet";

export function UtilEngineSubnet() {
  const { locale } = useI18n();
  const [mode, setMode] = useState("single");
  const [cidr, setCidr] = useState("192.168.1.0/24");
  const [ipA, setIpA] = useState("10.1.2.3");
  const [ipB, setIpB] = useState("10.1.9.200");

  const L = {
    single: pick(locale, { en: "CIDR details", zh: "CIDR 详情", ja: "CIDR詳細", es: "Detalles CIDR", pt: "Detalhes CIDR" }),
    range: pick(locale, { en: "Smallest covering CIDR", zh: "最小覆盖 CIDR", ja: "最小包含CIDR", es: "CIDR mínimo que cubre", pt: "Menor CIDR que cobre" }),
    cidr: pick(locale, { en: "CIDR or IP (e.g. 192.168.1.0/24)", zh: "CIDR 或 IP(如 192.168.1.0/24)", ja: "CIDR または IP(例: 192.168.1.0/24)", es: "CIDR o IP (p. ej. 192.168.1.0/24)", pt: "CIDR ou IP (ex.: 192.168.1.0/24)" }),
    ipA: pick(locale, { en: "First IP", zh: "第一个 IP", ja: "1つ目のIP", es: "Primera IP", pt: "Primeiro IP" }),
    ipB: pick(locale, { en: "Second IP", zh: "第二个 IP", ja: "2つ目のIP", es: "Segunda IP", pt: "Segundo IP" }),
    invalid: pick(locale, {
      en: "Invalid input — use dotted-quad IPv4 with an optional /0–32 prefix.",
      zh: "输入无效——请使用点分十进制 IPv4,可带 /0–32 前缀。",
      ja: "入力が無効です。ドット区切りのIPv4と任意の /0〜32 プレフィックスで指定してください。",
      es: "Entrada no válida: use IPv4 con prefijo /0–32 opcional.",
      pt: "Entrada inválida — use IPv4 com prefixo /0–32 opcional.",
    }),
    network: pick(locale, { en: "Network address", zh: "网络地址", ja: "ネットワークアドレス", es: "Dirección de red", pt: "Endereço de rede" }),
    broadcast: pick(locale, { en: "Broadcast address", zh: "广播地址", ja: "ブロードキャスト", es: "Dirección de difusión", pt: "Endereço de broadcast" }),
    mask: pick(locale, { en: "Subnet mask", zh: "子网掩码", ja: "サブネットマスク", es: "Máscara de subred", pt: "Máscara de sub-rede" }),
    wildcard: pick(locale, { en: "Wildcard mask", zh: "通配符掩码", ja: "ワイルドカードマスク", es: "Máscara wildcard", pt: "Máscara curinga" }),
    usable: pick(locale, { en: "Usable hosts", zh: "可用主机数", ja: "利用可能ホスト数", es: "Hosts utilizables", pt: "Hosts utilizáveis" }),
    total: pick(locale, { en: "Total addresses", zh: "总地址数", ja: "総アドレス数", es: "Direcciones totales", pt: "Total de endereços" }),
    rangeL: pick(locale, { en: "Host range", zh: "主机范围", ja: "ホスト範囲", es: "Rango de hosts", pt: "Faixa de hosts" }),
    cls: pick(locale, { en: "IP class", zh: "IP 类", ja: "IPクラス", es: "Clase IP", pt: "Classe IP" }),
    priv: pick(locale, { en: "Private range", zh: "私网地址", ja: "プライベート範囲", es: "Rango privado", pt: "Faixa privada" }),
    yes: pick(locale, { en: "Yes", zh: "是", ja: "はい", es: "Sí", pt: "Sim" }),
    no: pick(locale, { en: "No", zh: "否", ja: "いいえ", es: "No", pt: "Não" }),
    note: pick(locale, {
      en: "For /31 and /32 subnets every address is usable (RFC 3021 point-to-point and single-host routes). Classful A/B/C/D/E is shown for reference only — modern routing is classless.",
      zh: "/31 与 /32 网段的全部地址均可用(RFC 3021 点对点与单主机路由)。A/B/C/D/E 分类仅作参考——现代路由已是无类别(CIDR)。",
      ja: "/31 と /32 では全アドレスが利用可能です(RFC 3021)。クラスA〜Eは参考表示で、現代のルーティングはクラスレスです。",
      es: "En /31 y /32 todas las direcciones son utilizables (RFC 3021). Las clases A–E son solo referencial: el enrutamiento moderno es classless.",
      pt: "Em /31 e /32 todos os endereços são utilizáveis (RFC 3021). As classes A–E são só referência — o roteamento moderno é classless.",
    }),
  };

  let body: React.ReactNode;

  if (mode === "single") {
    const parsed = parseCidr(cidr);
    if (!parsed) {
      body = <p className="text-[13.5px] leading-5 text-[var(--color-bad)]" role="alert">{L.invalid}</p>;
    } else {
      const info = subnetInfo(parsed.ip, parsed.prefix);
      body = (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <StatRow label={L.network} value={intToIp(info.network)} accent copy />
            <StatRow label={L.broadcast} value={intToIp(info.broadcast)} copy />
            <StatRow label={L.mask} value={intToIp(info.mask)} copy />
            <StatRow label={L.wildcard} value={intToIp(info.wildcard)} copy />
            <StatRow label={L.rangeL} value={`${intToIp(info.firstHost)} – ${intToIp(info.lastHost)}`} copy />
            <StatRow label={L.usable} value={info.usableHosts.toLocaleString(locale)} />
          </div>
          <div className="mt-3 grid gap-4 sm:grid-cols-4">
            <StatRow label={L.total} value={info.totalHosts.toLocaleString(locale)} />
            <StatRow label={`/${info.prefix}`} value={`prefix ${info.prefix}`} />
            <StatRow label={L.cls} value={info.ipClass} />
            <StatRow label={L.priv} value={info.isPrivate ? L.yes : L.no} tone={info.isPrivate ? "good" : undefined} />
          </div>
          <div className="mt-3">
            <Note>{L.note}</Note>
          </div>
        </>
      );
    }
  } else {
    const a = parseCidr(ipA);
    const b = parseCidr(ipB);
    if (!a || !b || a.prefix !== 32 || b.prefix !== 32) {
      body = <p className="text-[13.5px] leading-5 text-[var(--color-bad)]" role="alert">{L.invalid}</p>;
    } else {
      const r = smallestCidr(a.ip, b.ip);
      body = (
        <>
          <div className="rounded-xl border hairline px-4 py-3.5">
            <span className="text-[13px] font-medium text-[var(--color-sub)]">{L.range}</span>
            <div className="mt-1.5 flex flex-wrap items-center gap-3">
              <span className="mono text-[20px] font-semibold" aria-live="polite">
                {intToIp(r.network)}/{r.prefix}
              </span>
              <CopyButton value={`${intToIp(r.network)}/${r.prefix}`} />
            </div>
          </div>
          <div className="mt-3">
            <Note>
              {pick(locale, {
                en: "The smallest block that contains both addresses, aligned to its own network boundary — handy for firewall rules and route summaries.",
                zh: "包含两个地址且按自身网络边界对齐的最小块——适合写防火墙规则与路由汇总。",
                ja: "両アドレスを含み、自身のネットワーク境界に整列した最小ブロック。FW規則や経路集約に便利です。",
                es: "El bloque mínimo que contiene ambas direcciones, alineado a su propio borde de red: útil para reglas de firewall y resúmenes de rutas.",
                pt: "O menor bloco que contém ambos os endereços, alinhado ao próprio limite de rede — útil para regras de firewall e sumarização de rotas.",
              })}
            </Note>
          </div>
        </>
      );
    }
  }

  return (
    <ToolPanel>
      <Tabs
        options={[
          { id: "single", label: L.single },
          { id: "range", label: L.range },
        ]}
        value={mode}
        onChange={setMode}
      />
      {mode === "single" ? (
        <TextIn value={cidr} onChange={setCidr} aria="cidr" mono placeholder="192.168.1.0/24" />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          <TextIn value={ipA} onChange={setIpA} aria="first ip" mono placeholder="10.1.2.3" />
          <TextIn value={ipB} onChange={setIpB} aria="second ip" mono placeholder="10.1.9.200" />
        </div>
      )}
      <div className="mt-5">{body}</div>
    </ToolPanel>
  );
}

function StatRow({
  label,
  value,
  accent,
  copy,
  tone,
}: {
  label: string;
  value: string;
  accent?: boolean;
  copy?: boolean;
  tone?: "good";
}) {
  return (
    <div className="rounded-xl border hairline px-3.5 py-3">
      <div className="text-[12.5px] font-medium text-[var(--color-sub)]">{label}</div>
      <div
        className={`mono mt-1 flex items-center gap-2 text-[17px] font-semibold leading-6 ${
          accent ? "text-[var(--color-accent-strong)]" : tone === "good" ? "text-[var(--color-good)]" : ""
        }`}
        aria-live="polite"
      >
        <span className="break-all">{value}</span>
        {copy && <CopyButton value={value} className="!px-2 !py-0.5 text-[11.5px]" />}
      </div>
    </div>
  );
}
