import { describe, expect, it } from "vitest";
import { countPemCerts, decodeCertificate, extractPemCert, generateSelfSignedCert } from "@/tools/_lib/x509-decode";

/**
 * CN-035 X.509 证书解析/自签发。
 *
 * 测试向量来源(全部为 openssl 4.1.0 现场产出,非凭记忆):
 * - fixture = `openssl req -x509 -newkey rsa:2048 -nodes -keyout k.pem -out ca.pem
 *   -days 3650 -subj "/C=CN/ST=Beijing/L=Beijing/O=Zoyku Test/OU=QA/CN=test.zoyku.com
 *   /emailAddress=qa@zoyku.com" -addext "subjectAltName=DNS:test.zoyku.com,
 *   DNS:www.test.zoyku.com,IP:127.0.0.1" -addext keyUsage=critical,digitalSignature,
 *   keyEncipherment -addext extendedKeyUsage=serverAuth`
 * - 期望值 = `openssl x509 -in ca.pem -text -noout` 与 `-fingerprint -sha256/-sha1` 的输出
 *   (sha256 51:27:92:99:…:D5,sha1 56:9D:F3:C0:…:0A:3F;serial 22b1a1…5b;
 *   notAfter 2036-11-20T05:36:37Z)
 */

// 内联 fixture(仅证书公钥部分,无任何私钥;磁盘版会被 .gitignore 的 *.pem 规则挡住)
const FIXTURE = `-----BEGIN CERTIFICATE-----
MIIEMDCCAxigAwIBAgIUIrGhf6yA5bZlbTBNrv3wsu56PlswDQYJKoZIhvcNAQEL
BQAwgYkxCzAJBgNVBAYTAkNOMRAwDgYDVQQIDAdCZWlqaW5nMRAwDgYDVQQHDAdC
ZWlqaW5nMRMwEQYDVQQKDApab3lrdSBUZXN0MQswCQYDVQQLDAJRQTEXMBUGA1UE
AwwOdGVzdC56b3lrdS5jb20xGzAZBgkqhkiG9w0BCQEWDHFhQHpveWt1LmNvbTAe
Fw0yNjExMjMwNTM2MzdaFw0zNjExMjAwNTM2MzdaMIGJMQswCQYDVQQGEwJDTjEQ
MA4GA1UECAwHQmVpamluZzEQMA4GA1UEBwwHQmVpamluZzETMBEGA1UECgwKWm95
a3UgVGVzdDELMAkGA1UECwwCUUExFzAVBgNVBAMMDnRlc3Quem95a3UuY29tMRsw
GQYJKoZIhvcNAQkBFgxxYUB6b3lrdS5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IB
DwAwggEKAoIBAQCPDLCfomxlfr6GFDewaaQt8n4pN3Mdp9IA1lkNbkxnCSxJLB/d
nUOJoKjGshi+QTh0keBfnTuBhc7bA1Ysio0zC2TFQ1OcVNowi80j/R2+J18lnx7v
3MnctrGPbwMTOz1gzsBTz9IodH1qLoSw1n5AVazwbjfxaO2s+okvezgck5RGapRf
LZGlK8ZIyFz6zujUhvic+/To90K/AC6xRutkd6orO3g8PfE4InPtVaUfSe2ex8ew
6tLj0crg0Sh7PqemLRCgnzdxuoc+CFo88g3JLQ7IMosw/oBlaRrQy6F8uOcrxeIK
GXOPXOApAR7cgqeTE5Jzraqjcui6aQd5Rv9ZAgMBAAGjgY0wgYowHQYDVR0OBBYE
FDoShKQSHG20QBL/jACj2MDDic7LMA8GA1UdEwEB/wQFMAMBAf8wMwYDVR0RBCww
KoIOdGVzdC56b3lrdS5jb22CEnd3dy50ZXN0LnpveWt1LmNvbYcEfwAAATAOBgNV
HQ8BAf8EBAMCBaAwEwYDVR0lBAwwCgYIKwYBBQUHAwEwDQYJKoZIhvcNAQELBQAD
ggEBAFjOzOJbUnU2SpYDncci23zPYoawvjc8M4n2RTld0Qbn6V7nlchvvp+4Yoyb
t9pygX5XKiNQtp6YIkWVmRp6F2TsWd+Kr60fH45oqBaVugMEFh35TLbq3KXz/85T
vYfkRKPlm1lfJpX36yHxkf0rfR6pXr5ebowLMV77LMbwbTdmiFsjkdW/tzQJfjLt
KDjvOpb8u6+LcFHz0ank4TaZSK2AmNZp8HjU0lnI/BYSKxDeAqArYpt1RXAPMox4
MuNGXmImNvRDAzPXeX0d8VFwyojuM0ipjvsYlHPSuDtjbzixPeSHNlhp7voC3kQt
K7NY5LwUFeD9wf63Gs64/5SMWc8=
-----END CERTIFICATE-----`;
const FIXED_NOW = new Date("2026-11-23T13:00:00Z");

describe("PEM 提取", () => {
  it("从裸 PEM 中取出证书块", () => {
    expect(extractPemCert(FIXTURE)).toBe(FIXTURE.trim());
  });

  it("混杂文本(fullchain 场景)取首块并计数", () => {
    const noisy = `# bundle\n${FIXTURE}\n${FIXTURE}\n# trailing`;
    expect(countPemCerts(noisy)).toBe(2);
    expect(extractPemCert(noisy)).toBe(FIXTURE.trim());
  });

  it("无 PEM → null", () => {
    expect(extractPemCert("hello world")).toBeNull();
    expect(countPemCerts("hello")).toBe(0);
  });
});

describe("解析(openssl 锚定)", () => {
  it("subject/issuer/序列号/版本逐字符匹配 openssl 输出", async () => {
    const r = await decodeCertificate(FIXTURE, FIXED_NOW);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const d = r.data;
    expect(d.subject).toBe("C=CN, ST=Beijing, L=Beijing, O=Zoyku Test, OU=QA, CN=test.zoyku.com, E=qa@zoyku.com");
    expect(d.selfIssued).toBe(true);
    expect(d.serialHex).toBe("22b1a17fac80e5b6656d304daefdf0b2ee7a3e5b");
    expect(d.version).toBe(3);
  });

  it("有效期与天数剩余(now 注入固定值)", async () => {
    const r = await decodeCertificate(FIXTURE, FIXED_NOW);
    if (!r.ok) throw new Error("decode failed");
    expect(r.data.notBefore).toBe("2026-11-23T05:36:37.000Z");
    expect(r.data.notAfter).toBe("2036-11-20T05:36:37.000Z");
    expect(r.data.expired).toBe(false);
    expect(r.data.notYetValid).toBe(false);
    // 2026-11-23T13:00 → 2036-11-20T05:36 ≈ 3649.7 天 → floor 3649
    expect(r.data.daysRemaining).toBeGreaterThan(3600);
    expect(r.data.daysRemaining).toBeLessThan(3660);
  });

  it("SHA-256/SHA-1 指纹与 openssl -fingerprint 完全一致", async () => {
    const r = await decodeCertificate(FIXTURE, FIXED_NOW);
    if (!r.ok) throw new Error("decode failed");
    expect(r.data.fingerprintSha256).toBe(
      "51:27:92:99:E4:89:29:E1:BF:F8:DD:91:EE:FB:B2:E1:6B:B6:BA:CF:66:C9:AD:0A:33:7C:59:53:79:20:80:D5",
    );
    expect(r.data.fingerprintSha1).toBe("56:9D:F3:C0:E1:51:C1:11:B9:6C:94:BB:B3:55:BF:4A:C5:1D:0A:3F");
  });

  it("签名算法/公钥算法与位数(sha256WithRSAEncryption / RSA 2048)", async () => {
    const r = await decodeCertificate(FIXTURE, FIXED_NOW);
    if (!r.ok) throw new Error("decode failed");
    expect(r.data.signatureAlgorithm).toBe("sha256WithRSAEncryption");
    expect(r.data.publicKeyAlgorithm).toBe("RSA");
    expect(r.data.publicKeyBits).toBe(2048);
  });

  it("SAN 逐项(DNS×2 + IP 127.0.0.1)", async () => {
    const r = await decodeCertificate(FIXTURE, FIXED_NOW);
    if (!r.ok) throw new Error("decode failed");
    expect(r.data.subjectAltNames).toEqual([
      { type: "dns", value: "test.zoyku.com" },
      { type: "dns", value: "www.test.zoyku.com" },
      { type: "ip", value: "127.0.0.1" },
    ]);
  });

  it("KeyUsage(digitalSignature+keyEncipherment)/EKU serverAuth/CA flag=TRUE 来自 -addext", async () => {
    const r = await decodeCertificate(FIXTURE, FIXED_NOW);
    if (!r.ok) throw new Error("decode failed");
    expect(r.data.keyUsage).toEqual(["digitalSignature", "keyEncipherment"]);
    expect(r.data.extendedKeyUsage).toContain("serverAuth");
    // fixture 用 -addext basicConstraints 默认 CA:TRUE(openssl req -x509 的默认),
    // 但 keyUsage 被 -addext 覆盖成 digitalSignature,keyEncipherment → 不含 keyCertSign。
    // OpenSSL X509_check_ca 口径 = CA:TRUE && keyCertSign,所以 caUsable=false;
    // node:crypto 对同一证书也返回 ca=false(已现场核对),两值都输出不做静默合并。
    expect(r.data.isCa).toBe(true);
    expect(r.data.caUsable).toBe(false);
  });

  it("自签证书自身验签通过(只验自签,不验信任链)", async () => {
    const r = await decodeCertificate(FIXTURE, FIXED_NOW);
    if (!r.ok) throw new Error("decode failed");
    expect(r.data.selfSignatureValid).toBe(true);
  });

  it("过期判定:now 推到 notAfter 之后", async () => {
    const future = new Date("2037-01-01T00:00:00Z");
    const r = await decodeCertificate(FIXTURE, future);
    if (!r.ok) throw new Error("decode failed");
    expect(r.data.expired).toBe(true);
    expect(r.data.daysRemaining).toBeLessThan(0);
  });
});

describe("拒绝路径", () => {
  it("空输入 → empty", async () => {
    const r = await decodeCertificate("   \n ", FIXED_NOW);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("empty");
  });

  it("无 PEM → noPem", async () => {
    const r = await decodeCertificate("just some text", FIXED_NOW);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("noPem");
  });

  it("PEM 外壳正确但内容损坏 → parse(不抛异常)", async () => {
    const broken = "-----BEGIN CERTIFICATE-----\nAAAA\n-----END CERTIFICATE-----";
    const r = await decodeCertificate(broken, FIXED_NOW);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("parse");
  });
});

describe("自签发测试证书", () => {
  it("生成 → 解析闭环:SAN/CN/自签验签/SHA-256 指纹往返一致", async () => {
    const gen = await generateSelfSignedCert({
      commonName: "example.test",
      organization: "Zoyku QA",
      country: "US",
      sanDns: ["www.example.test"],
      sanIp: ["10.0.0.1"],
      days: 90,
    });
    expect(gen.ok).toBe(true);
    if (!gen.ok) return;

    expect(gen.certPem).toContain("-----BEGIN CERTIFICATE-----");
    expect(gen.keyPem).toContain("-----BEGIN RSA PRIVATE KEY-----");

    const back = await decodeCertificate(gen.certPem, new Date());
    expect(back.ok).toBe(true);
    if (!back.ok) return;

    expect(back.data.subjectCN).toBe("example.test");
    expect(back.data.selfIssued).toBe(true);
    expect(back.data.selfSignatureValid).toBe(true);
    expect(back.data.fingerprintSha256).toBe(gen.fingerprintSha256);
    expect(back.data.publicKeyBits).toBe(2048);
    expect(back.data.isCa).toBe(false);
    expect(back.data.keyUsage).toContain("digitalSignature");
    expect(back.data.keyUsage).toContain("keyEncipherment");
    expect(back.data.extendedKeyUsage).toContain("serverAuth");
    const dns = back.data.subjectAltNames.filter((n) => n.type === "dns").map((n) => n.value);
    expect(dns).toContain("example.test");
    expect(dns).toContain("www.example.test");
    expect(back.data.subjectAltNames.some((n) => n.type === "ip" && n.value === "10.0.0.1")).toBe(true);
  });

  it("单标签 CN(localhost)也进 SAN — RFC 6125 废弃 CN 匹配后只填 CN 的证书必被浏览器拒绝", async () => {
    const gen = await generateSelfSignedCert({ commonName: "localhost", sanIp: ["127.0.0.1"], days: 30 });
    if (!gen.ok) throw new Error("gen failed");
    const back = await decodeCertificate(gen.certPem, new Date());
    if (!back.ok) throw new Error("decode failed");
    const dns = back.data.subjectAltNames.filter((n) => n.type === "dns").map((n) => n.value);
    expect(dns).toContain("localhost");
    expect(back.data.subjectAltNames.some((n) => n.type === "ip" && n.value === "127.0.0.1")).toBe(true);
  });

  it("CA 模式:basicConstraints CA + keyCertSign → 可签发(caUsable)", async () => {
    const gen = await generateSelfSignedCert({ commonName: "Test Root CA", ca: true, days: 3650 });
    if (!gen.ok) throw new Error("gen failed");
    const back = await decodeCertificate(gen.certPem, new Date());
    if (!back.ok) throw new Error("decode failed");
    expect(back.data.isCa).toBe(true);
    expect(back.data.caUsable).toBe(true);
    expect(back.data.keyUsage).toContain("keyCertSign");
    // CA 的人类可读 CN 不应被塞进 dNSName
    expect(back.data.subjectAltNames.filter((n) => n.type === "dns")).toEqual([]);
  });

  it("CN 为空拒绝;国家码非两位拒绝", async () => {
    expect((await generateSelfSignedCert({ commonName: "  " })).ok).toBe(false);
    const bad = await generateSelfSignedCert({ commonName: "x.test", country: "USA" });
    expect(bad.ok).toBe(false);
    if (!bad.ok) expect(bad.code).toBe("parse");
  });
});
