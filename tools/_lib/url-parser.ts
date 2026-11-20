export type UrlParam = { key: string; value: string };
export type ParsedUrl = {
  protocol: string;
  host: string;
  port: string;
  pathname: string;
  segments: string[];
  params: UrlParam[];
  hash: string;
};

const SCHEME = /^[a-z][a-z0-9+.-]*:/i;
const AUTHORITY_SCHEME = /^[a-z][a-z0-9+.-]*:\/\//i;
const BARE_HOST_PORT = /^(?:localhost|[^:/?#]+\.[^:/?#]+):\d*(?=[/?#]|$)/i;

/**
 * Local inspection only; delegates normalization/decoding to URL APIs.
 * Disambiguation policy: explicit scheme:// is always retained. A dotted
 * host or localhost followed by a numeric (or empty) port is an HTTPS
 * authority, not an opaque scheme. Other legal colon prefixes are retained
 * as custom schemes: myapp:8080 stays opaque; //myapp:8080 forces a host.
 * A dotted custom scheme with a numeric payload needs scheme:// to override
 * the host:port preference. IPv6 authorities use their normal [brackets].
 */
export function parseUrl(raw: unknown): ParsedUrl | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (!trimmed || /\s/.test(trimmed)) return null;
  let candidate = trimmed;
  if (candidate.startsWith("//")) candidate = `https:${candidate}`;
  else if (!AUTHORITY_SCHEME.test(candidate) && (BARE_HOST_PORT.test(candidate) || !SCHEME.test(candidate))) candidate = `https://${candidate}`;
  try {
    const url = new URL(candidate);
    // Remove only the structural leading slash; interior/trailing empty
    // entries are real parts of pathname and must survive before decoding.
    const rawSegments = url.pathname === "" ? [] : url.pathname.split("/").slice(url.pathname.startsWith("/") ? 1 : 0);
    const segments = rawSegments.map(segment => {
      try { return decodeURIComponent(segment); }
      catch { return segment; }
    });
    return {
      protocol: url.protocol.replace(/:$/, ""), host: url.hostname, port: url.port,
      pathname: url.pathname, segments,
      params: [...url.searchParams.entries()].map(([key, value]) => ({ key, value })),
      hash: url.hash.replace(/^#/, ""),
    };
  } catch { return null; }
}
