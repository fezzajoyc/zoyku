import { describe, expect, it } from "vitest";
import { parseUrl } from "@/tools/_lib/url-parser";

describe("URL parser authority and scheme policy", () => {
  it.each([
    ["example.com:8080/path?x=1#top", "example.com", "8080", "/path"],
    ["example.com:8080?x=1#top", "example.com", "8080", "/"],
    ["localhost:3000/path", "localhost", "3000", "/path"],
    ["LOCALHOST:3000?x=1", "localhost", "3000", "/"],
    ["127.0.0.1:8080/path", "127.0.0.1", "8080", "/path"],
    ["[::1]:8080/path?x=1#top", "[::1]", "8080", "/path"],
    ["[2001:db8::1]:8443/#top", "[2001:db8::1]", "8443", "/"],
    ["//example.com:8080/path", "example.com", "8080", "/path"],
  ])("treats the bare authority %s as HTTPS", (input, host, port, pathname) => {
    expect(parseUrl(input)).toMatchObject({ protocol: "https", host, port, pathname });
  });
  it.each([
    "https://example.com:8443/path", "http://example.com/path", "ftp://example.com/path",
    "wss://example.com:8443/socket", "ws://example.com/socket", "file:///tmp/a.txt",
    "mailto:user@example.com?subject=hello", "data:text/plain,a%2Fb", "urn:isbn:9780140328721",
    "tel:+123456789", "sms:+123456789", "about:blank", "blob:https://example.com/id",
    "javascript:alert(1)", "myapp:opaque?x=1#top", "myapp://host:123/path", "my.app://host:123/path",
  ])("retains the explicit scheme of %s without navigating", input => {
    const native = new URL(input);
    expect(parseUrl(input)).toMatchObject({ protocol: native.protocol.slice(0, -1), host: native.hostname, port: native.port, pathname: native.pathname, hash: native.hash.slice(1) });
  });
  it("preserves ambiguous single-label/custom schemes and makes host intent explicit", () => {
    expect(parseUrl("myapp:8080/path")).toMatchObject({ protocol: "myapp", host: "", pathname: "8080/path" });
    expect(parseUrl("my.app:payload")).toMatchObject({ protocol: "my.app", host: "", pathname: "payload" });
    expect(parseUrl("//myapp:8080/path")).toMatchObject({ protocol: "https", host: "myapp", port: "8080" });
    expect(parseUrl("my.app:8080/path")).toMatchObject({ protocol: "https", host: "my.app", port: "8080" });
    expect(parseUrl("my.app://8080/path")).toMatchObject({ protocol: "my.app", host: "8080", pathname: "/path" });
  });
  it.each(["?x=1", "#top", "2001:db8::1", "[broken]:80/", "example.com:65536/path", "https://example.com:-1/", "https://"])("rejects a relative-only or malformed URL %s", input => {
    expect(parseUrl(input)).toBeNull();
  });
});

describe("lossless URL path and ordered query decomposition", () => {
  it("keeps internal and trailing empty path segments", () => {
    expect(parseUrl("https://example.com/a//b/")).toMatchObject({ pathname: "/a//b/", segments: ["a", "", "b", ""] });
    expect(parseUrl("https://example.com//a//")).toMatchObject({ pathname: "//a//", segments: ["", "a", "", ""] });
    expect(parseUrl("https://example.com/")?.segments).toEqual([""]);
    expect(parseUrl("mailto:")?.segments).toEqual([]);
  });
  it("decodes after splitting so encoded slashes are never extra path separators", () => {
    expect(parseUrl("https://example.com/a%2Fb//%E4%B8%AD/"))
      .toMatchObject({ pathname: "/a%2Fb//%E4%B8%AD/", segments: ["a/b", "", "中", ""] });
  });
  it("retains malformed segment escapes verbatim and leaves pathname/hash intact", () => {
    expect(parseUrl("https://example.com/%E0%A4%A/%ZZ#h%20i"))
      .toMatchObject({ pathname: "/%E0%A4%A/%ZZ", segments: ["%E0%A4%A", "%ZZ"], hash: "h%20i" });
  });
  it("keeps duplicate query order, empty keys/values and native plus decoding", () => {
    expect(parseUrl("example.com:8080/a//?tag=a+b&tag=%2B&empty=&=value&flag#top"))
      .toMatchObject({ pathname: "/a//", segments: ["a", "", ""], params: [
        { key: "tag", value: "a b" }, { key: "tag", value: "+" }, { key: "empty", value: "" },
        { key: "", value: "value" }, { key: "flag", value: "" },
      ], hash: "top" });
  });
  it("retains browser host/default-port normalization and serializable output", () => {
    const parsed = parseUrl("  https://EXAMPLE.com:443/中文?q=%2B#h%20i　");
    expect(parsed).toMatchObject({ protocol: "https", host: "example.com", port: "", pathname: "/%E4%B8%AD%E6%96%87", segments: ["中文"], params: [{ key: "q", value: "+" }], hash: "h%20i" });
    expect(JSON.parse(JSON.stringify(parsed))).toEqual(parsed);
  });
  it.each(["", " \t　", "https://exam ple.com", "example.com/a b", null, undefined, 12, {}, []])("handles invalid or empty input without throwing: %s", input => {
    expect(parseUrl(input)).toBeNull();
  });
  it("handles a valid path longer than ten thousand characters without truncation", () => {
    const path = "中".repeat(10_000);
    expect(parseUrl("https://example.com/" + path)?.segments).toEqual([path]);
  });
});
