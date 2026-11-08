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
  fr: {
    warnings: {
      straightRow: "Les touches en ligne droite sont faciles à deviner.",
      keyPattern: "Les courts motifs de clavier sont faciles à deviner.",
      simpleRepeat: "Les caractères répétés comme “aaa” sont faciles à deviner.",
      extendedRepeat: "Les motifs répétés comme “abcabcabc” sont faciles à deviner.",
      sequences: "Les suites de caractères sont faciles à deviner.",
      recentYears: "Les années récentes sont faciles à deviner.",
      dates: "Les dates sont faciles à deviner.",
      topTen: "Ce mot de passe fait partie des 10 mots de passe les plus courants.",
      topHundred: "Ce mot de passe fait partie des 100 mots de passe les plus courants.",
      common: "C'est un mot de passe très courant.",
      similarToCommon: "Ce mot de passe ressemble à un mot de passe couramment utilisé.",
      wordByItself: "Un mot seul est facile à deviner.",
      namesByThemselves: "Les noms seuls sont faciles à deviner.",
      commonNames: "Les prénoms et noms de famille courants sont faciles à deviner.",
      userInputs: "Ce mot de passe contient des informations personnelles.",
      pwned: "Ce mot de passe est apparu dans des fuites de données connues.",
    },
    suggestions: {
      l33t: "Les substitutions prévisibles comme “@” à la place de “a” n'aident pas beaucoup.",
      reverseWords: "Les mots à l'envers ne sont pas beaucoup plus difficiles à deviner.",
      allUppercase: "Mettre uniquement la première lettre ou toutes les lettres en majuscules n'aide pas beaucoup.",
      capitalization: "Mettre quelques lettres en majuscules aide un peu, mais plus long est préférable.",
      dates: "Évitez les dates et les années qui vous concernent personnellement.",
      recentYears: "Évitez les années récentes.",
      associatedYears: "Évitez les années qui vous sont associées.",
      sequences: "Évitez les suites de caractères comme “abcd”.",
      repeated: "Évitez les caractères répétés comme “aaa”.",
      longerKeyboardPattern: "Utilisez des motifs de clavier plus longs, avec plus de changements de direction.",
      anotherWord: "Ajoutez un ou deux mots supplémentaires — les mots peu courants sont préférables.",
      useWords: "Utilisez quelques mots plutôt qu'un seul — une phrase de passe est facile à taper et difficile à craquer.",
      noNeed: "Vous pouvez créer des mots de passe robustes sans symboles, chiffres ni majuscules.",
      pwned: "Ce mot de passe a été exposé dans une fuite de données — ne l'utilisez plus jamais.",
    },
    timeEstimation: {
      ltSecond: "instantané",
      second: "{base} seconde",
      seconds: "{base} secondes",
      minute: "{base} minute",
      minutes: "{base} minutes",
      hour: "{base} heure",
      hours: "{base} heures",
      day: "{base} jour",
      days: "{base} jours",
      month: "{base} mois",
      months: "{base} mois",
      year: "{base} an",
      years: "{base} ans",
      centuries: "siècles",
    },
  },
  de: {
    warnings: {
      straightRow: "Tasten in gerader Linie sind leicht zu erraten.",
      keyPattern: "Kurze Tastaturmuster sind leicht zu erraten.",
      simpleRepeat: "Wiederholte Zeichen wie “aaa” sind leicht zu erraten.",
      extendedRepeat: "Wiederholte Zeichenmuster wie “abcabcabc” sind leicht zu erraten.",
      sequences: "Zeichenfolgen sind leicht zu erraten.",
      recentYears: "Aktuelle Jahreszahlen sind leicht zu erraten.",
      dates: "Daten sind leicht zu erraten.",
      topTen: "Dies ist eines der 10 häufigsten Passwörter.",
      topHundred: "Dies ist eines der 100 häufigsten Passwörter.",
      common: "Dies ist ein sehr häufiges Passwort.",
      similarToCommon: "Dies ähnelt einem häufig verwendeten Passwort.",
      wordByItself: "Ein einzelnes Wort ist leicht zu erraten.",
      namesByThemselves: "Einzelne Namen sind leicht zu erraten.",
      commonNames: "Häufige Vor- und Nachnamen sind leicht zu erraten.",
      userInputs: "Dieses Passwort enthält persönliche Informationen.",
      pwned: "Dieses Passwort ist in bekannten Datenlecks aufgetaucht.",
    },
    suggestions: {
      l33t: "Vorhersehbare Ersetzungen wie “@” statt “a” helfen nicht viel.",
      reverseWords: "Rückwärts geschriebene Wörter sind kaum schwerer zu erraten.",
      allUppercase: "Nur den ersten oder alle Buchstaben großzuschreiben hilft nicht viel.",
      capitalization: "Einige Buchstaben großzuschreiben hilft ein wenig, aber länger ist besser.",
      dates: "Vermeiden Sie Daten und Jahreszahlen, die Sie persönlich betreffen.",
      recentYears: "Vermeiden Sie aktuelle Jahreszahlen.",
      associatedYears: "Vermeiden Sie Jahreszahlen, die mit Ihnen in Verbindung stehen.",
      sequences: "Vermeiden Sie Zeichenfolgen wie “abcd”.",
      repeated: "Vermeiden Sie wiederholte Zeichen wie “aaa”.",
      longerKeyboardPattern: "Verwenden Sie längere Tastaturmuster mit mehr Richtungswechseln.",
      anotherWord: "Fügen Sie ein oder zwei weitere Wörter hinzu — ungewöhnliche Wörter sind besser.",
      useWords: "Verwenden Sie mehrere Wörter statt nur einem — eine Passphrase ist leicht einzugeben und schwer zu knacken.",
      noNeed: "Sie können starke Passwörter auch ohne Symbole, Zahlen oder Großbuchstaben erstellen.",
      pwned: "Dieses Passwort war in einem Datenleck enthalten — verwenden Sie es nie wieder.",
    },
    timeEstimation: {
      ltSecond: "sofort",
      second: "{base} Sekunde",
      seconds: "{base} Sekunden",
      minute: "{base} Minute",
      minutes: "{base} Minuten",
      hour: "{base} Stunde",
      hours: "{base} Stunden",
      day: "{base} Tag",
      days: "{base} Tage",
      month: "{base} Monat",
      months: "{base} Monate",
      year: "{base} Jahr",
      years: "{base} Jahre",
      centuries: "Jahrhunderte",
    },
  },
  ru: {
    warnings: {
      straightRow: "Клавиши, идущие подряд по прямой линии, легко угадать.",
      keyPattern: "Короткие шаблоны набора на клавиатуре легко угадать.",
      simpleRepeat: "Повторяющиеся символы вроде “aaa” легко угадать.",
      extendedRepeat: "Повторяющиеся шаблоны символов вроде “abcabcabc” легко угадать.",
      sequences: "Последовательности символов легко угадать.",
      recentYears: "Недавние годы легко угадать.",
      dates: "Даты легко угадать.",
      topTen: "Это один из 10 самых распространённых паролей.",
      topHundred: "Это один из 100 самых распространённых паролей.",
      common: "Это очень распространённый пароль.",
      similarToCommon: "Этот пароль похож на часто используемый.",
      wordByItself: "Отдельное слово легко угадать.",
      namesByThemselves: "Отдельные имена легко угадать.",
      commonNames: "Распространённые имена и фамилии легко угадать.",
      userInputs: "Этот пароль содержит ваши личные данные.",
      pwned: "Этот пароль встречался в известных утечках данных.",
    },
    suggestions: {
      l33t: "Предсказуемые подстановки вроде “@” вместо “a” почти не помогают.",
      reverseWords: "Слова, написанные наоборот, ненамного сложнее угадать.",
      allUppercase: "Если заглавная только первая буква или все буквы, это мало помогает.",
      capitalization: "Заглавные буквы в некоторых местах помогают лишь немного, лучше сделать пароль длиннее.",
      dates: "Избегайте дат и годов, связанных с вами лично.",
      recentYears: "Избегайте недавних годов.",
      associatedYears: "Избегайте годов, связанных с вами.",
      sequences: "Избегайте последовательностей символов вроде “abcd”.",
      repeated: "Избегайте повторяющихся символов вроде “aaa”.",
      longerKeyboardPattern: "Используйте более длинные шаблоны набора с большим числом поворотов.",
      anotherWord: "Добавьте ещё одно-два слова — лучше редкие слова.",
      useWords: "Используйте несколько слов вместо одного — парольная фраза легко вводится и трудно подбирается.",
      noNeed: "Надёжные пароли можно создавать и без символов, цифр и заглавных букв.",
      pwned: "Этот пароль попал в утечку данных — больше никогда его не используйте.",
    },
    timeEstimation: {
      ltSecond: "мгновенно",
      second: "{base} секунда",
      seconds: "{base} секунд",
      minute: "{base} минута",
      minutes: "{base} минут",
      hour: "{base} час",
      hours: "{base} часов",
      day: "{base} день",
      days: "{base} дней",
      month: "{base} месяц",
      months: "{base} месяцев",
      year: "{base} год",
      years: "{base} лет",
      centuries: "века",
    },
  },
  it: {
    warnings: {
      straightRow: "I tasti in linea retta sono facili da indovinare.",
      keyPattern: "Le sequenze brevi sulla tastiera sono facili da indovinare.",
      simpleRepeat: "I caratteri ripetuti come “aaa” sono facili da indovinare.",
      extendedRepeat: "Le sequenze ripetute come “abcabcabc” sono facili da indovinare.",
      sequences: "Le sequenze di caratteri sono facili da indovinare.",
      recentYears: "Gli anni recenti sono facili da indovinare.",
      dates: "Le date sono facili da indovinare.",
      topTen: "Questa è una delle 10 password più comuni.",
      topHundred: "Questa è una delle 100 password più comuni.",
      common: "Questa è una password molto comune.",
      similarToCommon: "Questa password è simile a una password molto usata.",
      wordByItself: "Una singola parola è facile da indovinare.",
      namesByThemselves: "I nomi da soli sono facili da indovinare.",
      commonNames: "Nomi e cognomi comuni sono facili da indovinare.",
      userInputs: "Questa password contiene informazioni personali.",
      pwned: "Questa password è comparsa in violazioni di dati note.",
    },
    suggestions: {
      l33t: "Sostituzioni prevedibili come “@” al posto di “a” non aiutano molto.",
      reverseWords: "Le parole al contrario non sono molto più difficili da indovinare.",
      allUppercase: "Mettere in maiuscolo solo la prima lettera o tutte le lettere non aiuta molto.",
      capitalization: "Maiuscole su alcune lettere aiutano un po', ma è meglio allungare.",
      dates: "Evita date e anni legati alla tua vita personale.",
      recentYears: "Evita gli anni recenti.",
      associatedYears: "Evita gli anni legati a te.",
      sequences: "Evita sequenze di caratteri come “abcd”.",
      repeated: "Evita caratteri ripetuti come “aaa”.",
      longerKeyboardPattern: "Usa pattern di tastiera più lunghi e con più cambi di direzione.",
      anotherWord: "Aggiungi una o due parole — meglio se poco comuni.",
      useWords: "Usa qualche parola invece di una sola: una passphrase è facile da digitare e difficile da violare.",
      noNeed: "Puoi creare password robuste senza simboli, numeri o maiuscole.",
      pwned: "Questa password è stata esposta in una violazione di dati — non usarla mai più.",
    },
    timeEstimation: {
      ltSecond: "istantaneo",
      second: "{base} secondo",
      seconds: "{base} secondi",
      minute: "{base} minuto",
      minutes: "{base} minuti",
      hour: "{base} ora",
      hours: "{base} ore",
      day: "{base} giorno",
      days: "{base} giorni",
      month: "{base} mese",
      months: "{base} mesi",
      year: "{base} anno",
      years: "{base} anni",
      centuries: "secoli",
    },
  },
  tr: {
    warnings: {
      straightRow: "Düz bir çizgi boyunca sıralanan tuşlar kolayca tahmin edilir.",
      keyPattern: "Kısa klavye desenleri kolayca tahmin edilir.",
      simpleRepeat: "“aaa” gibi tekrarlanan karakterler kolayca tahmin edilir.",
      extendedRepeat: "“abcabcabc” gibi tekrarlanan karakter desenleri kolayca tahmin edilir.",
      sequences: "Ardışık karakter dizileri kolayca tahmin edilir.",
      recentYears: "Son yıllar kolayca tahmin edilir.",
      dates: "Tarihler kolayca tahmin edilir.",
      topTen: "Bu, en yaygın 10 şifreden biri.",
      topHundred: "Bu, en yaygın 100 şifreden biri.",
      common: "Bu çok yaygın bir şifre.",
      similarToCommon: "Bu şifre, sık kullanılan bir şifreye benziyor.",
      wordByItself: "Tek başına bir kelime kolayca tahmin edilir.",
      namesByThemselves: "Tek başına kullanılan isimler kolayca tahmin edilir.",
      commonNames: "Yaygın ad ve soyadlar kolayca tahmin edilir.",
      userInputs: "Bu şifre kişisel bilgiler içeriyor.",
      pwned: "Bu şifre bilinen veri sızıntılarında yer aldı.",
    },
    suggestions: {
      l33t: "“a” yerine “@” gibi öngörülebilir değişimler pek işe yaramaz.",
      reverseWords: "Tersten yazılan kelimeler tahmin edilmesini pek zorlaştırmaz.",
      allUppercase: "Yalnızca ilk harfi ya da tüm harfleri büyük yapmak pek işe yaramaz.",
      capitalization: "Bazı harfleri büyük yapmak biraz işe yarar, ama daha uzun olması daha iyidir.",
      dates: "Sana özel tarih ve yılları kullanma.",
      recentYears: "Son yılları kullanma.",
      associatedYears: "Seninle ilgili yılları kullanma.",
      sequences: "“abcd” gibi ardışık karakter dizilerini kullanma.",
      repeated: "“aaa” gibi tekrarlanan karakterleri kullanma.",
      longerKeyboardPattern: "Daha uzun ve daha çok dönüşlü klavye desenleri kullan.",
      anotherWord: "Bir iki kelime daha ekle — sıra dışı kelimeler daha iyidir.",
      useWords: "Tek bir kelime yerine birkaç kelime kullan: şifre cümlesi yazması kolay, kırması zordur.",
      noNeed: "Sembol, sayı veya büyük harf olmadan da güçlü şifreler oluşturabilirsin.",
      pwned: "Bu şifre bir veri sızıntısında ifşa edildi — bir daha asla kullanma.",
    },
    timeEstimation: {
      ltSecond: "anında",
      second: "{base} saniye",
      seconds: "{base} saniye",
      minute: "{base} dakika",
      minutes: "{base} dakika",
      hour: "{base} saat",
      hours: "{base} saat",
      day: "{base} gün",
      days: "{base} gün",
      month: "{base} ay",
      months: "{base} ay",
      year: "{base} yıl",
      years: "{base} yıl",
      centuries: "yüzyıllar",
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
  ko: {
    warnings: {
      straightRow: "키보드에서 일직선으로 이어진 조합은 쉽게 알아맞힐 수 있습니다.",
      keyPattern: "짧은 키보드 패턴은 쉽게 알아맞힐 수 있습니다.",
      simpleRepeat: "“aaa”처럼 반복되는 문자는 쉽게 알아맞힐 수 있습니다.",
      extendedRepeat: "“abcabcabc”처럼 반복되는 문자 패턴은 쉽게 알아맞힐 수 있습니다.",
      sequences: "연속된 문자 시퀀스는 쉽게 알아맞힐 수 있습니다.",
      recentYears: "최근 연도는 쉽게 알아맞힐 수 있습니다.",
      dates: "날짜는 쉽게 알아맞힐 수 있습니다.",
      topTen: "가장 흔히 쓰이는 10위권 비밀번호입니다.",
      topHundred: "가장 흔히 쓰이는 100위권 비밀번호입니다.",
      common: "매우 흔히 쓰이는 비밀번호입니다.",
      similarToCommon: "널리 쓰이는 비밀번호와 매우 비슷합니다.",
      wordByItself: "단어 하나만으로는 쉽게 알아맞힐 수 있습니다.",
      namesByThemselves: "이름만 단독으로 쓰면 쉽게 알아맞힐 수 있습니다.",
      commonNames: "흔한 성과 이름 조합은 쉽게 알아맞힐 수 있습니다.",
      userInputs: "이 비밀번호에는 개인 정보가 들어 있습니다.",
      pwned: "이 비밀번호는 알려진 데이터 유출 사건에 등장한 적이 있습니다.",
    },
    suggestions: {
      l33t: "“a”를 “@”로 바꾸는 식의 예측 가능한 치환은 큰 도움이 되지 않습니다.",
      reverseWords: "단어를 거꾸로 써도 알아맞히기 어려워지지 않습니다.",
      allUppercase: "첫 글자만 또는 모든 글자를 대문자로 바꾸는 것은 큰 도움이 되지 않습니다.",
      capitalization: "일부 글자를 대문자로 바꾸면 조금 도움이 되지만, 길이를 늘리는 편이 더 효과적입니다.",
      dates: "본인과 관련된 날짜와 연도는 피하세요.",
      recentYears: "최근 연도는 피하세요.",
      associatedYears: "본인과 관련된 연도는 피하세요.",
      sequences: "“abcd”처럼 이어지는 문자는 피하세요.",
      repeated: "“aaa”처럼 반복되는 문자는 피하세요.",
      longerKeyboardPattern: "키보드 패턴은 더 길게, 방향 전환을 더 많이 해서 쓰세요.",
      anotherWord: "단어를 한두 개 더 추가하세요. 흔하지 않은 단어일수록 좋습니다.",
      useWords: "단어 하나 대신 여러 단어로 된 패스프레이즈를 쓰세요. 입력하기 쉽고 깨기도 어렵습니다.",
      noNeed: "기호, 숫자, 대문자 없이도 강한 비밀번호를 만들 수 있습니다.",
      pwned: "이 비밀번호는 유출 데이터에 노출된 적이 있습니다. 다시는 쓰지 마세요.",
    },
    timeEstimation: {
      ltSecond: "즉시",
      second: "{base}초",
      seconds: "{base}초",
      minute: "{base}분",
      minutes: "{base}분",
      hour: "{base}시간",
      hours: "{base}시간",
      day: "{base}일",
      days: "{base}일",
      month: "{base}개월",
      months: "{base}개월",
      year: "{base}년",
      years: "{base}년",
      centuries: "수 세기",
    },
  },
  ar: {
    warnings: {
      straightRow: "الصفوف المستقيمة من المفاتيح سهلة التخمين.",
      keyPattern: "الأنماط القصيرة على لوحة المفاتيح سهلة التخمين.",
      simpleRepeat: "الأحرف المتكررة مثل “aaa” سهلة التخمين.",
      extendedRepeat: "الأنماط المتكررة مثل “abcabcabc” سهلة التخمين.",
      sequences: "التسلسلات المتتالية من الأحرف سهلة التخمين.",
      recentYears: "السنوات الأخيرة سهلة التخمين.",
      dates: "التواريخ سهلة التخمين.",
      topTen: "هذه كلمة مرور ضمن الأكثر شيوعًا (أعلى 10).",
      topHundred: "هذه كلمة مرور ضمن الأكثر شيوعًا (أعلى 100).",
      common: "هذه كلمة مرور شائعة جدًا.",
      similarToCommon: "هذه الكلمة تشبه كلمة مرور شائعة الاستخدام.",
      wordByItself: "كلمة واحدة بمفردها سهلة التخمين.",
      namesByThemselves: "الأسماء المفردة سهلة التخمين.",
      commonNames: "الأسماء الأولى والعائلة الشائعة سهلة التخمين.",
      userInputs: "تحتوي كلمة المرور هذه على معلومات شخصية.",
      pwned: "ظهرت كلمة المرور هذه في تسريبات بيانات معروفة.",
    },
    suggestions: {
      l33t: "الاستبدالات المتوقعة مثل استخدام “@” بدلًا من “a” لا تساعد كثيرًا.",
      reverseWords: "الكلمات المعكوسة ليست أصعب في التخمين.",
      allUppercase: "كتابة الحرف الأول أو جميع الأحرف بحروف كبيرة لا يساعد كثيرًا.",
      capitalization: "كتابة بعض الأحرف بحروف كبيرة يساعد قليلًا، لكن الأفضل زيادة الطول.",
      dates: "تجنّب التواريخ والسنوات المرتبطة بشخصك.",
      recentYears: "تجنّب السنوات الأخيرة.",
      associatedYears: "تجنّب السنوات المرتبطة بك.",
      sequences: "تجنّب التسلسلات المتتالية مثل “abcd”.",
      repeated: "تجنّب الأحرف المتكررة مثل “aaa”.",
      longerKeyboardPattern: "استخدم أنماطًا أطول على لوحة المفاتيح مع تغييرات اتجاه أكثر.",
      anotherWord: "أضف كلمة أو كلمتين إضافيتين — الكلمات غير الشائعة أفضل.",
      useWords: "استخدم عدة كلمات بدلًا من كلمة واحدة — عبارة المرور سهلة الكتابة وصعبة الكسر.",
      noNeed: "يمكنك إنشاء كلمة مرور قوية بدون رموز أو أرقام أو أحرف كبيرة.",
      pwned: "كلمة المرور هذه ظهرت في تسريب بيانات — لا تستخدمها أبدًا مرة أخرى.",
    },
    timeEstimation: {
      ltSecond: "فوري",
      second: "{base} ثانية",
      seconds: "{base} ثانية",
      minute: "{base} دقيقة",
      minutes: "{base} دقيقة",
      hour: "{base} ساعة",
      hours: "{base} ساعة",
      day: "{base} يوم",
      days: "{base} يوم",
      month: "{base} شهر",
      months: "{base} شهر",
      year: "{base} سنة",
      years: "{base} سنة",
      centuries: "قرون",
    },
  },
  hi: {
    warnings: {
      straightRow: "कीबोर्ड की सीधी पंक्तियाँ आसानी से अनुमान लगाई जा सकती हैं।",
      keyPattern: "कीबोर्ड के छोटे पैटर्न आसानी से अनुमान लगाए जा सकते हैं।",
      simpleRepeat: "“aaa” जैसे दोहराए गए अक्षर आसानी से अनुमान लगाए जा सकते हैं।",
      extendedRepeat: "“abcabcabc” जैसे दोहराए गए पैटर्न आसानी से अनुमान लगाए जा सकते हैं।",
      sequences: "क्रम में लगे अक्षर आसानी से अनुमान लगाए जा सकते हैं।",
      recentYears: "हाल के वर्ष आसानी से अनुमान लगाए जा सकते हैं।",
      dates: "तारीखें आसानी से अनुमान लगाई जा सकती हैं।",
      topTen: "यह सबसे आम 10 पासवर्ड में से एक है।",
      topHundred: "यह सबसे आम 100 पासवर्ड में से एक है।",
      common: "यह बहुत आम पासवर्ड है।",
      similarToCommon: "यह किसी सामान्य रूप से उपयोग किए जाने वाले पासवर्ड के समान है।",
      wordByItself: "अकेला शब्द आसानी से अनुमान लगाया जा सकता है।",
      namesByThemselves: "अकेले नाम आसानी से अनुमान लगाए जा सकते हैं।",
      commonNames: "आम पहले और अंतिम नाम आसानी से अनुमान लगाए जा सकते हैं।",
      userInputs: "इस पासवर्ड में आपकी व्यक्तिगत जानकारी शामिल है।",
      pwned: "यह पासवर्ड ज्ञात डेटा लीक में दिखाई दिया है।",
    },
    suggestions: {
      l33t: "“a” की जगह “@” जैसे पूर्वानुमेय बदलाव ज़्यादा मदद नहीं करते।",
      reverseWords: "शब्दों को उलटने से उनका अनुमान लगाना काफ़ी कठिन नहीं हो जाता।",
      allUppercase: "केवल पहला अक्षर या सभी अक्षर कैपिटल करने से ज़्यादा मदद नहीं मिलती।",
      capitalization: "कुछ अक्षर कैपिटल करने से थोड़ी मदद मिलती है, लेकिन लंबा पासवर्ड बेहतर है।",
      dates: "अपने से जुड़ी तारीखों और वर्षों से बचें।",
      recentYears: "हाल के वर्षों से बचें।",
      associatedYears: "अपने से जुड़े वर्षों से बचें।",
      sequences: "“abcd” जैसे अक्षर क्रम से बचें।",
      repeated: "“aaa” जैसे दोहराए गए अक्षरों से बचें।",
      longerKeyboardPattern: "कीबोर्ड पैटर्न लंबे रखें और उनमें अधिक मोड़ों का उपयोग करें।",
      anotherWord: "एक या दो और शब्द जोड़ें — असामान्य शब्द बेहतर हैं।",
      useWords: "एक शब्द की जगह कुछ शब्दों का उपयोग करें — पैसेफ़्रेज़ टाइप करने में आसान और तोड़ने में कठिन होता है।",
      noNeed: "प्रतीक, संख्या या कैपिटल अक्षरों के बिना भी मज़बूत पासवर्ड बनाया जा सकता है।",
      pwned: "यह पासवर्ड डेटा लीक में उजागर हो चुका है — इसे दोबारा कभी उपयोग न करें।",
    },
    timeEstimation: {
      ltSecond: "तुरंत",
      second: "{base} सेकंड",
      seconds: "{base} सेकंड",
      minute: "{base} मिनट",
      minutes: "{base} मिनट",
      hour: "{base} घंटा",
      hours: "{base} घंटे",
      day: "{base} दिन",
      days: "{base} दिन",
      month: "{base} महीना",
      months: "{base} महीने",
      year: "{base} साल",
      years: "{base} साल",
      centuries: "सदियों",
    },
  },
  id: {
    warnings: {
      straightRow: "Deretan tombol yang lurus mudah ditebak.",
      keyPattern: "Pola keyboard pendek mudah ditebak.",
      simpleRepeat: "Karakter yang berulang seperti “aaa” mudah ditebak.",
      extendedRepeat: "Pola karakter yang berulang seperti “abcabcabc” mudah ditebak.",
      sequences: "Urutan karakter yang berurutan mudah ditebak.",
      recentYears: "Tahun-tahun terbaru mudah ditebak.",
      dates: "Tanggal mudah ditebak.",
      topTen: "Ini adalah salah satu dari 10 kata sandi paling umum.",
      topHundred: "Ini adalah salah satu dari 100 kata sandi paling umum.",
      common: "Ini adalah kata sandi yang sangat umum.",
      similarToCommon: "Kata sandi ini mirip dengan kata sandi yang sering digunakan.",
      wordByItself: "Satu kata saja mudah ditebak.",
      namesByThemselves: "Nama tunggal mudah ditebak.",
      commonNames: "Nama depan dan belakang yang umum mudah ditebak.",
      userInputs: "Kata sandi ini berisi informasi pribadi Anda.",
      pwned: "Kata sandi ini pernah muncul dalam kebocoran data yang diketahui.",
    },
    suggestions: {
      l33t: "Penggantian yang mudah diprediksi seperti “@” untuk “a” tidak banyak membantu.",
      reverseWords: "Kata yang dibalik tidak jauh lebih sulit ditebak.",
      allUppercase: "Huruf kapital hanya pada huruf pertama atau pada semua huruf tidak banyak membantu.",
      capitalization: "Huruf kapital pada beberapa huruf sedikit membantu, tetapi lebih panjang lebih baik.",
      dates: "Hindari tanggal dan tahun yang berkaitan dengan diri Anda.",
      recentYears: "Hindari tahun-tahun terbaru.",
      associatedYears: "Hindari tahun yang berkaitan dengan Anda.",
      sequences: "Hindari urutan karakter seperti “abcd”.",
      repeated: "Hindari karakter yang berulang seperti “aaa”.",
      longerKeyboardPattern: "Gunakan pola keyboard yang lebih panjang dengan lebih banyak belokan.",
      anotherWord: "Tambahkan satu atau dua kata lain — kata yang tidak umum lebih baik.",
      useWords: "Gunakan beberapa kata, bukan satu kata — passphrase mudah diketik dan sulit diretas.",
      noNeed: "Anda bisa membuat kata sandi yang kuat tanpa simbol, angka, atau huruf kapital.",
      pwned: "Kata sandi ini pernah bocor dalam kebocoran data — jangan pernah gunakan lagi.",
    },
    timeEstimation: {
      ltSecond: "instan",
      second: "{base} detik",
      seconds: "{base} detik",
      minute: "{base} menit",
      minutes: "{base} menit",
      hour: "{base} jam",
      hours: "{base} jam",
      day: "{base} hari",
      days: "{base} hari",
      month: "{base} bulan",
      months: "{base} bulan",
      year: "{base} tahun",
      years: "{base} tahun",
      centuries: "berabad-abad",
    },
  },
  vi: {
    warnings: {
      straightRow: "Các phím xếp thành hàng thẳng dễ bị đoán.",
      keyPattern: "Mẫu bàn phím ngắn dễ bị đoán.",
      simpleRepeat: "Các ký tự lặp lại như “aaa” dễ bị đoán.",
      extendedRepeat: "Mẫu ký tự lặp lại như “abcabcabc” dễ bị đoán.",
      sequences: "Chuỗi ký tự liên tiếp dễ bị đoán.",
      recentYears: "Các năm gần đây dễ bị đoán.",
      dates: "Ngày tháng dễ bị đoán.",
      topTen: "Đây là một trong 10 mật khẩu phổ biến nhất.",
      topHundred: "Đây là một trong 100 mật khẩu phổ biến nhất.",
      common: "Đây là mật khẩu rất phổ biến.",
      similarToCommon: "Mật khẩu này giống với một mật khẩu thường được sử dụng.",
      wordByItself: "Một từ đơn lẻ dễ bị đoán.",
      namesByThemselves: "Tên riêng đơn lẻ dễ bị đoán.",
      commonNames: "Họ và tên phổ biến dễ bị đoán.",
      userInputs: "Mật khẩu này chứa thông tin cá nhân của bạn.",
      pwned: "Mật khẩu này đã xuất hiện trong các vụ rò rỉ dữ liệu đã biết.",
    },
    suggestions: {
      l33t: "Các thay thế dễ đoán như dùng “@” thay cho “a” không giúp được bao nhiêu.",
      reverseWords: "Viết ngược từ không làm khó đoán hơn bao nhiêu.",
      allUppercase: "Viết hoa chỉ chữ đầu tiên hoặc toàn bộ chữ không giúp được bao nhiêu.",
      capitalization: "Viết hoa một số chữ giúp một chút, nhưng dài hơn thì tốt hơn.",
      dates: "Tránh dùng ngày tháng và năm liên quan đến bản thân bạn.",
      recentYears: "Tránh các năm gần đây.",
      associatedYears: "Tránh các năm liên quan đến bạn.",
      sequences: "Tránh chuỗi ký tự liên tiếp như “abcd”.",
      repeated: "Tránh các ký tự lặp lại như “aaa”.",
      longerKeyboardPattern: "Dùng mẫu bàn phím dài hơn với nhiều lần rẽ hướng hơn.",
      anotherWord: "Thêm một hoặc hai từ khác — từ ít phổ biến sẽ tốt hơn.",
      useWords: "Dùng vài từ thay vì một từ — cụm mật khẩu dễ gõ và khó bị bẻ khóa.",
      noNeed: "Bạn có thể tạo mật khẩu mạnh mà không cần ký hiệu, số hay chữ hoa.",
      pwned: "Mật khẩu này đã bị lộ trong một vụ rò rỉ dữ liệu — đừng bao giờ dùng lại.",
    },
    timeEstimation: {
      ltSecond: "tức thời",
      second: "{base} giây",
      seconds: "{base} giây",
      minute: "{base} phút",
      minutes: "{base} phút",
      hour: "{base} giờ",
      hours: "{base} giờ",
      day: "{base} ngày",
      days: "{base} ngày",
      month: "{base} tháng",
      months: "{base} tháng",
      year: "{base} năm",
      years: "{base} năm",
      centuries: "hàng thế kỷ",
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
