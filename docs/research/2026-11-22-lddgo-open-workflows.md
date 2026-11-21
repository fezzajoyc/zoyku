# LDDGO 尚未补齐的工作流

由[420 项完整语义对照](2026-11-21-lddgo-full-comparison.md)自动生成，保留每项同行入口及具体缺口。

当前：206 项缺失、109 项部分覆盖、36 项待来源。另有 55 项核心已有、14 项不可比。

这是同行目录条目，不是独立工具数量；同一内核的单个/批量、不同选项和重复分类需要合并实施。待来源项目须先明确标准、数据或真实产品语义。完整已有项目的资源限制仍在原对照中。

| 分类 | 缺失 | 部分覆盖 | 待来源 |
| --- | --- | --- | --- |
| 字符 | 50 | 23 | 1 |
| 转换 | 14 | 17 | 0 |
| 加密 | 39 | 7 | 0 |
| 网络 | 6 | 6 | 0 |
| 更多 | 46 | 24 | 1 |
| 图表 | 0 | 0 | 16 |
| 数学 | 18 | 9 | 0 |
| 坐标 | 4 | 0 | 18 |
| 图片 | 18 | 18 | 0 |
| 文件 | 11 | 5 | 0 |

## 尚缺核心工作流

### 字符（50 项）

| 同行条目 | 工作流 | 具体缺口 |
| --- | --- | --- |
| LDDGO-01-001 · [Java正则表达式测试](https://www.lddgo.net/string/regex) | regex-runtime | No registered Java regex runtime; syntax, Unicode and replacement behavior cannot be inferred from JavaScript. |
| LDDGO-01-003 · [Golang正则表达式在线测试](https://www.lddgo.net/string/golangregex) | regex-runtime | No registered Golang/RE2 regex runtime; syntax, Unicode and replacement behavior cannot be inferred from JavaScript. |
| LDDGO-01-004 · [Python正则表达式在线测试](https://www.lddgo.net/string/pythonregex) | regex-runtime | No registered Python regex runtime; syntax, Unicode and replacement behavior cannot be inferred from JavaScript. |
| LDDGO-01-008 · [字符串HEX转换](https://www.lddgo.net/string/hex) | text-hex | The inspected encoding engines expose UTF-8 binary, Unicode code points and integer radix conversion. None accepts text/HEX bytes with a selectable charset; integer-base conversion and Unicode escapes are different representations. |
| LDDGO-01-009 · [在线HTML编辑器](https://www.lddgo.net/string/htmleditor) | rich-html-editor | Markdown source preview, HTML source formatting and Markdown-style DOCX export are registered. None supplies a rich-text HTML editor or produces an editable HTML document from rich-text controls. |
| LDDGO-01-010 · [在线JSON5格式化校验](https://www.lddgo.net/string/json5) | json5 | JSON5 comments, single quotes, unquoted keys and trailing commas are not implemented as JSON5 parsing. |
| LDDGO-01-017 · [JSON转Java实体类](https://www.lddgo.net/string/jsontojava) | json-language-emitters | No Java/POJO emitter or target-language identifier/keyword handling is registered. TypeScript is a separate output workflow. |
| LDDGO-01-018 · [JSON转C#实体类](https://www.lddgo.net/string/jsontocsharp) | json-language-emitters | No C# emitter or target-language identifier/keyword handling is registered. TypeScript is a separate output workflow. |
| LDDGO-01-019 · [JSON转Golang结构体](https://www.lddgo.net/string/jsontogolang) | json-language-emitters | No Golang struct emitter or target-language identifier/keyword handling is registered. TypeScript is a separate output workflow. |
| LDDGO-01-033 · [在线SQLite查看器](https://www.lddgo.net/string/sqlite-viewer) | sqlite-workbench | SQL formatter dynamically loads sql-formatter for source formatting; CSV editor rearranges text matrices. Neither opens/creates SQLite databases, executes SQL nor exports a database. |
| LDDGO-01-038 · [在线MySQL生成JavaBean](https://www.lddgo.net/string/mysql-to-java) | mysql-ddl-java | SQL formatting does not parse MySQL DDL into Java classes. The code generator takes JSON values and emits TypeScript interfaces, so neither its input grammar nor output language matches. |
| LDDGO-01-040 · [在线文本提取工具](https://www.lddgo.net/string/text-extract) | text-extraction | Email validation checks an entered address; regex testing exposes raw matching, not the declared typed bulk extraction workflow. |
| LDDGO-01-044 · [在线JSON Schema校验](https://www.lddgo.net/string/json-schema) | json-schema | json-validator checks JSON syntax; schema-markup-generator creates SEO JSON-LD and does not validate a JSON document against JSON Schema. |
| LDDGO-01-045 · [在线随机JSON数据生成](https://www.lddgo.net/string/random-json) | json-schema | Random number and identifier tools are not schema-driven object/array generation. |
| LDDGO-01-046 · [在线JSON数据生成JSON Schema](https://www.lddgo.net/string/generate-json-schema) | json-schema | json-to-typescript infers TypeScript interfaces only; it does not emit Draft-04/06/07 schema documents. |
| LDDGO-01-047 · [在线随机数据生成](https://www.lddgo.net/string/random-data) | random-template-data | Fixed-alphabet tokens and integer draws lack field/template expansion for mixed string, numeric, time and phone data. |
| LDDGO-01-048 · [在线随机时间生成器](https://www.lddgo.net/string/random-date) | random-dates | Date arithmetic and timestamp conversion operate on supplied dates; random-number generates integers without date formatting, increment/decrement or repeat rules. No random-time generator is registered. |
| LDDGO-01-049 · [在线XPath测试](https://www.lddgo.net/string/xml-xpath) | xpath | XML formatting/validation and XML-to-JSON conversion do not evaluate namespace-aware XPath expressions. |
| LDDGO-01-050 · [在线生成ASCII艺术字](https://www.lddgo.net/string/text-to-ascii-art) | ascii-art | Fancy text substitutes Unicode characters. It does not render multi-character FIGlet/ASCII glyphs, choose ASCII-art fonts or expose their layout parameters. |
| LDDGO-01-051 · [在线Python pyc文件编译与反编译](https://www.lddgo.net/string/pyc-compile-decompile) | python-bytecode | The registered code engine formats/minifies text. It has no Python runtime, pyc version-aware compiler or decompiler, and source minification is not bytecode conversion. |
| LDDGO-01-053 · [随机邮箱地址生成](https://www.lddgo.net/string/random-email-address) | random-email | Token generation creates fixed-alphabet strings; email-validator checks a supplied address. Neither assembles randomized local parts/domains using configurable email-address rules. |
| LDDGO-01-054 · [在线误差随机数生成器](https://www.lddgo.net/string/error-random-number) | random-error-values | Integer range sampling has no nominal-value/deviation model. Random numbers within bounds do not implement the declared error-range workflow. |
| LDDGO-01-055 · [在线随机手机号生成器](https://www.lddgo.net/string/random-phone-number) | random-phone | Integer and token generators have no phone template evaluator, placeholder rules or formatted phone output. Generic randomness alone is not an equivalent phone-data generator. |
| LDDGO-01-056 · [在线文本打乱顺序工具](https://www.lddgo.net/string/text-shuffling-order) | text-shuffle | sortLines exposes ascending/descending/length/numeric order; reverseText reverses deterministically and the wheel selects one supplied entry. None shuffles an entire text by characters/lines with punctuation-preservation controls. |
| LDDGO-01-058 · [在线正则表达式可视化](https://www.lddgo.net/string/regex-visualization) | regex-visualization | The regex core uses JavaScript RegExp for matching/replacement and the registered engine shows match results. It does not parse syntax into a railroad/structure graph or export such a diagram. |
| LDDGO-01-059 · [在线点阵字生成器](https://www.lddgo.net/string/xbm-generator) | xbm-authoring | Grayscale is a raster luminance filter and text-to-binary returns UTF-8 bytes. Neither builds thresholded monochrome text/image bitmap data nor serializes XBM C-array images. |
| LDDGO-01-060 · [在线XBM编辑器](https://www.lddgo.net/string/xbm-editor) | xbm-authoring | SVG converter decodes existing SVG and rasterizes it to PNG. It has no XBM parser, editable bit grid or XBM serializer. |
| LDDGO-01-063 · [在线中英文之间加空格](https://www.lddgo.net/string/add-space-between-chinese-and-english) | cjk-latin-spacing | The inspected cleaner removes invisible characters, normalizes selected punctuation and collapses existing whitespace. It has no Han/Latin boundary detection or insertion of missing separation spaces. |
| LDDGO-01-064 · [在线文字竖排工具](https://www.lddgo.net/string/text-vertical) | vertical-text | Text reversal returns reversed scalar/line ordering, not a vertical layout with columns and copy/download semantics. No vertical-writing transformer is registered. |
| LDDGO-01-067 · [在线Unicode编码字符查看](https://www.lddgo.net/string/unicode-chart) | unicode-range-browser | Text-to-Unicode converts supplied text/escape sequences; it does not accept start/end code-point ranges or browse/enumerate all assigned characters in them. |
| LDDGO-01-068 · [文本字符集编码查询](https://www.lddgo.net/string/char-encode) | charset-byte-query | The inspected text encoders use UTF-8 bytes or Unicode code points. They do not choose legacy character sets, display the same text under several charsets or decode bytes across those charsets. |
| LDDGO-01-069 · [中文字符Unicode编码范围](https://www.lddgo.net/string/cjk-unicode) | cjk-unicode-browser | Unicode escaping handles supplied characters, but no CJK-block database, range selection or range character enumeration is reachable. |
| LDDGO-01-070 · [在线手写文字生成](https://www.lddgo.net/string/handwritten-text-generate) | handwriting-render | Placeholder renders one system-font SVG text label and DOCX exporter builds document content. Neither supplies handwriting font families, handwriting spacing controls or handwriting image generation. |
| LDDGO-01-071 · [在线字帖生成器](https://www.lddgo.net/string/copybook-generate) | copybook-generation | Document export and generic labels do not provide practice grids, stroke-order glyphs, pinyin copybooks or printable tracing templates. |
| LDDGO-01-072 · [在线随机测试数据生成](https://www.lddgo.net/string/fake-data) | faker-template-data | The random engines only draw bounded integers or fixed-alphabet strings. No Faker locale dataset, template functions or mixed JSON/CSV/string fixture generator is registered. |
| LDDGO-01-073 · [在线随机车牌号生成器](https://www.lddgo.net/string/random-car-id) | random-license-plate | Fixed-alphabet and integer generators do not model Chinese regional prefixes, plate classes, new-energy layouts or custom plate templates. |
| LDDGO-01-074 · [在线JavaScript对象转JSON](https://www.lddgo.net/string/js-object-to-json) | javascript-object-json | The final JSON formatter uses a strict JSON parser. It does not parse JavaScript object literals with identifiers/single quotes/method syntax or emit JavaScript objects; treating strict JSON as JavaScript-object conversion would overstate the grammar. |
| LDDGO-01-075 · [在线随机文件生成器](https://www.lddgo.net/string/random-file-generator) | random-binary-files | Token generation returns displayed text, not random byte files. There is no byte-range, file-size/extension selection, multiple-file generation or download workflow. |
| LDDGO-01-076 · [在线文本隐藏](https://www.lddgo.net/string/hide-text) | text-steganography | Cleaning invisible characters and Base64 encoding are not encrypted steganography in cover text. No password-protected hidden-text encoder/decoder is registered. |
| LDDGO-01-077 · [在线随机银行卡号生成](https://www.lddgo.net/string/random-bank-card-number) | random-bank-cards | Integer and fixed-alphabet token outputs have no bank-card digit rules, issuer constraints, check-digit generation or downloadable card dataset workflow. |
| LDDGO-01-079 · [在线随机姓名生成器](https://www.lddgo.net/string/random-name-generator) | random-person-names | The local name picker selects from names entered by the user. It has no multilingual name dataset, gender filters or first/last-name generation, so selection is not synthetic-name generation. |
| LDDGO-01-080 · [在线模板数据生成](https://www.lddgo.net/string/template-data-generator) | protocol-template-data | The inspected random and JSON table cores do not evaluate typed fields, prior-field references, JavaScript calculations or binary protocol templates. |
| LDDGO-01-085 · [在线卡号密码生成器](https://www.lddgo.net/string/card-no-password-generator) | card-password-pairs | Password/token generation and random draws are separate outputs. No paired card-number/password generator supports time/sequence/random card rules or configurable paired export. |
| LDDGO-01-086 · [在线随机颜色生成器](https://www.lddgo.net/string/random-color) | random-color | Local color tools convert a user-selected swatch and build gradients from chosen stops. There is no random-color batch generator or HSV/CMYK/YUV output, so color conversion alone does not close this workflow. |
| LDDGO-01-087 · [在线总和随机数生成](https://www.lddgo.net/string/random-number-with-sum) | fixed-sum-random | Independent integer draws cannot satisfy a fixed-sum constraint. No constrained partition sampler, arbitrary-precision integer generator or 1000-decimal-place distribution output is reachable. |
| LDDGO-01-088 · [在线字符集编码信息查询](https://www.lddgo.net/string/charset-encoding-info-query) | charset-range-browser | The local Unicode transformer converts provided scalars, not charset repertoires. It has no charset database, byte-domain range query or mapping to supported Unicode ranges. |
| LDDGO-01-090 · [在线Nano ID生成器](https://www.lddgo.net/string/nanoid-generator) | nanoid-generation | Fixed-alphabet token generation lacks user-defined alphabets and Nano ID-specific output controls. Shared cryptographic randomness does not establish Nano ID workflow or probability semantics. |
| LDDGO-01-091 · [在线信息熵计算器](https://www.lddgo.net/string/shannon-entropy-calculator) | shannon-entropy | Random-number/password entropy reports describe generator search spaces or a password-guess model. They do not compute empirical Shannon entropy from binary/text/probability distributions with selectable logarithm base and precision. |
| LDDGO-01-092 · [在线JSON键重命名](https://www.lddgo.net/string/json-key-rename) | json-key-rename | Case converter transforms entire strings; JSON formatter sorts existing keys and JSON path only queries. No recursive key-renaming transformation, prefix/suffix or collision policy is reachable. |
| LDDGO-01-093 · [在线JSON转Markdown表格](https://www.lddgo.net/string/json-to-markdown-table) | json-markdown-table | JSON-to-CSV produces delimiter-separated cells and Markdown preview renders existing Markdown. HTML-to-Markdown accepts HTML; none parses/serializes JSON↔Markdown tables with nested expansion and Markdown escaping. |

### 转换（14 项）

| 同行条目 | 工作流 | 具体缺口 |
| --- | --- | --- |
| LDDGO-02-001 · [数字转二进制](https://www.lddgo.net/convert/numberbinary) | typed-number-bits | 已检查全部注册数组及下列相关核心；binary-converter 是整数数值进制转换，未提供 float/double/short/int/long 的固定宽度内存表示、字节序或 IEEE754 位模式；文本字节转换同样不等价。 |
| LDDGO-02-010 · [简体繁体字转换](https://www.lddgo.net/convert/traditional) | chinese-script | 已检查全部注册数组及下列相关核心；case-converter 处理大小写/宽度，不转换简繁/台港词汇；没有字形词库或地区 OpenCC 等转换核心。 |
| LDDGO-02-011 · [汉字转拼音](https://www.lddgo.net/convert/pinyin) | pinyin | 已检查全部注册数组及下列相关核心；text-to-unicode 输出码点而非读音；注册文本变换中没有拼音、声调或多音字选择。 |
| LDDGO-02-014 · [文件转Hex字符串](https://www.lddgo.net/convert/filehex) | hex-file | 已检查全部注册数组及下列相关核心；Base64 文件页只能 Base64，CRC16 输入 HEX 只计算校验值，均无文件↔HEX 下载工作流。 |
| LDDGO-02-017 · [在线curl命令转代码](https://www.lddgo.net/convert/curl-to-code) | curl-code | 已检查全部注册数组及下列相关核心；url-parser 只拆 URL、没有解析 curl 请求和生成各语言 HTTP 客户端代码。 |
| LDDGO-02-019 · [在线HTML转JS](https://www.lddgo.net/convert/html-to-js) | html-javascript | 已检查全部注册数组及下列相关核心；HTML 格式化/转义只返回 HTML 或实体文本；没有生成 JS 变量的模板字符串/普通字符串拼接模式。 |
| LDDGO-02-024 · [CSS长度单位转换](https://www.lddgo.net/convert/css-length-unit-convert) | css-length | 已检查全部注册数组及下列相关核心；length-converter 是物理长度换算，没有 CSS 上下文参数（字号、根字号、视口）与 px/em/rem/vw/vh 等转换。 |
| LDDGO-02-027 · [在线原码/反码/补码计算器](https://www.lddgo.net/convert/number-binary-code) | signed-number-bits | 已检查全部注册数组及下列相关核心；binary-converter 是非负整数位值转换，没有原码/反码/补码或任意位宽有符号整数表示。 |
| LDDGO-02-029 · [在线字体格式转换](https://www.lddgo.net/convert/font-format-converter) | font-conversion | 已检查全部注册数组及下列相关核心；没有 EOT/OTF/SVG/TTF/WOFF/WOFF2 字体格式解析、转换或字体 demo；svg-converter 面向图片光栅化，不等价。 |
| LDDGO-02-030 · [在线字体裁剪工具](https://www.lddgo.net/convert/font-subset) | font-subset | 已检查全部注册数组及下列相关核心；没有按文字/Unicode 范围生成裁剪后字体文件；text-to-unicode 仅输出码点，不处理字体字形表。 |
| LDDGO-02-033 · [在线汉字拼音首字母](https://www.lddgo.net/convert/pinyin-first-letter) | pinyin-initial | 已检查全部注册数组及下列相关核心；没有汉字读音或拼音首字母核心；大小写/全半角变换不生成拼音。 |
| LDDGO-02-035 · [在线本地字体预览](https://www.lddgo.net/convert/local-font-preview) | font-preview | 已检查全部注册数组及下列相关核心；没有本地字体文件/系统字体枚举和预览；fancy-text-generator 只替换 Unicode 字形字符，不加载字体。 |
| LDDGO-02-037 · [在线MessagePack和JSON转换](https://www.lddgo.net/convert/msgpack-to-json) | messagepack | 已检查全部注册数组及下列相关核心；JSON 工具处理 JSON 文本；没有 MessagePack 二进制编解码或 hex/base64/字节数组输入映射。 |
| LDDGO-02-039 · [在线Protocol Buffers编码解码](https://www.lddgo.net/convert/protocol-buffers-encode-decode) | protobuf | 已检查全部注册数组及下列相关核心；没有 proto 定义文件解析、多消息 Protocol Buffers 编码/解码；JSON 类型生成和 Base64 解码不能解释 protobuf wire schema。 |

### 加密（39 项）

| 同行条目 | 工作流 | 具体缺口 |
| --- | --- | --- |
| LDDGO-03-004 · [DES加密解密](https://www.lddgo.net/encrypt/des) | des | 已检查全部注册数组及下列相关核心；DES 对称加/解密；没有 DES 密钥、模式、IV 或数据格式入口。 |
| LDDGO-03-006 · [在线htpasswd生成器](https://www.lddgo.net/encrypt/htpasswd) | htpasswd | 已检查全部注册数组及下列相关核心；Apache htpasswd 口令文件生成；随机密码或普通 MD5/HMAC 不是 htpasswd 格式。 |
| LDDGO-03-007 · [异或校验(BCC校验)在线计算](https://www.lddgo.net/encrypt/bcc) | bcc | 已检查全部注册数组及下列相关核心；BCC 异或校验；CRC16 是多项式余数，不能替代逐字节 XOR。 |
| LDDGO-03-008 · [在线摩斯密码翻译器](https://www.lddgo.net/encrypt/morse) | morse | 已检查全部注册数组及下列相关核心；Unicode 摩斯码双向转换；NATO 音标是另一种字母读法，不是点划电码。 |
| LDDGO-03-009 · [AES加密解密](https://www.lddgo.net/encrypt/aes) | aes | 已检查全部注册数组及下列相关核心；AES CBC/CFB/OFB/CTR/GCM/ECB 加解密；现有哈希和 HMAC 不可逆，不能替代。 |
| LDDGO-03-010 · [SSL证书生成](https://www.lddgo.net/encrypt/ssl) | x509-generate | 已检查全部注册数组及下列相关核心；生成域名/IP X.509 证书；RDAP 域名查询不生成密钥或证书。 |
| LDDGO-03-011 · [在线Javascript混淆加密](https://www.lddgo.net/encrypt/js) | javascript-obfuscation | 已检查全部注册数组及下列相关核心；JavaScript 混淆及强度参数；javascript-minifier 仅保守删除注释/空行，不提供变量混淆/控制流变换。 |
| LDDGO-03-013 · [3DES/TripleDES加密解密](https://www.lddgo.net/encrypt/tripledes) | tripledes | 已检查全部注册数组及下列相关核心；TripleDES 加解密及多模式；哈希/HMAC 不支持可逆密码。 |
| LDDGO-03-014 · [在线RSA公钥私钥生成](https://www.lddgo.net/encrypt/rsakey) | rsa-keypair | 已检查全部注册数组及下列相关核心；RSA 公私钥生成与 PEM/HEX 导出；JWT 验证只导入已有公钥。 |
| LDDGO-03-015 · [在线RSA加密解密](https://www.lddgo.net/encrypt/rsa) | rsa-encryption | 已检查全部注册数组及下列相关核心；RSA 公钥/私钥加解密与格式选择；JWT 签名验证不是 RSA 数据加解密。 |
| LDDGO-03-017 · [Blowfish加密解密](https://www.lddgo.net/encrypt/blowfish) | blowfish | 已检查全部注册数组及下列相关核心；Blowfish 加解密及模式/IV 选择；无对应密码核心。 |
| LDDGO-03-018 · [在线RC6加密解密](https://www.lddgo.net/encrypt/rc6) | rc6 | 已检查全部注册数组及下列相关核心；RC6 加解密；无对应密码核心。 |
| LDDGO-03-019 · [在线RC5加密解密](https://www.lddgo.net/encrypt/rc5) | rc5 | 已检查全部注册数组及下列相关核心；RC5 加解密；无对应密码核心。 |
| LDDGO-03-020 · [在线RC4加密解密](https://www.lddgo.net/encrypt/rc4) | rc4 | 已检查全部注册数组及下列相关核心；RC4 加解密；无对应流密码核心。 |
| LDDGO-03-021 · [在线RC2加密解密](https://www.lddgo.net/encrypt/rc2) | rc2 | 已检查全部注册数组及下列相关核心；RC2 加解密；无对应密码核心。 |
| LDDGO-03-024 · [在线凯撒密码加密解密](https://www.lddgo.net/encrypt/caesar-cipher) | caesar | 已检查全部注册数组及下列相关核心；支持中英文的凯撒密码移位；reverse-text/case-converter 不执行字母表移位。 |
| LDDGO-03-025 · [在线维吉尼亚密码加密解密](https://www.lddgo.net/encrypt/vigenere-cipher) | vigenere | 已检查全部注册数组及下列相关核心；支持中英文维吉尼亚密码；没有密钥驱动的周期移位。 |
| LDDGO-03-026 · [在线LRC校验(纵向冗余校验)计算器](https://www.lddgo.net/encrypt/lrc) | lrc | 已检查全部注册数组及下列相关核心；LRC 纵向冗余校验及四进制输出；CRC16/HMAC 运算不同。 |
| LDDGO-03-027 · [在线JWT Token生成](https://www.lddgo.net/encrypt/jwt-generate) | jwt-generate | 已检查全部注册数组及下列相关核心；token-generator 生成随机字符，jwt-decoder 仅解码/验证已有 JWT；没有 header/payload 编写、JWS 签发或 JWE 加密 JWT 生成。 |
| LDDGO-03-030 · [在线RSA签名和验证](https://www.lddgo.net/encrypt/rsa-sign-verify) | asymmetric-sign | 已检查全部注册数组及下列相关核心；JWT 验证仅对 JWT signing input 验 RSA/ECDSA；不能签任意数据、没有 DSA 签验入口。HMAC 对称 MAC 也不是 RSA/DSA/ECDSA 签名。 |
| LDDGO-03-031 · [在线查看证书](https://www.lddgo.net/encrypt/view-certificate) | x509-inspect | 已检查全部注册数组及下列相关核心；PEM/DER 证书/证书链查看；JWT 公钥导入不解析证书主题、SAN、指纹等。 |
| LDDGO-03-032 · [在线CSR查看和生成](https://www.lddgo.net/encrypt/csr-view-generate) | csr | 已检查全部注册数组及下列相关核心；CSR 查看和 RSA/ECDSA CSR 生成；没有 PKCS#10 结构解析/签发入口。 |
| LDDGO-03-033 · [在线CSR颁发证书](https://www.lddgo.net/encrypt/cert-issuer) | x509-issue | 已检查全部注册数组及下列相关核心；根据 CSR 签发 X.509 及根证书；没有 CA 密钥/CSR/证书签发核心。 |
| LDDGO-03-034 · [在线证书格式转换](https://www.lddgo.net/encrypt/cert-format-converter) | certificate-convert | 已检查全部注册数组及下列相关核心；PEM/PKCS12/PKCS8/JKS/DER 证书格式互转；Base64 字节编码不是证书容器转换。 |
| LDDGO-03-035 · [在线私钥加密解密](https://www.lddgo.net/encrypt/private-key-encrypt-decrypt) | private-key-encryption | 已检查全部注册数组及下列相关核心；RSA/DSA/ECDSA 私钥 PEM/DER 加解密；JWT 验签只导入验证材料，没有私钥口令保护。 |
| LDDGO-03-036 · [在线CMAC计算](https://www.lddgo.net/encrypt/cmac-calculate) | cmac | 已检查全部注册数组及下列相关核心；AES/DES/SM4 CMAC；HMAC 使用哈希，不能替代分组密码 MAC。 |
| LDDGO-03-037 · [在线PBKDF2派生密钥和校验](https://www.lddgo.net/encrypt/pbkdf2) | pbkdf2 | 已检查全部注册数组及下列相关核心；PBKDF2 派生/校验、盐、迭代和长度参数；随机 token 及单次 HMAC 都不是 KDF。 |
| LDDGO-03-038 · [在线HKDF派生密钥和校验](https://www.lddgo.net/encrypt/hkdf) | hkdf | 已检查全部注册数组及下列相关核心；HKDF extract/expand 派生/校验及 info 参数；单次 HMAC 不是完整 HKDF。 |
| LDDGO-03-039 · [在线SCrypt派生密钥和校验](https://www.lddgo.net/encrypt/scrypt) | scrypt | 已检查全部注册数组及下列相关核心；SCrypt 派生/校验及 N/r/p 参数；没有相应 KDF 核心。 |
| LDDGO-03-040 · [在线BCrypt派生密钥和校验](https://www.lddgo.net/encrypt/bcrypt) | bcrypt | 已检查全部注册数组及下列相关核心；BCrypt 派生/校验及 cost；没有 bcrypt 算法入口。 |
| LDDGO-03-041 · [在线KMAC计算和验证](https://www.lddgo.net/encrypt/kmac-calculate-verify) | kmac | 已检查全部注册数组及下列相关核心；KMAC128/256 生成/验证和输出位长；HMAC 不等价。 |
| LDDGO-03-042 · [在线数据脱敏](https://www.lddgo.net/encrypt/data-masking) | data-masking | 已检查全部注册数组及下列相关核心；txt/csv/json/excel 数据脱敏批处理与下载；find-and-replace 只做字符串替换，redact-pdf 面向 PDF 栅格涂黑。 |
| LDDGO-03-044 · [在线国密SM4加密解密](https://www.lddgo.net/encrypt/sm4) | sm4 | 已检查全部注册数组及下列相关核心；SM4 对称加解密；无国密 SM4 核心或模式入口。 |
| LDDGO-03-045 · [在线国密SM2加密解密](https://www.lddgo.net/encrypt/sm2-encrypt-decrypt) | sm2-encryption | 已检查全部注册数组及下列相关核心；SM2 公私钥加解密；无 SM2 核心。 |
| LDDGO-03-046 · [在线国密SM2签名和验证](https://www.lddgo.net/encrypt/sm2-sign-verify) | sm2-sign | 已检查全部注册数组及下列相关核心；SM2 签名/验证；JWT 的 RSA/ECDSA 验证不支持 SM2。 |
| LDDGO-03-047 · [在线ChaCha20加密解密](https://www.lddgo.net/encrypt/chacha20-encrypt-decrypt) | chacha20 | 已检查全部注册数组及下列相关核心；ChaCha20/XChaCha20 及 Poly1305 AEAD；无对应密码核心。 |
| LDDGO-03-048 · [在线国密SM9密钥生成](https://www.lddgo.net/encrypt/sm9-key-generator) | sm9-key | 已检查全部注册数组及下列相关核心；SM9 主密钥及用户标识私钥生成；无标识密码核心。 |
| LDDGO-03-049 · [在线国密SM9加密解密](https://www.lddgo.net/encrypt/sm9-encrypt-decrypt) | sm9-encryption | 已检查全部注册数组及下列相关核心；SM9 标识加解密；无对应密码核心。 |
| LDDGO-03-050 · [在线国密SM9签名和验证](https://www.lddgo.net/encrypt/sm9-sign-verify) | sm9-sign | 已检查全部注册数组及下列相关核心；SM9 标识签名/验证；无对应密码核心。 |

### 网络（6 项）

| 同行条目 | 工作流 | 具体缺口 |
| --- | --- | --- |
| LDDGO-04-001 · [WEBSOCKET在线测试](https://www.lddgo.net/network/websocket) | websocket | 已检查全部注册数组及下列相关核心；网络引擎只做 DNS/IP/RDAP HTTP 查询；没有可连接 ws/wss、发送及实时接收文本消息的 WebSocket 客户端。 |
| LDDGO-04-003 · [IP转数字](https://www.lddgo.net/network/ipnumber) | ipv4-integer | 已检查全部注册数组及下列相关核心；ipToInt/intToIp 是内部纯函数，但子网页面仅 CIDR/覆盖范围/展开，未显示 IPv4 无符号整数或提供整数→IP 输入；binary-converter 也不解析点分 IP。 |
| LDDGO-04-008 · [MQTT WebScoket客户端在线测试](https://www.lddgo.net/network/mqtt) | mqtt-client | 已检查全部注册数组及下列相关核心；无 MQTT 连接/主题订阅/publish/消息接收核心；HTTP DNS/IP 查询不建立 MQTT 会话。 |
| LDDGO-04-010 · [在线随机IPv4/IPv6地址生成](https://www.lddgo.net/network/randomip) | random-ip | 已检查全部注册数组及下列相关核心；random-number 输出标量随机数，IPv4 range expander 按序枚举地址；没有指定范围/数量的随机 IPv4 或 IPv6 生成。 |
| LDDGO-04-013 · [常用端口及协议大全](https://www.lddgo.net/network/port) | ports-reference | 已检查全部注册数组及下列相关核心；MIME 和 HTTP 状态表不包含端口号、TCP/UDP、服务名的端口协议资料表。 |
| LDDGO-04-014 · [随机MAC地址生成器](https://www.lddgo.net/network/random-mac) | random-mac | 已检查全部注册数组及下列相关核心；随机 token 可生成 HEX 字符，但无 48/64 bit MAC 地址范围、分隔格式、大小写和批量语义；UUID 也不是 MAC。 |

### 更多（46 项）

| 同行条目 | 工作流 | 具体缺口 |
| --- | --- | --- |
| LDDGO-05-016 · [安全期计算器](https://www.lddgo.net/common/safety) | menstrual-calendar | 注册清单没有安全期、排卵期和月经期日期计算流程。预产期工具只按末次月经与周期估计孕周/预产期，不输出该周期日历；医学来源、适用周期和风险说明均不能从预产期公式推断。 |
| LDDGO-05-018 · [星座月份表](https://www.lddgo.net/common/zodiac) | western-zodiac-table | 注册清单没有十二星座月份/日期查询表；日历转换显示的是农历生肖，不能代替西方星座日期边界。 |
| LDDGO-05-019 · [亲戚称呼计算器](https://www.lddgo.net/common/relation) | kinship-names | 注册计算器与文本工具中没有亲属关系链、双向称谓或按称谓反推关系的引擎；通用文本处理不包含中文亲属称谓规则库。 |
| LDDGO-05-022 · [组合房贷计算器](https://www.lddgo.net/common/portloan) | combined-mortgage | 注册借贷引擎只接受单一本金、利率和期限；没有商业贷与公积金贷双部分的独立参数、联算月供或汇总利息流程。用户分开算再手工相加不计为已实现组合贷。 |
| LDDGO-05-023 · [车牌号查询](https://www.lddgo.net/common/car) | plate-origin-data | 没有车牌省市归属地数据库或车牌查询输入流程；居民身份证解析的行政区字段与车牌编码不是同一编码体系。 |
| LDDGO-05-024 · [手机号码归属地查询](https://www.lddgo.net/common/phone) | phone-number-data | 没有手机号号段、运营商和归属地数据查询；IP 查询接受网络地址并查询 IP 信息，不能代替手机号码数据库或推定号码实时属地。 |
| LDDGO-05-026 · [血型遗传规律表](https://www.lddgo.net/common/blood) | blood-inheritance-table | 没有父母血型到子女血型的遗传规则表或输入流程；BMI/体脂等成人体测公式不涉及血型遗传。需区分 ABO/Rh 模型与医学解释，不能从健康分类文案推导。 |
| LDDGO-05-027 · [在线成语大全](https://www.lddgo.net/common/idiom) | idiom-corpus | 没有成语词典、释义、例句、拼音缩写索引或查询界面；查找替换仅处理用户输入文本，不提供成语数据。 |
| LDDGO-05-028 · [成语接龙](https://www.lddgo.net/common/idiomsolitaire) | idiom-corpus | 没有同字/同音成语接龙规则和词库；随机名字抽取只从用户名单选一项，不检索或验证成语链。 |
| LDDGO-05-029 · [歇后语大全](https://www.lddgo.net/common/xiehouyu) | xiehouyu-corpus | 没有歇后语与答案词库或查询界面；文本查找替换没有内置歇后语数据。 |
| LDDGO-05-030 · [在线闹钟](https://www.lddgo.net/common/alarmclock) | absolute-time-alarm | 现有倒计时按持续时长运行，时区工具仅展示当前时间；没有按目标钟点设置、等待并响铃的闹钟流程。内部提示音函数不构成已注册闹钟。 |
| LDDGO-05-031 · [各国/地区首都、国旗、货币](https://www.lddgo.net/common/world) | world-reference-data | 没有世界国家/地区首都、国旗和货币的联表查询；货币选择器的币种名称与时区城市列表不含国家首都/旗帜参考资料。 |
| LDDGO-05-032 · [在线垃圾分类查询](https://www.lddgo.net/common/rubbish) | waste-classification-data | 没有垃圾物品分类词库、地区分类口径或查询引擎；需可维护且标明城市/地区的数据源，不能用通用文本搜索冒充分类查询。 |
| LDDGO-05-034 · [在线汉字拆字](https://www.lddgo.net/common/chinese-letter) | hanzi-components | 没有左右/上下汉字部件拆分数据库或拆字引擎；Unicode 转换只处理编码表示，不能分解字形结构。 |
| LDDGO-05-035 · [在线快递查询](https://www.lddgo.net/common/express) | shipment-tracking-service | 没有快递单号、承运商选择或物流轨迹查询服务。注册工具不包含所列承运商的授权接口；需要免费公开且可用的客户端来源，不能以虚构轨迹或未经配置的商业接口计为实现。 |
| LDDGO-05-036 · [胸围尺码表](https://www.lddgo.net/common/bra) | bra-size-table | 没有胸围/下胸围输入、罩杯计算或胸围尺码对照表；鞋码引擎基于脚长和鞋码体系，不能代替胸围尺码规则。 |
| LDDGO-05-037 · [放假安排](https://www.lddgo.net/common/holiday) | china-holiday-calendar | 没有历年官方放假与补班/调休安排查询数据。工作日工具仅按用户给定假日排除周末，既不提供官方历年安排，也不把调休周末转换为上班日。 |
| LDDGO-05-039 · [汉字笔画查询](https://www.lddgo.net/common/bi-hua) | hanzi-strokes | 没有汉字笔画数、笔顺数据、逐笔顺序展示或在线笔顺练习；Unicode 码点查询不包含字形笔顺。 |
| LDDGO-05-040 · [百家姓全文带拼音](https://www.lddgo.net/common/surname) | surname-reference-text | 没有带拼音的百家姓全文、姓氏排名/顺序或查询资料；注册文本工具处理输入文本，不提供百家姓参考数据。 |
| LDDGO-05-043 · [电饭煲预约时长计算器](https://www.lddgo.net/common/rice-cooker) | rice-cooker-reservation | 没有吃饭时间、烹煮时长、预约等待时长三者的双向时刻运算流程；通用倒计时只接持续时间，日期计算不计算这些时分关系。 |
| LDDGO-05-044 · [励志句子](https://www.lddgo.net/common/quote) | quote-corpus | 没有励志句子语料及随机展示流程；Lorem ipsum 生成占位文本，不提供正能量/励志语句库。 |
| LDDGO-05-045 · [毒鸡汤](https://www.lddgo.net/common/anti-quote) | anti-quote-corpus | 没有毒鸡汤语料及随机展示流程；Lorem ipsum 生成占位文本，不能代替该语义语料库，更不能声称具备目录所述 2000+ 句。 |
| LDDGO-05-046 · [在线颜文字大全](https://www.lddgo.net/common/emoticons) | kaomoji-catalog | 没有多字符颜文字（kaomoji）分类与复制目录；emoji 面板提供原生 emoji 序列，花体字工具变换字母，均不是颜文字库。 |
| LDDGO-05-047 · [闰年计算器](https://www.lddgo.net/common/leap-year-calculator) | leap-year-enumeration | 日期计算会遵循闰年日历，但没有按年份判断、按区间列出闰年或公元前年份流程；内部日期处理不能等同于已注册的闰年枚举工具。 |
| LDDGO-05-052 · [在线时钟](https://www.lddgo.net/common/clock) | analog-clock-display | 虽有当前时间的文本显示，没有模拟表盘时钟、可设背景和全屏时钟的工具流程；时间戳或时区页面的数字时间不是模拟钟表。 |
| LDDGO-05-054 · [在线时辰时间转换](https://www.lddgo.net/common/chinese-lunar-time) | traditional-time-units | 现有农历工具转换日期，时间单位工具换算秒/分/时等持续量；没有十二时辰或九十六刻与钟点的双向映射，不能把日期历法库当作已暴露的时辰工具。 |
| LDDGO-05-057 · [在线翻页时钟](https://www.lddgo.net/common/digital-clock) | flip-clock-display | 没有翻页数字时钟、背景设置、全屏或计时模式引擎；其他工具中的实时数字文字不能代替翻页时钟交互。 |
| LDDGO-05-060 · [在线盲文翻译器](https://www.lddgo.net/common/braille) | braille-translation | 没有文本↔盲文翻译规则、中文现行/双拼盲文或英语盲文规范选择；Unicode 编码转换只表示字符码点，不执行盲文语言转写。 |
| LDDGO-05-061 · [在线旋转时钟](https://www.lddgo.net/common/rotate-clock) | rotating-clock-display | 没有旋转数字时钟和全屏展示引擎；现有时间显示只输出文本，不能推定动画时钟已实现。 |
| LDDGO-05-063 · [在线色盲色弱测试](https://www.lddgo.net/common/color-blind-test) | color-vision-test | 没有色盲图题库、答题评分或红/绿等色觉类型分级测试。对比度工具计算 WCAG 前景/背景比值，不测试人的色觉；医学测试图来源与用途不可由配色工具推断。 |
| LDDGO-05-064 · [在线反应速度测试](https://www.lddgo.net/common/reaction-time-test) | reaction-time-test | 没有随机视觉/声音刺激、早按判断、刺激到响应的时差测量或结果分享流程；秒表只是用户主动开始/停止，不能代替反应速度测试。 |
| LDDGO-05-065 · [在线随机分组](https://www.lddgo.net/common/random-group) | random-grouping | 没有把整组名单分配成多个组、组数/组大小设置或 TXT/Excel 分组导出；现有转盘每次只抽出一项，不能当成随机分组。 |
| LDDGO-05-067 · [第几天计算器](https://www.lddgo.net/common/day-calculator) | day-week-of-year | 没有日期到当年第几天/第几周，以及第几天/第几周反查日期的输入模式；两日期相差周数不是周编号，年初规则/ISO 周制亦未暴露。 |
| LDDGO-05-068 · [在线外国人永久居留身份证号码生成](https://www.lddgo.net/common/foreign-id-generator) | foreign-permanent-resident-id | 居民身份证样本发生器按 GB 11643 格式，不实现外国人永久居留证的国籍、受理地及专门编码校验规则；不能复用 18 位长度就视为相同号码类型。需官方规范与代码表来源。 |
| LDDGO-05-069 · [在线永居证号码查询](https://www.lddgo.net/common/foreign-identity-query) | foreign-permanent-resident-id | 居民身份证校验仅解析其地区码、生日和顺序号；没有新版永居证受理地、国籍和专用编码的批量解析，长度同为 18 位不足以建立等价。 |
| LDDGO-05-070 · [在线盲文输入](https://www.lddgo.net/common/braille-input) | braille-keyboard | 没有字母/数字键盘的六点/八点盲文点位输入或盲文单元编辑界面；Unicode 转换不提供键位到点位的输入工作流。 |
| LDDGO-05-073 · [在线电子木鱼](https://www.lddgo.net/common/wooden-fish) | wooden-fish-sound | 没有木鱼敲击、自动敲击、音效/颜色设置流程；倒计时归零提示音只是计时器附属行为，不能代替木鱼交互。 |
| LDDGO-05-074 · [在线尺子](https://www.lddgo.net/common/ruler) | onscreen-ruler | 没有屏幕尺、实物校准、厘米/英寸/市尺刻度及颜色设置；单位换算只输出数值，不能测量屏幕上的长度。 |
| LDDGO-05-075 · [在线掷硬币](https://www.lddgo.net/common/flip-coin) | coin-flip | 注册清单没有硬币正反面抛掷流程；通用数字随机或要求用户将正反面作为名单输入的转盘没有硬币状态/结果表达，作为相邻随机能力记录，不计为现成硬币工具。 |
| LDDGO-05-076 · [在线手持弹幕](https://www.lddgo.net/common/danmaku) | handheld-led-text | 没有滚动 LED/手持弹幕显示、速度、渐变、闪烁、背景图等控制；花体字仅转换字符，不播放或渲染上述动态展示。 |
| LDDGO-05-077 · [在线子女身高计算器](https://www.lddgo.net/common/child-height-calculator) | child-height-prediction | 没有父母/儿童参数身高预测、儿童年龄身高标准或生长参考数据；成人理想体重从身高推体重，不是子女身高预测。需要注明适用人群与可靠生长数据，不能用成人公式代替。 |
| LDDGO-05-078 · [在线成语填空](https://www.lddgo.net/common/idiom-fill) | idiom-corpus | 没有按成语任意位置一个/多个汉字匹配的成语数据库；通用查找替换只对用户输入语料运算，不提供成语检索数据。 |
| LDDGO-05-079 · [在线退休年龄计算器](https://www.lddgo.net/common/retirement-age) | china-statutory-retirement | 退休储蓄引擎让用户输入退休年龄，只预测积累余额；没有出生年月、男性/两类女性职工、渐进延迟月数、弹性提前/延后退休规则。需官方实施日期/岗位口径表，不能把财务模拟当政策年龄计算。 |
| LDDGO-05-080 · [在线abc乐谱编辑器](https://www.lddgo.net/common/abc-music-notation) | abc-music-notation | 没有 abc 乐谱解析、五线谱预览、MIDI 或 WAV 合成下载；音频提取从已有视频抽音轨，Markdown 预览解析文档，均不生成乐谱或音乐。 |
| LDDGO-05-081 · [在线胎儿体重计算器](https://www.lddgo.net/common/fetal-weight-calculator) | fetal-weight-estimation | 预产期工具仅计算日期/孕周，不接宫高、腹围、双顶径或股骨长，不含胎儿估重公式与按孕周生长分布表；需要医学公式、参考人群及生长数据来源，不能由孕周结果虚构体重。 |
| LDDGO-05-082 · [在线提词器](https://www.lddgo.net/common/teleprompter) | teleprompter | 没有提词文本播放、字体/背景、速度/时长、镜像与全屏控制流程；现有文本编辑和计时器没有接线形成提词器。 |

### 数学（18 项）

| 同行条目 | 工作流 | 具体缺口 |
| --- | --- | --- |
| LDDGO-07-001 · [在线阶乘计算器](https://www.lddgo.net/math/factorial) | factorial-bigint | 科学计算器支持函数白名单中的标量运算，不含阶乘函数或 ! 运算符；没有任意大小整数阶乘和结果文件导出。安装或底层存在 BigInt 不构成此注册流程。 |
| LDDGO-07-002 · [在线斐波那契数列计算器](https://www.lddgo.net/math/fibonacci) | fibonacci-bigint | 没有斐波那契数列索引/序列生成、超大整数输出或文件下载流程；科学计算器没有 Fibonacci 函数，普通四则计算不构成数列工具。 |
| LDDGO-07-003 · [在线分解质因数工具](https://www.lddgo.net/math/decomposition-prime) | prime-factorization | 没有大整数质因数分解、质因子列表或分解公式；进制转换虽使用 BigInt，只变换表示，科学计算器白名单也没有质因数分解。 |
| LDDGO-07-005 · [在线面积计算器](https://www.lddgo.net/math/area) | geometry-area | 没有按圆/扇形/圆环/三角形等形状接尺寸并套公式计算面积的流程；area-converter 只转换已知面积单位，用户手写公式到科学计算器不算形状计算器。 |
| LDDGO-07-006 · [在线平均数计算器](https://www.lddgo.net/math/avg) | descriptive-statistics | 没有数列输入或算术/几何/平方/调和平均、中位数、众数统计；科学计算器白名单只接标量单参数函数，不含这些聚合函数。 |
| LDDGO-07-007 · [在线方差和标准差计算器](https://www.lddgo.net/math/std-dev) | descriptive-statistics | 没有批量数列的样本/总体方差和标准差；科学计算器函数白名单不含统计聚合，能手工写求和公式不构成该工作流。 |
| LDDGO-07-009 · [在线周长计算器](https://www.lddgo.net/math/perimeter-calculator) | geometry-perimeter | 没有按几何形状输入尺寸、显示周长公式/示意图的流程；通用表达式计算不内置椭圆、扇形或四边形周长模型。 |
| LDDGO-07-010 · [在线TeX/LaTeX数学公式转图片](https://www.lddgo.net/math/latex-to-image) | latex-to-svg | Markdown 引擎使用 marked 解析与 HTML 白名单清理，SVG 转换器接现成 SVG 栅格化；没有 TeX/LaTeX 数学排版到 SVG 和公式图片下载。两者不能拼成已实现的 TeX 渲染能力。 |
| LDDGO-07-011 · [在线数独生成器](https://www.lddgo.net/math/sudoku-generator) | sudoku-generation | 没有数独盘面/解验证、难度生成、交互填数或打印流程；不重复随机整数不能保证数独规则、唯一解或难度。 |
| LDDGO-07-013 · [在线迷宫生成器](https://www.lddgo.net/math/maze-generator) | maze-generation | 没有迷宫图、连通路径/墙体生成、形状与复杂度参数或图片导出；随机数只提供原始数值，不生成迷宫结构。 |
| LDDGO-07-014 · [在线体积计算器](https://www.lddgo.net/math/volume-calculator) | geometry-volume | 没有长方体、圆锥、三角锥等形状的尺寸模型与体积公式输出；volume-converter 只换算已知体积的单位，通用计算器需要用户自行提供公式。 |
| LDDGO-07-016 · [在线舒尔特方格注意力测试](https://www.lddgo.net/math/schulte-table) | schulte-attention-table | 没有 5×5 随机 1–25 方格、按顺序点选注意力训练或方格下载；随机数和秒表没有组合为网格测试，不能推断训练/测量效果。 |
| LDDGO-07-017 · [在线表面积计算器](https://www.lddgo.net/math/surface-area-calculator) | geometry-surface-area | 没有立体几何形状的尺寸、各面面积相加和表面积公式流程；面积单位换算和通用表达式输入不包含数十种立体表面积模型。 |
| LDDGO-07-020 · [最大公约数-最小公倍数计算器](https://www.lddgo.net/math/gcd-lcm-calculator) | gcd-lcm-bigint | 没有一组任意大整数的最大公约数/最小公倍数输入与输出；比例页面只按宽高缩放，BigInt 进制转换也不执行这两个整数算法。 |
| LDDGO-07-021 · [矩阵计算器](https://www.lddgo.net/math/matrix-calculator) | real-complex-matrix | 没有实/复矩阵算术、行列式、逆或转置的计算器。科学计算器只返回 number，CSV 表格编辑器虽能转置文本矩形，但不解析或计算矩阵数值，不能算矩阵代数覆盖。 |
| LDDGO-07-022 · [在线24点计算器](https://www.lddgo.net/common/twenty-four-points-calculator) | twenty-four-game | 没有枚举四个数的算式求 24、无解判断或生成可解题目的流程；通用表达式只能验证用户手写算式，随机数不能保证题目可解。 |
| LDDGO-07-024 · [在线圆周率PI查询](https://www.lddgo.net/math/pi-query) | pi-digit-query | 科学计算器只暴露 Math.PI 常量并以 12 位有效数字显示；没有按位数检索 π、百万位精度或结果文件下载。固定浮点常量不构成高位数查询工具。 |
| LDDGO-07-025 · [在线猜数字](https://www.lddgo.net/common/guess-number) | number-guessing-game | 没有隐藏目标、猜测状态、1A2B 或大小反馈的游戏流程；随机数发生器会直接显示抽取结果，不能当成猜数字游戏。 |

### 坐标（4 项）

| 同行条目 | 工作流 | 具体缺口 |
| --- | --- | --- |
| LDDGO-08-003 · [在线经纬度和度分秒转换](https://www.lddgo.net/convert/degree-convert) | angle-format | DMS/decimal angle parsing and batch serialization are absent; scalar length/time converters have no sign/hemisphere or degree-minute-second grammar. |
| LDDGO-08-008 · [在线坐标轴交换](https://www.lddgo.net/coordinate/swap) | coordinate-axis-swap | CSV column swapping can reorder two columns but cannot apply signed axis permutations to 2D/3D/4D coordinates with coordinate-specific parsing/export. |
| LDDGO-08-012 · [在线直角坐标与极坐标转换](https://www.lddgo.net/coordinate/polar-cartesian-coordinate-convert) | polar-cartesian | Scientific calculator evaluates scalar expressions, without coordinate pair input, atan2 quadrant handling, angle-unit selection or batch rectangular/polar conversion. |
| LDDGO-08-014 · [在线坐标单位转换](https://www.lddgo.net/coordinate/coordinate-unit-converter) | coordinate-units | Length/time scalar unit converters are reachable separately; tuple-aware XY/BL/XYZ/BLH/XYZT/BLHT unit conversion, angular units and coordinate batch files are absent. |

### 图片（18 项）

| 同行条目 | 工作流 | 具体缺口 |
| --- | --- | --- |
| LDDGO-09-010 · [一键智能抠图](https://www.lddgo.net/ai/image/matting) | image-segmentation | Geometric rectangular/circular crop cannot identify people or foreground objects. No segmentation model or mask extraction workflow is reachable in the image registry or pixel cores. |
| LDDGO-09-011 · [在线老照片修复](https://www.lddgo.net/ai/image/old-photo-repair) | photo-restoration | Canvas resize and desaturation do not implement learned restoration, dehazing, denoising, colorization or super-resolution. No restoration inference/model is registered. |
| LDDGO-09-012 · [在线图片清晰度增强](https://www.lddgo.net/ai/image/enhance) | ai-image-enhancement | Canvas resampling and image encoding change dimensions/bytes, not reconstruction of lost image detail. No learned enhancement/denoising texture-recovery pipeline is reachable. |
| LDDGO-09-022 · [在线素描图片生成器](https://www.lddgo.net/image/sketch) | sketch-filter | Grayscale applies grayscale(1), preserving photo luminance. It does not compute edges/pencil shading and therefore is not a sketch filter. |
| LDDGO-09-025 · [在线图片转像素画](https://www.lddgo.net/image/pixel-image) | pixel-art-filter | The canvas resize path uses high-quality smoothing and changes dimensions. It does not implement blocky pixel-art sampling, pixel-cell size controls or pixel-style output. |
| LDDGO-09-026 · [在线图片转油画](https://www.lddgo.net/image/oil-paint) | oil-paint-filter | The inspected engines implement resize/convert/rotation and grayscale only. There is no oil-paint neighborhood/brush filter or intensity parameter. |
| LDDGO-09-027 · [在线图片添加毛玻璃效果](https://www.lddgo.net/image/aero-glass-image) | frosted-glass-filter | Grayscale and text watermark cannot produce frosted-glass distortion/blur effects; no such filter or region/effect parameter exists in registered image engines. |
| LDDGO-09-028 · [在线生成卡通头像](https://www.lddgo.net/image/carton-avatar) | avatar-generation | A system-font label/background generator has no avatar component library, random avatar seed or hair/clothing/expression/skin controls. |
| LDDGO-09-029 · [在线印章生成器](https://www.lddgo.net/image/seal-generate) | organizational-seal | Text watermark places a linear text string on an existing photo. No circular seal geometry, curved typography, company/invoice layouts or standalone seal export is reachable. |
| LDDGO-09-030 · [在线个人印章生成器](https://www.lddgo.net/image/personal-seal-generator) | personal-seal | Text watermark on an existing photo does not generate standalone 2/3/4-character personal seals, seal fonts or character arrangements. |
| LDDGO-09-031 · [在线奖状生成器](https://www.lddgo.net/image/certificate-generate) | certificate-generation | DOCX content export and arbitrary text watermark are adjacent building blocks. Neither includes award/certificate templates, template-image placement or standalone certificate composition. |
| LDDGO-09-032 · [在线字符图生成](https://www.lddgo.net/image/image-ascii-converter) | image-ascii | Fancy-text converts Unicode letter styles; it does not sample image luminance or emit colored/monochrome glyph grids. |
| LDDGO-09-033 · [图片隐藏文本](https://www.lddgo.net/image/image-hide-text) | image-steganography | Visible text watermark is not hidden data encoding. No pixel/metadata steganographic payload encoder/decoder or password protection exists in inspected image workflows. |
| LDDGO-09-034 · [在线条形码扫描](https://www.lddgo.net/image/barcode-scanner) | barcode-scanning | The scanner loads jsqr, which decodes QR matrices; the generator only writes barcodes. Neither decodes EAN/UPC/Code128/39/93/ITF from image batches or exports recognition rows. |
| LDDGO-09-037 · [在线GIF拆分](https://www.lddgo.net/image/gif-splitter) | gif | image-splitter cuts a spatial grid from one still image; it does not split animation frames. |
| LDDGO-09-038 · [在线GIF合并](https://www.lddgo.net/image/gif-merge) | animated-gif-merge | Image merge reads one bitmap per file and encodes a PNG. It has no GIF frame/timing decoder or animation encoder, so sequential/simultaneous animated GIF composition is absent. |
| LDDGO-09-044 · [在线生成 Shield Badge](https://www.lddgo.net/image/shield-badge-generator) | shield-badge | A rectangular single-label placeholder is not a Shield badge renderer with two text regions, badge styles, logo support and badge image export. No badge authoring route is registered. |
| LDDGO-09-045 · [在线修改图片DPI](https://www.lddgo.net/image/modify-dpi) | image-dpi | Pixel resizing is implemented, but does not expose preserving pixels while changing density metadata to a requested DPI. |

### 文件（11 项）

| 同行条目 | 工作流 | 具体缺口 |
| --- | --- | --- |
| LDDGO-10-001 · [在线ZIP文件解压](https://www.lddgo.net/file/unzip) | zip | Internal JSZip packaging of generated results does not provide archive browsing/extraction or malformed-archive handling. |
| LDDGO-10-002 · [在线ZIP压缩](https://www.lddgo.net/file/zip) | zip | Internal ZIP downloads package generated tool outputs; they do not expose arbitrary upload/folders or compression-level controls. |
| LDDGO-10-003 · [在线文本文件拆分](https://www.lddgo.net/file/text-file-split) | file-split | Editing or counting text is not a file partition/download workflow; encoding and multibyte boundaries need explicit policy. |
| LDDGO-10-004 · [在线文件盖章](https://www.lddgo.net/file/stamp) | image-overlays | No uploaded stamp-image overlay workflow for both PDF and images, with stamp rotation/opacity/page ranges. A drawn signature is not arbitrary image upload. |
| LDDGO-10-013 · [在线PDF解密](https://www.lddgo.net/file/decrypt-pdf) | pdf-protection | PdfProtectEngine returns without creating output for both encrypted and unencrypted unlock cases; it cannot remove a password or permissions. |
| LDDGO-10-014 · [在线PDF加密](https://www.lddgo.net/file/encrypt-pdf) | pdf-protection | PDF protection engine only offers unlock detection and form flattening; neither encrypts or sets permissions. |
| LDDGO-10-016 · [在线修改PDF元数据](https://www.lddgo.net/file/modify-pdf-metadata) | pdf-metadata | Image metadata viewing and EXIF removal do not edit a PDF Info/XMP record. |
| LDDGO-10-017 · [在线批量文件重命名](https://www.lddgo.net/file/batch-file-rename) | batch-rename | Tool-generated outputName helpers are not a user rule/regex/sequence rename workflow with ZIP/single downloads. |
| LDDGO-10-020 · [在线数据处理](https://www.lddgo.net/file/data-process) | programmable-file-data | CSV editor only transposes/swaps columns; spreadsheet converters export fixed CSV/XLSX directions. No user-defined JavaScript processing of text/workbook files with text/Excel output is reachable. |
| LDDGO-10-021 · [在线字幕格式转换](https://www.lddgo.net/file/subtitle-format-convert) | subtitles | The workspace may contain other sites; capabilities of another brand are not credited to this site. No LRC/SRT/VTT/ASS/etc conversion is registered here. |
| LDDGO-10-022 · [在线文件编码检测和转换工具](https://www.lddgo.net/file/file-encoding-detect-convert) | file-charset | Base64/text codecs handle UTF-8-style data in existing tools; they do not detect or transcode arbitrary legacy-encoded files. |


## 已有部分，仍需补全

### 字符（23 项）

| 同行条目 | 工作流 | 具体缺口 |
| --- | --- | --- |
| LDDGO-01-005 · [在线随机数生成器](https://www.lddgo.net/string/randomnumber) | random-number | Integer range, quantity, uniqueness and sorting are reachable. Bounds are rounded by clampInt and outputs are integers; the directory also explicitly requires floating-point draws. |
| LDDGO-01-012 · [在线随机密码生成器](https://www.lddgo.net/string/randompassword) | password-generation | Random passwords/tokens and character-class choices are reachable, including excluding a fixed ambiguous set. The peer declares arbitrary include/exclude character rules; local pools are fixed, with 8–64 password and 8–128 token lengths. |
| LDDGO-01-013 · [在线JSON格式化-JSON解析](https://www.lddgo.net/string/json) | json-core | No file-open or URL-import UI in DevCodeEngine; the peer directory also promises JSON escaping. Lossless local formatting does not imply complete workflow parity. |
| LDDGO-01-014 · [在线序列号生成器](https://www.lddgo.net/string/seqno) | sequence-template | 本轮补精确有限小数起点/步长、数量、整数位补零与字面前后缀/分隔符；详情页的表达式、随机模板函数和2–36进制序列仍未支持。 |
| LDDGO-01-015 · [SQL格式化压缩](https://www.lddgo.net/string/sql) | sql | Engine fixes the formatter options; no exposed dialect selection or SQL minification route/control. |
| LDDGO-01-016 · [在线JSONPath解析器](https://www.lddgo.net/string/jsonpath) | jsonpath | jsonQuery tokenizes dot/bracket paths; no wildcard, recursive descent, slices or filter expression evaluator is implemented. |
| LDDGO-01-026 · [在线文本筛选工具](https://www.lddgo.net/string/text-filter) | text-filter | 本轮完成字面包含/排除、行范围、码点长度和分隔列提取；正则筛选和正则列提取仍未支持。 |
| LDDGO-01-028 · [在线文本去重工具](https://www.lddgo.net/string/duplicate-remove) | text-dedupe | No consecutive-only dedupe mode and no user-defined line separator in dedupeLines. |
| LDDGO-01-029 · [在线Markdown编辑器](https://www.lddgo.net/string/markdown-editor) | markdown | No Markdown/HTML file download or PDF export in the preview engine. Peer CommonMark/GFM conformance is unverified. |
| LDDGO-01-031 · [随机HEX字符串生成](https://www.lddgo.net/string/random-hex) | random-hex | Hex alphabet token generation is reachable. The UI caps length at 128 and copies text; arbitrary-length HEX and binary BIN/text-file export are absent. |
| LDDGO-01-034 · [在线YAML编辑器](https://www.lddgo.net/string/yaml) | yaml | The registered route fixes mode=json2yaml; arbitrary YAML editing/validation and YAML download are not provided by this route. An unused yaml2json engine branch is not a registered workflow. |
| LDDGO-01-035 · [CSS格式化、压缩](https://www.lddgo.net/string/css-beautify-minify) | css | No CSS beautifier/formatter is registered; peer also declares formatting. Full CSS parser equivalence is unverified. |
| LDDGO-01-036 · [JS格式化、压缩](https://www.lddgo.net/string/js-beautify-minify) | javascript | No JavaScript beautifier/formatter is registered. This is not a bundled optimizing JS compiler/minifier. |
| LDDGO-01-043 · [在线JSON视图查看](https://www.lddgo.net/string/json-viewer) | historical-exact-slug | Core tree viewing is present locally with typed values, expand/collapse and formatted-source copy. The peer page exposes file open/download and a compress action; those workflows are not present in the local engine. |
| LDDGO-01-052 · [在线多行文本连接成一行](https://www.lddgo.net/string/line-reduce) | line-join | Regex find/replace can join newline matches using a chosen replacement. There is no dedicated join workflow with independent trim/keep-empty controls or result download; whitespace cleaners preserve line separators. |
| LDDGO-01-061 · [在线乱数假文生成器](https://www.lddgo.net/string/lorem-ipsum) | lorem-generation | Paragraph-count generation and copy are reachable, but source wordbank is Latin lorem only. Simplified/traditional Chinese, sentence/word-count controls and download declared by the peer are absent. |
| LDDGO-01-062 · [在线字符频率统计](https://www.lddgo.net/string/frequency-statistics) | character-word-frequency | 本轮新增通用Unicode码点频率与完整CSV/TXT导出，支持整段小写及去空白；分母明确为保留的变换后码点。仍未复现同行汉字/字母/单词/数字分类表及专用分母。 |
| LDDGO-01-065 · [在线JSON转Excel](https://www.lddgo.net/string/json-to-excel) | json-excel | JSON object arrays can become CSV, which can be manually passed to csv-to-excel for XLSX export. There is no direct JSON-file/open-to-XLSX workflow; JSON-to-CSV engine only accepts pasted text and copy, with bounded and documented table semantics. |
| LDDGO-01-066 · [在线Excel转JSON](https://www.lddgo.net/string/excel-to-json) | excel-json | Excel-to-CSV plus CSV-to-JSON provides a manual chain for one selected sheet. Direct workbook/CSV-file import to JSON and JSON download are absent. The CSV overlay explicitly documents conservative type inference and rejects duplicate headers/ragged rows. |
| LDDGO-01-082 · [在线ULID生成器](https://www.lddgo.net/string/ulid-generator) | historical-exact-slug | Both generate ULIDs locally and expose batch output. The local tool uses crypto.getRandomValues, shows decoded timestamps and caps quantity at 100; the peer page exposes seed-time, monotonic and join-format controls plus download. Those option semantics are not equivalent. |
| LDDGO-01-083 · [在线键盘按键信息](https://www.lddgo.net/string/web-keyboardevent-info) | keyboard-events | Real key/code/keyCode/modifier events and history are shown. KeyRecord omits location and there is no searchable key-reference table, both explicitly present in the directory scope. |
| LDDGO-01-084 · [在线JSON比较](https://www.lddgo.net/string/json-diff) | historical-exact-slug | Both compare two JSON documents and report path-level changes. The local engine returns added/removed/changed entries and has a local copy action; the peer page additionally exposes per-side file open controls and an example/return workflow. |
| LDDGO-01-089 · [在线字符串转义](https://www.lddgo.net/string/escape) | multi-language-string-escape | HTML escape/unescape, including numeric entities, is reachable. JSON/Java/JavaScript/XML/CSV rules and arbitrary custom bidirectional string escaping are not exposed; formatting a full JSON/CSV document is a different grammar. |

### 转换（17 项）

| 同行条目 | 工作流 | 具体缺口 |
| --- | --- | --- |
| LDDGO-02-002 · [字符串转Base64](https://www.lddgo.net/convert/stringbasesix) | base64-text | 文本 Base64 双向可达，但编码与解码固定 UTF-8，没有目录声明的可选字符集。 |
| LDDGO-02-007 · [HTML颜色拾取器](https://www.lddgo.net/convert/colorpicker) | css-color | 选择颜色并输出 RGB/HEX/HSL 可达；本地 RGB 结构不保留 alpha，没有透明度控件或常见 HTML 命名颜色对照表。 |
| LDDGO-02-009 · [进制转换器](https://www.lddgo.net/convert/baseconverter) | numeric-base | 2–36（本地延伸到 64）整数进制互转可达；BigInt 核心拒绝小数，因此目录的浮点数转换未覆盖。 |
| LDDGO-02-013 · [字符串转Base32](https://www.lddgo.net/convert/stringbase32) | base32-text | 本轮提供严格RFC4648 Base32与UTF-8/HEX/Base64/文件原始字节互转，保留原始换行；其他字符集与显式LF/CRLF归一化选项仍未支持。 |
| LDDGO-02-015 · [字符串二进制转换](https://www.lddgo.net/convert/string-binary) | binary-text | UTF-8 文本↔二进制字节可达；没有目录可选字符集。 |
| LDDGO-02-016 · [CSS颜色转换](https://www.lddgo.net/convert/css-color) | css-color | HEX/RGB/HSL 双向转换可达；parseAny 仅三种解析器，不提供 HSV/HWB，alpha 也未保留。 |
| LDDGO-02-020 · [在线字符串转Unicode](https://www.lddgo.net/convert/string-unicode) | unicode-text | 字符串与多种 Unicode 表示双向可达并按码点处理非 BMP；没有“保留 ASCII”开关（只保留特定空格）。 |
| LDDGO-02-021 · [文字加密解密](https://www.lddgo.net/convert/string-encode) | text-codec-suite | Base64、URL、HTML 实体及 MD5 任务分散可达；缺任意文本 HEX 编解码。MD5 本身不可逆，不把目录“解密”泛称当作可逆承诺。 |
| LDDGO-02-022 · [在线Base64转图片](https://www.lddgo.net/convert/base64-to-image) | base64-image | data URL→图片可达，但本地 parseDataUrl 强制 data: MIME 头，裸 Base64 不能直接按图片识别预览/下载；通用解码器仅下载字节不能算完整图片流程。 |
| LDDGO-02-023 · [在线数字处理](https://www.lddgo.net/convert/number-process) | number-format | 只覆盖人民币数字转财务大写；没有数字组的千分位/科学计数法/英文数词处理或批量输入。 |
| LDDGO-02-026 · [在线XML和JSON互相转换](https://www.lddgo.net/convert/xml-json) | xml-json | 两方向数据转换可达，JSON→XML 有下载；XML→JSON 引擎仅 CopyButton，缺目录声明的转换结果本地下载；不主张两者任意结构无损互逆。 |
| LDDGO-02-028 · [二进制格式转换](https://www.lddgo.net/convert/binary-format-converter) | binary-format | 仅覆盖 raw 文件↔Base64；没有统一 HEX、hex-prefix、binary、Base64、raw 任意两格式互转。CRC HEX 解析不是转换输出。 |
| LDDGO-02-031 · [在线时间格式转换](https://www.lddgo.net/convert/datetime-format-converter) | datetime-format | 单一日期与 Unix 秒/毫秒、UTC 展示可达；没有 RFC/Excel 日期序号等格式集合或批量输入输出。 |
| LDDGO-02-032 · [在线批量单位换算](https://www.lddgo.net/convert/batch-unit-converter) | physical-unit-batch | 单位计算核心覆盖各类，但共享引擎仅一个 amount 输入，没有数据列表导入或批量结果输出。 |
| LDDGO-02-034 · [在线时间类型转换](https://www.lddgo.net/convert/date-time-type-converter) | time-scales | UTC/本地日期与 Unix 互转可达；没有 TAI/GPS/北斗时标及闰秒偏移表，也无批量下载。timezone-converter 的民用时区不是这些时标。 |
| LDDGO-02-036 · [在线中文大写数字转换阿拉伯数字](https://www.lddgo.net/convert/chinese-number-to-arabic-number) | chinese-number | 财务人民币“元角分”大写子集可转数字并下载；核心要求元且只接受财务数字，不能覆盖目录普通中文数字（一二三）和一般大写数词。 |
| LDDGO-02-038 · [在线BaseN编码解码](https://www.lddgo.net/convert/basen-encode-decode) | basen-data | 标准 Base64 字符串/文件仅覆盖目录算法集合的一支；整数 base2–64 不等于字节编码，无 Base32/58/85/91/100 或自定义字节算法界面。 |

### 加密（7 项）

| 同行条目 | 工作流 | 具体缺口 |
| --- | --- | --- |
| LDDGO-03-002 · [MD5加密](https://www.lddgo.net/encrypt/md5) | hash-digest | MD5 HEX/Base64 输出和文本/文件可达；文本固定 UTF-8，缺目录可选字符集。 |
| LDDGO-03-003 · [文件HASH计算](https://www.lddgo.net/encrypt/filehash) | hash-file | 文件 MD5/SHA1/SHA256/SHA512 可达；注册算法列表缺 SHA3-256/SHA3-512。 |
| LDDGO-03-005 · [CRC在线计算](https://www.lddgo.net/encrypt/crc) | crc | 只实现固定 CRC-16/Modbus 与 HEX 输入；缺 CRC8/32/64、其他 CRC16 多项式/初值/反转参数。 |
| LDDGO-03-012 · [在线HMAC计算工具](https://www.lddgo.net/encrypt/hmac) | hmac | HMAC-SHA1/256/384/512 可达；缺目录 MD5/SHA224/SHA3 分支。 |
| LDDGO-03-016 · [在线哈希值计算](https://www.lddgo.net/encrypt/hash) | hash-digest | 文本/文件及 HEX/Base64 输出可达；缺 MD2/MD4/SHA3 族，且 HEX/Base64 输入不能作为原始字节选择，文本固定 UTF-8。 |
| LDDGO-03-023 · [在线 HTTP Basic Authentication 加密解密](https://www.lddgo.net/encrypt/basic-auth) | http-basic | 已注册 base64-encoder 页面提供用户名/密码输入并生成 UTF-8 Authorization: Basic 请求头；反向 Basic 请求头解析和用户名/密码字段拆分仍缺失，通用 Base64 解码需手工去头且不拆字段。 |
| LDDGO-03-043 · [在线OTP密码生成器](https://www.lddgo.net/encrypt/otp-code-generate) | otp | TOTP 与 secret/otpauth 导出可达；HOTP 仅内部函数供 TOTP 调用，没有用户计数器/HOTP 生成模式。 |

### 网络（6 项）

| 同行条目 | 工作流 | 具体缺口 |
| --- | --- | --- |
| LDDGO-04-002 · [我的公网IP](https://www.lddgo.net/network/getmyip) | public-ip | “查我自己的 IP”按钮可调用外部 IP 服务；没有目录另声明的本站公共 IP API 端点。第三方依赖和额度见工具最终 copy。 |
| LDDGO-04-005 · [User-Agent在线分析](https://www.lddgo.net/network/useragent) | user-agent | 浏览器/引擎/OS/版本/设备类型解析可达；结果类型无 CPU 架构、语言、插件字段，不覆盖目录宣称全部字段。 |
| LDDGO-04-015 · [IPv4/IPv6 CIDR 地址计算器](https://www.lddgo.net/network/cidr) | cidr | IPv4 CIDR 网络/广播/掩码/主机数可达；parseCidr 强制点分 IPv4 和 /0–32，不支持 IPv6。 |
| LDDGO-04-016 · [在线Punycode编码解码](https://www.lddgo.net/network/punycode) | punycode | URL parser 对裸 IDN 或 URL 的 host 显示 WHATWG 标准化的 ASCII/Punycode，已可达 IDN→Punycode 一向；没有 Punycode→国际化域名反向解码，也非独立完整编解码工作台。 |
| LDDGO-04-017 · [IPv6地址压缩和展开](https://www.lddgo.net/network/ipv6-compress-expand) | ipv6-normalize | URL parser 接受方括号内 IPv6，并在可见 host 字段显示压缩形式，已可达 IPv6 压缩一向；没有展开至完整八组的反向操作。需保留 URL host 的方括号输入/输出语法。 |
| LDDGO-04-018 · [在线CIDR聚合](https://www.lddgo.net/network/cidr-aggregate) | cidr-aggregate | 最小覆盖 CIDR 可对两个 IPv4 端点计算；没有多 IP/多个子 CIDR 列表聚合和 IPv6。 |

### 更多（24 项）

| 同行条目 | 工作流 | 具体缺口 |
| --- | --- | --- |
| LDDGO-05-007 · [实时汇率查询](https://www.lddgo.net/common/exchangerate) | currency-rates | 已注册工具显示所选货币对的汇率和数据更新时间；汇率来自 open.er-api.com，按设备缓存一小时，失败时可显示标明日期的缓存。不能把此刷新与缓存机制宣称为逐笔或持续实时行情。 |
| LDDGO-05-009 · [身份证号码查询](https://www.lddgo.net/common/identity) | chinese-resident-id | 可校验号码并解析出生日期、性别、年龄、省级名称和原始六位行政区码；明确没有现行/历史市县数据库，也不查询实际发证或身份记录，不能声称完整发证地查询。 |
| LDDGO-05-010 · [Cron表达式计算](https://www.lddgo.net/common/cron) | cron-schedule | 可解析五/六段表达式、解释字段并计算接下来五次执行时间；不支持 Quartz 的 L/W/# 扩展，没有 Linux/Cron4j/Quartz/Spring 四种语义引擎选择。 |
| LDDGO-05-011 · [随机身份证号码生成](https://www.lddgo.net/common/idgenerator) | chinese-resident-id | 可批量生成带校验位的测试样本，但按用户地区码、生日和起始顺序号确定性枚举；不是随机省市区/生日抽样，也没有市县数据查询。样本不是已签发身份，不可用假行政区数据补齐。 |
| LDDGO-05-012 · [日期计算器](https://www.lddgo.net/common/date) | calendar-arithmetic | 已实现两日期相差年/月/日、总天数和周数，以及日期加减天数；加减模式只有天数，不能直接加减指定月数、年数。 |
| LDDGO-05-014 · [在线秒表计时器](https://www.lddgo.net/common/stopwatch) | historical-exact-slug | Core stopwatch and lap timing are present locally, with requestAnimationFrame display anchored to Date.now and explicit start/pause/resume/lap/reset states. The peer page exposes lap download; the local tool has no matching export control. |
| LDDGO-05-017 · [年龄计算器](https://www.lddgo.net/common/age) | age-and-zodiac | 可计算周岁年月日和下个生日；年龄界面没有虚岁或星座。日历转换可显示某日生肖，但没有把年龄、虚岁、生肖和星座合并为此查询流程。 |
| LDDGO-05-020 · [房贷计算器](https://www.lddgo.net/common/houseloan) | mortgage-repayment | 可按房价/首付或本金、手填年利率与期限算固定等额本息月供、总利息和还款表；没有等额本金模式，不含中国商业房贷实时/政策利率或当地资格判断。 |
| LDDGO-05-021 · [公积金贷款计算器](https://www.lddgo.net/common/profund) | mortgage-repayment | 公积金利率作为手填固定利率时，可复用等额本息月供与总利息计算；没有公积金产品/政策数据、贷款额度资格规则或等额本金模式，不能宣称完整公积金房贷计算器。 |
| LDDGO-05-033 · [保质期计算器](https://www.lddgo.net/common/shelf-life) | shelf-life-date | 日期加天数可完成以天计的生产日到期日计算；没有保质期单位选择、按月/年规则、显式过期状态或商品/食品/药品的储存条件语义。日期运算结果不等于可食用/可用判断。 |
| LDDGO-05-038 · [在线特殊符号大全](https://www.lddgo.net/common/symbol) | symbol-catalog | Emoji 选择器包含可复制的符号分组（算术符号、部分箭头/商标等）；缺通用数学、数字上下标、希腊字母和标点等完整特殊字符分类，不能把 677 个精选 emoji 当作全符号库。 |
| LDDGO-05-041 · [在线英文日期格式化](https://www.lddgo.net/common/date-format) | english-date-format | 日期计算结果通过 Intl.DateTimeFormat 显示英文长日期（英文映射为 en-US）；没有独立美式/英式风格选择、ordinal/短长格式切换，不能据此认定双制英文日期格式化齐全。 |
| LDDGO-05-042 · [在线油耗计算器](https://www.lddgo.net/common/fuel-calculator) | fuel-consumption | 可按已知距离、L/100km 或 US mpg 和油价计算燃油量、总费用及单位里程花费；油耗是输入值，没有按实际加油量/行驶距离反算百公里或单位里程油耗的模式。 |
| LDDGO-05-048 · [在线体脂率计算器](https://www.lddgo.net/common/bfp) | body-fat-estimation | 已实现 US Navy 围度估算（身高、腰围、颈围及女性臀围）；没有 BMI 推算体脂模式。公式与分类只用于估计，不能推定为医学诊断或认定目录的多公式选择已经覆盖。 |
| LDDGO-05-049 · [在线生肖查询](https://www.lddgo.net/common/chinse-zodiac) | chinese-zodiac-lookup | 可通过输入公历日期得到按农历新年换年的生肖；没有按年龄查生肖、按生肖反查年龄或生肖年份表。仅按公历年份相差 12 年推导会忽略春节边界，不能当作已实现的逆查。 |
| LDDGO-05-050 · [身高体重计算器](https://www.lddgo.net/common/height-weight-calculator) | healthy-weight-range | 身高工具显示 WHO BMI 18.5–24.9 对应体重区间及 Devine 参考值；没有中国/WHO 标准切换，也不列完整偏瘦/肥胖体重区间。成人身高有效范围与筛查性质须保留。 |
| LDDGO-05-051 · [世界时间查询](https://www.lddgo.net/common/world-time) | world-time | 可比较 21 个城市当前时间、UTC 偏移和今天逐小时对照；没有任意选择日期/时刻或完整世界时区输入，不能把当前日表当作任意历史/未来时刻换算。 |
| LDDGO-05-053 · [在线倒数日](https://www.lddgo.net/common/countdown-days) | date-countdown-share | 两日期差可计算到指定日期的天数；没有持续更新的事件倒数日卡片和把倒数日状态编码成可恢复/可分享二维码的流程。通用二维码接文本/网址，不与倒数日状态接线。 |
| LDDGO-05-056 · [工作日计算器](https://www.lddgo.net/common/workday) | china-workday-calendar | 可在固定周末模式和用户假日列表下计算/增加工作日；没有中国法定节假日内置表，且 isWorkday 永远排除周末，无法表达被调休为工作日的周六/周日。 |
| LDDGO-05-058 · [在线手写签名](https://www.lddgo.net/common/signature) | handwritten-signature | PDF 签名工具提供鼠标/触控手写并将透明 PNG 墨迹嵌入 PDF；没有独立 PNG/JPEG/SVG 签名下载、线条颜色/粗细选择，最终产物要求提供 PDF。内部 PNG 中间值不等于可下载图片能力。 |
| LDDGO-05-059 · [在线抽奖转盘](https://www.lddgo.net/common/turntable) | weighted-prize-wheel | 转盘可录入候选项、随机抽取、移除中奖者并展示历史；所有候选项等概率，没有显式权重字段或结果文件下载，不能把重复文本当成完整权重设置。 |
| LDDGO-05-062 · [提前还贷计算器](https://www.lddgo.net/common/loan-prepayment-calculator) | loan-prepayment | 可模拟固定等额本息贷款从起始每月额外还款，显示节省利息和缩短月数；没有任意已还期数/一次性提前还贷/减月供与缩期限选择，也没有等额本金提前还贷对比。 |
| LDDGO-05-071 · [在线基础代谢率(BMR)计算器](https://www.lddgo.net/common/bmr-calculator) | historical-exact-slug | The local route calculates Mifflin-St Jeor BMR with metric/imperial input and a documented formula note. The peer route offers four formula choices, an optional body-fat field and kcal/kJ output plus share/clear controls; local formula selection and sharing are absent. |
| LDDGO-05-072 · [在线随机点名](https://www.lddgo.net/common/random-roll) | random-roll-call | 可从名单单次随机抽取，允许保留中奖者重复抽取或抽后移除；缺名单分组、一次抽多个结果的参数。上限 100 行也应保留，不能把逐次手动抽取算批量点名。 |

### 数学（9 项）

| 同行条目 | 工作流 | 具体缺口 |
| --- | --- | --- |
| LDDGO-07-004 · [在线分数计算器](https://www.lddgo.net/math/fraction) | rational-fractions | 表达式能输入 1/2+1/3 等商并得到浮点结果；没有精确分子/分母表示、约分、分数输出或小数转分数。标量除法不等于完整有理数运算，结果默认 12 位有效数字。 |
| LDDGO-07-008 · [在线次方和开方计算器](https://www.lddgo.net/math/square-power-root) | powers-and-roots | 表达式支持实数幂和 sqrt，亦可输入 x^(1/n) 得某些实数根；没有列出任意次开方的全部复数根，负数非整数幂受 JavaScript Math 的实数域限制。 |
| LDDGO-07-012 · [在线对数计算器](https://www.lddgo.net/math/logarithm-calculator) | logarithms | 支持 log10、自然对数，也可手填换底表达式 log(x)/log(b)；没有专门任意底输入面板或对数函数图表。单个数值结果不覆盖目录声明的底数对应图形。 |
| LDDGO-07-015 · [在线比例计算器](https://www.lddgo.net/math/proportional-calculator) | proportion-fourth-term | 比例宽/高加一个新尺寸可以算出等比例另一尺寸，覆盖正比例第四项的一部分；比例两项必须为正，界面以宽高/缩放为模型，没有通用四位置未知数选择或全部有符号/零值比例情形。 |
| LDDGO-07-018 · [在线绩点(GPA)计算器](https://www.lddgo.net/math/gpa-calculator) | historical-exact-slug | Both accept course rows and credits and calculate GPA. The local route supports letter grades, 4.0/5.0 scale, cumulative transcript blending, sample and clear; the peer route accepts 100-point, 5-point and grade inputs and has a weighted switch. Input conversion rules are therefore only partially comparable. |
| LDDGO-07-019 · [在线百分比计算器](https://www.lddgo.net/math/percentage-calculator) | historical-exact-slug | The local route covers three live modes: X% of Y, X as a percentage of Y, and percentage change with increase/decrease direction. The peer markup exposes several grouped input/result pairs, so its exact mode set is broader or differently organized; the two surfaces are not proven equivalent. |
| LDDGO-07-023 · [在线计算器](https://www.lddgo.net/math/calculator) | general-expression-calculator | 已注册输入表达式与实数四则、幂根、对数/三角函数；采用 JavaScript number 和固定 12 位有效数字，没有大整数/高精度小数/复数/矩阵、概率、关系或统计函数集。 |
| LDDGO-07-026 · [在线数字排序](https://www.lddgo.net/math/number-sort) | arbitrary-precision-number-sort | 已有按行数值排序和复制，但 numeric 模式用 parseFloat 相减，超大整数或高精度小数会失真；只按行输入，无目录声明的数字提取/多输入方式，也没有按数值降序专用模式。 |
| LDDGO-07-027 · [在线三角函数计算器](https://www.lddgo.net/math/trigonometric-calculator) | trigonometric-functions | 支持 sin/cos/tan 与 asin/acos/atan，DEG/RAD 可切换（反函数可由键盘输入）；结果固定 12 位有效数字，没有用户精度设置。没有开展同输入或极点/数值稳定性比较。 |

### 图片（18 项）

| 同行条目 | 工作流 | 具体缺口 |
| --- | --- | --- |
| LDDGO-09-001 · [在线SVG编辑器](https://www.lddgo.net/modernsvg/indexzh.html) | svg-editor | SVG files can be opened/rasterized to PNG. There is no graphical shape/style editor, SVG object manipulation or edited-SVG export. This first-party web application is comparable by capability, but converter-only coverage is partial. |
| LDDGO-09-002 · [在线图片编辑器](https://www.lddgo.net/modernimg/zh/index.html) | image-editor | Registered tools cover crop/flip/rotation/size/grayscale/text watermark as separate pages. There is no unified editing canvas, drawing/shapes, layer composition or general effect stack; directory breadth is insufficient for full editor parity. |
| LDDGO-09-003 · [在线图片压缩工具](https://www.lddgo.net/image/compress) | image-compress | Compression and resizing are separate; local output is PNG/JPEG/WebP/optional AVIF, not the peer format list. Animation is lost and smaller output is not guaranteed. |
| LDDGO-09-004 · [在线二维码扫描器](https://www.lddgo.net/image/qrcodescanner) | qr-scanning | Image upload and live-camera QR decoding are reachable using jsqr. Opening a remote QR-image URL declared by the peer is absent; browser-decodable local formats and camera permissions remain runtime boundaries. |
| LDDGO-09-005 · [二维码生成器](https://www.lddgo.net/image/qrcodeweb) | qr-generation | Text/URL QR generation, colors/ECC/logo and PNG/SVG downloads are reachable. There is no custom caption below the QR code, explicitly named by the peer; peer logo/output parity was not tested. |
| LDDGO-09-006 · [条形码生成器](https://www.lddgo.net/image/barcode) | barcode-generation | Local UI exposes CODE128, EAN13 and UPC and SVG export. The directory also requires CODE39, ITF, MSI and other types; JsBarcode dependency support is not equivalent to a reachable UI mode. |
| LDDGO-09-008 · [在线图片文字识别(OCR)](https://www.lddgo.net/ai/image/ocr) | image-ocr | Local language picker has eng/chi_sim/jpn/spa/por/fra/deu; no chi_tra/ara/rus/hin. Images are downscaled to a 2400px long edge and model downloads require network. Peer accuracy is unverified. |
| LDDGO-09-013 · [在线图片格式转换](https://www.lddgo.net/convert/image-format) | image-convert | No GIF encoder, SVG vector-output conversion or animation preservation. Accept=image/* is not proof of input decoding coverage. |
| LDDGO-09-016 · [在线九宫格图片裁剪](https://www.lddgo.net/image/crop-image) | historical-exact-slug | The local crop route supports free and fixed aspect-ratio crops, numeric coordinates and applying a selection to multiple files. The peer route explicitly supports grid/row-column splitting and a width-height mode; local grid splitting is a separate image-splitter route, so the exact route is only partial. |
| LDDGO-09-018 · [在线文字生成图片](https://www.lddgo.net/image/text-to-image) | text-image-render | The placeholder tool renders a user label with foreground/background colors and SVG/PNG/JPG downloads. It has single centered SVG text with automatic font size; multiline layout, user font-size controls and WebP output are absent. |
| LDDGO-09-039 · [在线SVG转PNG&JPEG&WEBP](https://www.lddgo.net/image/svg-format-converter) | image-convert | The dedicated svg-converter engine hardcodes PNG. Generic convert-image provides JPEG/WebP/quality for browser-decodable SVG but no resize control, so the declared batch scale-plus-format-plus-quality workflow requires separate steps and is not proven equivalent. |
| LDDGO-09-040 · [在线纯色背景图制作](https://www.lddgo.net/image/background-image-maker) | background-image | The placeholder produces a solid colored SVG/PNG/JPG with a label; blank text is replaced by dimensions. Gradient generator returns CSS, not a downloadable background image. Label-free/gradient image generation and WebP are absent. |
| LDDGO-09-041 · [在线图片查看器](https://www.lddgo.net/image/image-viewer) | image-viewing | Local image previews and rotate/flip processing are reachable. There is no dedicated viewer with pan/continuous zoom and animated-GIF preservation; Lightbox fits images to the viewport and only exposes close behavior. |
| LDDGO-09-042 · [在线批量图片旋转](https://www.lddgo.net/image/batch-image-rotate) | image-rotate | The peer directory explicitly promises arbitrary angles; local integer rot is applied in multiples of 90 degrees. |
| LDDGO-09-043 · [在线图片元数据查看和移除](https://www.lddgo.net/image/image-metadata) | image-metadata | Viewer only calls parseExif for JPEG plus parsePngHeader; broad IPTC/XMP/JFIF multi-format inspection is not established. Remover is canvas re-encoding, not lossless selective metadata removal. |
| LDDGO-09-046 · [在线透明背景图片添加背景色](https://www.lddgo.net/image/add-background-color) | transparent-background-fill | The conversion canvas fills transparent images white for opaque JPEG output, so fixed-white flattening is reachable. There is no arbitrary user background-color control for each source image; merge-images background affects a multi-image composition and requires at least two inputs. |
| LDDGO-09-048 · [在线批量图片添加滤镜](https://www.lddgo.net/image/add-filters-to-image) | image-filters | Peer directory also declares black/white, inversion, noise and mosaic filters; those filters are not available in the local grayscale engine. |
| LDDGO-09-049 · [在线简易图片编辑器](https://www.lddgo.net/image/simple-image-editor) | image-editor | Separate tools cover crop, flip, rotation, dimensions, text watermark and grayscale. No freehand drawing, icon/shape insertion, masks, layer history or unified effect editor is reachable; independent routes are only partial composition of the declared workflow. |

### 文件（5 项）

| 同行条目 | 工作流 | 具体缺口 |
| --- | --- | --- |
| LDDGO-10-008 · [在线图片转PDF](https://www.lddgo.net/file/image-to-pdf) | historical-exact-slug | Both accept multiple images and expose page size, orientation, margin and ordering. The peer page has an explicit single-versus-multiple-PDF output mode; the local engine emits one PDF for the selected image list and does not expose that split-output mode. |
| LDDGO-10-009 · [在线PDF添加页码](https://www.lddgo.net/file/pdf-add-page-number) | pdf-numbers | Local font is fixed Helvetica, size 11 and gray color; peer declares font and color configuration. |
| LDDGO-10-011 · [在线PDF压缩](https://www.lddgo.net/file/compress-pdf) | historical-exact-slug | Both expose local PDF compression with downloadable output. The peer uses named compression presets; the local route exposes DPI, JPEG quality and grayscale, and explicitly rasterizes pages before rebuilding the PDF. The parameter models and preservation guarantees differ. |
| LDDGO-10-012 · [在线PDF添加水印](https://www.lddgo.net/file/pdf-add-watermark) | image-overlays | No uploaded image watermark; font is fixed HelveticaBold, and angles are fixed by layout rather than freely configured. |
| LDDGO-10-023 · [在线文件类型检测](https://www.lddgo.net/file/file-type-detect) | file-identification | 本轮提供明确签名表的有限头部匹配；不覆盖所有文件格式、不验证完整文件、不解析容器子格式。 |


## 先补标准或需求来源

### 字符（1 项）

| 同行条目 | 工作流 | 具体缺口 |
| --- | --- | --- |
| LDDGO-01-042 · [在线文字反转工具](https://www.lddgo.net/string/text-reverse) | text-reverse | Peer directory says sentence-level front/back reversal and line up/down reversal; its exact sentence segmentation and preservation of newline order need detail/runtime evidence. |

### 更多（1 项）

| 同行条目 | 工作流 | 具体缺口 |
| --- | --- | --- |
| LDDGO-05-055 · [股票版时间计算器](https://www.lddgo.net/common/stock-time) | stock-time-sequences | 官方目录仅说明“股票相关的特殊的时间序列”，未说明输入、交易市场、时区、交易日历或序列公式；可确认本地只有通用日期/工作日流程，但不足以判断该专门股票序列与哪种能力等价，需详情控件或算法来源。 |

### 图表（16 项）

| 同行条目 | 工作流 | 具体缺口 |
| --- | --- | --- |
| LDDGO-06-001 · [在线制作标准折线图](https://www.lddgo.net/chart/line-chart) | chart-authoring-1 | Inspected registry has no user-authored chart editor. calc-charts renders fixed calculator-result donut/balance SVGs, not arbitrary datasets or Excel upload/export. Before declaring implementation-ready parity, obtain independent/detail evidence for line-series data model and axis/export options; directory text alone does not settle those semantics. |
| LDDGO-06-002 · [在线制作标准饼图](https://www.lddgo.net/chart/pie-chart) | chart-authoring-2 | Inspected registry has no user-authored chart editor. calc-charts renders fixed calculator-result donut/balance SVGs, not arbitrary datasets or Excel upload/export. Before declaring implementation-ready parity, obtain independent/detail evidence for pie slice labels, zero/negative-value rules and exports; directory text alone does not settle those semantics. |
| LDDGO-06-003 · [在线制作树形图](https://www.lddgo.net/chart/tree-chart) | chart-authoring-3 | Inspected registry has no user-authored chart editor. calc-charts renders fixed calculator-result donut/balance SVGs, not arbitrary datasets or Excel upload/export. Before declaring implementation-ready parity, obtain independent/detail evidence for tree hierarchy/schema and orientation; directory text alone does not settle those semantics. |
| LDDGO-06-004 · [在线制作标准柱状图](https://www.lddgo.net/chart/bar-chart) | chart-authoring-4 | Inspected registry has no user-authored chart editor. calc-charts renders fixed calculator-result donut/balance SVGs, not arbitrary datasets or Excel upload/export. Before declaring implementation-ready parity, obtain independent/detail evidence for bar grouping/stacking and category axes; directory text alone does not settle those semantics. |
| LDDGO-06-005 · [在线制作桑基图](https://www.lddgo.net/chart/sankey-chart) | chart-authoring-5 | Inspected registry has no user-authored chart editor. calc-charts renders fixed calculator-result donut/balance SVGs, not arbitrary datasets or Excel upload/export. Before declaring implementation-ready parity, obtain independent/detail evidence for Sankey node/link schema, balancing and layout; directory text alone does not settle those semantics. |
| LDDGO-06-006 · [在线制作雷达图](https://www.lddgo.net/chart/radar-chart) | chart-authoring-6 | Inspected registry has no user-authored chart editor. calc-charts renders fixed calculator-result donut/balance SVGs, not arbitrary datasets or Excel upload/export. Before declaring implementation-ready parity, obtain independent/detail evidence for radar indicator ranges and multi-series axes; directory text alone does not settle those semantics. |
| LDDGO-06-007 · [在线制作旭日图](https://www.lddgo.net/chart/sunburst-chart) | chart-authoring-7 | Inspected registry has no user-authored chart editor. calc-charts renders fixed calculator-result donut/balance SVGs, not arbitrary datasets or Excel upload/export. Before declaring implementation-ready parity, obtain independent/detail evidence for sunburst hierarchy and weighting; directory text alone does not settle those semantics. |
| LDDGO-06-008 · [在线制作散点图](https://www.lddgo.net/chart/scatter-chart) | chart-authoring-8 | Inspected registry has no user-authored chart editor. calc-charts renders fixed calculator-result donut/balance SVGs, not arbitrary datasets or Excel upload/export. Before declaring implementation-ready parity, obtain independent/detail evidence for scatter x/y series schema and axes; directory text alone does not settle those semantics. |
| LDDGO-06-009 · [在线制作南丁格尔玫瑰图](https://www.lddgo.net/chart/nightingale-chart) | chart-authoring-9 | Inspected registry has no user-authored chart editor. calc-charts renders fixed calculator-result donut/balance SVGs, not arbitrary datasets or Excel upload/export. Before declaring implementation-ready parity, obtain independent/detail evidence for rose-chart radius/angle encoding; directory text alone does not settle those semantics. |
| LDDGO-06-010 · [在线制作环形图](https://www.lddgo.net/chart/doughnut-chart) | chart-authoring-10 | Inspected registry has no user-authored chart editor. calc-charts renders fixed calculator-result donut/balance SVGs, not arbitrary datasets or Excel upload/export. Before declaring implementation-ready parity, obtain independent/detail evidence for doughnut slice schema and inner-radius controls; directory text alone does not settle those semantics. |
| LDDGO-06-011 · [在线制作漏斗图](https://www.lddgo.net/chart/funnel-chart) | chart-authoring-11 | Inspected registry has no user-authored chart editor. calc-charts renders fixed calculator-result donut/balance SVGs, not arbitrary datasets or Excel upload/export. Before declaring implementation-ready parity, obtain independent/detail evidence for funnel ordering and width encoding; directory text alone does not settle those semantics. |
| LDDGO-06-012 · [在线制作仪表盘图](https://www.lddgo.net/chart/gauge-chart) | chart-authoring-12 | Inspected registry has no user-authored chart editor. calc-charts renders fixed calculator-result donut/balance SVGs, not arbitrary datasets or Excel upload/export. Before declaring implementation-ready parity, obtain independent/detail evidence for gauge value/range mapping; directory text alone does not settle those semantics. |
| LDDGO-06-013 · [在线数学公式绘制图表](https://www.lddgo.net/chart/math-formula-chart) | chart-authoring-13 | Inspected registry has no user-authored chart editor. calc-charts renders fixed calculator-result donut/balance SVGs, not arbitrary datasets or Excel upload/export. Before declaring implementation-ready parity, obtain independent/detail evidence for formula grammar, variable/domain sampling and discontinuity handling; directory text alone does not settle those semantics. |
| LDDGO-06-014 · [在线制作词云图](https://www.lddgo.net/chart/word-cloud) | chart-authoring-14 | Inspected registry has no user-authored chart editor. calc-charts renders fixed calculator-result donut/balance SVGs, not arbitrary datasets or Excel upload/export. Before declaring implementation-ready parity, obtain independent/detail evidence for word weighting, segmentation and layout; directory text alone does not settle those semantics. |
| LDDGO-06-015 · [在线生成人物关系图](https://www.lddgo.net/chart/character-relationship) | chart-authoring-15 | Inspected registry has no user-authored chart editor. calc-charts renders fixed calculator-result donut/balance SVGs, not arbitrary datasets or Excel upload/export. Before declaring implementation-ready parity, obtain independent/detail evidence for relationship-node/edge schema, avatar handling and graph exports; directory text alone does not settle those semantics. |
| LDDGO-06-016 · [在线Mermaid图表编辑器](https://www.lddgo.net/chart/mermaid-chart) | chart-authoring-16 | Inspected registry has no user-authored chart editor. calc-charts renders fixed calculator-result donut/balance SVGs, not arbitrary datasets or Excel upload/export. Before declaring implementation-ready parity, obtain independent/detail evidence for supported Mermaid syntax/version and export behavior; directory text alone does not settle those semantics. |

### 坐标（18 项）

| 同行条目 | 工作流 | 具体缺口 |
| --- | --- | --- |
| LDDGO-08-001 · [在线地图坐标系转换](https://www.lddgo.net/convert/coordinate) | geodesy-1 | No geodesy/GNSS workflow appears in the inspected registered inventory or scalar unit/math cores. Implementation scope still requires independent authoritative evidence for GCJ02/BD09 algorithms, domain and inverse tolerances. Scalar unit arithmetic, IP geolocation and Modbus CRC (where adjacent) do not implement this coordinate/protocol workflow. |
| LDDGO-08-002 · [经纬度查询定位](https://www.lddgo.net/convert/position) | geodesy-2 | No geodesy/GNSS workflow appears in the inspected registered inventory or scalar unit/math cores. Implementation scope still requires independent authoritative evidence for geocoding/map provider, licensing and network/failure behavior. Scalar unit arithmetic, IP geolocation and Modbus CRC (where adjacent) do not implement this coordinate/protocol workflow. |
| LDDGO-08-004 · [在线经纬度距离计算](https://www.lddgo.net/convert/distance) | geodesy-4 | No geodesy/GNSS workflow appears in the inspected registered inventory or scalar unit/math cores. Implementation scope still requires independent authoritative evidence for ellipsoid selection and Haversine/Vincenty convergence policy. Scalar unit arithmetic, IP geolocation and Modbus CRC (where adjacent) do not implement this coordinate/protocol workflow. |
| LDDGO-08-005 · [在线大地坐标系与空间直角坐标系转换](https://www.lddgo.net/convert/coordinate-transform) | geodesy-5 | No geodesy/GNSS workflow appears in the inspected registered inventory or scalar unit/math cores. Implementation scope still requires independent authoritative evidence for ellipsoid parameters, datum definitions and inverse ECEF algorithm. Scalar unit arithmetic, IP geolocation and Modbus CRC (where adjacent) do not implement this coordinate/protocol workflow. |
| LDDGO-08-006 · [在线坐标转换](https://www.lddgo.net/convert/helmert-coordinate-transform) | geodesy-6 | No geodesy/GNSS workflow appears in the inspected registered inventory or scalar unit/math cores. Implementation scope still requires independent authoritative evidence for Helmert convention, parameter units, rotations and time-dependent models. Scalar unit arithmetic, IP geolocation and Modbus CRC (where adjacent) do not implement this coordinate/protocol workflow. |
| LDDGO-08-007 · [在线坐标投影计算](https://www.lddgo.net/coordinate/projection) | geodesy-7 | No geodesy/GNSS workflow appears in the inspected registered inventory or scalar unit/math cores. Implementation scope still requires independent authoritative evidence for projection parameterization, axis order, false origins and supported CRS identifiers. Scalar unit arithmetic, IP geolocation and Modbus CRC (where adjacent) do not implement this coordinate/protocol workflow. |
| LDDGO-08-009 · [在线地心地固坐标系和站心坐标系转换](https://www.lddgo.net/coordinate/ecef-enu) | geodesy-9 | No geodesy/GNSS workflow appears in the inspected registered inventory or scalar unit/math cores. Implementation scope still requires independent authoritative evidence for origin ellipsoid and ECEF↔ENU rotation conventions. Scalar unit arithmetic, IP geolocation and Modbus CRC (where adjacent) do not implement this coordinate/protocol workflow. |
| LDDGO-08-010 · [在线莫洛登斯基-巴德卡斯坐标转换](https://www.lddgo.net/coordinate/molodensky-badekas) | geodesy-10 | No geodesy/GNSS workflow appears in the inspected registered inventory or scalar unit/math cores. Implementation scope still requires independent authoritative evidence for 10-parameter pivot and rotation-sign convention. Scalar unit arithmetic, IP geolocation and Modbus CRC (where adjacent) do not implement this coordinate/protocol workflow. |
| LDDGO-08-011 · [在线莫洛登斯基坐标转换](https://www.lddgo.net/coordinate/molodensky-transform) | geodesy-11 | No geodesy/GNSS workflow appears in the inspected registered inventory or scalar unit/math cores. Implementation scope still requires independent authoritative evidence for full/abridged Molodensky model and ellipsoid-difference conventions. Scalar unit arithmetic, IP geolocation and Modbus CRC (where adjacent) do not implement this coordinate/protocol workflow. |
| LDDGO-08-015 · [在线大地纬度转地心纬度](https://www.lddgo.net/coordinate/geodetic-latitude-to-geocentric-latitude) | geodesy-15 | No geodesy/GNSS workflow appears in the inspected registered inventory or scalar unit/math cores. Implementation scope still requires independent authoritative evidence for ellipsoid model and angle/unit conventions. Scalar unit arithmetic, IP geolocation and Modbus CRC (where adjacent) do not implement this coordinate/protocol workflow. |
| LDDGO-08-016 · [在线ITRF坐标转换](https://www.lddgo.net/coordinate/itrf-coordinate-transformation) | geodesy-16 | No geodesy/GNSS workflow appears in the inspected registered inventory or scalar unit/math cores. Implementation scope still requires independent authoritative evidence for official frame/epoch transforms and velocity-field data. Scalar unit arithmetic, IP geolocation and Modbus CRC (where adjacent) do not implement this coordinate/protocol workflow. |
| LDDGO-08-017 · [在线坐标转换参数求解](https://www.lddgo.net/coordinate/transformation-parameter-solve) | geodesy-17 | No geodesy/GNSS workflow appears in the inspected registered inventory or scalar unit/math cores. Implementation scope still requires independent authoritative evidence for least-squares model, input geometry, residuals and degeneracy handling. Scalar unit arithmetic, IP geolocation and Modbus CRC (where adjacent) do not implement this coordinate/protocol workflow. |
| LDDGO-08-018 · [在线WGS84和CGCS2000坐标转换](https://www.lddgo.net/coordinate/wgs84-cgcs2000-converter) | geodesy-18 | No geodesy/GNSS workflow appears in the inspected registered inventory or scalar unit/math cores. Implementation scope still requires independent authoritative evidence for authoritative WGS84 realization/CGCS2000/ITRF epoch transformations. Scalar unit arithmetic, IP geolocation and Modbus CRC (where adjacent) do not implement this coordinate/protocol workflow. |
| LDDGO-08-019 · [在线基站坐标计算](https://www.lddgo.net/coordinate/base-station-coordinate-calculate) | geodesy-19 | No geodesy/GNSS workflow appears in the inspected registered inventory or scalar unit/math cores. Implementation scope still requires independent authoritative evidence for ENU origin assumptions and inverse base-station solution. Scalar unit arithmetic, IP geolocation and Modbus CRC (where adjacent) do not implement this coordinate/protocol workflow. |
| LDDGO-08-020 · [在线NTRIP Source-Table解析和生成](https://www.lddgo.net/coordinate/ntrip-source-table) | geodesy-20 | No geodesy/GNSS workflow appears in the inspected registered inventory or scalar unit/math cores. Implementation scope still requires independent authoritative evidence for NTRIP version/source-table grammar and STR/CAS/NET field constraints. Scalar unit arithmetic, IP geolocation and Modbus CRC (where adjacent) do not implement this coordinate/protocol workflow. |
| LDDGO-08-021 · [在线NMEA-0183协议解析](https://www.lddgo.net/coordinate/nmea-0183-parser) | geodesy-21 | No geodesy/GNSS workflow appears in the inspected registered inventory or scalar unit/math cores. Implementation scope still requires independent authoritative evidence for NMEA message/version/field/checksum specifications. Scalar unit arithmetic, IP geolocation and Modbus CRC (where adjacent) do not implement this coordinate/protocol workflow. |
| LDDGO-08-022 · [在线Geohash编码解码](https://www.lddgo.net/coordinate/geohash-encode-decode) | geodesy-22 | No geodesy/GNSS workflow appears in the inspected registered inventory or scalar unit/math cores. Implementation scope still requires independent authoritative evidence for Geohash precision/boundary semantics and nearby-query dataset/algorithm. Scalar unit arithmetic, IP geolocation and Modbus CRC (where adjacent) do not implement this coordinate/protocol workflow. |
| LDDGO-08-023 · [在线RTCM3数据解析](https://www.lddgo.net/coordinate/rtcm3-parser) | geodesy-23 | No geodesy/GNSS workflow appears in the inspected registered inventory or scalar unit/math cores. Implementation scope still requires independent authoritative evidence for RTCM3 message definitions, CRC and supported constellation/message variants. Scalar unit arithmetic, IP geolocation and Modbus CRC (where adjacent) do not implement this coordinate/protocol workflow. |

[正在实施的分组队列](2026-11-22-gap-delivery-queue.md)。其他同行见[具名网站入口](2026-11-21-named-peer-catalogs.md)及[交付与研究总交接](2026-11-21-competitor-parity-handoff.md)。
