# Zoyku 中国用户工具竞争缺口目录

研究日期：2026-11-20（Asia/Shanghai）
代码基准：`dccdbfd`；写入时分支：`codex/tool-parity-cn`。本次只写本报告及同名 JSON，不改生产代码。

## 结论和口径

核对 `tools/registry.ts`、各分类注册表、205 个带字面 slug 的工具定义以及相关 `_engines` / `_lib` 后，整理 **47 项能力**：**29 项未发现等价实现、16 项已有基础且有具体差距、2 项已有基础且无证据应重建**。前两类合计 45 个能力缺口，分属 19 个实现组。这里的“项”是能力粒度，**不是新增路由数**；拼音/首字母、身份证解析/测试样本、国密的不同模式应复用同组内核。

同行“有”指其官方目录或说明页可证明宣称该能力；本次没有把目录存在等同于功能正确，也没有进行全部工具的浏览器验算。已有质量比较是“可见能力 vs. Zoyku 实现”的比较，不能据此宣称同行整体质量更高。

现有容易误判的能力已排除：`case-converter` 有全角/半角；`mortgage-calculator` 有 CNY 和每月额外还款；`text-to-unicode` / `text-to-binary` 有基础双向转换；`vat-calculator` 有通用价税分离。具体缺口见对应条目，不能按名称不同重复建设。

## 建议先后

先完成身份证校验解析、统一社会信用代码、人民币大写、拼音/简繁、字符集/进制、SM3/CRC，以及中国日历和行政区划基础。税社保和退休虽列 P0，**发布门槛是官方有效规则与年份/地区数据复核**，不能直接搬同行税率。之后复用内核补测试样本、农历生日/拼假、SM2/SM4、公积金/组合贷/一次性提前还贷。复杂房产税费与号段数据放在可核实来源和授权之后。

优先级计数：P0 17 项、P1 24 项、P2 4 项；KEEP 2 项。次序为阶段优先级内的建议实施序号；依据是依赖、可验证性与维护成本，不是搜索量或收入。

## 证据限制

- 研究范围为能力存在性与可见规格比较，非搜索需求、收入/流量预测或同行全站穷尽清单；47项是本报告能力条目，不是承诺新增47个SEO路由。
- 29项missing表示在205个工具定义、分类注册表及相关引擎/纯函数扫描中未发现等价能力；16项partial有明确已有slug，缺口仅限列明的参数/算法/本地数据；2项existing_no_proven_gap应保留复用。
- 同行证据分detail_page与directory_listing。目录级只证明页面描述与链接存在，未逐一打开、点击或独立验算；详细页级也未做完整浏览器交互、准确率、安全审计或性能比较。
- 已按代码检查避免名称误判：case-converter含全角/半角；mortgage-calculator含CNY和每月额外还款；text-to-unicode及text-to-binary已有基础；VAT已有通用加税/拆税。
- BEJSON首页因robots明确禁止自动访问而未能查看；不把其能力、工具计数或页面内容当证据。人民银行主页也被robots拒绝，人民币规则原文需实施前人工/允许方式核对。
- Exa返回401 Invalid API key；通用搜索给出不相关结果，另一批搜索未及时返回被中止；web.run未返回可用来源。本报告不使用这些搜索结果，主证据为直连官方产品页面。
- 政府网、税务总局、民政部、中国邮政主页可读；国家标准与人社主页返回HTML简化失败。权威主页URL是后续政策/数据查证入口，不代表已拿到逐条有效政策或数据授权。
- 不复制同行正文、源码、商业字典或身份记录；报告为能力/验收规格的原创归纳。身份证、信用代码等生成只规划带“仅供测试”标注的规则样本，不声明真实存在或保证不撞号。
- 优先级依据场景贴合、依赖复用、可验证性和维护成本，无搜索量、收入、转化率、同行数量等未经验证数字。政策/数据无法核实时保持未支持或手动输入，不能自动冒充最新。

## 能力总表

| 编号 | 能力中文名 | Zoyku 对应 | 状态 | 优先级/次序 | 纯本地实现 |
| --- | --- | --- | --- | --- | --- |
| CN-001 | 居民身份证格式校验与信息解析 | 缺失 | 缺失 | P0 / 1 | 可，需版本化字典/政策/数据 |
| CN-002 | 身份证校验规则测试样本 | 缺失 | 缺失 | P1 / 18 | 可，需版本化字典/政策/数据 |
| CN-003 | 统一社会信用代码格式校验与分段解析 | 缺失 | 缺失 | P0 / 2 | 可，需版本化字典/政策/数据 |
| CN-004 | 统一社会信用代码测试样本与中文Mock导出 | 缺失 | 缺失 | P1 / 19 | 可，需版本化字典/政策/数据 |
| CN-005 | 人民币金额大写 | 缺失 | 缺失 | P0 / 3 | 可 |
| CN-006 | 中文数字/财务大写反向转阿拉伯数字 | 缺失 | 缺失 | P1 / 20 | 可 |
| CN-007 | 公历农历双向转换 | 缺失 | 缺失 | P0 / 4 | 可，需版本化字典/政策/数据 |
| CN-008 | 中国法定节假日和调休工作日计算 | `workdays-calculator` | 已有基础/需增强 | P0 / 5 | 可，需版本化字典/政策/数据 |
| CN-009 | 年度放假调休总览与拼假方案 | 缺失 | 缺失 | P1 / 21 | 可，需版本化字典/政策/数据 |
| CN-010 | 农历生日与下次农历生日倒计时 | `age-calculator` | 已有基础/需增强 | P1 / 22 | 可，需版本化字典/政策/数据 |
| CN-011 | 二十四节气、干支和生肖的历法说明 | 缺失 | 缺失 | P1 / 23 | 可，需版本化字典/政策/数据 |
| CN-012 | 省市县行政区划和历史代码查询 | 缺失 | 缺失 | P0 / 6 | 可，需版本化字典/政策/数据 |
| CN-013 | 地区邮政编码与电话区号查询/反查 | 缺失 | 缺失 | P1 / 24 | 可，需版本化字典/政策/数据 |
| CN-014 | 汉字转拼音与多音字校正 | 缺失 | 缺失 | P0 / 7 | 可，需版本化字典/政策/数据 |
| CN-015 | 汉字拼音首字母缩写 | 缺失 | 缺失 | P1 / 25 | 可，需版本化字典/政策/数据 |
| CN-016 | 简体/繁体及台湾香港地区转换 | 缺失 | 缺失 | P0 / 8 | 可，需版本化字典/政策/数据 |
| CN-017 | 中文姓名/地址等本地Mock字段 | 缺失 | 缺失 | P1 / 26 | 可，需版本化字典/政策/数据 |
| CN-018 | 简体中文/繁体中文占位假文 | `lorem-ipsum-generator` | 已有基础/需增强 | P1 / 27 | 可，需版本化字典/政策/数据 |
| CN-019 | GBK/GB18030等中文字符集编码转换 | `text-to-binary`、`base64-encoder`、`base64-decoder` | 已有基础/需增强 | P0 / 9 | 可，需版本化字典/政策/数据 |
| CN-020 | 文本/二进制文件与HEX互转 | `text-to-binary`、`text-to-unicode` | 已有基础/需增强 | P1 / 28 | 可 |
| CN-021 | Base64的中文字符集与原始字节模式 | `base64-encoder`、`base64-decoder`、`base64-image` | 已有基础/需增强 | P1 / 29 | 可，需版本化字典/政策/数据 |
| CN-022 | 2到36进制及小数互转 | `binary-converter` | 已有基础/需增强 | P0 / 10 | 可 |
| CN-023 | IEEE754浮点位模式和大小端转换 | `binary-converter` | 已有基础/需增强 | P1 / 30 | 可 |
| CN-024 | 国密SM3摘要及HMAC-SM3 | 缺失 | 缺失 | P0 / 11 | 可 |
| CN-025 | 国密SM2加密解密与密钥格式 | 缺失 | 缺失 | P1 / 31 | 可 |
| CN-026 | 国密SM2签名验签及用户ID | 缺失 | 缺失 | P1 / 32 | 可 |
| CN-027 | 国密SM4加密解密与模式参数 | 缺失 | 缺失 | P1 / 33 | 可 |
| CN-028 | CRC16-Modbus及协议校验字节序 | 缺失 | 缺失 | P0 / 12 | 可 |
| CN-029 | BCC异或/LRC纵向冗余校验 | 缺失 | 缺失 | P1 / 34 | 可 |
| CN-030 | 中国工资薪金累计预扣与年度个税 | `income-tax-calculator` | 已有基础/需增强 | P0 / 13 | 可，需版本化字典/政策/数据 |
| CN-031 | 年终奖单独/并入综合所得对比 | 缺失 | 缺失 | P1 / 35 | 可，需版本化字典/政策/数据 |
| CN-032 | 五险一金个人/单位成本测算 | 缺失 | 缺失 | P0 / 14 | 可，需版本化字典/政策/数据 |
| CN-033 | 渐进式延迟退休年龄/日期查询 | `retirement-calculator` | 已有基础/需增强 | P0 / 15 | 可，需版本化字典/政策/数据 |
| CN-034 | 中国增值税价税分离及分币闭合 | `vat-calculator`、`gst-calculator` | 已有基础/需增强 | P0 / 16 | 可，需版本化字典/政策/数据 |
| CN-035 | 城建税/教育费附加等附加税费 | 缺失 | 缺失 | P1 / 36 | 可，需版本化字典/政策/数据 |
| CN-036 | 二手住房买卖税费分项 | 缺失 | 缺失 | P2 / 42 | 可，需版本化字典/政策/数据 |
| CN-037 | 中国房贷等额本金与等额本息对比 | `mortgage-calculator`、`loan-calculator`、`amortization-calculator` | 已有基础/需增强 | P0 / 17 | 可 |
| CN-038 | 住房公积金贷款场景 | `mortgage-calculator` | 已有基础/需增强 | P1 / 37 | 可，需版本化字典/政策/数据 |
| CN-039 | 商业贷+公积金组合贷 | `mortgage-calculator` | 已有基础/需增强 | P1 / 38 | 可 |
| CN-040 | 一次性提前还贷、缩期/减供及重算 | `mortgage-calculator` | 已有基础/需增强 | P1 / 39 | 可 |
| CN-041 | 车牌简称/发牌地区查询 | 缺失 | 缺失 | P2 / 43 | 可，需版本化字典/政策/数据 |
| CN-042 | 手机号原始号段归属地查询 | 缺失 | 缺失 | P2 / 44 | 可，需版本化字典/政策/数据 |
| CN-043 | 满减凑单与多张券到手价 | `discount-calculator` | 已有基础/需增强 | P1 / 40 | 可 |
| CN-044 | 中英文/数字之间自动加空格 | 缺失 | 缺失 | P1 / 41 | 可 |
| CN-045 | 中国大陆盲文翻译/输入辅助 | 缺失 | 缺失 | P2 / 45 | 可，需版本化字典/政策/数据 |
| CN-046 | 全角/半角双向转换（已有，勿重复造） | `case-converter`、`fancy-text-generator` | 已有/暂无可证明缺口 | KEEP / 46 | 可 |
| CN-047 | Unicode转义与文本二进制（已有基础） | `text-to-unicode`、`text-to-binary` | 已有/暂无可证明缺口 | KEEP / 47 | 可 |

## 各项差距与验收要求

### CN-001 居民身份证格式校验与信息解析

- **同行官方 URL**：[https://www.lddgo.net/common/identity](https://www.lddgo.net/common/identity)；[https://www.toolbox365.cn/tools/id-card/](https://www.toolbox365.cn/tools/id-card/)。
- **证据级别**：已读取详情页；未作完整交互验算。
- **Zoyku 对应 slug / 状态**：缺失；缺失。
- **代码核对**：`tools/registry.ts`、`tools/text/index.ts`、`tools/calculators/index.ts`、`tools/developer/index.ts`、`tools/security/index.ts`、`tools/unit/index.ts`。205个工具定义及分类注册表；同时检索_lib与_engines，未发现等价能力。
- **实际可证明差距**：未发现身份证引擎。同行详细页提供15/18位、校验结果、出生年月/性别/编码地区以及单条/批量；只能解析编码信息，不能声称查到实际户籍、姓名或住址。
- **数据源 / 法规更新要求**：实施前核对公民身份号码现行标准；行政区划保留数据日期、历史撤并码及来源。格式/校验通过只说明规则成立，不证明身份存在，不作实名验证。 后续权威入口：[https://openstd.samr.gov.cn/](https://openstd.samr.gov.cn/)、[https://www.mca.gov.cn/](https://www.mca.gov.cn/)。
- **建议次序**：P0 / 1；实现组 `cn-identity`。新增本地身份证工具组，先校验和解析再做批量。
- **是否可纯本地实现**：可，须随版本发布并维护所需字典/年度/地区政策数据；不表示无需前期数据授权与来源核实。
- **质量验收重点**：日期真伪、末位x/X、15位策略、闰日、历史地区、全角输入、错误定位与批量逐行结果；不得把未知地区误报为身份伪造。

### CN-002 身份证校验规则测试样本

- **同行官方 URL**：[https://www.lddgo.net/common/idgenerator](https://www.lddgo.net/common/idgenerator)。
- **证据级别**：已读取详情页；未作完整交互验算。
- **Zoyku 对应 slug / 状态**：缺失；缺失。
- **代码核对**：`tools/registry.ts`、`tools/text/index.ts`、`tools/calculators/index.ts`、`tools/developer/index.ts`、`tools/security/index.ts`、`tools/unit/index.ts`。205个工具定义及分类注册表；同时检索_lib与_engines，未发现等价能力。
- **实际可证明差距**：现有random-number、token-generator不按身份证编码规则构造样本；同行支持地区/生日/性别/数量和批量输出，并明确仅供学习测试。
- **数据源 / 法规更新要求**：实施前核对公民身份号码现行标准；行政区划保留数据日期、历史撤并码及来源。格式/校验通过只说明规则成立，不证明身份存在，不作实名验证。 后续权威入口：[https://openstd.samr.gov.cn/](https://openstd.samr.gov.cn/)、[https://www.mca.gov.cn/](https://www.mca.gov.cn/)。
- **建议次序**：P1 / 18；实现组 `cn-identity`。同组增加醒目标注“仅供测试”的规则样本，不单独许诺身份生成。
- **是否可纯本地实现**：可，须随版本发布并维护所需字典/年度/地区政策数据；不表示无需前期数据授权与来源核实。
- **质量验收重点**：提供正例和故意损坏校验位/日期的反例；每条标明虚构测试用途；不声称号码真实、未分配或与真人绝不重合，不附真实身份记录。

### CN-003 统一社会信用代码格式校验与分段解析

- **同行官方 URL**：[https://www.yunfale.com/credit-code-check/](https://www.yunfale.com/credit-code-check/)。
- **证据级别**：已读取详情页；未作完整交互验算。
- **Zoyku 对应 slug / 状态**：缺失；缺失。
- **代码核对**：`tools/registry.ts`、`tools/text/index.ts`、`tools/calculators/index.ts`、`tools/developer/index.ts`、`tools/security/index.ts`、`tools/unit/index.ts`。205个工具定义及分类注册表；同时检索_lib与_engines，未发现等价能力。
- **实际可证明差距**：无18位统一社会信用代码校验。同行详细页可检查允许字符、校验位、预期末位并说明各段；其页面明确不查企业登记信息。
- **数据源 / 法规更新要求**：实施前核对统一社会信用代码现行标准及登记部门/机构类别字典；候选依据GB 32100-2015须确认未被替代。校验通过不证明企业存在、在营或信用状况。 后续权威入口：[https://openstd.samr.gov.cn/](https://openstd.samr.gov.cn/)。
- **建议次序**：P0 / 2；实现组 `cn-credit-code`。新增本地统一社会信用代码校验。
- **是否可纯本地实现**：可，须随版本发布并维护所需字典/年度/地区政策数据；不表示无需前期数据授权与来源核实。
- **质量验收重点**：独立标准向量、大小写/全角/空白策略、非法字母、错一位、纯格式与登记真实性分开；不上传输入或写入可分享URL默认参数。

### CN-004 统一社会信用代码测试样本与中文Mock导出

- **同行官方 URL**：[https://www.toolbox365.cn/tools/mock-data/](https://www.toolbox365.cn/tools/mock-data/)。
- **证据级别**：已读取详情页；未作完整交互验算。
- **Zoyku 对应 slug / 状态**：缺失；缺失。
- **代码核对**：`tools/registry.ts`、`tools/text/index.ts`、`tools/calculators/index.ts`、`tools/developer/index.ts`、`tools/security/index.ts`、`tools/unit/index.ts`。205个工具定义及分类注册表；同时检索_lib与_engines，未发现等价能力。
- **实际可证明差距**：现有UUID、随机数和token无统一社会信用代码字段。同行Mock详细页包含该校验规则字段和JSON/JSONL/CSV/SQL输出。
- **数据源 / 法规更新要求**：实施前核对统一社会信用代码现行标准及登记部门/机构类别字典；候选依据GB 32100-2015须确认未被替代。校验通过不证明企业存在、在营或信用状况。 后续权威入口：[https://openstd.samr.gov.cn/](https://openstd.samr.gov.cn/)。
- **建议次序**：P1 / 19；实现组 `cn-mock-data`。复用校验器构造明确虚构的测试字段，不另造“企业查询”。
- **是否可纯本地实现**：可，须随版本发布并维护所需字典/年度/地区政策数据；不表示无需前期数据授权与来源核实。
- **质量验收重点**：校验样本和反例可控、CSV中文BOM可选、SQL标识符安全引用、输出数量与完整下载一致；不承诺真实机构。

### CN-005 人民币金额大写

- **同行官方 URL**：[https://www.lddgo.net/convert/numberupper](https://www.lddgo.net/convert/numberupper)；[https://www.toolbox365.cn/tools/numcn/](https://www.toolbox365.cn/tools/numcn/)。
- **证据级别**：已读取官方目录描述和目标链接；目标页未逐项操作。
- **Zoyku 对应 slug / 状态**：缺失；缺失。
- **代码核对**：`tools/registry.ts`、`tools/text/index.ts`、`tools/calculators/index.ts`、`tools/developer/index.ts`、`tools/security/index.ts`、`tools/unit/index.ts`。205个工具定义及分类注册表；同时检索_lib与_engines，未发现等价能力。
- **实际可证明差距**：没有壹贰叁、元角分、整等人民币金额转换；roman-numeral仅罗马数字，不能算同类已覆盖。
- **数据源 / 法规更新要求**：按正式支付结算/票据人民币大写规则建立独立算例；明确角分、整/正、零、负数、上限和舍入。人民银行主页本次robots拒绝，具体规则原文尚须补验。 后续权威入口：[https://www.pbc.gov.cn/](https://www.pbc.gov.cn/)。
- **建议次序**：P0 / 3；实现组 `cn-number`。新增本地人民币金额大写。
- **是否可纯本地实现**：可，算法本地执行；不表示无需前期数据授权与来源核实。
- **质量验收重点**：十进制定点处理；0、零角有分、跨万亿、连续零、负数、超大金额、小数超过分和舍入策略均有独立算例。

### CN-006 中文数字/财务大写反向转阿拉伯数字

- **同行官方 URL**：[https://www.lddgo.net/convert/chinese-number-to-arabic-number](https://www.lddgo.net/convert/chinese-number-to-arabic-number)。
- **证据级别**：已读取官方目录描述和目标链接；目标页未逐项操作。
- **Zoyku 对应 slug / 状态**：缺失；缺失。
- **代码核对**：`tools/registry.ts`、`tools/text/index.ts`、`tools/calculators/index.ts`、`tools/developer/index.ts`、`tools/security/index.ts`、`tools/unit/index.ts`。205个工具定义及分类注册表；同时检索_lib与_engines，未发现等价能力。
- **实际可证明差距**：无一二三/壹贰叁到数值解析；同行目录明确双类中文数字输入并可复制/下载。
- **数据源 / 法规更新要求**：按正式支付结算/票据人民币大写规则建立独立算例；明确角分、整/正、零、负数、上限和舍入。人民银行主页本次robots拒绝，具体规则原文尚须补验。 后续权威入口：[https://www.pbc.gov.cn/](https://www.pbc.gov.cn/)。
- **建议次序**：P1 / 20；实现组 `cn-number`。与人民币大写共用规范化与大整数内核。
- **是否可纯本地实现**：可，算法本地执行；不表示无需前期数据授权与来源核实。
- **质量验收重点**：区分普通数量词与金额；两/〇/零、拾佰仟万亿组合、重复单位和歧义输入显式报错，不猜测修复金额。

### CN-007 公历农历双向转换

- **同行官方 URL**：[https://www.lddgo.net/common/lunar](https://www.lddgo.net/common/lunar)。
- **证据级别**：已读取详情页；未作完整交互验算。
- **Zoyku 对应 slug / 状态**：缺失；缺失。
- **代码核对**：`tools/_engines/calc-engine-date.tsx`。205个工具定义及分类注册表；同时检索_lib与_engines，未发现等价能力。
- **实际可证明差距**：age-calculator/date-calculator只处理公历Date与ISO输入。同行提供双向转换、闰月/大小月判断及农历相关信息。
- **数据源 / 法规更新要求**：农历按现行农历编算标准核对，明示覆盖年份、时区、闰月及生肖起点；法定放假与调休必须逐年绑定国务院办公厅通知，超出已发布年份标为未知，不能按周末预测冒充官方安排。 后续权威入口：[https://www.gov.cn/](https://www.gov.cn/)、[https://openstd.samr.gov.cn/](https://openstd.samr.gov.cn/)。
- **建议次序**：P0 / 4；实现组 `cn-calendar`。新增农历核心后供其他日期工具复用。
- **是否可纯本地实现**：可，须随版本发布并维护所需字典/年度/地区政策数据；不表示无需前期数据授权与来源核实。
- **质量验收重点**：明确年份覆盖与北京时间；闰月往返、月末、春节、世纪边界独立历表核对；不把未覆盖年份算出看似有效结果。

### CN-008 中国法定节假日和调休工作日计算

- **同行官方 URL**：[https://www.lddgo.net/common/workday](https://www.lddgo.net/common/workday)。
- **证据级别**：已读取详情页；未作完整交互验算。
- **Zoyku 对应 slug / 状态**：`workdays-calculator`；已有基础/需增强。
- **代码核对**：`tools/_lib/workdays.ts`、`tools/_engines/calc-engine-workdays.tsx`。
- **实际可证明差距**：当前isWorkday始终要求非周末，仅有holidays排除表，无法把周末补班日算回工作日；同行区分正常工作日/调休工作日/周末/节假日并给日期列表。
- **数据源 / 法规更新要求**：农历按现行农历编算标准核对，明示覆盖年份、时区、闰月及生肖起点；法定放假与调休必须逐年绑定国务院办公厅通知，超出已发布年份标为未知，不能按周末预测冒充官方安排。 后续权威入口：[https://www.gov.cn/](https://www.gov.cn/)、[https://openstd.samr.gov.cn/](https://openstd.samr.gov.cn/)。
- **建议次序**：P0 / 5；实现组 `cn-calendar`。扩展现有工作日计算器的中国日历模式，不另建重复引擎。
- **是否可纯本地实现**：可，须随版本发布并维护所需字典/年度/地区政策数据；不表示无需前期数据授权与来源核实。
- **质量验收重点**：补班周末优先级高于周末规则；年度源通知逐日核对；不支持年份明确未知；保留现有自定义周末/假日和加减工作日端点语义。

### CN-009 年度放假调休总览与拼假方案

- **同行官方 URL**：[https://www.toolbox365.cn/tools/calendar/](https://www.toolbox365.cn/tools/calendar/)。
- **证据级别**：已读取详情页；未作完整交互验算。
- **Zoyku 对应 slug / 状态**：缺失；缺失。
- **代码核对**：`tools/registry.ts`、`tools/text/index.ts`、`tools/calculators/index.ts`、`tools/developer/index.ts`、`tools/security/index.ts`、`tools/unit/index.ts`。205个工具定义及分类注册表；同时检索_lib与_engines，未发现等价能力。
- **实际可证明差距**：现有countdown-timer和date-calculator没有年度中国放假/补班日历或按工作日枚举请假组合；同行提供月历、全年清单和请假方案。
- **数据源 / 法规更新要求**：农历按现行农历编算标准核对，明示覆盖年份、时区、闰月及生肖起点；法定放假与调休必须逐年绑定国务院办公厅通知，超出已发布年份标为未知，不能按周末预测冒充官方安排。 后续权威入口：[https://www.gov.cn/](https://www.gov.cn/)、[https://openstd.samr.gov.cn/](https://openstd.samr.gov.cn/)。
- **建议次序**：P1 / 21；实现组 `cn-calendar`。复用中国日历数据增加日历与拼假视图。
- **是否可纯本地实现**：可，须随版本发布并维护所需字典/年度/地区政策数据；不表示无需前期数据授权与来源核实。
- **质量验收重点**：每项请假日必须实际是工作日，补班不能混入休息天；方案按真实规则枚举，说明连续休息范围、请假天数和排序标准。

### CN-010 农历生日与下次农历生日倒计时

- **同行官方 URL**：[https://www.toolbox365.cn/tools/age-calc/](https://www.toolbox365.cn/tools/age-calc/)。
- **证据级别**：已读取官方目录描述和目标链接；目标页未逐项操作。
- **Zoyku 对应 slug / 状态**：`age-calculator`；已有基础/需增强。
- **代码核对**：`tools/_engines/calc-engine-date.tsx`。
- **实际可证明差距**：现有年龄引擎只按公历月日构造下次生日，无农历及闰月生日策略；同行目录明确支持公历/农历生日。
- **数据源 / 法规更新要求**：农历按现行农历编算标准核对，明示覆盖年份、时区、闰月及生肖起点；法定放假与调休必须逐年绑定国务院办公厅通知，超出已发布年份标为未知，不能按周末预测冒充官方安排。 后续权威入口：[https://www.gov.cn/](https://www.gov.cn/)、[https://openstd.samr.gov.cn/](https://openstd.samr.gov.cn/)。
- **建议次序**：P1 / 22；实现组 `cn-calendar`。给年龄计算器增加农历生日模式。
- **是否可纯本地实现**：可，须随版本发布并维护所需字典/年度/地区政策数据；不表示无需前期数据授权与来源核实。
- **质量验收重点**：闰月生日在无闰月年份的处理供用户选择；当日生日、除夕、农历生日跨公历年与1900/2100范围边界核对。

### CN-011 二十四节气、干支和生肖的历法说明

- **同行官方 URL**：[https://www.lddgo.net/common/lunar](https://www.lddgo.net/common/lunar)；[https://www.toolbox365.cn/tools/calendar/](https://www.toolbox365.cn/tools/calendar/)。
- **证据级别**：已读取详情页；未作完整交互验算。
- **Zoyku 对应 slug / 状态**：缺失；缺失。
- **代码核对**：`tools/registry.ts`、`tools/text/index.ts`、`tools/calculators/index.ts`、`tools/developer/index.ts`、`tools/security/index.ts`、`tools/unit/index.ts`。205个工具定义及分类注册表；同时检索_lib与_engines，未发现等价能力。
- **实际可证明差距**：未发现节气/干支/生肖历法。同行农历页有这些结果，并说明以春节作为生肖和农历年起点；不同习俗起点应显式区分。
- **数据源 / 法规更新要求**：农历按现行农历编算标准核对，明示覆盖年份、时区、闰月及生肖起点；法定放假与调休必须逐年绑定国务院办公厅通知，超出已发布年份标为未知，不能按周末预测冒充官方安排。 后续权威入口：[https://www.gov.cn/](https://www.gov.cn/)、[https://openstd.samr.gov.cn/](https://openstd.samr.gov.cn/)。
- **建议次序**：P1 / 23；实现组 `cn-calendar`。放入农历详情，不为了字段数拆出多个薄工具。
- **是否可纯本地实现**：可，须随版本发布并维护所需字典/年度/地区政策数据；不表示无需前期数据授权与来源核实。
- **质量验收重点**：核对节气时刻与时区；清楚区分公历年、农历年和立春民俗口径；不延伸为命运预测。

### CN-012 省市县行政区划和历史代码查询

- **同行官方 URL**：[https://www.toolbox365.cn/tools/district/](https://www.toolbox365.cn/tools/district/)。
- **证据级别**：已读取详情页；未作完整交互验算。
- **Zoyku 对应 slug / 状态**：缺失；缺失。
- **代码核对**：`tools/registry.ts`、`tools/text/index.ts`、`tools/calculators/index.ts`、`tools/developer/index.ts`、`tools/security/index.ts`、`tools/unit/index.ts`。205个工具定义及分类注册表；同时检索_lib与_engines，未发现等价能力。
- **实际可证明差距**：没有省市县数据和代码查询。同行详细页提供三级级联、行政代码，并提醒历史废止码和开源聚合未逐条校验。
- **数据源 / 法规更新要求**：民政部行政区划变更公告/代码与历史沿革单独版本化；行政区划码和统计用区划码不能混用。展示数据截至日期，保留旧码查询；不得把旧码一概判无效。 后续权威入口：[https://www.mca.gov.cn/](https://www.mca.gov.cn/)、[https://openstd.samr.gov.cn/](https://openstd.samr.gov.cn/)。
- **建议次序**：P0 / 6；实现组 `cn-district`。建版本化行政区划数据集，供身份证和地址复用。
- **是否可纯本地实现**：可，须随版本发布并维护所需字典/年度/地区政策数据；不表示无需前期数据授权与来源核实。
- **质量验收重点**：代码唯一、父子层级完整、撤并前后可追溯；有效期与当前/历史状态分开，不能把同名地名自动合并。

### CN-013 地区邮政编码与电话区号查询/反查

- **同行官方 URL**：[https://www.toolbox365.cn/tools/district/](https://www.toolbox365.cn/tools/district/)。
- **证据级别**：已读取详情页；未作完整交互验算。
- **Zoyku 对应 slug / 状态**：缺失；缺失。
- **代码核对**：`tools/registry.ts`、`tools/text/index.ts`、`tools/calculators/index.ts`、`tools/developer/index.ts`、`tools/security/index.ts`、`tools/unit/index.ts`。205个工具定义及分类注册表；同时检索_lib与_engines，未发现等价能力。
- **实际可证明差距**：没有邮编或电话区号查询。同行详细页提供查询，但自述仅行政区代表邮编、覆盖约55%；这一比例仅为同行自述，未独立验证。
- **数据源 / 法规更新要求**：邮编和电话区号独立于行政区划维护；代表邮编不能声称覆盖全部投递地址。核实数据授权与覆盖率；用官方邮政渠道抽验，显示更新日和缺失值。 后续权威入口：[https://www.chinapost.com.cn/](https://www.chinapost.com.cn/)、[https://www.mca.gov.cn/](https://www.mca.gov.cn/)。
- **建议次序**：P1 / 24；实现组 `cn-district`。与行政区划同页但独立数据字段和覆盖说明。
- **是否可纯本地实现**：可，须随版本发布并维护所需字典/年度/地区政策数据；不表示无需前期数据授权与来源核实。
- **质量验收重点**：一对多邮编/区号关系、前导0保留、代表邮编标签与未收录状态；不得用行政区划前缀推导邮编。

### CN-014 汉字转拼音与多音字校正

- **同行官方 URL**：[https://www.lddgo.net/convert/pinyin](https://www.lddgo.net/convert/pinyin)；[https://www.toolbox365.cn/tools/hanzi-pinyin/](https://www.toolbox365.cn/tools/hanzi-pinyin/)。
- **证据级别**：已读取详情页；未作完整交互验算。
- **Zoyku 对应 slug / 状态**：缺失；缺失。
- **代码核对**：`tools/registry.ts`、`tools/text/index.ts`、`tools/calculators/index.ts`、`tools/developer/index.ts`、`tools/security/index.ts`、`tools/unit/index.ts`。205个工具定义及分类注册表；同时检索_lib与_engines，未发现等价能力。
- **实际可证明差距**：无拼音字词典。同行详细页支持声调符号/数字、ü、大小写、原文对照、多音字选择、分隔符和未识别字符策略；slug-generator不是拼音转换。
- **数据源 / 法规更新要求**：选用可再分发的字典并记录版本、来源和许可证；多音字、姓名、地区词语/用字差异需独立样例，提供人工选择或词典覆写，不能保证所有语境唯一正确。 后续权威入口：[https://www.moe.gov.cn/](https://www.moe.gov.cn/)、[https://www.unicode.org/](https://www.unicode.org/)。
- **建议次序**：P0 / 7；实现组 `cn-language`。新增本地词语级拼音，优先保障多音词与人工覆写。
- **是否可纯本地实现**：可，须随版本发布并维护所需字典/年度/地区政策数据；不表示无需前期数据授权与来源核实。
- **质量验收重点**：重庆/银行/长大/姓氏、轻声、ü、繁体、扩展汉字/emoji混排；字典未收录明确保留或提示，不假装全部正确。

### CN-015 汉字拼音首字母缩写

- **同行官方 URL**：[https://www.lddgo.net/convert/pinyin-first-letter](https://www.lddgo.net/convert/pinyin-first-letter)。
- **证据级别**：已读取官方目录描述和目标链接；目标页未逐项操作。
- **Zoyku 对应 slug / 状态**：缺失；缺失。
- **代码核对**：`tools/registry.ts`、`tools/text/index.ts`、`tools/calculators/index.ts`、`tools/developer/index.ts`、`tools/security/index.ts`、`tools/unit/index.ts`。205个工具定义及分类注册表；同时检索_lib与_engines，未发现等价能力。
- **实际可证明差距**：未发现中文转首字母；case-converter只变换已有字母大小写，不生成拼音。同行目录支持多音字及半角/全角参数。
- **数据源 / 法规更新要求**：选用可再分发的字典并记录版本、来源和许可证；多音字、姓名、地区词语/用字差异需独立样例，提供人工选择或词典覆写，不能保证所有语境唯一正确。 后续权威入口：[https://www.moe.gov.cn/](https://www.moe.gov.cn/)、[https://www.unicode.org/](https://www.unicode.org/)。
- **建议次序**：P1 / 25；实现组 `cn-language`。作为拼音模式复用字典。
- **是否可纯本地实现**：可，须随版本发布并维护所需字典/年度/地区政策数据；不表示无需前期数据授权与来源核实。
- **质量验收重点**：与完整拼音保持多音词处理一致；空白、数字、标点、英文、emoji保留策略和姓氏首字母可追溯。

### CN-016 简体/繁体及台湾香港地区转换

- **同行官方 URL**：[https://www.lddgo.net/convert/traditional](https://www.lddgo.net/convert/traditional)；[https://www.toolbox365.cn/tools/zh-convert/](https://www.toolbox365.cn/tools/zh-convert/)。
- **证据级别**：已读取官方目录描述和目标链接；目标页未逐项操作。
- **Zoyku 对应 slug / 状态**：缺失；缺失。
- **代码核对**：`tools/registry.ts`、`tools/text/index.ts`、`tools/calculators/index.ts`、`tools/developer/index.ts`、`tools/security/index.ts`、`tools/unit/index.ts`。205个工具定义及分类注册表；同时检索_lib与_engines，未发现等价能力。
- **实际可证明差距**：没有简繁和地区词汇字典。case-converter全角/半角不能代替简繁转换；同行目录区分台湾正体/香港繁体与常用语替换。
- **数据源 / 法规更新要求**：选用可再分发的字典并记录版本、来源和许可证；多音字、姓名、地区词语/用字差异需独立样例，提供人工选择或词典覆写，不能保证所有语境唯一正确。 后续权威入口：[https://www.moe.gov.cn/](https://www.moe.gov.cn/)、[https://www.unicode.org/](https://www.unicode.org/)。
- **建议次序**：P0 / 8；实现组 `cn-language`。新增本地地区化简繁转换。
- **是否可纯本地实现**：可，须随版本发布并维护所需字典/年度/地区政策数据；不表示无需前期数据授权与来源核实。
- **质量验收重点**：词语级一对多/多对一、头发/发展、软件/軟體等语境样例；说明有损与不能保证往返相同，保存原文供比较。

### CN-017 中文姓名/地址等本地Mock字段

- **同行官方 URL**：[https://www.toolbox365.cn/tools/mock-data/](https://www.toolbox365.cn/tools/mock-data/)；[https://www.lddgo.net/string/random-name-generator](https://www.lddgo.net/string/random-name-generator)。
- **证据级别**：已读取详情页；未作完整交互验算。
- **Zoyku 对应 slug / 状态**：缺失；缺失。
- **代码核对**：`tools/registry.ts`、`tools/text/index.ts`、`tools/calculators/index.ts`、`tools/developer/index.ts`、`tools/security/index.ts`、`tools/unit/index.ts`。205个工具定义及分类注册表；同时检索_lib与_engines，未发现等价能力。
- **实际可证明差距**：random-name-picker是从用户名单随机抽取，不是生成中文姓名/地区/地址的Mock字段；同行提供中文姓名和地址字段及结构化导出。
- **数据源 / 法规更新要求**：选用可再分发的字典并记录版本、来源和许可证；多音字、姓名、地区词语/用字差异需独立样例，提供人工选择或词典覆写，不能保证所有语境唯一正确。 后续权威入口：[https://www.moe.gov.cn/](https://www.moe.gov.cn/)、[https://www.unicode.org/](https://www.unicode.org/)。
- **建议次序**：P1 / 26；实现组 `cn-mock-data`。与测试身份证/信用代码合并为一个Mock生成器。
- **是否可纯本地实现**：可，须随版本发布并维护所需字典/年度/地区政策数据；不表示无需前期数据授权与来源核实。
- **质量验收重点**：使用可授权的虚构词库，明确样本虚构、不保证不重名；省市县字段一致，引用关系和可重复种子可测试，不混入真实个人记录。

### CN-018 简体中文/繁体中文占位假文

- **同行官方 URL**：[https://www.lddgo.net/string/lorem-ipsum](https://www.lddgo.net/string/lorem-ipsum)。
- **证据级别**：已读取官方目录描述和目标链接；目标页未逐项操作。
- **Zoyku 对应 slug / 状态**：`lorem-ipsum-generator`；已有基础/需增强。
- **代码核对**：`tools/_engines/lorem.tsx`、`tools/_lib/transforms.ts`。
- **实际可证明差距**：现有loremParagraphs来自固定拉丁文词池，无中文模式；同行目录支持简体中文、繁体中文与段落/语句参数。
- **数据源 / 法规更新要求**：选用可再分发的字典并记录版本、来源和许可证；多音字、姓名、地区词语/用字差异需独立样例，提供人工选择或词典覆写，不能保证所有语境唯一正确。 后续权威入口：[https://www.moe.gov.cn/](https://www.moe.gov.cn/)、[https://www.unicode.org/](https://www.unicode.org/)。
- **建议次序**：P1 / 27；实现组 `cn-text`。扩展现有假文生成器语言模式。
- **是否可纯本地实现**：可，须随版本发布并维护所需字典/年度/地区政策数据；不表示无需前期数据授权与来源核实。
- **质量验收重点**：中文字数/句数/段数参数可验证，中文标点自然；可重复种子、0/上限和下载完整性；避免未授权复制现成文章。

### CN-019 GBK/GB18030等中文字符集编码转换

- **同行官方 URL**：[https://www.lddgo.net/string/char-encode](https://www.lddgo.net/string/char-encode)；[https://www.lddgo.net/string/charset-encoding-info-query](https://www.lddgo.net/string/charset-encoding-info-query)。
- **证据级别**：已读取官方目录描述和目标链接；目标页未逐项操作。
- **Zoyku 对应 slug / 状态**：`text-to-binary`、`base64-encoder`、`base64-decoder`；已有基础/需增强。
- **代码核对**：`tools/_engines/dev-engine-encoder.tsx`、`tools/_lib/transforms.ts`。
- **实际可证明差距**：现有文本二进制和Base64走无参数TextEncoder/TextDecoder，即UTF-8；没有中文旧系统常用字符集选择。同行目录提供字符集编码与解码查询。
- **数据源 / 法规更新要求**：明示字节编码、端序、填充/非法字符处理及有损转换；以公开规范和独立库/字节向量对拍，不以JavaScript字符串长度代替字节数；字典/映射版本固定。 后续权威入口：[https://encoding.spec.whatwg.org/](https://encoding.spec.whatwg.org/)、[https://www.unicode.org/](https://www.unicode.org/)。
- **建议次序**：P0 / 9；实现组 `cn-encoding`。建可测字节编码层，保持UTF-8默认并按需懒加载映射。
- **是否可纯本地实现**：可，须随版本发布并维护所需字典/年度/地区政策数据；不表示无需前期数据授权与来源核实。
- **质量验收重点**：GBK/GB18030版本、扩展字/emoji不可编码情况、非法字节和往返；禁止静默问号替换后仍称无损。

### CN-020 文本/二进制文件与HEX互转

- **同行官方 URL**：[https://www.lddgo.net/string/hex](https://www.lddgo.net/string/hex)；[https://www.lddgo.net/convert/filehex](https://www.lddgo.net/convert/filehex)。
- **证据级别**：已读取官方目录描述和目标链接；目标页未逐项操作。
- **Zoyku 对应 slug / 状态**：`text-to-binary`、`text-to-unicode`；已有基础/需增强。
- **代码核对**：`tools/_engines/dev-engine-encoder.tsx`、`tools/_lib/transforms.ts`。
- **实际可证明差距**：已有UTF-8二进制位串和Unicode码点转义，但无通用文本/文件字节HEX双向转换；Unicode的U+记法不能等同原始字节HEX。
- **数据源 / 法规更新要求**：明示字节编码、端序、填充/非法字符处理及有损转换；以公开规范和独立库/字节向量对拍，不以JavaScript字符串长度代替字节数；字典/映射版本固定。 后续权威入口：[https://encoding.spec.whatwg.org/](https://encoding.spec.whatwg.org/)、[https://www.unicode.org/](https://www.unicode.org/)。
- **建议次序**：P1 / 28；实现组 `cn-encoding`。复用编码层添加HEX/文件视图。
- **是否可纯本地实现**：可，算法本地执行；不表示无需前期数据授权与来源核实。
- **质量验收重点**：每字节两位、空白和0x策略、奇数位/非法字符报错、空文件与NUL；文件往返必须逐字节一致。

### CN-021 Base64的中文字符集与原始字节模式

- **同行官方 URL**：[https://www.lddgo.net/convert/stringbasesix](https://www.lddgo.net/convert/stringbasesix)。
- **证据级别**：已读取官方目录描述和目标链接；目标页未逐项操作。
- **Zoyku 对应 slug / 状态**：`base64-encoder`、`base64-decoder`、`base64-image`；已有基础/需增强。
- **代码核对**：`tools/_engines/dev-engine-encoder.tsx`、`tools/_lib/transforms.ts`。
- **实际可证明差距**：Base64基础已存在；差异为现有文本模式固定UTF-8，同行目录支持选择字符集先转字节再编码。不能把Base64整体列为缺失。
- **数据源 / 法规更新要求**：明示字节编码、端序、填充/非法字符处理及有损转换；以公开规范和独立库/字节向量对拍，不以JavaScript字符串长度代替字节数；字典/映射版本固定。 后续权威入口：[https://encoding.spec.whatwg.org/](https://encoding.spec.whatwg.org/)、[https://www.unicode.org/](https://www.unicode.org/)。
- **建议次序**：P1 / 29；实现组 `cn-encoding`。扩展现有Base64模式，复用字节编码层。
- **是否可纯本地实现**：可，须随版本发布并维护所需字典/年度/地区政策数据；不表示无需前期数据授权与来源核实。
- **质量验收重点**：相同文本在不同编码下给出可解释的字节差异；非法UTF-8、Base64URL/填充策略和二进制结果不能静默误解为文本。

### CN-022 2到36进制及小数互转

- **同行官方 URL**：[https://www.lddgo.net/convert/baseconverter](https://www.lddgo.net/convert/baseconverter)。
- **证据级别**：已读取官方目录描述和目标链接；目标页未逐项操作。
- **Zoyku 对应 slug / 状态**：`binary-converter`；已有基础/需增强。
- **代码核对**：`tools/_engines/calc-engine-converters.tsx`。
- **实际可证明差距**：现有Binary面板只有2/8/10/16，parseBig只接受非负整数；同行目录支持36以内进制与浮点。BigInt大整数能力已存在，应保留。
- **数据源 / 法规更新要求**：明示字节编码、端序、填充/非法字符处理及有损转换；以公开规范和独立库/字节向量对拍，不以JavaScript字符串长度代替字节数；字典/映射版本固定。 后续权威入口：[https://encoding.spec.whatwg.org/](https://encoding.spec.whatwg.org/)、[https://www.unicode.org/](https://www.unicode.org/)。
- **建议次序**：P0 / 10；实现组 `cn-radix`。扩展现有进制转换器的基数与精度控制。
- **是否可纯本地实现**：可，算法本地执行；不表示无需前期数据授权与来源核实。
- **质量验收重点**：负数、小数、循环小数、舍入位数与大整数精度明确；无效数字拒绝；不能把无限循环展示为精确有限结果。

### CN-023 IEEE754浮点位模式和大小端转换

- **同行官方 URL**：[https://www.lddgo.net/convert/numberbinary](https://www.lddgo.net/convert/numberbinary)；[https://www.23bei.com/tool/23.html](https://www.23bei.com/tool/23.html)。
- **证据级别**：已读取官方目录描述和目标链接；目标页未逐项操作。
- **Zoyku 对应 slug / 状态**：`binary-converter`；已有基础/需增强。
- **代码核对**：`tools/_engines/calc-engine-converters.tsx`。
- **实际可证明差距**：现有BigInt数值进制转换不展示float/double内存表示、符号指数尾数或端序；LDDGO目录明确支持float/double/short/int/long和大小端。
- **数据源 / 法规更新要求**：明示字节编码、端序、填充/非法字符处理及有损转换；以公开规范和独立库/字节向量对拍，不以JavaScript字符串长度代替字节数；字典/映射版本固定。 后续权威入口：[https://encoding.spec.whatwg.org/](https://encoding.spec.whatwg.org/)、[https://www.unicode.org/](https://www.unicode.org/)。
- **建议次序**：P1 / 30；实现组 `cn-radix`。在进制工具组增加独立IEEE754模式。
- **是否可纯本地实现**：可，算法本地执行；不表示无需前期数据授权与来源核实。
- **质量验收重点**：+0/-0、NaN、±Infinity、非规格化、最大有限数、溢出和舍入；用DataView与独立参考向量对拍，区分数字16进制和字节HEX。

### CN-024 国密SM3摘要及HMAC-SM3

- **同行官方 URL**：[https://www.toolbox365.cn/tools/sm-crypt/](https://www.toolbox365.cn/tools/sm-crypt/)。
- **证据级别**：已读取详情页；未作完整交互验算。
- **Zoyku 对应 slug / 状态**：缺失；缺失。
- **代码核对**：`tools/_engines/dev-engine-hash.tsx`、`tools/_engines/dev-engine-hmac.tsx`。205个工具定义及分类注册表；同时检索_lib与_engines，未发现等价能力。
- **实际可证明差距**：现有hash算法类型只有MD5/SHA-1/256/384/512，HMAC无SM3；同行详细页明确提供SM3摘要/HMAC。
- **数据源 / 法规更新要求**：实施前核对现行国密标准和公开标准向量，锁定经审查的本地实现；明确编码、模式、IV/nonce、填充、签名ID和密文排列。不得以提供算法工具宣称通过任何合规认证。 后续权威入口：[https://openstd.samr.gov.cn/](https://openstd.samr.gov.cn/)、[https://www.gmbz.org.cn/](https://www.gmbz.org.cn/)。
- **建议次序**：P0 / 11；实现组 `cn-crypto`。先补SM3并复用现有摘要交互。
- **是否可纯本地实现**：可，算法本地执行；不表示无需前期数据授权与来源核实。
- **质量验收重点**：公开标准向量、空字节、中文UTF-8、HEX/Base64字节输入和文件；摘要/HMAC区分，不能把相同字符的不同字节编码混淆。

### CN-025 国密SM2加密解密与密钥格式

- **同行官方 URL**：[https://www.lddgo.net/encrypt/sm2-encrypt-decrypt](https://www.lddgo.net/encrypt/sm2-encrypt-decrypt)；[https://www.toolbox365.cn/tools/sm-crypt/](https://www.toolbox365.cn/tools/sm-crypt/)。
- **证据级别**：已读取详情页；未作完整交互验算。
- **Zoyku 对应 slug / 状态**：缺失；缺失。
- **代码核对**：`tools/registry.ts`、`tools/text/index.ts`、`tools/calculators/index.ts`、`tools/developer/index.ts`、`tools/security/index.ts`、`tools/unit/index.ts`。205个工具定义及分类注册表；同时检索_lib与_engines，未发现等价能力。
- **实际可证明差距**：无SM2或其他公钥加密引擎。同行提供公钥加密/私钥解密、PEM/HEX以及C1C3C2/C1C2C3互通参数说明。
- **数据源 / 法规更新要求**：实施前核对现行国密标准和公开标准向量，锁定经审查的本地实现；明确编码、模式、IV/nonce、填充、签名ID和密文排列。不得以提供算法工具宣称通过任何合规认证。 后续权威入口：[https://openstd.samr.gov.cn/](https://openstd.samr.gov.cn/)、[https://www.gmbz.org.cn/](https://www.gmbz.org.cn/)。
- **建议次序**：P1 / 31；实现组 `cn-crypto`。国密组新增SM2加解密和格式校验。
- **是否可纯本地实现**：可，算法本地执行；不表示无需前期数据授权与来源核实。
- **质量验收重点**：标准向量与独立实现互通；密钥点校验、04前缀、排列、空/畸形密文清楚报错；私钥不持久化，不上传。

### CN-026 国密SM2签名验签及用户ID

- **同行官方 URL**：[https://www.lddgo.net/encrypt/sm2-sign-verify](https://www.lddgo.net/encrypt/sm2-sign-verify)；[https://www.toolbox365.cn/tools/sm-crypt/](https://www.toolbox365.cn/tools/sm-crypt/)。
- **证据级别**：已读取详情页；未作完整交互验算。
- **Zoyku 对应 slug / 状态**：缺失；缺失。
- **代码核对**：`tools/registry.ts`、`tools/text/index.ts`、`tools/calculators/index.ts`、`tools/developer/index.ts`、`tools/security/index.ts`、`tools/unit/index.ts`。205个工具定义及分类注册表；同时检索_lib与_engines，未发现等价能力。
- **实际可证明差距**：jwt-decoder仅解析JWT不是SM2验签；没有SM2签名流程。同行详细页说明签名ID、ZA参与和签名验签模式。
- **数据源 / 法规更新要求**：实施前核对现行国密标准和公开标准向量，锁定经审查的本地实现；明确编码、模式、IV/nonce、填充、签名ID和密文排列。不得以提供算法工具宣称通过任何合规认证。 后续权威入口：[https://openstd.samr.gov.cn/](https://openstd.samr.gov.cn/)、[https://www.gmbz.org.cn/](https://www.gmbz.org.cn/)。
- **建议次序**：P1 / 32；实现组 `cn-crypto`。与SM2加解密共用密钥层，但签名模式独立。
- **是否可纯本地实现**：可，算法本地执行；不表示无需前期数据授权与来源核实。
- **质量验收重点**：用户ID不同应验签失败；签名格式raw/DER明确，篡改消息/签名拒绝，公私钥不匹配可诊断；使用安全随机源。

### CN-027 国密SM4加密解密与模式参数

- **同行官方 URL**：[https://www.lddgo.net/encrypt/sm4](https://www.lddgo.net/encrypt/sm4)；[https://www.toolbox365.cn/tools/sm-crypt/](https://www.toolbox365.cn/tools/sm-crypt/)。
- **证据级别**：已读取详情页；未作完整交互验算。
- **Zoyku 对应 slug / 状态**：缺失；缺失。
- **代码核对**：`tools/registry.ts`、`tools/text/index.ts`、`tools/calculators/index.ts`、`tools/developer/index.ts`、`tools/security/index.ts`、`tools/unit/index.ts`。205个工具定义及分类注册表；同时检索_lib与_engines，未发现等价能力。
- **实际可证明差距**：无SM4对称加密。LDDGO目录列多模式，365详细页列ECB/CBC/GCM及填充、IV/Tag和字节编码。
- **数据源 / 法规更新要求**：实施前核对现行国密标准和公开标准向量，锁定经审查的本地实现；明确编码、模式、IV/nonce、填充、签名ID和密文排列。不得以提供算法工具宣称通过任何合规认证。 后续权威入口：[https://openstd.samr.gov.cn/](https://openstd.samr.gov.cn/)、[https://www.gmbz.org.cn/](https://www.gmbz.org.cn/)。
- **建议次序**：P1 / 33；实现组 `cn-crypto`。先实现已独立对拍的模式，未实现模式不伪装可用。
- **是否可纯本地实现**：可，算法本地执行；不表示无需前期数据授权与来源核实。
- **质量验收重点**：密钥/IV字节长度、填充、GCM认证失败、nonce要求、中文和二进制；逐模式标准向量，界面避免把ECB作为安全默认。

### CN-028 CRC16-Modbus及协议校验字节序

- **同行官方 URL**：[https://www.23bei.com/tool/59.html](https://www.23bei.com/tool/59.html)；[https://www.lddgo.net/encrypt/crc](https://www.lddgo.net/encrypt/crc)。
- **证据级别**：已读取详情页；未作完整交互验算。
- **Zoyku 对应 slug / 状态**：缺失；缺失。
- **代码核对**：`tools/registry.ts`、`tools/text/index.ts`、`tools/calculators/index.ts`、`tools/developer/index.ts`、`tools/security/index.ts`、`tools/unit/index.ts`。205个工具定义及分类注册表；同时检索_lib与_engines，未发现等价能力。
- **实际可证明差距**：hash-generator是密码摘要，不提供CRC。三贝详情可计算报文长度、MSB-LSB与Modbus低字节在前输出；LDDGO目录支持CRC8/16/32/64。
- **数据源 / 法规更新要求**：按公开协议和独立标准向量对拍，逐一记录poly/init/refin/refout/xorout和字节序；CRC/BCC/LRC仅检错，不声称加密或密码学完整性保护。 后续权威入口：[https://www.modbus.org/](https://www.modbus.org/)。
- **建议次序**：P0 / 12；实现组 `cn-protocol`。先补CRC16-Modbus，再按明确参数扩展家族。
- **是否可纯本地实现**：可，算法本地执行；不表示无需前期数据授权与来源核实。
- **质量验收重点**：偶数HEX输入、空格/非法字符、空包、多种预置向量、结果大小端；每种CRC名称绑定完整参数，避免只写CRC16。

### CN-029 BCC异或/LRC纵向冗余校验

- **同行官方 URL**：[https://www.lddgo.net/encrypt/bcc](https://www.lddgo.net/encrypt/bcc)；[https://www.lddgo.net/encrypt/lrc](https://www.lddgo.net/encrypt/lrc)。
- **证据级别**：已读取官方目录描述和目标链接；目标页未逐项操作。
- **Zoyku 对应 slug / 状态**：缺失；缺失。
- **代码核对**：`tools/registry.ts`、`tools/text/index.ts`、`tools/calculators/index.ts`、`tools/developer/index.ts`、`tools/security/index.ts`、`tools/unit/index.ts`。205个工具定义及分类注册表；同时检索_lib与_engines，未发现等价能力。
- **实际可证明差距**：没有BCC/LRC。同行目录有文本/HEX/Base64/文件字节输入及多进制结果，现有HMAC不能替代这些协议检错算法。
- **数据源 / 法规更新要求**：按公开协议和独立标准向量对拍，逐一记录poly/init/refin/refout/xorout和字节序；CRC/BCC/LRC仅检错，不声称加密或密码学完整性保护。 后续权威入口：[https://www.modbus.org/](https://www.modbus.org/)。
- **建议次序**：P1 / 34；实现组 `cn-protocol`。与CRC共用字节输入层和参数可见输出。
- **是否可纯本地实现**：可，算法本地执行；不表示无需前期数据授权与来源核实。
- **质量验收重点**：空输入/单字节/0x00/0xFF、编码差异、溢出截断和补码规则对拍；明确算法差别，不将两者混为一种异或。

### CN-030 中国工资薪金累计预扣与年度个税

- **同行官方 URL**：[https://www.toolbox365.cn/tools/tax-calc/](https://www.toolbox365.cn/tools/tax-calc/)。
- **证据级别**：已读取详情页；未作完整交互验算。
- **Zoyku 对应 slug / 状态**：`income-tax-calculator`；已有基础/需增强。
- **代码核对**：`tools/calculators/income-tax-calculator.ts`、`tools/_lib/incometax.ts`、`tools/_engines/calc-engine-incometax.tsx`。
- **实际可证明差距**：income-tax-calculator和incometax.ts明确为2026美国联邦税，只含single/married与美元扣除；没有中国累计预扣、专项附加扣除、社保或逐月表。
- **数据源 / 法规更新要求**：本次未完成税法政策逐条官方复核。实施前逐条取得税法/公告原文与适用日期，区分税年、纳税人身份、地区、扣除和征管口径；维护政策版本、到期提醒、官方链接与手动覆盖。不能直接复制同行税率或其“现行”声明。 后续权威入口：[https://www.chinatax.gov.cn/](https://www.chinatax.gov.cn/)、[https://www.mof.gov.cn/](https://www.mof.gov.cn/)。
- **建议次序**：P0 / 13；实现组 `cn-payroll`。独立中国税制模块；可复用图表与表单，不能只换中文标题。
- **是否可纯本地实现**：可，须随版本发布并维护所需字典/年度/地区政策数据；不表示无需前期数据授权与来源核实。
- **质量验收重点**：累计/非累计语义、年中入职、月收入波动、扣除变化、已有预扣、退补税边界；逐月税额汇总与年度税独立核对。

### CN-031 年终奖单独/并入综合所得对比

- **同行官方 URL**：[https://www.toolbox365.cn/tools/tax-calc/](https://www.toolbox365.cn/tools/tax-calc/)。
- **证据级别**：已读取详情页；未作完整交互验算。
- **Zoyku 对应 slug / 状态**：缺失；缺失。
- **代码核对**：`tools/calculators/income-tax-calculator.ts`、`tools/_lib/incometax.ts`、`tools/_engines/calc-engine-incometax.tsx`。205个工具定义及分类注册表；同时检索_lib与_engines，未发现等价能力。
- **实际可证明差距**：现有美国联邦模型没有中国全年一次性奖金规则；同行同页显示单独与并入两方案税额及到手差值。
- **数据源 / 法规更新要求**：本次未完成税法政策逐条官方复核。实施前逐条取得税法/公告原文与适用日期，区分税年、纳税人身份、地区、扣除和征管口径；维护政策版本、到期提醒、官方链接与手动覆盖。不能直接复制同行税率或其“现行”声明。 后续权威入口：[https://www.chinatax.gov.cn/](https://www.chinatax.gov.cn/)、[https://www.mof.gov.cn/](https://www.mof.gov.cn/)。
- **建议次序**：P1 / 35；实现组 `cn-payroll`。作为中国个税的奖金模式，避免重复入口和不一致税表。
- **是否可纯本地实现**：可，须随版本发布并维护所需字典/年度/地区政策数据；不表示无需前期数据授权与来源核实。
- **质量验收重点**：有效期间和适用条件必须绑定官方政策；临界点、低收入高扣除、零奖金、跨档增加收入后税后变化逐例核对；建议不代表申报资格判定。

### CN-032 五险一金个人/单位成本测算

- **同行官方 URL**：[https://www.toolbox365.cn/tools/si-fund/](https://www.toolbox365.cn/tools/si-fund/)；[https://www.toolbox365.cn/tools/tax-calc/](https://www.toolbox365.cn/tools/tax-calc/)。
- **证据级别**：已读取详情页；未作完整交互验算。
- **Zoyku 对应 slug / 状态**：缺失；缺失。
- **代码核对**：`tools/registry.ts`、`tools/text/index.ts`、`tools/calculators/index.ts`、`tools/developer/index.ts`、`tools/security/index.ts`、`tools/unit/index.ts`。205个工具定义及分类注册表；同时检索_lib与_engines，未发现等价能力。
- **实际可证明差距**：没有中国养老/医疗/失业/工伤/生育、公积金分项与单位成本。同行有个人/单位比例、基数和年度汇总；其税页也承认固定额、上下限等未全覆盖。
- **数据源 / 法规更新要求**：城市×年度/生效月维护社保、公积金基数上下限、个人/单位比例和固定附加额，区分参保身份；只公布人工核实的城市预设，允许逐项覆盖，不能全国一套比例。 后续权威入口：[https://www.mohrss.gov.cn/](https://www.mohrss.gov.cn/)、[https://www.chinatax.gov.cn/](https://www.chinatax.gov.cn/)、[https://www.mohurd.gov.cn/](https://www.mohurd.gov.cn/)。
- **建议次序**：P0 / 14；实现组 `cn-payroll`。先做逐项自定义基数/比例的透明计算，再增加已核实城市预设。
- **是否可纯本地实现**：可，须随版本发布并维护所需字典/年度/地区政策数据；不表示无需前期数据授权与来源核实。
- **质量验收重点**：上下限夹取、生效月、固定附加额、个人/单位不同项目、金额闭合到分；区分税前扣除和可用现金，缺失城市不套用别城规则。

### CN-033 渐进式延迟退休年龄/日期查询

- **同行官方 URL**：[https://www.lddgo.net/common/retirement-age](https://www.lddgo.net/common/retirement-age)；[https://www.toolbox365.cn/tools/retire/](https://www.toolbox365.cn/tools/retire/)。
- **证据级别**：已读取详情页；未作完整交互验算。
- **Zoyku 对应 slug / 状态**：`retirement-calculator`；已有基础/需增强。
- **代码核对**：`tools/_engines/calc-engine-retirement.tsx`、`tools/calculators/retirement-calculator.ts`。
- **实际可证明差距**：现有retirement-calculator是储蓄复利和提款估算，退休年龄由用户填，不计算中国法定退休日期；同行区分男性、原50岁女性、原55岁女性及弹性时间。
- **数据源 / 法规更新要求**：实施前核对渐进式延迟退休及弹性退休官方规则/附表、性别与原退休年龄类别、出生年月、最低缴费年限；显示政策生效版本和例外范围。本次不把同行参数视为官方复核结果。 后续权威入口：[https://www.gov.cn/](https://www.gov.cn/)、[https://www.mohrss.gov.cn/](https://www.mohrss.gov.cn/)。
- **建议次序**：P0 / 15；实现组 `cn-retirement`。新增政策查询，与储蓄预测明确区分。
- **是否可纯本地实现**：可，须随版本发布并维护所需字典/年度/地区政策数据；不表示无需前期数据授权与来源核实。
- **质量验收重点**：按出生年月逐月对附表；原类别、改革前后端点、弹性上下限及最低缴费年限分别呈现；特殊工种等例外不得给确定结论。

### CN-034 中国增值税价税分离及分币闭合

- **同行官方 URL**：[https://www.toolbox365.cn/tools/vat-split/](https://www.toolbox365.cn/tools/vat-split/)。
- **证据级别**：已读取详情页；未作完整交互验算。
- **Zoyku 对应 slug / 状态**：`vat-calculator`、`gst-calculator`；已有基础/需增强。
- **代码核对**：`tools/_engines/calc-engine-tax.tsx`。
- **实际可证明差距**：现有VAT有含税/不含税双向通用公式，必须保留；差距是默认20%美元、无中国税率/征收率口径和政策有效期，浮点金额未做先定一项再差额闭合到分的显式政策。
- **数据源 / 法规更新要求**：本次未完成税法政策逐条官方复核。实施前逐条取得税法/公告原文与适用日期，区分税年、纳税人身份、地区、扣除和征管口径；维护政策版本、到期提醒、官方链接与手动覆盖。不能直接复制同行税率或其“现行”声明。 后续权威入口：[https://www.chinatax.gov.cn/](https://www.chinatax.gov.cn/)、[https://www.mof.gov.cn/](https://www.mof.gov.cn/)。
- **建议次序**：P0 / 16；实现组 `cn-tax`。增强VAT的中国模式，保留通用自定义税率。
- **是否可纯本地实现**：可，须随版本发布并维护所需字典/年度/地区政策数据；不表示无需前期数据授权与来源核实。
- **质量验收重点**：含税=不含税+税额到分一致；13%等预设仅在官方核实后发布；输入税额反推、零税率、放弃减免和边界舍入明确。

### CN-035 城建税/教育费附加等附加税费

- **同行官方 URL**：[https://www.toolbox365.cn/tools/surtax/](https://www.toolbox365.cn/tools/surtax/)。
- **证据级别**：已读取官方目录描述和目标链接；目标页未逐项操作。
- **Zoyku 对应 slug / 状态**：缺失；缺失。
- **代码核对**：`tools/registry.ts`、`tools/text/index.ts`、`tools/calculators/index.ts`、`tools/developer/index.ts`、`tools/security/index.ts`、`tools/unit/index.ts`。205个工具定义及分类注册表；同时检索_lib与_engines，未发现等价能力。
- **实际可证明差距**：现有VAT/GST只拆一个税额，无按实缴流转税计算附加或适用减免。同行目录有地区档位、教育附加及减半选项。
- **数据源 / 法规更新要求**：本次未完成税法政策逐条官方复核。实施前逐条取得税法/公告原文与适用日期，区分税年、纳税人身份、地区、扣除和征管口径；维护政策版本、到期提醒、官方链接与手动覆盖。不能直接复制同行税率或其“现行”声明。 后续权威入口：[https://www.chinatax.gov.cn/](https://www.chinatax.gov.cn/)、[https://www.mof.gov.cn/](https://www.mof.gov.cn/)。
- **建议次序**：P1 / 36；实现组 `cn-tax`。中国税费模块增加附加计算。
- **是否可纯本地实现**：可，须随版本发布并维护所需字典/年度/地区政策数据；不表示无需前期数据授权与来源核实。
- **质量验收重点**：计税依据与税率分开、城市/县镇/其他分类可说明、减免资格由用户确认并附政策日期；不能把票面销项税默认等同实缴VAT。

### CN-036 二手住房买卖税费分项

- **同行官方 URL**：[https://www.toolbox365.cn/tools/house-tax/](https://www.toolbox365.cn/tools/house-tax/)。
- **证据级别**：已读取详情页；未作完整交互验算。
- **Zoyku 对应 slug / 状态**：缺失；缺失。
- **代码核对**：`tools/registry.ts`、`tools/text/index.ts`、`tools/calculators/index.ts`、`tools/developer/index.ts`、`tools/security/index.ts`、`tools/unit/index.ts`。205个工具定义及分类注册表；同时检索_lib与_engines，未发现等价能力。
- **实际可证明差距**：mortgage-calculator计算贷款月供并非交易税费；无契税/卖方增值税/个税及持有年限/套数条件。同行详细页有买卖双方分项及核定/据实试算。
- **数据源 / 法规更新要求**：本次未完成税法政策逐条官方复核。实施前逐条取得税法/公告原文与适用日期，区分税年、纳税人身份、地区、扣除和征管口径；维护政策版本、到期提醒、官方链接与手动覆盖。不能直接复制同行税率或其“现行”声明。 后续权威入口：[https://www.chinatax.gov.cn/](https://www.chinatax.gov.cn/)、[https://www.mof.gov.cn/](https://www.mof.gov.cn/)。
- **建议次序**：P2 / 42；实现组 `cn-tax`。取得官方规则和地域例外后再做，不直接照抄同行“2026现行”税率。
- **是否可纯本地实现**：可，须随版本发布并维护所需字典/年度/地区政策数据；不表示无需前期数据授权与来源核实。
- **质量验收重点**：满年按日期、面积阈值、家庭套数/唯一住房由用户核实；原值、税费扣除不重复；核定/据实是征管适用条件而非任意择低。

### CN-037 中国房贷等额本金与等额本息对比

- **同行官方 URL**：[https://www.lddgo.net/common/houseloan](https://www.lddgo.net/common/houseloan)。
- **证据级别**：已读取官方目录描述和目标链接；目标页未逐项操作。
- **Zoyku 对应 slug / 状态**：`mortgage-calculator`、`loan-calculator`、`amortization-calculator`；已有基础/需增强。
- **代码核对**：`tools/_engines/calc-engine-mortgage.tsx`、`tools/_lib/finance.ts`、`tools/_lib/amortize.ts`。
- **实际可证明差距**：现有mortgage已支持CNY、等额本息、年表，amortization有月表；但核心均固定本息，未提供等额本金切换。同行目录两种都提供。
- **数据源 / 法规更新要求**：纯还款数学可离线；LPR、公积金首/二套利率、城市贷款额度/资格等若预填须逐条取官方有效日期，默认用户合同为准。列清舍入、首期、提前还款当月和费用假设，不伪称银行报价。 后续权威入口：[https://www.pbc.gov.cn/](https://www.pbc.gov.cn/)、[https://www.mohurd.gov.cn/](https://www.mohurd.gov.cn/)。
- **建议次序**：P0 / 17；实现组 `cn-mortgage`。扩展现有贷款数学和界面；不另建同公式薄页。
- **是否可纯本地实现**：可，算法本地执行；不表示无需前期数据授权与来源核实。
- **质量验收重点**：等额本金首末月、每月递减、零利率、末期舍入、两方案总本息；保留人民币切换和现有月/年表。

### CN-038 住房公积金贷款场景

- **同行官方 URL**：[https://www.lddgo.net/common/profund](https://www.lddgo.net/common/profund)。
- **证据级别**：已读取官方目录描述和目标链接；目标页未逐项操作。
- **Zoyku 对应 slug / 状态**：`mortgage-calculator`；已有基础/需增强。
- **代码核对**：`tools/_engines/calc-engine-mortgage.tsx`、`tools/_lib/finance.ts`、`tools/_lib/amortize.ts`。
- **实际可证明差距**：现有可手填利率算任意等额本息贷款，数学基础存在；未见公积金首/二套、贷款口径、已核实利率预设或等额本金模式。同行有明确公积金场景。
- **数据源 / 法规更新要求**：纯还款数学可离线；LPR、公积金首/二套利率、城市贷款额度/资格等若预填须逐条取官方有效日期，默认用户合同为准。列清舍入、首期、提前还款当月和费用假设，不伪称银行报价。 后续权威入口：[https://www.pbc.gov.cn/](https://www.pbc.gov.cn/)、[https://www.mohurd.gov.cn/](https://www.mohurd.gov.cn/)。
- **建议次序**：P1 / 37；实现组 `cn-mortgage`。先用清楚标注的用户合同利率场景，再加官方版本预设。
- **是否可纯本地实现**：可，须随版本发布并维护所需字典/年度/地区政策数据；不表示无需前期数据授权与来源核实。
- **质量验收重点**：不把利率计算当贷款资格/额度审批；地区/首二套/期限不同显示有效期；与同利率通用数学结果一致。

### CN-039 商业贷+公积金组合贷

- **同行官方 URL**：[https://www.lddgo.net/common/portloan](https://www.lddgo.net/common/portloan)；[https://www.toolbox365.cn/tools/mortgage/](https://www.toolbox365.cn/tools/mortgage/)。
- **证据级别**：已读取官方目录描述和目标链接；目标页未逐项操作。
- **Zoyku 对应 slug / 状态**：`mortgage-calculator`；已有基础/需增强。
- **代码核对**：`tools/_engines/calc-engine-mortgage.tsx`、`tools/_lib/finance.ts`、`tools/_lib/amortize.ts`。
- **实际可证明差距**：现有只有一笔贷款本金/利率，不能同时计算两个利率和各自余额后合并月供；不能视为已覆盖组合贷。同行目录明确提供。
- **数据源 / 法规更新要求**：纯还款数学可离线；LPR、公积金首/二套利率、城市贷款额度/资格等若预填须逐条取官方有效日期，默认用户合同为准。列清舍入、首期、提前还款当月和费用假设，不伪称银行报价。 后续权威入口：[https://www.pbc.gov.cn/](https://www.pbc.gov.cn/)、[https://www.mohurd.gov.cn/](https://www.mohurd.gov.cn/)。
- **建议次序**：P1 / 38；实现组 `cn-mortgage`。基于统一贷款内核组合两笔贷款和汇总表。
- **是否可纯本地实现**：可，算法本地执行；不表示无需前期数据授权与来源核实。
- **质量验收重点**：两笔期限/利率/还款方式不同、其中一笔为零、总月供逐月相加、提前还款指定分配到哪笔，禁止平均利率近似冒充精确。

### CN-040 一次性提前还贷、缩期/减供及重算

- **同行官方 URL**：[https://www.lddgo.net/common/loan-prepayment-calculator](https://www.lddgo.net/common/loan-prepayment-calculator)。
- **证据级别**：已读取详情页；未作完整交互验算。
- **Zoyku 对应 slug / 状态**：`mortgage-calculator`；已有基础/需增强。
- **代码核对**：`tools/_engines/calc-engine-mortgage.tsx`、`tools/_lib/finance.ts`、`tools/_lib/amortize.ts`。
- **实际可证明差距**：现有mortgageAccelerated支持从开始每月持续额外还款，不能把它报为完全缺失；差距为指定第N期一次性还款、全清/部分、缩期/减供和新利率。同行详情明确这些方案。
- **数据源 / 法规更新要求**：纯还款数学可离线；LPR、公积金首/二套利率、城市贷款额度/资格等若预填须逐条取官方有效日期，默认用户合同为准。列清舍入、首期、提前还款当月和费用假设，不伪称银行报价。 后续权威入口：[https://www.pbc.gov.cn/](https://www.pbc.gov.cn/)、[https://www.mohurd.gov.cn/](https://www.mohurd.gov.cn/)。
- **建议次序**：P1 / 39；实现组 `cn-mortgage`。扩展已有提前还款内核，保留每月额外还款模式。
- **是否可纯本地实现**：可，算法本地执行；不表示无需前期数据授权与来源核实。
- **质量验收重点**：明确当月先还月供再提前还本；剩余本金上限、全额/部分、缩期/减供、罚息/手续费和新利率假设，展示前后现金流差异。

### CN-041 车牌简称/发牌地区查询

- **同行官方 URL**：[https://www.lddgo.net/common/car](https://www.lddgo.net/common/car)。
- **证据级别**：已读取官方目录描述和目标链接；目标页未逐项操作。
- **Zoyku 对应 slug / 状态**：缺失；缺失。
- **代码核对**：`tools/registry.ts`、`tools/text/index.ts`、`tools/calculators/index.ts`、`tools/developer/index.ts`、`tools/security/index.ts`、`tools/unit/index.ts`。205个工具定义及分类注册表；同时检索_lib与_engines，未发现等价能力。
- **实际可证明差距**：无中国车牌字典；同行目录提供全国车牌号码归属地。不得把地区解析延伸成车辆/车主查询。
- **数据源 / 法规更新要求**：号段/车牌字典需确认授权、来源与更新日期；手机号前缀只可反映原始号段分配，携号转网后不能断言现运营商或用户位置，任何格式样本不保证未被分配。 后续权威入口：[https://www.miit.gov.cn/](https://www.miit.gov.cn/)、[https://www.mps.gov.cn/](https://www.mps.gov.cn/)。
- **建议次序**：P2 / 43；实现组 `cn-lookup`。提供省简称和发牌机关规则查询。
- **是否可纯本地实现**：可，须随版本发布并维护所需字典/年度/地区政策数据；不表示无需前期数据授权与来源核实。
- **质量验收重点**：普通/新能源/特殊号牌范围明确；省简称多字形输入处理、未知前缀诚实未收录；不展示或收集真实车主数据。

### CN-042 手机号原始号段归属地查询

- **同行官方 URL**：[https://www.lddgo.net/common/phone](https://www.lddgo.net/common/phone)；[https://www.toolbox365.cn/tools/phone-location/](https://www.toolbox365.cn/tools/phone-location/)。
- **证据级别**：已读取官方目录描述和目标链接；目标页未逐项操作。
- **Zoyku 对应 slug / 状态**：缺失；缺失。
- **代码核对**：`tools/registry.ts`、`tools/text/index.ts`、`tools/calculators/index.ts`、`tools/developer/index.ts`、`tools/security/index.ts`、`tools/unit/index.ts`。205个工具定义及分类注册表；同时检索_lib与_engines，未发现等价能力。
- **实际可证明差距**：无中国手机号段数据；同行有地区/运营商/号段查询及批量能力。只能验证这一页面能力声明，未验证号段数据及时性。
- **数据源 / 法规更新要求**：号段/车牌字典需确认授权、来源与更新日期；手机号前缀只可反映原始号段分配，携号转网后不能断言现运营商或用户位置，任何格式样本不保证未被分配。 后续权威入口：[https://www.miit.gov.cn/](https://www.miit.gov.cn/)、[https://www.mps.gov.cn/](https://www.mps.gov.cn/)。
- **建议次序**：P2 / 44；实现组 `cn-lookup`。仅在取得可再分发数据后做本地前缀查询。
- **是否可纯本地实现**：可，须随版本发布并维护所需字典/年度/地区政策数据；不表示无需前期数据授权与来源核实。
- **质量验收重点**：11位/+86/空白策略，虚拟运营商和新增号段、携号转网限制显式说明；不声称实时位置、现运营商或号码实名人。

### CN-043 满减凑单与多张券到手价

- **同行官方 URL**：[https://www.toolbox365.cn/tools/discount/](https://www.toolbox365.cn/tools/discount/)；[https://www.toolbox365.cn/tools/final-price/](https://www.toolbox365.cn/tools/final-price/)。
- **证据级别**：已读取官方目录描述和目标链接；目标页未逐项操作。
- **Zoyku 对应 slug / 状态**：`discount-calculator`；已有基础/需增强。
- **代码核对**：`tools/_engines/calc-engine-basic.tsx`。
- **实际可证明差距**：现有discount只有原价、折扣%和第二折扣%的乘法；没有满减门槛、每满、多券/红包的顺序和凑单建议。同行目录列出这些具体能力。
- **数据源 / 法规更新要求**：无动态法规依赖；写清计算或转换规则，以用户输入为准，记录字典/第三方依赖许可证和版本；不得把同行说明当作经过独立测试的准确率或性能。
- **建议次序**：P1 / 40；实现组 `cn-shopping`。扩展现有折扣工具的中国购物模式。
- **是否可纯本地实现**：可，算法本地执行；不表示无需前期数据授权与来源核实。
- **质量验收重点**：折/百分比标签不混；门槛边界、封顶、互斥/叠加顺序、凑单新增支出和真实节省分别显示；规则未知由用户配置。

### CN-044 中英文/数字之间自动加空格

- **同行官方 URL**：[https://www.lddgo.net/string/add-space-between-chinese-and-english](https://www.lddgo.net/string/add-space-between-chinese-and-english)。
- **证据级别**：已读取官方目录描述和目标链接；目标页未逐项操作。
- **Zoyku 对应 slug / 状态**：缺失；缺失。
- **代码核对**：`tools/_lib/transforms.ts`、`tools/_lib/transform-registry.ts`。205个工具定义及分类注册表；同时检索_lib与_engines，未发现等价能力。
- **实际可证明差距**：现有remove-extra-spaces与text-cleaner是清理多余空白，未发现按中英文边界插入空格的转换；同行目录明确此功能。
- **数据源 / 法规更新要求**：无动态法规依赖；写清计算或转换规则，以用户输入为准，记录字典/第三方依赖许可证和版本；不得把同行说明当作经过独立测试的准确率或性能。
- **建议次序**：P1 / 41；实现组 `cn-text`。复用text工具引擎新增可独立测试转换。
- **是否可纯本地实现**：可，算法本地执行；不表示无需前期数据授权与来源核实。
- **质量验收重点**：Markdown/URL/代码块可选保护；中文数字、单位、全角标点、emoji、已有空格/换行幂等；说明排版偏好不强称唯一规范。

### CN-045 中国大陆盲文翻译/输入辅助

- **同行官方 URL**：[https://www.lddgo.net/common/braille](https://www.lddgo.net/common/braille)；[https://www.lddgo.net/common/braille-input](https://www.lddgo.net/common/braille-input)。
- **证据级别**：已读取官方目录描述和目标链接；目标页未逐项操作。
- **Zoyku 对应 slug / 状态**：缺失；缺失。
- **代码核对**：`tools/registry.ts`、`tools/text/index.ts`、`tools/calculators/index.ts`、`tools/developer/index.ts`、`tools/security/index.ts`、`tools/unit/index.ts`。205个工具定义及分类注册表；同时检索_lib与_engines，未发现等价能力。
- **实际可证明差距**：没有盲文转换或输入；同行目录说明现行盲文、双拼盲文与6/8点输入。
- **数据源 / 法规更新要求**：选用可再分发的字典并记录版本、来源和许可证；多音字、姓名、地区词语/用字差异需独立样例，提供人工选择或词典覆写，不能保证所有语境唯一正确。 后续权威入口：[https://www.moe.gov.cn/](https://www.moe.gov.cn/)、[https://www.unicode.org/](https://www.unicode.org/)。
- **建议次序**：P2 / 45；实现组 `cn-accessibility`。先确定规范和授权并请使用者验收，再做可访问性工具。
- **是否可纯本地实现**：可，须随版本发布并维护所需字典/年度/地区政策数据；不表示无需前期数据授权与来源核实。
- **质量验收重点**：盲文体系、声调/分词规则明确；键盘和屏幕阅读器流程验收；不能把Unicode点阵映射等同高质量中文盲文翻译。

### CN-046 全角/半角双向转换（已有，勿重复造）

- **同行官方 URL**：[https://www.lddgo.net/string/full-half-width-converter](https://www.lddgo.net/string/full-half-width-converter)。
- **证据级别**：已读取官方目录描述和目标链接；目标页未逐项操作。
- **Zoyku 对应 slug / 状态**：`case-converter`、`fancy-text-generator`；已有/暂无可证明缺口。
- **代码核对**：`tools/_engines/case-converter.tsx`、`tools/_lib/transforms.ts`。
- **实际可证明差距**：已在case-converter暴露全角/半角模式，transforms.ts有ASCII与全角区双向映射及空格处理；没有证据证明这一基础能力缺失。fancy还有单向全角样式。
- **数据源 / 法规更新要求**：明示字节编码、端序、填充/非法字符处理及有损转换；以公开规范和独立库/字节向量对拍，不以JavaScript字符串长度代替字节数；字典/映射版本固定。 后续权威入口：[https://encoding.spec.whatwg.org/](https://encoding.spec.whatwg.org/)、[https://www.unicode.org/](https://www.unicode.org/)。
- **建议次序**：KEEP / 46；实现组 `cn-text`。保留现有功能并改善可发现性；只有补验发现差距再改。
- **是否可纯本地实现**：可，算法本地执行；不表示无需前期数据授权与来源核实。
- **质量验收重点**：同样例对拍U+3000/全角ASCII；先核实用户是否需要额外CJK标点规范化，不能为了与同行同名而新建重复引擎。

### CN-047 Unicode转义与文本二进制（已有基础）

- **同行官方 URL**：[https://www.lddgo.net/convert/string-unicode](https://www.lddgo.net/convert/string-unicode)；[https://www.lddgo.net/convert/string-binary](https://www.lddgo.net/convert/string-binary)。
- **证据级别**：已读取官方目录描述和目标链接；目标页未逐项操作。
- **Zoyku 对应 slug / 状态**：`text-to-unicode`、`text-to-binary`；已有/暂无可证明缺口。
- **代码核对**：`tools/_engines/dev-engine-encoder.tsx`、`tools/_lib/transforms.ts`。
- **实际可证明差距**：textUnicode已有u4/大括号/U+/十进制和反解，textBinary已有UTF-8字节双向。基础能力存在；GBK、原始HEX与编码范围浏览是本目录另列的具体差距。
- **数据源 / 法规更新要求**：明示字节编码、端序、填充/非法字符处理及有损转换；以公开规范和独立库/字节向量对拍，不以JavaScript字符串长度代替字节数；字典/映射版本固定。 后续权威入口：[https://encoding.spec.whatwg.org/](https://encoding.spec.whatwg.org/)、[https://www.unicode.org/](https://www.unicode.org/)。
- **建议次序**：KEEP / 47；实现组 `cn-encoding`。保留现有基础，复用字节层；不重建Unicode或二进制工具。
- **是否可纯本地实现**：可，算法本地执行；不表示无需前期数据授权与来源核实。
- **质量验收重点**：中文/emoji/代理对与空白策略独立回归；不能用现有码点数量推断GBK字节数，也不以存在单页等同所有字符集已覆盖。

## 来源目录与可追溯观察

以下为实际获取的产品官方页面；“官方”仅指产品自己的页面，不表示政府背书。目录链接证明可发现的功能，不证明其算法或数据最新。

| 来源 | 页面 | 已证明 / 限制 |
| --- | --- | --- |
| S01 | [LDDGO 字符目录](https://www.lddgo.net/base/class?classID=1) | 已读取原始HTML标题、描述、工具链接；用于字符集/中文假文/全半角等能力，未操作工具 |
| S02 | [LDDGO 转换目录](https://www.lddgo.net/base/class?classID=2) | 已读取人民币大写、简繁、拼音、36进制/浮点、字符集Base64等目录描述和链接 |
| S03 | [LDDGO 加密目录](https://www.lddgo.net/base/class?classID=3) | 已读取SM2/SM4、CRC/BCC/LRC等目录描述和链接 |
| S04 | [LDDGO 更多目录](https://www.lddgo.net/base/class?classID=5) | 已读取身份证、农历、房贷、公积金/组合贷、退休等目录描述和链接 |
| S05 | [365工具箱官方首页](https://www.toolbox365.cn/) | 已读取页面内目录及工具链接，不采信其自述总工具数或性能数字为独立事实 |
| S06 | [三贝计算器官方首页](https://www.23bei.com/) | 已读取可验证域名和导航，确认CRC16与IEEE754页面链接；不推测其他域名 |
| S07 | [LDDGO 身份证详情](https://www.lddgo.net/common/identity) | 单个/批量、15/18位、校验、编码地区；页内自述行政区划依据2019数据，非本次确认最新 |
| S08 | [LDDGO 身份证测试样本详情](https://www.lddgo.net/common/idgenerator) | 参数/数量/输出，页内明确仅供学习测试 |
| S09 | [LDDGO 中国工作日详情](https://www.lddgo.net/common/workday) | 四类日子、日期列表、区间和按天数求日期；与Zoyku端点语义有差异，不能直接混用 |
| S10 | [LDDGO 农历详情](https://www.lddgo.net/common/lunar) | 双向、闰月/大小月、节气/生肖/干支以及起点说明 |
| S11 | [365 万年历详情](https://www.toolbox365.cn/tools/calendar/) | 年度假期/调休/拼假/农历；其覆盖年份和chinese-days来源是同行自述，未逐日核验 |
| S12 | [365 行政区划详情](https://www.toolbox365.cn/tools/district/) | 三级级联/邮编/区号，声明代表邮编约55%覆盖且未逐条校对；未独立验证该比例 |
| S13 | [365 中国个税详情](https://www.toolbox365.cn/tools/tax-calc/) | 工资、扣除、年度汇总与奖金方案；政策数字仅作为同行界面观察，不是本报告法律结论 |
| S14 | [365 五险一金详情](https://www.toolbox365.cn/tools/si-fund/) | 个人与单位、基数比例、年度成本；不得将城市默认值直接复制 |
| S15 | [365 国密详情](https://www.toolbox365.cn/tools/sm-crypt/) | SM2/3/4模式、字节编码与互通参数；本次未运行密钥/算法对拍，不采信其概括合规声明 |
| S16 | [365 Mock详情](https://www.toolbox365.cn/tools/mock-data/) | 本地中文字段、身份证/信用代码校验样本及导出；未采信“任意校验器”、碰撞概率、性能等未经验证数字 |
| S17 | [三贝 CRC16-Modbus详情](https://www.23bei.com/tool/59.html) | 输入字节、报文长度、MSB-LSB/LSB-MSB说明及示例；未读取其外链站点 |
| S18 | [Yunfale 统一社会信用代码详情](https://www.yunfale.com/credit-code-check/) | 18位格式/字符集/校验位/分段及真实性边界；标准版本仍需官方复核 |
| S19 | [365 退休详情](https://www.toolbox365.cn/tools/retire/) | 已读取原始HTML和说明段落；延期/弹性政策须另行核对官方原文 |
| S20 | [365 价税分离详情](https://www.toolbox365.cn/tools/vat-split/) | 已读取税额反推/含税/不含税与到分闭合说明；其2026政策文号与税率未做官方逐条复核 |
| S21 | [365 二手房税费详情](https://www.toolbox365.cn/tools/house-tax/) | 已读取双方税项/原值/核定据实及政策声明；不把其“2026现行”数字当已核准规则 |
| S22 | [LDDGO 提前还贷详情](https://www.lddgo.net/common/loan-prepayment-calculator) | 指定期次、部分/全清、减供/缩期/新利率、月表；页面明确不含罚息/手续费 |
| S23 | [LDDGO 拼音详情](https://www.lddgo.net/convert/pinyin) | 声调/ü/原文对照/多音字人工选择；页面有游客次数和字数限制，未测性能/准确率 |
| S24 | [LDDGO 数学目录（辅助查看）](https://www.lddgo.net/base/class?classID=7) | 已查看，不用于虚增中国专用工具数量 |

## 实施交接

1. 实施时按当前分支最新 registry 再核对，防止并行任务已新增的能力被重复创建；本文件结论锁定 `dccdbfd`。
2. 遵守 `AGENTS.md`：写 Next.js 代码前读本地 `node_modules/next/dist/docs/` 相关指南；本研究未写 Next.js 代码。
3. 遵守 `zoyku-engineering`：逻辑下沉纯函数，正常/空/边界/非法/Unicode/长输入与往返测试；算法对独立标准向量，数据做唯一性/完整性/版本校验，再进行浏览器真实交互及回归。
4. 中国能力复用同一内核与数据，不允许仅翻译美国税或换标题伪装本土化；公历/农历、人民币/美元、行政区/邮编、真实验证/格式校验必须语义清楚。
5. 本次未运行应用测试/构建，因为没有修改应用。完成检查仅覆盖研究 JSON 结构、47 条字段、205 slug 引用、源 URL 结构、MD/JSON 一致和文件改动范围；这不能代替后续功能验收。
