import { describe, expect, it } from "vitest";
import { load } from "js-yaml";
import { dockerRunToCompose } from "@/tools/_lib/docker-compose-convert";

/**
 * CN-025 docker run → docker-compose。锚 = docs.docker.com 自带示例,
 * 2026-11-22 经 HTTPS_PROXY 抓取核对,本机无 docker CLI,以官方文档为准:
 *   - https://docs.docker.com/reference/cli/docker/container/run/(--name / -p / -e / --restart /
 *     --network / -w / -v / --mount / --device / -d 各章节示例,含 `\` 续行与引号写法)
 *   - https://docs.docker.com/reference/compose-file/services/(restart: "no" 必须引号、
 *     container_name、ports 短语法等;官方 "Simple example" 中 image 不引号、"8080:80" 引号)
 * 输出用 js-yaml 复验解析,绝不用记忆向量。
 */

type Doc = Record<string, unknown>;
const svc = (yamlText: string): Doc => {
  const parsed = load(yamlText) as { services: Record<string, Doc> };
  expect(parsed.services).toBeTruthy();
  const keys = Object.keys(parsed.services);
  expect(keys.length).toBe(1);
  return parsed.services[keys[0]];
};
/** 拒绝路径断言辅助:失败时返回错误码,成功时返回 "ok"。 */
const errCode = (input: string): string => {
  const r = dockerRunToCompose(input);
  return r.ok ? "ok" : r.code;
};

describe("文档示例锚(docker run reference)", () => {
  it("Assign name (--name):docker run --name test -d nginx:alpine", () => {
    const r = dockerRunToCompose("docker run --name test -d nginx:alpine");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const s = svc(r.yaml);
    expect(s.image).toBe("nginx:alpine");
    expect(s.container_name).toBe("test");
    expect(r.disclosures.detach).toBe(true);
    // 官方文档:-d 时 compose 服务本来就后台运行,YAML 里不需要 detach 键
    expect(r.yaml).not.toContain("detach");
  });

  it("Publish or expose port (-p):docker run -p 127.0.0.1:80:8080/tcp nginx:alpine", () => {
    const r = dockerRunToCompose("docker run -p 127.0.0.1:80:8080/tcp nginx:alpine");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const s = svc(r.yaml);
    expect(s.ports).toEqual(["127.0.0.1:80:8080/tcp"]);
    // 无 --name 时 service key 用镜像名最后一段
    expect(r.yaml).toContain("  nginx:");
  });

  it("Detached mode 示例:镜像之后的 token 全部归 command(nginx -g 'daemon off;')", () => {
    const r = dockerRunToCompose("docker run -d -p 80:80 my_image nginx -g 'daemon off;'");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const s = svc(r.yaml);
    expect(s.image).toBe("my_image");
    expect(s.command).toEqual(["nginx", "-g", "daemon off;"]);
    expect(s.ports).toEqual(["80:80"]);
  });

  it("Set environment variables (-e/--env/--env-file):MYVAR1 裸键如实透传", () => {
    const r = dockerRunToCompose(
      "docker run -e MYVAR1 --env MYVAR2=foo --env-file ./env.list ubuntu bash",
    );
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const s = svc(r.yaml);
    expect(s.environment).toEqual(["MYVAR1", "MYVAR2=foo"]);
    expect(s.env_file).toEqual(["./env.list"]);
    expect(s.command).toBe("bash");
  });

  it("Restart policies (--restart):always 直通,no 按 compose 官方文档要求引号", () => {
    const a = dockerRunToCompose("docker run --restart=always redis");
    expect(a.ok).toBe(true);
    if (a.ok) expect(svc(a.yaml).restart).toBe("always");
    const b = dockerRunToCompose("docker run --restart no redis");
    expect(b.ok).toBe(true);
    if (!b.ok) return;
    // YAML 1.1 中裸 no 是假值,compose 官方文档示例写作 restart: "no"
    expect(b.yaml).toContain('restart: "no"');
    expect(svc(b.yaml).restart).toBe("no");
    const c = dockerRunToCompose("docker run --restart=on-failure:3 redis");
    expect(c.ok).toBe(true);
    if (c.ok) expect(svc(c.yaml).restart).toBe("on-failure:3");
  });

  it("Connect to a network (--network):named network → service networks + 顶层 external", () => {
    const r = dockerRunToCompose("docker run -itd --network=my-net busybox");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const s = svc(r.yaml);
    expect(s.networks).toEqual(["my-net"]);
    expect(s.stdin_open).toBe(true);
    expect(s.tty).toBe(true);
    const parsed = load(r.yaml) as { networks: Record<string, Doc> };
    expect(parsed.networks["my-net"]).toEqual({ external: true });
    expect(r.yaml).toContain("docker network create");
  });

  it("Set working directory (-w):docker run -w /path/to/dir/ ubuntu pwd", () => {
    const r = dockerRunToCompose("docker run -w /path/to/dir/ ubuntu pwd");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const s = svc(r.yaml);
    expect(s.working_dir).toBe("/path/to/dir/");
    expect(s.command).toBe("pwd");
  });

  it("Mount volume (-v) 官方示例:两个 socket/binary 挂载 + -t -i", () => {
    const r = dockerRunToCompose(
      "docker run -t -i -v /var/run/docker.sock:/var/run/docker.sock -v /path/to/static-docker-binary:/usr/bin/docker busybox sh",
    );
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const s = svc(r.yaml);
    expect(s.volumes).toEqual([
      "/var/run/docker.sock:/var/run/docker.sock",
      "/path/to/static-docker-binary:/usr/bin/docker",
    ]);
    expect(s.stdin_open).toBe(true);
    expect(s.tty).toBe(true);
    expect(s.command).toBe("sh");
  });

  it("--mount 官方示例(anonymous volume):type=volume,target=/icanwrite + --read-only", () => {
    const r = dockerRunToCompose(
      "docker run --read-only --mount type=volume,target=/icanwrite busybox touch /icanwrite/here",
    );
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const s = svc(r.yaml);
    expect(s.volumes).toEqual(["/icanwrite"]);
    expect(s.read_only).toBe(true);
    expect(s.command).toEqual(["touch", "/icanwrite/here"]);
  });

  it("Add host device (--device) 官方示例:三段语法直通 + --rm 披露", () => {
    const r = dockerRunToCompose("docker run --device=/dev/sda:/dev/xvdc:r --rm -it ubuntu fdisk /dev/xvdc");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const s = svc(r.yaml);
    expect(s.devices).toEqual(["/dev/sda:/dev/xvdc:r"]);
    expect(s.command).toEqual(["fdisk", "/dev/xvdc"]);
    expect(r.disclosures.rm).toBe(true);
    expect(r.yaml).toContain("# --rm has no Compose service equivalent");
  });
});

describe("tokenizer:引号、续行、组合短 flag", () => {
  it("多行 \\ 续行 + 双引号值:命令完整解析", () => {
    const input = [
      "docker run -d \\",
      "  --name web \\",
      '  -e MSG="hello world" \\',
      '  -v /srv/data:/data \\',
      '  nginx:1.27 echo "a b c"',
    ].join("\n");
    const r = dockerRunToCompose(input);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const s = svc(r.yaml);
    expect(s.image).toBe("nginx:1.27");
    expect(s.container_name).toBe("web");
    expect(s.environment).toEqual(["MSG=hello world"]);
    expect(s.volumes).toEqual(["/srv/data:/data"]);
    expect(s.command).toEqual(["echo", "a b c"]);
    expect(r.yaml).toContain("  web:");
  });

  it("单引号字面量与组合短 flag -itd", () => {
    const r = dockerRunToCompose("docker run -itd --entrypoint '/bin/sh -c' busybox");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const s = svc(r.yaml);
    expect(s.entrypoint).toBe("/bin/sh -c");
    expect(s.stdin_open).toBe(true);
    expect(s.tty).toBe(true);
    expect(r.disclosures.detach).toBe(true);
  });

  it("资源限制映射:--memory/--cpus/-u/--hostname", () => {
    const r = dockerRunToCompose("docker run -u 1000:1000 --hostname db1 --memory 2g --cpus 1.5 postgres");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const s = svc(r.yaml);
    expect(s.user).toBe("1000:1000");
    expect(s.hostname).toBe("db1");
    expect(s.mem_limit).toBe("2g");
    expect(s.cpus).toBe(1.5);
    // service key 无 --name → postgres
    expect(r.yaml).toContain("  postgres:");
  });
});

describe("诚实披露:unsupported / --rm / -P", () => {
  it("认识的 flag 与未知 flag 混用:未知进注释,其余字段不受污染", () => {
    const r = dockerRunToCompose(
      'docker run --cap-drop=ALL --health-cmd="curl -f http://localhost || exit 1" -p 80:80 nginx',
    );
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const s = svc(r.yaml);
    expect(s.image).toBe("nginx");
    expect(s.ports).toEqual(["80:80"]);
    expect(s.cap_drop).toEqual(["ALL"]);
    expect(s["health-cmd"]).toBeUndefined();
    expect(r.unsupported.some((u) => u.startsWith("--health-cmd"))).toBe(true);
    expect(r.yaml).toContain("# unsupported: --health-cmd");
    // 未知 flag 不产生任何 YAML 键,注释保持在服务块内
    const parsed = load(r.yaml) as Doc;
    expect(Object.keys(parsed)).toEqual(["services"]);
  });

  it("-P/--publish-all:返回披露并在 YAML 写注释(随机端口无法静态表达)", () => {
    const r = dockerRunToCompose("docker run -P nginx:alpine");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.disclosures.publishAll).toBe(true);
    expect(r.yaml).toContain("# -P/--publish-all: Compose cannot express random host ports");
  });

  it("--pull=never → pull_policy(compose workload 属性)", () => {
    const r = dockerRunToCompose("docker run --pull=never hello-world");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(svc(r.yaml).pull_policy).toBe("never");
  });
});

describe("拒绝路径", () => {
  it("空输入与纯空白拒绝;孤立提示符不算 docker 命令", () => {
    expect(errCode("")).toBe("empty");
    expect(errCode("   \n  ")).toBe("empty");
    expect(errCode("$ ")).toBe("notDockerRun");
  });

  it("非 docker run 命令拒绝(含 docker compose / docker ps)", () => {
    expect(errCode("ls -la /tmp")).toBe("notDockerRun");
    expect(errCode("docker compose up -d")).toBe("notDockerRun");
    expect(errCode("docker ps -a")).toBe("notDockerRun");
  });

  it("缺镜像拒绝:flags 完整但没有 IMAGE", () => {
    expect(errCode("docker run -p 80:80")).toBe("noImage");
    expect(errCode("docker run --rm")).toBe("noImage");
  });

  it("引号未闭合拒绝", () => {
    expect(errCode('docker run --name "abc nginx')).toBe("unterminatedQuote");
    expect(errCode("docker run -e MSG='x nginx")).toBe("unterminatedQuote");
  });
});

describe("service key 与 emitter 语义", () => {
  it("镜像名含 registry/tag/digest → service key 取最后一段并去掉 tag", () => {
    const r = dockerRunToCompose("docker run ghcr.io/team/app/web:1.2.3");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.yaml).toContain("  web:");
    expect(svc(r.yaml).image).toBe("ghcr.io/team/app/web:1.2.3");
  });

  it("--name 值在 YAML 中保留原样(container_name),service key 清洗非法字符", () => {
    const r = dockerRunToCompose("docker run --name my.app_1 busybox");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.yaml).toContain("  my.app_1:");
    expect(svc(r.yaml).container_name).toBe("my.app_1");
  });

  it("输出可被 js-yaml 完整解析且顶层只有 services/networks", () => {
    const r = dockerRunToCompose(
      "docker run -d --name full -p 8080:80 -v /a:/b -e K=V --restart unless-stopped --network net1 nginx",
    );
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const parsed = load(r.yaml) as Doc;
    expect(Object.keys(parsed).sort()).toEqual(["networks", "services"]);
    const s = svc(r.yaml);
    expect(s.restart).toBe("unless-stopped");
    expect(s.networks).toEqual(["net1"]);
    expect(s.environment).toEqual(["K=V"]);
  });
});
