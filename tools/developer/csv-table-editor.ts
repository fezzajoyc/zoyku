import { DevCsvTableEngine } from "../_engines/dev-engine-csv-table";
import { csvTableCopy } from "../_lib/csv-table-copy";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "csv-table-editor",
  category: "developer",
  icon: "swap",
  engine: { component: DevCsvTableEngine },
  related: ["csv-to-json", "json-to-csv", "csv-to-excel", "excel-to-csv"],
  copy: {
    en: csvTableCopy("en"), zh: csvTableCopy("zh"), ja: csvTableCopy("ja"), es: csvTableCopy("es"), pt: csvTableCopy("pt"),
    fr: csvTableCopy("fr"), de: csvTableCopy("de"), ru: csvTableCopy("ru"), it: csvTableCopy("it"), tr: csvTableCopy("tr"),
    ko: csvTableCopy("ko"), ar: csvTableCopy("ar"), hi: csvTableCopy("hi"), id: csvTableCopy("id"), vi: csvTableCopy("vi"),
  },
});
