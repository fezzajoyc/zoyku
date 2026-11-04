import type { Dictionary } from "../i18n";

const es: Dictionary = {
  brand: "Zoyku",
  tagline: "Todas las herramientas se ejecutan en tu navegador.",
  metaDesc:
    "{n} herramientas online gratuitas para PDF, imágenes, texto, desarrollo y cálculos diarios. Todo se procesa en tu navegador: tus archivos nunca se suben a ningún servidor.",

  nav: {
    tools: "Todas las herramientas",
    categories: "Categorías",
    about: "Acerca de",
    search: "Buscar",
    menu: "Menú",
    language: "Idioma",
  },

  home: {
    heroTitle: "Herramientas gratuitas que nunca suben tus archivos",
    heroSub:
      "{n} herramientas para PDF, imágenes, texto, código y cálculos cotidianos. Todo se ejecuta localmente en tu navegador: rápido, gratis, sin registro y sin subidas.",
    browseAll: "Ver todas las herramientas",
    pinned: "Fijados",
    pin: "Fijar arriba",
    unpin: "Quitar de fijados",
    popular: "Populares ahora",
    categoriesTitle: "Categorías",
    featuredTitle: "Herramientas populares",
    trustLocal: "Tus archivos permanecen en tu dispositivo",
    trustFree: "Gratis, sin cuenta",
    trustFast: "Instantáneo, funciona sin conexión",
    rotating: [
      "Une 20 PDF en uno, sin cuenta y sin subidas",
      "Comprime fotos a un cuarto de su tamaño, incluso sin conexión",
      "Contratos, escaneos y capturas: se procesan en tu navegador",
      "Sin cuenta, sin marca de agua, sin avisos de límite de tamaño",
    ],
    statsLabels: { tools: "herramientas", languages: "idiomas", uploads: "subidas", accounts: "cuentas" },
    eyebrow: "Gratis siempre",
    heroCtaSecondary: "Cómo funciona",
    statsTools: "{n} herramientas",
    statsLanguages: "{n} idiomas",
    statsUploads: "0 subidas",
    statsAccounts: "0 cuentas",
    categoriesSub: "Siete familias de herramientas, todo en tu dispositivo.",
    popularSub: "Las herramientas más usadas.",
    privacyTitle: "Tus archivos nunca salen de tu dispositivo.",
    privacySub: "No existe el paso de subida: las herramientas son JavaScript que corre en tu navegador. No es una promesa de política, es cómo están construidas.",
    privacyPoint1T: "Procesado local",
    privacyPoint1D: "Los archivos se leen con la File API del navegador y se procesan en memoria. Nada se transmite.",
    privacyPoint2T: "Sin cuentas",
    privacyPoint2D: "Ni registro, ni correo, ni historial. Abre y usa.",
    privacyPoint3T: "Honestos por diseño",
    privacyPoint3D: "Si algo no se puede hacer en el navegador, lo decimos en vez de fingir.",
    privacyLink: "Leer la nota de privacidad",
    endTitle: "Elige una herramienta. Funciona.",
    endSub: "Quince idiomas, cero subidas, nada que instalar.",
    allToolsTitle: "Todas las herramientas, en una página",
    allToolsSub: "El directorio completo — {count} herramientas en 7 categorías, todo en local.",
    faqs: [
      { q: "¿Zoyku es gratis de verdad?", a: "Sí — todas las herramientas son gratis, sin cuenta, sin marca de agua y sin límite de uso. No hay una versión premium que esconda lo que necesitas." },
      { q: "¿Mis archivos se suben a un servidor?", a: "No. Cada herramienta es JavaScript que corre en tu pestaña: los archivos se leen con la File API del navegador y se procesan en memoria. No se transmite nada." },
      { q: "¿Cuántas herramientas hay?", a: "{n} herramientas en 7 categorías — PDF, imagen, texto, desarrollo, SEO, seguridad y utilidades — y crece con cada versión." },
      { q: "¿Funciona sin conexión?", a: "Una vez cargada la página de una herramienta, sigue funcionando sin conexión, porque todo el procesamiento es local. Solo la primera carga necesita conexión." },
      { q: "¿Necesito crear una cuenta?", a: "Nunca. Sin registro, sin correo, sin historial: abre la herramienta y úsala." },
      { q: "¿Qué formatos de archivo admite?", a: "La familia PDF cubre combinar, dividir, comprimir y conversiones con Word, JPG y más; la familia de imagen cubre HEIC, WebP, PNG, SVG y otros. Cada página indica exactamente qué acepta." },
    ],

  },

  tools: {
    noResults: "Ninguna herramienta coincide.",
    title: "Todas las herramientas",
    subtitle: "Busca entre {count} herramientas gratuitas. Sin subidas, sin registro.",
    filterPlaceholder: "Buscar herramientas…",
    count: "{count} herramientas",
    empty: "Ninguna herramienta coincide con «{query}».",
  },

  categories: {
    pdf: { name: "PDF", desc: "Combina, divide, convierte y edita PDF sin subirlos a ningún sitio." },
    image: { name: "Imagen", desc: "Comprime, redimensiona, recorta y convierte imágenes en tu navegador." },
    text: { name: "Texto", desc: "Cuenta, limpia, ordena y transforma texto al instante, mientras escribes." },
    developer: { name: "Desarrollador", desc: "Formateadores, codificadores, decodificadores y generadores para el día a día." },
    seo: { name: "SEO", desc: "Metaetiquetas, datos estructurados, vista previa SERP y más ayuda SEO." },
    security: { name: "Seguridad", desc: "Contraseñas, hashes y consultas: generados y verificados en tu dispositivo." },
    utility: { name: "Utilidades", desc: "Conversores de unidades, calculadoras y ayudas cotidianas." },
  },

  tool: {
    howTo: "Cómo usarlo",
    faq: "Preguntas frecuentes",
    related: "Herramientas relacionadas",
    nextStep: "Siguientes pasos",
    copyLink: "Copiar enlace",
    privacyNote:
      "Esta herramienta funciona por completo en tu navegador. Tus datos nunca salen de tu dispositivo y no se suben a ningún servidor.",
    inCategory: "Más de {category}",
    backToCategory: "Todas las herramientas de {category}",
  },

  common: {
    openTool: "Abrir herramienta",
    copy: "Copiar",
    close: "Cerrar",
    copied: "Copiado",
    download: "Descargar",
    reset: "Restablecer",
    swap: "Intercambiar",
    clear: "Limpiar",
    error: "Algo salió mal. Revisa los datos e inténtalo de nuevo.",
    input: "Entrada",
    output: "Resultado",
    settings: "Opciones",
    dropFiles: "Suelta los archivos aquí o haz clic para elegirlos",
    dropFile: "Suelta un archivo aquí o haz clic para elegirlo",
    processing: "Procesando…",
    fileSize: "Tamaño",
    sample: "Probar un ejemplo",
    uppercase: "MAYÚSCULAS",
  },

  unit: {
    from: "De",
    to: "A",
    amount: "Cantidad",
    result: "Resultado",
    common: "Conversiones frecuentes",
    formula: "Fórmula",
    allUnits: "Todas las unidades",
  },

  text: {
    stats: {
      words: "Palabras",
      characters: "Caracteres",
      charsNoSpaces: "Sin espacios",
      sentences: "Frases",
      paragraphs: "Párrafos",
      lines: "Líneas",
      readingTime: "Tiempo de lectura",
      readingMinutes: "{n} min de lectura",
      uniqueWords: "Palabras únicas",
      avgWordLen: "Long. media palabra",
      pages: "Páginas",
      speakingTime: "Tiempo de habla",
      keywordsTitle: "Palabras clave principales",
      keywordCount: "{count}× ({pct}%)",
      avgSentence: "Frase media (palabras)",
      longestSentence: "Frase más larga (palabras)",
      readingLevel: "Nivel de lectura",
      limitsTitle: "Límites por plataforma",
      charsLeft: "quedan {n}",
      charsOver: "{n} de más",
    },
  },

  footer: {
    line: "Herramientas gratuitas en el navegador. Nada de lo que hagas aquí sale de tu dispositivo.",
    privacy: "Privacidad",
    terms: "Términos",
    about: "Acerca de",
    badges: "Insignias",
    language: "Idioma",
  },

  badge: {
    title: "Insignias de Zoyku",
    desc: "Pon una insignia de Zoyku en tu sitio, README o documentación. Enlaza aquí y cuenta que las herramientas funcionan por completo en el navegador.",
    voluntary: "Incrustarla es totalmente voluntario: elige una si te gusta el proyecto. No hace falta permiso.",
    md: "Markdown (README)",
    html: "HTML (web)",
    thanks: "Gracias por pasarlo — cada inserción ayuda a más gente a descubrir herramientas que respetan sus archivos.",
  },

    embed: {
    title: "Insertar esta herramienta",
    desc: "Pon esta herramienta en tu sitio con una línea: se ejecuta en el navegador del visitante.",
  },

    mcp: {
    title: "Servidor MCP — herramientas accesibles para IA",
    desc1: "Zoyku incluye un servidor MCP (Model Context Protocol): asistentes de IA como Claude o Cursor pueden ejecutar las mismas calculadoras y conversores de este sitio — misma lógica probada, sin reimplementation.",
    desc2: "Las herramientas ejecutan las funciones puras del sitio (conversión de unidades, finanzas, estimaciones de salud y procesamiento de texto). Corren vía npx en la máquina del cliente de IA; nada se envía a nuestros servidores.",
    toolsTitle: "Herramientas ejecutables ({n})",
    requiresNode: "Requiere Node.js 18+. El servidor corre localmente por stdio; solo las llamadas que hagas se calculan en tu máquina.",
    privacy: "Requiere Node.js 18+. El servidor corre localmente por stdio; solo las llamadas que hagas se calculan en tu máquina.",
  },

    notFound: {
    title: "Página no encontrada",
    body: "La herramienta que buscas no existe. Explora todas las herramientas.",
    home: "Ir a la página principal",
  },
};

export default es;
