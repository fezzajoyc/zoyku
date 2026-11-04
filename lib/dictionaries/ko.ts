import type { Dictionary } from "../i18n";

// 한국어(ko) — 합니다체로 통일, 불필요한 외래어 표기 지양.
// 계약: 키 구조는 en과 완전히 동일(tests/seo.test.ts), 값은 한국어로 번역.
const ko: Dictionary = {
  brand: "Zoyku",
  tagline: "모든 도구가 브라우저에서 실행됩니다.",
  metaDesc:
    "{n}개의 무료 온라인 도구: PDF, 이미지, 텍스트, 개발, 일상 계산. 모든 처리는 브라우저에서 실행되며 파일은 기기를 떠나지 않습니다.",

  nav: {
    tools: "전체 도구",
    categories: "카테고리",
    about: "소개",
    search: "검색",
    menu: "메뉴",
    language: "언어",
  },

  home: {
    heroTitle: "파일을 업로드하지 않는 무료 도구",
    heroSub:
      "PDF, 이미지, 텍스트, 코드, 생활 계산까지 {n}개의 도구. 모든 처리가 브라우저에서 로컬로 실행됩니다 — 빠르고, 무료이며, 가입도 업로드도 없습니다.",
    browseAll: "전체 도구 보기",
    pinned: "고정됨",
    pin: "상단에 고정",
    unpin: "고정 해제",
    popular: "인기 도구",
    categoriesTitle: "카테고리",
    featuredTitle: "인기 도구",
    trustLocal: "파일은 기기에만 보관됩니다",
    trustFree: "무료, 계정 불필요",
    trustFast: "즉시 실행, 오프라인 작동",
    rotating: [
      "PDF 20개를 하나로 합치기 — 업로드 없이 브라우저에서 끝까지",
      "사진 용량을 1/4로 줄이기 — 오프라인에서도 가능",
      "계약서, 스캔본, 스크린샷 — 탭 안에서 바로 처리",
      "계정 없음, 워터마크 없음, 파일 크기 제한도 없음",
    ],
    statsLabels: { tools: "도구", languages: "개 언어", uploads: "업로드", accounts: "계정" },
    eyebrow: "평생 무료",
    heroCtaSecondary: "이용 방법",
    statsTools: "도구 {n}개",
    statsLanguages: "{n}개 언어",
    statsUploads: "업로드 0건",
    statsAccounts: "계정 0개",
    categoriesSub: "일곱 가지 계열의 도구, 모두 기기 위에서 실행됩니다.",
    popularSub: "가장 많이 열어보는 도구입니다.",
    privacyTitle: "파일은 절대 기기를 떠나지 않습니다.",
    privacySub:
      "업로드 단계가 아예 없습니다. 도구는 브라우저에서 실행되는 JavaScript일 뿐입니다 — 정책상 약속이 아니라, 애초에 그렇게 만들어진 구조입니다.",
    privacyPoint1T: "로컬 처리",
    privacyPoint1D:
      "파일은 브라우저의 File API로 읽어 메모리 안에서 처리합니다. 어디로도 전송되지 않습니다.",
    privacyPoint2T: "계정 없음",
    privacyPoint2D: "가입도, 이메일도, 저장되는 기록도 없습니다. 도구를 열고 바로 쓰면 됩니다.",
    privacyPoint3T: "설계부터 정직하게",
    privacyPoint3D:
      "브라우저에서 정말 불가능한 일이라면 그렇다고 말합니다. 가능한 척하지 않습니다.",
    privacyLink: "전체 개인정보 노트 읽기",
    endTitle: "도구를 고르면, 바로 작동합니다.",
    endSub: "15개 언어, 업로드 없음, 설치 불필요.",
    allToolsTitle: "모든 도구, 한 페이지에",
    allToolsSub: "전체 디렉터리 — 7개 카테고리 {count}개 도구, 모두 로컬 실행.",
    faqs: [
      { q: "Zoyku는 정말 무료인가요?", a: "네 — 모든 도구가 무료입니다. 계정도, 워터마크도, 사용 횟수 제한도 없습니다. 필요한 기능을 유료판에 숨겨두지 않았습니다." },
      { q: "파일이 서버에 업로드되나요?", a: "아니요. 모든 도구는 브라우저 탭에서 실행되는 JavaScript입니다. 파일은 브라우저 자체 File API로 읽고 메모리에서 처리하며, 어디로도 전송되지 않습니다." },
      { q: "도구가 몇 개 있나요?", a: "7개 카테고리(PDF, 이미지, 텍스트, 개발, SEO, 보안, 생활 도구)에 {n}개이며, 릴리스마다 늘어납니다." },
      { q: "오프라인에서도 되나요?", a: "도구 페이지를 한 번 로드하면 이후에는 연결 없이도 계속 작동합니다. 모든 처리가 로컬에서 이루어지기 때문입니다. 최초 로드에만 네트워크가 필요합니다." },
      { q: "계정을 만들어야 하나요?", a: "절대 필요 없습니다. 가입도, 이메일도, 저장되는 기록도 없습니다 — 도구를 열고 바로 쓰면 됩니다." },
      { q: "어떤 파일 형식을 지원하나요?", a: "PDF 계열은 병합, 분할, 압축, Word·JPG 등과의 상호 변환을 지원하고, 이미지 계열은 HEIC, WebP, PNG, SVG 등을 지원합니다. 각 도구 페이지에 지원 형식이 정확히 표시되어 있습니다." },
    ],

  },

  tools: {
    noResults: "일치하는 도구가 없습니다.",
    title: "전체 도구",
    subtitle: "브라우저에서 도는 무료 도구 {count}개. 업로드도, 가입도 없습니다.",
    filterPlaceholder: "도구 검색…",
    count: "도구 {count}개",
    empty: "“{query}”에 해당하는 도구가 없습니다.",
  },

  categories: {
    pdf: { name: "PDF", desc: "어디에도 업로드하지 않고 PDF를 합치고, 나누고, 변환하고, 편집합니다." },
    image: { name: "이미지", desc: "브라우저 안에서 이미지를 압축하고, 크기를 조정하고, 자르고, 변환합니다." },
    text: { name: "텍스트", desc: "입력하는 즉시 텍스트를 세고, 정리하고, 정렬하고, 변환합니다." },
    developer: { name: "개발", desc: "매일 쓰는 포매터, 인코더, 디코더, 생성기 모음." },
    seo: { name: "SEO", desc: "메타 태그, 스키마 마크업, SERP 미리보기 등 온페이지 SEO 도우미." },
    security: { name: "보안", desc: "비밀번호, 해시, 조회 도구 — 기기에서 생성하고 확인합니다." },
    utility: { name: "생활", desc: "단위 변환기, 계산기 등 생활 속 도우미." },
  },

  tool: {
    howTo: "사용 방법",
    faq: "자주 묻는 질문",
    related: "관련 도구",
    nextStep: "다음 단계",
    copyLink: "링크 복사",
    privacyNote:
      "이 도구는 전부 브라우저 안에서 실행됩니다. 데이터는 기기를 떠나지 않으며 어떤 서버로도 업로드되지 않습니다.",
    inCategory: "{category}의 다른 도구",
    backToCategory: "{category} 전체 도구",
  },

  common: {
    openTool: "도구 열기",
    copy: "복사",
    close: "닫기",
    copied: "복사됨",
    download: "다운로드",
    reset: "초기화",
    swap: "바꾸기",
    clear: "지우기",
    error: "문제가 발생했습니다. 입력값을 확인하고 다시 시도해 주세요.",
    input: "입력",
    output: "결과",
    settings: "옵션",
    dropFiles: "파일을 끌어다 놓거나 클릭해서 선택하세요",
    dropFile: "파일을 끌어다 놓거나 클릭해서 선택하세요",
    processing: "처리 중…",
    fileSize: "크기",
    sample: "예시로 써보기",
    uppercase: "대문자",
  },

  unit: {
    from: "변환 전",
    to: "변환 후",
    amount: "값",
    result: "결과",
    common: "자주 쓰는 변환",
    formula: "계산식",
    allUnits: "전체 단위",
  },

  text: {
    stats: {
      words: "단어",
      characters: "글자",
      charsNoSpaces: "공백 제외",
      sentences: "문장",
      paragraphs: "단락",
      lines: "줄",
      readingTime: "읽는 시간",
      readingMinutes: "약 {n}분",
      uniqueWords: "고유 단어",
      avgWordLen: "평균 단어 길이",
      pages: "페이지 수",
      speakingTime: "발표 시간",
      keywordsTitle: "주요 키워드",
      keywordCount: "{count}회({pct}%)",
      avgSentence: "평균 문장 길이(단어)",
      longestSentence: "가장 긴 문장(단어)",
      readingLevel: "독해 수준",
      limitsTitle: "플랫폼 글자 수 제한",
      charsLeft: "{n}자 남음",
      charsOver: "{n}자 초과",
    },
  },

  footer: {
    line: "브라우저에서 도는 무료 도구. 여기서 하는 일은 기기를 떠나지 않습니다.",
    privacy: "개인정보",
    terms: "약관",
    about: "소개",
    badges: "배지",
    language: "언어",
  },

  badge: {
    title: "Zoyku 배지",
    desc: "사이트, README, 문서에 Zoyku 배지를 달아 보세요. 여기로 연결되며, 배지 뒤의 도구들이 전부 브라우저 안에서 실행된다는 뜻이기도 합니다.",
    voluntary: "배지 삽입은 완전히 자율입니다 — 마음에 드는 배지를 골라 쓰세요. 허락받을 필요 없습니다.",
    md: "Markdown (README)",
    html: "HTML (웹사이트)",
    thanks: "널리 알려 주셔서 감사합니다 — 하나의 삽입이 도구를 더 많은 사람에게 알려 줍니다.",
  },

  embed: {
    title: "도구 삽입",
    desc: "한 줄로 사이트에 도구를 넣으세요. 방문자의 브라우저에서 실행됩니다.",
  },

    mcp: {
    title: "MCP 서버 — AI가 호출하는 도구",
    desc1: "Zoyku는 MCP(Model Context Protocol) 서버를 제공합니다: Claude, Cursor 같은 AI 어시스턴트가 이 사이트의 계산기와 변환기를 그대로 실행합니다 — 같은 테스트된 로직, 재구현 없이.",
    desc2: "도구는 사이트의 순수 함수(단위 변환, 금융, 건강 추정, 텍스트 처리)를 실행합니다. npx를 통해 AI 클라이언트 머신에서 동작하며, 우리 서버로 전송되지 않습니다.",
    toolsTitle: "실행 가능한 도구({n}개)",
    requiresNode: "Node.js 18+ 필요. 서버는 stdio로 로컬 실행되며, 호출한 도구 계산만 로컬에서 이루어집니다.",
    privacy: "Node.js 18+ 필요. 서버는 stdio로 로컬 실행되며, 호출한 도구 계산만 로컬에서 이루어집니다.",
  },

    notFound: {
    title: "페이지를 찾을 수 없습니다",
    body: "찾으시는 도구가 존재하지 않습니다. 전체 도구를 둘러보세요.",
    home: "홈으로 가기",
  },
};

export default ko;
