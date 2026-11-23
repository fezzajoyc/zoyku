import { DevEngineX509 } from "../_engines/dev-engine-x509";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "ssl-certificate-inspector",
  category: "developer",
  icon: "shield",
  engine: { component: DevEngineX509 },
  related: ["rsa-key-generator", "hash-generator", "jwt-decoder", "mime-types"],
  copy: {
    en: {
      name: "SSL Certificate Inspector & Self-Signed Generator",
      tagline:
        "Decode any PEM certificate into subject, validity, SAN, key usage and SHA-256/SHA-1 fingerprints — or generate a self-signed test certificate for localhost and staging. Runs entirely in your browser.",
      intro: [
        "Paste a certificate PEM and read it as plain facts: subject and issuer, serial number, X.509 version, exact validity window with the days remaining, signature algorithm, RSA key size, subject alternative names, key usage and extended key usage, plus the SHA-256 and SHA-1 fingerprints exactly as openssl prints them. Multi-certificate bundles (fullchain) are detected so you know you are looking at the first one only.",
        "The second tab generates a self-signed test certificate: RSA 2048, SHA-256 signature, choose common name, organization, extra SAN DNS names and IP addresses, validity from 30 days to 10 years, and an optional CA mode that adds keyCertSign for building a local development root. You get the certificate PEM and the matching private key PEM, plus the fingerprint.",
        "This tool reports facts and never claims trust. Whether a certificate is trusted requires the operating system root store, CRL and OCSP lookups and a real TLS handshake — none of which a browser tab can perform. The one verification it does is the self-signature check of a self-signed certificate, and it says so explicitly in the same panel where it shows the result.",
      ],
      steps: [
        "Open the Decode tab and paste a PEM certificate (the -----BEGIN CERTIFICATE----- block).",
        "Read the fact sheet: validity status, subject and issuer, SAN list, key usage, and both fingerprints.",
        "For testing, use the Create tab: enter a common name, pick validity, and copy the certificate and key PEMs.",
      ],
      faqs: [
        {
          q: "Can this tool tell me whether my certificate is trusted by browsers?",
          a: "No, and no browser-only tool can. Trust depends on the certificate chain reaching a root your operating system trusts, plus revocation checks (CRL/OCSP) at handshake time. What this tool does is decode the certificate and verify its own signature when it is self-signed. For real trust, use the site in a browser and inspect the padlock, or run openssl verify against your CA bundle.",
        },
        {
          q: "Which fingerprints are shown, and are they the same ones openssl prints?",
          a: "SHA-256 and SHA-1 over the DER-encoded certificate — byte-for-byte the values printed by openssl x509 -fingerprint -sha256 / -sha1. The test fixtures for this tool were generated with openssl and their fingerprints asserted against openssl's own output, so the format and colon-separated hex grouping are identical.",
        },
        {
          q: "Is a self-signed certificate from here safe to use on a website?",
          a: "No — it is for local development, internal services, test fixtures and TLS experiments. Public browsers will show a warning because no trusted root vouches for it, and nothing here performs certificate transparency logging or revocation publication. For anything public, use Let's Encrypt or a commercial CA.",
        },
        {
          q: "Why is the CA flag TRUE but the certificate still reported as unable to sign?",
          a: "basicConstraints CA:TRUE alone does not make a certificate a usable CA: openssl's own X509_check_ca also requires keyCertSign in keyUsage. Some tools omit keyCertSign while leaving CA:TRUE, and node:crypto then reports ca:false for that same file. Rather than silently merging, this tool shows both the raw flag and the usable-CA verdict so the discrepancy is visible.",
        },
      ],
      deepDive: [
        {
          heading: "What actually lives inside an X.509 certificate",
          paragraphs: [
            "An X.509 v3 certificate is one DER-encoded SEQUENCE with three parts: the to-be-signed body, the signature algorithm identifier, and the signature bits. The body holds the version, a serial number unique per issuer, the signature algorithm name, the issuer distinguished name, a validity window of two UTCTime values, the subject distinguished name, the subject public key info, and then optional extensions. Every field this tool shows comes straight out of that structure, which is why subject lines come back in the same order openssl prints them and why fingerprints hash the DER bytes rather than the PEM text.",
            "The two extensions that cause the most confusion are basicConstraints and keyUsage. basicConstraints carries a single CA boolean; keyUsage carries nine permission bits, of which keyCertSign is the one that permits signing other certificates, and cRLSign permits signing revocation lists. OpenSSL's X509_check_ca combines them: a certificate only counts as a CA when basicConstraints says CA:TRUE AND keyUsage grants keyCertSign. That conjunction is why the same file can read CA:TRUE and still be reported as ca:false by node:crypto — this tool prints both values instead of picking one.",
            "Subject alternative names are the extension that modern TLS actually cares about. A CN of example.com in the subject is ignored by every browser since RFC 6125 retired CN matching; name matching happens only against SAN entries of type dNSName and iPAddress. That is why a certificate generated with only a CN will fail on every browser even though it looks complete in the text dump, and why both tabs here surface the SAN list as a first-class section rather than burying it.",
          ],
        },
        {
          heading: "Fingerprints, chains and what a browser tab cannot verify",
          paragraphs: [
            "SHA-1 and SHA-256 fingerprints are hashes of the whole DER certificate and serve two jobs: to pin a certificate, and to identify one when several share a subject. SHA-1 is still printed for legacy pin lists and older tooling but is deprecated for signature use; the fingerprint itself is not a signature, so printing it is not a security commitment. Pinning by fingerprint means a certificate rotation silently breaks your pin — that is the trade-off every HPKP-style scheme lived and mostly died with.",
            "Chain building is the step browsers do that this tool does not. Given a leaf certificate, the browser looks for AIA/issued-certificate URIs, assembles a chain to a root in the trust store, checks signatures, checks validity and then queries CRL or OCSP for revocation. A browser tab cannot read the OS root store, cannot perform a TLS handshake on your behalf, and cannot query OCSP or CRL reliably, so any claim of trust from inside the page would be a fabrication.",
            "The one thing that is verifiable offline is the self-signature: if subject equals issuer, the certificate's own public key should verify its own signature. That is exactly what the status line reports, and its wording distinguishes self-signed from chain-verified, because a self-signed certificate claims nothing more than internal consistency — it can even be self-signed by a key that was never protected.",
          ],
        },
      ],
    },
    zh: {
      name: "SSL 证书检查与自签发工具",
      tagline:
        "解析任意 PEM 证书:主题、有效期、SAN、密钥用途与 SHA-256/SHA-1 指纹一字不差;或为本地开发与测试环境生成自签发证书。全部在本机浏览器内完成。",
      intro: [
        "粘贴 PEM 证书即可读到客观字段:主题与签发者、序列号、X.509 版本、精确有效期窗口与剩余天数、签名算法、RSA 密钥位数、SAN 列表、KeyUsage 与扩展 KeyUsage,以及与 openssl 输出完全一致的 SHA-256/SHA-1 指纹。null 证书链(fullchain)会被识别并提示:只解析第一张。",
        "第二个标签页生成自签发测试证书:RSA 2048、SHA-256 签名,可选通用名、组织、额外 SAN 的 DNS 名与 IP 地址,有效期 30 天到 10 年,还能开启 CA 模式(加 keyCertSign)用于搭建本地开发根证书。输出的是证书 PEM、配套私钥 PEM 与指纹。",
        "本工具只报告事实,绝不声称「受信」。判断一张证书是否受信需要操作系统根证书库、CRL 与 OCSP 查询以及真实的 TLS 握手——浏览器标签页做不到这些。唯一能做的离线验证是自签证书的自校验,工具在显示结果的同一面板里就把这一点说明白了。",
      ],
      steps: [
        "打开「解析」标签页,粘贴 PEM 证书(-----BEGIN CERTIFICATE----- 块)。",
        "读事实表:有效期状态、主题与签发者、SAN 列表、密钥用途,以及两个指纹。",
        "要做测试用第二页:填通用名、选有效期,复制证书与私钥 PEM。",
      ],
      faqs: [
        {
          q: "这工具能告诉我证书是否被浏览器信任吗?",
          a: "不能,任何纯浏览器工具都不能。信任取决于证书链能否到达操作系统信任的根证书,以及握手时的吊销检查(CRL/OCSP)。本工具做的是解析证书,并在证书自签时验证其自身的签名。要看真实信任状态,请在浏览器里访问站点查看锁形图标,或用 openssl verify 对你们的 CA 包验证。",
        },
        {
          q: "展示的是哪两种指纹,和 openssl 打出来的一样吗?",
          a: "对 DER 编码证书做的 SHA-256 与 SHA-1——与 openssl x509 -fingerprint -sha256 / -sha1 逐字节相同。本工具的测试 fixture 就是 openssl 生成的,指纹断言直接对照 openssl 自身输出,所以格式与冒号分隔的十六进制分组完全一致。",
        },
        {
          q: "这里生成的自签证书能直接用在网站上线吗?",
          a: "不能——它是给本地开发、内部服务、测试数据与 TLS 实验用的。公网浏览器会报警,因为没有受信根证书背书;这里也不做证书透明度日志与吊销发布。任何对外公开的场景请用 Let's Encrypt 或商业 CA。",
        },
        {
          q: "为什么 CA 标志是 TRUE,工具却说它不能签发?",
          a: "只有 basicConstraints 的 CA:TRUE 并不足以让证书成为可用的 CA:openssl 自己的 X509_check_ca 还要求 keyUsage 里有 keyCertSign。有些工具只留 CA:TRUE 而省略 keyCertSign,node:crypto 对同一份文件就会报 ca:false。本工具不静默合并,而是把原始标志与「可否签发」两个值都给出,让这种不一致暴露出来。",
        },
      ],
      deepDive: [
        {
          heading: "X.509 证书里到底装了什么",
          paragraphs: [
            "一张 X.509 v3 证书是一个 DER 编码的 SEQUENCE,包含三部分:待签名主体、签名算法标识、签名比特串。主体里依次是版本号、每个签发者内唯一的序列号、签名算法名、签发者可分辨名称、由两个 UTCTime 组成的有效期窗口、主题可分辨名称、主题公钥信息,然后是可选扩展。本工具显示的每个字段都直接来自这个结构,所以主题行会以和 openssl 相同的顺序返回,指纹也是对 DER 字节做哈希而不是对 PEM 文本。",
            "最容易把人绕晕的两个扩展是 basicConstraints 与 keyUsage。basicConstraints 只带一个 CA 布尔值;keyUsage 带九个权限位,其中 keyCertSign 才代表「允许签发其它证书」,cRLSign 代表允许签吊销列表。OpenSSL 的 X509_check_ca 把两者结合起来:只有当 basicConstraints 为 CA:TRUE 且 keyUsage 授予 keyCertSign 时,证书才算 CA。这个合取关系正是为什么同一份文件可以读出 CA:TRUE 而 node:crypto 仍报 ca:false——本工具两个值都显示,而不是替你挑一个。",
            "主题备用名称(SAN)才是现代 TLS 真正看重的扩展。主题里的 CN 字段自 RFC 6125 起已被浏览器放弃匹配;真正的名称匹配只对 type 为 dNSName 与 iPAddress 的 SAN 条目做。这解释了为什么只填了 CN 的证书在文字转储里看着齐全却在所有浏览器上失败,也解释了为什么本工具的两个标签页都把 SAN 列表做成头条板块而不是埋在末尾。",
          ],
        },
        {
          heading: "指纹、证书链,与浏览器标签页做不到的验证",
          paragraphs: [
            "SHA-1 与 SHA-256 指纹是对整张 DER 证书的哈希,有两个用途:证书固定(pinning),以及在同一主题下有多张证书时区分是哪一张。SHA-1 仍会被打印是为了兼容遗留的 pin 名单与老工具,但作为签名算法早已废弃;指纹本身不是签名,打印它不构成任何安全承诺。用指纹固定意味着证书一换 pin 就静默失效——这是所有 HPKP 式方案付出的代价,也是它们基本消亡的原因。",
            "构链是浏览器做而本工具不做的那一步。给定一张终端证书,浏览器会顺着 AIA/签发证书 URI 找链、拼到信任库里的根、校验签名与有效期,再查 CRL 或 OCSP 判断吊销。浏览器标签页读不到操作系统的根证书库、不能替你完成 TLS 握手、也无法可靠地查询 OCSP 或 CRL,所以页面里任何「受信」的断言都是编造。",
            "离线可验证的只有一项:自签名。当 subject 等于 issuer 时,证书自己的公钥应当能验证自己的签名。状态行报告的正是这一项,而且措辞明确区分「自签验签通过」与「信任链验证」——因为自签证书只声称内部一致性,它甚至可以是由一把从未受保护的私钥签出来的。",
          ],
        },
      ],
    },
    ja: {
      name: "SSL 証明書インスペクター & 自己署名ジェネレーター",
      tagline:
        "任意の PEM 証明書をサブジェクト・有効期間・SAN・鍵用途・SHA-256/SHA-1 フィンガープリントに分解。または localhost やステージング用の自己署名テスト証明書を生成。すべてブラウザ内で完結します。",
      intro: [
        "PEM 証明書を貼り付けると事実だけを返します:サブジェクトと発行者、シリアル番号、X.509 バージョン、正確な有効期間と残り日数、署名アルゴリズム、RSA 鍵長、サブジェクト代替名、KeyUsage と拡張 KeyUsage、そして openssl の出力と一字一句同じ SHA-256/SHA-1 フィンガープリント。複数証明書のバンドル(fullchain)も検出し、最初の 1 件だけを解析したことを明示します。",
        "2 つ目のタブでは自己署名テスト証明書を生成します:RSA 2048・SHA-256 署名、コモンネーム・組織・追加 SAN の DNS 名と IP、有効期間 30 日〜10 年、さらにローカル開発用ルートを作るための CA モード(keyCertSign を追加)。証明書 PEM・対になる秘密鍵 PEM・フィンガープリントを出力します。",
        "本ツールは事実のみを報告し、信頼を主張しません。証明書が信頼されるかどうかは OS のルートストア、CRL/OCSP の問い合わせ、実際の TLS ハンドシェイクが必要で、ブラウザのタブには不可能です。唯一できるオフライン検証は自己署名証明書の自己検証であり、結果を表示する同じパネルでその旨を明記します。",
      ],
      steps: [
        "「解析」タブを開き、PEM 証明書(-----BEGIN CERTIFICATE----- ブロック)を貼り付けます。",
        "事実表を読みます:有効性ステータス、サブジェクトと発行者、SAN 一覧、鍵用途、2 つのフィンガープリント。",
        "テスト用途は作成タブへ:コモンネームを入れ、有効期間を選び、証明書と鍵の PEM をコピーします。",
      ],
      faqs: [
        {
          q: "このツールでブラウザが信頼するか分かりますか?",
          a: "いいえ、ブラウザだけで動くツールには不可能です。信頼は OS が信頼するルートに到達する証明書チェーンと、ハンドシェイク時の失効確認(CRL/OCSP)に依存します。本ツールが行うのは証明書の解析と、自己署名時の自己署名検証です。実際の信頼状態はブラウザでサイトを開いて鍵アイコンを確認するか、openssl verify を CA バンドルに対して実行してください。",
        },
        {
          q: "表示されるフィンガープリントは openssl と同じですか?",
          a: "DER エンコードされた証明書に対する SHA-256 と SHA-1 で、openssl x509 -fingerprint -sha256 / -sha1 の出力とバイト単位で一致します。本ツールのテスト fixture は openssl で生成し、そのフィンガープリントを openssl 自身の出力と突き合わせているため、書式とコロン区切りの 16 進表記も同一です。",
        },
        {
          q: "ここで作った自己署名証明書は本番サイトに使えますか?",
          a: "いいえ — ローカル開発、社内サービス、テスト fixture、TLS 実験用です。公衆ブラウザは信頼されたルートの裏付けがないため警告を出し、ここでは証明書透明性ログも失効公開も行いません。公開用途には Let's Encrypt か商用 CA を使ってください。",
        },
        {
          q: "CA フラグが TRUE なのに署名不可と表示されるのはなぜ?",
          a: "basicConstraints の CA:TRUE だけでは有効な CA になりません。openssl の X509_check_ca は keyUsage に keyCertSign があることも要求します。CA:TRUE のまま keyCertSign を省いたツールがあり、同じファイルに対して node:crypto は ca:false を返します。本ツールは黙って統合せず、生のフラグと署名可否の両方を表示して不一致を見えるようにします。",
        },
      ],
      deepDive: [
        {
          heading: "X.509 証明書の中身",
          paragraphs: [
            "X.509 v3 証明書は DER エンコードされた 1 つの SEQUENCE で、署名対象本体・署名アルゴリズム識別子・署名ビット列の 3 部から成ります。本体にはバージョン、発行者ごとに一意なシリアル番号、署名アルゴリズム名、発行者識別名、2 つの UTCTime からなる有効期間、サブジェクト識別名、サブジェクト公開鍵情報、そして任意の拡張が並びます。本ツールが表示する各フィールドはこの構造から直接取り出しているため、サブジェクト行は openssl と同じ順で返り、フィンガープリントは PEM テキストではなく DER バイトをハッシュします。",
            "最も混乱を招く 2 つの拡張が basicConstraints と keyUsage です。basicConstraints は CA ブール値 1 つだけを持ち、keyUsage は 9 つの許可ビットのうち keyCertSign が他証明書への署名許可、cRLSign が失効リストへの署名許可を表します。OpenSSL の X509_check_ca は両者を合成します:basicConstraints が CA:TRUE かつ keyUsage に keyCertSign がある場合のみ CA と見なします。この論理積のため、同じファイルが CA:TRUE と読めても node:crypto は ca:false を返し得ます — 本ツールは片方を選ばず両方を表示します。",
            "現代 TLS が実際に重視する拡張はサブジェクト代替名(SAN)です。サブジェクトの CN は RFC 6125 以降ブラウザが照合しません。名前照合は type が dNSName と iPAddress の SAN エントリにのみ行われます。CN だけ設定した証明書がテキストダンプ上は完備に見えるのに全ブラウザで失敗する理由であり、本ツールの両タブが SAN 一覧を主要セクションとして前面に出す理由でもあります。",
          ],
        },
        {
          heading: "フィンガープリント、チェーン、ブラウザタブにできない検証",
          paragraphs: [
            "SHA-1 と SHA-256 のフィンガープリントは DER 証明書全体のハッシュで、証明書の固定(pinning)と、同一サブジェクトの複数証明書の識別という 2 つの役割を持ちます。SHA-1 を今も表示するのは旧来の pin リストや古いツールとの互換のためで、署名用途としては廃止済みです。フィンガープリント自体は署名ではないため、表示することはセキュリティ上の約束になりません。フィンガープリントで固定すると証明書の更新で pin が静かに壊れます — すべての HPKP 類似方式が払った代償であり、ほぼ消滅した理由です。",
            "チェーン構築はブラウザが行い本ツールが行わない手順です。末端証明書から AIA/発行証明書 URI を辿ってチェーンを組み、信頼ストアのルートへ到達させ、署名と有効期間を検証し、CRL や OCSP で失効を問い合わせます。ブラウザタブは OS のルートストアを読めず、あなたの代わりに TLS ハンドシェイクを実行できず、OCSP/CRL を確実に照会できないため、ページ内のいかなる「信頼」の主張も作り話になります。",
            "オフラインで検証できるのは 1 点だけです:自己署名。subject と issuer が等しいとき、証明書自身の公開鍵が自身の署名を検証できるはずです。ステータス行が報告するのはまさにこれで、文言は「自己署名検証」と「チェーン検証」を明確に区別します。自己署名証明書は内部整合性しか主張せず、決して保護されなかった鍵で署名されている可能性すらあります。",
          ],
        },
      ],
    },
    es: {
      name: "Inspector de certificados SSL y generador autofirmado",
      tagline:
        "Decodifique cualquier certificado PEM en subject, validez, SAN, key usage y huellas SHA-256/SHA-1 — o genere un certificado autofirmado de prueba para localhost y staging. Todo se ejecuta en su navegador.",
      intro: [
        "Pegue un certificado PEM y léalo como hechos: subject e issuer, número de serie, versión X.509, ventana de validez exacta con los días restantes, algoritmo de firma, tamaño de clave RSA, subject alternative names, key usage y extended key usage, más las huellas SHA-256 y SHA-1 exactamente como las imprime openssl. Los bundles con varios certificados (fullchain) se detectan para que sepa que solo se decodifica el primero.",
        "La segunda pestaña genera un certificado autofirmado de prueba: RSA 2048, firma SHA-256, con common name, organización, SAN DNS e IP adicionales, validez de 30 días a 10 años, y un modo CA opcional que añade keyCertSign para construir una raíz de desarrollo local. Obtiene el certificado PEM, la clave privada PEM correspondiente y la huella.",
        "Esta herramienta informa hechos y nunca afirma confianza. Determinar si un certificado es de confianza exige el almacén raíz del sistema operativo, consultas CRL/OCSP y un handshake TLS real — nada que una pestaña de navegador pueda hacer. La única verificación que realiza es la autofirma de un certificado autofirmado, y lo declara en el mismo panel donde muestra el resultado.",
      ],
      steps: [
        "Abra la pestaña Decodificar y pegue un certificado PEM (el bloque -----BEGIN CERTIFICATE-----).",
        "Lea la ficha de hechos: estado de validez, subject e issuer, lista SAN, key usage y ambas huellas.",
        "Para pruebas use la pestaña Crear: common name, validez, y copie los PEM del certificado y de la clave.",
      ],
      faqs: [
        {
          q: "¿Puede esta herramienta decir si mi certificado es de confianza para los navegadores?",
          a: "No, y ninguna herramienta solo-navegador puede. La confianza depende de que la cadena llegue a una raíz que su sistema operativo confíe, más comprobaciones de revocación (CRL/OCSP) en el handshake. Lo que hace esta herramienta es decodificar el certificado y verificar su propia firma cuando es autofirmado. Para confianza real, abra el sitio en un navegador y revise el candado, o ejecute openssl verify contra su bundle de CA.",
        },
        {
          q: "¿Qué huellas se muestran y coinciden con las de openssl?",
          a: "SHA-256 y SHA-1 sobre el certificado codificado en DER — idénticas byte a byte a las que imprime openssl x509 -fingerprint -sha256 / -sha1. Los fixtures de esta herramienta se generaron con openssl y sus huellas se comparan con la propia salida de openssl, así que el formato y la agrupación hex separada por dos puntos son iguales.",
        },
        {
          q: "¿Es seguro usar un certificado autofirmado de aquí en un sitio público?",
          a: "No — sirve para desarrollo local, servicios internos, fixtures y experimentos TLS. Los navegadores públicos mostrarán advertencia porque ninguna raíz de confianza lo respalda, y aquí no se hace logging de transparencia ni publicación de revocación. Para cualquier uso público use Let's Encrypt o una CA comercial.",
        },
        {
          q: "¿Por qué aparece CA flag TRUE pero la herramienta dice que no puede firmar?",
          a: "basicConstraints CA:TRUE por sí solo no convierte un certificado en CA usable: X509_check_ca de openssl también exige keyCertSign en keyUsage. Algunas herramientas omiten keyCertSign dejando CA:TRUE, y node:crypto reporta ca:false para ese mismo archivo. En lugar de fusionarlo en silencio, esta herramienta muestra tanto la bandera cruda como el veredicto de CA usable, para que la discrepancia sea visible.",
        },
      ],
      deepDive: [
        {
          heading: "Qué contiene realmente un certificado X.509",
          paragraphs: [
            "Un certificado X.509 v3 es un único SEQUENCE codificado en DER con tres partes: el cuerpo a firmar, el identificador del algoritmo de firma y los bits de firma. El cuerpo lleva la versión, un número de serie único por emisor, el nombre del algoritmo de firma, el distinguished name del emisor, una ventana de validez con dos UTCTime, el distinguished name del subject, la información de clave pública del subject y luego extensiones opcionales. Cada campo que muestra esta herramienta sale directamente de esa estructura, razón por la cual las líneas de subject vuelven en el mismo orden que imprime openssl y por la que las huellas hashean los bytes DER y no el texto PEM.",
            "Las dos extensiones que más confunden son basicConstraints y keyUsage. basicConstraints lleva un único booleano CA; keyUsage lleva nueve bits de permiso, de los cuales keyCertSign permite firmar otros certificados y cRLSign permite firmar listas de revocación. X509_check_ca de OpenSSL combina ambos: un certificado solo cuenta como CA cuando basicConstraints dice CA:TRUE Y keyUsage concede keyCertSign. Esa conjunción explica por qué un mismo archivo puede leerse como CA:TRUE y aun así node:crypto lo reporta ca:false — esta herramienta imprime ambos valores en vez de elegir uno.",
            "Los subject alternative names son la extensión que de verdad importa al TLS moderno. Un CN de example.com en el subject lo ignoran todos los navegadores desde que RFC 6125 retiró la coincidencia por CN; la coincidencia de nombres ocurre solo contra entradas SAN de tipo dNSName e iPAddress. Por eso un certificado generado solo con CN falla en todo navegador aunque parezca completo en el volcado de texto, y por eso ambas pestañas aquí muestran la lista SAN como sección principal y no enterrada al final.",
          ],
        },
        {
          heading: "Huellas, cadenas y lo que una pestaña de navegador no puede verificar",
          paragraphs: [
            "Las huellas SHA-1 y SHA-256 son hashes del certificado DER completo y cumplen dos funciones: pinning de un certificado, e identificación de uno cuando varios comparten subject. SHA-1 se sigue imprimindo por compatibilidad con pin lists heredadas y herramientas antiguas, pero está deprecado para firma; la huella en sí no es una firma, así que imprimirla no constituye compromiso de seguridad. Fijar por huella significa que una rotación de certificado rompe el pin en silencio — ese es el precio que pagaron todos los esquemas tipo HPKP, y la razón por la que casi desaparecieron.",
            "La construcción de cadena es el paso que hacen los navegadores y esta herramienta no. Dado un certificado hoja, el navegador busca URIs AIA/issued-certificate, arma la cadena hasta una raíz del almacén de confianza, verifica firmas y validez, y luego consulta CRL u OCSP para revocación. Una pestaña de navegador no puede leer el almacén raíz del sistema, no puede realizar un handshake TLS por usted ni consultar OCSP/CRL de forma fiable, así que cualquier afirmación de confianza desde la página sería fabricada.",
            "Lo único verificable offline es la autofirma: si subject es igual a issuer, la clave pública del propio certificado debería verificar su propia firma. Eso es exactamente lo que reporta la línea de estado, y su redacción distingue autofirmado de verificado por cadena, porque un certificado autofirmado solo declara consistencia interna — incluso puede estar firmado por una clave que nunca fue protegida.",
          ],
        },
      ],
    },
    pt: {
      name: "Inspetor de certificados SSL e gerador autoassinado",
      tagline:
        "Decodifique qualquer certificado PEM em subject, validade, SAN, key usage e impressões digitais SHA-256/SHA-1 — ou gere um certificado autoassinado de teste para localhost e staging. Tudo roda no seu navegador.",
      intro: [
        "Cole um certificado PEM e leia como fatos: subject e issuer, número de série, versão X.509, janela de validade exata com os dias restantes, algoritmo de assinatura, tamanho da chave RSA, subject alternative names, key usage e extended key usage, mais as impressões digitais SHA-256 e SHA-1 exatamente como o openssl as imprime. Bundles com vários certificados (fullchain) são detectados para você saber que apenas o primeiro é decodificado.",
        "A segunda aba gera um certificado autoassinado de teste: RSA 2048, assinatura SHA-256, com common name, organização, SAN DNS e IP adicionais, validade de 30 dias a 10 anos, e um modo CA opcional que adiciona keyCertSign para construir uma raiz de desenvolvimento local. Você recebe o certificado PEM, a chave privada PEM correspondente e a impressão digital.",
        "Esta ferramenta informa fatos e nunca afirma confiança. Saber se um certificado é confiável exige o repositório raiz do sistema operacional, consultas CRL/OCSP e um handshake TLS real — nada que uma aba de navegador possa fazer. A única verificação que realiza é a autoassinatura de um certificado autoassinado, e declara isso no mesmo painel onde mostra o resultado.",
      ],
      steps: [
        "Abra a aba Decodificar e cole um certificado PEM (o bloco -----BEGIN CERTIFICATE-----).",
        "Leia a ficha de fatos: status de validade, subject e issuer, lista SAN, key usage e ambas as impressões digitais.",
        "Para testes use a aba Criar: common name, validade, e copie os PEM do certificado e da chave.",
      ],
      faqs: [
        {
          q: "Esta ferramenta pode dizer se meu certificado é confiável para os navegadores?",
          a: "Não, e nenhuma ferramenta apenas-navegador pode. A confiança depende de a cadeia chegar a uma raiz em que seu sistema operacional confie, mais checagens de revogação (CRL/OCSP) no handshake. O que esta ferramenta faz é decodificar o certificado e verificar sua própria assinatura quando ele é autoassinado. Para confiança real, abra o site num navegador e olhe o cadeado, ou rode openssl verify contra seu bundle de CA.",
        },
        {
          q: "Quais impressões digitais são mostradas e elas batem com as do openssl?",
          a: "SHA-256 e SHA-1 sobre o certificado codificado em DER — idênticas byte a byte às que o openssl x509 -fingerprint -sha256 / -sha1 imprime. As fixtures desta ferramenta foram geradas com openssl e suas impressões digitais comparadas com a própria saída do openssl, então o formato e o agrupamento hex separado por dois-pontos são iguais.",
        },
        {
          q: "É seguro usar um certificado autoassinado daqui num site público?",
          a: "Não — serve para desenvolvimento local, serviços internos, fixtures e experimentos TLS. Navegadores públicos mostrarão aviso porque nenhuma raiz de confiança o respalda, e aqui não se faz logging de transparência nem publicação de revogação. Para qualquer uso público use Let's Encrypt ou uma CA comercial.",
        },
        {
          q: "Por que aparece CA flag TRUE mas a ferramenta diz que não pode assinar?",
          a: "basicConstraints CA:TRUE sozinho não torna um certificado uma CA utilizável: o X509_check_ca do openssl também exige keyCertSign em keyUsage. Algumas ferramentas omitem keyCertSign deixando CA:TRUE, e o node:crypto reporta ca:false para esse mesmo arquivo. Em vez de fundir em silêncio, esta ferramenta mostra tanto a flag crua quanto o veredito de CA utilizável, para que a discrepância fique visível.",
        },
      ],
      deepDive: [
        {
          heading: "O que realmente há dentro de um certificado X.509",
          paragraphs: [
            "Um certificado X.509 v3 é um único SEQUENCE codificado em DER com três partes: o corpo a assinar, o identificador do algoritmo de assinatura e os bits de assinatura. O corpo traz a versão, um número de série único por emissor, o nome do algoritmo de assinatura, o distinguished name do emissor, uma janela de validade com dois UTCTime, o distinguished name do subject, a informação de chave pública do subject e então extensões opcionais. Cada campo que esta ferramenta mostra vem direto dessa estrutura, razão pela qual as linhas de subject voltam na mesma ordem que o openssl imprime e pela qual as impressões digitais hasheiam os bytes DER e não o texto PEM.",
            "As duas extensões que mais confundem são basicConstraints e keyUsage. basicConstraints carrega um único booleano CA; keyUsage carrega nove bits de permissão, dos quais keyCertSign permite assinar outros certificados e cRLSign permite assinar listas de revogação. O X509_check_ca do OpenSSL combina os dois: um certificado só conta como CA quando basicConstraints diz CA:TRUE E keyUsage concede keyCertSign. Essa conjunção explica por que um mesmo arquivo pode ser lido como CA:TRUE e ainda assim o node:crypto reportar ca:false — esta ferramenta imprime ambos os valores em vez de escolher um.",
            "Os subject alternative names são a extensão que o TLS moderno realmente considera. Um CN de example.com no subject é ignorado por todos os navegadores desde que o RFC 6125 retirou a correspondência por CN; a correspondência de nomes ocorre apenas contra entradas SAN do tipo dNSName e iPAddress. É por isso que um certificado gerado apenas com CN falha em todo navegador mesmo parecendo completo no dump de texto, e por isso ambas as abas aqui mostram a lista SAN como seção principal em vez de enterrada no final.",
          ],
        },
        {
          heading: "Impressões digitais, cadeias e o que uma aba de navegador não pode verificar",
          paragraphs: [
            "As impressões SHA-1 e SHA-256 são hashes do certificado DER completo e cumprem dois papéis: pinning de um certificado, e identificação de um quando vários compartilham subject. SHA-1 ainda é impressa por compatibilidade com pin lists herdadas e ferramentas antigas, mas está depreciada para assinatura; a impressão em si não é uma assinatura, então imprimi-la não constitui compromisso de segurança. Fixar por impressão significa que uma rotação de certificado quebra o pin em silêncio — esse é o preço que todos os esquemas tipo HPKP pagaram, e a razão pela qual quase desapareceram.",
            "A construção de cadeia é o passo que navegadores fazem e esta ferramenta não. Dado um certificado folha, o navegador busca URIs AIA/issued-certificate, monta a cadeia até uma raiz no repositório de confiança, verifica assinaturas e validade, e então consulta CRL ou OCSP para revogação. Uma aba de navegador não pode ler o repositório raiz do sistema, não pode realizar um handshake TLS por você nem consultar OCSP/CRL de forma confiável, então qualquer afirmação de confiança dentro da página seria fabricada.",
            "A única coisa verificável offline é a autoassinatura: se subject é igual a issuer, a chave pública do próprio certificado deveria verificar sua própria assinatura. É exatamente o que a linha de status reporta, e sua redação distingue autoassinado de verificado por cadeia, porque um certificado autoassinado só declara consistência interna — ele pode até ter sido assinado por uma chave que nunca foi protegida.",
          ],
        },
      ],
    },
  },
});
