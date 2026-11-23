/**
 * CN-035:X.509 证书解析与自签发(基于 node-forge,懒加载)。
 *
 * 能力边界(诚实声明,自带 deepDive 与文案同源):
 * - 解析:从 PEM 中提取证书,输出 subject/issuer/序列号/有效期/天数剩余/签名算法/
 *   公钥算法与位数/SHA-1+SHA-256 指纹/SAN/KeyUsage/ExtendedKeyUsage/是否 CA。
 * - 校验:只做「本机自校验」(cert.verify(cert))——即自签证书能被自身公钥验证通过。
 *   **不做信任链验证**(没有系统根证书库、不查 CRL/OCSP、不判断是否被 CA 签发)。
 * - 生成:自签发一张测试用证书(RSA 2048),可选 SAN/有效期/CN。
 *
 * 锚(测试向量来源,全部为 openssl 现场产出,非凭记忆):
 * tests/fixtures/self-signed-rsa-2048.pem 由
 * `openssl req -x509 -newkey rsa:2048 -nodes ... -addext subjectAltName=...`
 * 生成,其 SHA-256/SHA-1 指纹由 `openssl x509 -fingerprint` 输出核对。
 */

export type CertErrorCode =
  | "empty" // 空输入
  | "noPem" // 找不到 PEM 块
  | "parse" // 解析失败(损坏/非证书)
  | "unsupported"; // 运行时缺 WebCrypto/node-forge

export type CertResult =
  | { ok: true; data: CertInfo }
  | { ok: false; code: CertErrorCode; message?: string };

export type GeneralName = { type: "dns" | "ip" | "email" | "uri" | "other"; value: string };

export type CertInfo = {
  subject: string;
  subjectCN: string;
  issuer: string;
  /** 自签(self-issued)时 subject === issuer */
  selfIssued: boolean;
  serialHex: string;
  version: number;
  notBefore: string;
  notAfter: string;
  /** 相对 now 的天数(负值=已过期;>0 表示还有多少天) */
  daysRemaining: number;
  expired: boolean;
  notYetValid: boolean;
  signatureAlgorithm: string;
  publicKeyAlgorithm: string;
  publicKeyBits: number;
  fingerprintSha256: string;
  fingerprintSha1: string;
  subjectAltNames: GeneralName[];
  keyUsage: string[];
  extendedKeyUsage: string[];
  /** basicConstraints 的 CA 标志(原始位) */
  isCa: boolean;
  /** 能否真正签发下级证书 = isCa && keyUsage 含 keyCertSign。
   *  OpenSSL 的 X509_check_ca 就按这个口径判(CA:TRUE 但无 keyCertSign 视为不可用),
   *  所以 node:crypto 的 cert.ca 对这类证书返回 false——本工具两个值都给出,不做静默合并。 */
  caUsable: boolean;
  /** 自校验结果:自签证书用自身公钥验签;非自签一律 null(无信任链能力) */
  selfSignatureValid: boolean | null;
  /** 输出用:证书规范化 PEM(仅含证书体) */
  pem: string;
};

/* -------------------------------------------------------------------------- */
/* PEM 提取                                                                    */
/* -------------------------------------------------------------------------- */

const PEM_BLOCK_RE = /-----BEGIN (CERTIFICATE|TRUSTED CERTIFICATE)-----[\s\S]*?-----END (?:CERTIFICATE|TRUSTED CERTIFICATE)-----/g;

/** 从任意文本里找第一个 PEM 证书块(容忍前后杂文、多个块取首个)。 */
export function extractPemCert(input: string): string | null {
  const m = input.match(PEM_BLOCK_RE);
  return m && m.length > 0 ? m[0] : null;
}

/** 有几张证书(用于提示多证书场景,如 fullchain)。 */
export function countPemCerts(input: string): number {
  return (input.match(PEM_BLOCK_RE) ?? []).length;
}

/* -------------------------------------------------------------------------- */
/* 解析                                                                        */
/* -------------------------------------------------------------------------- */

const SIG_OID_LABEL: Record<string, string> = {
  "1.2.840.113549.1.1.5": "sha1WithRSAEncryption",
  "1.2.840.113549.1.1.11": "sha256WithRSAEncryption",
  "1.2.840.113549.1.1.12": "sha384WithRSAEncryption",
  "1.2.840.113549.1.1.13": "sha512WithRSAEncryption",
  "1.2.840.113549.1.1.10": "rsassaPss",
  "1.2.840.10045.4.3.2": "ecdsa-with-SHA256",
  "1.2.840.10045.4.3.3": "ecdsa-with-SHA384",
  "1.2.840.10045.4.3.4": "ecdsa-with-SHA512",
  "1.2.840.10045.4.1": "ecdsa-with-SHA1",
  "1.3.101.112": "Ed25519",
  "1.3.101.113": "Ed448",
};

const KEY_USAGE_BITS = [
  "digitalSignature",
  "nonRepudiation",
  "keyEncipherment",
  "dataEncipherment",
  "keyAgreement",
  "keyCertSign",
  "cRLSign",
  "encipherOnly",
  "decipherOnly",
] as const;

const EKU_OID_LABEL: Record<string, string> = {
  "1.3.6.1.5.5.7.3.1": "serverAuth",
  "1.3.6.1.5.5.7.3.2": "clientAuth",
  "1.3.6.1.5.5.7.3.3": "codeSigning",
  "1.3.6.1.5.5.7.3.4": "emailProtection",
  "1.3.6.1.5.5.7.3.8": "timeStamping",
  "1.3.6.1.5.5.7.3.9": "OCSPSigning",
};

const GN_TYPE: Record<number, GeneralName["type"]> = { 1: "email", 2: "dns", 6: "uri", 7: "ip" };

function colonHex(hex: string): string {
  return (hex.match(/../g) ?? []).join(":").toUpperCase();
}

function attrsToString(attrs: { shortName?: string; name?: string; value?: unknown }[]): string {
  return attrs.map((a) => `${a.shortName ?? a.name ?? "?"}=${String(a.value)}`).join(", ");
}

/** 解析单张证书。now 可注入(测试确定性)。 */
export async function decodeCertificate(input: string, now: Date = new Date()): Promise<CertResult> {
  if (input.trim() === "") return { ok: false, code: "empty" };
  const pem = extractPemCert(input);
  if (!pem) return { ok: false, code: "noPem" };

  let forge: typeof import("node-forge");
  try {
    forge = await import("node-forge");
  } catch {
    return { ok: false, code: "unsupported", message: "node-forge unavailable" };
  }

  let cert: ReturnType<typeof forge.pki.certificateFromPem>;
  try {
    cert = forge.pki.certificateFromPem(pem);
  } catch (e) {
    return { ok: false, code: "parse", message: e instanceof Error ? e.message : String(e) };
  }

  const subject = attrsToString(cert.subject.attributes as never);
  const issuer = attrsToString(cert.issuer.attributes as never);
  const subjectCN = String(cert.subject.getField("CN")?.value ?? cert.subject.getField("O")?.value ?? "");

  // 指纹:对所有 to-be-signed 内容做哈希(即 ASN.1 重编码后的 DER)
  const der = forge.asn1.toDer(forge.pki.certificateToAsn1(cert)).getBytes();
  const sha256 = forge.md.sha256.create().update(der).digest().toHex();
  const sha1 = forge.md.sha1.create().update(der).digest().toHex();

  const notBefore = cert.validity.notBefore;
  const notAfter = cert.validity.notAfter;
  const dayMs = 86_400_000;
  const daysRemaining = Math.floor((notAfter.getTime() - now.getTime()) / dayMs);

  const sanExt = cert.getExtension("subjectAltName") as
    | { altNames?: { type: number; value?: string; ip?: string }[] }
    | undefined;
  const subjectAltNames: GeneralName[] = (sanExt?.altNames ?? []).map((a) => ({
    type: GN_TYPE[a.type] ?? "other",
    value: a.type === 7 ? String(a.ip ?? a.value ?? "") : String(a.value ?? ""),
  }));

  const kuExt = cert.getExtension("keyUsage") as Record<string, unknown> | undefined;
  const keyUsage = KEY_USAGE_BITS.filter((k) => kuExt?.[k] === true);

  // ExtendedKeyUsage:forge 的 extKeyUsage 只给 serverAuth 等布尔;OID 列表在 extKeyUsage.oids 里(部分版本无)
  const ekuExt = cert.getExtension("extKeyUsage") as
    | { serverAuth?: boolean; clientAuth?: boolean; oids?: { value?: string }[] }
    | undefined;
  let extendedKeyUsage: string[] = [];
  if (ekuExt?.oids && ekuExt.oids.length > 0) {
    extendedKeyUsage = ekuExt.oids
      .map((o) => EKU_OID_LABEL[String(o.value)] ?? String(o.value))
      .filter(Boolean);
  } else if (ekuExt) {
    extendedKeyUsage = Object.entries(ekuExt)
      .filter(([k, v]) => v === true && k !== "critical" && k !== "name")
      .map(([k]) => k);
  }

  const bcExt = cert.getExtension("basicConstraints") as { cA?: boolean } | undefined;
  const isCa = bcExt?.cA === true;
  const caUsable = isCa && keyUsage.includes("keyCertSign");

  const selfIssued = subject === issuer;
  let selfSignatureValid: boolean | null = null;
  if (selfIssued) {
    try {
      selfSignatureValid = Boolean(cert.verify(cert));
    } catch {
      selfSignatureValid = false;
    }
  }

  const pk = cert.publicKey as { n?: { bitLength(): number } };
  const publicKeyBits = pk.n ? pk.n.bitLength() : 0;

  return {
    ok: true,
    data: {
      subject,
      subjectCN,
      issuer,
      selfIssued,
      serialHex: String(cert.serialNumber),
      version: (cert.version ?? 0) + 1, // forge 的 version 是 0-based(X.509 里 v3 = 2)
      notBefore: notBefore.toISOString(),
      notAfter: notAfter.toISOString(),
      daysRemaining,
      expired: now.getTime() > notAfter.getTime(),
      notYetValid: now.getTime() < notBefore.getTime(),
      signatureAlgorithm: SIG_OID_LABEL[cert.siginfo.algorithmOid] ?? `OID ${cert.siginfo.algorithmOid}`,
      publicKeyAlgorithm: pk.n ? "RSA" : "unknown",
      publicKeyBits,
      fingerprintSha256: colonHex(sha256),
      fingerprintSha1: colonHex(sha1),
      subjectAltNames,
      keyUsage,
      extendedKeyUsage,
      isCa,
      caUsable,
      selfSignatureValid,
      pem,
    },
  };
}

/* -------------------------------------------------------------------------- */
/* 自签发测试证书                                                              */
/* -------------------------------------------------------------------------- */

export type SelfSignOptions = {
  commonName: string;
  organization?: string;
  organizationalUnit?: string;
  country?: string;
  /** 额外 SAN(逗号分隔的 DNS 名/IP);CN 会自动进 SAN */
  sanDns?: string[];
  sanIp?: string[];
  /** 有效天数,默认 365 */
  days?: 30 | 90 | 365 | 3650;
  /** 是否为 CA 证书,默认 false */
  ca?: boolean;
};

export type SelfSignResult =
  | { ok: true; certPem: string; keyPem: string; serialHex: string; fingerprintSha256: string }
  | { ok: false; code: CertErrorCode; message?: string };

const COUNTRY_MUST_BE_2 = /^[A-Z]{2}$/;
const IPV4 = /^\d{1,4}(\.\d{1,4}){3}$/;

export async function generateSelfSignedCert(opts: SelfSignOptions, now: Date = new Date()): Promise<SelfSignResult> {
  const cn = opts.commonName.trim();
  if (cn === "") return { ok: false, code: "empty", message: "CN required" };

  let forge: typeof import("node-forge");
  try {
    forge = await import("node-forge");
  } catch {
    return { ok: false, code: "unsupported", message: "node-forge unavailable" };
  }

  const country = (opts.country ?? "").trim().toUpperCase();
  if (country !== "" && !COUNTRY_MUST_BE_2.test(country)) {
    return { ok: false, code: "parse", message: "Country must be a 2-letter ISO code" };
  }

  const days = opts.days ?? 365;

  // RSA 2048 同步生成(浏览器里是 ~100-500ms 的阻塞,文案已说明)
  const keys = forge.pki.rsa.generateKeyPair({ bits: 2048, workers: -1 });
  const cert = forge.pki.createCertificate();
  cert.publicKey = keys.publicKey;
  cert.serialNumber = "00" + forge.util.bytesToHex(forge.random.getBytesSync(16));
  cert.validity.notBefore = new Date(now.getTime() - 60_000); // 1 分钟宽容(时钟偏差惯例)
  cert.validity.notAfter = new Date(now.getTime() + days * 86_400_000);

  const attrs: { name?: string; shortName?: string; value?: string }[] = [{ name: "commonName", value: cn }];
  if (opts.organization) attrs.push({ name: "organizationName", value: opts.organization.trim() });
  if (opts.organizationalUnit) attrs.push({ shortName: "OU", value: opts.organizationalUnit.trim() });
  if (country !== "") attrs.push({ name: "countryName", value: country });
  cert.setSubject(attrs as never);
  cert.setIssuer(attrs as never);

  const exts: unknown[] = [{ name: "basicConstraints", cA: Boolean(opts.ca), critical: true }];
  exts.push(
    opts.ca
      ? { name: "keyUsage", keyCertSign: true, cRLSign: true, digitalSignature: true, critical: true }
      : { name: "keyUsage", digitalSignature: true, keyEncipherment: true, critical: true },
  );
  exts.push({ name: "extKeyUsage", [opts.ca ? "codeSigning" : "serverAuth"]: true, [opts.ca ? "serverAuth" : "codeSigning"]: false });
  exts.push({ name: "subjectKeyIdentifier" });

  // SAN:CN 若无点号或像主机名一律进 DNS;IP 走 IP 类型
  const dnsNames = new Set<string>(opts.sanDns ?? []);
  // CN 进 SAN 的规则(与浏览器实际看重的字段对齐):
  // - 含点号的主机名 → dNSName
  // - IP 字面量 → iPAddress(上方已处理)
  // - 无点号的单标签名(localhost)→ dNSName。RFC 6125 已废弃 CN 匹配,
  //   只留 CN 的证书会被所有浏览器拒绝,所以 localhost 也必须进 SAN。
  // 只把「像主机名」的 CN 放进 SAN:不含空白、不含逗号/RFC 4514 特殊字符。
  // CA 证书的 CN 通常是「Test Root CA」这类人类可读名,塞进 dNSName 反而非法。
  const looksLikeHostname = /^[!-~]+$/.test(cn) && !/[,+="<>;\\]/.test(cn) && !opts.ca;
  if (!IPV4.test(cn) && looksLikeHostname) dnsNames.add(cn);
  const ips = (opts.sanIp ?? []).filter((v) => IPV4.test(v));
  if (IPV4.test(cn)) ips.push(cn);
  if (dnsNames.size > 0 || ips.length > 0) {
    exts.push({
      name: "subjectAltName",
      altNames: [...[...dnsNames].map((value) => ({ type: 2, value })), ...ips.map((ip) => ({ type: 7, ip }))],
    });
  }

  try {
    cert.setExtensions(exts as never);
    cert.sign(keys.privateKey, forge.md.sha256.create());
  } catch (e) {
    return { ok: false, code: "parse", message: e instanceof Error ? e.message : String(e) };
  }

  const der = forge.asn1.toDer(forge.pki.certificateToAsn1(cert)).getBytes();
  const fp = colonHex(forge.md.sha256.create().update(der).digest().toHex());

  return {
    ok: true,
    certPem: forge.pki.certificateToPem(cert),
    keyPem: forge.pki.privateKeyToPem(keys.privateKey),
    serialHex: cert.serialNumber,
    fingerprintSha256: fp,
  };
}
