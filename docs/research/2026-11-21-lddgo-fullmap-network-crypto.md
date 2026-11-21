# LDDGO 转换、加密、网络全量映射

覆盖 107 行（转换 39、加密 50、网络 18）。生成时可读取的实际注册定义 218（并行新增中；之前稳定观察为 217，含已注册 lunar-calendar-converter）；状态：missing 61，partial 30，existing 15，not-comparable 1。

Stored bilingual official directory scope plus all actual category registry arrays, effective tool-copy overlays, relevant engine/pure-source inspection. No peer runtime or same-input execution. Existing confirms directory-declared core task only. Missing requires inspected registry/core and explicit adjacent-workflow exclusion. Unmatched slug is not missing proof.

不是流量、排名、独立能力数或完整等价评分；未访问新网络页面，未执行同行表单。YAML↔JSON 行记录本次修复前源码状态。

| ID | 目录任务 | 状态 | 注册映射 | 边界或缺口 | 工作流 |
|---|---|---|---|---|---|
| LDDGO-02-001 | [数字转二进制](https://www.lddgo.net/convert/numberbinary) | missing | — | 已检查全部注册数组及下列相关核心；binary-converter 是整数数值进制转换，未提供 float/double/short/int/long 的固定宽度内存表示、字节序或 IEEE754 位模式；文本字节转换同样不等价。 | typed-number-bits |
| LDDGO-02-002 | [字符串转Base64](https://www.lddgo.net/convert/stringbasesix) | partial | base64-encoder, base64-decoder | 文本 Base64 双向可达，但编码与解码固定 UTF-8，没有目录声明的可选字符集。 | base64-text |
| LDDGO-02-003 | [图片转Base64](https://www.lddgo.net/convert/imagebasesix) | existing | base64-image | 图片文件可生成含 MIME 的 data URL，data URL 可校验、预览、下载为图片；仅确认目录核心双向任务。 | base64-image |
| LDDGO-02-004 | [文件转Base64](https://www.lddgo.net/convert/filebasesix) | existing | base64-encoder | 注册 Base64 编码页提供任意文件编码入口并输出纯 Base64；20 MB 上限。 | base64-file |
| LDDGO-02-005 | [人民币数字转大写](https://www.lddgo.net/convert/numberupper) | existing | rmb-uppercase | 人民币金额转财务大写可达；仅确认目录核心任务，金额范围与格式遵循本地明确限制。 | rmb-uppercase |
| LDDGO-02-006 | [Unix时间戳转换工具](https://www.lddgo.net/convert/unixtimestamp) | existing | timestamp-converter | Unix 秒/毫秒与日期时间双向入口可达；没有宣称任意日期格式批处理等额外能力。 | unix-datetime |
| LDDGO-02-007 | [HTML颜色拾取器](https://www.lddgo.net/convert/colorpicker) | partial | color-picker | 选择颜色并输出 RGB/HEX/HSL 可达；本地 RGB 结构不保留 alpha，没有透明度控件或常见 HTML 命名颜色对照表。 | css-color |
| LDDGO-02-008 | [HTML编码解码](https://www.lddgo.net/convert/htmlencode) | existing | html-escape | 保留字符与 HTML 实体双向转换可达；数字实体选项也可达，仅确认目录声明核心。 | html-entities |
| LDDGO-02-009 | [进制转换器](https://www.lddgo.net/convert/baseconverter) | partial | binary-converter | 2–36（本地延伸到 64）整数进制互转可达；BigInt 核心拒绝小数，因此目录的浮点数转换未覆盖。 | numeric-base |
| LDDGO-02-010 | [简体繁体字转换](https://www.lddgo.net/convert/traditional) | missing | — | 已检查全部注册数组及下列相关核心；case-converter 处理大小写/宽度，不转换简繁/台港词汇；没有字形词库或地区 OpenCC 等转换核心。 | chinese-script |
| LDDGO-02-011 | [汉字转拼音](https://www.lddgo.net/convert/pinyin) | missing | — | 已检查全部注册数组及下列相关核心；text-to-unicode 输出码点而非读音；注册文本变换中没有拼音、声调或多音字选择。 | pinyin |
| LDDGO-02-012 | [在线单位换算](https://www.lddgo.net/convert/unitconvert) | existing | length-converter, weight-converter, area-converter, volume-converter, data-converter, time-converter, temperature-converter, speed-converter, pressure-converter, energy-converter | 独立注册单位页覆盖目录列明长度、重量、面积、容量、数据及多种物理量；不推定目录之外单位完整一致。 | physical-unit |
| LDDGO-02-013 | [字符串转Base32](https://www.lddgo.net/convert/stringbase32) | missing | — | 已检查全部注册数组及下列相关核心；TOTP 内部含 Base32 密钥编解码，但无任意字符串 Base32 编解码界面、字符集或换行参数；Base64 页面不等价。 | base32-text |
| LDDGO-02-014 | [文件转Hex字符串](https://www.lddgo.net/convert/filehex) | missing | — | 已检查全部注册数组及下列相关核心；Base64 文件页只能 Base64，CRC16 输入 HEX 只计算校验值，均无文件↔HEX 下载工作流。 | hex-file |
| LDDGO-02-015 | [字符串二进制转换](https://www.lddgo.net/convert/string-binary) | partial | text-to-binary | UTF-8 文本↔二进制字节可达；没有目录可选字符集。 | binary-text |
| LDDGO-02-016 | [CSS颜色转换](https://www.lddgo.net/convert/css-color) | partial | color-converter | HEX/RGB/HSL 双向转换可达；parseAny 仅三种解析器，不提供 HSV/HWB，alpha 也未保留。 | css-color |
| LDDGO-02-017 | [在线curl命令转代码](https://www.lddgo.net/convert/curl-to-code) | missing | — | 已检查全部注册数组及下列相关核心；url-parser 只拆 URL、没有解析 curl 请求和生成各语言 HTTP 客户端代码。 | curl-code |
| LDDGO-02-018 | [在线YAML转JSON](https://www.lddgo.net/convert/yaml-to-json) | partial | json-yaml-converter | JSON→YAML 可达，但工具定义固定 mode=json2yaml；swap 只把 output 放入 input，不切方向，因此 YAML→JSON 分支不可达。此结论记录修复前快照。 | yaml-json |
| LDDGO-02-019 | [在线HTML转JS](https://www.lddgo.net/convert/html-to-js) | missing | — | 已检查全部注册数组及下列相关核心；HTML 格式化/转义只返回 HTML 或实体文本；没有生成 JS 变量的模板字符串/普通字符串拼接模式。 | html-javascript |
| LDDGO-02-020 | [在线字符串转Unicode](https://www.lddgo.net/convert/string-unicode) | partial | text-to-unicode | 字符串与多种 Unicode 表示双向可达并按码点处理非 BMP；没有“保留 ASCII”开关（只保留特定空格）。 | unicode-text |
| LDDGO-02-021 | [文字加密解密](https://www.lddgo.net/convert/string-encode) | partial | base64-encoder, base64-decoder, url-encoder, url-decoder, html-escape, md5-generator | Base64、URL、HTML 实体及 MD5 任务分散可达；缺任意文本 HEX 编解码。MD5 本身不可逆，不把目录“解密”泛称当作可逆承诺。 | text-codec-suite |
| LDDGO-02-022 | [在线Base64转图片](https://www.lddgo.net/convert/base64-to-image) | partial | base64-image | data URL→图片可达，但本地 parseDataUrl 强制 data: MIME 头，裸 Base64 不能直接按图片识别预览/下载；通用解码器仅下载字节不能算完整图片流程。 | base64-image |
| LDDGO-02-023 | [在线数字处理](https://www.lddgo.net/convert/number-process) | partial | rmb-uppercase | 只覆盖人民币数字转财务大写；没有数字组的千分位/科学计数法/英文数词处理或批量输入。 | number-format |
| LDDGO-02-024 | [CSS长度单位转换](https://www.lddgo.net/convert/css-length-unit-convert) | missing | — | 已检查全部注册数组及下列相关核心；length-converter 是物理长度换算，没有 CSS 上下文参数（字号、根字号、视口）与 px/em/rem/vw/vh 等转换。 | css-length |
| LDDGO-02-025 | [在线Base58编码解码](https://www.lddgo.net/convert/base58) | missing | — | 已检查全部注册数组及下列相关核心；binary-converter 的 base58 是非负整数位值表示，不能替代字符串/文件按 Base58 编码的字节序列与前导零规则。 | base58-data |
| LDDGO-02-026 | [在线XML和JSON互相转换](https://www.lddgo.net/convert/xml-json) | partial | json-to-xml, xml-to-json | 两方向数据转换可达，JSON→XML 有下载；XML→JSON 引擎仅 CopyButton，缺目录声明的转换结果本地下载；不主张两者任意结构无损互逆。 | xml-json |
| LDDGO-02-027 | [在线原码/反码/补码计算器](https://www.lddgo.net/convert/number-binary-code) | missing | — | 已检查全部注册数组及下列相关核心；binary-converter 是非负整数位值转换，没有原码/反码/补码或任意位宽有符号整数表示。 | signed-number-bits |
| LDDGO-02-028 | [二进制格式转换](https://www.lddgo.net/convert/binary-format-converter) | partial | base64-encoder, base64-decoder | 仅覆盖 raw 文件↔Base64；没有统一 HEX、hex-prefix、binary、Base64、raw 任意两格式互转。CRC HEX 解析不是转换输出。 | binary-format |
| LDDGO-02-029 | [在线字体格式转换](https://www.lddgo.net/convert/font-format-converter) | missing | — | 已检查全部注册数组及下列相关核心；没有 EOT/OTF/SVG/TTF/WOFF/WOFF2 字体格式解析、转换或字体 demo；svg-converter 面向图片光栅化，不等价。 | font-conversion |
| LDDGO-02-030 | [在线字体裁剪工具](https://www.lddgo.net/convert/font-subset) | missing | — | 已检查全部注册数组及下列相关核心；没有按文字/Unicode 范围生成裁剪后字体文件；text-to-unicode 仅输出码点，不处理字体字形表。 | font-subset |
| LDDGO-02-031 | [在线时间格式转换](https://www.lddgo.net/convert/datetime-format-converter) | partial | timestamp-converter | 单一日期与 Unix 秒/毫秒、UTC 展示可达；没有 RFC/Excel 日期序号等格式集合或批量输入输出。 | datetime-format |
| LDDGO-02-032 | [在线批量单位换算](https://www.lddgo.net/convert/batch-unit-converter) | partial | length-converter, weight-converter, area-converter, volume-converter, data-converter, time-converter, temperature-converter, speed-converter, pressure-converter, energy-converter | 单位计算核心覆盖各类，但共享引擎仅一个 amount 输入，没有数据列表导入或批量结果输出。 | physical-unit-batch |
| LDDGO-02-033 | [在线汉字拼音首字母](https://www.lddgo.net/convert/pinyin-first-letter) | missing | — | 已检查全部注册数组及下列相关核心；没有汉字读音或拼音首字母核心；大小写/全半角变换不生成拼音。 | pinyin-initial |
| LDDGO-02-034 | [在线时间类型转换](https://www.lddgo.net/convert/date-time-type-converter) | partial | timestamp-converter | UTC/本地日期与 Unix 互转可达；没有 TAI/GPS/北斗时标及闰秒偏移表，也无批量下载。timezone-converter 的民用时区不是这些时标。 | time-scales |
| LDDGO-02-035 | [在线本地字体预览](https://www.lddgo.net/convert/local-font-preview) | missing | — | 已检查全部注册数组及下列相关核心；没有本地字体文件/系统字体枚举和预览；fancy-text-generator 只替换 Unicode 字形字符，不加载字体。 | font-preview |
| LDDGO-02-036 | [在线中文大写数字转换阿拉伯数字](https://www.lddgo.net/convert/chinese-number-to-arabic-number) | partial | rmb-uppercase-to-number | 财务人民币“元角分”大写子集可转数字并下载；核心要求元且只接受财务数字，不能覆盖目录普通中文数字（一二三）和一般大写数词。 | chinese-number |
| LDDGO-02-037 | [在线MessagePack和JSON转换](https://www.lddgo.net/convert/msgpack-to-json) | missing | — | 已检查全部注册数组及下列相关核心；JSON 工具处理 JSON 文本；没有 MessagePack 二进制编解码或 hex/base64/字节数组输入映射。 | messagepack |
| LDDGO-02-038 | [在线BaseN编码解码](https://www.lddgo.net/convert/basen-encode-decode) | partial | base64-encoder, base64-decoder | 标准 Base64 字符串/文件仅覆盖目录算法集合的一支；整数 base2–64 不等于字节编码，无 Base32/58/85/91/100 或自定义字节算法界面。 | basen-data |
| LDDGO-02-039 | [在线Protocol Buffers编码解码](https://www.lddgo.net/convert/protocol-buffers-encode-decode) | missing | — | 已检查全部注册数组及下列相关核心；没有 proto 定义文件解析、多消息 Protocol Buffers 编码/解码；JSON 类型生成和 Base64 解码不能解释 protobuf wire schema。 | protobuf |
| LDDGO-03-001 | [UrlEncode编码解码](https://www.lddgo.net/encrypt/urlencode) | existing | url-encoder, url-decoder | URL 编解码组件/完整 URI 及 + 视为空格选项可达，仅确认目录核心任务。 | url-codec |
| LDDGO-03-002 | [MD5加密](https://www.lddgo.net/encrypt/md5) | partial | md5-generator | MD5 HEX/Base64 输出和文本/文件可达；文本固定 UTF-8，缺目录可选字符集。 | hash-digest |
| LDDGO-03-003 | [文件HASH计算](https://www.lddgo.net/encrypt/filehash) | partial | hash-generator | 文件 MD5/SHA1/SHA256/SHA512 可达；注册算法列表缺 SHA3-256/SHA3-512。 | hash-file |
| LDDGO-03-004 | [DES加密解密](https://www.lddgo.net/encrypt/des) | missing | — | 已检查全部注册数组及下列相关核心；DES 对称加/解密；没有 DES 密钥、模式、IV 或数据格式入口。 | des |
| LDDGO-03-005 | [CRC在线计算](https://www.lddgo.net/encrypt/crc) | partial | crc16-modbus | 只实现固定 CRC-16/Modbus 与 HEX 输入；缺 CRC8/32/64、其他 CRC16 多项式/初值/反转参数。 | crc |
| LDDGO-03-006 | [在线htpasswd生成器](https://www.lddgo.net/encrypt/htpasswd) | missing | — | 已检查全部注册数组及下列相关核心；Apache htpasswd 口令文件生成；随机密码或普通 MD5/HMAC 不是 htpasswd 格式。 | htpasswd |
| LDDGO-03-007 | [异或校验(BCC校验)在线计算](https://www.lddgo.net/encrypt/bcc) | missing | — | 已检查全部注册数组及下列相关核心；BCC 异或校验；CRC16 是多项式余数，不能替代逐字节 XOR。 | bcc |
| LDDGO-03-008 | [在线摩斯密码翻译器](https://www.lddgo.net/encrypt/morse) | missing | — | 已检查全部注册数组及下列相关核心；Unicode 摩斯码双向转换；NATO 音标是另一种字母读法，不是点划电码。 | morse |
| LDDGO-03-009 | [AES加密解密](https://www.lddgo.net/encrypt/aes) | missing | — | 已检查全部注册数组及下列相关核心；AES CBC/CFB/OFB/CTR/GCM/ECB 加解密；现有哈希和 HMAC 不可逆，不能替代。 | aes |
| LDDGO-03-010 | [SSL证书生成](https://www.lddgo.net/encrypt/ssl) | missing | — | 已检查全部注册数组及下列相关核心；生成域名/IP X.509 证书；RDAP 域名查询不生成密钥或证书。 | x509-generate |
| LDDGO-03-011 | [在线Javascript混淆加密](https://www.lddgo.net/encrypt/js) | missing | — | 已检查全部注册数组及下列相关核心；JavaScript 混淆及强度参数；javascript-minifier 仅保守删除注释/空行，不提供变量混淆/控制流变换。 | javascript-obfuscation |
| LDDGO-03-012 | [在线HMAC计算工具](https://www.lddgo.net/encrypt/hmac) | partial | hmac-generator | HMAC-SHA1/256/384/512 可达；缺目录 MD5/SHA224/SHA3 分支。 | hmac |
| LDDGO-03-013 | [3DES/TripleDES加密解密](https://www.lddgo.net/encrypt/tripledes) | missing | — | 已检查全部注册数组及下列相关核心；TripleDES 加解密及多模式；哈希/HMAC 不支持可逆密码。 | tripledes |
| LDDGO-03-014 | [在线RSA公钥私钥生成](https://www.lddgo.net/encrypt/rsakey) | missing | — | 已检查全部注册数组及下列相关核心；RSA 公私钥生成与 PEM/HEX 导出；JWT 验证只导入已有公钥。 | rsa-keypair |
| LDDGO-03-015 | [在线RSA加密解密](https://www.lddgo.net/encrypt/rsa) | missing | — | 已检查全部注册数组及下列相关核心；RSA 公钥/私钥加解密与格式选择；JWT 签名验证不是 RSA 数据加解密。 | rsa-encryption |
| LDDGO-03-016 | [在线哈希值计算](https://www.lddgo.net/encrypt/hash) | partial | hash-generator | 文本/文件及 HEX/Base64 输出可达；缺 MD2/MD4/SHA3 族，且 HEX/Base64 输入不能作为原始字节选择，文本固定 UTF-8。 | hash-digest |
| LDDGO-03-017 | [Blowfish加密解密](https://www.lddgo.net/encrypt/blowfish) | missing | — | 已检查全部注册数组及下列相关核心；Blowfish 加解密及模式/IV 选择；无对应密码核心。 | blowfish |
| LDDGO-03-018 | [在线RC6加密解密](https://www.lddgo.net/encrypt/rc6) | missing | — | 已检查全部注册数组及下列相关核心；RC6 加解密；无对应密码核心。 | rc6 |
| LDDGO-03-019 | [在线RC5加密解密](https://www.lddgo.net/encrypt/rc5) | missing | — | 已检查全部注册数组及下列相关核心；RC5 加解密；无对应密码核心。 | rc5 |
| LDDGO-03-020 | [在线RC4加密解密](https://www.lddgo.net/encrypt/rc4) | missing | — | 已检查全部注册数组及下列相关核心；RC4 加解密；无对应流密码核心。 | rc4 |
| LDDGO-03-021 | [在线RC2加密解密](https://www.lddgo.net/encrypt/rc2) | missing | — | 已检查全部注册数组及下列相关核心；RC2 加解密；无对应密码核心。 | rc2 |
| LDDGO-03-022 | [在线JWT解密](https://www.lddgo.net/encrypt/jwt-decrypt) | existing | jwt-decoder | JWT Header/Payload 解码可达；本地另有显式验证面板，不据此声称对方验证签名。 | jwt-decode |
| LDDGO-03-023 | [在线 HTTP Basic Authentication 加密解密](https://www.lddgo.net/encrypt/basic-auth) | partial | base64-encoder | 已注册 base64-encoder 页面提供用户名/密码输入并生成 UTF-8 Authorization: Basic 请求头；反向 Basic 请求头解析和用户名/密码字段拆分仍缺失，通用 Base64 解码需手工去头且不拆字段。 | http-basic |
| LDDGO-03-024 | [在线凯撒密码加密解密](https://www.lddgo.net/encrypt/caesar-cipher) | missing | — | 已检查全部注册数组及下列相关核心；支持中英文的凯撒密码移位；reverse-text/case-converter 不执行字母表移位。 | caesar |
| LDDGO-03-025 | [在线维吉尼亚密码加密解密](https://www.lddgo.net/encrypt/vigenere-cipher) | missing | — | 已检查全部注册数组及下列相关核心；支持中英文维吉尼亚密码；没有密钥驱动的周期移位。 | vigenere |
| LDDGO-03-026 | [在线LRC校验(纵向冗余校验)计算器](https://www.lddgo.net/encrypt/lrc) | missing | — | 已检查全部注册数组及下列相关核心；LRC 纵向冗余校验及四进制输出；CRC16/HMAC 运算不同。 | lrc |
| LDDGO-03-027 | [在线JWT Token生成](https://www.lddgo.net/encrypt/jwt-generate) | missing | — | 已检查全部注册数组及下列相关核心；token-generator 生成随机字符，jwt-decoder 仅解码/验证已有 JWT；没有 header/payload 编写、JWS 签发或 JWE 加密 JWT 生成。 | jwt-generate |
| LDDGO-03-028 | [在线Chmod权限生成](https://www.lddgo.net/encrypt/chmod-permission-generator) | existing | chmod-calculator | rwx 可视化及 setuid/setgid/sticky 可达，输出数字与符号权限；仅确认目录任务。 | chmod |
| LDDGO-03-029 | [在线密码强度检测](https://www.lddgo.net/string/password-strength-test) | existing | password-strength | 本地 zxcvbn 强度估算与弱密码建议可达；不推定与对方模型、分数或耗时完全一致。 | password-strength |
| LDDGO-03-030 | [在线RSA签名和验证](https://www.lddgo.net/encrypt/rsa-sign-verify) | missing | — | 已检查全部注册数组及下列相关核心；JWT 验证仅对 JWT signing input 验 RSA/ECDSA；不能签任意数据、没有 DSA 签验入口。HMAC 对称 MAC 也不是 RSA/DSA/ECDSA 签名。 | asymmetric-sign |
| LDDGO-03-031 | [在线查看证书](https://www.lddgo.net/encrypt/view-certificate) | missing | — | 已检查全部注册数组及下列相关核心；PEM/DER 证书/证书链查看；JWT 公钥导入不解析证书主题、SAN、指纹等。 | x509-inspect |
| LDDGO-03-032 | [在线CSR查看和生成](https://www.lddgo.net/encrypt/csr-view-generate) | missing | — | 已检查全部注册数组及下列相关核心；CSR 查看和 RSA/ECDSA CSR 生成；没有 PKCS#10 结构解析/签发入口。 | csr |
| LDDGO-03-033 | [在线CSR颁发证书](https://www.lddgo.net/encrypt/cert-issuer) | missing | — | 已检查全部注册数组及下列相关核心；根据 CSR 签发 X.509 及根证书；没有 CA 密钥/CSR/证书签发核心。 | x509-issue |
| LDDGO-03-034 | [在线证书格式转换](https://www.lddgo.net/encrypt/cert-format-converter) | missing | — | 已检查全部注册数组及下列相关核心；PEM/PKCS12/PKCS8/JKS/DER 证书格式互转；Base64 字节编码不是证书容器转换。 | certificate-convert |
| LDDGO-03-035 | [在线私钥加密解密](https://www.lddgo.net/encrypt/private-key-encrypt-decrypt) | missing | — | 已检查全部注册数组及下列相关核心；RSA/DSA/ECDSA 私钥 PEM/DER 加解密；JWT 验签只导入验证材料，没有私钥口令保护。 | private-key-encryption |
| LDDGO-03-036 | [在线CMAC计算](https://www.lddgo.net/encrypt/cmac-calculate) | missing | — | 已检查全部注册数组及下列相关核心；AES/DES/SM4 CMAC；HMAC 使用哈希，不能替代分组密码 MAC。 | cmac |
| LDDGO-03-037 | [在线PBKDF2派生密钥和校验](https://www.lddgo.net/encrypt/pbkdf2) | missing | — | 已检查全部注册数组及下列相关核心；PBKDF2 派生/校验、盐、迭代和长度参数；随机 token 及单次 HMAC 都不是 KDF。 | pbkdf2 |
| LDDGO-03-038 | [在线HKDF派生密钥和校验](https://www.lddgo.net/encrypt/hkdf) | missing | — | 已检查全部注册数组及下列相关核心；HKDF extract/expand 派生/校验及 info 参数；单次 HMAC 不是完整 HKDF。 | hkdf |
| LDDGO-03-039 | [在线SCrypt派生密钥和校验](https://www.lddgo.net/encrypt/scrypt) | missing | — | 已检查全部注册数组及下列相关核心；SCrypt 派生/校验及 N/r/p 参数；没有相应 KDF 核心。 | scrypt |
| LDDGO-03-040 | [在线BCrypt派生密钥和校验](https://www.lddgo.net/encrypt/bcrypt) | missing | — | 已检查全部注册数组及下列相关核心；BCrypt 派生/校验及 cost；没有 bcrypt 算法入口。 | bcrypt |
| LDDGO-03-041 | [在线KMAC计算和验证](https://www.lddgo.net/encrypt/kmac-calculate-verify) | missing | — | 已检查全部注册数组及下列相关核心；KMAC128/256 生成/验证和输出位长；HMAC 不等价。 | kmac |
| LDDGO-03-042 | [在线数据脱敏](https://www.lddgo.net/encrypt/data-masking) | missing | — | 已检查全部注册数组及下列相关核心；txt/csv/json/excel 数据脱敏批处理与下载；find-and-replace 只做字符串替换，redact-pdf 面向 PDF 栅格涂黑。 | data-masking |
| LDDGO-03-043 | [在线OTP密码生成器](https://www.lddgo.net/encrypt/otp-code-generate) | partial | totp-generator | TOTP 与 secret/otpauth 导出可达；HOTP 仅内部函数供 TOTP 调用，没有用户计数器/HOTP 生成模式。 | otp |
| LDDGO-03-044 | [在线国密SM4加密解密](https://www.lddgo.net/encrypt/sm4) | missing | — | 已检查全部注册数组及下列相关核心；SM4 对称加解密；无国密 SM4 核心或模式入口。 | sm4 |
| LDDGO-03-045 | [在线国密SM2加密解密](https://www.lddgo.net/encrypt/sm2-encrypt-decrypt) | missing | — | 已检查全部注册数组及下列相关核心；SM2 公私钥加解密；无 SM2 核心。 | sm2-encryption |
| LDDGO-03-046 | [在线国密SM2签名和验证](https://www.lddgo.net/encrypt/sm2-sign-verify) | missing | — | 已检查全部注册数组及下列相关核心；SM2 签名/验证；JWT 的 RSA/ECDSA 验证不支持 SM2。 | sm2-sign |
| LDDGO-03-047 | [在线ChaCha20加密解密](https://www.lddgo.net/encrypt/chacha20-encrypt-decrypt) | missing | — | 已检查全部注册数组及下列相关核心；ChaCha20/XChaCha20 及 Poly1305 AEAD；无对应密码核心。 | chacha20 |
| LDDGO-03-048 | [在线国密SM9密钥生成](https://www.lddgo.net/encrypt/sm9-key-generator) | missing | — | 已检查全部注册数组及下列相关核心；SM9 主密钥及用户标识私钥生成；无标识密码核心。 | sm9-key |
| LDDGO-03-049 | [在线国密SM9加密解密](https://www.lddgo.net/encrypt/sm9-encrypt-decrypt) | missing | — | 已检查全部注册数组及下列相关核心；SM9 标识加解密；无对应密码核心。 | sm9-encryption |
| LDDGO-03-050 | [在线国密SM9签名和验证](https://www.lddgo.net/encrypt/sm9-sign-verify) | missing | — | 已检查全部注册数组及下列相关核心；SM9 标识签名/验证；无对应密码核心。 | sm9-sign |
| LDDGO-04-001 | [WEBSOCKET在线测试](https://www.lddgo.net/network/websocket) | missing | — | 已检查全部注册数组及下列相关核心；网络引擎只做 DNS/IP/RDAP HTTP 查询；没有可连接 ws/wss、发送及实时接收文本消息的 WebSocket 客户端。 | websocket |
| LDDGO-04-002 | [我的公网IP](https://www.lddgo.net/network/getmyip) | partial | ip-lookup | “查我自己的 IP”按钮可调用外部 IP 服务；没有目录另声明的本站公共 IP API 端点。第三方依赖和额度见工具最终 copy。 | public-ip |
| LDDGO-04-003 | [IP转数字](https://www.lddgo.net/network/ipnumber) | missing | — | 已检查全部注册数组及下列相关核心；ipToInt/intToIp 是内部纯函数，但子网页面仅 CIDR/覆盖范围/展开，未显示 IPv4 无符号整数或提供整数→IP 输入；binary-converter 也不解析点分 IP。 | ipv4-integer |
| LDDGO-04-004 | [在线DNS查询/DNS解析](https://www.lddgo.net/network/dns) | existing | dns-lookup | Google DoH 查询可达，类型含 A/CNAME/MX/TXT（另有 AAAA/NS）；外部服务可失败，不代表本地离线 DNS。 | dns |
| LDDGO-04-005 | [User-Agent在线分析](https://www.lddgo.net/network/useragent) | partial | user-agent-parser | 浏览器/引擎/OS/版本/设备类型解析可达；结果类型无 CPU 架构、语言、插件字段，不覆盖目录宣称全部字段。 | user-agent |
| LDDGO-04-006 | [IP地址查询/IPv6地址查询](https://www.lddgo.net/network/ipaddress) | existing | ip-lookup | IPv4/IPv6 验证与国家/省市/ISP 查询可达，经 ipwho.is；精度/额度/覆盖以最终工具 copy 为准。 | ip-geolocation |
| LDDGO-04-007 | [whois查询](https://www.lddgo.net/network/whois) | existing | whois-lookup | RDAP 注册资料面板有注册商/事件/NS/联系信息（若公开），符合目录核心；RDAP 覆盖和隐藏资料不是全量传统 WHOIS 保障。 | domain-registration |
| LDDGO-04-008 | [MQTT WebScoket客户端在线测试](https://www.lddgo.net/network/mqtt) | missing | — | 已检查全部注册数组及下列相关核心；无 MQTT 连接/主题订阅/publish/消息接收核心；HTTP DNS/IP 查询不建立 MQTT 会话。 | mqtt-client |
| LDDGO-04-009 | [公共免费MQTT服务器](https://www.lddgo.net/network/mqttlist) | not-comparable | — | 目录行提供公共 MQTT broker 服务（mqtt/mqtts/ws/wss），属于托管网络基础设施，不能作为纯客户端工具数的同类缺口；本地没有运营 broker。 | mqtt-broker-service |
| LDDGO-04-010 | [在线随机IPv4/IPv6地址生成](https://www.lddgo.net/network/randomip) | missing | — | 已检查全部注册数组及下列相关核心；random-number 输出标量随机数，IPv4 range expander 按序枚举地址；没有指定范围/数量的随机 IPv4 或 IPv6 生成。 | random-ip |
| LDDGO-04-011 | [HTTP状态码大全](https://www.lddgo.net/network/httpstatuscode) | existing | http-status-codes | 五类 HTTP 状态参考列表可搜索代码与名称，目录核心查询任务可达；不声称条目数/释义完全相同。 | http-status |
| LDDGO-04-012 | [常用MIME类型列表](https://www.lddgo.net/network/mime) | existing | mime-types | 可搜索 MIME/扩展名/文档说明列表并复制，目录核心参考任务可达；不推定数据库条目完全一致。 | mime-reference |
| LDDGO-04-013 | [常用端口及协议大全](https://www.lddgo.net/network/port) | missing | — | 已检查全部注册数组及下列相关核心；MIME 和 HTTP 状态表不包含端口号、TCP/UDP、服务名的端口协议资料表。 | ports-reference |
| LDDGO-04-014 | [随机MAC地址生成器](https://www.lddgo.net/network/random-mac) | missing | — | 已检查全部注册数组及下列相关核心；随机 token 可生成 HEX 字符，但无 48/64 bit MAC 地址范围、分隔格式、大小写和批量语义；UUID 也不是 MAC。 | random-mac |
| LDDGO-04-015 | [IPv4/IPv6 CIDR 地址计算器](https://www.lddgo.net/network/cidr) | partial | ipv4-subnet-calculator | IPv4 CIDR 网络/广播/掩码/主机数可达；parseCidr 强制点分 IPv4 和 /0–32，不支持 IPv6。 | cidr |
| LDDGO-04-016 | [在线Punycode编码解码](https://www.lddgo.net/network/punycode) | partial | url-parser | URL parser 对裸 IDN 或 URL 的 host 显示 WHATWG 标准化的 ASCII/Punycode，已可达 IDN→Punycode 一向；没有 Punycode→国际化域名反向解码，也非独立完整编解码工作台。 | punycode |
| LDDGO-04-017 | [IPv6地址压缩和展开](https://www.lddgo.net/network/ipv6-compress-expand) | partial | url-parser | URL parser 接受方括号内 IPv6，并在可见 host 字段显示压缩形式，已可达 IPv6 压缩一向；没有展开至完整八组的反向操作。需保留 URL host 的方括号输入/输出语法。 | ipv6-normalize |
| LDDGO-04-018 | [在线CIDR聚合](https://www.lddgo.net/network/cidr-aggregate) | partial | ipv4-subnet-calculator | 最小覆盖 CIDR 可对两个 IPv4 端点计算；没有多 IP/多个子 CIDR 列表聚合和 IPv6。 | cidr-aggregate |

源码路径、行号、精确摘录及不等价相邻工具见同名 JSON；已验证 107 个 ID 全覆盖无重复、映射 slug 均实际注册、源码锚逐行匹配。

注册表并行变动说明：定稿读取时 tools/text/index.ts 已引用尚未落盘的 line-number-generator.ts，该未完成引用不计入可读取定义数，也未用于任何映射；合并审计需在实现结束后重新扫描注册数与源码锚。

复核修正（2026-11-21T15:45:39.329755+00:00）：LDDGO-03-023 从 missing 改为 partial；共享 Base64 编码引擎已存在 HTTP Basic Auth 生成面板，缺口仅为反向请求头/字段解析。

复核修正（2026-11-21T15:49:40.610342+00:00）：04-016 Punycode 与 04-017 IPv6 压缩从 missing 改为 partial。实际执行本地 parseUrl 模块分别观察到 IDN→ASCII host 与 IPv6→压缩 host，界面源码明确渲染 host；没有执行同行或浏览器 UI 验收，不把这些结果计作同行实测。反向 Punycode 解码与 IPv6 展开仍未提供。
