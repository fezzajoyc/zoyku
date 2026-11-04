"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton, downloadBlob } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import type { Locale } from "@/lib/site";
import { loc, type Localized } from "./seo-locale";

type Rule = "none" | "allow" | "block";

type Bot = { id: string; desc: Localized };

const AI_BOTS: Bot[] = [
  { id: "GPTBot", desc: loc("OpenAI · model training", "OpenAI · 模型训练", "OpenAI · モデル学習", "OpenAI · entrenamiento de modelos", "OpenAI · treinamento de modelos") },
  { id: "OAI-SearchBot", desc: loc("OpenAI · search index", "OpenAI · 搜索索引", "OpenAI · 検索インデックス", "OpenAI · índice de búsqueda", "OpenAI · índice de busca") },
  { id: "ChatGPT-User", desc: loc("OpenAI · user-triggered fetch", "OpenAI · 用户触发的抓取", "OpenAI · ユーザー起因の取得", "OpenAI · petición iniciada por el usuario", "OpenAI · acesso iniciado pelo usuário") },
  { id: "ClaudeBot", desc: loc("Anthropic · model training", "Anthropic · 模型训练", "Anthropic · モデル学習", "Anthropic · entrenamiento de modelos", "Anthropic · treinamento de modelos") },
  { id: "Claude-User", desc: loc("Anthropic · user-triggered fetch", "Anthropic · 用户触发的抓取", "Anthropic · ユーザー起因の取得", "Anthropic · petición iniciada por el usuario", "Anthropic · acesso iniciado pelo usuário") },
  { id: "PerplexityBot", desc: loc("Perplexity · answer engine", "Perplexity · 答案引擎", "Perplexity · 検索エンジン", "Perplexity · motor de respuestas", "Perplexity · motor de respostas") },
  { id: "Google-Extended", desc: loc("Google · AI training (not Search)", "Google · AI 训练(不影响搜索)", "Google · AI 学習(検索には影響なし)", "Google · entrenamiento de IA (no Búsqueda)", "Google · treinamento de IA (não afeta a Busca)") },
  { id: "CCBot", desc: loc("Common Crawl · open dataset", "Common Crawl · 开放数据集", "Common Crawl · オープンデータセット", "Common Crawl · conjunto de datos abierto", "Common Crawl · conjunto de dados aberto") },
  { id: "Applebot-Extended", desc: loc("Apple · AI training", "Apple · AI 训练", "Apple · AI 学習", "Apple · entrenamiento de IA", "Apple · treinamento de IA") },
  { id: "Bytespider", desc: loc("ByteDance · aggressive crawler", "字节跳动 · 高频抓取", "ByteDance · 高頻度クローラー", "ByteDance · rastreador agresivo", "ByteDance · rastreador agressivo") },
  { id: "Amazonbot", desc: loc("Amazon · AI and Alexa", "Amazon · AI 与 Alexa", "Amazon · AI と Alexa", "Amazon · IA y Alexa", "Amazon · IA e Alexa") },
  { id: "FacebookBot", desc: loc("Meta · AI training", "Meta · AI 训练", "Meta · AI 学習", "Meta · entrenamiento de IA", "Meta · treinamento de IA") },
  { id: "meta-externalagent", desc: loc("Meta · AI training (new)", "Meta · AI 训练(新)", "Meta · AI 学習(新)", "Meta · entrenamiento de IA (nuevo)", "Meta · treinamento de IA (novo)") },
];

const TRAINING_BOTS = [
  "GPTBot", "ClaudeBot", "Google-Extended", "CCBot", "Applebot-Extended",
  "Bytespider", "Amazonbot", "FacebookBot", "meta-externalagent",
];

const L = {
  preset: loc("Presets", "预设", "プリセット", "Ajustes predefinidos", "Predefinições"),
  allowAll: loc("Allow all", "全部允许", "すべて許可", "Permitir todo", "Permitir tudo"),
  blockAI: loc("Block AI training bots", "屏蔽 AI 训练爬虫", "AI 学習ボットをブロック", "Bloquear bots de entrenamiento de IA", "Bloquear bots de treinamento de IA"),
  blockAll: loc("Block everything", "全部禁止", "すべて拒否", "Bloquear todo", "Bloquear tudo"),
  siteWide: loc("Site-wide rules (User-agent: *)", "全站规则(User-agent: *)", "サイト全体のルール(User-agent: *)", "Reglas de todo el sitio (User-agent: *)", "Regras de todo o site (User-agent: *)"),
  rootAllow: loc("Allow all pages", "允许所有页面", "すべてのページを許可", "Permitir todas las páginas", "Permitir todas as páginas"),
  rootBlock: loc("Block the whole site", "禁止抓取全站", "サイト全体を拒否", "Bloquear todo el sitio", "Bloquear todo o site"),
  paths: loc("Disallow paths (one per line)", "Disallow 路径(每行一条)", "Disallow パス(1 行に 1 件)", "Rutas Disallow (una por línea)", "Caminhos Disallow (um por linha)"),
  pathsPh: loc("/wp-admin/\n/cart\n/checkout", "/wp-admin/\n/cart\n/checkout", "/wp-admin/\n/cart\n/checkout", "/wp-admin/\n/cart\n/checkout", "/wp-admin/\n/cart\n/checkout"),
  delay: loc("Crawl-delay (seconds)", "Crawl-delay(秒)", "Crawl-delay(秒)", "Crawl-delay (segundos)", "Crawl-delay (segundos)"),
  delayHint: loc("Honored by Bing and Yandex; Google ignores it.", "Bing 和 Yandex 会遵守;Google 会忽略它。", "Bing と Yandex は従いますが、Google は無視します。", "Bing y Yandex lo respetan; Google lo ignora.", "Bing e Yandex respeitam; o Google ignora."),
  sitemap: loc("Sitemap URL (absolute)", "Sitemap URL(绝对地址)", "サイトマップ URL(絶対 URL)", "URL del sitemap (absoluta)", "URL do sitemap (absoluta)"),
  aiTitle: loc("AI crawlers", "AI 爬虫", "AI クローラー", "Rastreadores de IA", "Rastreadores de IA"),
  allow: loc("Allow", "允许", "許可", "Permitir", "Permitir"),
  block: loc("Block", "屏蔽", "ブロック", "Bloquear", "Bloquear"),
  blockListed: loc("Block all listed", "全部屏蔽", "一括ブロック", "Bloquear todos", "Bloquear todos"),
  allowListed: loc("Allow all listed", "全部允许", "一括許可", "Permitir todos", "Permitir todos"),
  clearAI: loc("Clear AI rules", "清除 AI 规则", "AI ルールをクリア", "Borrar reglas de IA", "Limpar regras de IA"),
  none: "—",
} as const;

/** robots.txt 生成:预设 + 逐个 AI 爬虫 allow/block + 全站规则 + sitemap */
export function SeoRobotsEngine() {
  const { locale, t } = useI18n();
  const [rules, setRules] = useState<Record<string, Rule>>({});
  const [rootBlock, setRootBlock] = useState(false);
  const [paths, setPaths] = useState("");
  const [crawlDelay, setCrawlDelay] = useState("");
  const [sitemap, setSitemap] = useState("");

  const setAll = (r: Rule, ids: string[]) => {
    const next: Record<string, Rule> = {};
    for (const id of ids) next[id] = r;
    setRules(next);
  };

  const presetAllowAll = () => {
    setRules({});
    setRootBlock(false);
  };
  const presetBlockAI = () => {
    const next: Record<string, Rule> = {};
    for (const b of AI_BOTS) next[b.id] = TRAINING_BOTS.includes(b.id) ? "block" : "allow";
    setRules(next);
    setRootBlock(false);
  };
  const presetBlockAll = () => {
    setRules({});
    setRootBlock(true);
  };

  const output = useMemo(() => {
    const lines: string[] = ["User-agent: *", rootBlock ? "Disallow: /" : "Disallow:"];
    if (!rootBlock) {
      for (const raw of paths.split(/\r?\n/)) {
        const p = raw.trim();
        if (p && !p.startsWith("#")) lines.push(`Disallow: ${p}`);
      }
    }
    const delay = parseInt(crawlDelay, 10);
    if (Number.isFinite(delay) && delay > 0) lines.push(`Crawl-delay: ${delay}`);

    const blocked = AI_BOTS.filter((b) => rules[b.id] === "block");
    const allowed = AI_BOTS.filter((b) => rules[b.id] === "allow");
    for (const group of [blocked, allowed]) {
      if (group.length === 0) continue;
      lines.push("");
      for (const b of group) lines.push(`User-agent: ${b.id}`);
      lines.push(group === blocked ? "Disallow: /" : "Disallow:");
    }
    const sm = sitemap.trim();
    if (sm) {
      lines.push("");
      lines.push(`Sitemap: ${sm}`);
    }
    return lines.join("\n");
  }, [rules, rootBlock, paths, crawlDelay, sitemap]);

  const segBtn = (active: boolean) =>
    `rounded-full border px-3 py-1 text-[12.5px] font-medium transition-colors ${
      active
        ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
        : "hairline hover:bg-[var(--color-surface)]"
    }`;

  return (
    <ToolPanel>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="min-w-0 space-y-5">
          <div>
            <p className="mb-2 text-[13.5px] font-semibold">{L.preset[locale] ?? L.preset.en}</p>
            <div className="flex flex-wrap gap-2">
              <button type="button" className={segBtn(false)} onClick={presetAllowAll}>{L.allowAll[locale] ?? L.allowAll.en}</button>
              <button type="button" className={segBtn(false)} onClick={presetBlockAI}>{L.blockAI[locale] ?? L.blockAI.en}</button>
              <button type="button" className={segBtn(false)} onClick={presetBlockAll}>{L.blockAll[locale] ?? L.blockAll.en}</button>
            </div>
          </div>

          <div>
            <p className="mb-2 text-[13.5px] font-semibold">{L.siteWide[locale] ?? L.siteWide.en}</p>
            <div className="flex flex-wrap gap-2">
              <button type="button" className={segBtn(!rootBlock)} onClick={() => setRootBlock(false)}>{L.rootAllow[locale] ?? L.rootAllow.en}</button>
              <button type="button" className={segBtn(rootBlock)} onClick={() => setRootBlock(true)}>{L.rootBlock[locale] ?? L.rootBlock.en}</button>
            </div>
            <label className="mt-3 block">
              <span className="mb-1 block text-[13px] text-[var(--color-sub)]">{L.paths[locale] ?? L.paths.en}</span>
              <textarea
                className="field mono"
                rows={4}
                value={paths}
                placeholder={L.pathsPh[locale] ?? L.pathsPh.en}
                spellCheck={false}
                disabled={rootBlock}
                onChange={(e) => setPaths(e.target.value)}
              />
            </label>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-[13px] text-[var(--color-sub)]">{L.delay[locale] ?? L.delay.en}</span>
                <input
                  className="field bare"
                  type="number"
                  min={0}
                  value={crawlDelay}
                  placeholder="0"
                  onChange={(e) => setCrawlDelay(e.target.value)}
                />
                <span className="mt-1 block text-[12px] leading-4 text-[var(--color-sub)]">{L.delayHint[locale] ?? L.delayHint.en}</span>
              </label>
              <label className="block">
                <span className="mb-1 block text-[13px] text-[var(--color-sub)]">{L.sitemap[locale] ?? L.sitemap.en}</span>
                <input
                  className="field"
                  type="text"
                  value={sitemap}
                  placeholder="https://example.com/sitemap.xml"
                  spellCheck={false}
                  onChange={(e) => setSitemap(e.target.value)}
                />
              </label>
            </div>
          </div>

          <div>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <p className="text-[13.5px] font-semibold">{L.aiTitle[locale] ?? L.aiTitle.en}</p>
              <div className="flex flex-wrap gap-1.5">
                <button type="button" className={segBtn(false)} onClick={() => setAll("block", AI_BOTS.map((b) => b.id))}>{L.blockListed[locale] ?? L.blockListed.en}</button>
                <button type="button" className={segBtn(false)} onClick={() => setAll("allow", AI_BOTS.map((b) => b.id))}>{L.allowListed[locale] ?? L.allowListed.en}</button>
                <button type="button" className={segBtn(false)} onClick={() => setRules({})}>{L.clearAI[locale] ?? L.clearAI.en}</button>
              </div>
            </div>
            <ul>
              {AI_BOTS.map((b) => (
                <li key={b.id} className="flex items-center gap-3 border-t hairline py-2 first:border-t-0">
                  <span className="min-w-0 flex-1">
                    <span className="mono block text-[13.5px] font-semibold">{b.id}</span>
                    <span className="block text-[12px] leading-4 text-[var(--color-sub)]">
                      {b.desc[locale] ?? b.desc.en}
                    </span>
                  </span>
                  <span className="flex flex-none gap-1">
                    {(["none", "allow", "block"] as Rule[]).map((r) => (
                      <button
                        key={r}
                        type="button"
                        className={`${segBtn((rules[b.id] ?? "none") === r)} ${
                          r === "block" && (rules[b.id] ?? "none") === r ? "bg-[var(--color-bad)]" : ""
                        }`}
                        onClick={() => setRules((s) => ({ ...s, [b.id]: r }))}
                      >
                        {r === "none" ? L.none : r === "allow" ? L.allow[locale] ?? L.allow.en : L.block[locale] ?? L.block.en}
                      </button>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="min-w-0">
          <p className="mb-1.5 text-[13.5px] font-semibold">robots.txt</p>
          <textarea
            className="field mono min-h-[28rem] bg-[var(--color-surface)]"
            rows={20}
            value={output}
            readOnly
            spellCheck={false}
            aria-label={t.common.output}
          />
          <div className="mt-3 flex flex-wrap gap-2.5">
            <CopyButton value={output} />
            <button
              type="button"
              onClick={() => downloadBlob(new Blob([output], { type: "text/plain" }), "robots.txt")}
              className="inline-flex items-center gap-1.5 rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
            >
              {t.common.download}
            </button>
          </div>
        </div>
      </div>
    </ToolPanel>
  );
}
