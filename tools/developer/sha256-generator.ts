import { DevHashEngine } from "../_engines/dev-engine-hash";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "sha256-generator",
  category: "developer",
  icon: "hash",
  engine: { component: DevHashEngine, props: { algos: ["SHA-256"] } },
  related: ["md5-generator", "hash-generator", "uuid-generator", "jwt-decoder"],
  copy: {
    en: {
      name: "SHA-256 Generator",
      tagline:
        "Calculate SHA-256 hashes of text or files online using native WebCrypto — the standard choice for integrity checks and fingerprints. 100% client-side.",
      intro: [
        "Type text to watch its 256-bit SHA-256 digest appear live, or drop in a file to fingerprint gigabytes without uploading anything. The hash is computed by the browser's own WebCrypto implementation — the same code your OS and TLS stack trust.",
        "SHA-256 is today's default for verifying downloads, signing artifacts, deduplicating content, building content-addressed storage and blockchain work. Copy the hex digest in one click and compare it with the checksum a publisher gave you.",
      ],
      steps: [
        "Type or paste the text — the digest updates as you type.",
        "Or switch to File mode and drop a file to hash it locally.",
        "Copy the hexadecimal digest and compare it with the expected value.",
      ],
      faqs: [
        {
          q: "Is SHA-256 secure?",
          a: "Yes — SHA-256 is part of the SHA-2 family and remains unbroken after two decades of analysis. It is the digest behind TLS certificates, Bitcoin and most software release verification.",
        },
        {
          q: "Why does the same input always give the same hash?",
          a: "Because SHA-256 is deterministic: identical bytes always produce an identical digest. That property is exactly what makes checksum comparison work — one changed byte anywhere changes the whole digest.",
        },
        {
          q: "Are my text and files uploaded?",
          a: "No. Hashing runs locally in your browser with WebCrypto — your data never leaves the device.",
        },
      ],
    },
    zh: {
      name: "SHA-256 生成器",
      tagline: "用浏览器原生 WebCrypto 在线计算文本或文件的 SHA-256 哈希——完整性校验与指纹的标准选择,100% 本地处理。",
      intro: [
        "输入文本即可实时看到 256 位 SHA-256 摘要,或拖入文件为几 GB 的内容生成指纹而无需上传任何东西。哈希由浏览器自带的 WebCrypto 实现——与你操作系统和 TLS 信任的是同一套代码。",
        "SHA-256 是当今校验下载、为构件签名、内容去重、内容寻址存储和区块链工作的默认选择。一键复制十六进制摘要,与发布方提供的校验和比对。",
      ],
      steps: [
        "输入或粘贴文本——摘要随输入实时更新。",
        "也可切换到文件模式,拖入文件在本地计算。",
        "复制十六进制摘要,与预期值比对。",
      ],
      faqs: [
        {
          q: "SHA-256 安全吗?",
          a: "安全。SHA-256 属于 SHA-2 家族,经过二十年的分析仍未被攻破。TLS 证书、比特币和大多数软件发布验证都以它为摘要算法。",
        },
        {
          q: "为什么相同输入总是得到相同哈希?",
          a: "因为 SHA-256 是确定性的:相同的字节永远产生相同的摘要。这正是校验和比对有效的原因——任何位置改动一个字节,整个摘要都会改变。",
        },
        {
          q: "文本和文件会被上传吗?",
          a: "不会。哈希在浏览器中用 WebCrypto 本地完成,数据不离开设备。",
        },
      ],
    },
    ja: {
      name: "SHA-256 ジェネレーター",
      tagline:
        "ネイティブ WebCrypto でテキストやファイルの SHA-256 をオンライン計算 — 整合性チェックとフィンガープリントの標準。100% ブラウザ内処理です。",
      intro: [
        "テキストを入力すれば 256 ビットの SHA-256 ダイジェストがリアルタイムに現れ、ファイルをドロップすれば数 GB のデータもアップロードなしでフィンガープリントできます。ハッシュはブラウザ自身の WebCrypto 実装が計算します — OS や TLS スタックが信頼するのと同じコードです。",
        "SHA-256 は今日、ダウンロード検証・成果物の署名・コンテンツの重複排除・コンテンツアドレス型ストレージ・ブロックチェーン処理の標準です。16 進ダイジェストをワンクリックでコピーし、公開元のチェックサムと比較できます。",
      ],
      steps: [
        "テキストを入力・貼り付け — ダイジェストは入力に合わせて更新されます。",
        "またはファイルモードに切り替え、ファイルをドロップしてローカルでハッシュ化。",
        "16 進ダイジェストをコピーし、期待値と比較します。",
      ],
      faqs: [
        {
          q: "SHA-256 は安全ですか?",
          a: "はい。SHA-256 は SHA-2 ファミリーの一部で、20 年以上の解析でも破られていません。TLS 証明書、Bitcoin、多くのソフトウェアリリース検証の基盤となるダイジェストです。",
        },
        {
          q: "同じ入力から常に同じハッシュになるのはなぜ?",
          a: "SHA-256 は決定論的だからです。同一のバイト列は常に同一のダイジェストを生みます。チェックサム比較が機能するのはまさにこの性質のおかげで、どこか 1 バイト変わればダイジェスト全体が変わります。",
        },
        {
          q: "テキストやファイルはアップロードされますか?",
          a: "いいえ。ハッシュはブラウザ内の WebCrypto でローカルに計算され、データは端末の外に出ません。",
        },
      ],
    },
    es: {
      name: "Generador SHA-256",
      tagline:
        "Calcula hashes SHA-256 de texto o archivos en línea con WebCrypto nativo — la opción estándar para integridad y huellas. 100% en el navegador.",
      intro: [
        "Escribe texto y ve aparecer su digest SHA-256 de 256 bits en vivo, o suelta un archivo para obtener la huella de gigabytes sin subir nada. El hash lo calcula la implementación WebCrypto del propio navegador — el mismo código en el que confían tu sistema operativo y tu pila TLS.",
        "SHA-256 es hoy el estándar para verificar descargas, firmar artefactos, deduplicar contenido, almacenamiento direccionado por contenido y trabajo con blockchain. Copia el digest hexadecimal con un clic y compáralo con el checksum del publicador.",
      ],
      steps: [
        "Escribe o pega el texto — el digest se actualiza al escribir.",
        "O cambia a modo Archivo y suelta un archivo para hashearlo localmente.",
        "Copia el digest hexadecimal y compáralo con el valor esperado.",
      ],
      faqs: [
        {
          q: "¿SHA-256 es seguro?",
          a: "Sí — SHA-256 pertenece a la familia SHA-2 y lleva dos décadas de análisis sin romperse. Es el digest detrás de los certificados TLS, Bitcoin y la mayoría de verificaciones de lanzamientos de software.",
        },
        {
          q: "¿Por qué la misma entrada da siempre el mismo hash?",
          a: "Porque SHA-256 es determinista: bytes idénticos producen siempre un digest idéntico. Esa propiedad es la que hace funcionar la comparación de checksums — un solo byte cambiado altera el digest completo.",
        },
        {
          q: "¿Mi texto y archivos se suben?",
          a: "No. El hasheo corre localmente en tu navegador con WebCrypto — tus datos nunca salen del dispositivo.",
        },
      ],
    },
    pt: {
      name: "Gerador SHA-256",
      tagline:
        "Calcule hashes SHA-256 de texto ou arquivos on-line com WebCrypto nativo — a escolha padrão para integridade e impressões digitais. 100% no navegador.",
      intro: [
        "Digite texto e veja o digest SHA-256 de 256 bits surgir ao vivo, ou solte um arquivo para gerar a impressão digital de gigabytes sem enviar nada. O hash é calculado pela implementação WebCrypto do próprio navegador — o mesmo código em que seu sistema operacional e pilha TLS confiam.",
        "SHA-256 é hoje o padrão para verificar downloads, assinar artefatos, deduplicar conteúdo, armazenamento endereçado por conteúdo e trabalho com blockchain. Copie o digest hexadecimal com um clique e compare com o checksum que o publicador forneceu.",
      ],
      steps: [
        "Digite ou cole o texto — o digest atualiza conforme você digita.",
        "Ou mude para o modo Arquivo e solte um arquivo para hashear localmente.",
        "Copie o digest hexadecimal e compare com o valor esperado.",
      ],
      faqs: [
        {
          q: "SHA-256 é seguro?",
          a: "Sim — o SHA-256 faz parte da família SHA-2 e segue intacto após duas décadas de análise. É o digest por trás de certificados TLS, Bitcoin e da maioria das verificações de releases de software.",
        },
        {
          q: "Por que a mesma entrada sempre gera o mesmo hash?",
          a: "Porque o SHA-256 é determinístico: bytes idênticos sempre produzem um digest idêntico. É exatamente essa propriedade que faz a comparação de checksums funcionar — um único byte alterado muda o digest inteiro.",
        },
        {
          q: "Meu texto e arquivos são enviados?",
          a: "Não. O hashing roda localmente no seu navegador com WebCrypto — seus dados nunca saem do dispositivo.",
        },
      ],
    },
  },
});
