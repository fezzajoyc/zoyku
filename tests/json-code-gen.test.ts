import { describe, expect, it } from "vitest";
import { jsonToCode } from "@/tools/_lib/json-code-gen";

/**
 * CN-032 JSON → Java/C#/Golang 类生成。锚 = 手写预期输出(类型映射规则确定性,
 * 输出不含外部依赖——代码结构断言而非逐字符匹配,容忍空白/顺序)。
 */

const SIMPLE = '{"userName":"tom","isActive":true,"score":95}';
const NESTED = '{"user":{"name":"tom","tags":["a","b"]},"count":3}';
const ARRAY_OBJ = '{"items":[{"id":1,"label":"x"},{"id":2,"label":"y"}]}';
const MIXED_TYPES = '{"val":null,"opt":false,"ratio":1.5,"count":42}';

describe("Java 生成", () => {
  it("简单对象 → public class + private 字段", () => {
    const r = jsonToCode(SIMPLE, "java", "User");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.code).toContain("public class User {");
    expect(r.code).toContain("private String userName;");
    expect(r.code).toContain("private boolean isActive;");
    expect(r.code).toContain("private int score;");
  });

  it("嵌套对象 → 独立类定义", () => {
    const r = jsonToCode(NESTED, "java", "Api");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.code).toContain("public class Api {");
    expect(r.code).toContain("public class User {");
    expect(r.code).toContain("private List<String> tags;");
  });

  it("对象数组 → List<InnerClass>", () => {
    const r = jsonToCode(ARRAY_OBJ, "java", "Resp");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.code).toContain("private List<Items> items;");
    expect(r.code).toContain("public class Items {");
  });

  it("null → Object", () => {
    const r = jsonToCode(MIXED_TYPES, "java", "Mixed");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.code).toContain("private Object val;");
    expect(r.code).toContain("private double ratio;");
    expect(r.code).toContain("private int count;");
  });
});

describe("C# 生成", () => {
  it("简单对象 → public class + PascalCase 属性", () => {
    const r = jsonToCode(SIMPLE, "csharp", "User");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.code).toContain("public class User");
    expect(r.code).toContain("public string UserName { get; set; }");
    expect(r.code).toContain("public bool IsActive { get; set; }");
    expect(r.code).toContain("public int Score { get; set; }");
  });

  it("对象数组 → List<InnerClass>", () => {
    const r = jsonToCode(ARRAY_OBJ, "csharp", "Resp");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.code).toContain("public List<Items> Items { get; set; }");
  });
});

describe("Golang 生成", () => {
  it("简单对象 → type struct + json tag", () => {
    const r = jsonToCode(SIMPLE, "go", "User");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.code).toContain("type User struct {");
    expect(r.code).toContain('UserName string `json:"userName"`');
    expect(r.code).toContain('IsActive bool `json:"isActive"`');
    expect(r.code).toContain('Score int `json:"score"`');
  });

  it("嵌套对象 → 内嵌 struct", () => {
    const r = jsonToCode(NESTED, "go", "Api");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.code).toContain("type Api struct {");
    expect(r.code).toContain("User User `json:\"user\"`");
    expect(r.code).toContain("type User struct {");
    expect(r.code).toContain("Tags []string `json:\"tags\"`");
  });

  it("对象数组 → []InnerStruct", () => {
    const r = jsonToCode(ARRAY_OBJ, "go", "Resp");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.code).toContain("Items []Items `json:\"items\"`");
  });
});

describe("拒绝路径", () => {
  it("空输入拒绝", () => {
    expect(jsonToCode("", "java", "X").ok).toBe(false);
    expect(jsonToCode("   ", "go", "X").ok).toBe(false);
  });

  it("非法 JSON → badJson", () => {
    const r = jsonToCode("{not json}", "java", "X");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("badJson");
  });

  it("数组根 → notObject(需包一层)", () => {
    const r = jsonToCode("[1,2]", "java", "X");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("notObject");
  });

  it("null 根 → notObject", () => {
    expect(jsonToCode("null", "java", "X").ok).toBe(false);
  });
});
