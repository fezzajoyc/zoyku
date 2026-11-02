"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { loc, tr } from "./seo-locale";
import type { TagField } from "./seo-engine-tags";

type TypeId = "Organization" | "LocalBusiness" | "Product" | "Article" | "FAQPage" | "HowTo";

const TYPES: { id: TypeId; label: TagField["label"] }[] = [
  { id: "Organization", label: loc("Organization", "组织", "組織", "Organización", "Organização") },
  { id: "LocalBusiness", label: loc("Local business", "本地商家", "ローカルビジネス", "Negocio local", "Negócio local") },
  { id: "Product", label: loc("Product", "商品", "製品", "Producto", "Produto") },
  { id: "Article", label: loc("Article", "文章", "記事", "Artículo", "Artigo") },
  { id: "FAQPage", label: loc("FAQ page", "FAQ 页面", "FAQ ページ", "Página FAQ", "Página de FAQ") },
  { id: "HowTo", label: loc("How-to", "操作指南", "ハウツー", "Guía paso a paso", "Guia passo a passo") },
];

const FIELDS: Record<TypeId, TagField[]> = {
  Organization: [
    { key: "name", label: loc("Name *", "名称 *", "名前 *", "Nombre *", "Nome *"), placeholder: loc("Acme Inc.", "Acme Inc.", "Acme Inc.", "Acme Inc.", "Acme Inc.") },
    { key: "url", label: loc("Website URL", "网站 URL", "サイトの URL", "URL del sitio", "URL do site"), placeholder: "https://example.com" },
    { key: "logo", label: loc("Logo URL", "Logo URL", "ロゴの URL", "URL del logo", "URL do logo"), placeholder: "https://example.com/logo.png" },
    { key: "description", label: loc("Description", "描述", "説明", "Descripción", "Descrição"), type: "textarea", rows: 2 },
    { key: "email", label: loc("Email", "邮箱", "メールアドレス", "Correo electrónico", "E-mail"), placeholder: "hello@example.com" },
    { key: "telephone", label: loc("Telephone", "电话", "電話番号", "Teléfono", "Telefone"), placeholder: "+1-555-0100" },
    { key: "sameAs", label: loc("Social profiles", "社交主页", "SNS プロフィール", "Perfiles sociales", "Perfis sociais"), type: "textarea", rows: 2, hint: loc("One profile URL per line.", "每行一个主页 URL。", "1 行に 1 つの URL。", "Una URL por línea.", "Uma URL por linha.") },
  ],
  LocalBusiness: [
    { key: "name", label: loc("Name *", "名称 *", "名前 *", "Nombre *", "Nome *") },
    { key: "image", label: loc("Photo URL", "照片 URL", "写真の URL", "URL de la foto", "URL da foto") },
    { key: "url", label: loc("Website URL", "网站 URL", "サイトの URL", "URL del sitio", "URL do site") },
    { key: "telephone", label: loc("Telephone", "电话", "電話番号", "Teléfono", "Telefone"), placeholder: "+1-555-0100" },
    { key: "priceRange", label: loc("Price range", "价位", "価格帯", "Rango de precios", "Faixa de preço"), placeholder: "$$" },
    { key: "street", label: loc("Street address", "街道地址", "番地", "Calle y número", "Endereço") },
    { key: "city", label: loc("City", "城市", "市区町村", "Ciudad", "Cidade") },
    { key: "region", label: loc("State / region", "省州 / 地区", "都道府県", "Provincia / región", "Estado / região") },
    { key: "postal", label: loc("Postal code", "邮政编码", "郵便番号", "Código postal", "CEP") },
    { key: "country", label: loc("Country code", "国家代码", "国コード", "Código de país", "Código do país"), placeholder: "US" },
    { key: "lat", label: loc("Latitude", "纬度", "緯度", "Latitud", "Latitude"), placeholder: "37.7749" },
    { key: "lng", label: loc("Longitude", "经度", "経度", "Longitud", "Longitude"), placeholder: "-122.4194" },
    { key: "openingHours", label: loc("Opening hours", "营业时间", "営業時間", "Horario", "Horário"), type: "textarea", rows: 2, placeholder: "Mo-Fr 09:00-18:00\nSa 10:00-14:00", hint: loc("One rule per line.", "每行一条。", "1 行に 1 件。", "Una regla por línea.", "Uma regra por linha.") },
  ],
  Product: [
    { key: "name", label: loc("Name *", "名称 *", "名前 *", "Nombre *", "Nome *") },
    { key: "image", label: loc("Image URL", "图片 URL", "画像の URL", "URL de la imagen", "URL da imagem") },
    { key: "description", label: loc("Description", "描述", "説明", "Descripción", "Descrição"), type: "textarea", rows: 2 },
    { key: "brand", label: loc("Brand", "品牌", "ブランド", "Marca", "Marca") },
    { key: "sku", label: loc("SKU", "SKU", "SKU", "SKU", "SKU") },
    { key: "price", label: loc("Price", "价格", "価格", "Precio", "Preço"), placeholder: "29.90" },
    { key: "currency", label: loc("Currency (ISO)", "货币(ISO)", "通貨(ISO)", "Moneda (ISO)", "Moeda (ISO)"), default: "USD" },
    {
      key: "availability",
      label: loc("Availability", "库存状态", "在庫状況", "Disponibilidad", "Disponibilidade"),
      type: "select",
      default: "InStock",
      options: [
        { value: "InStock", label: loc("In stock", "有货", "在庫あり", "En stock", "Em estoque") },
        { value: "OutOfStock", label: loc("Out of stock", "缺货", "在庫切れ", "Agotado", "Esgotado") },
        { value: "PreOrder", label: loc("Preorder", "预售", "予約販売", "Reserva", "Pré-venda") },
        { value: "Discontinued", label: loc("Discontinued", "停产", "生産終了", "Descatalogado", "Descontinuado") },
      ],
    },
    { key: "url", label: loc("Product page URL", "商品页 URL", "商品ページの URL", "URL de la ficha", "URL da página do produto") },
  ],
  Article: [
    { key: "headline", label: loc("Headline *", "标题 *", "見出し *", "Titular *", "Título *") },
    { key: "description", label: loc("Description", "描述", "説明", "Descripción", "Descrição"), type: "textarea", rows: 2 },
    { key: "image", label: loc("Featured image URL", "主图 URL", "アイキャッチ画像の URL", "URL de la imagen destacada", "URL da imagem destacada") },
    { key: "authorName", label: loc("Author name *", "作者 *", "著者名 *", "Autor *", "Autor *") },
    { key: "authorUrl", label: loc("Author URL", "作者主页", "著者の URL", "URL del autor", "URL do autor") },
    { key: "publisherName", label: loc("Publisher name *", "发布方名称 *", "発行者名 *", "Editorial *", "Editora *") },
    { key: "publisherLogo", label: loc("Publisher logo URL", "发布方 Logo URL", "発行者ロゴの URL", "URL del logo", "URL do logo") },
    { key: "datePublished", label: loc("Date published", "发布日期", "公開日", "Fecha de publicación", "Data de publicação"), type: "date" },
    { key: "dateModified", label: loc("Date modified", "修改日期", "更新日", "Fecha de modificación", "Data de modificação"), type: "date" },
  ],
  FAQPage: [],
  HowTo: [
    { key: "name", label: loc("How-to title *", "指南标题 *", "ハウツーのタイトル *", "Título *", "Título *") },
    { key: "description", label: loc("Description", "描述", "説明", "Descripción", "Descrição"), type: "textarea", rows: 2 },
    { key: "image", label: loc("Image URL", "图片 URL", "画像の URL", "URL de la imagen", "URL da imagem") },
  ],
};

const L = {
  q: loc("Question", "问题", "質問", "Pregunta", "Pergunta"),
  a: loc("Answer", "答案", "回答", "Respuesta", "Resposta"),
  addQ: loc("Add question", "添加问题", "質問を追加", "Añadir pregunta", "Adicionar pergunta"),
  stepName: loc("Step name (optional)", "步骤名(可选)", "ステップ名(任意)", "Nombre del paso (opcional)", "Nome do passo (opcional)"),
  stepText: loc("Step description", "步骤说明", "手順の説明", "Descripción del paso", "Descrição do passo"),
  addStep: loc("Add step", "添加步骤", "ステップを追加", "Añadir paso", "Adicionar passo"),
  remove: loc("Remove", "删除", "削除", "Eliminar", "Remover"),
  jsonld: loc("JSON-LD output", "JSON-LD 输出", "JSON-LD 出力", "Salida JSON-LD", "Saída JSON-LD"),
  hint: loc("Empty fields are left out of the object. Validate with the Rich Results Test before deploying.", "留空的字段不会写入对象。上线前请用 Rich Results Test 验证。", "空欄の項目は出力に含まれません。公開前にリッチリザルトテストで検証してください。", "Los campos vacíos se omiten. Valida con la Prueba de resultados enriquecidos antes de publicar.", "Campos vazios ficam de fora. Valide com o Teste de resultados avançados antes de publicar."),
} as const;

type FaqRow = { q: string; a: string };
type StepRow = { name: string; text: string };

function compact(o: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(o).filter(
      ([, v]) => v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && v.length === 0),
    ),
  );
}

const splitLines = (s: string) => s.split(/\r?\n/).map((x) => x.trim()).filter(Boolean);

function build(
  type: TypeId,
  v: Record<string, string>,
  faq: FaqRow[],
  steps: StepRow[],
): Record<string, unknown> | null {
  const g = (k: string) => (v[k] ?? "").trim();
  switch (type) {
    case "Organization": {
      if (!g("name")) return null;
      return compact({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: g("name"),
        url: g("url"),
        logo: g("logo"),
        description: g("description"),
        email: g("email"),
        telephone: g("telephone"),
        sameAs: splitLines(g("sameAs")),
      });
    }
    case "LocalBusiness": {
      if (!g("name")) return null;
      const address = compact({
        "@type": "PostalAddress",
        streetAddress: g("street"),
        addressLocality: g("city"),
        addressRegion: g("region"),
        postalCode: g("postal"),
        addressCountry: g("country"),
      });
      return compact({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: g("name"),
        image: g("image"),
        url: g("url"),
        telephone: g("telephone"),
        priceRange: g("priceRange"),
        address: Object.keys(address).length > 1 ? address : undefined,
        geo:
          g("lat") && g("lng")
            ? { "@type": "GeoCoordinates", latitude: g("lat"), longitude: g("lng") }
            : undefined,
        openingHours: splitLines(g("openingHours")),
      });
    }
    case "Product": {
      if (!g("name")) return null;
      const offers = compact({
        "@type": "Offer",
        url: g("url"),
        price: g("price"),
        priceCurrency: g("currency"),
        availability: g("availability") ? `https://schema.org/${g("availability")}` : "",
      });
      return compact({
        "@context": "https://schema.org",
        "@type": "Product",
        name: g("name"),
        image: g("image"),
        description: g("description"),
        sku: g("sku"),
        brand: g("brand") ? { "@type": "Brand", name: g("brand") } : undefined,
        offers: Object.keys(offers).length > 1 ? offers : undefined,
      });
    }
    case "Article": {
      if (!g("headline") || !g("authorName") || !g("publisherName")) return null;
      return compact({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: g("headline"),
        description: g("description"),
        image: g("image"),
        author: compact({ "@type": "Person", name: g("authorName"), url: g("authorUrl") }),
        publisher: compact({ "@type": "Organization", name: g("publisherName"), logo: g("publisherLogo") }),
        datePublished: g("datePublished"),
        dateModified: g("dateModified"),
      });
    }
    case "FAQPage": {
      const rows = faq.filter((r) => r.q.trim() && r.a.trim());
      if (rows.length === 0) return null;
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: rows.map((r) => ({
          "@type": "Question",
          name: r.q.trim(),
          acceptedAnswer: { "@type": "Answer", text: r.a.trim() },
        })),
      };
    }
    case "HowTo": {
      if (!g("name")) return null;
      const rows = steps.filter((s) => s.text.trim());
      if (rows.length === 0) return null;
      return compact({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: g("name"),
        description: g("description"),
        image: g("image"),
        step: rows.map((s, i) =>
          compact({ "@type": "HowToStep", position: i + 1, name: s.name.trim(), text: s.text.trim() }),
        ),
      });
    }
  }
}

/** JSON-LD 结构化数据生成:六种 schema.org 类型,字段 → 对象 → 转义后的脚本块 */
export function SeoSchemaEngine() {
  const { locale, t } = useI18n();
  const [type, setType] = useState<TypeId>("Organization");
  const [vals, setVals] = useState<Record<string, string>>({});
  const [faq, setFaq] = useState<FaqRow[]>([{ q: "", a: "" }]);
  const [steps, setSteps] = useState<StepRow[]>([{ name: "", text: "" }]);

  const set = (key: string, v: string) => setVals((s) => ({ ...s, [key]: v }));
  const Lz = (v: Parameters<typeof tr>[1]) => tr(locale, v);

  const output = useMemo(() => {
    const obj = build(type, vals, faq, steps);
    if (!obj) return "";
    const json = JSON.stringify(obj, null, 2)
      .replace(/</g, "\\u003c")
      .replace(/>/g, "\\u003e")
      .replace(/&/g, "\\u0026");
    return `<script type="application/ld+json">\n${json}\n</script>`;
  }, [type, vals, faq, steps]);

  const segBtn = (active: boolean) =>
    `rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
      active
        ? "border-transparent bg-[var(--color-ink)] text-white"
        : "hairline hover:bg-[var(--color-surface)]"
    }`;

  return (
    <ToolPanel>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="min-w-0 space-y-4">
          <div className="flex flex-wrap gap-2">
            {TYPES.map((tp) => (
              <button key={tp.id} type="button" className={segBtn(type === tp.id)} onClick={() => setType(tp.id)}>
                {Lz(tp.label)}
              </button>
            ))}
          </div>

          {FIELDS[type].map((f) => (
            <label key={f.key} className="block">
              <span className="mb-1 block text-[13.5px] font-semibold">{Lz(f.label)}</span>
              {f.type === "textarea" ? (
                <textarea
                  className="field"
                  rows={f.rows ?? 2}
                  value={vals[f.key] ?? ""}
                  placeholder={f.placeholder ? Lz(f.placeholder) : ""}
                  onChange={(e) => set(f.key, e.target.value)}
                />
              ) : f.type === "select" ? (
                <select
                  className="field"
                  value={vals[f.key] ?? f.default ?? ""}
                  onChange={(e) => set(f.key, e.target.value)}
                >
                  {(f.options ?? []).map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label ? Lz(o.label) : o.value}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  className="field"
                  type={f.type === "date" ? "date" : "text"}
                  value={vals[f.key] ?? ""}
                  placeholder={f.placeholder ? Lz(f.placeholder) : ""}
                  spellCheck={false}
                  onChange={(e) => set(f.key, e.target.value)}
                />
              )}
              {f.hint && (
                <span className="mt-1 block text-[12.5px] leading-4 text-[var(--color-sub)]">{Lz(f.hint)}</span>
              )}
            </label>
          ))}

          {type === "FAQPage" && (
            <div className="space-y-3">
              {faq.map((row, i) => (
                <div key={i} className="rounded-xl bg-[var(--color-surface)] p-3">
                  <div className="flex items-start gap-2">
                    <div className="min-w-0 flex-1 space-y-2">
                      <input
                        className="field"
                        type="text"
                        value={row.q}
                        placeholder={L.q[locale] ?? L.q.en}
                        onChange={(e) =>
                          setFaq((s) => s.map((r, j) => (j === i ? { ...r, q: e.target.value } : r)))
                        }
                      />
                      <textarea
                        className="field"
                        rows={2}
                        value={row.a}
                        placeholder={L.a[locale] ?? L.a.en}
                        onChange={(e) =>
                          setFaq((s) => s.map((r, j) => (j === i ? { ...r, a: e.target.value } : r)))
                        }
                      />
                    </div>
                    <button
                      type="button"
                      aria-label={L.remove[locale] ?? L.remove.en}
                      className="flex-none rounded-full border hairline px-2.5 py-1 text-[13px] text-[var(--color-sub)] transition-colors hover:bg-[var(--color-card)]"
                      onClick={() => setFaq((s) => (s.length > 1 ? s.filter((_, j) => j !== i) : s))}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
              <button type="button" className={segBtn(false)} onClick={() => setFaq((s) => [...s, { q: "", a: "" }])}>
                + {L.addQ[locale] ?? L.addQ.en}
              </button>
            </div>
          )}

          {type === "HowTo" && (
            <div className="space-y-3">
              {steps.map((row, i) => (
                <div key={i} className="rounded-xl bg-[var(--color-surface)] p-3">
                  <div className="flex items-start gap-2">
                    <span className="mono mt-2.5 flex-none text-[13px] font-semibold">{i + 1}</span>
                    <div className="min-w-0 flex-1 space-y-2">
                      <input
                        className="field"
                        type="text"
                        value={row.name}
                        placeholder={L.stepName[locale] ?? L.stepName.en}
                        onChange={(e) =>
                          setSteps((s) => s.map((r, j) => (j === i ? { ...r, name: e.target.value } : r)))
                        }
                      />
                      <textarea
                        className="field"
                        rows={2}
                        value={row.text}
                        placeholder={L.stepText[locale] ?? L.stepText.en}
                        onChange={(e) =>
                          setSteps((s) => s.map((r, j) => (j === i ? { ...r, text: e.target.value } : r)))
                        }
                      />
                    </div>
                    <button
                      type="button"
                      aria-label={L.remove[locale] ?? L.remove.en}
                      className="flex-none rounded-full border hairline px-2.5 py-1 text-[13px] text-[var(--color-sub)] transition-colors hover:bg-[var(--color-card)]"
                      onClick={() => setSteps((s) => (s.length > 1 ? s.filter((_, j) => j !== i) : s))}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className={segBtn(false)}
                onClick={() => setSteps((s) => [...s, { name: "", text: "" }])}
              >
                + {L.addStep[locale] ?? L.addStep.en}
              </button>
            </div>
          )}
        </div>

        <div className="min-w-0">
          <p className="mb-1.5 text-[13.5px] font-semibold">{L.jsonld[locale] ?? L.jsonld.en}</p>
          <textarea
            className="field mono min-h-[26rem] bg-[var(--color-surface)]"
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
              onClick={() => {
                setVals({});
                setFaq([{ q: "", a: "" }]);
                setSteps([{ name: "", text: "" }]);
              }}
              className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
            >
              {t.common.reset}
            </button>
          </div>
          <p className="mt-2.5 text-[12.5px] leading-4 text-[var(--color-sub)]">{L.hint[locale] ?? L.hint.en}</p>
        </div>
      </div>
    </ToolPanel>
  );
}
