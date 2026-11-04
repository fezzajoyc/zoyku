import { DevHashEngine } from "../_engines/dev-engine-hash";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "md5-generator",
  category: "developer",
  icon: "hash",
  engine: { component: DevHashEngine, props: { algos: ["MD5"] } },
  related: ["sha256-generator", "hash-generator", "base64-encoder", "base64-image", "json-validator", "json-formatter", "url-encoder", "html-minifier", "url-decoder", "json-path-query"],
  copy: {
    en: {
      name: "MD5 Generator",
      tagline:
        "Generate MD5 hashes of any text or file instantly in your browser — perfect for checksums, dedup keys and legacy integrations. One-way, never uploaded.",
      intro: [
        "Comparing a download against the checksum a mirror publishes, generating keys for a cache or dedup table, or integrating with a legacy system that still expects MD5 — paste text or drop a file and the 128-bit digest appears instantly, computed locally.",
        "Output is 32 lowercase hexadecimal characters, updating as you type; file hashing stays on your device, so nothing is uploaded. The implementation follows RFC 1321 and matches md5sum and every other conformant tool.",
        "MD5 (Rivest, 1991) compresses input through a Merkle-Damgard construction into a 128-bit digest. It is fast by design — exactly why it survives in checksums, content addressing and non-cryptographic fingerprints.",
        "Cryptographically, though, it is broken: practical collisions have existed since 2004, and the 2012 Flame malware forged a Microsoft code-signing certificate with an MD5 collision. Use it for compatibility and integrity checks only — for signatures or password storage, move to SHA-256 or a dedicated password hash."
      ],
      steps: [
        "Type or paste the text — the MD5 digest updates live.",
        "Or switch to File mode and drop a file to hash it locally.",
        "Copy the hexadecimal digest and compare it with the expected checksum.",
      ],
      faqs: [
        {
          q: "Is MD5 safe for storing passwords?",
          a: "No — not even close. MD5 is fast by design and collision attacks are practical, which makes cracking MD5 password hashes trivial. Use a dedicated password hashing scheme such as bcrypt, scrypt or Argon2 instead.",
        },
        {
          q: "What is MD5 still good for?",
          a: "Non-adversarial integrity: verifying a file survived a transfer, deduplicating content, cache keys and talking to legacy systems that expect it. For security-relevant checks use SHA-256 or better.",
        },
        {
          q: "Are my text and files sent to a server?",
          a: "No. Everything runs in your browser; even files are read and hashed entirely on your device.",
        },
      ],
    },
    zh: {
      name: "MD5 生成器",
      tagline: "在浏览器里即时计算文本或文件的 MD5 哈希——校验和、去重键、老系统对接都好用。单向不可逆,数据不上传。",
      intro: [
        "输入文本即可实时看到 128 位 MD5 摘要,或直接拖入文件生成指纹,一个字节都不会上传。哈希在本地用成熟的 MD5 JavaScript 实现完成。",
        "MD5 仍然无处不在:下载校验和、文件去重键、缓存刷新、老系统集成。但要记住它不适合什么——MD5 在密码学上已被攻破,绝不要用于密码、签名或任何攻击者可能篡改的场景。",
      ],
      steps: [
        "输入或粘贴文本——MD5 摘要实时更新。",
        "也可切换到文件模式,拖入文件在本地计算。",
        "复制十六进制摘要,与预期校验和比对。",
      ],
      faqs: [
        {
          q: "MD5 适合存密码吗?",
          a: "完全不适合。MD5 的设计目标就是快,碰撞攻击已经实用化,破解 MD5 密码哈希轻而易举。存密码请用 bcrypt、scrypt 或 Argon2 这类专门的口令哈希方案。",
        },
        {
          q: "MD5 还适合什么场景?",
          a: "非对抗性的完整性:确认文件传输无损、内容去重、缓存键,以及对接仍然要求 MD5 的老系统。涉及安全的校验请用 SHA-256 或更强算法。",
        },
        {
          q: "文本和文件会被发送到服务器吗?",
          a: "不会。一切都在浏览器中完成,文件也完全在你的设备上读取和计算。",
        },
      ],
    },
    ja: {
      name: "MD5 ジェネレーター",
      tagline:
        "テキストやファイルの MD5 ハッシュをブラウザ内で即座に生成 — チェックサム・重複排除キー・レガシー連携に最適。一方向で未アップロード。",
      intro: [
        "テキストを入力すれば 128 ビットの MD5 ダイジェストがリアルタイムに表示され、ファイルをドロップすれば 1 バイトもアップロードせずにフィンガープリントを作れます。ハッシュ計算は成熟した MD5 の JavaScript 実装でローカルに行われます。",
        "MD5 は今もあちこちにあります:ダウンロードのチェックサム、ファイルの重複排除、キャッシュバスター、レガシーシステムとの連携。ただし「何に向かないか」も覚えておいてください。MD5 は暗号学的に破られており、パスワードや署名、攻撃者が改ざんできるものには絶対に使わないでください。",
      ],
      steps: [
        "テキストを入力・貼り付け — MD5 ダイジェストがリアルタイムに更新されます。",
        "またはファイルモードに切り替え、ファイルをドロップしてローカルでハッシュ化。",
        "16 進ダイジェストをコピーし、期待されるチェックサムと比較します。",
      ],
      faqs: [
        {
          q: "MD5 はパスワード保存に安全ですか?",
          a: "まったく安全ではありません。MD5 は設計上高速で、衝突攻撃は実用段階です。MD5 のパスワードハッシュの解読は容易です。パスワードには bcrypt・scrypt・Argon2 などの専用方式を使ってください。",
        },
        {
          q: "MD5 がまだ役立つ場面は?",
          a: "非対称性のない整合性確認:ファイルが転送で壊れていないかの確認、コンテンツの重複排除、キャッシュキー、MD5 を要求するレガシーシステム。セキュリティに関わる検証には SHA-256 以上を使います。",
        },
        {
          q: "テキストやファイルはサーバーに送られますか?",
          a: "いいえ。すべてブラウザ内で完結し、ファイルも完全に端末上で読み込まれハッシュ化されます。",
        },
      ],
    },
    es: {
      name: "Generador MD5",
      tagline:
        "Genera hashes MD5 de cualquier texto o archivo al instante en tu navegador — ideal para checksums, claves de deduplicación e integraciones heredadas.",
      intro: [
        "Escribe texto y ve su digest MD5 de 128 bits en vivo, o suelta un archivo para obtener su huella sin subir un solo byte. El hasheo ocurre localmente con una implementación JavaScript madura del algoritmo MD5.",
        "MD5 sigue estando en todas partes: checksums de descargas, claves de deduplicación, cache busters, integraciones con sistemas antiguos. Recuerda para qué no sirve — MD5 está criptográficamente roto, así que nunca lo uses para contraseñas, firmas ni nada que un atacante pueda manipular.",
      ],
      steps: [
        "Escribe o pega el texto — el digest MD5 se actualiza en vivo.",
        "O cambia a modo Archivo y suelta un archivo para hashearlo localmente.",
        "Copia el digest hexadecimal y compáralo con el checksum esperado.",
      ],
      faqs: [
        {
          q: "¿Es MD5 seguro para guardar contraseñas?",
          a: "No — ni de lejos. MD5 es rápido por diseño y los ataques de colisión son prácticos, así que crackear hashes MD5 de contraseñas es trivial. Usa un esquema específico como bcrypt, scrypt o Argon2.",
        },
        {
          q: "¿Para qué sirve todavía MD5?",
          a: "Integridad sin adversarios: comprobar que un archivo llegó intacto, deduplicar contenido, claves de caché e integraciones heredadas que lo exigen. Para comprobaciones de seguridad usa SHA-256 o mejor.",
        },
        {
          q: "¿Mi texto y archivos se envían a un servidor?",
          a: "No. Todo corre en tu navegador; incluso los archivos se leen y hashean íntegramente en tu dispositivo.",
        },
      ],
    },
    pt: {
      name: "Gerador MD5",
      tagline:
        "Gere hashes MD5 de qualquer texto ou arquivo na hora, no seu navegador — perfeito para checksums, chaves de deduplicação e integrações legadas.",
      intro: [
        "Digite texto e veja o digest MD5 de 128 bits ao vivo, ou solte um arquivo para gerar a impressão digital sem enviar um byte sequer. O hashing acontece localmente com uma implementação JavaScript madura do algoritmo MD5.",
        "O MD5 continua em toda parte: checksums de downloads, chaves de deduplicação, cache busters, integrações com sistemas antigos. Só lembre do que ele não serve — MD5 está criptograficamente quebrado, então nunca use para senhas, assinaturas ou algo que um atacante possa adulterar.",
      ],
      steps: [
        "Digite ou cole o texto — o digest MD5 atualiza ao vivo.",
        "Ou mude para o modo Arquivo e solte um arquivo para hashear localmente.",
        "Copie o digest hexadecimal e compare com o checksum esperado.",
      ],
      faqs: [
        {
          q: "MD5 é seguro para armazenar senhas?",
          a: "Não — nem de longe. MD5 é rápido por design e ataques de colisão são práticos, o que torna trivial quebrar hashes de senha MD5. Use um esquema dedicado como bcrypt, scrypt ou Argon2.",
        },
        {
          q: "Para que o MD5 ainda serve?",
          a: "Integridade sem adversários: conferir se um arquivo sobreviveu à transferência, deduplicar conteúdo, chaves de cache e sistemas legados que o exigem. Para verificações de segurança use SHA-256 ou superior.",
        },
        {
          q: "Meu texto e arquivos são enviados a um servidor?",
          a: "Não. Tudo roda no seu navegador; até os arquivos são lidos e hasheados inteiramente no seu dispositivo.",
        },
      ],
    },
  },
});
