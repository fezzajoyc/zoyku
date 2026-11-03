import { DevHashEngine } from "../_engines/dev-engine-hash";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "sha1-generator",
  category: "developer",
  icon: "hash",
  engine: { component: DevHashEngine, props: { algos: ["SHA-1"] } },
  related: ["sha256-generator", "hash-generator", "md5-generator", "base64-encoder"],
  copy: {
    en: {
      name: 'SHA-1 Generator',
      tagline: 'Compute SHA-1 hashes of text or files in your browser with native WebCrypto — still common in Git commits and legacy checksums. Fully client-side.',
      intro: ["Paste text to see its 160-bit SHA-1 digest live, or drop a file to fingerprint it locally. The browser's WebCrypto engine does the work, so even large files are hashed without a single byte leaving your device.", 'SHA-1 is legacy but alive: Git still identifies objects with it and plenty of older systems verify downloads against SHA-1 checksums. Use this tool for compatibility and verification — for anything security-critical, choose SHA-256 or stronger instead.'],
      steps: ['Type or paste the text — the digest updates as you type.', 'Or switch to File mode and drop a file to hash it locally.', 'Copy the hexadecimal digest and compare it with the expected value.'],
      faqs: [
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
      ],
    },
    zh: {
      name: 'SHA-1 生成器',
      tagline: '在浏览器里用原生 WebCrypto 计算 SHA-1 哈希——Git 提交和旧校验和仍在用它。完全本地处理,数据不上传。',
      intro: ['粘贴文本即可实时看到 160 位 SHA-1 摘要,或拖入文件在本地生成指纹。哈希由浏览器 WebCrypto 引擎完成,再大的文件也不会有一个字节离开设备。', 'SHA-1 虽是老算法但仍然活跃:Git 至今用它标识对象,不少老系统仍以 SHA-1 校验和验证下载。用它做兼容与校验没问题——安全敏感场景请选 SHA-256 或更强的算法。'],
      steps: ['输入或粘贴文本——摘要随输入实时更新。', '也可切换到文件模式,拖入文件在本地计算。', '复制十六进制摘要,与预期值比对。'],
      faqs: [
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
      ],
    },
    ja: {
      name: 'SHA-1 ジェネレーター',
      tagline: 'ネイティブ WebCrypto でブラウザ内のテキストやファイルの SHA-1 を計算 — Git コミットやレガシーチェックサムで現役。完全クライアント処理です。',
      intro: ['テキストを貼り付けると 160 ビットの SHA-1 ダイジェストがリアルタイムに表示され、ファイルをドロップすればローカルでフィンガープリントできます。ハッシュはブラウザの WebCrypto エンジンが処理するため、大きなファイルでも 1 バイトも端末の外に出ません。', 'SHA-1 はレガシーながら現役です:Git は今もオブジェクト識別に使い、多くの旧システムが SHA-1 チェックサムでダウンロードを検証しています。互換性と検証には有用ですが、セキュリティが重要な場面では SHA-256 以上を選んでください。'],
      steps: ['テキストを入力・貼り付け — ダイジェストは入力に合わせて更新されます。', 'またはファイルモードに切り替え、ファイルをドロップしてローカルでハッシュ化。', '16 進ダイジェストをコピーし、期待値と比較します。'],
      faqs: [
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
      ],
    },
    es: {
      name: 'Generador SHA-1',
      tagline: 'Calcula hashes SHA-1 de texto o archivos en tu navegador con WebCrypto nativo — aún presente en commits de Git y checksums heredados. 100% local.',
      intro: ['Pega texto para ver su resumen SHA-1 de 160 bits en vivo, o suelta un archivo para generar su huella localmente. El motor WebCrypto del navegador hace el trabajo, así que ni un solo byte sale de tu dispositivo.', 'SHA-1 es un algoritmo heredado pero vivo: Git sigue identificando objetos con él y muchos sistemas antiguos verifican descargas con checksums SHA-1. Úsalo para compatibilidad y verificación; para nada crítico de seguridad elige SHA-256 o superior.'],
      steps: ['Escribe o pega el texto: el resumen se actualiza al escribir.', 'O cambia al modo archivo y suelta un archivo para hashearlo localmente.', 'Copia el resumen hexadecimal y compáralo con el valor esperado.'],
      faqs: [
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
      ],
    },
    pt: {
      name: 'Gerador SHA-1',
      tagline: 'Calcule hashes SHA-1 de texto ou arquivos no navegador com WebCrypto nativo — ainda presente em commits do Git e checksums legados. 100% local.',
      intro: ['Cole texto para ver o resumo SHA-1 de 160 bits em tempo real, ou solte um arquivo para gerar a impressão digital localmente. O motor WebCrypto do navegador faz o trabalho — nem um byte sai do seu dispositivo.', 'SHA-1 é legado mas vivo: o Git ainda identifica objetos com ele e muitos sistemas antigos verificam downloads com checksums SHA-1. Use para compatibilidade e verificação; para o que é crítico de segurança, prefira SHA-256 ou superior.'],
      steps: ['Digite ou cole o texto — o resumo atualiza conforme você digita.', 'Ou mude para o modo arquivo e solte um arquivo para hashear localmente.', 'Copie o resumo hexadecimal e compare com o valor esperado.'],
      faqs: [
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
      ],
    },
  },
});
