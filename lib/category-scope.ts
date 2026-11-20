import type { Locale } from './site';

// Scope is category-specific; live query tools must not inherit an offline promise.
export const CATEGORY_SCOPE: Record<Locale, [string, string]> = {
 en: ['Passwords and security calculations run locally. DNS, email-domain, IP and WHOIS lookups send the stated query to external providers; each tool explains what is sent.', 'Converters and most calculators run locally. The currency converter fetches public rates from an external provider; amounts are calculated on your device.'],
 zh: ['密码生成和安全计算在本机运行。DNS、邮箱域名、IP 与 WHOIS 查询会把注明的查询内容发送给外部服务，各工具会说明发送字段。', '换算器和大多数计算器在本机运行。汇率工具从外部服务获取公开汇率，金额计算在你的设备上完成。'],
 ja: ['パスワード生成と安全性の計算はローカルです。DNS・メールドメイン・IP・WHOIS 検索は明示した内容を外部サービスへ送り、各ツールが送信項目を説明します。', '換算と多くの計算はローカルです。通貨換算は外部の公開レートを取得し、金額自体は端末で計算します。'],
 es: ['Las contraseñas y cálculos de seguridad son locales. Las consultas DNS, dominio de correo, IP y WHOIS envían la consulta indicada a proveedores externos; cada herramienta explica los campos.', 'Los conversores y la mayoría de calculadoras son locales. El conversor de divisas obtiene tipos públicos externos; el importe se calcula en tu dispositivo.'],
 pt: ['Senhas e cálculos de segurança são locais. Consultas DNS, domínio de email, IP e WHOIS enviam a consulta indicada a provedores externos; cada ferramenta explica os campos.', 'Conversores e a maioria das calculadoras são locais. O conversor de moedas busca cotações públicas externas; os valores são calculados no dispositivo.'],
 fr: ['Les mots de passe et calculs de sécurité sont locaux. Les recherches DNS, domaine de courriel, IP et WHOIS envoient la requête indiquée à des fournisseurs externes ; chaque outil précise les champs.', 'Les conversions et la plupart des calculs sont locaux. Le convertisseur de devises récupère des taux publics externes ; le montant est calculé sur votre appareil.'],
 de: ['Passwörter und Sicherheitsberechnungen sind lokal. DNS-, E-Mail-Domain-, IP- und WHOIS-Abfragen senden die bezeichnete Anfrage an externe Anbieter; jedes Werkzeug erklärt die Felder.', 'Umrechnungen und die meisten Berechnungen sind lokal. Der Währungsrechner lädt öffentliche Kurse extern; Ihr Betrag wird auf dem Gerät berechnet.'],
 ru: ['Пароли и вычисления безопасности выполняются локально. DNS, домен почты, IP и WHOIS отправляют указанный запрос внешним сервисам; каждое средство объясняет состав данных.', 'Преобразования и большинство расчётов локальны. Валютный калькулятор получает публичные курсы извне, а сумму рассчитывает на устройстве.'],
 it: ['Password e calcoli di sicurezza sono locali. Le ricerche DNS, dominio email, IP e WHOIS inviano la richiesta indicata a fornitori esterni; ogni strumento spiega i campi.', 'Conversioni e molti calcoli sono locali. Il convertitore di valuta ottiene tassi pubblici esterni, mentre l’importo viene calcolato sul dispositivo.'],
 tr: ['Parolalar ve güvenlik hesapları yereldir. DNS, e-posta alanı, IP ve WHOIS sorguları belirtilen veriyi harici sağlayıcılara gönderir; her araç alanları açıklar.', 'Dönüşümler ve çoğu hesap yereldir. Döviz aracı genel kurları dışarıdan alır, tutarınızı cihazda hesaplar.'],
 ko: ['암호 생성과 보안 계산은 로컬에서 실행됩니다. DNS·이메일 도메인·IP·WHOIS 조회는 명시된 질의를 외부 제공자에 보내며 각 도구가 전송 항목을 설명합니다.', '변환과 대부분의 계산은 로컬입니다. 환율 도구는 외부 공개 환율을 가져오며 금액은 기기에서 계산합니다.'],
 ar: ['توليد كلمات المرور وحسابات الأمان محلية. ترسل استعلامات DNS ونطاق البريد وIP وWHOIS البيانات الموضحة إلى مزودات خارجية وتشرح كل أداة الحقول المرسلة.', 'التحويلات ومعظم الحسابات محلية. تجلب أداة العملات أسعاراً عامة من الخارج وتحسب المبلغ على جهازك.'],
 hi: ['पासवर्ड और सुरक्षा गणना स्थानीय हैं। DNS, ईमेल डोमेन, IP और WHOIS खोज बताए गए प्रश्न बाहरी प्रदाताओं को भेजती हैं; हर उपकरण भेजे गए फ़ील्ड बताता है।', 'परिवर्तन और अधिकांश गणनाएँ स्थानीय हैं। मुद्रा उपकरण बाहरी सार्वजनिक दरें लाता है और राशि की गणना आपके उपकरण पर करता है।'],
 id: ['Kata sandi dan perhitungan keamanan bersifat lokal. Pencarian DNS, domain email, IP dan WHOIS mengirim kueri yang dijelaskan ke penyedia luar; tiap alat menjelaskan bidangnya.', 'Konversi dan kebanyakan perhitungan bersifat lokal. Alat mata uang mengambil kurs publik eksternal dan menghitung jumlah di perangkat Anda.'],
 vi: ['Mật khẩu và phép tính bảo mật chạy cục bộ. Tra cứu DNS, miền email, IP và WHOIS gửi truy vấn đã nêu đến nhà cung cấp ngoài; từng công cụ giải thích dữ liệu gửi.', 'Chuyển đổi và hầu hết phép tính chạy cục bộ. Công cụ tiền tệ lấy tỷ giá công khai bên ngoài và tính số tiền trên thiết bị của bạn.'],
};

export const SECURITY_DESCRIPTION: Record<Locale, string> = {
 en:'Local password tools and security checks, plus clearly disclosed domain and IP lookups.',
 zh:'本地密码工具与安全检查，以及明确披露联网方式的域名和 IP 查询。',
 ja:'ローカルのパスワード・安全性ツールと、接続方法を明示したドメイン・IP 検索。',
 es:'Contraseñas y comprobaciones locales, más consultas de dominios e IP claramente explicadas.',
 pt:'Senhas e verificações locais, além de consultas de domínio e IP claramente explicadas.',
 fr:'Mots de passe et vérifications locales, avec recherches de domaines et IP clairement expliquées.',
 de:'Lokale Passwort- und Sicherheitswerkzeuge sowie klar erläuterte Domain- und IP-Abfragen.',
 ru:'Локальные пароли и проверки безопасности, а также явно описанные запросы доменов и IP.',
 it:'Password e verifiche locali, con ricerche di domini e IP chiaramente dichiarate.',
 tr:'Yerel parola ve güvenlik araçları, ayrıca açıkça belirtilen alan adı ve IP sorguları.',
 ko:'로컬 암호·보안 도구와 연결 방식을 명시한 도메인·IP 조회.',
 ar:'أدوات كلمات مرور وفحوص محلية مع توضيح استعلامات النطاق وIP الخارجية.',
 hi:'स्थानीय पासवर्ड और सुरक्षा जाँच, साथ में स्पष्ट बाहरी डोमेन और IP खोज।',
 id:'Alat kata sandi dan pemeriksaan lokal, serta kueri domain dan IP yang dijelaskan jelas.',
 vi:'Công cụ mật khẩu và kiểm tra cục bộ, cùng tra cứu tên miền và IP được giải thích rõ.',
};
