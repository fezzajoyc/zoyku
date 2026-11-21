import { DevCrc16ModbusEngine } from "../_engines/dev-engine-crc16";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "crc16-modbus",
  category: "developer",
  icon: "hash",
  engine: { component: DevCrc16ModbusEngine },
  related: ["hash-generator", "binary-converter", "base64-encoder", "json-formatter", "url-parser"],
  copy: {
    en: {
      name: "CRC-16/Modbus Calculator",
      tagline: "Calculate CRC-16/Modbus from hexadecimal bytes, with the numeric checksum and Modbus low-byte-first wire order shown separately.",
      intro: [
        "Paste a Modbus RTU frame as hexadecimal bytes and get the CRC-16/Modbus checksum locally. The tool keeps the two representations separate: the conventional 16-bit value is shown as high byte then low byte, while a Modbus frame transmits the low byte first.",
        "Whitespace is ignored, bytes are preserved exactly, and invalid or incomplete hexadecimal input is rejected instead of silently changing the message. The reference vector 01 03 00 00 00 0A produces CDC5, transmitted as C5 CD.",
        "This is a protocol error detector, not encryption or authentication. CRC-16/Modbus uses width 16, polynomial 0x8005 in reflected form (0xA001), initial value 0xFFFF and no final XOR; it cannot prove who sent a frame or prevent deliberate tampering.",
      ],
      steps: ["Enter an even number of hexadecimal digits, with optional whitespace.", "Review the CRC value and the low-byte-first Modbus wire bytes.", "Copy the representation required by your frame or test fixture."],
      faqs: [
        { q: "Why are there two CRC outputs?", a: "The 16-bit CRC value is conventionally written high byte first, such as CDC5. Modbus RTU places the low byte on the wire first, so the frame bytes are C5 CD. They encode the same 16-bit result." },
        { q: "Does CRC-16/Modbus encrypt or authenticate a message?", a: "No. It detects many accidental transmission errors, but it is not cryptographic and an attacker can deliberately modify a frame and recompute the CRC. Use a secure authenticated protocol when authenticity matters." },
        { q: "Are my frames uploaded?", a: "No. Parsing and calculation run in this browser. The input is not sent to a server or included in the URL." },
      ],
    },
    zh: {
      name: "CRC-16/Modbus 计算器",
      tagline: "输入十六进制字节计算 CRC-16/Modbus，同时分开显示 CRC 数值和 Modbus 低字节在前的报文字节序。",
      intro: ["粘贴 Modbus RTU 报文的十六进制字节即可在浏览器本地计算 CRC-16/Modbus。工具把两种表示分开：常规 16 位数值按高字节在前显示，Modbus 报文则按低字节在前发送。", "空白会忽略，字节原样保留；奇数位或非法十六进制会明确拒绝，不会静默改写报文。标准样例 01 03 00 00 00 0A 的结果是 CDC5，发送字节为 C5 CD。", "这是协议检错，不是加密或身份认证。CRC-16/Modbus 不能证明报文来自谁，也不能阻止攻击者修改报文后重新计算校验值。"],
      steps: ["输入偶数个十六进制数字，可用空白分隔。", "查看 CRC 数值和低字节在前的 Modbus 报文字节。", "复制协议或测试夹具需要的表示形式。"],
      faqs: [{ q: "为什么显示两个 CRC 结果？", a: "CDC5 是常规的 16 位数值写法；Modbus RTU 在线路上先发送低字节，所以报文字节是 C5 CD。两者表示同一个校验值。" }, { q: "CRC-16/Modbus 能加密或认证报文吗？", a: "不能。它用于发现许多传输错误，不是密码学算法；攻击者可以修改报文后重新计算 CRC。需要真实性时应使用安全的认证协议。" }, { q: "输入会上传吗？", a: "不会。解析和计算都在浏览器本地完成，输入不会发送到服务器，也不会写进 URL。" }],
    },
    ja: {
      name: "CRC-16/Modbus 計算機",
      tagline: "16進バイト列から CRC-16/Modbus を計算し、数値表記と Modbus の下位バイト先行の送信順を分けて表示します。",
      intro: ["Modbus RTU フレームを16進バイトで貼り付けると、CRC-16/Modbus をブラウザ内で計算します。通常の16ビット値と、Modbus が線上で使う下位バイト先行の順序を分けて表示します。", "空白は無視し、バイトはそのまま保持します。奇数桁や不正な16進文字は明確に拒否します。基準例 01 03 00 00 00 0A は CDC5、送信順は C5 CD です。", "これはプロトコルの誤り検出であり、暗号化や認証ではありません。送信者の証明や意図的な改ざん防止はできません。"],
      steps: ["空白を含めてもよい偶数個の16進数字を入力します。", "CRC 値と下位バイト先行の Modbus 送信バイトを確認します。", "必要な表記をコピーしてフレームやテストに使います。"],
      faqs: [{ q: "なぜ CRC が2種類表示されますか？", a: "CDC5 は通常の16ビット表記です。Modbus RTU は下位バイトを先に送るため、線上のバイトは C5 CD になります。" }, { q: "CRC は暗号化や認証ですか？", a: "いいえ。偶発的な伝送エラーを検出するだけで、暗号学的な認証ではありません。" }, { q: "入力は送信されますか？", a: "いいえ。解析と計算はこのブラウザ内で完了し、入力は送信も URL 保存もされません。" }],
    },
    es: {
      name: "Calculadora CRC-16/Modbus",
      tagline: "Calcula CRC-16/Modbus desde bytes hexadecimales y muestra por separado el valor y el orden de transmisión Modbus con el byte bajo primero.",
      intro: ["Pega una trama Modbus RTU como bytes hexadecimales y calcula CRC-16/Modbus en el navegador. Separamos el valor de 16 bits del orden de bytes que realmente transmite Modbus.", "Se ignoran los espacios, se conservan los bytes y se rechazan entradas incompletas o no hexadecimales.", "Es una comprobación de errores de protocolo, no cifrado ni autenticación; no demuestra quién envió la trama ni evita una modificación deliberada."],
      steps: ["Escribe un número par de dígitos hexadecimales, con espacios opcionales.", "Revisa el valor CRC y los bytes Modbus con el byte bajo primero.", "Copia la representación que necesite tu trama o prueba."],
      faqs: [{ q: "¿Por qué hay dos resultados?", a: "CDC5 es el valor convencional; Modbus transmite primero el byte bajo, C5 CD. Ambos representan el mismo CRC." }, { q: "¿CRC cifra o autentica?", a: "No. Detecta muchos errores accidentales, pero no es criptográfico ni impide que alguien recalcule el valor tras modificar la trama." }, { q: "¿Se suben mis datos?", a: "No. Todo se calcula localmente en el navegador." }],
    },
    pt: {
      name: "Calculadora CRC-16/Modbus",
      tagline: "Calcule CRC-16/Modbus a partir de bytes hexadecimais e veja separadamente o valor e a ordem de transmissão Modbus com o byte baixo primeiro.",
      intro: ["Cole um quadro Modbus RTU como bytes hexadecimais e calcule CRC-16/Modbus no navegador. O valor de 16 bits fica separado da ordem de bytes usada na transmissão Modbus.", "Espaços são ignorados, os bytes são preservados e entradas incompletas ou inválidas são recusadas.", "Isto detecta erros de protocolo, não cifra nem autentica mensagens e não impede adulteração deliberada."],
      steps: ["Digite uma quantidade par de dígitos hexadecimais, com espaços opcionais.", "Confira o valor CRC e os bytes Modbus com o byte baixo primeiro.", "Copie o formato exigido pelo quadro ou teste."],
      faqs: [{ q: "Por que há duas saídas?", a: "CDC5 é o valor convencional; o Modbus transmite primeiro o byte baixo, C5 CD. Os dois representam o mesmo CRC." }, { q: "CRC cifra ou autentica?", a: "Não. Ele detecta muitos erros acidentais, mas não é criptográfico nem impede que alguém recalcule o valor depois de alterar o quadro." }, { q: "Minha entrada é enviada?", a: "Não. O cálculo é feito localmente no navegador." }],
    },
  },
});
