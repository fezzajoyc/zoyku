# CRC-16/Modbus 实现与核验

日期：2026-11-21（Asia/Shanghai）  
工具：`crc16-modbus`，纯浏览器实现；另注册为 MCP `crc16_modbus`。

## 需求依据

国内能力调研 CN-028 把 CRC16-Modbus 和协议校验字节序列为缺失能力。该项与密码学摘要不同，且 Modbus RTU 在线路上的低字节先行顺序容易与常规 16 位十六进制表示混淆。目录收录和同行说明只用于确认需求存在，不作为正确性证据。

## 算法口径

- CRC-16/Modbus 参数：width 16、poly `0x8005`（反射实现常数 `0xA001`）、init `0xFFFF`、refin/refout 为 true、xorout `0x0000`。
- UI 分开显示常规数值表示和 Modbus RTU 在线路发送的低字节先行表示。
- 输入按十六进制字节解析，忽略 JavaScript 空白，保留字节顺序；奇数位、非法字符和超过 1,000,000 字节均拒绝。
- 本地计算；CRC 只用于检测意外传输错误，不提供加密、认证或抗篡改保证。

## 核验来源

- [RevEng CRC Catalogue: CRC-16/MODBUS](https://reveng.sourceforge.io/crc-catalogue/16.htm#crc.cat.crc-16-modbus)：参数表、`123456789` 检查值 `0x4B37` 及低字节先行说明。
- [Modbus Protocol Reference Guide (official PDF)](https://www.modbus.org/docs/Modbus_Application_Protocol_V1_1b3.pdf)：本轮直连返回 HTTP 403，未能读取；因此未把此 PDF 当成本轮已核对证据。
- [LDDGO CRC 页面](https://www.lddgo.net/encrypt/crc) 和 [23bei CRC16 页面](https://www.23bei.com/tool/59.html)：需求/页面范围参考；同行页面未在本记录中作同输入正确性结论。

## 验收

- Modbus RTU 帧 `01 03 00 00 00 0A` → 常规 CRC `CDC5`，线路字节 `C5CD`。
- RevEng 检查向量 `31 32 33 34 35 36 37 38 39` → `4B37`，线路字节 `374B`。
- 空输入 → 初始化值 `FFFF`；`00 FF` 保留输入字节次序。
- 覆盖空格、tab、CR/LF、form feed、vertical tab、NBSP、Unicode line separator；测试明确不将零宽空格当分隔符。
- 覆盖奇数位、非法十六进制字元、最大输入边界、15 种语言交互标签和类型化错误的法语提示。
- MCP 走 SDK InMemoryTransport 协议测试，确认同一向量与明确字节序。

## 当前验证状态

- `tests/crc16.test.ts`：8 项通过。
- `tests/crc16.test.ts tests/registry.test.ts tests/overlays.test.ts tests/mcp.test.ts`：28 项通过。
- 全量 `npx vitest run`：90 个测试文件、2,402 项通过。
- `npx tsc --noEmit`：通过。
- `npm run build:mcp`：通过。
- `npm run lint`：0 errors、55 warnings；本轮新增/修改文件单独 ESLint 通过，无新增警告。
- 生产构建及真实浏览器验收需在交接前补录；未部署。

## 未完成范围

本项只实现 CRC-16/Modbus，不表示 CRC-8、CRC-16 其他参数族、CRC-32/64 或任意多项式配置已覆盖。同行同输入对照另见同行批次报告；没有记录的站点或场景均保持未验证。
