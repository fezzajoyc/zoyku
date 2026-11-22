/**
 * CN-025:docker run 命令 → docker-compose service YAML(单向)。
 * 纯手写 tokenizer + 最小 YAML emitter,零依赖,不引入 shell 解析库。
 *
 * 锚 = docs.docker.com docker run reference 与 compose file reference(services)自带示例,
 * 2026-11-22 抓取。映射对照:
 *   -p/-v/-e/--restart/--network/-w/-u/-h/-m/--cpus/... → ports/volumes/environment/restart/
 *   networks/working_dir/user/hostname/mem_limit/cpus(compose container specification 属性名)。
 *
 * 诚实策略:不认识的 flag 收进 "# unsupported: ..." 注释并返回 unsupported 列表,绝不静默丢弃;
 * --rm / -d / -P 这类 compose 语义不同的 flag 以注释 + disclosures 披露。
 * 输出仅覆盖本工具产出的标量/列表/映射结构,不是通用 YAML 序列化器。
 */

export type DockerComposeOk = {
  ok: true;
  yaml: string;
  /** 无法映射、收进 unsupported 注释的 flag(原样,如 "--health-cmd") */
  unsupported: string[];
  /** compose 语义不同、需要页面披露的 flag */
  disclosures: { rm: boolean; detach: boolean; publishAll: boolean };
};

export type DockerComposeErr = {
  ok: false;
  code: "empty" | "tooLong" | "notDockerRun" | "noImage" | "unterminatedQuote";
  message?: string;
};

export type DockerComposeResult = DockerComposeOk | DockerComposeErr;

const MAX_INPUT = 512_000;

export function errMessage(result: { code: string; message?: string }, locale: string): string {
  const zh = locale === "zh";
  const ja = locale === "ja";
  const es = locale === "es";
  const pt = locale === "pt";
  switch (result.code) {
    case "empty":
      if (zh) return "请输入 docker run 命令。";
      if (ja) return "docker run コマンドを入力してください。";
      if (es) return "Ingrese un comando docker run.";
      if (pt) return "Insira um comando docker run.";
      return "Enter a docker run command.";
    case "tooLong":
      return zh
        ? "输入超过 512,000 字符上限——请分段处理。"
        : ja
          ? "入力が 512,000 文字の上限を超えました — 分割して処理してください。"
          : es || pt
            ? "La entrada supera el límite de 512,000 caracteres: divídala en partes."
            : "Input exceeds the 512,000-character limit — split it into parts.";
    case "notDockerRun":
      return zh
        ? "命令需要以 docker run(或 docker container run)开头。"
        : ja
          ? "コマンドは docker run(または docker container run)で始まる必要があります。"
          : es || pt
            ? "El comando debe empezar por docker run (o docker container run)."
            : "The command must start with docker run (or docker container run).";
    case "noImage":
      return zh
        ? "找不到镜像名:docker run 需要 IMAGE 参数,请检查 flags 是否完整。"
        : ja
          ? "イメージ名が見つかりません:docker run には IMAGE 引数が必要です。"
          : es || pt
            ? "No se encontró la imagen: docker run necesita un argumento IMAGE."
            : "No image found: docker run needs an IMAGE argument.";
    case "unterminatedQuote":
      return zh
        ? "引号未闭合——请检查命令中的引号。"
        : ja
          ? "引用符が閉じられていません。"
          : es || pt
            ? "Hay comillas sin cerrar."
            : "There is an unterminated quote.";
    default:
      return result.message || (zh ? "解析失败。" : "Parsing failed.");
  }
}

/* ------------------------------------------------------------------ */
/* Tokenizer:POSIX 风格(shell 常见行为),支持引号、转义与 \ 续行。      */
/* ------------------------------------------------------------------ */

/** 合并 `\` + 换行(docker run 多行命令的续行写法)。 */
function joinContinuations(raw: string): string {
  let out = "";
  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    if (ch === "\\" && raw[i + 1] === "\n") {
      i++; // 跳过换行,\ 本身吞掉
      continue;
    }
    if (ch === "\\" && raw[i + 1] === "\r" && raw[i + 2] === "\n") {
      i += 2;
      continue;
    }
    out += ch;
  }
  return out;
}

/** shell 风格切词:单引号字面量、双引号内转义(" \ $ `)、未加引号的反斜杠转义。 */
export function tokenize(input: string): { tokens: string[]; unterminated: boolean } {
  const tokens: string[] = [];
  let cur = "";
  let hasCur = false;
  let i = 0;
  const push = () => {
    if (hasCur) tokens.push(cur);
    cur = "";
    hasCur = false;
  };
  while (i < input.length) {
    const ch = input[i];
    if (ch === " " || ch === "\t" || ch === "\n" || ch === "\r") {
      push();
      i++;
      continue;
    }
    if (ch === "'") {
      // 单引号:POSIX 无转义
      const end = input.indexOf("'", i + 1);
      if (end === -1) return { tokens, unterminated: true };
      cur += input.slice(i + 1, end);
      hasCur = true;
      i = end + 1;
      continue;
    }
    if (ch === '"') {
      // 双引号:\" \\ \$ \` 为转义,其余反斜杠保留
      let j = i + 1;
      let closed = false;
      while (j < input.length) {
        const c = input[j];
        if (c === "\\" && (input[j + 1] === '"' || input[j + 1] === "\\" || input[j + 1] === "$" || input[j + 1] === "`")) {
          cur += input[j + 1];
          hasCur = true;
          j += 2;
          continue;
        }
        if (c === '"') {
          closed = true;
          j++;
          break;
        }
        cur += c;
        hasCur = true;
        j++;
      }
      if (!closed) return { tokens, unterminated: true };
      i = j;
      continue;
    }
    if (ch === "\\") {
      const next = input[i + 1];
      if (next === undefined || next === "\n") {
        i++; // 行尾 \ 已被 joinContinuations 处理;这里兜底吞掉
        continue;
      }
      cur += next;
      hasCur = true;
      i += 2;
      continue;
    }
    cur += ch;
    hasCur = true;
    i++;
  }
  push();
  return { tokens, unterminated: false };
}

/* ------------------------------------------------------------------ */
/* 解析:flag 表 + 位置参数(image 在前,其后为 command/args)。          */
/* ------------------------------------------------------------------ */

type Parsed = {
  image: string;
  command: string[];
  // 重复型
  ports: string[];
  exposes: string[];
  volumes: string[];
  devices: string[];
  tmpfs: string[];
  environment: string[];
  envFile: string[];
  networks: string[];
  capAdd: string[];
  capDrop: string[];
  securityOpt: string[];
  groupAdd: string[];
  dns: string[];
  // 映射型(插入序)
  labels: [string, string][];
  extraHosts: [string, string][];
  sysctls: [string, string][];
  logOpts: [string, string][];
  // 单值型
  name: string | null;
  restart: string | null;
  workdir: string | null;
  user: string | null;
  hostname: string | null;
  memory: string | null;
  memoryReservation: string | null;
  memorySwap: string | null;
  cpus: string | null;
  cpuShares: string | null;
  cpuset: string | null;
  pidsLimit: string | null;
  oomScoreAdj: string | null;
  shmSize: string | null;
  stopSignal: string | null;
  platform: string | null;
  pullPolicy: string | null;
  entrypoint: string | null;
  pid: string | null;
  ipc: string | null;
  userns: string | null;
  logDriver: string | null;
  /** --network host/none/bridge/container:/service: → network_mode */
  networkMode: string | null;
  // 布尔型
  stdinOpen: boolean;
  tty: boolean;
  privileged: boolean;
  readOnly: boolean;
  init: boolean;
  oomKillDisable: boolean;
  noHealthcheck: boolean;
  // 披露型(compose 语义不同)
  rm: boolean;
  detach: boolean;
  publishAll: boolean;
};

function emptyParsed(): Parsed {
  return {
    image: "",
    command: [],
    ports: [], exposes: [], volumes: [], devices: [], tmpfs: [], environment: [], envFile: [],
    networks: [], capAdd: [], capDrop: [], securityOpt: [], groupAdd: [], dns: [],
    labels: [], extraHosts: [], sysctls: [], logOpts: [],
    name: null, restart: null, workdir: null, user: null, hostname: null,
    memory: null, memoryReservation: null, memorySwap: null, cpus: null, cpuShares: null,
    cpuset: null, pidsLimit: null, oomScoreAdj: null, shmSize: null, stopSignal: null,
    platform: null, pullPolicy: null, entrypoint: null, pid: null, ipc: null, userns: null,
    logDriver: null, networkMode: null,
    stdinOpen: false, tty: false, privileged: false, readOnly: false, init: false,
    oomKillDisable: false, noHealthcheck: false,
    rm: false, detach: false, publishAll: false,
  };
}

/** 值型长 flag → 处理器名。短 flag 同表。 */
const VALUE_FLAGS = new Set([
  "name", "publish", "expose", "volume", "mount", "env", "env-file", "restart", "network",
  "workdir", "user", "hostname", "memory", "memory-reservation", "memory-swap", "cpus",
  "cpu-shares", "cpuset-cpus", "pids-limit", "oom-score-adj", "shm-size", "stop-signal",
  "platform", "pull", "entrypoint", "device", "tmpfs", "add-host", "dns", "label", "cap-add",
  "cap-drop", "security-opt", "sysctl", "group-add", "pid", "ipc", "userns", "log-driver",
  "log-opt", "attach", "volumes-from", "cidfile", "detach-keys", "runtime", "isolation",
  "gpus", "health-cmd", "health-interval", "health-retries", "health-start-period",
  "health-timeout", "network-alias", "link", "domainname", "umask", "uts", "storage-opt",
  "cgroup-parent", "memory-swappiness", "cpu-period", "cpu-quota", "label-file", "env_file",
]);

/** docker 官方别名(见 run reference 示例 --net mynet)。 */
const FLAG_ALIASES: Record<string, string> = {
  net: "network",
  "env_file": "env-file",
};

/** 值型短 flag(按 docker run reference Options 表)。 */
const SHORT_VALUE = new Set(["p", "v", "e", "w", "u", "h", "m", "l", "c", "n", "a"]);
/** 布尔短 flag。 */
const SHORT_BOOL = new Set(["d", "i", "t", "P", "q"]);

type Ctx = { p: Parsed; unsupported: string[] };

function addUnsupported(ctx: Ctx, flag: string, value: string | null): void {
  ctx.unsupported.push(value === null || value === "" ? flag : `${flag} ${value}`);
}

function splitComma(v: string): string[] {
  return v.includes(",") ? v.split(",").map((s) => s.trim()).filter(Boolean) : [v];
}

function applyFlag(ctx: Ctx, flag: string, value: string | null): void {
  const p = ctx.p;
  const v = value ?? "";
  switch (flag) {
    case "name": p.name = v; break;
    case "publish": for (const s of splitComma(v)) p.ports.push(s); break;
    case "expose": for (const s of splitComma(v)) p.exposes.push(s); break;
    case "volume": for (const s of splitComma(v)) p.volumes.push(s); break;
    case "env": p.environment.push(v); break;
    case "env-file": p.envFile.push(v); break;
    case "restart": p.restart = v; break;
    case "network": applyNetwork(ctx, v); break;
    case "workdir": p.workdir = v; break;
    case "user": p.user = v; break;
    case "hostname": p.hostname = v; break;
    case "memory": p.memory = v; break;
    case "memory-reservation": p.memoryReservation = v; break;
    case "memory-swap": p.memorySwap = v; break;
    case "cpus": p.cpus = v; break;
    case "cpu-shares": p.cpuShares = v; break;
    case "cpuset-cpus": p.cpuset = v; break;
    case "pids-limit": p.pidsLimit = v; break;
    case "oom-score-adj": p.oomScoreAdj = v; break;
    case "shm-size": p.shmSize = v; break;
    case "stop-signal": p.stopSignal = v; break;
    case "platform": p.platform = v; break;
    case "pull": p.pullPolicy = v; break;
    case "entrypoint": p.entrypoint = v; break;
    case "device": p.devices.push(v); break;
    case "tmpfs": for (const s of splitComma(v)) p.tmpfs.push(s); break;
    case "add-host": {
      const idx = v.indexOf(":");
      if (idx > 0) p.extraHosts.push([v.slice(0, idx), v.slice(idx + 1)]);
      else addUnsupported(ctx, "--add-host", v);
      break;
    }
    case "dns": for (const s of splitComma(v)) p.dns.push(s); break;
    case "label": {
      const idx = v.indexOf("=");
      if (idx > 0) upsert(p.labels, v.slice(0, idx), v.slice(idx + 1));
      else if (v) upsert(p.labels, v, ""); // docker run:label 无值默认空串
      break;
    }
    case "cap-add": for (const s of splitComma(v)) p.capAdd.push(s); break;
    case "cap-drop": for (const s of splitComma(v)) p.capDrop.push(s); break;
    case "security-opt": p.securityOpt.push(v); break;
    case "sysctl": {
      const idx = v.indexOf("=");
      if (idx > 0) upsert(p.sysctls, v.slice(0, idx), v.slice(idx + 1));
      else addUnsupported(ctx, "--sysctl", v);
      break;
    }
    case "group-add": for (const s of splitComma(v)) p.groupAdd.push(s); break;
    case "pid": p.pid = v; break;
    case "ipc": p.ipc = v; break;
    case "userns": p.userns = v; break;
    case "log-driver": p.logDriver = v; break;
    case "log-opt": {
      const idx = v.indexOf("=");
      if (idx > 0) upsert(p.logOpts, v.slice(0, idx), v.slice(idx + 1));
      else addUnsupported(ctx, "--log-opt", v);
      break;
    }
    case "mount": applyMount(ctx, v); break;
    /* 布尔 */
    case "detach": p.detach = true; break;
    case "interactive": p.stdinOpen = true; break;
    case "tty": p.tty = true; break;
    case "rm": p.rm = true; break;
    case "publish-all": p.publishAll = true; break;
    case "privileged": p.privileged = true; break;
    case "read-only": p.readOnly = true; break;
    case "init": p.init = true; break;
    case "oom-kill-disable": p.oomKillDisable = true; break;
    case "no-healthcheck": p.noHealthcheck = true; break;
    /* 认识但无 compose 等价 → unsupported 注释 */
    case "quiet":
      addUnsupported(ctx, "--quiet (-q)", "CLI-only pull output suppression, no Compose equivalent");
      break;
    default:
      addUnsupported(ctx, `--${flag}`, value === null ? null : v);
  }
}

function upsert(entries: [string, string][], key: string, value: string): void {
  const found = entries.find(([k]) => k === key);
  if (found) found[1] = value;
  else entries.push([key, value]);
}

/** --network:host/none/bridge/container:/service: → network_mode;其余 → networks 列表。 */
function applyNetwork(ctx: Ctx, raw: string): void {
  const first = raw.split(",")[0].trim();
  if (first.startsWith("name=")) {
    const name = first.slice(5).trim();
    if (name) ctx.p.networks.push(name);
    for (const part of raw.split(",").slice(1)) {
      const kv = part.split("=");
      addUnsupported(ctx, `--network ${kv[0]}=`, kv.slice(1).join("=") || "");
    }
    return;
  }
  if (raw.includes(",")) {
    // 扩展语法里没有 name= 或首段是特殊值 → 整体 unsupported
    addUnsupported(ctx, "--network", raw);
    return;
  }
  if (/^(host|none|bridge)$/.test(raw) || /^(container|service):/.test(raw)) {
    ctx.p.networkMode = raw;
    return;
  }
  ctx.p.networks.push(raw);
}

/** --mount key=value,... → volumes 短语法;无法表达的部分进 unsupported 注释。 */
function applyMount(ctx: Ctx, raw: string): void {
  const pairs: [string, string][] = [];
  for (const part of raw.split(",")) {
    if (!part) continue;
    const idx = part.indexOf("=");
    if (idx <= 0) {
      // --mount 的布尔键(readonly/ro)不带等号
      if (part === "ro" || part === "readonly") {
        pairs.push([part, "true"]);
        continue;
      }
      addUnsupported(ctx, "--mount", part);
      continue;
    }
    pairs.push([part.slice(0, idx), part.slice(idx + 1)]);
  }
  const get = (...keys: string[]): string | null => {
    for (const k of keys) {
      const hit = pairs.find(([key]) => key === k);
      if (hit) return hit[1];
    }
    return null;
  };
  const type = get("type") ?? "volume";
  const src = get("src", "source", "volume-src");
  const dst = get("dst", "destination", "target");
  const ro = get("ro", "readonly") === "true" || pairs.some(([k]) => k === "ro" || k === "readonly");
  const extra = pairs.filter(([k]) => !["type", "src", "source", "volume-src", "dst", "destination", "target", "ro", "readonly"].includes(k));
  if (/^[A-Za-z]:/.test(src ?? "") || /^[A-Za-z]:/.test(dst ?? "")) {
    addUnsupported(ctx, "--mount", `${raw} (Windows drive-letter paths not supported)`);
    return;
  }
  if (!dst) {
    addUnsupported(ctx, "--mount", `${raw} (missing target)`);
    return;
  }
  if (type === "bind" || type === "volume") {
    const roSuffix = ro ? ":ro" : "";
    ctx.p.volumes.push(src ? `${src}:${dst}${roSuffix}` : dst);
    if (ro && src === null && type === "volume") {
      addUnsupported(ctx, "--mount", `${raw} (read-only anonymous volume has no short syntax)`);
    }
  } else if (type === "tmpfs") {
    ctx.p.tmpfs.push(dst);
  } else {
    addUnsupported(ctx, "--mount", `${raw} (type ${type})`);
  }
  for (const [k, val] of extra) {
    addUnsupported(ctx, `--mount ${k}=`, val);
  }
}

/* ------------------------------------------------------------------ */
/* 主入口。                                                            */
/* ------------------------------------------------------------------ */

export function dockerRunToCompose(input: string): DockerComposeResult {
  if (input.trim() === "") return { ok: false, code: "empty" };
  if (input.length > MAX_INPUT) return { ok: false, code: "tooLong" };
  const joined = joinContinuations(input);
  const { tokens, unterminated } = tokenize(joined);
  if (unterminated) return { ok: false, code: "unterminatedQuote" };
  if (tokens.length === 0) return { ok: false, code: "empty" };

  // 剥离 "$ " / "%" / "#" 等 shell 提示符与 sudo
  let at = 0;
  const looksLikePrompt = (t: string) => t === "$" || t === "%" || t === "#" || t.endsWith("$") || t.endsWith(">");
  if (tokens.length >= 2 && looksLikePrompt(tokens[0]) && (tokens[1] === "docker" || tokens[1] === "sudo")) at = 1;
  if (tokens[at] === "sudo" && tokens[at + 1] === "docker") at += 1;
  if (tokens[at] !== "docker") return { ok: false, code: "notDockerRun" };
  let rest = tokens.slice(at + 1);
  if (rest[0] === "container") rest = rest.slice(1);
  if (rest[0] !== "run") return { ok: false, code: "notDockerRun" };
  rest = rest.slice(1);

  const ctx: Ctx = { p: emptyParsed(), unsupported: [] };
  const p = ctx.p;

  let i = 0;
  let image: string | null = null;
  while (i < rest.length) {
    const tok = rest[i];
    // docker run [OPTIONS] IMAGE [COMMAND] [ARG...]:镜像之后的 token 一律是 command/args,
    // 不再按 flag 解析(如 nginx -g 'daemon off;' 的 -g 属于容器命令)。
    if (image !== null) {
      p.command.push(tok);
      i++;
      continue;
    }
    if (tok === "--") {
      // `--` 之后全部按位置参数处理
      i++;
      while (i < rest.length) {
        if (image === null) { image = rest[i]; } else { p.command.push(rest[i]); }
        i++;
      }
      break;
    }
    if (tok.startsWith("--")) {
      const eq = tok.indexOf("=");
      const rawName = eq === -1 ? tok.slice(2) : tok.slice(2, eq);
      const flag = FLAG_ALIASES[rawName] ?? rawName;
      if (eq !== -1) {
        applyFlag(ctx, flag, tok.slice(eq + 1));
        i++;
        continue;
      }
      if (VALUE_FLAGS.has(flag)) {
        const next = rest[i + 1];
        if (next === undefined) {
          addUnsupported(ctx, `--${flag}`, "(missing value)");
          i++;
          continue;
        }
        applyFlag(ctx, flag, next);
        i += 2;
        continue;
      }
      // 布尔长 flag
      if (BOOLEAN_LONG.has(flag)) {
        applyFlag(ctx, flag, null);
        i++;
        continue;
      }
      addUnsupported(ctx, tok, null);
      i++;
      continue;
    }
    if (tok.startsWith("-") && tok.length > 1) {
      const chars = tok.slice(1);
      let consumed = false;
      let ci = 0;
      let bad = false;
      while (ci < chars.length) {
        const c = chars[ci];
        if (c === "=") { ci++; continue; }
        if (SHORT_BOOL.has(c)) {
          applyFlag(ctx, SHORT_BOOL_FLAG[c], null);
          ci++;
          continue;
        }
        if (SHORT_VALUE.has(c)) {
          let val = chars.slice(ci + 1);
          if (val.startsWith("=")) val = val.slice(1);
          if (val === "") {
            const next = rest[i + 1];
            if (next === undefined) { addUnsupported(ctx, `-${c}`, "(missing value)"); consumed = true; bad = true; break; }
            applyFlag(ctx, SHORT_VALUE_FLAG[c], next);
            i += 1; // 多吞一个 token
            consumed = true;
          } else {
            applyFlag(ctx, SHORT_VALUE_FLAG[c], val);
            consumed = true;
          }
          ci = chars.length;
          break;
        }
        addUnsupported(ctx, `-${c}`, `(combined short flag "${tok}")`);
        bad = true;
        break;
      }
      i++;
      if (!consumed && !bad && chars === "") i++; // 孤立 "-" 无意义,跳过
      continue;
    }
    // 位置参数:第一个是镜像,其后是 command/args
    if (image === null) {
      image = tok;
    } else {
      p.command.push(tok);
    }
    i++;
  }

  if (!image || image.startsWith("-")) return { ok: false, code: "noImage" };
  p.image = image;

  return buildOutput(ctx);
}

const BOOLEAN_LONG = new Set([
  "detach", "interactive", "tty", "rm", "publish-all", "privileged", "read-only", "init",
  "oom-kill-disable", "no-healthcheck", "quiet",
]);

const SHORT_BOOL_FLAG: Record<string, string> = {
  d: "detach", i: "interactive", t: "tty", P: "publish-all", q: "quiet",
};

const SHORT_VALUE_FLAG: Record<string, string> = {
  p: "publish", v: "volume", e: "env", w: "workdir", u: "user", h: "hostname",
  m: "memory", l: "label", c: "cpu-shares", n: "name", a: "attach",
};

/* ------------------------------------------------------------------ */
/* 输出构建:service key、Y 节点树、最小 YAML emitter。                  */
/* ------------------------------------------------------------------ */

type YNode = string | number | boolean | { list: YNode[] } | { map: [string, YNode][] };

const yList = (items: YNode[]): YNode => ({ list: items });
const yMap = (entries: [string, YNode][]): YNode => ({ map: entries });

const PLAIN_RE = /^[A-Za-z0-9_][A-Za-z0-9_./@+-]*$/;
const YAML11_BOOL = /^(true|false|yes|no|on|off|null|~|y|n)$/i;
const NUMERIC_RE = /^[-+]?(\d[\d_]*(\.\d*)?([eE][+-]?\d+)?|\.\d+([eE][+-]?\d+)?)$/;
const HEX_OCTAL_RE = /^(0x[0-9a-fA-F]+|0o[0-7]+|0b[01]+)$/;

/**
 * 是否可作 YAML plain scalar(块上下文)。决定引号。
 * 含冒号的字符串:映射值位置允许纯字母开头的(nginx:alpine、on-failure:3,与 compose 官方
 * 文档示例一致);纯数字冒号串(端口/卷/192.168.1.1:80)一律引号——YAML 1.1 解析器
 * (PyYAML)会把 190:20:30 当六十进制整数,列表项里 compose 官方也用引号("8080:80")。
 */
const COLON_TOLERANT_RE = /^[A-Za-z0-9_][A-Za-z0-9_.:/@+=-]*$/;
const SEXAGESIMAL_RE = /^\d+(:\d+)+$/;

function isPlainSafe(s: string, inList: boolean): boolean {
  if (s === "" || s.length !== s.trim().length) return false;
  if (YAML11_BOOL.test(s) || NUMERIC_RE.test(s) || HEX_OCTAL_RE.test(s)) return false;
  if (PLAIN_RE.test(s)) return true;
  if (s.includes(":") && COLON_TOLERANT_RE.test(s) && !s.endsWith(":") && !SEXAGESIMAL_RE.test(s)) {
    return !inList; // 列表项按 compose 官方文档风格始终加引号
  }
  return false;
}

function scalarText(v: YNode, inList: boolean): string {
  if (typeof v === "number") return Number.isFinite(v) ? String(v) : "null";
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "string") {
    if (isPlainSafe(v, inList)) return v;
    return JSON.stringify(v);
  }
  throw new Error("scalar expected");
}

function emitNode(key: string, node: YNode, indent: number, lines: string[], inList = false): void {
  const pad = "  ".repeat(indent);
  if (typeof node !== "object") {
    lines.push(`${pad}${key}: ${scalarText(node, inList)}`);
    return;
  }
  if ("list" in node) {
    if (node.list.length === 0) {
      lines.push(`${pad}${key}: []`);
      return;
    }
    lines.push(`${pad}${key}:`);
    for (const item of node.list) {
      const itemPad = "  ".repeat(indent + 1);
      if (typeof item !== "object") {
        lines.push(`${itemPad}- ${scalarText(item, true)}`);
      } else if ("list" in item) {
        throw new Error("nested lists unsupported");
      } else {
        // 列表中的映射:第一键跟在 "- " 后,其余缩进
        const inner = item.map;
        if (inner.length === 0) { lines.push(`${itemPad}- {}`); continue; }
        const [firstK, ...restK] = inner;
        const firstValue = firstK[1];
        if (typeof firstValue !== "object") {
          lines.push(`${itemPad}- ${firstK[0]}: ${scalarText(firstValue, true)}`);
        } else {
          lines.push(`${itemPad}- ${firstK[0]}:`);
          emitRest(firstValue, indent + 2, lines);
        }
        emitRest({ map: restK } as YNode, indent + 2, lines);
      }
    }
    return;
  }
  // map
  if (node.map.length === 0) {
    lines.push(`${pad}${key}: {}`);
    return;
  }
  lines.push(`${pad}${key}:`);
  emitRest(node, indent + 1, lines);
}

function emitRest(node: YNode, indent: number, lines: string[]): void {
  if (typeof node !== "object" || !("map" in node)) throw new Error("expected map");
  const pad = "  ".repeat(indent);
  for (const [k, v] of node.map) {
    if (typeof v !== "object") {
      lines.push(`${pad}${k}: ${scalarText(v, false)}`);
      continue;
    }
    if ("list" in v) {
      emitNode(k, v, indent, lines);
      continue;
    }
    if (v.map.length === 0) {
      lines.push(`${pad}${k}: {}`);
      continue;
    }
    lines.push(`${pad}${k}:`);
    emitRest(v, indent + 1, lines);
  }
}

/** compose service 名:service key 正则限制(字母数字._-),首字符需为字母数字。 */
function sanitizeServiceName(raw: string): string {
  const cleaned = raw.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-{2,}/g, "-");
  if (!cleaned || !/^[A-Za-z0-9]/.test(cleaned)) return `svc-${cleaned}`.replace(/^-+/, "") || "app";
  return cleaned;
}

/** 镜像名 → 默认 service key:去掉 registry/tag/digest,取最后一段。 */
function serviceKeyFromImage(image: string): string {
  const noDigest = image.split("@")[0];
  const colon = noDigest.lastIndexOf(":");
  const pathPart = colon > noDigest.lastIndexOf("/") ? noDigest.slice(0, colon) : noDigest;
  const last = pathPart.split("/").pop() ?? "app";
  return sanitizeServiceName(last || "app");
}

function numericOrString(v: string): YNode {
  if (/^-?\d+(\.\d+)?$/.test(v)) {
    const n = Number(v);
    if (Number.isFinite(n)) return n;
  }
  return v;
}

function buildOutput(ctx: Ctx): DockerComposeOk {
  const p = ctx.p;
  const serviceName = p.name ? sanitizeServiceName(p.name) : serviceKeyFromImage(p.image);

  const entries: [string, YNode][] = [];
  entries.push(["image", p.image]);

  if (p.command.length > 0) {
    entries.push(["command", p.command.length === 1 ? p.command[0] : yList(p.command)]);
  }
  if (p.entrypoint !== null) entries.push(["entrypoint", p.entrypoint]);
  if (p.user !== null) entries.push(["user", p.user]);
  if (p.workdir !== null) entries.push(["working_dir", p.workdir]);
  if (p.environment.length > 0) entries.push(["environment", yList(p.environment)]);
  if (p.envFile.length > 0) entries.push(["env_file", yList(p.envFile)]);
  if (p.ports.length > 0) entries.push(["ports", yList(p.ports)]);
  if (p.exposes.length > 0) entries.push(["expose", yList(p.exposes)]);
  if (p.volumes.length > 0) entries.push(["volumes", yList(p.volumes)]);
  if (p.devices.length > 0) entries.push(["devices", yList(p.devices)]);
  if (p.tmpfs.length > 0) entries.push(["tmpfs", yList(p.tmpfs)]);
  if (p.networkMode !== null) entries.push(["network_mode", p.networkMode]);
  if (p.networks.length > 0) entries.push(["networks", yList(p.networks)]);
  if (p.restart !== null) entries.push(["restart", p.restart]);
  if (p.labels.length > 0) entries.push(["labels", yMap(p.labels.map(([k, v]) => [k, v] as [string, YNode]))]);
  if (p.hostname !== null) entries.push(["hostname", p.hostname]);
  if (p.memory !== null) entries.push(["mem_limit", numericOrString(p.memory)]);
  if (p.memoryReservation !== null) entries.push(["mem_reservation", numericOrString(p.memoryReservation)]);
  if (p.memorySwap !== null) entries.push(["memswap_limit", numericOrString(p.memorySwap)]);
  if (p.cpus !== null) entries.push(["cpus", numericOrString(p.cpus)]);
  if (p.cpuShares !== null) entries.push(["cpu_shares", numericOrString(p.cpuShares)]);
  if (p.cpuset !== null) entries.push(["cpuset", p.cpuset]);
  if (p.pidsLimit !== null) entries.push(["pids_limit", numericOrString(p.pidsLimit)]);
  if (p.shmSize !== null) entries.push(["shm_size", numericOrString(p.shmSize)]);
  if (p.oomScoreAdj !== null) entries.push(["oom_score_adj", numericOrString(p.oomScoreAdj)]);
  if (p.oomKillDisable) entries.push(["oom_kill_disable", true]);
  if (p.stopSignal !== null) entries.push(["stop_signal", p.stopSignal]);
  if (p.platform !== null) entries.push(["platform", p.platform]);
  if (p.pullPolicy !== null) entries.push(["pull_policy", p.pullPolicy]);
  if (p.privileged) entries.push(["privileged", true]);
  if (p.readOnly) entries.push(["read_only", true]);
  if (p.init) entries.push(["init", true]);
  if (p.stdinOpen) entries.push(["stdin_open", true]);
  if (p.tty) entries.push(["tty", true]);
  if (p.capAdd.length > 0) entries.push(["cap_add", yList(p.capAdd)]);
  if (p.capDrop.length > 0) entries.push(["cap_drop", yList(p.capDrop)]);
  if (p.securityOpt.length > 0) entries.push(["security_opt", yList(p.securityOpt)]);
  if (p.sysctls.length > 0) entries.push(["sysctls", yMap(p.sysctls.map(([k, v]) => [k, v] as [string, YNode]))]);
  if (p.groupAdd.length > 0) entries.push(["group_add", yList(p.groupAdd)]);
  if (p.pid !== null) entries.push(["pid", p.pid]);
  if (p.ipc !== null) entries.push(["ipc", p.ipc]);
  if (p.userns !== null) entries.push(["userns_mode", p.userns]);
  if (p.extraHosts.length > 0) entries.push(["extra_hosts", yMap(p.extraHosts.map(([k, v]) => [k, v] as [string, YNode]))]);
  if (p.dns.length > 0) entries.push(["dns", yList(p.dns)]);
  if (p.logDriver !== null || p.logOpts.length > 0) {
    const logEntries: [string, YNode][] = [];
    if (p.logDriver !== null) logEntries.push(["driver", p.logDriver]);
    if (p.logOpts.length > 0) logEntries.push(["options", yMap(p.logOpts.map(([k, v]) => [k, v] as [string, YNode]))]);
    entries.push(["logging", yMap(logEntries)]);
  }
  if (p.noHealthcheck) entries.push(["healthcheck", yMap([["disable", true]])]);
  if (p.name !== null) entries.push(["container_name", p.name]);

  // YAML 注释(诚实披露)
  const comments: string[] = [];
  if (p.rm) {
    comments.push('# --rm has no Compose service equivalent; for one-off runs use "docker compose run --rm <service>".');
  }
  if (p.publishAll) {
    comments.push("# -P/--publish-all: Compose cannot express random host ports — publish explicitly with -p.");
  }
  for (const u of ctx.unsupported) {
    comments.push(`# unsupported: ${u}`);
  }

  // 顶层:services + (可选) networks(external:run 前提是网络已存在)
  const top: [string, YNode][] = [];
  top.push(["services", yMap([[serviceName, yMap(entries)]])]);
  if (p.networks.length > 0) {
    top.push([
      "networks",
      yMap(p.networks.map((n): [string, YNode] => [n, yMap([["external", true]])])),
    ]);
  }

  const lines: string[] = [
    '# Converted from "docker run" — validate with: docker compose config',
  ];
  for (const [k, v] of top) {
    emitNode(k, v, 0, lines);
  }
  if (p.networks.length > 0) {
    lines.push(`# Network(s) ${p.networks.join(", ")} must already exist (docker network create);`);
    lines.push("# remove external: true to let Compose create them.");
  }
  const svcIndent = "  ".repeat(2);
  for (const c of comments) {
    lines.push(`${svcIndent}${c}`);
  }
  return {
    ok: true,
    yaml: lines.join("\n") + "\n",
    unsupported: ctx.unsupported,
    disclosures: { rm: p.rm, detach: p.detach, publishAll: p.publishAll },
  };
}
