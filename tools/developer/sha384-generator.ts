import { DevHashEngine } from "../_engines/dev-engine-hash";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "sha384-generator",
  category: "developer",
  icon: "hash",
  engine: { component: DevHashEngine, props: { algos: ["SHA-384"] } },
  related: ["sha256-generator", "sha512-generator", "hash-generator", "jwt-decoder", "md5-generator", "base64-image", "json-validator", "json-formatter", "url-encoder", "html-minifier"],
  copy: {
    en: {
      name: 'SHA-384 Generator',
      tagline: 'Compute SHA-384 hashes of text or files in your browser via native WebCrypto — the mid-size SHA-2 variant used in TLS 1.2 and code signing. Fully client-side.',
      intro: [
        "Meeting TLS 1.2 cipher-suite requirements, matching enterprise code-signing digests, or filling a certificate configuration that expects exactly 384 bits — paste text or drop a file and the digest appears instantly, computed locally.",
        "Output is 96 lowercase hexadecimal characters (48 bytes). SHA-384 is SHA-512 truncated to 384 bits but with different initial hash values, so it is a distinct FIPS 180-4 algorithm — you cannot reproduce it by cutting a SHA-512 digest short.",
        "Hashing goes through native WebCrypto SubtleCrypto, which follows FIPS 180-4; results match sha384sum, OpenSSL and every other compliant implementation. Text and file inputs never leave your device.",
        "Compared with SHA-256, SHA-384 offers a larger security margin and pairs naturally with the P-384 elliptic curve in ECDSA — the reason TLS 1.2 suites such as ECDHE_ECDSA_WITH_AES_256_CBC_SHA384 specify it. Pick SHA-512 instead when raw speed on 64-bit hardware matters most."
      ],
      steps: ['Type or paste the text — the digest updates as you type.', 'Or switch to File mode and drop a file to hash it locally.', 'Copy the hexadecimal digest and compare it with the expected value.'],
      faqs: [
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
      ],
      deepDive: [
        {
          heading: "Where SHA-384 sits in the SHA-2 family",
          paragraphs: [
            "SHA-2 is not one algorithm but a family standardized in FIPS 180-4, defined by two internal engines: SHA-224 and SHA-256 run the 256-bit engine (32-bit words), while SHA-384 and SHA-512 run the 512-bit engine (64-bit words). The outputs are 224, 256, 384 and 512 bits respectively — 56, 64, 96 and 128 hexadecimal characters. SHA-384 is what you get when the 512-bit engine is initialized with different constants and its output is truncated to 384 bits.",
            "That truncation is why SHA-384 is not simply “SHA-512 cut short”. The different initial values make it a distinct algorithm with its own specification: no known attack on SHA-512 would transfer to SHA-384's shorter output, and conversely you cannot verify a SHA-384 digest by hashing with SHA-512 and slicing. The tools must agree on the algorithm, not just the family.",
            "Security-wise, all four SHA-2 variants are believed to offer close to their output length in collision resistance — SHA-384 gives a 192-bit security level against collisions, far beyond any practical need. The usual reason to pick one over another is infrastructure compatibility: what your TLS suite, your code-signing chain or your counterpart's verifier already expects.",
          ],
        },
        {
          heading: "Reading the output and checking it correctly",
          paragraphs: [
            "The digest is 96 hexadecimal characters, emitted here in lowercase — hexadecimal comparison is case-insensitive, but some verifier tools compare strings literally, so a case mismatch can look like a hash mismatch. The digest is deterministic: the same input bytes always yield the same output on every correct implementation, which is exactly why it works as a checksum.",
            "Beware the encoding trap when comparing with a reference value: hashing the text “hello” as UTF-8, UTF-16 or with a trailing newline produces three different digests. Command-line tools notoriously append a newline to echo's output unless you use echo -n or printf. When your digest does not match, the data almost certainly differs — same algorithm, different bytes.",
            "For files, the digest identifies content, not metadata: copying the file preserves the hash, while re-encoding, converting line endings or re-saving through an editor changes it. That property is what makes SHA-384 digests useful as tamper evidence for installers and certificates — and why a matching hash proves only that the bytes are identical, not that the sender is trustworthy.",
          ],
        },
        {
          heading: "Native crypto, local processing",
          paragraphs: [
            "The hashing goes through your browser's native WebCrypto SubtleCrypto, not JavaScript code written by this site — the same audited implementation your browser uses for TLS. Output matches sha384sum, OpenSSL and every other FIPS 180-4 compliant tool byte for byte, and it runs faster than any pure-JS hash for large files.",
            "Text and file inputs never leave your device: the digest is computed in your browser's memory and nothing is uploaded, stored or logged. That matters for the typical use — verifying installers, hashing internal secrets for configuration, or computing the digest of a document you have not published yet.",
          ],
        },
      ],
    },
    zh: {
      name: 'SHA-384 生成器',
      tagline: '在浏览器里用原生 WebCrypto 计算 SHA-384 哈希——TLS 1.2 和代码签名常用的 SHA-2 变体。完全本地处理,数据不上传。',
      intro: ['粘贴文本即可实时看到 384 位 SHA-384 摘要,或拖入文件在本地生成指纹。SHA-384 就是 SHA-512 截断到 384 位:安全强度与 SHA-512 同级,输出更短,适合证书与 HMAC 配置里用不上 512 位的场合。', '你会在 TLS 1.2 加密套件、macOS 系统完整性检查和企业代码签名链里遇到 SHA-384。一键复制十六进制摘要,与厂商或规范发布的值比对。'],
      steps: ['输入或粘贴文本——摘要随输入实时更新。', '也可切换到文件模式,拖入文件在本地计算。', '复制十六进制摘要,与预期值比对。'],
      faqs: [
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
      ],
    },
    ja: {
      name: 'SHA-384 ジェネレーター',
      tagline: 'ネイティブ WebCrypto でブラウザ内のテキストやファイルの SHA-384 を計算 — TLS 1.2 やコード署名で使われる SHA-2 変種。完全クライアント処理です。',
      intro: ['テキストを貼り付けると 384 ビットの SHA-384 ダイジェストがリアルタイムに表示され、ファイルをドロップすればローカルでフィンガープリントできます。SHA-384 は SHA-512 を 384 ビットに切り詰めたもの:強度は SHA-512 と同水準で、出力が短いため証明書や HMAC 設定で 512 ビットが過剰な場合に適します。', 'SHA-384 は TLS 1.2 の暗号スイート、macOS のシステム整合性チェック、エンタープライズのコード署名チェーンで登場します。16 進ダイジェストをワンクリックでコピーし、ベンダーや仕様が公開する値と比較できます。'],
      steps: ['テキストを入力・貼り付け — ダイジェストは入力に合わせて更新されます。', 'またはファイルモードに切り替え、ファイルをドロップしてローカルでハッシュ化。', '16 進ダイジェストをコピーし、期待値と比較します。'],
      faqs: [
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
      ],
    },
    es: {
      name: 'Generador SHA-384',
      tagline: 'Calcula hashes SHA-384 de texto o archivos en tu navegador con WebCrypto nativo — la variante SHA-2 usada en TLS 1.2 y firma de código. 100% local.',
      intro: ['Pega texto para ver su resumen SHA-384 de 384 bits en vivo, o suelta un archivo para generar su huella localmente. SHA-384 es SHA-512 truncado a 384 bits: la misma clase de fuerza con una salida más corta, ideal para certificados y configuraciones HMAC donde 512 bits es excesivo.', 'Encontrarás SHA-384 en suites de cifrado TLS 1.2, verificaciones de integridad de macOS y cadenas de firma de código corporativas. Copia el resumen hexadecimal y compáralo con el valor publicado por tu proveedor o especificación.'],
      steps: ['Escribe o pega el texto: el resumen se actualiza al escribir.', 'O cambia al modo archivo y suelta un archivo para hashearlo localmente.', 'Copia el resumen hexadecimal y compáralo con el valor esperado.'],
      faqs: [
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
      ],
    },
    pt: {
      name: 'Gerador SHA-384',
      tagline: 'Calcule hashes SHA-384 de texto ou arquivos no navegador com WebCrypto nativo — a variante SHA-2 usada em TLS 1.2 e assinatura de código. 100% local.',
      intro: ['Cole texto para ver o resumo SHA-384 de 384 bits em tempo real, ou solte um arquivo para gerar a impressão digital localmente. SHA-384 é SHA-512 truncado para 384 bits: a mesma classe de força com saída mais curta, ideal para certificados e configurações HMAC onde 512 bits é excessivo.', 'Você encontrará SHA-384 em suítes de cifra TLS 1.2, verificações de integridade do macOS e cadeias de assinatura de código corporativas. Copie o resumo hexadecimal e compare com o valor publicado pelo fornecedor ou especificação.'],
      steps: ['Digite ou cole o texto — o resumo atualiza conforme você digita.', 'Ou mude para o modo arquivo e solte um arquivo para hashear localmente.', 'Copie o resumo hexadecimal e compare com o valor esperado.'],
      faqs: [
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
      ],
    },
  },
});
