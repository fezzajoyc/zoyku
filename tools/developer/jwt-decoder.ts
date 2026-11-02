import { DevEncoderEngine } from "../_engines/dev-engine-encoder";
import { defineTool } from "../_lib/types";

const SAMPLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkYSBMb3ZlbGFjZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxODkzNDU2MDAwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export default defineTool({
  slug: "jwt-decoder",
  category: "developer",
  icon: "key",
  engine: { component: DevEncoderEngine, props: { codec: "jwt-decode", sample: SAMPLE } },
  related: ["base64-decoder", "hash-generator", "sha256-generator", "json-formatter"],
  copy: {
    en: {
      name: "JWT Decoder",
      tagline:
        "Decode JWT tokens online: inspect the header and payload claims with human-readable exp and iat timestamps. Decoding only — nothing is verified or uploaded.",
      intro: [
        "Paste a JSON Web Token and instantly see its three parts separately: the header (algorithm and token type), the payload (the actual claims) and the signature. Both JSON sections are pretty-printed, and timestamps like iat, nbf and exp are translated into plain dates in your locale, with exp marked as expired or still active.",
        "Everything is decoded locally with Base64URL — the token is never sent anywhere and never verified. Remember: decoding shows what a token says, not what it is allowed to do. Signature verification always requires the secret or public key on a trusted system.",
      ],
      steps: [
        "Paste the JWT (the three dot-separated parts) into the input box.",
        "Read the pretty-printed header and payload, with exp/iat shown as real dates.",
        "Fix your token or its server-side verification accordingly — copy the payload if needed.",
      ],
      faqs: [
        {
          q: "Does decoding a JWT verify it?",
          a: "No. Decoding is just Base64URL + JSON parsing and anyone can do it — including an attacker. A valid-looking decoded token proves nothing. Verification requires checking the signature with the secret (HMAC) or public key (RSA/EC), which needs the token issuer's key material.",
        },
        {
          q: "Can you recover or change a token's claims?",
          a: "You can read the claims, but you cannot forge a new token with modified claims without invalidating the signature — any change to header or payload breaks the signature check on the server.",
        },
        {
          q: "Is it safe to paste a real token here?",
          a: "The token is decoded entirely in your browser and never leaves your device — there is no upload. Still, treat tokens as credentials and avoid pasting production tokens anywhere you do not need to.",
        },
      ],
    },
    zh: {
      name: "JWT 解码",
      tagline: "在线解码 JWT:分开查看 header 与 payload,exp/iat 显示为易读时间并标注是否过期。仅解码——不验证、不上传。",
      intro: [
        "粘贴 JSON Web Token,立即分开看到三个部分:header(算法和类型)、payload(实际声明)和签名。两段 JSON 都做了美化排版,iat、nbf、exp 等时间戳会换算成本地语言的直观日期,exp 还会标注已过期或仍然有效。",
        "全部通过 Base64URL 在本地解码——令牌不会被发送到任何地方,也不会被验证。请记住:解码只展示令牌说了什么,不决定它被允许做什么。签名验证永远需要在可信系统上用密钥或公钥完成。",
      ],
      steps: [
        "把 JWT(三段以点分隔)粘贴到输入框。",
        "阅读美化后的 header 和 payload,exp/iat 直接显示为真实日期。",
        "据此修正令牌或服务端验证逻辑;需要时可复制 payload。",
      ],
      faqs: [
        {
          q: "解码 JWT 等于验证 JWT 吗?",
          a: "不等于。解码只是 Base64URL 加 JSON 解析,任何人都能做——攻击者也不例外。看起来合法的解码结果不能证明任何事。验证必须用密钥(HMAC)或公钥(RSA/EC)核对签名,而密钥只在签发方手里。",
        },
        {
          q: "能恢复或修改令牌里的声明吗?",
          a: "声明可以读,但无法在不破坏签名的情况下伪造修改后的新令牌——header 或 payload 的任何改动都会让服务端签名校验失败。",
        },
        {
          q: "在这里粘贴真实令牌安全吗?",
          a: "令牌完全在你的浏览器里解码,不会离开设备——没有任何上传。不过令牌本质是凭据,非必要不要把生产环境令牌贴到任何地方。",
        },
      ],
    },
    ja: {
      name: "JWT デコーダー",
      tagline:
        "JWT をオンラインでデコード:header と payload のクレームを確認し、exp・iat を人が読める時刻で表示。検証はせず、アップロードもありません。",
      intro: [
        "JSON Web Token を貼り付けると、3 つの部分が即座に分かれます:header(アルゴリズムとタイプ)、payload(実際のクレーム)、署名。両方の JSON は整形表示され、iat・nbf・exp といったタイムスタンプはロケールに応じた日時に変換され、exp は期限切れか有効かも示します。",
        "デコードはすべて Base64URL でローカルに行われます。トークンはどこにも送信されず、検証もされません。重要:デコードはトークンが何を「主張」しているかを示すだけで、何が「許可」されているかは示しません。署名検証には必ず秘密鍵または公開鍵と信頼できるシステムが必要です。",
      ],
      steps: [
        "JWT(ドット区切りの 3 部分)を入力欄に貼り付けます。",
        "整形された header と payload を読み、exp/iat を実際の日時で確認します。",
        "トークンやサーバー側の検証を修正します。必要なら payload をコピーします。",
      ],
      faqs: [
        {
          q: "JWT のデコードは検証になりますか?",
          a: "なりません。デコードは Base64URL と JSON パースだけです。攻撃者にもできます。デコードできても何も証明されません。検証には HMAC の秘密鍵や RSA/EC の公開鍵で署名を確認する必要があり、鍵は発行者だけが持っています。",
        },
        {
          q: "クレームを復元・改ざんできますか?",
          a: "クレームは読めますが、署名を無効化せずに改ざんした新しいトークンを作ることはできません。header や payload の変更はすべてサーバー側の署名検証を失敗させます。",
        },
        {
          q: "本物のトークンを貼っても安全ですか?",
          a: "トークンは完全にブラウザ内でデコードされ、端末の外には出ません。アップロードはありません。それでもトークンは認証情報です。必要のない場所に本番トークンを貼るのは避けてください。",
        },
      ],
    },
    es: {
      name: "Decodificador JWT",
      tagline:
        "Decodifica tokens JWT en línea: examina el header y los claims del payload con marcas iat y exp legibles. Solo decodifica — nada se verifica ni se sube.",
      intro: [
        "Pega un JSON Web Token y ve al instante sus tres partes por separado: el header (algoritmo y tipo), el payload (los claims reales) y la firma. Ambas secciones JSON se muestran formateadas, y las marcas de tiempo iat, nbf y exp se traducen a fechas legibles en tu idioma, con exp marcada como caducada o activa.",
        "Todo se decodifica localmente con Base64URL — el token nunca se envía a ningún sitio ni se verifica. Recuerda: decodificar muestra lo que un token dice, no lo que puede hacer. Verificar la firma siempre requiere la clave secreta o pública en un sistema de confianza.",
      ],
      steps: [
        "Pega el JWT (las tres partes separadas por puntos) en el cuadro de entrada.",
        "Lee el header y el payload formateados, con exp/iat como fechas reales.",
        "Corrige tu token o su verificación en el servidor — copia el payload si lo necesitas.",
      ],
      faqs: [
        {
          q: "¿Decodificar un JWT lo verifica?",
          a: "No. Decodificar es solo Base64URL + parseo JSON, y cualquiera puede hacerlo — también un atacante. Un token decodificado con buena pinta no prueba nada. La verificación exige comprobar la firma con el secreto (HMAC) o la clave pública (RSA/EC), que solo tiene quien emitió el token.",
        },
        {
          q: "¿Se pueden recuperar o cambiar los claims?",
          a: "Los claims se pueden leer, pero no se puede forjar un token nuevo con claims modificados sin invalidar la firma — cualquier cambio en header o payload rompe la verificación en el servidor.",
        },
        {
          q: "¿Es seguro pegar un token real aquí?",
          a: "El token se decodifica íntegramente en tu navegador y nunca sale de tu dispositivo — no hay subida. Aun así, los tokens son credenciales: evita pegar tokens de producción donde no haga falta.",
        },
      ],
    },
    pt: {
      name: "Decodificador JWT",
      tagline:
        "Decodifique tokens JWT on-line: examine o header e os claims do payload com iat e exp em datas legíveis. Só decodifica — nada é verificado ou enviado.",
      intro: [
        "Cole um JSON Web Token e veja instantaneamente as três partes separadas: o header (algoritmo e tipo), o payload (os claims de verdade) e a assinatura. As duas seções JSON aparecem formatadas, e os timestamps iat, nbf e exp viram datas legíveis no seu idioma, com exp marcado como expirado ou ativo.",
        "Tudo é decodificado localmente com Base64URL — o token nunca é enviado a lugar nenhum nem verificado. Lembre-se: decodificar mostra o que um token diz, não o que ele pode fazer. Verificar a assinatura sempre exige a chave secreta ou pública num sistema confiável.",
      ],
      steps: [
        "Cole o JWT (as três partes separadas por pontos) na caixa de entrada.",
        "Leia o header e o payload formatados, com exp/iat como datas reais.",
        "Ajuste seu token ou a verificação no servidor — copie o payload se precisar.",
      ],
      faqs: [
        {
          q: "Decodificar um JWT o verifica?",
          a: "Não. Decodificar é apenas Base64URL + parse de JSON, e qualquer pessoa consegue — inclusive um atacante. Um token decodificado com aparência válida não prova nada. A verificação exige conferir a assinatura com o segredo (HMAC) ou a chave pública (RSA/EC), que só o emissor tem.",
        },
        {
          q: "Dá para recuperar ou alterar os claims?",
          a: "Os claims podem ser lidos, mas não se pode forjar um token novo com claims modificados sem invalidar a assinatura — qualquer mudança no header ou payload quebra a verificação no servidor.",
        },
        {
          q: "É seguro colar um token real aqui?",
          a: "O token é decodificado inteiramente no seu navegador e nunca sai do seu dispositivo — não há upload. Ainda assim, tokens são credenciais: evite colar tokens de produção onde não for necessário.",
        },
      ],
    },
  },
});
