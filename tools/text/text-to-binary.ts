import { TextTransform } from "../_engines/text-tool";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "text-to-binary",
  category: "text",
  icon: "code",
  engine: {
    component: TextTransform,
    props: {
      transform: "text-binary",
      options: [
        { key: 'decode', label: { en: 'Decode binary to text', zh: '把二进制解码回文本', ja: 'バイナリをテキストにデコード', es: 'Decodificar binario a texto', pt: 'Decodificar binário para texto' }, default: false }
      ],
      sample: 'Hi!'
    },
  },
  related: ["text-to-unicode", "case-converter", "base64-encoder", "text-cleaner", "text-diff", "text-sorter", "remove-extra-spaces", "remove-duplicate-lines", "word-counter", "lorem-ipsum-generator"],
  copy: {
    en: {
      name: 'Text to Binary',
      tagline: 'Convert any text to 8-bit binary bytes and back — UTF-8 safe, instant and fully in your browser. Perfect for teaching, puzzles and CS homework.',
      intro: ["Every character you type becomes its UTF-8 byte sequence rendered as groups of eight 0s and 1s. 'Hi!' turns into 01001000 01101001 00100001 — the exact bits a computer stores, shown in a form you can read and copy.",
        "Switch on Decode to go the other way: paste space-separated binary groups and get the original text back. Multi-byte characters such as emoji and CJK are handled correctly because decoding goes through the browser's UTF-8 TextDecoder."],
      steps: ['Type or paste the text to encode — binary appears live.',
        "Flip on 'Decode binary to text' to convert binary groups back into words.",
        'Copy the result with one click.'],
      faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
      ],
    },
    zh: {
      name: '文本转二进制',
      tagline: '把任意文本转成 8 位二进制字节并随时解回——UTF-8 安全,浏览器内即时完成。教学、谜题、CS 作业都好用。',
      intro: ['你输入的每个字符都会变成 UTF-8 字节序列,以 8 位一组的 0 和 1 展示。「Hi!」会变成 01001000 01101001 00100001——这正是计算机实际存储的比特,只是换成了可读可复制的形式。',
        '打开「解码」即可反向操作:粘贴以空格分隔的二进制组,还原出原始文本。emoji、中日韩文字等多字节字符也能正确还原,因为解码走的是浏览器原生的 UTF-8 TextDecoder。'],
      steps: ['输入或粘贴要编码的文本——二进制实时出现。',
        '打开「把二进制解码回文本」开关,把二进制组转回文字。',
        '一键复制结果。'],
      faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
      ],
    },
    ja: {
      name: 'テキスト→バイナリ',
      tagline: '任意のテキストを 8 ビットのバイナリに変換、その逆も可能 — UTF-8 対応でブラウザ内即時処理。教育・パズル・CS の課題に。',
      intro: ['入力した各文字が UTF-8 のバイト列になり、8 桁の 0 と 1 のグループとして表示されます。「Hi!」は 01001000 01101001 00100001 に — コンピュータが実際に格納するビットそのものを読める形で。',
        'デコードを有効にすれば逆変換:空白区切りのバイナリグループを貼り付けると元のテキストが戻ります。絵文字や CJK 文字などのマルチバイト文字も、ブラウザ本来の UTF-8 TextDecoder を通すため正しく復元されます。'],
      steps: ['エンコードするテキストを入力 — バイナリがリアルタイムに現れます。',
        '「バイナリをテキストにデコード」を切り替えると、バイナリから元の文字へ戻せます。',
        'ワンクリックで結果をコピー。'],
      faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
      ],
    },
    es: {
      name: 'Texto a binario',
      tagline: 'Convierte cualquier texto a bytes binarios de 8 bits y viceversa — compatible con UTF-8, instantáneo y 100% en tu navegador. Ideal para enseñar, rompecabezas y tareas de informática.',
      intro: ["Cada carácter que escribes se convierte en su secuencia de bytes UTF-8 mostrada en grupos de ocho 0s y 1s. '¡Hi!' se convierte en 01001000 01101001 00100001 — los bits exactos que almacena un ordenador, en una forma que puedes leer y copiar.",
        'Activa Decodificar para ir al revés: pega grupos binarios separados por espacios y recupera el texto original. Los caracteres multibyte como emojis y CJK se manejan bien porque la decodificación usa el TextDecoder UTF-8 del navegador.'],
      steps: ['Escribe o pega el texto a codificar — el binario aparece en vivo.',
        "Activa 'Decodificar binario a texto' para convertir grupos binarios de nuevo en palabras.",
        'Copia el resultado con un clic.'],
      faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
      ],
    },
    pt: {
      name: 'Texto para binário',
      tagline: 'Converta qualquer texto em bytes binários de 8 bits e vice-versa — compatível com UTF-8, instantâneo e 100% no seu navegador. Ótimo para ensinar, quebra-cabeças e tarefas de ciência da computação.',
      intro: ["Cada caractere digitado se torna sua sequência de bytes UTF-8 exibida em grupos de oito 0s e 1s. 'Hi!' vira 01001000 01101001 00100001 — os bits exatos que um computador armazena, numa forma que você pode ler e copiar.",
        'Ative Decodificar para ir ao contrário: cole grupos binários separados por espaço e recupere o texto original. Caracteres multibyte como emojis e CJK funcionam porque a decodificação usa o TextDecoder UTF-8 do navegador.'],
      steps: ['Digite ou cole o texto para codificar — o binário aparece em tempo real.',
        "Ative 'Decodificar binário para texto' para converter grupos binários de volta em palavras.",
        'Copie o resultado com um clique.'],
      faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
      ],
    },
  },
});
