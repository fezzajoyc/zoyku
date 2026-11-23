/**
 * CN-035 ssl-certificate-inspector 扩展语言 overlay(10 语)。
 * 行文规范:fr=vouvoiement、de=Sie、ru=«»、ko=합니다체、ar=MSA。
 */

import type { ToolCopy } from "./types";

function common(
  intro: [string, string, string],
  steps: [string, string, string],
  faqs: Array<{ q: string; a: string }>,
) {
  return { intro, steps, faqs };
}

export const X509_OVERLAYS: Record<string, ToolCopy> = {
  fr: {
    name: "Inspecteur de certificats SSL et générateur auto-signé",
    tagline:
      "Décodez n'importe quel certificat PEM en sujet, validité, SAN, key usage et empreintes SHA-256/SHA-1 — ou générez un certificat auto-signé de test pour localhost et la préproduction. Tout s'exécute dans votre navigateur.",
    ...common(
      [
        "Collez un certificat PEM et lisez-le comme des faits : sujet et émetteur, numéro de série, version X.509, fenêtre de validité exacte avec les jours restants, algorithme de signature, taille de clé RSA, subject alternative names, key usage et extended key usage, plus les empreintes SHA-256 et SHA-1 exactement comme les imprime openssl. Les bundles multi-certificats (fullchain) sont détectés pour que vous sachiez que seul le premier est décodé.",
        "Le second onglet génère un certificat auto-signé de test : RSA 2048, signature SHA-256, avec common name, organisation, SAN DNS et IP supplémentaires, validité de 30 jours à 10 ans, et un mode CA optionnel qui ajoute keyCertSign pour construire une racine de développement locale. Vous obtenez le certificat PEM, la clé privée PEM correspondante et l'empreinte.",
        "Cet outil expose des faits et n'affirme jamais la confiance. Déterminer si un certificat est digne de confiance exige le magasin racine du système d'exploitation, des requêtes CRL/OCSP et une poignée de main TLS réelle — rien qu'un onglet de navigateur puisse faire. La seule vérification effectuée est l'auto-signature d'un certificat auto-signé, et elle est déclarée dans le même panneau où le résultat s'affiche.",
      ],
      [
        "Ouvrez l'onglet Décoder et collez un certificat PEM (le bloc -----BEGIN CERTIFICATE-----).",
        "Lisez la fiche de faits : statut de validité, sujet et émetteur, liste SAN, key usage et les deux empreintes.",
        "Pour les tests, utilisez l'onglet Créer : common name, validité, puis copiez les PEM du certificat et de la clé.",
      ],
      [
        { q: "Cet outil peut-il dire si mon certificat est approuvé par les navigateurs ?", a: "Non, et aucune solution purement navigateur ne le peut. La confiance dépend d'une chaîne atteignant une racine approuvée par votre système d'exploitation, plus les contrôles de révocation (CRL/OCSP) lors de la poignée de main. Ce que fait cet outil, c'est décoder le certificat et vérifier sa propre signature lorsqu'il est auto-signé. Pour la confiance réelle, ouvrez le site dans un navigateur et regardez le cadenas, ou lancez openssl verify contre votre bundle de CA." },
        { q: "Quelles empreintes sont affichées, et sont-elles identiques à celles d'openssl ?", a: "SHA-256 et SHA-1 sur le certificat encodé en DER — identiques octet pour octet à ce qu'imprime openssl x509 -fingerprint -sha256 / -sha1. Les fixtures de cet outil ont été générées avec openssl et leurs empreintes comparées à la sortie d'openssl lui-même, donc le format et le regroupement hexadécimal séparé par deux-points sont identiques." },
        { q: "Un certificat auto-signé d'ici est-il utilisable sur un site public ?", a: "Non — il sert au développement local, aux services internes, aux fixtures et aux expérimentations TLS. Les navigateurs publics afficheront un avertissement car aucun racine de confiance ne le cautionne, et rien ici n'effectue de journal de transparence ni de publication de révocation. Pour tout usage public, utilisez Let's Encrypt ou une CA commerciale." },
      ],
    ),
  },
  de: {
    name: "SSL-Zertifikat-Inspektor & selbstsignierter Generator",
    tagline:
      "Dekodieren Sie jedes PEM-Zertifikat in Subject, Gültigkeit, SAN, Key Usage und SHA-256-/SHA-1-Fingerabdrücke — oder erzeugen Sie ein selbstsigniertes Testzertifikat für localhost und Staging. Alles läuft in Ihrem Browser.",
    ...common(
      [
        "Fügen Sie ein PEM-Zertifikat ein und lesen Sie es als Fakten: Subject und Aussteller, Seriennummer, X.509-Version, exaktes Gültigkeitsfenster mit verbleibenden Tagen, Signaturalgorithmus, RSA-Schlüssellänge, Subject Alternative Names, Key Usage und Extended Key Usage, sowie die SHA-256- und SHA-1-Fingerabdrücke exakt so wie openssl sie ausgibt. Mehrfach-Zertifikats-Bundles (fullchain) werden erkannt, damit Sie wissen, dass nur das erste dekodiert wird.",
        "Der zweite Reiter erzeugt ein selbstsigniertes Testzertifikat: RSA 2048, SHA-256-Signatur, mit Common Name, Organisation, zusätzlichen SAN-DNS-Namen und IP-Adressen, Gültigkeit von 30 Tagen bis 10 Jahren und einem optionalen CA-Modus, der keyCertSign hinzufügt, um eine lokale Entwicklungs-Wurzel aufzubauen. Sie erhalten das Zertifikat-PEM, den passenden privaten Schlüssel als PEM und den Fingerabdruck.",
        "Dieses Werkzeug berichtet Fakten und behauptet niemals Vertrauen. Ob ein Zertifikat vertrauenswürdig ist, hängt vom Root-Store des Betriebssystems, CRL-/OCSP-Abfragen und einem echten TLS-Handshake ab — nichts, was ein Browser-Reiter leisten kann. Die einzige durchgeführte Prüfung ist die Selbstsignatur eines selbstsignierten Zertifikats, und das wird im selben Panel erklärt, in dem das Ergebnis erscheint.",
      ],
      [
        "Öffnen Sie den Reiter Dekodieren und fügen Sie ein PEM-Zertifikat ein (der Block -----BEGIN CERTIFICATE-----).",
        "Lesen Sie das Faktenblatt: Gültigkeitsstatus, Subject und Aussteller, SAN-Liste, Key Usage und beide Fingerabdrücke.",
        "Für Tests den Reiter Erstellen nutzen: Common Name, Gültigkeit wählen, dann die PEMs für Zertifikat und Schlüssel kopieren.",
      ],
      [
        { q: "Kann dieses Werkzeug sagen, ob mein Zertifikat von Browsern als vertrauenswürdig gilt?", a: "Nein, und kein reines Browser-Werkzeug kann das. Vertrauen hängt davon ab, dass die Kette eine vom Betriebssystem vertrauenswürdige Wurzel erreicht, plus Sperrprüfungen (CRL/OCSP) beim Handshake. Dieses Werkzeug dekodiert das Zertifikat und prüft bei Selbstsignierung die eigene Signatur. Für echte Vertrauensprüfung öffnen Sie die Seite im Browser und prüfen das Schloss, oder führen Sie openssl verify gegen Ihr CA-Bundle aus." },
        { q: "Welche Fingerabdrücke werden angezeigt, und sind sie identisch mit denen von openssl?", a: "SHA-256 und SHA-1 über das DER-kodierte Zertifikat — bytegleich zu dem, was openssl x509 -fingerprint -sha256 / -sha1 ausgibt. Die Test-Fixtures dieses Werkzeugs wurden mit openssl erzeugt und ihre Fingerabdrücke gegen die Ausgabe von openssl selbst geprüft, daher sind Format und doppelpunktgetrennte Hex-Gruppierung identisch." },
        { q: "Ist ein hier erzeugtes selbstsigniertes Zertifikat für eine öffentliche Website sicher?", a: "Nein — es dient lokaler Entwicklung, internen Diensten, Fixtures und TLS-Experimenten. Öffentliche Browser zeigen eine Warnung, weil keine vertrauenswürdige Wurzel dafür bürgt, und hier findet kein Transparenz-Logging und keine Sperrveröffentlichung statt. Für öffentliche Nutzung verwenden Sie Let's Encrypt oder eine kommerzielle CA." },
      ],
    ),
  },
  ru: {
    name: "Инспектор сертификатов SSL и генератор самоподписанных",
    tagline:
      "Разберите любой сертификат PEM на subject, срок действия, SAN, key usage и отпечатки SHA-256/SHA-1 — или создайте самоподписанный тестовый сертификат для localhost и стенда. Всё работает в вашем браузере.",
    ...common(
      [
        "Вставьте сертификат PEM и читайте его как факты: subject и issuer, серийный номер, версия X.509, точное окно действия с оставшимися днями, алгоритм подписи, длина ключа RSA, subject alternative names, key usage и extended key usage, а также отпечатки SHA-256 и SHA-1 ровно в том виде, как их печатает openssl. Связки из нескольких сертификатов (fullchain) распознаются, чтобы вы знали: разбирается только первый.",
        "Вторая вкладка создаёт самоподписанный тестовый сертификат: RSA 2048, подпись SHA-256, с common name, организацией, дополнительными SAN-именами DNS и IP-адресами, сроком от 30 дней до 10 лет и необязательным режимом CA, добавляющим keyCertSign для локального корневого сертификата разработки. Вы получаете сертификат PEM, соответствующий закрытый ключ PEM и отпечаток.",
        "Инструмент сообщает факты и никогда не утверждает доверие. Проверка доверия требует хранилища корневых сертификатов ОС, запросов CRL/OCSP и реального TLS-рукопожатия — ничего из этого вкладка браузера выполнить не может. Единственная выполняемая проверка — самопроверка подписи самоподписанного сертификата, и это прямо сказано в той же панели, где показывается результат.",
      ],
      [
        "Откройте вкладку «Разобрать» и вставьте сертификат PEM (блок -----BEGIN CERTIFICATE-----).",
        "Прочитайте таблицу фактов: статус действия, subject и issuer, список SAN, key usage и оба отпечатка.",
        "Для тестов откройте вкладку «Создать»: common name, срок действия, затем копируйте PEM сертификата и ключа.",
      ],
      [
        { q: "Может ли инструмент сказать, доверяют ли браузеры моему сертификату?", a: "Нет, и никакой инструмент, работающий только в браузере, этого не может. Доверие зависит от того, достигает ли цепочка корня, которому доверяет ваша ОС, плюс проверок отзыва (CRL/OCSP) при рукопожатии. Инструмент разбирает сертификат и проверяет его собственную подпись, когда он самоподписанный. Для реальной проверки доверия откройте сайт в браузере и посмотрите на замок либо запустите openssl verify против вашего набора CA." },
        { q: "Какие отпечатки показываются и совпадают ли они с openssl?", a: "SHA-256 и SHA-1 по сертификату в кодировке DER — побайтно те же, что печатает openssl x509 -fingerprint -sha256 / -sha1. Тестовые образцы этого инструмента созданы openssl, а их отпечатки сверены с выводом самого openssl, поэтому формат и группировка шестнадцатеричных байтов через двоеточие идентичны." },
        { q: "Безопасно ли использовать здешний самоподписанный сертификат на публичном сайте?", a: "Нет — он для локальной разработки, внутренних сервисов, тестовых образцов и экспериментов с TLS. Публичные браузеры покажут предупреждение, поскольку ни один доверенный корень его не подтверждает, а прозрачного логирования и публикации отзыва здесь нет. Для публичного использования применяйте Let's Encrypt или коммерческий CA." },
      ],
    ),
  },
  it: {
    name: "Ispettore certificati SSL e generatore auto-firmato",
    tagline:
      "Decodifica qualsiasi certificato PEM in subject, validità, SAN, key usage e impronte SHA-256/SHA-1 — oppure genera un certificato auto-firmato di test per localhost e staging. Tutto gira nel tuo browser.",
    ...common(
      [
        "Incolla un certificato PEM e leggilo come fatti: subject e issuer, numero di serie, versione X.509, finestra di validità esatta con i giorni rimanenti, algoritmo di firma, dimensione chiave RSA, subject alternative names, key usage ed extended key usage, più le impronte SHA-256 e SHA-1 esattamente come le stampa openssl. I bundle multi-certificato (fullchain) vengono rilevati così sai che solo il primo è decodificato.",
        "La seconda scheda genera un certificato auto-firmato di test: RSA 2048, firma SHA-256, con common name, organizzazione, SAN DNS e IP aggiuntivi, validità da 30 giorni a 10 anni e una modalità CA opzionale che aggiunge keyCertSign per costruire una radice di sviluppo locale. Ottieni il certificato PEM, la chiave privata PEM corrispondente e l'impronta.",
        "Questo strumento riporta fatti e non afferma mai fiducia. Determinare se un certificato è affidabile richiede il repository radice del sistema operativo, interrogazioni CRL/OCSP e un handshake TLS reale — nulla che una scheda del browser possa fare. L'unica verifica effettuata è l'auto-firma di un certificato auto-firmato, dichiarata nello stesso pannello in cui appare il risultato.",
      ],
      [
        "Apri la scheda Decodifica e incolla un certificato PEM (il blocco -----BEGIN CERTIFICATE-----).",
        "Leggi la scheda dei fatti: stato di validità, subject e issuer, elenco SAN, key usage e le due impronte.",
        "Per i test usa la scheda Crea: common name, validità, poi copia i PEM di certificato e chiave.",
      ],
      [
        { q: "Questo strumento può dirmi se il mio certificato è affidabile per i browser?", a: "No, e nessuno strumento solo-browser può farlo. La fiducia dipende da una catena che raggiunge una radice fidata dal sistema operativo, più controlli di revoca (CRL/OCSP) all'handshake. Ciò che fa questo strumento è decodificare il certificato e verificare la propria firma quando è auto-firmato. Per la fiducia reale apri il sito nel browser e controlla il lucchetto, oppure esegui openssl verify sul tuo bundle CA." },
        { q: "Quali impronte vengono mostrate e sono identiche a quelle di openssl?", a: "SHA-256 e SHA-1 sul certificato codificato in DER — identiche byte per byte a quelle stampate da openssl x509 -fingerprint -sha256 / -sha1. I fixture di questo strumento sono stati generati con openssl e le loro impronte confrontate con l'output di openssl stesso, quindi formato e raggruppamento esadecimale separato da due punti sono identici." },
        { q: "Un certificato auto-firmato creato qui è sicuro su un sito pubblico?", a: "No — serve a sviluppo locale, servizi interni, fixture ed esperimenti TLS. I browser pubblici mostreranno un avviso perché nessuna radice fidata lo garantisce, e qui non si fa logging di trasparenza né pubblicazione di revoca. Per qualsiasi uso pubblico usa Let's Encrypt o una CA commerciale." },
      ],
    ),
  },
  tr: {
    name: "SSL Sertifika Denetleyici ve Kendinden İmzalı Üretici",
    tagline:
      "Herhangi bir PEM sertifikasını subject, geçerlilik, SAN, key usage ve SHA-256/SHA-1 parmak izlerine ayırın — ya da localhost ve staging için kendinden imzalı test sertifikası üretin. Her şey tarayıcınızda çalışır.",
    ...common(
      [
        "Bir PEM sertifikası yapıştırın ve olgu olarak okuyun: subject ve issuer, seri numarası, X.509 sürümü, kalan günlerle tam geçerlilik penceresi, imza algoritması, RSA anahtar boyutu, subject alternative names, key usage ve extended key usage, ayrıca openssl'nin yazdırdığıyla birebir aynı SHA-256 ve SHA-1 parmak izleri. Çok sertifikalı paketler (fullchain) algılanır, böylece yalnızca ilkinin çözüldüğünü bilirsiniz.",
        "İkinci sekme kendinden imzalı test sertifikası üretir: RSA 2048, SHA-256 imza, common name, organizasyon, ek SAN DNS adları ve IP adresleri, 30 günden 10 yıla geçerlilik ve yerel geliştirme kökü kurmak için keyCertSign ekleyen isteğe bağlı CA modu. Sertifika PEM'ini, ona ait özel anahtar PEM'ini ve parmak izini alırsınız.",
        "Bu araç olgu bildirir ve asla güven iddia etmez. Sertifikanın güvenilir olup olmadığını belirlemek işletim sisteminin kök deposunu, CRL/OCSP sorgularını ve gerçek bir TLS el sıkışmasını gerektirir — bir tarayıcı sekmesinin yapamayacağı şeyler. Gerçekleştirdiği tek doğrulama, kendinden imzalı sertifikanın kendi imzasını doğrulamasıdır ve bu, sonucun gösterildiği aynı panelde açıkça belirtilir.",
      ],
      [
        "Çöz sekmesini açın ve bir PEM sertifikası yapıştırın (-----BEGIN CERTIFICATE----- bloğu).",
        "Olgu tablosunu okuyun: geçerlilik durumu, subject ve issuer, SAN listesi, key usage ve iki parmak izi.",
        "Test için Oluştur sekmesini kullanın: common name, geçerlilik seçin, sertifika ve anahtar PEM'lerini kopyalayın.",
      ],
      [
        { q: "Bu araç sertifikamın tarayıcılarca güvenilir olup olmadığını söyleyebilir mi?", a: "Hayır ve yalnızca tarayıcıda çalışan hiçbir araç bunu yapamaz. Güven, zincirin işletim sisteminizin güvendiği bir köke ulaşmasına ve el sıkışma sırasındaki iptal kontrollerine (CRL/OCSP) bağlıdır. Bu aracın yaptığı, sertifikayı çözmek ve kendinden imzalıysa kendi imzasını doğrulamaktır. Gerçek güven için siteyi tarayıcıda açıp kilidi kontrol edin ya da CA paketinize karşı openssl verify çalıştırın." },
        { q: "Hangi parmak izleri gösteriliyor ve openssl'inkiyle aynı mı?", a: "DER kodlu sertifika üzerinde SHA-256 ve SHA-1 — openssl x509 -fingerprint -sha256 / -sha1 çıktısıyla bayt bayt aynı. Bu aracın test fixture'ları openssl ile üretildi ve parmak izleri openssl'in kendi çıktısıyla karşılaştırıldı; dolayısıyla biçim ve iki nokta üst üste ile ayrılan onaltılık gruplama birebir aynıdır." },
        { q: "Burada üretilen kendinden imzalı sertifika herkese açık bir sitede güvenli mi?", a: "Hayır — yerel geliştirme, iç servisler, fixture'lar ve TLS deneyleri içindir. Herkese açık tarayıcılar uyarı gösterir çünkü güvenilen bir kök onu doğrulamaz ve burada şeffaflık günlüğü ya da iptal yayını yapılmaz. Kamuya açık her kullanım için Let's Encrypt veya ticari bir CA kullanın." },
      ],
    ),
  },
  ko: {
    name: "SSL 인증서 검사기 & 자체 서명 생성기",
    tagline:
      "모든 PEM 인증서를 subject, 유효 기간, SAN, key usage, SHA-256/SHA-1 지문으로 분해하거나 localhost·스테이징용 자체 서명 테스트 인증서를 생성합니다. 모든 처리는 브라우저에서 실행됩니다.",
    ...common(
      [
        "PEM 인증서를 붙여넣으면 사실만 보고합니다: subject와 issuer, 일련번호, X.509 버전, 남은 일수를 포함한 정확한 유효 기간, 서명 알고리즘, RSA 키 길이, subject alternative names, key usage와 extended key usage, 그리고 openssl이 출력하는 것과 한 글자도 다르지 않은 SHA-256·SHA-1 지문입니다. 여러 인증서가 담긴 번들(fullchain)은 감지하여 첫 번째만 해석했음을 알려 드립니다.",
        "두 번째 탭에서는 자체 서명 테스트 인증서를 생성합니다: RSA 2048, SHA-256 서명, common name·조직·추가 SAN DNS 이름과 IP 주소·30일에서 10년까지 유효 기간, 그리고 로컬 개발 루트를 만들기 위해 keyCertSign을 추가하는 선택적 CA 모드를 지원합니다. 인증서 PEM, 대응하는 개인 키 PEM, 그리고 지문을 얻습니다.",
        "이 도구는 사실만 보고하며 신뢰를 주장하지 않습니다. 인증서가 신뢰되는지 판단하려면 운영체제 루트 저장소, CRL·OCSP 조회, 실제 TLS 핸드셰이크가 필요하며 브라우저 탭으로는 불가능합니다. 유일하게 수행하는 검증은 자체 서명 인증서의 자기 서명 확인이며, 결과가 표시되는 같은 패널에서 그 점을 명시합니다.",
      ],
      [
        "해석 탭을 열고 PEM 인증서(-----BEGIN CERTIFICATE----- 블록)를 붙여넣습니다.",
        "사실표를 확인합니다: 유효 상태, subject와 issuer, SAN 목록, key usage, 두 지문.",
        "테스트용은 생성 탭에서 common name과 유효 기간을 정하고 인증서·키 PEM을 복사합니다.",
      ],
      [
        { q: "이 도구가 인증서가 브라우저에서 신뢰되는지 알려줄 수 있나요?", a: "아니요, 브라우저만으로 동작하는 도구는 불가능합니다. 신뢰는 인증서 체인이 운영체제가 신뢰하는 루트에 도달하는지, 그리고 핸드셰이크 시 폐기 확인(CRL·OCSP)에 달려 있습니다. 이 도구는 인증서를 해석하고 자체 서명일 때 자기 서명을 검증합니다. 실제 신뢰 상태는 브라우저에서 사이트를 열어 자물쇠를 확인하거나 CA 번들에 대해 openssl verify를 실행하세요." },
        { q: "어떤 지문이 표시되며 openssl과 동일합니까?", a: "DER 인코딩된 인증서에 대한 SHA-256과 SHA-1로, openssl x509 -fingerprint -sha256 / -sha1 출력과 바이트 단위로 같습니다. 이 도구의 테스트 fixture는 openssl로 생성하고 그 지문을 openssl 자체 출력과 대조했으므로 형식과 콜론 구분 16진 표기가 동일합니다." },
        { q: "여기서 만든 자체 서명 인증서를 공개 사이트에 사용해도 안전한가요?", a: "아니요 — 로컬 개발, 내부 서비스, 테스트 fixture, TLS 실험용입니다. 공개 브라우저는 신뢰되는 루트가 뒷받침하지 않아 경고를 표시하며, 여기서는 투명성 로그도 폐기 공개도 하지 않습니다. 공개 용도에는 Let's Encrypt나 상용 CA를 사용하세요." },
      ],
    ),
  },
  ar: {
    name: "فاحص شهادات SSL ومنشئ الشهادات ذاتية التوقيع",
    tagline:
      "فكك أي شهادة PEM إلى subject ومدى الصلاحية وSAN وkey usage وبصمات SHA-256/SHA-1 — أو أنشئ شهادة اختبار ذاتية التوقيع لـ localhost وبيئات التجربة. كل شيء يعمل داخل متصفحك.",
    ...common(
      [
        "الصق شهادة PEM واقرأها كوقائع: subject والمُصدر، الرقم التسلسلي، إصدار X.509، نافذة الصلاحية الدقيقة مع الأيام المتبقية، خوارزمية التوقيع، حجم مفتاح RSA، subject alternative names، وkey usage وextended key usage، إضافة إلى بصمتي SHA-256 وSHA-1 مطابقتين تماماً لما يطبعه openssl. تُكتشف الحزم متعددة الشهادات (fullchain) لتعلم أن الأولى فقط هي التي تُفكَّك.",
        "التبويب الثاني ينشئ شهادة اختبار ذاتية التوقيع: RSA 2048 وتوقيع SHA-256، مع common name والمؤسسة وأسماء SAN وIP إضافية، وصلاحية من 30 يوماً إلى 10 سنوات، ووضع CA اختياري يضيف keyCertSign لبناء جذر تطوير محلي. تحصل على الشهادة بصيغة PEM والمفتاح الخاص المقابل بصيغة PEM والبصمة.",
        "يبلّغ هذا الأداة بالوقائع ولا يدّعي الثقة أبداً. تحديد ما إذا كانت الشهادة موثوقة يتطلب مخزن الجذور في نظام التشغيل واستعلامات CRL/OCSP ومصافحة TLS حقيقية — وليس أي منها ممكن في تبويب متصفح. التحقق الوحيد الذي تجريه هو التحقق من التوقيع الذاتي لشهادة ذاتية التوقيع، ويُصرَّح بذلك في اللوحة نفسها التي يُعرض فيها النتيجة.",
      ],
      [
        "افتح تبويب «فك التكويد» والصق شهادة PEM (كتلة -----BEGIN CERTIFICATE-----).",
        "اقرأ جدول الوقائع: حالة الصلاحية وsubject والمُصدر وقائمة SAN وkey usage والبصمتين.",
        "لاختبار الإنشاء استخدم تبويب «إنشاء»: أدخل common name واختر الصلاحية ثم انسخ شهادة PEM والمفتاح.",
      ],
      [
        { q: "هل تستطيع هذه الأداة إخبار ما إذا كانت شهادتي موثوقة لدى المتصفحات؟", a: "لا، ولا تستطيع أي أداة تعمل داخل المتصفح فقط ذلك. تعتمد الثقة على وصول السلسلة إلى جذر يثق به نظام التشغيل، إضافة إلى فحوص الإبطال (CRL/OCSP) في وقت المصافحة. ما تفعله هذه الأداة هو فك ترميز الشهادة والتحقق من توقيعها الذاتي عندما تكون ذاتية التوقيع. للتحقق من الثقة الحقيقية افتح الموقع في المتصفح وانظر إلى القفل، أو نفّذ openssl verify على حزمة CA لديك." },
        { q: "أي بصمات تُعرض وهل تطابق ما يطبعه openssl؟", a: "SHA-256 وSHA-1 على الشهادة المُرمَّزة بترميز DER — مطابقتان بايت ببايت لما يطبعه openssl x509 -fingerprint -sha256 / -sha1. عينات اختبار هذه الأداة أُنشئت بـ openssl وقُورنت بصماتها بمخرجات openssl نفسه، لذا فالتنسيق وتجميع الست عشري المفصول بنقطتين متطابقان." },
        { q: "هل الشهادة ذاتية التوقيع المُنشأة هنا آمنة لموقع عام؟", a: "لا — فهي للتطوير المحلي والخدمات الداخلية وعينات الاختبار وتجارب TLS. ستعرض المتصفحات العامة تحذيراً لأن لا جذر موثوق يشهد لها، ولا يُنفَّذ هنا تسجيل الشفافية ولا نشر الإبطال. لأي استخدام عام استخدم Let's Encrypt أو CA تجارياً." },
      ],
    ),
  },
  hi: {
    name: "SSL प्रमाणपत्र निरीक्षक और स्व-हस्ताक्षरित जनरेटर",
    tagline:
      "किसी भी PEM प्रमाणपत्र को subject, वैधता, SAN, key usage और SHA-256/SHA-1 फ़िंगरप्रिंट में बाँटें — या localhost और स्टेजिंग के लिए स्व-हस्ताक्षरित परीक्षण प्रमाणपत्र बनाएँ। सब कुछ आपके ब्राउज़र में चलता है।",
    ...common(
      [
        "एक PEM प्रमाणपत्र पेस्ट करें और उसे तथ्यों की तरह पढ़ें: subject और issuer, क्रमांक, X.509 संस्करण, शेष दिनों सहित सटीक वैधता अवधि, हस्ताक्षर एल्गोरिदम, RSA कुंजी आकार, subject alternative names, key usage और extended key usage, तथा SHA-256 और SHA-1 फ़िंगरप्रिंट ठीक वैसे ही जैसे openssl छापता है। बहु-प्रमाणपत्र बंडल (fullchain) पहचाने जाते हैं ताकि आप जानें कि केवल पहला डिकोड होता है।",
        "दूसरा टैब स्व-हस्ताक्षरित परीक्षण प्रमाणपत्र बनाता है: RSA 2048, SHA-256 हस्ताक्षर, common name, संगठन, अतिरिक्त SAN DNS नाम और IP पते, 30 दिन से 10 वर्ष तक वैधता, और स्थानीय विकास रूट बनाने के लिए keyCertSign जोड़ने वाला वैकल्पिक CA मोड। आपको प्रमाणपत्र PEM, उससे मेल खाती निजी कुंजी PEM और फ़िंगरप्रिंट मिलता है।",
        "यह उपकरण तथ्य बताता है और कभी विश्वास का दावा नहीं करता। कोई प्रमाणपत्र भरोसेमंद है या नहीं, यह तय करने के लिए ऑपरेटिंग सिस्टम का रूट स्टोर, CRL/OCSP क्वेरी और वास्तविक TLS हैंडशेक चाहिए — जो ब्राउज़र टैब नहीं कर सकता। यह केवल एक जाँच करता है: स्व-हस्ताक्षरित प्रमाणपत्र का स्व-हस्ताक्षर सत्यापन, और यह उसी पैनल में स्पष्ट कहा जाता है जहाँ परिणाम दिखता है।",
      ],
      [
        "डिकोड टैब खोलें और PEM प्रमाणपत्र (-----BEGIN CERTIFICATE----- ब्लॉक) पेस्ट करें।",
        "तथ्य तालिका पढ़ें: वैधता स्थिति, subject और issuer, SAN सूची, key usage और दोनों फ़िंगरप्रिंट।",
        "परीक्षण के लिए क्रिएट टैब का उपयोग करें: common name, वैधता चुनें, फिर प्रमाणपत्र और कुंजी के PEM कॉपी करें।",
      ],
      [
        { q: "क्या यह उपकरण बता सकता है कि मेरा प्रमाणपत्र ब्राउज़रों के लिए भरोसेमंद है?", a: "नहीं, और कोई भी केवल-ब्राउज़र उपकरण यह नहीं कर सकता। भरोसा इस पर निर्भर है कि श्रृंखला ऑपरेटिंग सिस्टम के भरोसेमंद रूट तक पहुँचती है, साथ में हैंडशेक के समय निरस्तीकरण जाँच (CRL/OCSP)। यह उपकरण प्रमाणपत्र डिकोड करता है और स्व-हस्ताक्षरित होने पर उसका स्वयं का हस्ताक्षर सत्यापित करता है। वास्तविक भरोसे के लिए साइट ब्राउज़र में खोलकर ताले को देखें, या अपने CA बंडल के विरुद्ध openssl verify चलाएँ।" },
        { q: "कौन-से फ़िंगरप्रिंट दिखाए जाते हैं और क्या वे openssl जैसे ही हैं?", a: "DER-एन्कोडेड प्रमाणपत्र पर SHA-256 और SHA-1 — openssl x509 -fingerprint -sha256 / -sha1 के आउटपुट से बाइट-दर-बाइट समान। इस उपकरण के परीक्षण फ़िक्सचर openssl से बनाए गए और उनके फ़िंगरप्रिंट openssl के अपने आउटपुट से मिलाए गए, इसलिए प्रारूप और कोलन-पृथक हेक्स समूहन बिल्कुल समान हैं।" },
        { q: "यहाँ बनाया स्व-हस्ताक्षरित प्रमाणपत्र सार्वजनिक साइट पर सुरक्षित है?", a: "नहीं — यह स्थानीय विकास, आंतरिक सेवाओं, परीक्षण फ़िक्सचर और TLS प्रयोगों के लिए है। सार्वजनिक ब्राउज़र चेतावनी दिखाएँगे क्योंकि कोई भरोसेमंद रूट इसकी पुष्टि नहीं करता, और यहाँ पारदर्शिता लॉगिंग या निरस्तीकरण प्रकाशन नहीं होता। किसी भी सार्वजनिक उपयोग के लिए Let's Encrypt या वाणिज्यिक CA उपयोग करें।" },
      ],
    ),
  },
  id: {
    name: "Inspektur Sertifikat SSL & Generator Self-Signed",
    tagline:
      "Uraikan sertifikat PEM apa pun menjadi subject, masa berlaku, SAN, key usage, dan sidik jari SHA-256/SHA-1 — atau buat sertifikat uji self-signed untuk localhost dan staging. Semuanya berjalan di peramban Anda.",
    ...common(
      [
        "Tempel sertifikat PEM dan bacalah sebagai fakta: subject dan issuer, nomor seri, versi X.509, jendela berlaku persis dengan sisa hari, algoritma tanda tangan, ukuran kunci RSA, subject alternative names, key usage dan extended key usage, plus sidik jari SHA-256 dan SHA-1 persis seperti yang dicetak openssl. Bundel multi-sertifikat (fullchain) dikenali agar Anda tahu hanya yang pertama yang diuraikan.",
        "Tab kedua membuat sertifikat uji self-signed: RSA 2048, tanda tangan SHA-256, dengan common name, organisasi, nama SAN DNS dan alamat IP tambahan, masa berlaku 30 hari sampai 10 tahun, serta mode CA opsional yang menambahkan keyCertSign untuk membangun root pengembangan lokal. Anda mendapat sertifikat PEM, kunci privat PEM yang cocok, dan sidik jarinya.",
        "Alat ini melaporkan fakta dan tidak pernah mengklaim kepercayaan. Menentukan apakah sertifikat dipercaya memerlukan penyimpanan root sistem operasi, kueri CRL/OCSP, dan jabat tangan TLS nyata — tidak ada yang bisa dilakukan tab peramban. Satu-satunya verifikasi yang dilakukan adalah tanda tangan mandiri dari sertifikat self-signed, dan itu dinyatakan dalam panel yang sama tempat hasilnya tampil.",
      ],
      [
        "Buka tab Uraikan dan tempel sertifikat PEM (blok -----BEGIN CERTIFICATE-----).",
        "Baca tabel fakta: status berlaku, subject dan issuer, daftar SAN, key usage, dan kedua sidik jari.",
        "Untuk pengujian gunakan tab Buat: common name, masa berlaku, lalu salin PEM sertifikat dan kunci.",
      ],
      [
        { q: "Bisakah alat ini memberi tahu apakah sertifikat saya dipercaya peramban?", a: "Tidak, dan tidak ada alat hanya-peramban yang bisa. Kepercayaan bergantung pada rantai mencapai root yang dipercaya sistem operasi Anda, plus pemeriksaan pencabutan (CRL/OCSP) saat jabat tangan. Yang dilakukan alat ini adalah menguraikan sertifikat dan memverifikasi tanda tangannya sendiri saat self-signed. Untuk kepercayaan nyata, buka situs di peramban dan periksa ikon gembok, atau jalankan openssl verify terhadap bundel CA Anda." },
        { q: "Sidik jari mana yang ditampilkan, dan apakah sama dengan openssl?", a: "SHA-256 dan SHA-1 atas sertifikat berenkode DER — identik byte demi byte dengan yang dicetak openssl x509 -fingerprint -sha256 / -sha1. Fixture uji alat ini dibuat dengan openssl dan sidik jarinya dibandingkan dengan keluaran openssl sendiri, jadi format dan pengelompokan heksadesimal berpemisah titik dua sama persis." },
        { q: "Apakah sertifikat self-signed dari sini aman untuk situs publik?", a: "Tidak — ini untuk pengembangan lokal, layanan internal, fixture uji, dan eksperimen TLS. Peramban publik akan menampilkan peringatan karena tidak ada root terpercaya yang menjaminnya, dan di sini tidak ada pencatatan transparansi maupun publikasi pencabutan. Untuk penggunaan publik gunakan Let's Encrypt atau CA komersial." },
      ],
    ),
  },
  vi: {
    name: "Trình kiểm tra chứng chỉ SSL & tạo chứng chỉ tự ký",
    tagline:
      "Phân tích mọi chứng chỉ PEM thành subject, hiệu lực, SAN, key usage và vân tay SHA-256/SHA-1 — hoặc tạo chứng chỉ kiểm thử tự ký cho localhost và staging. Tất cả chạy trong trình duyệt của bạn.",
    ...common(
      [
        "Dán một chứng chỉ PEM và đọc nó như dữ kiện: subject và issuer, số sê-ri, phiên bản X.509, cửa sổ hiệu lực chính xác kèm số ngày còn lại, thuật toán ký, kích thước khóa RSA, subject alternative names, key usage và extended key usage, cùng vân tay SHA-256 và SHA-1 đúng như openssl in ra. Các gói nhiều chứng chỉ (fullchain) được nhận diện để bạn biết chỉ chứng chỉ đầu được phân tích.",
        "Tab thứ hai tạo chứng chỉ kiểm thử tự ký: RSA 2048, chữ ký SHA-256, với common name, tổ chức, tên SAN DNS và địa chỉ IP bổ sung, hiệu lực từ 30 ngày đến 10 năm, và chế độ CA tùy chọn thêm keyCertSign để dựng root phát triển cục bộ. Bạn nhận được chứng chỉ PEM, khóa riêng PEM tương ứng và vân tay.",
        "Công cụ này báo cáo dữ kiện và không bao giờ tuyên bố tin cậy. Xác định chứng chỉ có đáng tin hay không cần kho root của hệ điều hành, truy vấn CRL/OCSP và bắt tay TLS thật — không điều nào một tab trình duyệt làm được. Thứ duy nhất công cụ kiểm tra là xác minh chữ ký tự thân của chứng chỉ tự ký, và điều đó được nêu rõ trong chính bảng hiển thị kết quả.",
      ],
      [
        "Mở tab Phân tích và dán chứng chỉ PEM (khối -----BEGIN CERTIFICATE-----).",
        "Đọc bảng dữ kiện: trạng thái hiệu lực, subject và issuer, danh sách SAN, key usage và cả hai vân tay.",
        "Để kiểm thử dùng tab Tạo: common name, chọn hiệu lực, rồi sao chép PEM chứng chỉ và khóa.",
      ],
      [
        { q: "Công cụ này có cho biết chứng chỉ của tôi có được trình duyệt tin cậy không?", a: "Không, và không công cụ chỉ-chạy-trong-trình-duyệt nào làm được. Tin cậy phụ thuộc vào việc chuỗi chạm tới một root mà hệ điều hành của bạn tin cậy, cùng kiểm tra thu hồi (CRL/OCSP) lúc bắt tay. Công cụ này phân tích chứng chỉ và xác minh chữ ký của chính nó khi chứng chỉ tự ký. Để biết tin cậy thật, hãy mở trang trong trình duyệt và xem ổ khóa, hoặc chạy openssl verify với gói CA của bạn." },
        { q: "Hiển thị những vân tay nào và có giống openssl không?", a: "SHA-256 và SHA-1 trên chứng chỉ mã hóa DER — giống từng byte với giá trị openssl x509 -fingerprint -sha256 / -sha1 in ra. Fixture kiểm thử của công cụ này được tạo bằng openssl và vân tay được đối chiếu với chính đầu ra của openssl, nên định dạng và cách nhóm hex phân tách bằng dấu hai chấm hoàn toàn trùng khớp." },
        { q: "Chứng chỉ tự ký tạo ở đây có an toàn cho website công khai không?", a: "Không — nó dành cho phát triển cục bộ, dịch vụ nội bộ, fixture kiểm thử và thử nghiệm TLS. Trình duyệt công khai sẽ cảnh báo vì không có root tin cậy nào bảo chứng, và ở đây không ghi nhận minh bạch cũng không công bố thu hồi. Với mọi mục đích công khai, hãy dùng Let's Encrypt hoặc CA thương mại." },
      ],
    ),
  },
};
