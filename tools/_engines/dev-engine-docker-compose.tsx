"use client";

import { useState } from "react";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { pick } from "./calc-ui";
import { useI18n } from "@/components/i18n-provider";
import { dockerRunToCompose, errMessage } from "../_lib/docker-compose-convert";

/**
 * CN-025:docker run → docker-compose 单向转换引擎。零依赖,同步转换。
 * 不认识的 flag 收进 YAML 注释并在下方提示区列出;--rm/-d/-P 以披露文本说明。
 */

const L = {
  inLabel: {
    en: "docker run command",
    zh: "docker run 命令",
    ja: "docker run コマンド",
    es: "Comando docker run",
    pt: "Comando docker run",
  },
  outLabel: {
    en: "docker-compose.yml (service fragment)",
    zh: "docker-compose.yml(service 片段)",
    ja: "docker-compose.yml(サービス断片)",
    es: "docker-compose.yml (fragmento de servicio)",
    pt: "docker-compose.yml (fragmento de serviço)",
  },
  convert: { en: "Convert", zh: "转换", ja: "変換", es: "Convertir", pt: "Converter" },
  placeholder: {
    en: 'docker run -d --name web -p 8080:80 -v /srv/site:/usr/share/nginx/html nginx:alpine',
    zh: 'docker run -d --name web -p 8080:80 -v /srv/site:/usr/share/nginx/html nginx:alpine',
    ja: 'docker run -d --name web -p 8080:80 -v /srv/site:/usr/share/nginx/html nginx:alpine',
    es: 'docker run -d --name web -p 8080:80 -v /srv/site:/usr/share/nginx/html nginx:alpine',
    pt: 'docker run -d --name web -p 8080:80 -v /srv/site:/usr/share/nginx/html nginx:alpine',
  },
  unsupportedTitle: {
    en: "Flags kept as comments (no direct Compose equivalent found):",
    zh: "未直接映射的 flag(已保留为输出中的注释):",
    ja: "直接対応する Compose 属性がないフラグ(出力内ではコメントとして保持):",
    es: "Flags sin equivalente directo en Compose (se conservan como comentarios):",
    pt: "Flags sem equivalente direto no Compose (mantidos como comentários):",
  },
  rmNote: {
    en: "--rm is for one-off containers; Compose services are long-running. For one-off tasks, run \"docker compose run --rm <service>\".",
    zh: "--rm 面向一次性容器;Compose 服务是长驻进程。一次性任务请用 \"docker compose run --rm <服务>\"。",
    ja: "--rm は使い捨てコンテナ向けです。Compose サービスは長時間実行前提のため、単発実行は \"docker compose run --rm <サービス>\" を使ってください。",
    es: "--rm es para contenedores de un solo uso; los servicios de Compose son de larga duración. Para tareas puntuales use \"docker compose run --rm <servicio>\".",
    pt: "--rm é para contêineres de uso único; serviços Compose são de longa duração. Para tarefas pontuais use \"docker compose run --rm <serviço>\".",
  },
  detachNote: {
    en: "-d/--detach was ignored: Compose services always run detached by design.",
    zh: "-d/--detach 已忽略:Compose 服务本来就是后台运行。",
    ja: "-d/--detach は無視されました:Compose サービスは常にバックグラウンドで実行されます。",
    es: "-d/--detach se ignoró: los servicios de Compose siempre se ejecutan en segundo plano.",
    pt: "-d/--detach foi ignorado: serviços Compose sempre rodam em segundo plano.",
  },
  publishAllNote: {
    en: "-P/--publish-all publishes random host ports, which cannot be expressed statically — add explicit -p mappings.",
    zh: "-P/--publish-all 会发布随机宿主端口,无法静态表达——请补显式 -p 映射。",
    ja: "-P/--publish-all はランダムなホストポートを公開するため静的に表現できません — 明示的な -p を追加してください。",
    es: "-P/--publish-all publica puertos aleatorios del host, que no se pueden expresar estáticamente — añada mapeos -p explícitos.",
    pt: "-P/--publish-all publica portas aleatórias do host, o que não pode ser expresso estaticamente — adicione mapeamentos -p explícitos.",
  },
  note: {
    en: "Coverage: common docker run flags (--name, -p, -v, -e, --restart, --network, -w, -u, -h, --memory, --cpus, --mount, --device, --label, and more). Flags without a Compose equivalent are kept as \"# unsupported\" comments in the output — nothing is dropped silently. Review the result with \"docker compose config\". Conversion runs locally; nothing is uploaded.",
    zh: "覆盖常见 docker run flag(--name、-p、-v、-e、--restart、--network、-w、-u、-h、--memory、--cpus、--mount、--device、--label 等)。没有 Compose 对应的 flag 会以 \"# unsupported\" 注释保留在输出里——绝不静默丢弃。建议用 \"docker compose config\" 复核结果。转换在本机完成,不上传。",
    ja: "主要な docker run フラグ(--name、-p、-v、-e、--restart、--network、-w、-u、-h、--memory、--cpus、--mount、--device、--label など)に対応。Compose に相当する属性がないフラグは \"# unsupported\" コメントとして出力に保持され、黙って捨てられることはありません。結果は \"docker compose config\" で確認してください。変換はローカルで行われ、アップロードはありません。",
    es: "Cubre los flags comunes de docker run (--name, -p, -v, -e, --restart, --network, -w, -u, -h, --memory, --cpus, --mount, --device, --label y más). Los flags sin equivalente en Compose se conservan como comentarios \"# unsupported\" en la salida — nada se descarta silenciosamente. Revise el resultado con \"docker compose config\". La conversión es local; nada se sube.",
    pt: "Cobre os flags comuns do docker run (--name, -p, -v, -e, --restart, --network, -w, -u, -h, --memory, --cpus, --mount, --device, --label e mais). Flags sem equivalente no Compose ficam como comentários \"# unsupported\" na saída — nada é descartado silenciosamente. Revise o resultado com \"docker compose config\". A conversão é local; nada é enviado.",
  },
};

export function DevEngineDockerCompose() {
  const { locale } = useI18n();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [unsupported, setUnsupported] = useState<string[]>([]);
  const [disclosures, setDisclosures] = useState<{ rm: boolean; detach: boolean; publishAll: boolean }>({
    rm: false, detach: false, publishAll: false,
  });

  const doConvert = () => {
    setErr(null);
    setUnsupported([]);
    setDisclosures({ rm: false, detach: false, publishAll: false });
    const r = dockerRunToCompose(input);
    if (!r.ok) {
      setOutput("");
      setErr(errMessage(r, locale));
      return;
    }
    setOutput(r.yaml);
    setUnsupported(r.unsupported);
    setDisclosures(r.disclosures);
  };

  const showHints = unsupported.length > 0 || disclosures.rm || disclosures.detach || disclosures.publishAll;

  return (
    <ToolPanel>
      <div className="space-y-4">
        <textarea
          className="field mono"
          rows={7}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={pick(locale, L.placeholder)}
          spellCheck={false}
          aria-label={pick(locale, L.inLabel)}
        />

        <button
          type="button"
          onClick={doConvert}
          disabled={!input.trim()}
          className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white dark:bg-white dark:text-[#1d1d1f] transition-opacity disabled:opacity-40"
        >
          {pick(locale, L.convert)}
        </button>

        {err && (
          <p role="alert" className="rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]">
            {err}
          </p>
        )}

        {output && (
          <div className="space-y-2">
            <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">
              {pick(locale, L.outLabel)}
            </p>
            <textarea
              className="field mono bg-[var(--color-surface)]"
              rows={12}
              value={output}
              readOnly
              spellCheck={false}
              aria-label={pick(locale, L.outLabel)}
            />
            <CopyButton value={output} />
          </div>
        )}

        {showHints && (
          <div className="rounded-xl border border-[var(--color-border)] px-3.5 py-2.5 text-[13px] leading-5 text-[var(--color-sub)]">
            {unsupported.length > 0 && (
              <p>
                {pick(locale, L.unsupportedTitle)}{" "}
                {unsupported.map((u) => (
                  <code key={u} className="mono mr-1">{u}</code>
                ))}
              </p>
            )}
            {disclosures.rm && <p>{pick(locale, L.rmNote)}</p>}
            {disclosures.detach && <p>{pick(locale, L.detachNote)}</p>}
            {disclosures.publishAll && <p>{pick(locale, L.publishAllNote)}</p>}
          </div>
        )}

        <p className="text-[13px] leading-5 text-[var(--color-sub)]">{pick(locale, L.note)}</p>
      </div>
    </ToolPanel>
  );
}
