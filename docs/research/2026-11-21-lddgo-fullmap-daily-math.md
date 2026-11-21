# LDDGO 全目录逐项对照：生活与数学

基于 2026-11-21 官方已存中英目录与当前注册源码；无新增网络请求、无同行同输入运行。范围：更多（82）和数学（27），扣除已有 peer_review 的 4 条，本次新增 **105 条逐 ID 审核**。

状态：`not-comparable` 6；`partial` 29；`existing` 5；`missing` 64；`needs-source` 1。

既有复核排除：LDDGO-05-014, LDDGO-05-071, LDDGO-07-018, LDDGO-07-019。

`existing` 只表示目录核心任务可由已注册工具完成，非全功能/结果等价；`partial` 必须有实质可达子流程和具体缺口；`missing` 以注册清单、实际引擎和相邻能力不等价为证据；文档/外站记 `not-comparable`；详情不足记 `needs-source`。所有条目均为 E1（目录与本地源码），不是运行通过。

注册检查沿 `tools/registry.ts` → 10 个分类数组 → 217 个实际成员 → 工具的引擎组件与 props → 算法/数据函数。`lib/tool-copy.ts` 已检查；本批工具无把相关功能扩大的动态覆盖。JSON 包含当前注册清单、每行官方声明、源码路径与可复查行号/原文锚点。

## 重要边界

- 日期加减只有“天”，没有直接加减月/年；工作日不含中国官方节假日或周末补班。
- 商业贷、公积金贷只能复用手填固定利率的等额本息计算；组合贷、等额本金和完整提前还贷流程仍有缺口。
- 居民身份证可解析省/生日/性别及生成确定性测试样本，没有市县完整数据、随机人口生成、真实身份查询或永居证编码。
- 农历转换已经注册，可双向转换与处理闰月，页面范围约 1900–2100，生肖按农历新年换年；本报告不宣称运行验收。
- 科学计算器是 JavaScript number 标量与 12 位有效数字，不能充当任意精度、精确分数、矩阵代数或 π 百万位查询。
- 医学与政策工具必须保留来源、适用人群、版本/生效日期边界。语料和物流等数据服务尚未接入的不能用虚构数据充数。
- 股票时间条目未说明实际序列规则，保留 needs-source；不因宽泛名称猜测 missing 或 existing。

## 全量逐项结果

| ID | 官方工具 | 状态 | 已映射工具 | 边界或缺口 |
|---|---|---|---|---|
| LDDGO-05-001 | [Linux命令查询](https://www.lddgo.net/doc/linuxcmd) | not-comparable | — | 官方目录的目标是Linux man/bash 命令文档，属于参考文档或外站入口；不计为待补的同类原生工具。 |
| LDDGO-05-002 | [Layui文档](https://layui.lddgo.net) | not-comparable | — | 官方目录的目标是外站 Layui 文档/下载/示例，属于参考文档或外站入口；不计为待补的同类原生工具。 |
| LDDGO-05-003 | [Java 8 文档](https://www.lddgo.net/doc/java8doc) | not-comparable | — | 官方目录的目标是Java 8 API 文档，属于参考文档或外站入口；不计为待补的同类原生工具。 |
| LDDGO-05-004 | [Java 11 文档](https://www.lddgo.net/doc/java11doc) | not-comparable | — | 官方目录的目标是Java 11 API 文档，属于参考文档或外站入口；不计为待补的同类原生工具。 |
| LDDGO-05-005 | [Java 14 文档](https://www.lddgo.net/doc/java14doc) | not-comparable | — | 官方目录的目标是Java 14 API 文档，属于参考文档或外站入口；不计为待补的同类原生工具。 |
| LDDGO-05-006 | [Python 3 文档](https://www.lddgo.net/doc/python3doc) | not-comparable | — | 官方目录的目标是Python 3 API 文档，属于参考文档或外站入口；不计为待补的同类原生工具。 |
| LDDGO-05-007 | [实时汇率查询](https://www.lddgo.net/common/exchangerate) | partial | `currency-converter` | 已注册工具显示所选货币对的汇率和数据更新时间；汇率来自 open.er-api.com，按设备缓存一小时，失败时可显示标明日期的缓存。不能把此刷新与缓存机制宣称为逐笔或持续实时行情。 |
| LDDGO-05-008 | [汇率换算](https://www.lddgo.net/common/exchangemoney) | existing | `currency-converter` | 金额按所选两种货币的最新已加载汇率换算，覆盖核心换汇流程；是中间价参考，数据可缓存或过期，不等于银行成交价、手续费或保证实时行情。 |
| LDDGO-05-009 | [身份证号码查询](https://www.lddgo.net/common/identity) | partial | `chinese-id-validator` | 可校验号码并解析出生日期、性别、年龄、省级名称和原始六位行政区码；明确没有现行/历史市县数据库，也不查询实际发证或身份记录，不能声称完整发证地查询。 |
| LDDGO-05-010 | [Cron表达式计算](https://www.lddgo.net/common/cron) | partial | `cron-explainer` | 可解析五/六段表达式、解释字段并计算接下来五次执行时间；不支持 Quartz 的 L/W/# 扩展，没有 Linux/Cron4j/Quartz/Spring 四种语义引擎选择。 |
| LDDGO-05-011 | [随机身份证号码生成](https://www.lddgo.net/common/idgenerator) | partial | `chinese-id-generator` | 可批量生成带校验位的测试样本，但按用户地区码、生日和起始顺序号确定性枚举；不是随机省市区/生日抽样，也没有市县数据查询。样本不是已签发身份，不可用假行政区数据补齐。 |
| LDDGO-05-012 | [日期计算器](https://www.lddgo.net/common/date) | partial | `date-calculator` | 已实现两日期相差年/月/日、总天数和周数，以及日期加减天数；加减模式只有天数，不能直接加减指定月数、年数。 |
| LDDGO-05-013 | [在线倒计时器](https://www.lddgo.net/common/countdown) | existing | `countdown-timer` | 可设置时/分/秒、开始暂停重置，并在归零时尝试播放 WebAudio 提示音，覆盖计时与到点提醒核心；音频设备/浏览器权限、后台节流和页面关闭后的提醒未做运行比较，声音是内置提示音。 |
| LDDGO-05-015 | [bmi指数计算器](https://www.lddgo.net/common/bmi) | existing | `bmi-calculator` | 体重/身高平方计算 BMI，并显示 WHO 分类与范围表，覆盖核心 BMI 计算和范围参考；成人筛查值不构成诊断，目录之外的中国阈值、儿童/孕期标准和医学效果未据此认定。 |
| LDDGO-05-016 | [安全期计算器](https://www.lddgo.net/common/safety) | missing | — | 注册清单没有安全期、排卵期和月经期日期计算流程。预产期工具只按末次月经与周期估计孕周/预产期，不输出该周期日历；医学来源、适用周期和风险说明均不能从预产期公式推断。 |
| LDDGO-05-017 | [年龄计算器](https://www.lddgo.net/common/age) | partial | `age-calculator` | 可计算周岁年月日和下个生日；年龄界面没有虚岁或星座。日历转换可显示某日生肖，但没有把年龄、虚岁、生肖和星座合并为此查询流程。 |
| LDDGO-05-018 | [星座月份表](https://www.lddgo.net/common/zodiac) | missing | — | 注册清单没有十二星座月份/日期查询表；日历转换显示的是农历生肖，不能代替西方星座日期边界。 |
| LDDGO-05-019 | [亲戚称呼计算器](https://www.lddgo.net/common/relation) | missing | — | 注册计算器与文本工具中没有亲属关系链、双向称谓或按称谓反推关系的引擎；通用文本处理不包含中文亲属称谓规则库。 |
| LDDGO-05-020 | [房贷计算器](https://www.lddgo.net/common/houseloan) | partial | `mortgage-calculator`, `loan-calculator`, `amortization-calculator` | 可按房价/首付或本金、手填年利率与期限算固定等额本息月供、总利息和还款表；没有等额本金模式，不含中国商业房贷实时/政策利率或当地资格判断。 |
| LDDGO-05-021 | [公积金贷款计算器](https://www.lddgo.net/common/profund) | partial | `loan-calculator`, `mortgage-calculator` | 公积金利率作为手填固定利率时，可复用等额本息月供与总利息计算；没有公积金产品/政策数据、贷款额度资格规则或等额本金模式，不能宣称完整公积金房贷计算器。 |
| LDDGO-05-022 | [组合房贷计算器](https://www.lddgo.net/common/portloan) | missing | — | 注册借贷引擎只接受单一本金、利率和期限；没有商业贷与公积金贷双部分的独立参数、联算月供或汇总利息流程。用户分开算再手工相加不计为已实现组合贷。 |
| LDDGO-05-023 | [车牌号查询](https://www.lddgo.net/common/car) | missing | — | 没有车牌省市归属地数据库或车牌查询输入流程；居民身份证解析的行政区字段与车牌编码不是同一编码体系。 |
| LDDGO-05-024 | [手机号码归属地查询](https://www.lddgo.net/common/phone) | missing | — | 没有手机号号段、运营商和归属地数据查询；IP 查询接受网络地址并查询 IP 信息，不能代替手机号码数据库或推定号码实时属地。 |
| LDDGO-05-025 | [阴历阳历转换](https://www.lddgo.net/common/lunar) | existing | `lunar-calendar-converter` | 分类数组已注册双向公历/农历日期转换，包含闰月输入，覆盖核心任务。页面给出约 1900–2100 年范围，干支/生肖按农历新年换年；这不是全历法、所有年份精度或同行同输入结果验证。 |
| LDDGO-05-026 | [血型遗传规律表](https://www.lddgo.net/common/blood) | missing | — | 没有父母血型到子女血型的遗传规则表或输入流程；BMI/体脂等成人体测公式不涉及血型遗传。需区分 ABO/Rh 模型与医学解释，不能从健康分类文案推导。 |
| LDDGO-05-027 | [在线成语大全](https://www.lddgo.net/common/idiom) | missing | — | 没有成语词典、释义、例句、拼音缩写索引或查询界面；查找替换仅处理用户输入文本，不提供成语数据。 |
| LDDGO-05-028 | [成语接龙](https://www.lddgo.net/common/idiomsolitaire) | missing | — | 没有同字/同音成语接龙规则和词库；随机名字抽取只从用户名单选一项，不检索或验证成语链。 |
| LDDGO-05-029 | [歇后语大全](https://www.lddgo.net/common/xiehouyu) | missing | — | 没有歇后语与答案词库或查询界面；文本查找替换没有内置歇后语数据。 |
| LDDGO-05-030 | [在线闹钟](https://www.lddgo.net/common/alarmclock) | missing | — | 现有倒计时按持续时长运行，时区工具仅展示当前时间；没有按目标钟点设置、等待并响铃的闹钟流程。内部提示音函数不构成已注册闹钟。 |
| LDDGO-05-031 | [各国/地区首都、国旗、货币](https://www.lddgo.net/common/world) | missing | — | 没有世界国家/地区首都、国旗和货币的联表查询；货币选择器的币种名称与时区城市列表不含国家首都/旗帜参考资料。 |
| LDDGO-05-032 | [在线垃圾分类查询](https://www.lddgo.net/common/rubbish) | missing | — | 没有垃圾物品分类词库、地区分类口径或查询引擎；需可维护且标明城市/地区的数据源，不能用通用文本搜索冒充分类查询。 |
| LDDGO-05-033 | [保质期计算器](https://www.lddgo.net/common/shelf-life) | partial | `date-calculator` | 日期加天数可完成以天计的生产日到期日计算；没有保质期单位选择、按月/年规则、显式过期状态或商品/食品/药品的储存条件语义。日期运算结果不等于可食用/可用判断。 |
| LDDGO-05-034 | [在线汉字拆字](https://www.lddgo.net/common/chinese-letter) | missing | — | 没有左右/上下汉字部件拆分数据库或拆字引擎；Unicode 转换只处理编码表示，不能分解字形结构。 |
| LDDGO-05-035 | [在线快递查询](https://www.lddgo.net/common/express) | missing | — | 没有快递单号、承运商选择或物流轨迹查询服务。注册工具不包含所列承运商的授权接口；需要免费公开且可用的客户端来源，不能以虚构轨迹或未经配置的商业接口计为实现。 |
| LDDGO-05-036 | [胸围尺码表](https://www.lddgo.net/common/bra) | missing | — | 没有胸围/下胸围输入、罩杯计算或胸围尺码对照表；鞋码引擎基于脚长和鞋码体系，不能代替胸围尺码规则。 |
| LDDGO-05-037 | [放假安排](https://www.lddgo.net/common/holiday) | missing | — | 没有历年官方放假与补班/调休安排查询数据。工作日工具仅按用户给定假日排除周末，既不提供官方历年安排，也不把调休周末转换为上班日。 |
| LDDGO-05-038 | [在线特殊符号大全](https://www.lddgo.net/common/symbol) | partial | `emoji-picker` | Emoji 选择器包含可复制的符号分组（算术符号、部分箭头/商标等）；缺通用数学、数字上下标、希腊字母和标点等完整特殊字符分类，不能把 677 个精选 emoji 当作全符号库。 |
| LDDGO-05-039 | [汉字笔画查询](https://www.lddgo.net/common/bi-hua) | missing | — | 没有汉字笔画数、笔顺数据、逐笔顺序展示或在线笔顺练习；Unicode 码点查询不包含字形笔顺。 |
| LDDGO-05-040 | [百家姓全文带拼音](https://www.lddgo.net/common/surname) | missing | — | 没有带拼音的百家姓全文、姓氏排名/顺序或查询资料；注册文本工具处理输入文本，不提供百家姓参考数据。 |
| LDDGO-05-041 | [在线英文日期格式化](https://www.lddgo.net/common/date-format) | partial | `date-calculator` | 日期计算结果通过 Intl.DateTimeFormat 显示英文长日期（英文映射为 en-US）；没有独立美式/英式风格选择、ordinal/短长格式切换，不能据此认定双制英文日期格式化齐全。 |
| LDDGO-05-042 | [在线油耗计算器](https://www.lddgo.net/common/fuel-calculator) | partial | `fuel-cost-calculator` | 可按已知距离、L/100km 或 US mpg 和油价计算燃油量、总费用及单位里程花费；油耗是输入值，没有按实际加油量/行驶距离反算百公里或单位里程油耗的模式。 |
| LDDGO-05-043 | [电饭煲预约时长计算器](https://www.lddgo.net/common/rice-cooker) | missing | — | 没有吃饭时间、烹煮时长、预约等待时长三者的双向时刻运算流程；通用倒计时只接持续时间，日期计算不计算这些时分关系。 |
| LDDGO-05-044 | [励志句子](https://www.lddgo.net/common/quote) | missing | — | 没有励志句子语料及随机展示流程；Lorem ipsum 生成占位文本，不提供正能量/励志语句库。 |
| LDDGO-05-045 | [毒鸡汤](https://www.lddgo.net/common/anti-quote) | missing | — | 没有毒鸡汤语料及随机展示流程；Lorem ipsum 生成占位文本，不能代替该语义语料库，更不能声称具备目录所述 2000+ 句。 |
| LDDGO-05-046 | [在线颜文字大全](https://www.lddgo.net/common/emoticons) | missing | — | 没有多字符颜文字（kaomoji）分类与复制目录；emoji 面板提供原生 emoji 序列，花体字工具变换字母，均不是颜文字库。 |
| LDDGO-05-047 | [闰年计算器](https://www.lddgo.net/common/leap-year-calculator) | missing | — | 日期计算会遵循闰年日历，但没有按年份判断、按区间列出闰年或公元前年份流程；内部日期处理不能等同于已注册的闰年枚举工具。 |
| LDDGO-05-048 | [在线体脂率计算器](https://www.lddgo.net/common/bfp) | partial | `body-fat-calculator` | 已实现 US Navy 围度估算（身高、腰围、颈围及女性臀围）；没有 BMI 推算体脂模式。公式与分类只用于估计，不能推定为医学诊断或认定目录的多公式选择已经覆盖。 |
| LDDGO-05-049 | [在线生肖查询](https://www.lddgo.net/common/chinse-zodiac) | partial | `lunar-calendar-converter` | 可通过输入公历日期得到按农历新年换年的生肖；没有按年龄查生肖、按生肖反查年龄或生肖年份表。仅按公历年份相差 12 年推导会忽略春节边界，不能当作已实现的逆查。 |
| LDDGO-05-050 | [身高体重计算器](https://www.lddgo.net/common/height-weight-calculator) | partial | `ideal-weight-calculator`, `bmi-calculator` | 身高工具显示 WHO BMI 18.5–24.9 对应体重区间及 Devine 参考值；没有中国/WHO 标准切换，也不列完整偏瘦/肥胖体重区间。成人身高有效范围与筛查性质须保留。 |
| LDDGO-05-051 | [世界时间查询](https://www.lddgo.net/common/world-time) | partial | `timezone-converter` | 可比较 21 个城市当前时间、UTC 偏移和今天逐小时对照；没有任意选择日期/时刻或完整世界时区输入，不能把当前日表当作任意历史/未来时刻换算。 |
| LDDGO-05-052 | [在线时钟](https://www.lddgo.net/common/clock) | missing | — | 虽有当前时间的文本显示，没有模拟表盘时钟、可设背景和全屏时钟的工具流程；时间戳或时区页面的数字时间不是模拟钟表。 |
| LDDGO-05-053 | [在线倒数日](https://www.lddgo.net/common/countdown-days) | partial | `date-calculator` | 两日期差可计算到指定日期的天数；没有持续更新的事件倒数日卡片和把倒数日状态编码成可恢复/可分享二维码的流程。通用二维码接文本/网址，不与倒数日状态接线。 |
| LDDGO-05-054 | [在线时辰时间转换](https://www.lddgo.net/common/chinese-lunar-time) | missing | — | 现有农历工具转换日期，时间单位工具换算秒/分/时等持续量；没有十二时辰或九十六刻与钟点的双向映射，不能把日期历法库当作已暴露的时辰工具。 |
| LDDGO-05-055 | [股票版时间计算器](https://www.lddgo.net/common/stock-time) | needs-source | — | 官方目录仅说明“股票相关的特殊的时间序列”，未说明输入、交易市场、时区、交易日历或序列公式；可确认本地只有通用日期/工作日流程，但不足以判断该专门股票序列与哪种能力等价，需详情控件或算法来源。 |
| LDDGO-05-056 | [工作日计算器](https://www.lddgo.net/common/workday) | partial | `workdays-calculator` | 可在固定周末模式和用户假日列表下计算/增加工作日；没有中国法定节假日内置表，且 isWorkday 永远排除周末，无法表达被调休为工作日的周六/周日。 |
| LDDGO-05-057 | [在线翻页时钟](https://www.lddgo.net/common/digital-clock) | missing | — | 没有翻页数字时钟、背景设置、全屏或计时模式引擎；其他工具中的实时数字文字不能代替翻页时钟交互。 |
| LDDGO-05-058 | [在线手写签名](https://www.lddgo.net/common/signature) | partial | `sign-pdf` | PDF 签名工具提供鼠标/触控手写并将透明 PNG 墨迹嵌入 PDF；没有独立 PNG/JPEG/SVG 签名下载、线条颜色/粗细选择，最终产物要求提供 PDF。内部 PNG 中间值不等于可下载图片能力。 |
| LDDGO-05-059 | [在线抽奖转盘](https://www.lddgo.net/common/turntable) | partial | `random-name-picker` | 转盘可录入候选项、随机抽取、移除中奖者并展示历史；所有候选项等概率，没有显式权重字段或结果文件下载，不能把重复文本当成完整权重设置。 |
| LDDGO-05-060 | [在线盲文翻译器](https://www.lddgo.net/common/braille) | missing | — | 没有文本↔盲文翻译规则、中文现行/双拼盲文或英语盲文规范选择；Unicode 编码转换只表示字符码点，不执行盲文语言转写。 |
| LDDGO-05-061 | [在线旋转时钟](https://www.lddgo.net/common/rotate-clock) | missing | — | 没有旋转数字时钟和全屏展示引擎；现有时间显示只输出文本，不能推定动画时钟已实现。 |
| LDDGO-05-062 | [提前还贷计算器](https://www.lddgo.net/common/loan-prepayment-calculator) | partial | `mortgage-calculator` | 可模拟固定等额本息贷款从起始每月额外还款，显示节省利息和缩短月数；没有任意已还期数/一次性提前还贷/减月供与缩期限选择，也没有等额本金提前还贷对比。 |
| LDDGO-05-063 | [在线色盲色弱测试](https://www.lddgo.net/common/color-blind-test) | missing | — | 没有色盲图题库、答题评分或红/绿等色觉类型分级测试。对比度工具计算 WCAG 前景/背景比值，不测试人的色觉；医学测试图来源与用途不可由配色工具推断。 |
| LDDGO-05-064 | [在线反应速度测试](https://www.lddgo.net/common/reaction-time-test) | missing | — | 没有随机视觉/声音刺激、早按判断、刺激到响应的时差测量或结果分享流程；秒表只是用户主动开始/停止，不能代替反应速度测试。 |
| LDDGO-05-065 | [在线随机分组](https://www.lddgo.net/common/random-group) | missing | — | 没有把整组名单分配成多个组、组数/组大小设置或 TXT/Excel 分组导出；现有转盘每次只抽出一项，不能当成随机分组。 |
| LDDGO-05-066 | [在线Emoji表情符号大全](https://www.lddgo.net/common/emoji) | existing | `emoji-picker` | 677 个精选 emoji 分成八组，可按英文名称搜索并点击复制，覆盖目录所述分类浏览与一键复制核心；不声称覆盖全部 Unicode emoji、中文搜索或相同分组。 |
| LDDGO-05-067 | [第几天计算器](https://www.lddgo.net/common/day-calculator) | missing | — | 没有日期到当年第几天/第几周，以及第几天/第几周反查日期的输入模式；两日期相差周数不是周编号，年初规则/ISO 周制亦未暴露。 |
| LDDGO-05-068 | [在线外国人永久居留身份证号码生成](https://www.lddgo.net/common/foreign-id-generator) | missing | — | 居民身份证样本发生器按 GB 11643 格式，不实现外国人永久居留证的国籍、受理地及专门编码校验规则；不能复用 18 位长度就视为相同号码类型。需官方规范与代码表来源。 |
| LDDGO-05-069 | [在线永居证号码查询](https://www.lddgo.net/common/foreign-identity-query) | missing | — | 居民身份证校验仅解析其地区码、生日和顺序号；没有新版永居证受理地、国籍和专用编码的批量解析，长度同为 18 位不足以建立等价。 |
| LDDGO-05-070 | [在线盲文输入](https://www.lddgo.net/common/braille-input) | missing | — | 没有字母/数字键盘的六点/八点盲文点位输入或盲文单元编辑界面；Unicode 转换不提供键位到点位的输入工作流。 |
| LDDGO-05-072 | [在线随机点名](https://www.lddgo.net/common/random-roll) | partial | `random-name-picker` | 可从名单单次随机抽取，允许保留中奖者重复抽取或抽后移除；缺名单分组、一次抽多个结果的参数。上限 100 行也应保留，不能把逐次手动抽取算批量点名。 |
| LDDGO-05-073 | [在线电子木鱼](https://www.lddgo.net/common/wooden-fish) | missing | — | 没有木鱼敲击、自动敲击、音效/颜色设置流程；倒计时归零提示音只是计时器附属行为，不能代替木鱼交互。 |
| LDDGO-05-074 | [在线尺子](https://www.lddgo.net/common/ruler) | missing | — | 没有屏幕尺、实物校准、厘米/英寸/市尺刻度及颜色设置；单位换算只输出数值，不能测量屏幕上的长度。 |
| LDDGO-05-075 | [在线掷硬币](https://www.lddgo.net/common/flip-coin) | missing | — | 注册清单没有硬币正反面抛掷流程；通用数字随机或要求用户将正反面作为名单输入的转盘没有硬币状态/结果表达，作为相邻随机能力记录，不计为现成硬币工具。 |
| LDDGO-05-076 | [在线手持弹幕](https://www.lddgo.net/common/danmaku) | missing | — | 没有滚动 LED/手持弹幕显示、速度、渐变、闪烁、背景图等控制；花体字仅转换字符，不播放或渲染上述动态展示。 |
| LDDGO-05-077 | [在线子女身高计算器](https://www.lddgo.net/common/child-height-calculator) | missing | — | 没有父母/儿童参数身高预测、儿童年龄身高标准或生长参考数据；成人理想体重从身高推体重，不是子女身高预测。需要注明适用人群与可靠生长数据，不能用成人公式代替。 |
| LDDGO-05-078 | [在线成语填空](https://www.lddgo.net/common/idiom-fill) | missing | — | 没有按成语任意位置一个/多个汉字匹配的成语数据库；通用查找替换只对用户输入语料运算，不提供成语检索数据。 |
| LDDGO-05-079 | [在线退休年龄计算器](https://www.lddgo.net/common/retirement-age) | missing | — | 退休储蓄引擎让用户输入退休年龄，只预测积累余额；没有出生年月、男性/两类女性职工、渐进延迟月数、弹性提前/延后退休规则。需官方实施日期/岗位口径表，不能把财务模拟当政策年龄计算。 |
| LDDGO-05-080 | [在线abc乐谱编辑器](https://www.lddgo.net/common/abc-music-notation) | missing | — | 没有 abc 乐谱解析、五线谱预览、MIDI 或 WAV 合成下载；音频提取从已有视频抽音轨，Markdown 预览解析文档，均不生成乐谱或音乐。 |
| LDDGO-05-081 | [在线胎儿体重计算器](https://www.lddgo.net/common/fetal-weight-calculator) | missing | — | 预产期工具仅计算日期/孕周，不接宫高、腹围、双顶径或股骨长，不含胎儿估重公式与按孕周生长分布表；需要医学公式、参考人群及生长数据来源，不能由孕周结果虚构体重。 |
| LDDGO-05-082 | [在线提词器](https://www.lddgo.net/common/teleprompter) | missing | — | 没有提词文本播放、字体/背景、速度/时长、镜像与全屏控制流程；现有文本编辑和计时器没有接线形成提词器。 |
| LDDGO-07-001 | [在线阶乘计算器](https://www.lddgo.net/math/factorial) | missing | — | 科学计算器支持函数白名单中的标量运算，不含阶乘函数或 ! 运算符；没有任意大小整数阶乘和结果文件导出。安装或底层存在 BigInt 不构成此注册流程。 |
| LDDGO-07-002 | [在线斐波那契数列计算器](https://www.lddgo.net/math/fibonacci) | missing | — | 没有斐波那契数列索引/序列生成、超大整数输出或文件下载流程；科学计算器没有 Fibonacci 函数，普通四则计算不构成数列工具。 |
| LDDGO-07-003 | [在线分解质因数工具](https://www.lddgo.net/math/decomposition-prime) | missing | — | 没有大整数质因数分解、质因子列表或分解公式；进制转换虽使用 BigInt，只变换表示，科学计算器白名单也没有质因数分解。 |
| LDDGO-07-004 | [在线分数计算器](https://www.lddgo.net/math/fraction) | partial | `scientific-calculator` | 表达式能输入 1/2+1/3 等商并得到浮点结果；没有精确分子/分母表示、约分、分数输出或小数转分数。标量除法不等于完整有理数运算，结果默认 12 位有效数字。 |
| LDDGO-07-005 | [在线面积计算器](https://www.lddgo.net/math/area) | missing | — | 没有按圆/扇形/圆环/三角形等形状接尺寸并套公式计算面积的流程；area-converter 只转换已知面积单位，用户手写公式到科学计算器不算形状计算器。 |
| LDDGO-07-006 | [在线平均数计算器](https://www.lddgo.net/math/avg) | missing | — | 没有数列输入或算术/几何/平方/调和平均、中位数、众数统计；科学计算器白名单只接标量单参数函数，不含这些聚合函数。 |
| LDDGO-07-007 | [在线方差和标准差计算器](https://www.lddgo.net/math/std-dev) | missing | — | 没有批量数列的样本/总体方差和标准差；科学计算器函数白名单不含统计聚合，能手工写求和公式不构成该工作流。 |
| LDDGO-07-008 | [在线次方和开方计算器](https://www.lddgo.net/math/square-power-root) | partial | `scientific-calculator` | 表达式支持实数幂和 sqrt，亦可输入 x^(1/n) 得某些实数根；没有列出任意次开方的全部复数根，负数非整数幂受 JavaScript Math 的实数域限制。 |
| LDDGO-07-009 | [在线周长计算器](https://www.lddgo.net/math/perimeter-calculator) | missing | — | 没有按几何形状输入尺寸、显示周长公式/示意图的流程；通用表达式计算不内置椭圆、扇形或四边形周长模型。 |
| LDDGO-07-010 | [在线TeX/LaTeX数学公式转图片](https://www.lddgo.net/math/latex-to-image) | missing | — | Markdown 引擎使用 marked 解析与 HTML 白名单清理，SVG 转换器接现成 SVG 栅格化；没有 TeX/LaTeX 数学排版到 SVG 和公式图片下载。两者不能拼成已实现的 TeX 渲染能力。 |
| LDDGO-07-011 | [在线数独生成器](https://www.lddgo.net/math/sudoku-generator) | missing | — | 没有数独盘面/解验证、难度生成、交互填数或打印流程；不重复随机整数不能保证数独规则、唯一解或难度。 |
| LDDGO-07-012 | [在线对数计算器](https://www.lddgo.net/math/logarithm-calculator) | partial | `scientific-calculator` | 支持 log10、自然对数，也可手填换底表达式 log(x)/log(b)；没有专门任意底输入面板或对数函数图表。单个数值结果不覆盖目录声明的底数对应图形。 |
| LDDGO-07-013 | [在线迷宫生成器](https://www.lddgo.net/math/maze-generator) | missing | — | 没有迷宫图、连通路径/墙体生成、形状与复杂度参数或图片导出；随机数只提供原始数值，不生成迷宫结构。 |
| LDDGO-07-014 | [在线体积计算器](https://www.lddgo.net/math/volume-calculator) | missing | — | 没有长方体、圆锥、三角锥等形状的尺寸模型与体积公式输出；volume-converter 只换算已知体积的单位，通用计算器需要用户自行提供公式。 |
| LDDGO-07-015 | [在线比例计算器](https://www.lddgo.net/math/proportional-calculator) | partial | `aspect-ratio-calculator` | 比例宽/高加一个新尺寸可以算出等比例另一尺寸，覆盖正比例第四项的一部分；比例两项必须为正，界面以宽高/缩放为模型，没有通用四位置未知数选择或全部有符号/零值比例情形。 |
| LDDGO-07-016 | [在线舒尔特方格注意力测试](https://www.lddgo.net/math/schulte-table) | missing | — | 没有 5×5 随机 1–25 方格、按顺序点选注意力训练或方格下载；随机数和秒表没有组合为网格测试，不能推断训练/测量效果。 |
| LDDGO-07-017 | [在线表面积计算器](https://www.lddgo.net/math/surface-area-calculator) | missing | — | 没有立体几何形状的尺寸、各面面积相加和表面积公式流程；面积单位换算和通用表达式输入不包含数十种立体表面积模型。 |
| LDDGO-07-020 | [最大公约数-最小公倍数计算器](https://www.lddgo.net/math/gcd-lcm-calculator) | missing | — | 没有一组任意大整数的最大公约数/最小公倍数输入与输出；比例页面只按宽高缩放，BigInt 进制转换也不执行这两个整数算法。 |
| LDDGO-07-021 | [矩阵计算器](https://www.lddgo.net/math/matrix-calculator) | missing | — | 没有实/复矩阵算术、行列式、逆或转置的计算器。科学计算器只返回 number，CSV 表格编辑器虽能转置文本矩形，但不解析或计算矩阵数值，不能算矩阵代数覆盖。 |
| LDDGO-07-022 | [在线24点计算器](https://www.lddgo.net/common/twenty-four-points-calculator) | missing | — | 没有枚举四个数的算式求 24、无解判断或生成可解题目的流程；通用表达式只能验证用户手写算式，随机数不能保证题目可解。 |
| LDDGO-07-023 | [在线计算器](https://www.lddgo.net/math/calculator) | partial | `scientific-calculator` | 已注册输入表达式与实数四则、幂根、对数/三角函数；采用 JavaScript number 和固定 12 位有效数字，没有大整数/高精度小数/复数/矩阵、概率、关系或统计函数集。 |
| LDDGO-07-024 | [在线圆周率PI查询](https://www.lddgo.net/math/pi-query) | missing | — | 科学计算器只暴露 Math.PI 常量并以 12 位有效数字显示；没有按位数检索 π、百万位精度或结果文件下载。固定浮点常量不构成高位数查询工具。 |
| LDDGO-07-025 | [在线猜数字](https://www.lddgo.net/common/guess-number) | missing | — | 没有隐藏目标、猜测状态、1A2B 或大小反馈的游戏流程；随机数发生器会直接显示抽取结果，不能当成猜数字游戏。 |
| LDDGO-07-026 | [在线数字排序](https://www.lddgo.net/math/number-sort) | partial | `text-sorter` | 已有按行数值排序和复制，但 numeric 模式用 parseFloat 相减，超大整数或高精度小数会失真；只按行输入，无目录声明的数字提取/多输入方式，也没有按数值降序专用模式。 |
| LDDGO-07-027 | [在线三角函数计算器](https://www.lddgo.net/math/trigonometric-calculator) | partial | `scientific-calculator` | 支持 sin/cos/tan 与 asin/acos/atan，DEG/RAD 可切换（反函数可由键盘输入）；结果固定 12 位有效数字，没有用户精度设置。没有开展同输入或极点/数值稳定性比较。 |

## 验证与限制

已检查：105 个 ID 精确覆盖且唯一；与四条历史记录无重叠；所有 mapped/related slug 均来自实际分类数组并进入 ALL_TOOLS；每个源码锚点的路径、行号、原文均精确匹配当前文件。此检查不替代功能测试和浏览器验收。

JSON 是逐项证据源：`2026-11-21-lddgo-fullmap-daily-math.json`。未修改代码、总目录及其他研究。
