"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import type { Locale } from "@/lib/site";
import type { TranslationKeys, ZxcvbnResult } from "@zxcvbn-ts/core";

/**
 * 密码强度检测 —— @zxcvbn-ts/core + language-common 动态 import,本地计算。
 * 熵估评分(0–4)、四种攻击场景的破解时间、可执行的改进建议。
 * zxcvbn 要求 translations 完整覆盖全部键,这里内置五语翻译。
 */

const TRANSLATIONS: Partial<Record<Locale, TranslationKeys>> = {
  en: {
    warnings: {
      straightRow: "Straight rows of keys are easy to guess.",
      keyPattern: "Short keyboard patterns are easy to guess.",
      simpleRepeat: "Repeated characters like “aaa” are easy to guess.",
      extendedRepeat: "Repeated character patterns like “abcabcabc” are easy to guess.",
      sequences: "Sequences of characters are easy to guess.",
      recentYears: "Recent years are easy to guess.",
      dates: "Dates are easy to guess.",
      topTen: "This is a top-10 common password.",
      topHundred: "This is a top-100 common password.",
      common: "This is a very common password.",
      similarToCommon: "This is similar to a commonly used password.",
      wordByItself: "A single word is easy to guess.",
      namesByThemselves: "Single names are easy to guess.",
      commonNames: "Common first and last names are easy to guess.",
      userInputs: "This password contains personal information.",
      pwned: "This password appeared in known data breaches.",
    },
    suggestions: {
      l33t: "Predictable substitutions like “@” instead of “a” don't help very much.",
      reverseWords: "Reversed words aren't much harder to guess.",
      allUppercase: "Capitalizing only the first letter or all letters doesn't help much.",
      capitalization: "Capitalizing some letters helps a little, but longer is better.",
      dates: "Avoid dates and years that are personal to you.",
      recentYears: "Avoid recent years.",
      associatedYears: "Avoid years that are associated with you.",
      sequences: "Avoid character sequences like “abcd”.",
      repeated: "Avoid repeated characters like “aaa”.",
      longerKeyboardPattern: "Use longer keyboard patterns with more turns.",
      anotherWord: "Add another word or two — uncommon words are better.",
      useWords: "Use a few words instead of a single word — a passphrase is easy to type and hard to crack.",
      noNeed: "You can create strong passwords without symbols, numbers or capital letters.",
      pwned: "This password has been exposed in a breach — never use it again.",
    },
    timeEstimation: {
      ltSecond: "instant",
      second: "{base} second",
      seconds: "{base} seconds",
      minute: "{base} minute",
      minutes: "{base} minutes",
      hour: "{base} hour",
      hours: "{base} hours",
      day: "{base} day",
      days: "{base} days",
      month: "{base} month",
      months: "{base} months",
      year: "{base} year",
      years: "{base} years",
      centuries: "centuries",
    },
  },
  zh: {
    warnings: {
      straightRow: "连成一条直线的按键组合很容易被猜到。",
      keyPattern: "简短的键盘走位模式很容易被猜到。",
      simpleRepeat: "像“aaa”这样的重复字符很容易被猜到。",
      extendedRepeat: "像“abcabcabc”这样的重复模式很容易被猜到。",
      sequences: "连续的字符序列很容易被猜到。",
      recentYears: "最近的年份很容易被猜到。",
      dates: "日期很容易被猜到。",
      topTen: "这是最常见的十大密码之一。",
      topHundred: "这是最常见的百大密码之一。",
      common: "这是一个非常常见的密码。",
      similarToCommon: "这个密码与常用密码过于相似。",
      wordByItself: "单个单词很容易被猜到。",
      namesByThemselves: "单个姓名很容易被猜到。",
      commonNames: "常见的姓名组合很容易被猜到。",
      userInputs: "这个密码包含你的个人信息。",
      pwned: "这个密码曾出现在已知的数据泄露中。",
    },
    suggestions: {
      l33t: "用“@”代替“a”这类可预测的替换帮助不大。",
      reverseWords: "把单词倒过来写并不能明显增加猜测难度。",
      allUppercase: "只把首字母或全部字母大写帮助不大。",
      capitalization: "大小写混排有一点帮助,但更长才更有效。",
      dates: "避免使用与你个人相关的日期和年份。",
      recentYears: "避免使用最近的年份。",
      associatedYears: "避免使用与你相关的年份。",
      sequences: "避免“abcd”这类连续字符。",
      repeated: "避免“aaa”这类重复字符。",
      longerKeyboardPattern: "键盘走位模式要用得更长、转折更多。",
      anotherWord: "再加一两个词——越不常见越好。",
      useWords: "用几个单词组成口令短语,好记好输也难破解。",
      noNeed: "不用符号、数字和大写字母也能造出强密码。",
      pwned: "这个密码已经在泄露数据中出现,请务必不要再用。",
    },
    timeEstimation: {
      ltSecond: "瞬间",
      second: "{base} 秒",
      seconds: "{base} 秒",
      minute: "{base} 分钟",
      minutes: "{base} 分钟",
      hour: "{base} 小时",
      hours: "{base} 小时",
      day: "{base} 天",
      days: "{base} 天",
      month: "{base} 个月",
      months: "{base} 个月",
      year: "{base} 年",
      years: "{base} 年",
      centuries: "几个世纪",
    },
  },
  ja: {
    warnings: {
      straightRow: "直線状に並んだキーは簡単に推測されます。",
      keyPattern: "短いキーボードパターンは簡単に推測されます。",
      simpleRepeat: "「aaa」のような文字の繰り返しは簡単に推測されます。",
      extendedRepeat: "「abcabcabc」のような繰り返しパターンは簡単に推測されます。",
      sequences: "連続する文字列は簡単に推測されます。",
      recentYears: "最近の年号は簡単に推測されます。",
      dates: "日付は簡単に推測されます。",
      topTen: "これは最もよく使われる上位10のパスワードです。",
      topHundred: "これは最もよく使われる上位100のパスワードです。",
      common: "これは非常に一般的なパスワードです。",
      similarToCommon: "このパスワードはよく使われるものに似ています。",
      wordByItself: "単語ひとつでは簡単に推測されます。",
      namesByThemselves: "名前だけでは簡単に推測されます。",
      commonNames: "一般的な氏名の組み合わせは簡単に推測されます。",
      userInputs: "このパスワードには個人情報が含まれています。",
      pwned: "このパスワードは既知の情報漏洩で流出しています。",
    },
    suggestions: {
      l33t: "「a」を「@」にするような予測可能な置き換えはあまり効果がありません。",
      reverseWords: "単語を逆さにしても推測はさほど難しくなりません。",
      allUppercase: "先頭だけ、または全部を大文字にしても効果は薄いです。",
      capitalization: "一部を大文字にするのは少しは役立ちますが、長くする方が効果的です。",
      dates: "自分に関係する日付や年は避けましょう。",
      recentYears: "最近の年号は避けましょう。",
      associatedYears: "自分に関係する年は避けましょう。",
      sequences: "「abcd」のような連続文字は避けましょう。",
      repeated: "「aaa」のような繰り返し文字は避けましょう。",
      longerKeyboardPattern: "キーボードパターンはより長く、方向転換を多くしましょう。",
      anotherWord: "単語をもう一つか二つ追加しましょう。一般的でない語が効果的です。",
      useWords: "単語ひとつでなく複数の語からなるパスフレーズにしましょう。入力しやすく解析されにくくなります。",
      noNeed: "記号・数字・大文字がなくても強いパスワードは作れます。",
      pwned: "このパスワードは漏洩データに含まれています。二度と使わないでください。",
    },
    timeEstimation: {
      ltSecond: "即時",
      second: "{base} 秒",
      seconds: "{base} 秒",
      minute: "{base} 分",
      minutes: "{base} 分",
      hour: "{base} 時間",
      hours: "{base} 時間",
      day: "{base} 日",
      days: "{base} 日",
      month: "{base} か月",
      months: "{base} か月",
      year: "{base} 年",
      years: "{base} 年",
      centuries: "数世紀",
    },
  },
  es: {
    warnings: {
      straightRow: "Las filas rectas de teclas son fáciles de adivinar.",
      keyPattern: "Los patrones cortos de teclado son fáciles de adivinar.",
      simpleRepeat: "Caracteres repetidos como “aaa” son fáciles de adivinar.",
      extendedRepeat: "Patrones repetidos como “abcabcabc” son fáciles de adivinar.",
      sequences: "Las secuencias de caracteres son fáciles de adivinar.",
      recentYears: "Los años recientes son fáciles de adivinar.",
      dates: "Las fechas son fáciles de adivinar.",
      topTen: "Esta es una de las 10 contraseñas más comunes.",
      topHundred: "Esta es una de las 100 contraseñas más comunes.",
      common: "Esta es una contraseña muy común.",
      similarToCommon: "Es parecida a una contraseña de uso habitual.",
      wordByItself: "Una sola palabra es fácil de adivinar.",
      namesByThemselves: "Los nombres solos son fáciles de adivinar.",
      commonNames: "Los nombres y apellidos comunes son fáciles de adivinar.",
      userInputs: "Esta contraseña contiene información personal.",
      pwned: "Esta contraseña apareció en filtraciones de datos conocidas.",
    },
    suggestions: {
      l33t: "Sustituciones previsibles como “@” en lugar de “a” no ayudan mucho.",
      reverseWords: "Las palabras al revés no son mucho más difíciles de adivinar.",
      allUppercase: "Poner en mayúscula solo la primera letra o todas no ayuda mucho.",
      capitalization: "Mezclar mayúsculas ayuda un poco, pero más largo es mejor.",
      dates: "Evita fechas y años que sean personales.",
      recentYears: "Evita los años recientes.",
      associatedYears: "Evita años que tengan relación contigo.",
      sequences: "Evita secuencias como “abcd”.",
      repeated: "Evita caracteres repetidos como “aaa”.",
      longerKeyboardPattern: "Usa patrones de teclado más largos y con más giros.",
      anotherWord: "Añade una o dos palabras más; cuanto menos comunes, mejor.",
      useWords: "Usa varias palabras en vez de una sola: una frase contraseña es fácil de escribir y difícil de crackear.",
      noNeed: "Puedes crear contraseñas fuertes sin símbolos, números ni mayúsculas.",
      pwned: "Esta contraseña apareció en una filtración: no la vuelvas a usar.",
    },
    timeEstimation: {
      ltSecond: "al instante",
      second: "{base} segundo",
      seconds: "{base} segundos",
      minute: "{base} minuto",
      minutes: "{base} minutos",
      hour: "{base} hora",
      hours: "{base} horas",
      day: "{base} día",
      days: "{base} días",
      month: "{base} mes",
      months: "{base} meses",
      year: "{base} año",
      years: "{base} años",
      centuries: "siglos",
    },
  },
  pt: {
    warnings: {
      straightRow: "Sequências retas de teclas são fáceis de adivinhar.",
      keyPattern: "Padrões curtos de teclado são fáceis de adivinhar.",
      simpleRepeat: "Caracteres repetidos como “aaa” são fáceis de adivinhar.",
      extendedRepeat: "Padrões repetidos como “abcabcabc” são fáceis de adivinhar.",
      sequences: "Sequências de caracteres são fáceis de adivinhar.",
      recentYears: "Anos recentes são fáceis de adivinhar.",
      dates: "Datas são fáceis de adivinhar.",
      topTen: "Esta é uma das 10 senhas mais comuns.",
      topHundred: "Esta é uma das 100 senhas mais comuns.",
      common: "Esta é uma senha muito comum.",
      similarToCommon: "Esta senha é parecida com uma senha muito usada.",
      wordByItself: "Uma palavra sozinha é fácil de adivinhar.",
      namesByThemselves: "Nomes sozinhos são fáceis de adivinhar.",
      commonNames: "Nomes e sobrenomes comuns são fáceis de adivinhar.",
      userInputs: "Esta senha contém informações pessoais.",
      pwned: "Esta senha apareceu em vazamentos de dados conhecidos.",
    },
    suggestions: {
      l33t: "Substituições previsíveis como “@” no lugar de “a” não ajudam muito.",
      reverseWords: "Palavras ao contrário não são muito mais difíceis de adivinhar.",
      allUppercase: "Colocar só a primeira letra ou todas em maiúsculas não ajuda muito.",
      capitalization: "Misturar maiúsculas ajuda um pouco, mas ser mais longa é melhor.",
      dates: "Evite datas e anos que sejam pessoais.",
      recentYears: "Evite anos recentes.",
      associatedYears: "Evite anos ligados a você.",
      sequences: "Evite sequências como “abcd”.",
      repeated: "Evite caracteres repetidos como “aaa”.",
      longerKeyboardPattern: "Use padrões de teclado mais longos e com mais mudanças de direção.",
      anotherWord: "Adicione mais uma ou duas palavras — quanto menos comuns, melhor.",
      useWords: "Use algumas palavras em vez de uma só: uma frase-senha é fácil de digitar e difícil de quebrar.",
      noNeed: "Você pode criar senhas fortes sem símbolos, números ou maiúsculas.",
      pwned: "Esta senha apareceu em um vazamento — nunca mais use.",
    },
    timeEstimation: {
      ltSecond: "instantâneo",
      second: "{base} segundo",
      seconds: "{base} segundos",
      minute: "{base} minuto",
      minutes: "{base} minutos",
      hour: "{base} hora",
      hours: "{base} horas",
      day: "{base} dia",
      days: "{base} dias",
      month: "{base} mês",
      months: "{base} meses",
      year: "{base} ano",
      years: "{base} anos",
      centuries: "séculos",
    },
  },
};

const LABELS: Record<string, Record<string, string>> = {
  show: { en: "Show", zh: "显示", ja: "表示", es: "Mostrar", pt: "Mostrar", fr: "Afficher", de: "Anzeigen", ru: "Показать", it: "Mostra", tr: "Göster", ko: "표시", ar: "إظهار", hi: "दिखाएँ", id: "Tampilkan", vi: "Hiện", },
  hide: { en: "Hide", zh: "隐藏", ja: "隠す", es: "Ocultar", pt: "Ocultar", fr: "Masquer", de: "Verbergen", ru: "Скрыть", it: "Nascondi", tr: "Gizle", ko: "숨기기", ar: "إخفاء", hi: "छिपाएँ", id: "Sembunyikan", vi: "Ẩn", },
  placeholder: {
    en: "Type or paste a password to test…",
    zh: "输入或粘贴要检测的密码…",
    ja: "判定したいパスワードを入力…",
    es: "Escribe o pega una contraseña para analizarla…",
    pt: "Digite ou cole uma senha para analisar…",
    fr: "Tapez ou collez un mot de passe à tester…", de: "Passwort zum Testen eingeben oder einfügen…", ru: "Введите или вставьте пароль для проверки…", it: "Digita o incolla una password da analizzare…", tr: "Test etmek için şifre yazın veya yapıştırın…", ko: "확인할 비밀번호를 입력하거나 붙여넣으세요…", ar: "اكتب أو الصق كلمة مرور لاختبارها…", hi: "जाँचने के लिए पासवर्ड टाइप या पेस्ट करें…", id: "Ketik atau tempel kata sandi untuk diuji…", vi: "Nhập hoặc dán mật khẩu để kiểm tra…",
  },
  s0: { en: "Very weak", zh: "非常弱", ja: "非常に弱い", es: "Muy débil", pt: "Muito fraca", fr: "Très faible", de: "Sehr schwach", ru: "Очень слабый", it: "Molto debole", tr: "Çok zayıf", ko: "매우 약함", ar: "ضعيفة جداً", hi: "बहुत कमज़ोर", id: "Sangat lemah", vi: "Rất yếu", },
  s1: { en: "Weak", zh: "弱", ja: "弱い", es: "Débil", pt: "Fraca", fr: "Faible", de: "Schwach", ru: "Слабый", it: "Debole", tr: "Zayıf", ko: "약함", ar: "ضعيفة", hi: "कमज़ोर", id: "Lemah", vi: "Yếu", },
  s2: { en: "Fair", zh: "一般", ja: "まあまあ", es: "Aceptable", pt: "Razoável", fr: "Correct", de: "Mittel", ru: "Средний", it: "Accettabile", tr: "Orta", ko: "보통", ar: "مقبولة", hi: "ठीक-ठाक", id: "Cukup", vi: "Trung bình", },
  s3: { en: "Strong", zh: "强", ja: "強い", es: "Fuerte", pt: "Forte", fr: "Fort", de: "Stark", ru: "Надёжный", it: "Forte", tr: "Güçlü", ko: "강함", ar: "قوية", hi: "मज़बूत", id: "Kuat", vi: "Mạnh", },
  s4: { en: "Very strong", zh: "非常强", ja: "非常に強い", es: "Muy fuerte", pt: "Muito forte", fr: "Très fort", de: "Sehr stark", ru: "Очень надёжный", it: "Molto forte", tr: "Çok güçlü", ko: "매우 강함", ar: "قوية جداً", hi: "बहुत मज़बूत", id: "Sangat kuat", vi: "Rất mạnh", },
  crackTitle: {
    en: "Time to crack",
    zh: "被破解所需时间",
    ja: "解読にかかる時間",
    es: "Tiempo para descifrarla",
    pt: "Tempo para quebrar",
    fr: "Temps de fissuration", de: "Knackzeit", ru: "Время взлома", it: "Tempo di crack", tr: "Kırma süresi", ko: "해시에 걸리는 시간", ar: "زمن التكسير", hi: "क्रैक होने का समय", id: "Waktu untuk dibobol", vi: "Thời gian bị bẻ khóa",
  },
  online: {
    en: "Online attack, throttled (100 guesses/hour)",
    zh: "在线攻击、被限速(每小时 100 次猜测)",
    ja: "オンライン攻撃・制限付き(毎時 100 回)",
    es: "Ataque en línea con límite (100 intentos/hora)",
    pt: "Ataque online limitado (100 tentativas/hora)",
    fr: "Attaque en ligne limitée (100 essais/heure)", de: "Online-Angriff, gedrosselt (100 Versuche/Stunde)", ru: "Онлайн-атака с ограничением (100 попыток/час)", it: "Attacco online con limiti (100 tentativi/ora)", tr: "Çevrimiçi saldırı, kısıtlı (100 deneme/saat)", ko: "온라인 공격, 제한됨(시간당 100회)", ar: "هجوم عبر الإنترنت مقيّد (100 محاولة/ساعة)", hi: "ऑनलाइन हमला, थ्रॉटल्ड (100 प्रयास/घंटा)", id: "Serangan online dibatasi (100 percobaan/jam)", vi: "Tấn công trực tuyến bị chặn (100 lần/giờ)",
  },
  offlineSlow: {
    en: "Offline attack, slow hash (10,000 guesses/s)",
    zh: "离线攻击、慢哈希(每秒 1 万次)",
    ja: "オフライン攻撃・低速ハッシュ(毎秒 1 万回)",
    es: "Ataque sin conexión, hash lento (10.000 intentos/s)",
    pt: "Ataque offline, hash lento (10.000 tentativas/s)",
    fr: "Attaque hors ligne, hachage lent (10 000 essais/s)", de: "Offline-Angriff, langsamer Hash (10.000 Versuche/s)", ru: "Офлайн-атака, медленный хэш (10 000 попыток/с)", it: "Attacco offline, hash lento (10.000 tentativi/s)", tr: "Çevrimdışı saldırı, yavaş hash (10.000 deneme/sn)", ko: "오프라인 공격, 느린 해시(초당 1만 회)", ar: "هجوم دون اتصال، تجزئة بطيئة (10 آلاف محاولة/ث)", hi: "ऑफ़लाइन हमला, धीमा हैश (10,000 प्रयास/सेकंड)", id: "Serangan offline, hash lambat (10.000 percobaan/detik)", vi: "Tấn công ngoại tuyến, băm chậm (10.000 lần/giây)",
  },
  offlineFast: {
    en: "Offline attack, fast hash (10 billion guesses/s)",
    zh: "离线攻击、快哈希(每秒 100 亿次)",
    ja: "オフライン攻撃・高速ハッシュ(毎秒 100 億回)",
    es: "Ataque sin conexión, hash rápido (10.000 millones/s)",
    pt: "Ataque offline, hash rápido (10 bilhões/s)",
    fr: "Attaque hors ligne, hachage rapide (10 milliards d'essais/s)", de: "Offline-Angriff, schneller Hash (10 Milliarden Versuche/s)", ru: "Офлайн-атака, быстрый хэш (10 млрд попыток/с)", it: "Attacco offline, hash veloce (10 miliardi di tentativi/s)", tr: "Çevrimdışı saldırı, hızlı hash (10 milyar deneme/sn)", ko: "오프라인 공격, 빠른 해시(초당 100억 회)", ar: "هجوم دون اتصال، تجزئة سريعة (10 مليارات محاولة/ث)", hi: "ऑफ़लाइन हमला, तेज़ हैश (10 अरब प्रयास/सेकंड)", id: "Serangan offline, hash cepat (10 miliar percobaan/detik)", vi: "Tấn công ngoại tuyến, băm nhanh (10 tỷ lần/giây)",
  },
  tips: { en: "Suggestions", zh: "改进建议", ja: "改善のヒント", es: "Sugerencias", pt: "Sugestões", fr: "Suggestions", de: "Empfehlungen", ru: "Рекомендации", it: "Suggerimenti", tr: "Öneriler", ko: "개선 제안", ar: "اقتراحات", hi: "सुझाव", id: "Saran", vi: "Gợi ý", },
  warning: { en: "Warning", zh: "注意", ja: "警告", es: "Aviso", pt: "Aviso", fr: "Avertissement", de: "Warnung", ru: "Предупреждение", it: "Avviso", tr: "Uyarı", ko: "경고", ar: "تحذير", hi: "चेतावनी", id: "Peringatan", vi: "Cảnh báo", },
  localNote: {
    en: "Analyzed locally with the zxcvbn algorithm in your browser — the password is never sent anywhere.",
    zh: "由浏览器内的 zxcvbn 算法本地分析——密码不会被发送到任何地方。",
    ja: "ブラウザ内の zxcvbn アルゴリズムでローカルに判定。パスワードはどこにも送信されません。",
    es: "Analizada en tu navegador con el algoritmo zxcvbn: la contraseña no se envía a ningún sitio.",
    pt: "Analisada no seu navegador com o algoritmo zxcvbn — a senha nunca é enviada a lugar algum.", fr: "Analysé localement avec l'algorithme zxcvbn dans votre navigateur — le mot de passe n'est jamais envoyé.", de: "Lokal im Browser mit dem zxcvbn-Algorithmus analysiert — das Passwort wird nie gesendet.", ru: "Анализ локально в браузере алгоритмом zxcvbn — пароль никуда не отправляется.", it: "Analizzato localmente con l'algoritmo zxcvbn nel browser — la password non viene mai inviata.", tr: "Tarayıcınızda zxcvbn algoritmasıyla yerel olarak analiz edilir — şifre asla gönderilmez.", ko: "브라우저 내 zxcvbn 알고리즘으로 로컬 분석 — 비밀번호는 어디로도 전송되지 않습니다.", ar: "يُحلَّل محلياً بخوارزمية zxcvbn في متصفحك — لا تُرسل كلمة المرور إلى أي مكان.", hi: "आपके ब्राउज़र में zxcvbn एल्गोरिद्म से लोकल विश्लेषण — पासवर्ड कहीं नहीं भेजा जाता।", id: "Dianalisis secara lokal dengan algoritma zxcvbn di browser — kata sandi tak pernah dikirim.", vi: "Phân tích cục bộ bằng thuật toán zxcvbn ngay trong trình duyệt — mật khẩu không bao giờ được gửi đi.",
  },
};

type ZxcvbnFn = (password: string, userInputs?: (string | number)[]) => ZxcvbnResult;

const SCORE_COLORS = ["#c0392b", "#c0392b", "#b8860b", "#1a7f37", "#1a7f37"];

export function SecPasswordStrengthEngine() {
  const { locale } = useI18n();
  const L = (key: string) => LABELS[key][locale] ?? LABELS[key].en;

  const [pw, setPw] = useState("");
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [result, setResult] = useState<ZxcvbnResult | null>(null);
  const zxcvbnRef = useRef<ZxcvbnFn | null>(null);

  // 动态加载 zxcvbn + 词典,并按当前语言装填翻译
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [{ zxcvbn, zxcvbnOptions }, common] = await Promise.all([
        import("@zxcvbn-ts/core"),
        import("@zxcvbn-ts/language-common"),
      ]);
      zxcvbnOptions.setOptions({
        dictionary: { ...common.dictionary },
        translations: TRANSLATIONS[locale] ?? TRANSLATIONS.en,
      });
      if (!cancelled) {
        zxcvbnRef.current = zxcvbn as ZxcvbnFn;
        setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [locale]);

  // 防抖后本地评分
  useEffect(() => {
    if (!ready) return;
    const id = setTimeout(() => {
      const zxcvbn = zxcvbnRef.current;
      if (!zxcvbn) return;
      setResult(pw.length > 0 ? zxcvbn(pw.slice(0, 256)) : null);
    }, 180);
    return () => clearTimeout(id);
  }, [pw, ready]);

  const score = result ? result.score : -1;
  const scoreLabel = score >= 0 ? L(`s${score}`) : "";

  return (
    <ToolPanel>
      <div className="space-y-5">
        <div className="relative">
          <input
            type={visible ? "text" : "password"}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder={L("placeholder")}
            className="field mono pr-20"
            autoComplete="off"
            spellCheck={false}
            aria-label={L("placeholder")}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border hairline px-3 py-1 text-[12.5px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {visible ? L("hide") : L("show")}
          </button>
        </div>

        {pw.length > 0 && (
          <div className="space-y-2">
            <div className="flex gap-1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-2 flex-1 rounded-full transition-colors"
                  style={{ background: i <= score ? SCORE_COLORS[score] : "var(--color-surface)" }}
                />
              ))}
            </div>
            {score >= 0 && (
              <p className="text-[14px] font-semibold" style={{ color: SCORE_COLORS[score] }}>
                {scoreLabel}
              </p>
            )}
          </div>
        )}

        {result && (
          <div className="space-y-3">
            <div className="rounded-xl border hairline p-4">
              <p className="mb-2.5 text-[13.5px] font-semibold">{L("crackTitle")}</p>
              <dl className="space-y-1.5 text-[13.5px]">
                {(
                  [
                    ["online", "onlineThrottling100PerHour"],
                    ["offlineSlow", "offlineSlowHashing1e4PerSecond"],
                    ["offlineFast", "offlineFastHashing1e10PerSecond"],
                  ] as const
                ).map(([key, field]) => (
                  <div key={key} className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <dt className="text-[var(--color-sub)]">{L(key)}</dt>
                    <dd className="mono font-semibold">{result.crackTimesDisplay[field]}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {result.feedback.warning && (
              <p className="rounded-xl bg-[rgba(178,80,0,0.08)] px-4 py-2.5 text-[13.5px] leading-6 text-[var(--color-bad)]">
                <span className="font-semibold">{L("warning")}: </span>
                {result.feedback.warning}
              </p>
            )}

            {result.feedback.suggestions.length > 0 && (
              <div>
                <p className="mb-1.5 text-[13.5px] font-semibold">{L("tips")}</p>
                <ul className="space-y-1.5">
                  {result.feedback.suggestions.map((s, i) => (
                    <li key={i} className="flex gap-2 text-[13.5px] leading-6 text-[var(--color-sub)]">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--color-accent)]" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <p className="text-[13px] leading-5 text-[var(--color-sub)]">{L("localNote")}</p>
      </div>
    </ToolPanel>
  );
}
