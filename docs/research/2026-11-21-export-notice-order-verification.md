# 小时自审：信用代码与人民币导出通知顺序

日期：2026-11-21（Asia/Shanghai）。自动化：`zoyku`。基线 `180554b`，分支 `codex/export-notice-order`。仍为209工具；本批只修两个既有工具的导出反馈，不新增能力或路由，未推送、未部署。

## 实际问题与最小修复

上批已修身份证工具的通知竞争；本次按同一模式追查两个独立导出处理器，实际浏览器确认仍有遗漏：旧复制未完成时，新的复制或下载已成功/失败，旧Promise后完成仍可覆盖较新的提示。新复制等待期间还会保留上一操作的成功/失败提示。

- `social-credit-engine.tsx`：旧版10场景中2通过、8失败；修复后10/10。包括Copy→Copy两种旧完成结果与新结果、Copy→Download成功/失败×旧resolve/reject，以及新Copy开始清除旧提示。
- `rmb-uppercase-engine.tsx`：旧版12场景中2通过、10失败；修复后12/12。另覆盖从下载成功/失败提示启动新的待定Copy。
- 两个产品文件各只改三行：Copy获取递增revision、开始清notice、Download递增revision。纯金额/信用代码算法、来源数据、15语文案、遮盖规则、复制/TXT内容和样式未修改。
- 新检查使用真实挂载页面，只对Clipboard和anchor等环境API注入延迟/失败。保护的是界面通知顺序；不声称可以取消已提交给操作系统的剪贴板写入。

永久脚本在原检查之后纳入新矩阵：信用代码31→41，原34个axe状态保留；人民币47→59，原6个axe状态保留。可单独导出 `socialCreditNoticeQA` / `rmbUppercaseNoticeRaceQA` 重跑竞态，不需反复长流程。新增/更新QA contract tests检查可移植性及覆盖矩阵；浏览器实际行为仍为主证据。

## 集成验收

| 检查 | 结果 |
| --- | --- |
| 全量Vitest | 82文件、2,204项通过、0失败 |
| TypeScript | `npx tsc --noEmit` exit0 |
| ESLint | 0错误、54条既有警告；两个修改产品文件定向无警告 |
| 生产构建 | exit0；9,757/9,757路径；构建ID `vuehGE6fiYQ_UYUDRNcag` |
| 生产浏览器 | Chrome 157.0.8103.79；20次冷启动+信用代码41+人民币59，**120/120**，0失败、无pageerror |
| 静态SEO / HTTP抽检 | 3,270/3,270静态页面；24/24 HTTP抽检，共25请求，0次429、0重试 |

生产导航按450ms统一节流，首次填写/提交的20个上下文不等水合、不重试。信用代码34个axe状态0 violations、0 incomplete；人民币6个整页状态0 violations，原有装饰字符/星标/嵌入代码背景incomplete保留，不等同全站通过。两份原有实际剪贴板、TXT内容、遮盖和错误恢复测试均保留并通过。独立只读交叉复审核对两个产品diff、环境API清理及22个红绿矩阵，并运行208项定向测试通过。

## 范围与后续

保留上一批的开发态首交互、额外导航失败诊断；本批没有认定这些未知根因已修复。局部axe与回归不等于全站AA，工具数/测试数不代表实际SEO排名或同行优势。小时巡检继续；本轮有可复现修复才发送完成通知。

完整红绿、日志及生产报告位于：

```text
/Users/zhuangxiangdi/Documents/anyThings/seo/out1/reports/zoyku-export-order-2026-11-21/
```
