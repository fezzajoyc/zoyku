import type { Metadata } from "next";
import { dict } from "@/lib/i18n";
import { isLocale, LOCALES, type Locale } from "@/lib/site";
import { HTML_LANG } from "@/lib/i18n";
import { ALL_TOOLS } from "@/tools/registry";
import { Container, Prose, SectionHead } from "@/components/ui";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = isLocale(raw) ? raw : "en";
  const t = dict(lang as Locale);
  return {
    title: t.nav.about,
    alternates: {
      canonical: `/${lang}/about`,
      languages: { ...Object.fromEntries(LOCALES.map((l) => [HTML_LANG[l], `/${l}/about`])), "x-default": "/en/about" },
    },
  };
}

const CONTENT: Partial<Record<Locale, string[]>> = {
  en: [
    "Zoyku is a collection of free online tools that run entirely in your browser. There is no backend: files you open, text you paste and numbers you enter are processed by JavaScript on your own device.",
    "That design gives us three properties we care about. It is private by construction — there is nothing to upload, so nothing can leak. It is fast — there is no round trip to a server. And it is honest — every tool does exactly what the page says, no tricks.",
    "The tools are grouped into PDF, image, text, developer, SEO, security and utility categories. New tools are added regularly; if a tool would be better designed differently from the usual pattern, we design it that way.",
    "Quality is enforced, not promised: every tool ships with automated tests — more than eight thousand and counting — covering formulas, edge cases and each of the fifteen interface languages. If a number on this site disagrees with your own calculation, that is a bug and we want to hear about it: the Report an issue link in the footer goes straight to our issue tracker.",
  ],
  zh: [
    "Zoyku 是一组完全在浏览器里运行的免费在线工具。没有后端:你打开的文件、粘贴的文本、输入的数字,都由你自己设备上的 JavaScript 处理。",
    "这个设计带来三个我们看重的性质:隐私是构造出来的——没有上传,就谈不上泄露;速度快——没有服务器往返;诚实——每个工具都做页面所说的事,不玩花样。",
    "工具分为 PDF、图片、文本、开发者、SEO、安全和实用工具七类,持续新增。如果某个工具用不同于惯例的设计更好用,我们就按那个设计做。",
    "质量是靠机制保证的,不是口号:每个工具都带自动化测试——累计超过八千条且持续增加——覆盖公式、边界情况和全部十五种界面语言。如果本站任何一个数字与你的计算不符,那就是 bug,我们想知道:页脚的“报告问题”直达我们的 issue 跟踪器。",
  ],
  ja: [
    "Zoyku は、完全にブラウザ内で動く無料オンラインツールのコレクションです。バックエンドはありません。開いたファイル、貼り付けたテキスト、入力した数値は、すべて自分のデバイス上の JavaScript が処理します。",
    "この設計には、私たちが大切にする 3 つの性質があります。プライバシーは構造的に保証される(アップロードがないので漏えいもない)、速い(サーバー往復がない)、そして誠実(各ツールはページに書かれた通りのことだけをする)。",
    "ツールは PDF・画像・テキスト・開発者・SEO・セキュリティ・ユーティリティの 7 カテゴリーに分かれ、随時追加しています。常識的な作りより別の設計が良い道具は、その設計で作ります。",
    "品質は宣言ではなく仕組みで担保します。すべてのツールに自動テストが付いており——累計 8,000 件以上、増加中——数式・境界ケース・15 のインターフェース言語すべてをカバーします。本サイトの数値があなたの計算と一致しないなら、それはバグであり、ぜひ知らせてください。フッターの「問題を報告」がイシュートラッカーに直結しています。",
  ],
  es: [
    "Zoyku es una colección de herramientas online gratuitas que funcionan por completo en tu navegador. No hay backend: los archivos que abres, el texto que pegas y los números que introduces los procesa el JavaScript de tu propio dispositivo.",
    "Ese diseño nos da tres propiedades que nos importan. Privacidad por construcción: no hay subidas, así que no puede haber fugas. Velocidad: sin viajes de ida y vuelta al servidor. Honestidad: cada herramienta hace exactamente lo que dice su página.",
    "Las herramientas se agrupan en PDF, imagen, texto, desarrollo, SEO, seguridad y utilidades, y se añaden nuevas con regularidad. Si una herramienta funciona mejor con un diseño distinto al habitual, la diseñamos así.",
    "La calidad se exige con mecanismos, no con promesas: cada herramienta incluye pruebas automatizadas — más de ocho mil y subiendo — que cubren fórmulas, casos límite y los quince idiomas de la interfaz. Si algún número de este sitio no coincide con tu cálculo, es un fallo y queremos saberlo: el enlace «Informar de un problema» del pie de página lleva directo a nuestro rastreador de incidencias.",
  ],
  pt: [
    "Zoyku é uma coleção de ferramentas online gratuitas que rodam inteiramente no seu navegador. Não há backend: os arquivos que você abre, o texto que cola e os números que digita são processados pelo JavaScript do seu próprio dispositivo.",
    "Esse design nos dá três propriedades que valorizamos. Privacidade por construção: não há uploads, logo não há vazamentos. Velocidade: sem viagem ao servidor. Honestidade: cada ferramenta faz exatamente o que a página diz.",
    "As ferramentas se dividem em PDF, imagem, texto, desenvolvedor, SEO, segurança e utilidades, com novidades regulares. Se uma ferramenta funciona melhor com um design diferente do usual, a projetamos assim.",
    "A qualidade é garantida por mecanismos, não por promessas: cada ferramenta inclui testes automatizados — mais de oito mil e crescendo — cobrindo fórmulas, casos de borda e os quinze idiomas da interface. Se algum número deste site divergir do seu cálculo, é um bug e queremos saber: o link «Relatar um problema» no rodapé vai direto ao nosso rastreador de issues.",
  ],
};

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  const t = dict(lang as Locale);
  return (
    <Container className="max-w-3xl py-12">
      <SectionHead as="h1" title={t.nav.about} />
      <Prose paragraphs={CONTENT[lang as Locale] ?? CONTENT.en!} />
      <p className="mt-6 text-[14px] text-[var(--color-sub)]">
        {ALL_TOOLS.length} tools · {LOCALES.length} languages
      </p>
    </Container>
  );
}

