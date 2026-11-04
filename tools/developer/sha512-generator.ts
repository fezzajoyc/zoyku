import { DevHashEngine } from "../_engines/dev-engine-hash";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "sha512-generator",
  category: "developer",
  icon: "hash",
  engine: { component: DevHashEngine, props: { algos: ["SHA-512"] } },
  related: ["sha256-generator", "sha384-generator", "hash-generator", "base64-encoder", "md5-generator", "base64-image", "json-validator", "json-formatter", "url-encoder", "html-minifier"],
  copy: {
    en: {
      name: 'SHA-512 Generator',
      tagline: 'Compute SHA-512 hashes of text or files in your browser with native WebCrypto — the strongest SHA-2 digest for checksums, HMAC and archival integrity. 100% client-side.',
      intro: [
        "Hashing large installers or disk images, generating long-term archival checksums, or signing API payloads where the widest margin matters — paste text or drop a file and the 512-bit digest updates live, entirely in your browser.",
        "The digest is 128 hexadecimal characters (64 bytes). On 64-bit CPUs SHA-512 actually outpaces SHA-256 because it works on 64-bit words internally, so even large files hash quickly without a single byte leaving your device.",
        "Everything runs through the native WebCrypto SubtleCrypto digest API, which implements FIPS 180-4: 1024-bit blocks, 80 rounds of 64-bit words. Results match sha512sum, OpenSSL and every other standards-compliant tool.",
        "That margin is why modern Linux /etc/shadow password entries, HMAC-SHA512 API signatures and archival manifests build on it — when a checksum must still be trustworthy decades from now, 512 bits is the conventional answer."
      ],
      steps: ['Type or paste the text — the digest updates as you type.', 'Or switch to File mode and drop a file to hash it locally.', 'Copy the hexadecimal digest and compare it with the expected value.'],
      faqs: [
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
      ],
    },
    zh: {
      name: 'SHA-512 生成器',
      tagline: '在浏览器里用原生 WebCrypto 计算 SHA-512 哈希——SHA-2 家族最强的摘要算法,校验和、HMAC 与归档完整性首选。完全本地处理。',
      intro: ['粘贴文本即可实时看到 512 位 SHA-512 摘要,或拖入文件在本地生成指纹。在 64 位硬件上 SHA-512 反而比 SHA-256 更快,处理大文件归档和备份时是自然之选。', 'SHA-512 常见于 HMAC-SHA512 API 签名、磁盘镜像校验和注重安全余量的长期归档校验。一键复制十六进制摘要,与任何公开校验和比对。'],
      steps: ['输入或粘贴文本——摘要随输入实时更新。', '也可切换到文件模式,拖入文件在本地计算。', '复制十六进制摘要,与预期值比对。'],
      faqs: [
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
      ],
    },
    ja: {
      name: 'SHA-512 ジェネレーター',
      tagline: 'ネイティブ WebCrypto でブラウザ内のテキストやファイルの SHA-512 を計算 — SHA-2 ファミリー最強のダイジェスト。チェックサム・HMAC・アーカイブ完全性に最適。100% クライアント処理。',
      intro: ['テキストを貼り付けると 512 ビットの SHA-512 ダイジェストがリアルタイムに表示され、ファイルをドロップすればローカルでフィンガープリントできます。64 ビット CPU では SHA-512 が SHA-256 より速いことも多く、大きなアーカイブやバックアップのハッシュに適します。', 'SHA-512 は HMAC-SHA512 API 署名、ディスクイメージ検証、セキュリティマージンを最重視する長期アーカイブのチェックサムに登場します。16 進ダイジェストをワンクリックでコピーし、公開されたチェックサムと比較できます。'],
      steps: ['テキストを入力・貼り付け — ダイジェストは入力に合わせて更新されます。', 'またはファイルモードに切り替え、ファイルをドロップしてローカルでハッシュ化。', '16 進ダイジェストをコピーし、期待値と比較します。'],
      faqs: [
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
      ],
    },
    es: {
      name: 'Generador SHA-512',
      tagline: 'Calcula hashes SHA-512 de texto o archivos en tu navegador con WebCrypto nativo — el resumen SHA-2 más fuerte para checksums, HMAC e integridad de archivos. 100% local.',
      intro: ['Pega texto para ver su resumen SHA-512 de 512 bits en vivo, o suelta un archivo para generar su huella localmente. En hardware de 64 bits, SHA-512 es incluso más rápido que SHA-256, lo que lo convierte en la elección natural para archivar y respaldar grandes volúmenes.', 'SHA-512 aparece en firmas HMAC-SHA512 de APIs, verificación de imágenes de disco y checksums de archivo a largo plazo donde importa el mayor margen de seguridad. Copia el resumen hexadecimal y compáralo con cualquier checksum publicado.'],
      steps: ['Escribe o pega el texto: el resumen se actualiza al escribir.', 'O cambia al modo archivo y suelta un archivo para hashearlo localmente.', 'Copia el resumen hexadecimal y compáralo con el valor esperado.'],
      faqs: [
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
      ],
    },
    pt: {
      name: 'Gerador SHA-512',
      tagline: 'Calcule hashes SHA-512 de texto ou arquivos no navegador com WebCrypto nativo — o resumo SHA-2 mais forte para checksums, HMAC e integridade de arquivos. 100% local.',
      intro: ['Cole texto para ver o resumo SHA-512 de 512 bits em tempo real, ou solte um arquivo para gerar a impressão digital localmente. Em hardware de 64 bits, SHA-512 é até mais rápido que SHA-256, sendo a escolha natural para arquivar e backup de grandes volumes.', 'SHA-512 aparece em assinaturas HMAC-SHA512 de APIs, verificação de imagens de disco e checksums de arquivo de longo prazo onde a maior margem de segurança importa. Copie o resumo hexadecimal e compare com qualquer checksum publicado.'],
      steps: ['Digite ou cole o texto — o resumo atualiza conforme você digita.', 'Ou mude para o modo arquivo e solte um arquivo para hashear localmente.', 'Copie o resumo hexadecimal e compare com o valor esperado.'],
      faqs: [
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
      ],
    },
  },
});
