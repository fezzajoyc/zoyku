# Zoyku 全球同行工具能力缺口矩阵

研究日期：2026-11-20（Asia/Shanghai）；本地基线：`dccdbfd` / `codex/tool-parity-cn`，205 个工具定义。

本次抽样核对 **57 条能力/兼容性项**：既有 8、部分 15、缺失 33、未知 1。其中 G57 只是 G02 的算法兼容性待核实子项，不应额外计作新工具。

## 研究口径

- 本报告有57条选定能力/兼容性条目，其中G57为G02的算法兼容性待核实子项；不声称覆盖CyberChef全部操作或IT-Tools全部工具，不能把条目数当作新增路由数。
- 只用官方产品页与官方仓库作为能力证据，不使用未经验证的流量排名、搜索量、收入、受欢迎程度或“420项全覆盖”说法。
- 目录存在、说明存在、源码存在都不等于同行在真实文件上通过了正确性/性能/安全/隐私验收；尤其PDF布局重建、OCR、标准合规等需单独样本实测。
- 本地判定基于源代码和注册表静态检查，不是全部205个工具的浏览器验收；缺失表示本次检查范围内未发现，不证明无法用多步手工流程完成。
- 同一能力可出现在多个同行中；按本地能力/引擎边界去重。is_existing_tool_option标明可扩展现有工具，避免为了追目录重造同义引擎和路由。
- IT-Tools官网简化HTML只含SPA壳，已读取其部署资源/assets/index-61effc08.js；GitHub网页/raw多次连接失败、API触发403限流，最终通过官方codeload ZIP读取main源码；官网部署版与main可能不同，因此不混称同一版本。
- Omni示例为金融/数学能力规格，不提供个人投资或健康建议；实施金融/统计算法须独立对照而非照搬同行样例。
- 基础保留项：文件哈希已存在；binary-converter已有DEC/HEX/OCT/BIN；PDF OCR现为TXT；pdf-to-ppt为整页JPEG；unlock-pdf明确不解密。
- 本报告描述dccdbfd基线状态。后续实现应另记录验收结果，不能回写为同行已实测或偷偷抹掉原缺口。
- CyberChef脚本超过mcp fetch的5MB响应上限；raw GitHub连接反复失败，采用官方部署JS的HTTP Range读取并解析分类JSON。完整脚本和大ZIP下载未作为证据，未读取到的操作细节一律不推断。

## 证据等级

- `official_directory`：读取官方目录的标题/说明和链接；只证明提供入口与宣称规格，未操作工具
- `official_detail_page`：读取官方详情正文；未提交文件或独立验算同行结果
- `official_site_bundle_and_repository_index`：读取IT-Tools官网实际部署JS中的目录元数据，并核对官方仓库ZIP内工具index；不是执行验收
- `repository_source`：另读取了列明工具的Vue/TS实现，确认参数/输出方式；仍未运行同行测试
- `official_deployed_operation_directory`：从CyberChef官方部署脚本/操作目录读取名称和分类；未运行对应配方

## 先做什么

- 优先做已有工具的语义补齐：摘要编码/算法（G02）、任意字节 Base64（G21）、Wi-Fi QR 输入模板（G22）、复利现金流参数（G46）、JWT 验签（G56）。这些不需要为同义能力再造引擎。
- 适合独立纯函数内核：2–64 进制（G04）、IBAN（G11）、IPv4 区间（G15）、IRR（G47）、标准差（G48）、字节 Base58（G50）。先给算法边界、输入/输出限额和独立向量。
- 高依赖 PDF 能力单列规划：可搜索OCR（G25）、可编辑Office重建（G26/G40/G41）、真实解密/加密/证书签名（G27–G30）、PDF/A/UA（G31/G32）。名称相同不代表已对齐，不应直接改文案宣称完成。
- 保留并回归现有基础：文件哈希、DEC/HEX/OCT/BIN、MIME、chmod、PDF合并/拆分/表单扁平化/嵌入图片提取（G01/G03/G18/G19/G42–G45）。

## 能力矩阵

“本地”列列出已存在或最接近的 slug；源码为判定依据。`missing` 中列出的最接近工具并不等价。官网链接是存在性/可见规格证据，未执行同行真实文件验收。

### IT-Tools

| ID / 能力 | 状态与官方证据 | 本地 slug / 源码 | 真正差距 | 现有选项？/ 实现依赖 |
|---|---|---|---|---|
| G01 文本与文件的 MD5 / SHA-1 / SHA-2 哈希 | **既有** · [官方1](https://it-tools.tech/hash-text) / [官方2](https://github.com/CorentinTh/it-tools/blob/main/src/tools/hash-text/index.ts)<br>`repository_source` | `hash-generator`<br>`tools/developer/hash-generator.ts`<br>`tools/_engines/dev-engine-hash.tsx` | 无已证实基础缺口；本地已有 Text/File 双模式，不能再把文件哈希列为缺失。 | 已有工具，无需新增<br>保留五算法与原始字节回归；大文件内存特征另做性能验收 |
| G02 SHA-224 / RIPEMD160 与摘要 Base64 / Base64url / 二进制输出 | **部分** · [官方1](https://it-tools.tech/hash-text) / [官方2](https://github.com/CorentinTh/it-tools/blob/main/src/tools/hash-text/index.ts) / [源码3](https://github.com/CorentinTh/it-tools/blob/main/src/tools/hash-text/hash-text.vue)<br>`repository_source` | `hash-generator`<br>`tools/developer/hash-generator.ts`<br>`tools/_engines/dev-engine-hash.tsx` | 本地仅 MD5、SHA-1、SHA-256/384/512 和十六进制输出；官方源码另列 SHA224、RIPEMD160 与四类摘要编码。SHA3 的算法变体另见 G57。 | 是：扩展 hash-generator 算法与编码选项<br>按需加载算法；独立标准向量；不要把 crypto-js SHA3 标签自动等同标准 SHA3 |
| G03 DEC / HEX / OCT / BIN 任意大非负整数互转 | **既有** · [官方1](https://it-tools.tech/base-converter) / [官方2](https://github.com/CorentinTh/it-tools/blob/main/src/tools/integer-base-converter/index.ts)<br>`repository_source` | `binary-converter`<br>`tools/calculators/binary-converter.ts`<br>`tools/_engines/calc-engine-converters.tsx` | 无基础缺口；本地 BigInt 四栏已覆盖，名称 Binary 不表示只会二进制。 | 已有工具，无需新增<br>保留零、超 2^53、非法位回归 |
| G04 2–64 自定义整数进制 | **部分** · [官方1](https://it-tools.tech/base-converter) / [官方2](https://github.com/CorentinTh/it-tools/blob/main/src/tools/integer-base-converter/index.ts) / [源码3](https://github.com/CorentinTh/it-tools/blob/main/src/tools/integer-base-converter/integer-base-converter.vue) / [源码4](https://github.com/CorentinTh/it-tools/blob/main/src/tools/integer-base-converter/integer-base-converter.model.ts)<br>`repository_source` | `binary-converter`<br>`tools/_engines/calc-engine-converters.tsx` | 本地固定 2/8/10/16；同行源码有输入/输出 2–64 和明确字符表。这里的 base64 是整数位权表示，不是文件 Base64。 | 是：扩展现有转换器，不重建四进制工具<br>BigInt 解析器；大写/小写字符表契约；位数/运算限额 |
| G05 bcrypt 哈希与校验 | **缺失** · [官方1](https://it-tools.tech/bcrypt) / [官方2](https://github.com/CorentinTh/it-tools/blob/main/src/tools/bcrypt/index.ts)<br>`official_site_bundle_and_repository_index` | 无等价slug<br>`tools/security/index.ts`<br>`tools/developer/index.ts` | 本地哈希/HMAC 不等价于带 salt/cost 的密码哈希，未发现 bcrypt 生成或 compare。 | 否：新能力，可放安全工具组<br>维护良好的懒加载 bcrypt 实现；Worker；cost 上限；已知测试向量 |
| G06 RSA PEM 密钥对生成 | **缺失** · [官方1](https://it-tools.tech/rsa-key-pair-generator) / [官方2](https://github.com/CorentinTh/it-tools/blob/main/src/tools/rsa-key-pair-generator/index.ts) / [源码3](https://github.com/CorentinTh/it-tools/blob/main/src/tools/rsa-key-pair-generator/rsa-key-pair-generator.service.ts)<br>`repository_source` | 无等价slug<br>`tools/security/index.ts`<br>`tools/developer/index.ts` | token、UUID 与 HMAC 都不是非对称密钥生成；本地未发现 RSA 导出。 | 否：独立能力<br>优先 WebCrypto；PKCS#8/SPKI PEM；安全位数默认；私钥不持久化；互操作向量 |
| G07 AES 文本加密 / 解密 | **缺失** · [官方1](https://it-tools.tech/encryption) / [官方2](https://github.com/CorentinTh/it-tools/blob/main/src/tools/encryption/index.ts)<br>`official_site_bundle_and_repository_index` | 无等价slug<br>`tools/security/index.ts`<br>`tools/developer/index.ts` | 本地 hash-generator 是单向摘要，不能替代可逆 AES；同行说明同时列出多种遗留算法，不代表应全部复制。 | 否：新增安全能力<br>认证加密模式优先；随机 IV/salt；口令派生与参数封装；篡改必须失败；不照搬弱算法默认 |
| G08 TOML ↔ JSON | **缺失** · [官方1](https://it-tools.tech/json-to-toml) / [官方2](https://github.com/CorentinTh/it-tools/blob/main/src/tools/json-to-toml/index.ts)<br>`official_site_bundle_and_repository_index` | `json-yaml-converter`<br>`tools/developer/json-yaml-converter.ts`<br>`tools/_engines/dev-engine-yaml.tsx` | 本地 JSON/YAML 转换没有 TOML 解析或序列化；反向 TOML-to-JSON 在官方仓库亦注册。 | 可扩展现有结构化数据转换组<br>维护中的 TOML 解析器；日期/大整数/空值映射说明；多语错误；往返测试 |
| G09 YAML ↔ TOML | **缺失** · [官方1](https://it-tools.tech/yaml-to-toml) / [官方2](https://github.com/CorentinTh/it-tools/blob/main/src/tools/yaml-to-toml/index.ts)<br>`official_site_bundle_and_repository_index` | `json-yaml-converter`<br>`tools/_engines/dev-engine-yaml.tsx` | YAML↔JSON 已有；TOML 与 YAML 的类型系统差异及往返不在现有工具中。 | 是：与 G08 共用解析内核，不重复引擎<br>复用 G08；明确多文档 YAML、tag、日期、null 的不兼容错误 |
| G10 docker run → Compose 配置 | **缺失** · [官方1](https://it-tools.tech/docker-run-to-docker-compose-converter) / [官方2](https://github.com/CorentinTh/it-tools/blob/main/src/tools/docker-run-to-docker-compose-converter/index.ts)<br>`official_site_bundle_and_repository_index` | 无等价slug<br>`tools/developer/index.ts` | 未发现 shell 命令解析和 Docker 参数到 Compose 的映射。 | 否：独立开发能力<br>shell 引号/转义解析；Compose schema；标明未支持 flags；只解析不执行命令 |
| G11 IBAN 校验与结构解析 | **缺失** · [官方1](https://it-tools.tech/iban-validator-and-parser) / [官方2](https://github.com/CorentinTh/it-tools/blob/main/src/tools/iban-validator-and-parser/index.ts)<br>`official_site_bundle_and_repository_index` | 无等价slug<br>`tools/security/index.ts`<br>`tools/calculators/index.ts` | email-validator 不能承担 IBAN 国家长度、MOD97 与 BBAN/QR-IBAN 结构解析。 | 否：独立校验器<br>授权清晰的 IBAN 国家格式表；MOD97；隐私提示；不宣称账户存在或收款人验证 |
| G12 MAC 地址厂商查询 | **缺失** · [官方1](https://it-tools.tech/mac-address-lookup) / [官方2](https://github.com/CorentinTh/it-tools/blob/main/src/tools/mac-address-lookup/index.ts)<br>`official_site_bundle_and_repository_index` | `ip-lookup`<br>`tools/security/ip-lookup.ts`<br>`tools/_engines/sec-engine-lookup.tsx` | IP 地理/ASN 查询不是 OUI 厂商查询；未发现 MAC 数据集。 | 可扩展网络查询组<br>IEEE/OUI 数据授权与更新日期；MA-L/MA-M/MA-S 匹配；本地随机地址提示；缓存/联网披露 |
| G13 MAC 测试地址生成 | **缺失** · [官方1](https://it-tools.tech/mac-address-generator) / [官方2](https://github.com/CorentinTh/it-tools/blob/main/src/tools/mac-address-generator/index.ts)<br>`official_site_bundle_and_repository_index` | `token-generator`<br>`tools/_engines/dev-engine-token.tsx` | 通用随机字符串未提供 MAC 六字节格式、前缀和位标志控制。 | 可复用随机字节内核<br>CSPRNG；本地管理/单播标志；只作测试；前缀校验；不可保证真实硬件唯一性 |
| G14 RFC4193 IPv6 ULA 前缀生成 | **缺失** · [官方1](https://it-tools.tech/ipv6-ula-generator) / [官方2](https://github.com/CorentinTh/it-tools/blob/main/src/tools/ipv6-ula-generator/index.ts)<br>`official_site_bundle_and_repository_index` | `ipv4-subnet-calculator`<br>`tools/calculators/ipv4-subnet-calculator.ts` | 本地有 IPv4 CIDR，但未发现 IPv6 ULA 生成。 | 否：新增 IPv6 能力<br>RFC4193 的 Global ID 生成与格式；CSPRNG；CIDR 向量；不承诺全球绝对无冲突 |
| G15 IPv4 地址区间展开 | **缺失** · [官方1](https://it-tools.tech/ipv4-range-expander) / [官方2](https://github.com/CorentinTh/it-tools/blob/main/src/tools/ipv4-range-expander/index.ts)<br>`official_site_bundle_and_repository_index` | `ipv4-subnet-calculator`<br>`tools/calculators/ipv4-subnet-calculator.ts`<br>`tools/_lib/subnet.ts` | 本地 CIDR 计算不是任意起止 IPv4 区间的逐地址导出。 | 是：可复用 IPv4 解析/输出选项<br>uint32 边界；倒序拒绝；最大展开数量/流式导出；不要对 /0 直接分配数组 |
| G16 UUID NIL / v1 / v3 / v5 与命名空间 | **部分** · [官方1](https://it-tools.tech/uuid-generator) / [官方2](https://github.com/CorentinTh/it-tools/blob/main/src/tools/uuid-generator/index.ts) / [源码3](https://github.com/CorentinTh/it-tools/blob/main/src/tools/uuid-generator/uuid-generator.vue)<br>`repository_source` | `uuid-generator`<br>`tools/developer/uuid-generator.ts`<br>`tools/_engines/dev-engine-uuid.tsx` | 本地只生成 v4；官方源码有 NIL、v1、v3、v4、v5。没有证据把 v7 列为此同行已支持。 | 是：版本选项<br>标准 UUID 库；v3/v5 namespace/name 向量；v1 隐私说明；保留本地 v4 500条能力 |
| G17 TOTP 注册密钥 / otpauth 导出二维码 / 相邻时间窗 | **部分** · [官方1](https://it-tools.tech/otp-generator) / [官方2](https://github.com/CorentinTh/it-tools/blob/main/src/tools/otp-code-generator-and-validator/index.ts) / [源码3](https://github.com/CorentinTh/it-tools/blob/main/src/tools/otp-code-generator-and-validator/otp-code-generator-and-validator.vue) / [源码4](https://github.com/CorentinTh/it-tools/blob/main/src/tools/otp-code-generator-and-validator/otp.service.ts)<br>`repository_source` | `totp-generator`, `qr-generator`<br>`tools/_engines/sec-engine-totp.tsx`<br>`tools/_lib/totp.ts`<br>`tools/_engines/calc-engine-qr.tsx` | 本地已能导入 otpauth，支持 SHA1/256/512、6/8位和30/60秒；真正差距是生成注册密钥、导出 URI/QR 和相邻窗口展示，不是 TOTP 从零缺失。 | 是：TOTP 现有选项并复用二维码<br>CSPRNG secret；URI转义；敏感参数不入URL/日志；RFC6238与二维码往返 |
| G18 MIME 类型与扩展名检索 | **既有** · [官方1](https://it-tools.tech/mime-types) / [官方2](https://github.com/CorentinTh/it-tools/blob/main/src/tools/mime-types/index.ts)<br>`official_site_bundle_and_repository_index` | `mime-types`<br>`tools/utility/mime-types.ts`<br>`tools/_engines/util-engine-mime.tsx` | 本地已有 MIME 工具；暂无证据支持新建同义路由。数据覆盖和 freshness 应另做数据审计。 | 已有工具，无需新增<br>维护数据表与双向检索回归 |
| G19 chmod 数字/符号权限 | **既有** · [官方1](https://it-tools.tech/chmod-calculator) / [官方2](https://github.com/CorentinTh/it-tools/blob/main/src/tools/chmod-calculator/index.ts)<br>`official_site_bundle_and_repository_index` | `chmod-calculator`<br>`tools/developer/chmod-calculator.ts`<br>`tools/_engines/dev-engine-chmod.tsx` | 本地已有 owner/group/other 位权限和数值输出；不凭目录名称声称缺失。 | 已有工具，无需新增<br>保留特殊权限位、输入非法值验收 |
| G20 Cron @daily 等别名 | **部分** · [官方1](https://it-tools.tech/crontab-generator) / [官方2](https://github.com/CorentinTh/it-tools/blob/main/src/tools/crontab-generator/index.ts) / [源码3](https://github.com/CorentinTh/it-tools/blob/main/src/tools/crontab-generator/crontab-generator.vue)<br>`repository_source` | `cron-explainer`<br>`tools/developer/cron-explainer.ts`<br>`tools/_lib/cron.ts` | 本地明确拒绝 @daily 简写；官方源码校验 alias=true 并列出 @yearly/@monthly/@weekly/@daily/@hourly。@reboot 只在帮助表出现，不能认定已调度执行。 | 是：现有 cron 解析扩展<br>将常见别名规范化到5段；@reboot标明非时间表；与 croner 下一次执行语义一致 |
| G21 任意二进制文件 ↔ Base64 下载 | **部分** · [官方1](https://it-tools.tech/base64-file-converter) / [官方2](https://github.com/CorentinTh/it-tools/blob/main/src/tools/base64-file-converter/index.ts) / [源码3](https://github.com/CorentinTh/it-tools/blob/main/src/tools/base64-file-converter/base64-file-converter.vue)<br>`repository_source` | `base64-encoder`, `base64-decoder`, `base64-image`<br>`tools/_engines/dev-engine-base64-image.tsx`<br>`tools/_engines/dev-engine-encoder.tsx`<br>`tools/_lib/converters.ts` | 本地文本 Base64 走 UTF-8，文件 UI 限 image/*，解码下载只接收 image MIME；不是任意二进制文件往返。 | 是：复用字节/下载内核，扩展文件模式<br>字节而非 TextDecoder；MIME/文件名校验；尺寸限额；0x00/0xff字节往返 |
| G22 Wi-Fi 二维码结构表单 | **部分** · [官方1](https://it-tools.tech/wifi-qrcode-generator) / [官方2](https://github.com/CorentinTh/it-tools/blob/main/src/tools/wifi-qr-code-generator/index.ts)<br>`official_site_bundle_and_repository_index` | `qr-generator`<br>`tools/_engines/calc-engine-qr.tsx` | 本地可编码任意文本并加 logo；用户手写 WIFI: 可实现编码，缺口只是 SSID/加密/隐藏网络字段与转义，不是 QR 算法。 | 是：现有二维码的输入模板<br>WIFI载荷转义；开放/WPA/WEP选项；二维码解码往返；密码不外发 |
| G23 国际电话号码解析与格式化 | **缺失** · [官方1](https://it-tools.tech/phone-parser-and-formatter) / [官方2](https://github.com/CorentinTh/it-tools/blob/main/src/tools/phone-parser-and-formatter/index.ts)<br>`official_site_bundle_and_repository_index` | 无等价slug<br>`tools/security/index.ts`<br>`tools/utility/index.ts` | 未发现按地区解析、E.164/国际/本地格式输出。 | 否：新增数据驱动工具<br>维护中的号码元数据包；地区选择；号码可能/有效≠真实已开通；按需加载 |
| G24 HTTP Basic Authorization 头构建 | **部分** · [官方1](https://it-tools.tech/basic-auth-generator) / [官方2](https://github.com/CorentinTh/it-tools/blob/main/src/tools/basic-auth-generator/index.ts)<br>`official_site_bundle_and_repository_index` | `base64-encoder`<br>`tools/_engines/dev-engine-encoder.tsx` | 手工 username:password 再 Base64 已可实现基础编码；缺少字段校验和 Authorization: Basic 封装。 | 是：现有编码器的模板选项<br>明确 UTF-8/Latin-1兼容约定；冒号用户名限制；凭据不入URL/日志 |
| G57 同行 SHA3 标签与 FIPS 202 SHA-3 / Keccak 的精确兼容性 | **未知** · [官方1](https://it-tools.tech/hash-text) / [官方2](https://github.com/CorentinTh/it-tools/blob/main/src/tools/hash-text/hash-text.vue)<br>`repository_source` | `hash-generator`<br>`tools/_engines/dev-engine-hash.tsx` | 本地未实现SHA3；同行源码只可确认import crypto-js的SHA3。未在本次研究中运行FIPS 202/Keccak独立向量，不能仅凭标签承诺算法精确等价。此条是G02算法兼容性待核实项，不额外计为新工具。 | 待核实：先确定算法名称与向量，再并入G02<br>确定输出位数/域分离/填充规范；分别用FIPS 202和Keccak独立向量核对；名称应显式区分 |

### PDF24

| ID / 能力 | 状态与官方证据 | 本地 slug / 源码 | 真正差距 | 现有选项？/ 实现依赖 |
|---|---|---|---|---|
| G25 扫描 PDF → 可搜索文本层 PDF | **部分** · [官方1](https://tools.pdf24.org/en/ocr-pdf)<br>`official_detail_page` | `ocr-pdf`<br>`tools/pdf/ocr-pdf.ts`<br>`tools/_engines/pdf-engine-ocr.tsx` | 本地 Tesseract 输出 TXT，未写回文本层；PDF24 详情说明可下载 searchable PDF，并可 PDF/A/去噪/纠偏。 | 是：OCR 结果输出模式，不能把TXT改后缀冒充PDF<br>OCR字框/坐标变换；Unicode字体；隐形文本层；搜索/复制语义验收；语言模型CDN披露 |
| G26 PDF → 可编辑文字/图片/形状 PPTX | **部分** · [官方1](https://tools.pdf24.org/en/pdf-to-powerpoint)<br>`official_detail_page` | `pdf-to-ppt`<br>`tools/pdf/pdf-to-ppt.ts`<br>`tools/_engines/pdf-engine-office.tsx` | 本地每页渲染 JPEG 后 addImage；可用的图像型 PPTX 已有，缺口只限元素级可编辑重建。 | 是：现有转换器的高级输出模式<br>PDF对象/坐标/字体映射；布局重建；可能需专用引擎/WASM/服务；复杂页降级应明确 |
| G27 已知密码的 PDF 解密/移除保护 | **部分** · [官方1](https://tools.pdf24.org/en/unlock-pdf)<br>`official_directory` | `unlock-pdf`<br>`tools/pdf/unlock-pdf.ts`<br>`tools/_engines/pdf-engine-protect.tsx` | 本地显式拒绝加密PDF，ignoreEncryption不是解密；路由存在但未覆盖已知密码解密。同行目录明确密码已知。 | 是：现有路由真实补能力<br>支持PDF加密的引擎如qpdf/WASM或受控服务；密码仅内存；授权文件；多种加密向量 |
| G28 PDF 添加密码和权限 | **缺失** · [官方1](https://tools.pdf24.org/en/lock-pdf)<br>`official_directory` | 无等价slug<br>`tools/pdf/index.ts`<br>`tools/_engines/pdf-engine-protect.tsx` | 未发现加密写出；flatten 表单不等于密码保护。 | 否：与G27共用安全PDF内核<br>受支持加密引擎；权限限制局限提示；密码确认；读写互操作 |
| G29 证书数字签名 | **部分** · [官方1](https://tools.pdf24.org/en/sign-pdf)<br>`official_directory` | `sign-pdf`<br>`tools/pdf/sign-pdf.ts`<br>`tools/_engines/pdf-engine-sign.tsx` | 本地手写/图片签名是页面视觉标记；未发现证书/CMS/ByteRange 数字签名。 | 是：sign-pdf的明确签名类型，不混用术语<br>PKCS#12/PKCS#7/CMS与PDF签名支持；私钥保护；增量写入；验签向量 |
| G30 PDF 数字签名验证 | **缺失** · [官方1](https://tools.pdf24.org/en/verify-pdf-signatures)<br>`official_directory` | 无等价slug<br>`tools/pdf/index.ts` | compare-pdf 像素差异不等于密码学验签；无签名者、ByteRange完整性与链路状态输出。 | 否：独立检查能力<br>CMS/X.509解析；信任库/撤销查询策略；区分完整性/身份可信/签署时间 |
| G31 PDF/A-2b 转换 | **缺失** · [官方1](https://tools.pdf24.org/en/pdf-to-pdfa)<br>`official_directory` | 无等价slug<br>`tools/pdf/index.ts` | 当前保存PDF没有建立PDF/A合规转换与验证，不能改元数据即宣称PDF/A。 | 否：专业格式能力<br>支持字体嵌入/ICC/合规的引擎；veraPDF等独立验证；样本库 |
| G32 PDF/A 与 PDF/UA 检查 | **缺失** · [官方1](https://tools.pdf24.org/en/validate-pdfa)<br>`official_directory` | 无等价slug<br>`tools/pdf/index.ts` | 未发现标准合规检查器；目录存在仅证明同行提供入口，不证明其覆盖所有配置文件或通过标准验收。 | 否：专业检查能力<br>验证引擎与profile版本；机器规则和人工无障碍检查分开；报告可定位 |
| G33 创建/编辑可填写 PDF 表单 | **缺失** · [官方1](https://tools.pdf24.org/en/make-pdf-fillable)<br>`official_directory` | `flatten-pdf`<br>`tools/_engines/pdf-engine-protect.tsx` | 已有 flatten 仅将现存表单扁平化；未发现文本框、复选框等表单字段的创建或编辑。 | 可复用PDF预览与AcroForm内核<br>AcroForm字段类型/命名/字体；键盘可访问；填值后跨阅读器重开 |
| G34 PDF 书签目录编辑 | **缺失** · [官方1](https://tools.pdf24.org/en/bookmark-pdf)<br>`official_directory` | 无等价slug<br>`tools/pdf/index.ts` | 页重排/拆分不是书签树增删改或目标页映射。 | 可扩展PDF组织工具组<br>Outline树和Dest重映射；嵌套/标题Unicode；重排后引用验证 |
| G35 每张多页 / 小册子拼版 | **缺失** · [官方1](https://tools.pdf24.org/en/pages-per-sheet)<br>`official_directory` | `rearrange-pdf-pages`<br>`tools/_engines/pdf-engine-pages.tsx` | 现有页重排只改变页序；未发现N-up缩放排版。PDF24另有create-pdf-booklet目录入口。 | 可复用页面复制/几何内核<br>页尺寸/旋转/裁切与边距；双面翻转/补空页；矢量保持；打印样本 |
| G36 PDF 线性化 / 快速网页查看 | **缺失** · [官方1](https://tools.pdf24.org/en/web-optimize-pdf)<br>`official_directory` | `compress-pdf`<br>`tools/_engines/pdf-engine-compress.tsx` | 现有压缩会重渲染/重编码，不等于linearization及首屏分段加载结构。 | 否：专业序列化选项<br>支持线性化的写出引擎；HTTP Range与结构验证；不要只检查体积 |
| G37 PDF 元数据移除 | **缺失** · [官方1](https://tools.pdf24.org/en/remove-pdf-metadata)<br>`official_directory` | `exif-remover`<br>`tools/pdf/index.ts`<br>`tools/image/exif-remover.ts` | 图片EXIF移除不处理PDF Info/XMP；未发现专门PDF清理入口。 | 可成为现有PDF工具的导出隐私选项<br>Info/XMP/附件等范围明确；保留必要结构；字节检查与重开验收 |
| G38 损坏 PDF 修复 | **缺失** · [官方1](https://tools.pdf24.org/en/repair-pdf)<br>`official_directory` | 无等价slug<br>`tools/pdf/index.ts` | 能读取部分PDF不等于诊断/重建xref和对象结构；未发现修复模式。 | 否：新能力，失败必须真实<br>成熟容错修复引擎；损坏语料；恢复范围报告；不可保证完全恢复 |
| G39 PDF → SVG 矢量输出 | **缺失** · [官方1](https://tools.pdf24.org/en/pdf-to-svg)<br>`official_directory` | `pdf-to-png`, `pdf-to-jpg`, `svg-converter`<br>`tools/_engines/pdf-engine-pdf-to-images.tsx`<br>`tools/image/svg-converter.ts` | 本地PDF导出PNG/JPG；图片SVG工具不是PDF页矢量重建。 | 可扩展PDF导出模式<br>PDF绘图指令到SVG；字体/clip/透明度；SVG净化；与光栅导出明确区分 |
| G40 保留布局/图像的 PDF → Word | **部分** · [官方1](https://tools.pdf24.org/en/pdf-to-word)<br>`official_directory` | `pdf-to-word`<br>`tools/_engines/pdf-engine-office.tsx`<br>`tools/_engines/pdf-text.ts` | 本地提取文字、推断标题/段落并构造DOCX；未重建图片/页布局。PDF24目录称可保留布局或重排，但未实测其保真度。 | 是：已有文本重排转换器的高级模式<br>图片/表格/字体/锚点布局；OCR分支；专用引擎依赖；明确降级输出 |
| G41 PDF 表格 → 有类型单元格/日期 Excel | **部分** · [官方1](https://tools.pdf24.org/en/pdf-to-excel)<br>`official_directory` | `pdf-to-excel`<br>`tools/_engines/pdf-engine-office.tsx`<br>`tools/_engines/pdf-text.ts` | 本地按行空隙拆文本并写Page/Content工作表；未见真正表格/数值日期类型重建。 | 是：已有提取模式的增强<br>表格边界/合并格/跨页解析；类型推断可关闭；公式注入防护；独立表格样本 |
| G42 PDF 合并 | **既有** · [官方1](https://tools.pdf24.org/en/merge-pdf)<br>`official_directory` | `merge-pdf`<br>`tools/_engines/pdf-engine-pages.tsx` | 本地已有合并；不把PDF24入口重复计算为新功能。书签、表单等文档级对象保留应另专项验收。 | 已有工具，无需新增<br>保留页数/页序/1基范围与加密拒绝回归 |
| G43 PDF 按页/范围拆分 | **既有** · [官方1](https://tools.pdf24.org/en/split-pdf)<br>`official_directory` | `split-pdf`<br>`tools/_engines/pdf-engine-pages.tsx`<br>`tools/pdf/index.ts` | 本地已有拆分；目录层证据不足以证明所有模式差异，所以仅确认基础重合。 | 已有工具，无需新增<br>保留合法/非法范围、每N页1基命名回归 |
| G44 PDF 表单扁平化 | **既有** · [官方1](https://tools.pdf24.org/en/flatten-pdf)<br>`official_directory` | `flatten-pdf`<br>`tools/_engines/pdf-engine-protect.tsx` | 本地getForm().flatten已实现；不是所有PDF内容变为不可编辑，也不是加密。 | 已有工具，无需新增<br>现存字段值/外观；无表单/加密输入真实提示 |
| G45 提取 PDF 嵌入图片 | **既有** · [官方1](https://tools.pdf24.org/en/extract-images)<br>`official_directory` | `extract-images-pdf`<br>`tools/_engines/pdf-engine-extract-images.tsx` | 本地提取嵌入位图而非页截图；基础能力存在，不能与PDF转JPG混为一项缺口。 | 已有工具，无需新增<br>嵌入位图原始尺寸/像素检查；跳过字体/矢量须披露 |

### OmniCalculator

| ID / 能力 | 状态与官方证据 | 本地 slug / 源码 | 真正差距 | 现有选项？/ 实现依赖 |
|---|---|---|---|---|
| G46 可配置存入时点/频率/年增长率的复利 | **部分** · [官方1](https://www.omnicalculator.com/finance/compound-interest)<br>`official_detail_page` | `compound-interest-calculator`<br>`tools/_engines/calc-engine-compound.tsx`<br>`tools/_lib/finance.ts` | 本地本金+固定月初存入、月/季/年复利已有；官网详情另列存入频率、期初/期末和存入年增长率。只补这些参数，不重建复利路由。 | 是：已有复利计算器选项<br>明确现金流时点/利率口径；封闭公式独立核对；0利率/短期/大数；非理财建议 |
| G47 按现金流求 IRR | **缺失** · [官方1](https://www.omnicalculator.com/finance/internal-rate-of-return)<br>`official_detail_page` | `profit-calculator`, `compound-interest-calculator`, `break-even-calculator`<br>`tools/_lib/finance.ts`<br>`tools/calculators/index.ts` | 现有利润率、复利与盈亏平衡不求令NPV=0的折现率；未发现IRR求根内核。 | 否：新增金融数学能力<br>现金流序列；可靠求根/区间与迭代上限；无根/多根提示；不要擅自称XIRR |
| G48 总体/样本标准差及步骤 | **缺失** · [官方1](https://www.omnicalculator.com/math/standard-deviation)<br>`official_detail_page` | `scientific-calculator`, `grade-calculator`<br>`tools/_engines/calc-engine-scientific.tsx`<br>`tools/utility/grade-calculator.ts` | 通用科学表达式计算与加权成绩不是列表数据的样本/总体标准差工具；未发现对应统计函数。 | 否：可建统计引擎而非每公式新造一套<br>稳定在线/双遍算法；N与N-1选择；空/单值/非有限值；大偏移小方差独立对照 |

### CyberChef

| ID / 能力 | 状态与官方证据 | 本地 slug / 源码 | 真正差距 | 现有选项？/ 实现依赖 |
|---|---|---|---|---|
| G49 多操作配方 / 保存加载 / 逐步执行 | **缺失** · [官方1](https://gchq.github.io/CyberChef/) / [官方2](https://gchq.github.io/CyberChef/assets/main.js)<br>`official_deployed_operation_directory` | 无等价slug<br>`tools/registry.ts`<br>`tools/_lib/transform-registry.ts` | 本地独立工具路由没有用户编排转换链、保存参数化配方或逐步查看中间输出。官方HTML明确描述Recipe流程；它不是新增几十个算法。 | 否：跨工具工作流层<br>仅允许注册的纯转换ID；参数schema；Worker取消/预算；配方URL不得默认携带敏感输入；不可执行任意JS |
| G50 原始字节 Base58 编码/解码 | **缺失** · [官方1](https://gchq.github.io/CyberChef/?op=From%20Base58) / [官方2](https://gchq.github.io/CyberChef/assets/main.js)<br>`official_deployed_operation_directory` | `base64-encoder`, `base64-decoder`, `binary-converter`<br>`tools/_engines/dev-engine-encoder.tsx`<br>`tools/_engines/calc-engine-converters.tsx` | 文本Base64和整数进制不是任意字节Base58；官方目录含To/From Base58，配置说明支持可选alphabet。 | 是：复用字节编码器并加协议选项<br>固定alphabet契约；前导零字节；无效字符；字节往返；不要把整数base58自动当比特币编码 |
| G51 Gzip / Gunzip / Zlib 二进制压缩解压 | **缺失** · [官方1](https://gchq.github.io/CyberChef/?op=Gzip) / [官方2](https://gchq.github.io/CyberChef/assets/main.js)<br>`official_deployed_operation_directory` | 无等价slug<br>`tools/developer/index.ts`<br>`tools/_engines/dev-engine-sheet.tsx` | JSZip用于打包现有结果不等于给用户提供gzip/zlib原始字节转换；未发现对应工具模式。 | 可复用文件转换组<br>CompressionStream能力检测或懒加载压缩库；解压后最大字节/比率；格式头校验；压缩炸弹限制 |
| G52 输入字节的 Shannon 熵与频率分析 | **缺失** · [官方1](https://gchq.github.io/CyberChef/?op=Entropy) / [官方2](https://gchq.github.io/CyberChef/assets/main.js)<br>`official_deployed_operation_directory` | `password-strength`, `token-generator`<br>`tools/_engines/sec-engine-strength.tsx`<br>`tools/_engines/dev-engine-token.tsx` | 口令强度估计或生成token理论熵不等于输入数据256字节频率的Shannon熵；官方操作说明0–8 bits/byte语义。 | 否：数据分析能力<br>字节直方图；空/单字节/均匀分布向量；样本长度与估计局限；不能把高熵等同加密 |
| G53 PEM / DER X.509 证书解析 | **缺失** · [官方1](https://gchq.github.io/CyberChef/?op=Parse%20X.509%20certificate) / [官方2](https://gchq.github.io/CyberChef/assets/main.js)<br>`official_deployed_operation_directory` | 无等价slug<br>`tools/security/index.ts`<br>`tools/developer/index.ts` | 未发现证书主体/签发者/有效期/SAN/公钥等ASN.1解析；DNS/IP查询不等价。 | 否：与RSA/验签共用证书基础<br>懒加载ASN.1/X.509库；PEM/DER大小和嵌套限额；解析不等于信任链验证；过期时间明确时区 |
| G54 字节 XOR 变换 | **缺失** · [官方1](https://gchq.github.io/CyberChef/?op=XOR) / [官方2](https://gchq.github.io/CyberChef/assets/main.js)<br>`official_deployed_operation_directory` | `binary-converter`<br>`tools/_engines/calc-engine-converters.tsx` | 现有进制转换只改变表示，不执行密钥字节XOR；官方Encryption/Encoding及Arithmetic目录均列XOR。 | 可扩展字节分析转换器<br>字符/Hex/Base64密钥输入；重复密钥和长度契约；空密钥拒绝；双次往返；不宣传为安全加密 |
| G55 Magic 自动识别与有限深度解码建议 | **缺失** · [官方1](https://gchq.github.io/CyberChef/?op=Magic) / [官方2](https://gchq.github.io/CyberChef/assets/main.js)<br>`official_deployed_operation_directory` | 无等价slug<br>`tools/_lib/transform-registry.ts`<br>`tools/developer/index.ts` | 本地工具需用户选路由；未见多编码候选侦测及递归配方建议。官方配置明确depth/intensive等受限搜索。 | 否：依赖已有转换内核的分析层<br>先完成字节编码器；候选评分；深度/分支/耗时上限；Worker取消；误检提示；不自动执行高成本分支 |
| G56 JWT 签名验证 | **缺失** · [官方1](https://gchq.github.io/CyberChef/?op=JWT%20Verify) / [官方2](https://gchq.github.io/CyberChef/assets/main.js)<br>`official_deployed_operation_directory` | `jwt-decoder`, `hmac-generator`<br>`tools/developer/jwt-decoder.ts`<br>`tools/_engines/dev-engine-encoder.tsx`<br>`tools/_engines/dev-engine-hmac.tsx` | 本地JWT明确只解码、不验签；HMAC输出不能替代JWT算法白名单、签名和claims语义核验。官方目录分列JWT Decode/Sign/Verify。 | 是：现有JWT工具的明确模式<br>维护良好的JOSE实现或WebCrypto；固定算法白名单；拒绝alg=none和混淆；kid仅作标识不任意联网；claims时钟/受众参数 |

## 官方来源记录

- **S01 IT-Tools官网**：[证据入口](https://it-tools.tech/)。SPA页面标题、canonical与部署JS路径
- **S02 IT-Tools官方部署目录元数据**：[证据入口](https://it-tools.tech/assets/index-61effc08.js)。实际部署JS前999999字符，含英语目录名称、description、route及按需模块链接；不视为全量脚本审计
- **S03 IT-Tools官方GitHub仓库**：[证据入口](https://github.com/CorentinTh/it-tools)。官方main ZIP读取README和工具index，并针对hash/base/UUID/OTP/RSA/cron/base64读取Vue/TS；未运行其应用 官方ZIP：[下载端点](https://codeload.github.com/CorentinTh/it-tools/zip/refs/heads/main)。
- **S04 PDF24官方完整目录**：[证据入口](https://tools.pdf24.org/en/all-tools)。读取分类目录、能力说明与目标链接；不采信投票分数或营销数字
- **S05 PDF24 OCR详情**：[证据入口](https://tools.pdf24.org/en/ocr-pdf)。searchable PDF、PDF/A、去噪/纠偏规格及服务端处理说明
- **S06 PDF24 PowerPoint详情**：[证据入口](https://tools.pdf24.org/en/pdf-to-powerpoint)。宣称文字框/图片/形状可编辑；服务端转换；未上传验证
- **S07 Omni复利详情**：[证据入口](https://www.omnicalculator.com/finance/compound-interest)。参数频率、期初期末、存入增长率与解释，非互动验算
- **S08 Omni IRR详情**：[证据入口](https://www.omnicalculator.com/finance/internal-rate-of-return)。NPV=0定义、现金流与求根说明；/finance/irr为404，未当正确入口
- **S09 Omni标准差详情**：[证据入口](https://www.omnicalculator.com/math/standard-deviation)。总体/样本标准差和计算步骤
- **S10 CyberChef官方部署首页**：[证据入口](https://gchq.github.io/CyberChef/)。读取原始HTML的Operations/Recipe/Input说明、保存/加载配方、字符编码、逐步执行与本地输入说明；目录异步加载
- **S11 CyberChef官方部署操作目录与配置**：[证据入口](https://gchq.github.io/CyberChef/assets/main.js)。以HTTP Range读取官方13,000,000起约400KB片段，实际解析17分类JSON；另读10,000,000起片段核对Base58/Gzip/Entropy/X.509/Magic配置说明。只研究选定操作，不宣称穷尽全目录或执行成功。首页版本标识e201adaf6de73b4692d5d21ae484f4639da288a2；部署资源可变，以访问日为准。

## 后续验收边界

本报告只完成静态能力盘点与依赖识别。任何实际实现仍按工程规范完成纯函数测试、合法/畸形文件字节测试、独立向量或公式对照、浏览器真实交互及五语/现有十五语界面契约检查。不得将本报告的目录证据转换为“同行已通过实测”或“本地已达到同等精度”的说法。

国内场景报告保留原文件，不在此重写；共享的CRC/中国政策/行政区划等问题应回到该报告的对应证据与政策核实流程。本报告没有commit、push、deploy或生产代码变更。
