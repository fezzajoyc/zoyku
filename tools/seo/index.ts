import metaTagGenerator from "./meta-tag-generator";
import openGraphGenerator from "./open-graph-generator";
import canonicalTagGenerator from "./canonical-tag-generator";
import schemaMarkupGenerator from "./schema-markup-generator";
import robotsTxtGenerator from "./robots-txt-generator";
import sitemapGenerator from "./sitemap-generator";
import serpPreview from "./serp-preview";
import keywordDensityChecker from "./keyword-density-checker";
import hreflangGenerator from "./hreflang-generator";
import utmBuilder from "./utm-builder";

export const SEO_TOOLS = [
  metaTagGenerator,
  openGraphGenerator,
  canonicalTagGenerator,
  schemaMarkupGenerator,
  robotsTxtGenerator,
  sitemapGenerator,
  serpPreview,
  keywordDensityChecker,
  hreflangGenerator,
  utmBuilder,
];
